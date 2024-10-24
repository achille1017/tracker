import Sqlite from 'better-sqlite3'
import bcrypt from 'bcrypt'
import { generateDailyAdvice } from "./advicer.js"
import { getYesterday, replaceObjectValues, moveKeyValuePair } from './tools.js'
import { sendConfirmationEmail } from './mail.js'
import { BACKEND_SERVER } from './payements.js'


const db = new Sqlite('db.sqlite');
db.prepare('CREATE TABLE IF NOT EXISTS users (mail TEXT PRIMARY KEY, password TEXT, data TEXT, habits TEXT,advice_daily TEXT,profile TEXT,plan TEXT, confirmation_token TEXT, token_expires TEXT, is_confirmed INTEGER)').run();
db.prepare('CREATE TABLE IF NOT EXISTS whiteList (mail TEXT PRIMARY KEY, date TEXT)').run();

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
	let update = db.prepare(`update users SET habits = json_insert(habits, '$.${newHabit}', '${newHabitType}') where mail = '${mail}'`)
	update.run()
	update = db.prepare(`UPDATE users
	SET data = (
		SELECT json_group_array(
			json_set(value, '$.${newHabit}', '${newHabitType === "bool" ? 2 : ""}')
		)
		FROM json_each(data)
		WHERE data IS NOT NULL and mail='${mail}'
	)
	WHERE data IS NOT NULL and mail='${mail}';
	`)
	update.run()
	return true
}
function deleteHabit(mail, habitName) {
	let deleteRequest = db.prepare(`UPDATE users
	SET data = (
		SELECT json_group_array(
			json_remove(value, '$."${habitName}"')
		)
		FROM (
			SELECT json_each.value
			FROM users,
			json_each(data)
			WHERE data IS NOT NULL and mail='${mail}'
		)
		WHERE data IS NOT NULL and mail='${mail}'
	)
	WHERE data IS NOT NULL and mail='${mail}';`)
	deleteRequest.run()
	deleteRequest = db.prepare(`UPDATE users
	SET habits = json_remove(habits, '$."${habitName}"')
	WHERE habits IS NOT NULL and mail='${mail}';`)
	deleteRequest.run()
}
async function allowLogin(mail, userProvidedPassword) {
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
					insert.run(mail, hash, `[{"date":"${getFormattedDate()}"}]`, '{}', `{"${getFormattedDate()}":"firstAdvice"}`, '{"profileSet":0,"name":"","job":"","language":""}', `{"status":"active","updated":"${getFormattedDate()}"}`, token, 0);

					result = await sendConfirmationEmail(mail, `${BACKEND_SERVER}/verify-email?token=${token}`) ? true : false
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
async function getDailyAdvice(day, mail) {
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
function updateSubscription(mail, status, date) {
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
function isValidValue(value) {
	return value !== undefined && value !== null;
}
export { getData, updateData, getHabits, insertHabit, deleteHabit, allowLogin, register, getDailyAdvice, getProfile, updateProfile, changeOrderHabit, getPlan, updateSubscription, addToWhiteList, confirmEmail, isEmailInWhiteList }