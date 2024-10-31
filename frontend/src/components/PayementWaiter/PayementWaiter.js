import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./PayementWaiter.css"
import { SERVER_NAME } from '../../config.js';
import { io } from 'socket.io-client'
import { useNavigateAndScroll } from "../functions.js"

const PayementWaiter = (props) => {
    const goRoute = useNavigateAndScroll()

    const [planActive, setPlanActive] = useState(false)
    const socket = io(SERVER_NAME, {
        withCredentials: true
    });
    function updatePlan() {
        props.updatePlan().then(plan => { console.log(plan); if (plan.status === "active" || plan.status === "paid") { setPlanActive(true) } })
        setTimeout(updatePlan,15000)
    }

    useEffect(() => {
        props.updateLogged().then((logged) => {
            if (!logged) { goRoute('/') }
            else {
                console.log("trying to connect")
                socket.on('connect', () => {
                    console.log('Connected to server');
                    socket.emit('joinRoom');
                });
                socket.on('subscription_updated', () => {
                    console.log('subscription_updated');
                    updatePlan()
                });
                socket.on('connect_error', (error) => {
                    console.error('Connection error:', error);
                });
                updatePlan()
            }
        })

    }, [])
    return (
        <div id='payementWaiter'>
            {!planActive ? <div id="payementWaiterBox">
                <p id="title1Payement">Waiting for confirmation...  </p>
                <div className="loader" id='payementLoader'></div>
            </div> : <div id="payementWaiterBox"><p id="title1Payement">Everything is ready !</p><Link to="/tracker" id="continue">Continue</Link></div>}
        </div>
    );
};

export default PayementWaiter;
