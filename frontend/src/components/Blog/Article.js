
import React, { useEffect, useState } from 'react';
import "./Blog.css"
import botImg from "../../assets/Arco1.png"
import FromDataToAction from './Articles/FromDataToAction';
import { useLocation,useParams } from 'react-router-dom';
import MasteringTimeManagement from './Articles/MasteringTimeManagement';

const Article = (props) => {
    const { title } = useParams();
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }, [location.pathname])
    return (
        <div id='article'>
           {title==="from-data-to-action-using-ai-insights-to-refine-your-daily-habits" ? <FromDataToAction></FromDataToAction>:
           title==="mastering-time-management-tips-and-tools-for-busy-professionals-using-habit-trackers" ? <MasteringTimeManagement></MasteringTimeManagement>:
           null}
        </div>
    );
};

export default Article;
