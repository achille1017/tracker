import Sqlite from 'better-sqlite3'
import bcrypt from 'bcrypt'
import { generateDailyAdvice } from "./advicer.js"
import { getYesterday, replaceObjectValues, moveKeyValuePair } from './tools.js'

const db = new Sqlite('db.sqlite');
db.prepare('CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT, data TEXT, habits TEXT)').run();
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
function getData(username) {
	let select = db.prepare(`SELECT data FROM users WHERE username = '${username}'`);
	let result = select.get();
	if (result) return JSON.parse(result.data);
	return null;
}
function getHabits(username) {
	let select = db.prepare(`SELECT habits FROM users WHERE username = '${username}'`);
	let result = select.get();
	if (result) return JSON.parse(result.habits);
	return null;
}
function getProfile(username) {
	let select = db.prepare(`SELECT profile FROM users WHERE username = '${username}'`);
	let result = select.get();
	if (result) return JSON.parse(result.profile);
	return null;
}
function updateData(username, newData) {
	let update = db.prepare(`update users set data=? where username = '${username}'`)
	update.run(JSON.stringify(newData))
}
function insertHabit(username, newHabit, newHabitType) {
	let habitExists = checkKeyExists(getHabits(username), newHabit)
	if (habitExists) { return false }
	let update = db.prepare(`update users SET habits = json_insert(habits, '$.${newHabit}', '${newHabitType}') where username = '${username}'`)
	update.run()
	update = db.prepare(`UPDATE users
	SET data = (
		SELECT json_group_array(
			json_set(value, '$.${newHabit}', '${newHabitType === "bool" ? 2 : ""}')
		)
		FROM json_each(data)
		WHERE data IS NOT NULL and username='${username}'
	)
	WHERE data IS NOT NULL and username='${username}';
	`)
	update.run()
	return true
}
function deleteHabit(username, habitName) {
	let deleteRequest = db.prepare(`UPDATE users
	SET data = (
		SELECT json_group_array(
			json_remove(value, '$."${habitName}"')
		)
		FROM (
			SELECT json_each.value
			FROM users,
			json_each(data)
			WHERE data IS NOT NULL and username='${username}'
		)
		WHERE data IS NOT NULL and username='${username}'
	)
	WHERE data IS NOT NULL and username='${username}';`)
	deleteRequest.run()
	deleteRequest = db.prepare(`UPDATE users
	SET habits = json_remove(habits, '$."${habitName}"')
	WHERE habits IS NOT NULL and username='${username}';`)
	deleteRequest.run()
}
async function allowLogin(username, userProvidedPassword) {
	let select = db.prepare(`SELECT password FROM users WHERE username = '${username}'`);
	if (select.get() === undefined) { return false }
	let storedHash = select.get()["password"];
	let login;
	await new Promise(async next => {
		bcrypt.compare(userProvidedPassword, storedHash, (err, result) => {
			if (err) {
				return;
			}
			if (result) {
				login = true
			} else {
				login = false
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
function changeOrderHabit(username, habit, order) {
	let habits = getHabits(username)
	const newhabits = moveKeyValuePair(habits, habit, order)
	let update = db.prepare(`update users set habits=? where username = '${username}'`)
	update.run(JSON.stringify(newhabits))
}
async function register(username, password) {
	const saltRounds = 10;
	let result;
	await new Promise(async next => {

		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) {
				console.log(err)
				result = false
				return;
			}

			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					console.log(err)
					result = false
					return;
				}
				try {
					let insert = db.prepare(`insert into users (username,password,data,habits,advice_daily,profile) values (?,?,?,?,?,?)`);
					insert.run(username, hash, `[{"date":"${getFormattedDate()}"}]`, '{}', `{"${getFormattedDate()}":"firstAdvice"}`, '{"profileSet":0,"name":"","job":"","language":""}');
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
function updateProfile(username, newProfile) {
	let profile = getProfile(username)
	Object.assign(profile, newProfile)
	let update = db.prepare(`update users set profile='${JSON.stringify(profile)}' where username = '${username}'`)
	update.run()
}
async function getDailyAdvice(day, username) {
	let select = db.prepare(`SELECT json_extract(advice_daily, '$."${day}"') as advice FROM users WHERE username = '${username}'`);
	let result = select.get();
	if (result.advice === null) {
		let select2 = db.prepare(`SELECT value FROM users, json_each(data) AS value WHERE json_extract(value, '$.date') = '${getYesterday()}' and username='${username}';`);
		let result2 = select2.get();
		if (result2 === undefined) {
			result2 = { "value": JSON.stringify(replaceObjectValues(getHabits(username), "bool", 0)) }
		}
		const profile = getProfile(username)
		const advice = await generateDailyAdvice(JSON.parse(result2.value), profile.name, profile.job, profile.language)
		let update = db.prepare(`update users SET advice_daily = json_insert(advice_daily, '$.${day}', ?) where username = '${username}'`)
		update.run(advice[0])
		return advice[0]
	}
	else return result.advice;
}
export { getData, updateData, getHabits, insertHabit, deleteHabit, allowLogin, register, getDailyAdvice, getProfile, updateProfile, changeOrderHabit }