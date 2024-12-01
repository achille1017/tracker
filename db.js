import Sqlite from 'better-sqlite3'
import bcrypt from 'bcrypt'
import { generateDailyAdvice } from "./advicer.js"
import { getYesterday, replaceObjectValues, moveKeyValuePair } from './tools.js'
import { sendConfirmationEmail } from './mail.js'
import { BACKEND_SERVER } from './payements.js'


const db = new Sqlite('db.sqlite');
db.prepare('CREATE TABLE IF NOT EXISTS users (mail TEXT PRIMARY KEY, password TEXT, data TEXT, habits TEXT,advice_daily TEXT,profile TEXT,plan TEXT, confirmation_token TEXT, token_expires TEXT, is_confirmed INTEGER)').run();
db.prepare('CREATE TABLE IF NOT EXISTS whiteList (mail TEXT PRIMARY KEY, date TEXT)').run();
db.prepare('CREATE TABLE IF NOT EXISTS analytics (source TEXT PRIMARY KEY, score INTEGER)').run();

function checkKeyExists(jsonObject, key) {
	// Using the in operator
	if (key in jsonObject) {
		return true;
	}

	// Using hasOwnProperty method
	if (jsonObject.hasOwnProperty(key)) {
		return true;
	}

	return false;
}
function getData(mail) {
	let select = db.prepare(`SELECT data FROM users WHERE mail = '${mail}'`);
	let result = select.get();
	if (result) return JSON.parse(result.data);
	return null;
}
function getPlan(mail) {
	let select = db.prepare(`SELECT plan FROM users WHERE mail = '${mail}'`);
	let result = select.get();
	if (result) return JSON.parse(result.plan);
	return null;
}
function getHabits(mail) {
	let select = db.prepare(`SELECT habits FROM users WHERE mail = '${mail}'`);
	let result = select.get();
	if (result) return JSON.parse(result.habits);
	return null;
}
function getProfile(mail) {
	let select = db.prepare(`SELECT profile FROM users WHERE mail = '${mail}'`);
	let result = select.get();
	if (result) return JSON.parse(result.profile);
	return null;
}
function updateData(mail, newData) {
	let update = db.prepare(`update users set data=? where mail = '${mail}'`)
	update.run(JSON.stringify(newData))
}
function insertHabit(mail, newHabit, newHabitType) {
	let habitExists = checkKeyExists(getHabits(mail), newHabit)
	if (habitExists) { return false }
	let update = db.prepare(`update users SET habits = json_insert(habits, '$.' || ?,?) where mail = '${mail}'`)
	update.run(newHabit, newHabitType)
	update = db.prepare(`
    UPDATE users
    SET data = (
      SELECT json_group_array(json_set(value, '$.' || ?, ?))
      FROM json_each(data)
      WHERE data IS NOT NULL AND mail = ?)
    WHERE data IS NOT NULL AND mail = ?;
    `);
	update.run(newHabit, newHabitType === "bool" ? 2 : "", mail, mail);
	return true
}
function deleteHabit(mail, habitName) {
	const deleteRequest1 = db.prepare(`
    UPDATE users
    SET data = (
      SELECT json_group_array(
        json_remove(value, '$.' || json_quote(?))
      )
      FROM (
        SELECT json_each.value
        FROM users,
        json_each(data)
        WHERE data IS NOT NULL AND mail = ?
      )
      WHERE data IS NOT NULL AND mail = ?
    )
    WHERE data IS NOT NULL AND mail = ?;
  `);
	deleteRequest1.run(habitName, mail, mail, mail);
	const deleteRequest2 = db.prepare(`
    UPDATE users
    SET habits = json_remove(habits, '$.' || json_quote(?))
    WHERE habits IS NOT NULL AND mail = ?;`
	);
	deleteRequest2.run(habitName, mail);
}
async function allowLogin(mail, userProvidedPassword) {
	//return "ok"
	let select = db.prepare(`SELECT password FROM users WHERE mail = '${mail}' and is_confirmed=1`);
	if (select.get() === undefined) { return "unfound" }
	let storedHash = select.get()["password"];
	let login;
	await new Promise(async next => {
		bcrypt.compare(userProvidedPassword, storedHash, (err, result) => {
			if (err) {
				return;
			}
			if (result) {
				login = "ok"
			} else {
				login = "bad"
			}
			next()
		});
	})
	return login;
}
function getFormattedDate() {
	const today = new Date();
	return `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
}
function changeOrderHabit(mail, habit, order) {
	let habits = getHabits(mail)
	const newhabits = moveKeyValuePair(habits, habit, order)
	let update = db.prepare(`update users set habits=? where mail = '${mail}'`)
	update.run(JSON.stringify(newhabits))
}
function renameHabit(mail, habit, name) {
	let update = db.prepare(`UPDATE users
	SET data = json(
	replace(
		data,
		?,
		?
	)
	) WHERE mail = ?;`)
	update.run(habit, name, mail)
	update = db.prepare(`UPDATE users
		SET habits = json(
		replace(
			habits,
			?,
			?
		)
		) WHERE mail = ?;`)
	update.run(habit, name, mail)
}
async function setNewPassword(mail, password) {
	const saltRounds = 10;
	let result;
	await new Promise(async next => {

		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) {
				console.log(err)
				result = false
				return;
			}

			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) {
					console.log(err)
					result = false
					return;
				}
				try {
					let insert = db.prepare(`update users set password = ? where mail = ? `);
					insert.run(hash, mail);

					result = true
				} catch (e) {
					console.log(e)
					result = false
				}
				next()
			});
		});
	})
	return result
}
async function register(mail, password, token) {
	const saltRounds = 10;
	let result;
	await new Promise(async next => {

		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) {
				console.log(err)
				result = false
				return;
			}

			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) {
					console.log(err)
					result = false
					return;
				}
				try {
					let insert = db.prepare(`insert into users (mail,password,data,habits,advice_daily,profile,plan,confirmation_token,is_confirmed) values (?,?,?,?,?,?,?,?,?)`);
					result = await sendConfirmationEmail(mail, `${BACKEND_SERVER}/verify-email?token=${token}`) ? true : false
					console.log(result)
					if (result) {
						insert.run(mail, hash, `[{"date":"${getFormattedDate()}"}]`, '{}', `{"${getFormattedDate()}":"firstAdvice"}`, '{"profileSet":0,"name":"","job":"","language":""}', `{"status":"inactive","updated":"${getFormattedDate()}"}`, token, 0);
					}
				} catch (e) {
					console.log(e)
					result = false
				}
				next()
			});
		});
	})
	return result
}
async function confirmEmail(decoded, token) {
	let status
	await new Promise(async next => {
		try {
			const updateStmt = db.prepare('UPDATE users SET is_confirmed = 1 WHERE mail = ? AND confirmation_token = ?');
			const result = updateStmt.run(decoded.mail, token);
			if (result.changes === 0) {
				status = 401; next()
			}
			else {
				status = 200; next()
			}
		}
		catch (e) {
			console.log(e)
			status = 500; next()
		}
	})
	return status
}
function updateProfile(mail, newProfile) {
	let profile = getProfile(mail)
	Object.assign(profile, newProfile)
	let update = db.prepare(`update users set profile='${JSON.stringify(profile)}' where mail = '${mail}'`)
	update.run()
}
function isTodayTuesday() {
	return new Date().getDay() === 2;
}
async function getDailyAdvice(day, mail) {
	if (!hasAccess(mail) && !isTodayTuesday()) {
		return ("noSubscription")
	}
	else {
		let select = db.prepare(`SELECT json_extract(advice_daily, '$."${day}"') as advice FROM users WHERE mail = '${mail}'`);
		let result = select.get();
		if (result.advice === null) {
			let select2 = db.prepare(`SELECT value FROM users, json_each(data) AS value WHERE json_extract(value, '$.date') = '${getYesterday()}' and mail='${mail}';`);
			let result2 = select2.get();
			if (result2 === undefined) {
				result2 = { "value": JSON.stringify(replaceObjectValues(getHabits(mail), "bool", 0)) }
			}
			const profile = getProfile(mail)
			const advice = await generateDailyAdvice(JSON.parse(result2.value), profile.name, profile.job, profile.language)
			let update = db.prepare(`update users SET advice_daily = json_insert(advice_daily, '$.${day}', ?) where mail = '${mail}'`)
			update.run(advice[0])
			return advice[0]
		}
		else return result.advice;
	}
}
function updateSubscription(event_name, mail, status, date) {
	let update = db.prepare(`UPDATE users
		SET plan = JSON_PATCH(plan, JSON_OBJECT('status','${status}'))
		WHERE mail = '${mail}'`)
	update.run()
	update = db.prepare(`UPDATE users
		SET plan = JSON_PATCH(plan, JSON_OBJECT('updated','${date}'))
		WHERE mail = '${mail}'`)
	update.run()
}
async function addToWhiteList(mail) {
	let result
	try {
		let insert = db.prepare(`insert into whiteList (mail,date) values (?,?)`);
		insert.run(mail, getFormattedDate());
		result = 200
	} catch (e) {
		console.log(e.code)
		result = e.code === "SQLITE_CONSTRAINT_PRIMARYKEY" ? 304 : 400
	}
	return result
}
function generateRandomSixDigitNumber() {
	return String(Math.floor(100000 + Math.random() * 900000)).padStart(6, '0');
}
function isEmailInWhiteList(mail) {
	if (!isValidValue(mail)) { return false }
	else {
		const stmt = db.prepare('SELECT COUNT(*) as count FROM whiteList WHERE mail = ?');
		const result = stmt.get(mail);
		return result.count > 0;
	}
}
function hasAccess(mail) {
	let select = db.prepare(`SELECT plan FROM users WHERE mail = '${mail}'`);
	let result = JSON.parse(select.get().plan);
	if (result) return result.status === "active" || result.status === "paid" || result.status === "on_trial";
}
function isValidValue(value) {
	return value !== undefined && value !== null;
}
function userExist(mail) {
	const user = db.prepare('SELECT * FROM users WHERE mail = ?').get(mail);
	if (!user) {
		return false;
	}
	return true;
}
function incrementScoreForSource(source) {
	// Ensure the table exists
	db.prepare('CREATE TABLE IF NOT EXISTS analytics (source TEXT PRIMARY KEY, score INTEGER)').run();

	try {
		// Begin a transaction
		const transaction = db.transaction(() => {
			// Check if the source already exists
			const existingRow = db.prepare('SELECT * FROM analytics WHERE source = ?').get(source);

			if (existingRow) {
				// If the source exists, increment the score
				db.prepare('UPDATE analytics SET score = score + 1 WHERE source = ?').run(source);
			} else {
				// If the source doesn't exist, insert a new row with score 1
				db.prepare('INSERT INTO analytics (source, score) VALUES (?, 1)').run(source);
			}
		});

		// Execute the transaction
		transaction();

		console.log(`Score incremented for source: ${source}`);
		return true;
	} catch (error) {
		console.error(`Error incrementing score for source ${source}:`, error);
		return false;
	}
}

export { incrementScoreForSource, setNewPassword, userExist, getData, hasAccess, updateData, getHabits, insertHabit, deleteHabit, allowLogin, register, getDailyAdvice, renameHabit, getProfile, updateProfile, changeOrderHabit, getPlan, updateSubscription, addToWhiteList, confirmEmail, isEmailInWhiteList }