import React, { useState, useEffect } from 'react';
import "./StepsProfileSetter.css"
import HabitsManager from '../HabitsManager/HabitsManager';
import Typewriter from '../TypeWriter/TypeWriter';
import HabitExample from '../HabitExample/HabitExample';
import { SERVER_NAME } from '../../config.js';


const Step4 = (props) => {
    const [id1, setId1] = useState("hidden")
    const [id2, setId2] = useState("hidden")
    const [id3, setId3] = useState("hidden")
    const [id4, setId4] = useState("hidden")
    const [id5, setId5] = useState("hidden")
    const [id6, setId6] = useState("hidden")
    const [id7, setId7] = useState("hidden")
    const [id8, setId8] = useState("hidden")
    const [id9, setId9] = useState("hidden")
    const [id10, setId10] = useState("hidden")

    useEffect(() => {
        setTimeout(() => {
            setId1("")
            setTimeout(() => {
                setId9("visible")
                setTimeout(() => {
                    setId2("visible")
                    setTimeout(() => {
                        setId3("visible")
                        setTimeout(() => {
                            setId4("visible")
                            setTimeout(() => {
                                setId5("visible")
                                setTimeout(() => {
                                    setId6("visible")
                                    setTimeout(() => {
                                        setId7("visible")
                                        setTimeout(() => {
                                            setId8("visible")
                                            setTimeout(() => {
                                                setId10("visible")
                                            }, 600)
                                        }, 600)
                                    }, 1500)
                                }, 600)
                            }, 600)
                        }, 600)
                    }, 600)
                }, 600)
            }, 4400)
        }, 1500)
    }, [])
    return (
        <div className='step4ProfileSetter'>
            <Typewriter className={"textProfileSetter"} delay={30} text={"Let's determine which habit you should track."}></Typewriter>
            {id1 !== "hidden" && <Typewriter delay={20} text={"You can track 3 types of habits, the one that are done or not done, the one that will be counted (example : cigarettes smoked) and the one that needs some text (example : notes taking)."}></Typewriter>}
            <div id='habitExamples'>
                <div className='habitExamplesColumn'>
                    <p id={id9} className='titleHabitExample'>Physical health</p>
                    <HabitExample id={id2} habitName="Wake up at 8am" habitType="bool"></HabitExample>
                    <HabitExample id={id3} habitName="Sleep at 11pm" habitType="bool"></HabitExample>
                    <HabitExample id={id4} habitName="No junkfood" habitType="bool"></HabitExample>
                    <HabitExample id={id5} habitName="Coffees" habitType="number"></HabitExample>
                </div>
                <div className='habitExamplesColumn'>
                    <p id={id9} className='titleHabitExample'>Mental health</p>
                    <HabitExample id={id2} habitName="No porn" habitType="bool"></HabitExample>
                    <HabitExample id={id3} habitName="Cold shower" habitType="bool"></HabitExample>
                    <HabitExample id={id4} habitName="Meditation" habitType="bool"></HabitExample>
                    <HabitExample id={id5} habitName="Notes" habitType="text"></HabitExample>

                </div>
                <div className='habitExamplesColumn'>
                    <p id={id9} className='titleHabitExample'>Productivity</p>
                    <HabitExample id={id2} habitName="Tasks planning" habitType="bool"></HabitExample>
                    <HabitExample id={id3} habitName="Deep work" habitType="bool"></HabitExample>
                    <HabitExample id={id4} habitName="Mails answering" habitType="bool"></HabitExample>
                    <HabitExample id={id5} habitName="Work notes" habitType="text"></HabitExample>
                </div>
            </div>
            {id6 !== "hidden" && <Typewriter text={"Or any custom habit of your choice"} delay={30}></Typewriter>}
            <HabitsManager id={id7} updateData={props.updateData}></HabitsManager>
            <div className='navigatorProfileSetter'>
                <button  id={id8} className='simpleNavigatorButton' onClick={() => props.setStep(3)}>Previous step</button>
                <button id={id10} className='startProfile' onClick={props.setProfile}>Let's start</button>

            </div>
        </div>
    )
};

export default Step4;