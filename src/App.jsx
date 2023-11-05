import React from "react";
import { useState } from "react";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import FrontPage from "./components/FrontPage.jsx";
import InputPage from "./components/InputPage.jsx";
import SessionPage from "./components/SessionPage.jsx";

const App = () => {
  // return <SignupPage />
  return <LoginPage />

  // const [mode, updateMode] = useState("loginPage");
  // const [title, updateTitle] = useState("");
  // const [topic, updateTopic] = useState("");

  // const titleChangeHandler = (e) => {
  //   updateTitle(e.target.value);
  //   console.log(e.target.value);
  // };

  // const topicChangeHandler = (e) => {
  //   updateTopic(e.target.value);
  // }

  // const createSession = () => {
  //   updateMode("input");
  // };

  // const onCreate = (e) => {
  //   e.preventDefault();
  //   const sessionInfo = {};
  //   sessionInfo.title = title;
  //   sessionInfo.topic = topic;
  //   console.log(sessionInfo);
  //   updateMode("session");
  // };

  // if (mode === "loginPage") {
  //   return <LoginPage createSession={createSession} />;
  // }

  // if (mode === "frontPage") {
  //   return <FrontPage createSession={createSession} />;
  // }

  // if (mode === "input") {
  //   return (
  //     <InputPage
  //       onCreate={onCreate}
  //       title={title}
  //       titleChangeHandler={titleChangeHandler}
  //       topic={topic}
  //       topicChangeHandler={topicChangeHandler}
  //     />
  //   );
  // }
  // if (mode === "session") {
  //   return <SessionPage />;
  // }
};

export default App