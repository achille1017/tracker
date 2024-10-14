import OpenAI from "openai";
import fs from 'fs';
const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
const openai = new OpenAI({ apiKey: keys["openai"] });
const models = ["gpt-4o","gpt-4o-mini"]
const addons = ["End the message with a motivational quote from a famous people.","Do not call me by my name but by a motivationnal nickname.","Remind me to track my day on the application at the end of the day.","",""]

async function generateDailyAdvice(data,name,job,language) {
    const habit = getRandomKeyWithZeroValue(data)
    const randomIndex = Math.floor(Math.random() * addons.length);
    const addon = addons[randomIndex]
    const randomIndex2 = Math.floor(Math.random() * 2);
    const model = models[randomIndex2]
    const completion = await openai.chat.completions.create({
        model: model,
        messages: [
            { role: "system", content: `You are a helpful assistant. You are going to receive a daily habit that an user of my daily habit application did not completed.
             Data comes from an user of MY application so don't send them to another time managing application. Keep on mind that you are an assistant of users of an application.` },
            {
                role: "user",
                content: `Hi, my name is ${name} and my job is ${job}. Yesterday I did not completed my ${habit} daily habit, give me 2 advices without nothing them to do it better as a ${job} today and tell me to do it. 
                You can explain why it could be useful in my job but it is not needed.  ${addon}
                 Answer in ${language} . Adopt a friendly tone and be serious but it is not an email and don't speak as a robot :
                  Do not use quotation marks when talking about the name of a daily habit, make a sentence including the daily habit but not quoting it. 
                  It will be used as a motivational message trough an application. String returned should be directly ready to be displayed so without any markups.
                  Use various forms of greeting.`,
    
            },
        ],
    });
    return([completion.choices[0].message.content,model]);
}

async function generateWeeklyAdvice(dataWeek) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are a helpful assistant. You are going to receive JSON data that will represents the tracking of one week of daily habit tracking by an user of my application. If a daily habit key has 0 as value, it has not been done. If it has 1 it has been done. If it has 2, it has not been completed." },
            {
                role: "user",
                content: `Here my json data from my daily habit tracking week. ${dataWeek} . Choose an habit that I did good and congrats me for that. Choose one or two habits that I did bad and give me 2 advices to do it better next week. Fix 1 objective of score for next week about 1 habit I did bad this week . Answer in french. Adopt a profesional tone and be serious but it is not an email. It will be used as a motivational message trough an applciation.`,

            },
        ],
    });
}

function getRandomKeyWithZeroValue(obj) {
    const keysWithZeroValue = Object.keys(obj).filter(key => obj[key] === 0);
    if (keysWithZeroValue.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * keysWithZeroValue.length);
    return keysWithZeroValue[randomIndex];
}
export {generateDailyAdvice}