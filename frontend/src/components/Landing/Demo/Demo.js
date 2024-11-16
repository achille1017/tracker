import React, { useState, useEffect } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import CellBoolDemo from './CellBoolDemo.js';
import CellTextDemo from './CellTextDemo.js';
import closeImage from "../../../assets/close.png"
import CellNumberDemo from './CellNumberDemo.js';
import "./Demo.css"
import botImg from "../../../assets/Arco1.png"
import Typewriter from '../../TypeWriter/TypeWriter.js';
import useNavigateAndScroll from '../../functions.js';
import { Link } from 'react-router-dom';

const Demo = (props) => {
    const [editorState, setEditorState] = useState("none")
    const [textCellEditor, setTextCellEditor] = useState("")
    const [dateCellEditor, setDateCellEditor] = useState("")
    const [habitCellEditor, setHabitCellEditor] = useState("")
    const [dataDemo, setDataDemo] = useState({})
    const [dates, setDates] = useState(getDateArray())
    const [loaded, setLoaded] = useState(false)
    const [averages, setAverages] = useState([])
    const [averageTotal, setAverageTotal] = useState(0)
    const goRoute = useNavigateAndScroll()
    function openTextCellEditor(text, date, habit) {
        setTextCellEditor(text)
        setDateCellEditor(date)
        setHabitCellEditor(habit)
        setEditorState("overlayBig")
    }
    function closeTextCellEditor() {
        setEditorState("none")
    }
    function getDateArray() {
        const today = new Date();
        const dates = [];
        for (let i = -2; i <= 1; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            dates.push(`${dd}-${mm}-${yyyy}`);
        }
        return dates;
    }
    useEffect(() => {
        setTimeout(() => {
            let averagesCalc = calculateAverages()
            setAverages({
                "Wake up at 8am": averagesCalc[0],
                "No junkfood": averagesCalc[1],
                "Cold shower": averagesCalc[2],
                "Content creation": averagesCalc[3]
            })
            setAverageTotal((averagesCalc[0] + averagesCalc[1] + averagesCalc[2] + averagesCalc[3]) / 4)
        }, 500)
    }, [dataDemo])
    function calculateAverages() {
        let averagesCalc = []
        let habitsNames = ["Wake up at 8am", "No junkfood", "Cold shower", "Content creation"]
        for (const habitName in habitsNames) {
            let sum = 0;
            let count = 0;
            for (const date in dataDemo) {
                const wakeUpValue = dataDemo[date][habitsNames[habitName]];
                if (wakeUpValue === 0 || wakeUpValue === 1) {
                    sum += wakeUpValue;
                    count++;
                }
            }
            const average = count > 0 ? (sum / count) * 100 : 0;
            averagesCalc.push(Math.round(average))
        }
        return averagesCalc
    }

    function changeCellValue(date, habitName, newState) {
        setDataDemo(prevData => ({
            ...prevData,
            [date]: {
                ...prevData[date],
                [habitName]: newState
            }
        }));
    }
    useEffect(() => {
        setDataDemo({
            [dates[0]]: { "Notes": "Text fields are the simplest way to note anything you need about your day.", "Wake up at 8am": 0, "Cold shower": 1, "No junkfood": 0, "Content creation": 0 },
            [dates[1]]: { "Notes": "Woke up early, hit the gym for a chest workout, then tackled my to-do list while sipping coffee. Feeling good !", "Wake up at 8am": 1, "Cold shower": 1, "No junkfood": 0, "Content creation": 0 },
            [dates[2]]: { "Notes": "Acquired a new client today !! I went for a big walk in the park then organized my workspace. Ended the day reading my book.", "Wake up at 8am": 1, "Cold shower": 0, "No junkfood": 1, "Content creation": 1 },
            [dates[3]]: { "Notes": "", "Wake up at 8am": 2, "Cold shower": 2, "No junkfood": 2, "Content creation": 2 },
        })
        setLoaded(true)
    }, [dates])
    useEffect(() => {
        if (textCellEditor) {
            dataDemo[dateCellEditor][habitCellEditor] = textCellEditor
        }
    }, [textCellEditor])
    return (
        <div id='demoBox'>
            <h2 className='text2' id='demoTag'>How does it works ?</h2>
            <div id='assistantDemo'>
                <img id='botDemo' src={botImg}></img>
                <Typewriter id={"loginAdvice"} text={`Here is a simple demo of how the app works. Each day I will advice you analysing data from the previous day. Give it a try and then go for our 5-day free trial ! Each column is a day and each line a dail habit. ${window.innerWidth>1080?"Click on ":"Touch"} a cell to change its value.`} link={"/docs"} textLink={"More infos here."} delay={20} />
            </div>
            <div id='demoUnderBox'>
                {loaded &&
                    <div id='spreadSheetDemo'>
                        <div className='dayLine'>
                            <div className='dateCell' ><p>{dates[0].slice(0, -5)}</p></div>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[0]} habitName="Wake up at 8am" cellData={dataDemo[dates[0]]["Wake up at 8am"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[0]} habitName="No junkfood" cellData={dataDemo[dates[0]]["No junkfood"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[0]} habitName="Cold shower" cellData={dataDemo[dates[0]]["Cold shower"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[0]} habitName="Content creation" cellData={dataDemo[dates[0]]["Content creation"]}></CellBoolDemo>
                            <CellTextDemo openTextCellEditor={openTextCellEditor} date={dates[0]} habitName="Notes" cellData={dataDemo[dates[0]]["Notes"]}></CellTextDemo>
                            <CellNumberDemo cellData={2} date={dates[0]}></CellNumberDemo>
                        </div>
                        <div className='dayLine'>
                            <div className='dateCell'><p>{dates[1].slice(0, -5)}</p></div>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[1]} habitName="Wake up at 8am" cellData={dataDemo[dates[1]]["Wake up at 8am"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[1]} habitName="No junkfood" cellData={dataDemo[dates[1]]["No junkfood"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[1]} habitName="Cold shower" cellData={dataDemo[dates[1]]["Cold shower"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[1]} habitName="Content creation" cellData={dataDemo[dates[1]]["Content creation"]}></CellBoolDemo>
                            <CellTextDemo openTextCellEditor={openTextCellEditor} date={dates[1]} habitName="Notes" cellData={dataDemo[dates[1]]["Notes"]}></CellTextDemo>
                            <CellNumberDemo cellData={0} date={dates[1]}></CellNumberDemo>
                        </div>
                        <div className='dayLine'>
                            <div className='dateCell' id='todayCell'><p>{dates[2].slice(0, -5)}</p></div>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[2]} habitName="Wake up at 8am" cellData={dataDemo[dates[2]]["Wake up at 8am"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[2]} habitName="No junkfood" cellData={dataDemo[dates[2]]["No junkfood"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[2]} habitName="Cold shower" cellData={dataDemo[dates[2]]["Cold shower"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[2]} habitName="Content creation" cellData={dataDemo[dates[2]]["Content creation"]}></CellBoolDemo>
                            <CellTextDemo openTextCellEditor={openTextCellEditor} date={dates[2]} habitName="Notes" cellData={dataDemo[dates[2]]["Notes"]}></CellTextDemo>
                            <CellNumberDemo cellData={1} date={dates[2]}></CellNumberDemo>
                        </div>
                        <div className='dayLine'>
                            <div className='dateCell'><p>{dates[3].slice(0, -5)}</p></div>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[3]} habitName="Wake up at 8am" cellData={dataDemo[dates[3]]["Wake up at 8am"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[3]} habitName="No junkfood" cellData={dataDemo[dates[3]]["No junkfood"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[3]} habitName="Cold shower" cellData={dataDemo[dates[3]]["Cold shower"]}></CellBoolDemo>
                            <CellBoolDemo changeCellValue={changeCellValue} date={dates[3]} habitName="Content creation" cellData={dataDemo[dates[3]]["Content creation"]}></CellBoolDemo>
                            <CellTextDemo openTextCellEditor={openTextCellEditor} date={dates[3]} habitName="Notes" cellData={dataDemo[dates[3]]["Notes"]}></CellTextDemo>
                            <CellNumberDemo date={dates[3]}></CellNumberDemo>
                        </div>
                        <div className='dayLine' id='habitsColumnDemo'>
                            <p className="title" id='dateCell2'>Date</p>
                            <div className="title no-select"><p className='no-select'>Wake up at 8am</p></div>
                            <div className="title no-select"><p className='no-select'>No junkfood</p></div>
                            <div className="title no-select"><p className='no-select'>Cold shower</p></div>
                            <div className="title no-select"><p className='no-select'>Content creation</p></div>
                            <div className="title no-select"><p className='no-select'>Notes</p></div>
                            <div className="title no-select"><p className='no-select'>Coffees</p></div>
                        </div>
                        <div className='dayLine' id='averagesColumnDemo'>
                            <p className="moyenne" id='dateCell1'>{isNaN(Math.round(averageTotal * 10) / 10) ? null : Math.round(averageTotal * 10) / 10 + " %"}</p>
                            <p className="moyenne">{Math.round(averages["Wake up at 8am"] * 10) / 10} %</p>
                            <p className="moyenne">{Math.round(averages["No junkfood"] * 10) / 10} %</p>
                            <p className="moyenne">{Math.round(averages["Cold shower"] * 10) / 10} %</p>
                            <p className="moyenne">{Math.round(averages["Content creation"] * 10) / 10} %</p>
                            <p className="moyenne"></p>
                            <p className="moyenne"></p>

                        </div>
                    </div>}
            </div>
            {editorState === "none" ? null :
                <div className={editorState}>
                    <ClickAwayListener onClickAway={closeTextCellEditor} touchEvent={false}>
                        <div id='overlayTextCellEditor' >
                            <div id='firstLineCellEditor'><p id='titleCellEditor'>{dateCellEditor + " " + habitCellEditor}</p><button onClick={closeTextCellEditor} id='closeCellEditor'><img id='closeImg' src={closeImage}></img></button></div>

                            <div className="textCellEditor">
                                <textarea className="textAreaCell" value={textCellEditor} onChange={(e) => { setTextCellEditor(e.target.value); }} ></textarea>
                            </div>
                        </div>
                    </ClickAwayListener>
                </div>
            }
        </div>
    );
};

export default Demo;

const today = new Date();
