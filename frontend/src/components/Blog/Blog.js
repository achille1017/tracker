import React, { useEffect, useState } from 'react';
import "./Blog.css"
import ArticleLink from "./ArticleLink.js"
import botImg from "../../assets/Arco1.png"
import cover1 from "./covers/from-data-to-action-using-ai-insights-to-refine-your-daily-habits.jpg"
import cover2 from "./covers/mastering-time-management-tips-and-tools-for-busy-professionals-using-habit-trackers.jpg"
import cover3 from "./covers/why-did-i-launch-my-first-saas.jpg"
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
        <ArticleLink cover={cover3} date={"24-11-2024"} title={"Why Did I Launch my First SaaS: If I Need this App, Others Do Too."} description={"To succeed, a SaaS needs to address a problem. I was personally lacking in productivity when I watched a video about time management. I discovered habit tracking and wanted an app that would exactly meet my needs."} tags={["SaaS", "dev"]} route={"/blog/why-did-i-launch-my-first-saas-if-i-need-this-app-others-do-too"}></ArticleLink>

        <ArticleLink cover={cover2} date={"20-11-2024"} title={"Mastering Time Management: Tips and Tools for Busy Professionals Using Habit Trackers"} description={"Conquer the chaos of modern life With Arco, your secret weapon! Transform time into a loyal ally, elevate productivity, and flourish personally using AI-powered, goal-smashing strategies. Set sail for success!"} tags={["tips", "productivity"]} route={"/blog/mastering-time-management-tips-and-tools-for-busy-professionals-using-habit-trackers"}></ArticleLink>

        <ArticleLink cover={cover1} date={"13-11-2024"} title={"From Data to Action: Using AI Insights to Refine Your Daily Habits"} description={"Discover how AI-driven data analysis from habit trackers can help young men boost productivity by making informed adjustments to their routines. Learn the key benefits and actionable strategies to enhance daily habits."} tags={["AI", "productivity"]} route={"/blog/from-data-to-action-using-ai-insights-to-refine-your-daily-habits"}></ArticleLink>

      </div>
    </div>
  );
};

export default Blog;
