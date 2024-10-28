import OpenAI from "openai";
import fs from 'fs';
const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
const openai = new OpenAI({ apiKey: keys["openai"] });
const models = ["gpt-4o", "gpt-4o-mini"]
const addons = ["End the message with a motivational quote from a famous people.", "Do not call me by my name but by a motivationnal nickname.", "Remind me to track my day on the application at the end of the day.", "", ""]

async function generateDailyAdvice(data, name, job, language, objectives) {
    const habit = getOneHabitFromData(data)
    const habitState = data[habit] === 0 ? "not done" : data[habit] === 1 ? "done" : "empty"
    const direction1 = "today and tell me to do it."//job===null && objectives===null ? "today and tell me to do it." :job!==null && objectives===null?`as a ${job} today and tell me to do it.`:job===null && objectives!==null?`since when I got asked what are my objectives, I answered : ${objectives}`:`since when I got asked what are my objectives, I answered : ${objectives} and my job is ${job}.`
    const habitPrompt = habitState === "not done" ? `Yesterday I did not completed my ${habit} daily habit, give me 2 advices to do it better ${direction1} ` :
        habitState === "done" ? `Yesterday I did complete my ${habit} daily habit, give me a compliment about it and remind me why I need to stay focus on completing this daily habit.` :
            `Yesterday, I did not track my daily habits completion into the application. Remind me friendly but with argumentation why I need to do it to boost my productivity.`
    const randomIndex = Math.floor(Math.random() * addons.length);
    const addon = addons[randomIndex]
    const randomIndex2 = Math.floor(Math.random() * 2);
    const model = models[randomIndex2]
    const randomNumber = Math.floor(Math.random() * 5);
    const randomNumber2 = Math.floor(Math.random() * 5);
    const prompt = `Hi, my name is ${name} ${job!==null && randomNumber2===0?`and my job is ${job}`:``} ${objectives!==null && randomNumber===0 ?`,when I got asked what are my objectives, I answered : ${objectives}`:``}. ${habitPrompt} You can explain why it could be useful in my job but it is not needed.  ${addon}
                 Answer in ${language} and make links between my job, objectives and daily habit if it is pertinent. Adopt a friendly tone and be serious but it is not an email and don't speak as a robot :
                  Do not use quotation marks when talking about the name of a daily habit, make a sentence including the daily habit but not quoting it. 
                  It will be used as a motivational message trough an application. String returned should be directly ready to be displayed so without any markups.
                  Use various forms of greeting.`
                  console.log(prompt)
    const completion = await openai.chat.completions.create({
        model: model,
        messages: [
            {
                role: "system", content: `You are a helpful assistant. You are going to receive an instruction about an user having completed or no one of his daily habits.
             Data comes from an user of MY application so don't send them to another productivity application. Keep on mind that you are an assistant of users of an application.` },
            {
                role: "user",
                content: prompt,

            },
        ],
    });
    return ([completion.choices[0].message.content, model]);
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

function getOneHabitFromData(obj) {
    const keysWithZeroValue = Object.keys(obj).filter(key => obj[key] === 0);
    console.log(keysWithZeroValue)
    if (keysWithZeroValue.length === 0) {
        const keysWithOneValue = Object.keys(obj).filter(key => obj[key] === 1);
        console.log(keysWithOneValue)

        if (keysWithOneValue.length === 0) {
            //did not track
            return null
        }
        const randomIndex = Math.floor(Math.random() * keysWithOneValue.length);
        return keysWithOneValue[randomIndex];
    }
    const randomIndex = Math.floor(Math.random() * keysWithZeroValue.length);
    return keysWithZeroValue[randomIndex];
}

/*generateDailyAdvice(
    {
        "date": "24-10-2024",
        "Wake up before 9 oclock": 2,
        "No junkfood": 2,
        "Pray": 0,
        "Read Bible": 2,
        "SPENT": "3.5 coffee\n16 health supps\n10 food\n= 29.5e\n\n+113 caution",
        "Nuts": "0",
        "New Articles": "2",
        "Answers posted": "11",
        "Gym": ""
    },
    "Valen",
    "Life coach", "english","I want to get more clients so I can leave my 9 to 5 job").then(console.log)*/
export { generateDailyAdvice }