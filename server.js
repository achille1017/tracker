import express from 'express';
import session from 'express-session';
import { incrementScoreForSource,setNewPassword,userExist, hasAccess, getData, updateData, getHabits, insertHabit, deleteHabit, allowLogin, register, getDailyAdvice, getProfile, updateProfile, changeOrderHabit, getPlan, updateSubscription, renameHabit, addToWhiteList, confirmEmail, isEmailInWhiteList } from './db.js';
import cors from 'cors'
import { getToday } from "./tools.js"
import path from 'path';
import { fileURLToPath } from 'url';
import { getThreeCheckoutLinks, FRONTEND_SERVER } from "./payements.js"
import { Server } from 'socket.io';
import http from "http"
import fs from 'fs';
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { sendResetPasswordEmail } from "./mail.js"

const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
const LEMON_SQUEEZY_SIGNING_SECRET = keys["lemonSqueezySigningSecret"]
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SECRET_KEY = keys["secretKey"]
const app = express();
const port = 4000;
const sessionMiddleware = session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set to true if using https
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
});
app.use(sessionMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: FRONTEND_SERVER,
        credentials: true
    }
});

io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});


io.on('connection', (socket) => {
    socket.on('joinRoom', () => {
        socket.request.session.reload((err) => {
            if (err) {
                console.error('Error reloading session:', err);
            } else {
                socket.join(socket.request.session.mail);
                console.log(`Socket ${socket.id} has joined room ${socket.request.session.mail}. User: ${socket.request.session.mail}`);
            }
        });
    });
});


app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));


function verifyLemonSqueezyWebhook(req, res, next) {
    const signature = req.headers['x-signature'];
    const rawBody = req.rawBody;
    const signingSecret = LEMON_SQUEEZY_SIGNING_SECRET;

    if (!signature) {
        return res.status(400).send('No signature provided');
    }

    const hmac = crypto.createHmac('sha256', signingSecret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const providedSignature = Buffer.from(signature, 'utf8');

    if (crypto.timingSafeEqual(digest, providedSignature)) {
        next();
    } else {
        res.status(401).send('Invalid signature');
    }
}

app.use(cors({
    origin: FRONTEND_SERVER,
    credentials: true
}));

app.get('/data', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        res.json(getData(req.session.mail));
    }
});
app.get('/getprofile', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        res.json(getProfile(req.session.mail));
    }
});
app.post('/advice', async (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        if (req.body.type === "daily") {
            let advice = await getDailyAdvice(getToday(), req.session.mail)
            console.log(advice)
            res.json({ "advice": advice })
        }
    }
});
app.post('/setprofile', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        updateProfile(req.session.mail, req.body.newProfile)
        res.status(200).send()
    }
});
app.get('/habits', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        res.json(getHabits(req.session.mail));
    }
});
app.post('/updatedata', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        updateData(req.session.mail, req.body)
        res.status(200).send()
    }
});
app.post('/newhabit', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        if (insertHabit(req.session.mail, req.body.newHabit, req.body.newHabitType)) {
            res.status(200).send()
        }
        else {
            res.status(409).json({ "error": "habit already exists" })
        }
    }
})
app.post('/deletehabit', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        deleteHabit(req.session.mail, req.body.habit)
        res.status(200).send()
    }
})
app.post('/changeorderhabit', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        changeOrderHabit(req.session.mail, req.body.habit, req.body.order)
        res.status(200).send()
    }
})
app.post('/renamehabit', (req, res) => {
    console.log('POST /renamehabit')
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        renameHabit(req.session.mail, req.body.habit, req.body.name)
        res.status(200).send()
    }
})
app.post('/login', async (req, res) => {
    const login = await allowLogin(req.body.mail, req.body.password)
    if (login === "ok") {
        req.session.logged = true;
        req.session.mail = req.body.mail
        res.status(200).send()
    }
    else {
        res.status(401).send({ "message": login })
    }
})
app.get('/islogged', (req, res) => {
    res.send(req.session.logged)
})
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.send('Error destroying session');
        } else {
            res.send('Session destroyed');
        }
    });
})
app.post('/register', async (req, res) => {
    console.log('POST /register req.body.mail')
    if (req.body.mail === undefined || req.body.mail === null || req.body.mail === "") {
        console.log("email provided null")
        return res.status(400).send()
    }
    const token = jwt.sign({ "mail": req.body.mail }, SECRET_KEY, { expiresIn: '1h' });
    const registration = await register(req.body.mail, req.body.password, token)
    if (registration) {
        res.status(200).send()
    }
    else {
        res.status(400).send()
    }
})
app.get('/verify-email', (req, res) => {
    console.log('GET /verify-email')
    const { token } = req.query;
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            res.redirect(FRONTEND_SERVER + "/error?code=401")
            return
        }
        const status = await confirmEmail(decoded, token)
        if (status === 200) {
            res.redirect(FRONTEND_SERVER + "/confirmation")
        }
        else {
            res.redirect(FRONTEND_SERVER + "/error?code=" + status)
        }

    });
});


app.post('/api/forgot-password', async (req, res) => {
    const mail = req.body.mail;
    const token = jwt.sign({ "mailResetingPassword": mail }, SECRET_KEY, { expiresIn: '15m' });
    const resetLink = userExist(mail)?`${FRONTEND_SERVER}/reset-password?token=${token}`:404
    if (resetLink === 404) {
        res.status(404).json({ message: 'User not found' })
    }
    const mailSent = await sendResetPasswordEmail(mail, resetLink)
    console.log(resetLink)
    res.status(mailSent ? 200 : 500).send()
})

// Reset password
app.post('/api/reset-password', async (req, res) => {
    try {
        const  mailResetingPassword  = jwt.verify(req.body.token, SECRET_KEY);
        const passwordSet = await setNewPassword(mailResetingPassword.mailResetingPassword,req.body.password)
        res.status(passwordSet?200:500).json({ message: passwordSet?'ok':"error" });


    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});


/*app.post('/whitelist', async (req, res) => {
    console.log('POST /whitelist')
    const whitelist = await addToWhiteList(req.body.mail)
    res.status(whitelist).send()
})*/

//Payements 

app.get('/checkout', (req, res) => {
    //console.log('GET /checkout')
    getThreeCheckoutLinks(req.session.mail).then(links => res.json(links))
})

app.get('/plan', (req, res) => {
    //console.log('GET /plan')
    res.json({ "plan": getPlan(req.session.mail) })
})

app.post('/subscription_callback', verifyLemonSqueezyWebhook, (req, res) => {
    console.log('POST /subscription_callback')
    const event = req.body
    const event_name = event.meta.event_name
    console.log(event_name + " " + req.body.meta.custom_data.mail)
    console.log(`${req.body.meta.custom_data.mail} ${event_name === "subscription_updated" ? " updated his subscription to " : event_name === "order_created" ? " created an order that is " : ""} ${req.body.data.attributes.status}`)
    updateSubscription(event_name, req.body.meta.custom_data.mail, req.body.data.attributes.status, req.body.data.attributes.updated_at)
    io.to(req.body.meta.custom_data.mail).emit("subscription_updated");
    res.status(200).send()
})

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/static/:dir/:file', (req, res) => {
    //console.log('GET /static/' + req.params.dir + "/" + req.params.file)
    res.sendFile(__dirname + "/frontend/build/static/" + req.params.dir + "/" + req.params.file)
})

app.get('/favicon.ico', (req, res) => {
    //console.log('GET /favicon.ico')
    res.sendFile(__dirname + "/frontend/public/favicon.ico");
})
app.get('/robots.txt', (req, res) => {
    res.sendFile(__dirname + "/robots.txt")
})
app.get('/ads.txt', (req, res) => {
    res.sendFile(__dirname + "/ads.txt")
})
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(__dirname + "/sitemap.xml")
})
app.get('/*', (req, res) => {
    //console.log('GET /')
    if(req.query.source){
        incrementScoreForSource(req.query.source)
    }
    res.sendFile(__dirname + "/frontend/build/index.html");
});


server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});