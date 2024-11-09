import React, { useEffect, useState } from 'react';
import "./Blog.css"
import ArticleLink from "./ArticleLink.js"
import botImg from "../../assets/Arco1.png"
import cover1 from "./covers/from-data-to-action-using-ai-insights-to-refine-your-daily-habits.jpg"
import { Helmet } from 'react-helmet';
const Blog = (props) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  })

  return (
    <div id='blog'>
      <Helmet>
        <title>With Arco | Blog about productivity</title>
        <meta name="description" content="A blog with multiples articles about productivity, time managing, AI and more." />
        <meta property="og:title" content="With Arco | Blog about productivity" />
        <meta property="og:description" content="A blog with multiples articles about productivity, time managing, AI and more." />
        <meta property="og:image" content="https://withar.co/static/media/Arco1.c74a12087a62cf33a280.png" />
      </Helmet>
      <h1>All blog posts</h1>
      <div id="articlesBox">
        <ArticleLink cover={cover1} date={"09-11-2024"} title={"From Data to Action: Using AI Insights to Refine Your Daily Habits"} description={"Discover how AI-driven data analysis from habit trackers can help young males boost productivity by making informed adjustments to their routines. Learn the key benefits and actionable strategies to enhance daily habits."} tags={["AI", "productivity"]} route={"/blog/from-data-to-action-using-ai-insights-to-refine-your-daily-habits"}></ArticleLink>
      </div>
    </div>
  );
};

export default Blog;
