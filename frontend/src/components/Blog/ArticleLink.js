
import React, { useEffect, useState } from 'react';
import "./ArticleLink.css"
import botImg from "../../assets/Arco1.png"
import { Link, useSearchParams } from 'react-router-dom';

const ArticleLink = (props) => {

    return (
        <Link to={props.route} className='articleLink'>
            <img className='coverArticleLink' src={props.cover}></img>

            <div className='bottomArticleLink'>
                <p>{props.date}</p>
                <h2 className='articleLinkTitle'>{props.title}</h2>
                <p>{props.description}</p>
                <div className='tagsArticleLink'>{props.tags.map((tag,index)=><p className='tagArticleLink' key={tag}>{tag}</p>)}</div>
            </div>
        </Link>
    );
};

export default ArticleLink;
