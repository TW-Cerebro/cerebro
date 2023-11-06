import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import FrontPage from "./components/FrontPage.jsx";
import CreateSession from "./components/CreateSession.jsx";
import StudySession from "./components/StudySession.jsx";
import InputPage from "./components/InputPage.jsx";
import SessionPage from "./components/SessionPage.jsx";
import ReviewStudySession from "./components/ReviewStudySession.jsx";
import CreateFlashCards from "./components/CreateFlashCards.jsx";
import ReviewFlashCards from "./components/ReviewFlashCards.jsx";

const App = () => {
  const [username, updateUsername] = useState("");
  const usernameChangeHandler = (e) => {
    updateUsername(e.target.value);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              username={username}
              usernameChangeHandler={usernameChangeHandler}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupPage
              username={username}
              usernameChangeHandler={usernameChangeHandler}
            />
          }
        />
        {/* <Route path="/" element={<CreateSession />} /> */}
        <Route path="/mainmenu" element={<FrontPage />} />
        <Route
          path="/createsession"
          element={<CreateSession username={username} />}
        />
        <Route path="/studysession" element={<StudySession />} />
        <Route path="/reviewstudysession" element={<ReviewStudySession />} />
        <Route path="/createflashcards" element={<CreateFlashCards />} />
        <Route path="/reviewflashcards" element={<ReviewFlashCards />} />
      </Routes>
    </div>
  );
};

// return <SignupPage />
// return <LoginPage />

// const [mode, updateMode] = useState("loginPage");
// const [title, updateTitle] = useState("");
// const [topic, updateTopic] = useState("");

// const titleChangeHandler = (e) => {
//   updateTitle(e.target.value);
//   console.log(e.target.value);
// };

//   const topicChangeHandler = (e) => {
//     updateTopic(e.target.value);
//   }

//   const createSession = () => {
//     updateMode("input");
//   };

//   const onCreate = (e) => {
//     e.preventDefault();
//     const sessionInfo = {};
//     sessionInfo.title = title;
//     sessionInfo.topic = topic;
//     console.log(sessionInfo);
//     updateMode("session");
//   };

//   if (mode === "loginPage") {
//     return <LoginPage createSession={createSession} />;
//   }

//   // if (mode === "frontPage") {
//   //   return <FrontPage createSession={createSession} />;
//   // }

//   if (mode === "input") {
//     return (
//       <InputPage
//         onCreate={onCreate}
//         title={title}
//         titleChangeHandler={titleChangeHandler}
//         topic={topic}
//         topicChangeHandler={topicChangeHandler}
//       />
//     );
//   }
//   if (mode === "session") {
//     return <SessionPage />;
//   }
// };

export default App;
