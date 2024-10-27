import React, { useState, useEffect, useRef } from 'react';
import DayTracker from '../DayTracker/DayTracker';
import "./TrackerApp.css"
import HabitsManager from '../HabitsManager/HabitsManager';
import { findMostAdvancedDate, getDatesBetween, replaceValues, calculateAverages, getAverageFromObj } from '../functions.js';
import ContextMenu from '../ContextMenu/ContextMenu.js';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import closeImage from "../../assets/close.png"
import Assistant from '../Assistant/Assistant.js';
import ProfileSetter from '../ProfileSetter/ProfileSetter.js';
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"

const TrackerApp = (props) => {
    const [authorized, setAuthorized] = useState(false)
    const [dataTracker, setDataTracker] = useState([{}])
    const [habitsUser, setHabitsUser] = useState({})
    const [columns, setColumns] = useState(3)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [averages, setAverages] = useState([])
    const [averageTotal, setAverageTotal] = useState(0)
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [editorState, setEditorState] = useState("none")
    const [textCellEditor, setTextCellEditor] = useState("")
    const [dateCellEditor, setDateCellEditor] = useState("")
    const [habitCellEditor, setHabitCellEditor] = useState("")
    const goRoute = useNavigateAndScroll()
    const longPressTimer = useRef(null);
    const longPressDuration = 500; // milliseconds
    const menuRef = useRef(null);
    const handleContextMenu = (event, habit) => {
        event.preventDefault();
        setContextMenu({
            visible: true,
            x: event.pageX,
            y: event.pageY,
            habit: habit
        });
    };
    const handleTouchStart = (event, habit) => {
        longPressTimer.current = setTimeout(() => {
            setContextMenu({
                visible: true,
                x: event.pageX,
                y: event.pageY,
                habit: habit
            });
        }, longPressDuration);
    };

    const handleTouchEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    };
    const handleClose = () => {
        setContextMenu({ ...contextMenu, visible: false });
    };

    const handleClick = (action) => {
        alert(`You selected: ${action}`);
        handleClose();
    };

    function openTextCellEditor(text, date, habit) {
        setTextCellEditor(text)
        setDateCellEditor(date)
        setHabitCellEditor(habit)
        setEditorState("overlayBig")
    }
    function closeTextCellEditor() {
        setEditorState("none")
    }
    useEffect(() => {
        if (props.logged === false) {
            goRoute('/')
        }
    }, []);
    useEffect(() => {
        if (props.logged === false) {
            goRoute('/')
        }
    }, [props.logged])
    function changeCellValue(day, habit, newValue) {
        setDataTracker(prevState =>
            prevState.map(item =>
                item.date === day ? { ...item, [habit]: newValue } : item
            )
        );
    }
    function updateHabits() {
        return new Promise((resolve, reject) => {
            fetch(SERVER_NAME + "/habits", {
                credentials: 'include',
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(
                        data => { setHabitsUser(data); resolve(data) }
                    )
                }
            })
        })
    }

    useEffect(() => {
        if (dataLoaded && props.profile.profileSet === 1) {
            var container = document.getElementById("spreadSheet");
            container.scrollLeft = container.scrollWidth;
        }
    }, [dataLoaded, props.profile.profileSet])
    function updateData() {
        updateHabits().then((habitsUser) => {
            fetch(SERVER_NAME + "/data", {
                credentials: 'include',
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(
                        data => {
                            setDataLoaded(true)
                            console.log(findMostAdvancedDate(data)["date"])
                            let datesToAdd = getDatesBetween(findMostAdvancedDate(data)["date"])
                            console.log(datesToAdd)
                            for (let d in datesToAdd) {
                                let newDay = replaceValues(habitsUser)
                                newDay["date"] = datesToAdd[d]
                                data.push(newDay)
                            }
                            data.sort((a, b) => {
                                return new Date(a.date.split('-').reverse().join('-')) - new Date(b.date.split('-').reverse().join('-')); // Sort in descending order
                            });
                            setDataTracker(data);
                            const averages = calculateAverages(data, habitsUser)
                            setAverages(averages)
                            setAverageTotal(getAverageFromObj(averages))

                        })
                }
            })
        })
    }

    useEffect(() => {
        props.updateProfile().then(updateData()
        )
    }, [])
    useEffect(() => {
        changeCellValue(dateCellEditor, habitCellEditor, textCellEditor)
    }, [textCellEditor])
    useEffect(() => {
        if (!dataLoaded) { return }
        setTimeout(() => {
            const averages = calculateAverages(dataTracker, habitsUser)
            setAverages(averages)
            setAverageTotal(getAverageFromObj(averages))
            fetch(SERVER_NAME + "/updatedata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataTracker),
                credentials: 'include'
            })
                .then(response => { })
        }, 1000)
    }, [dataTracker])
    return (
        <div>
            {dataLoaded && props.profile.profileSet === 1 ? <div id='trackerApp'>
                <Assistant name={props.profile.name}></Assistant>
                <div id='spreadSheet'>
                    {dataTracker.map((dataDay, index) => (
                        <DayTracker openTextCellEditor={openTextCellEditor} habitsUser={habitsUser} changeCellValue={changeCellValue} key={index} columns={columns} dataDay={dataDay}></DayTracker>
                    ))}

                    <div className='dayLine' id='habitsColumn'>
                        <p className="title" id='dateCell2'>Date</p>
                        {Object.keys(habitsUser).map((columnName, index) => (<div className="title no-select" key={columnName} onTouchStart={(e) => handleTouchStart(e, columnName)}
                            onTouchEnd={handleTouchEnd} onContextMenu={(event) => handleContextMenu(event, columnName)}><p className='no-select' key={columnName} >{columnName}</p></div>))}
                    </div>
                    <div className='dayLine' id='averagesColumn'>
                        <p className="moyenne" id='dateCell1'>{isNaN(Math.round(averageTotal * 10) / 10) ? null : Math.round(averageTotal * 10) / 10 + " %"}</p>
                        {Object.keys(habitsUser).map((columnName, index) => (habitsUser[columnName] === "bool" && averages[columnName] !== undefined ? <p key={columnName} className="moyenne">{Math.round(averages[columnName] * 10) / 10} %</p> : <p key={columnName} className="moyenne"></p>))}
                    </div>
                    <div id='hidder'></div>
                </div>
                <HabitsManager updateData={updateData}></HabitsManager>
                {contextMenu.visible &&
                    <ClickAwayListener onClickAway={handleClose} touchEvent={false}>
                        <div>
                            <ContextMenu
                                habitsUser={habitsUser}
                                position={{ x: contextMenu.x, y: contextMenu.y }}
                                onClose={handleClose}
                                onSelect={handleClick}
                                habit={contextMenu.habit}
                                updateData={updateData}
                            />
                        </div>
                    </ClickAwayListener>}
                {(contextMenu.visible && window.innerWidth <= 1080) &&
                    <div id='overlayMenu'></div>}
                {editorState === "none" ? null :
                    <div className={editorState}>
                        <ClickAwayListener onClickAway={closeTextCellEditor} touchEvent={false}>
                            <div id='overlayTextCellEditor' >
                                <div id='firstLineCellEditor'><p id='titleCellEditor'>{dateCellEditor + " " + habitCellEditor}</p><button onClick={closeTextCellEditor} id='closeCellEditor'><img id='closeImg' src={closeImage}></img></button></div>

                                <div className="textCellEditor">
                                    <textarea className="textAreaCell" value={textCellEditor} onChange={(e) => setTextCellEditor(e.target.value)} ></textarea>
                                </div>
                            </div>
                        </ClickAwayListener>
                    </div>
                }

            </div> : dataLoaded && props.profile.profileSet === 0 ? <ProfileSetter updateProfile={props.updateProfile} updateData={updateData} updateHabits={updateHabits}></ProfileSetter> : <div id="appWaiter"></div>}
        </div>
    );
};

export default TrackerApp;