import React from "react";
import { useState } from "react";

const FrontPage = ({ createSession }) => {
  return (
    <>
      <h1>What would you like to learn today?</h1>
      <button type='button' onClick={createSession}>CREAT NEW STUDY SESSION</button>
      <button type='button'>REVIEW PAST STUDY SESSIONS</button>
      <button type='button'>CREAT FLASH CARDS</button>
      <button type='button'>STUDY FLASH CARDS</button>
    </>
  );
};
export default FrontPage;
