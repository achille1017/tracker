import express from 'express';
import session from 'express-session';
import { getData, updateData, getHabits, insertHabit, deleteHabit, allowLogin, register, getDailyAdvice,getProfile,updateProfile } from './db.js';
import cors from 'cors'
import {getToday} from "./tools.js"

const app = express();
const port = 4000;
app.use(express.json());
app.use(session({
    secret: 'mySecretKey', // used to sign the session ID cookie
    resave: false, // do not save the session if it's not modified
    // do not save new sessions that have not been modified
    saveUninitialized: false
}));


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.get('/data', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        res.json(getData(req.session.user));
    }
});
app.get('/profile', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        res.json(getProfile(req.session.user));
    }
});
app.post('/advice', async (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        if(req.body.type==="daily"){
            let advice=  await getDailyAdvice(getToday(),req.session.user)
            res.json({"advice": advice})
        }
    }
});
app.post('/setprofile', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        updateProfile(req.session.user,req.body.newProfile)
        res.status(200).send()
    }
});
app.get('/habits', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        res.json(getHabits(req.session.user));
    }
});
app.post('/updatedata', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        updateData(req.session.user, req.body)
        res.status(200).send()
    }
});
app.post('/newhabit', (req, res) => {
    if (req.session.logged !== true) {
        res.status(401).send()
    }
    else {
        if (insertHabit(req.session.user, req.body.newHabit, req.body.newHabitType)) {
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
        deleteHabit(req.session.user, req.body.habit)
        res.status(200).send()
    }
})

app.post('/login', async (req, res) => {
    if (await allowLogin(req.body.username, req.body.password)) {
        req.session.logged = true;
        req.session.user = req.body.username
        res.status(200).send()
    }
    else {
        res.status(401).send()
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
    const registration = await register(req.body.username, req.body.password)
    if (registration) {
        res.status(200).send()
    }
    else {
        res.status(400).send()
    }
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});