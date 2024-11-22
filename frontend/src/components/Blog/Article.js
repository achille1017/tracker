
import React, { useEffect, useState } from 'react';
import "./Blog.css"
import botImg from "../../assets/Arco1.png"
import FromDataToAction from './Articles/FromDataToAction';
import { useLocation, useParams } from 'react-router-dom';
import MasteringTimeManagement from './Articles/MasteringTimeManagement';
import WhyDidILaunchMyFirstSaas from './Articles/WhyDidILaunchMyFirstSaas';

const Article = (props) => {
    const { title } = useParams();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }, [location.pathname])
    return (
        <div id='article'>
            {title === "from-data-to-action-using-ai-insights-to-refine-your-daily-habits" ? <FromDataToAction></FromDataToAction> :
                title === "mastering-time-management-tips-and-tools-for-busy-professionals-using-habit-trackers" ? <MasteringTimeManagement></MasteringTimeManagement> :
                    title === "why-did-i-launch-my-first-saas-if-i-need-this-app-others-do-too" ? <WhyDidILaunchMyFirstSaas></WhyDidILaunchMyFirstSaas> :
                        null}
        </div>
    );
};

export default Article;
