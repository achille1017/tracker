import React, { useState, useEffect } from 'react';
import "./StepsProfileSetter.css"
import HabitsManager from '../HabitsManager/HabitsManager';
import Typewriter from '../TypeWriter/TypeWriter';
import HabitExample from '../HabitExample/HabitExample';


const Step4 = (props) => {
    const [id1, setId1] = useState("none")
    const [id2, setId2] = useState("none")
    const [id3, setId3] = useState("none")
    const [id4, setId4] = useState("none")
    const [id5, setId5] = useState("none")
    const [id6, setId6] = useState("none")
    const [id7, setId7] = useState("none")
    const [id8, setId8] = useState("none")
    useEffect(() => {
        setTimeout(() => {
            setId1("")
            setTimeout(() => {
                setId2("")
                setTimeout(() => {
                    setId3("")
                    setTimeout(() => {
                        setId4("")
                        setTimeout(() => {
                            setId5("")
                            setTimeout(() => {
                                setId6("")
                                setTimeout(() => {
                                    setId7("")
                                    setTimeout(() => {
                                        setId8("")
                                    }, 600)
                                }, 1500)
                            }, 600)
                        }, 600)
                    }, 600)
                }, 600)
            }, 4400)
        }, 1500)
    }, [])
    function createNewHabit(newHabit, newHabitType) {
        fetch("http://localhost:4000/newhabit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "newHabit": newHabit, "newHabitType": newHabitType }),
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 200) {
                }
            })
    }
    return (
        <div className='step4ProfileSetter'>
            <Typewriter className={"textProfileSetter"} delay={30} text={"Let's determine which habit you should track."}></Typewriter>
            {id1 !== "none" && <Typewriter delay={20} text={"You can track 3 types of habits, the one that are done or not done, the one that will be counted (example : cigarettes smoked) and the one that needs some text (example : notes taking)."}></Typewriter>}
            <div id='habitExamples'>
                <div className='habitExamplesColumn'>
                    <p id={id2} className='titleHabitExample'>Physical health</p>
                    <HabitExample id={id2} habitName="Wake up at 8am" habitType="bool"></HabitExample>
                    <HabitExample id={id3} habitName="Sleep at 11pm" habitType="bool"></HabitExample>
                    <HabitExample id={id4} habitName="No junkfood" habitType="bool"></HabitExample>
                    <HabitExample id={id5} habitName="Coffees" habitType="number"></HabitExample>
                </div>
                <div className='habitExamplesColumn'>
                    <p id={id2} className='titleHabitExample'>Mental health</p>
                    <HabitExample id={id2} habitName="No porn" habitType="bool"></HabitExample>
                    <HabitExample id={id3} habitName="Cold shower" habitType="bool"></HabitExample>
                    <HabitExample id={id4} habitName="Meditation" habitType="bool"></HabitExample>
                    <HabitExample id={id5} habitName="Notes" habitType="text"></HabitExample>

                </div>
                <div className='habitExamplesColumn'>
                    <p id={id2} className='titleHabitExample'>Productivity</p>
                    <HabitExample id={id2} habitName="Tasks planning" habitType="bool"></HabitExample>
                    <HabitExample id={id3} habitName="Deep work" habitType="bool"></HabitExample>
                    <HabitExample id={id4} habitName="Mails answering" habitType="bool"></HabitExample>
                    <HabitExample id={id5} habitName="Work notes" habitType="text"></HabitExample>
                </div>
            </div>
            {id6 !== "none" && <Typewriter text={"Or any custom habit of your choice"} delay={30}></Typewriter>}
            {id7 !== "none" && <HabitsManager updateData={props.updateData}></HabitsManager>}
            {id8 !== "none" && <div className='navigatorProfileSetter'>
                <button className='simpleNavigatorButton' onClick={() => props.setStep(3)}>Previous step</button>
                <button id='startProfile' onClick={props.setProfile}>Let's start</button>

            </div>}
        </div>
    )
};

export default Step4;