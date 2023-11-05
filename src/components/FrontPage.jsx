import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = ({username}) => {
  const navigate = useNavigate();
  const createSession = () => {
    navigate('/createsession');
  }
  return (
    <div className="mainMenu">
      <nav className="headerMenu">
        <img src="./logo_small.png"/>
        <ul>
          <li className="username">WELCOME{username}</li>
          <li>LOGOUT</li>
        </ul>
      </nav>
      <section className="selectionMenu">
        <h1>What would you like to learn today?</h1>
        <div className="selectionButtons">
          <button className="gridItem" type='button' onClick={createSession}>CREATE STUDY SESSION</button>
          <button className="gridItem" type='button'>REVIEW STUDY SESSIONS</button>
          <button className="gridItem" type='button'>CREATE FLASH CARDS</button>
          <button className="gridItem" type='button'>STUDY FLASH CARDS</button>
        </div>
      </section>
      <nav className="footerMenu">
        <ul>
          <li>ABOUT</li>
          <li>HELP</li>
        </ul>
      </nav>
    </div>
  );
};
export default FrontPage;
