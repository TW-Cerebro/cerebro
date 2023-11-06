import React from "react";
import { useState } from "react";
import Message from "./Message.jsx";

const questions = [
  "How are you?",
  "How can I help you today?",
  "What are you going to do tomorrow?",
];

const SessionPage = () => {
  const randomQuestion = () => {
    const index = Math.floor(Math.random() * questions.length);
    return questions[index];
  };

  const initialQuestion = randomQuestion();

  const [messageList, updateMessageList] = useState([initialQuestion]);
  const [answer, updateAnswer] = useState('');

  const answerChangeHandler = (e) => {
    updateAnswer(e.target.value);
  };

  const submitHandler = () => {
    updateMessageList(messageList.concat([answer, randomQuestion()]));
  }

  return (
    <>
      <h1>studying session</h1>
      <div>
        {messageList.map((message, index) => {
          return <Message message={message} key={index}></Message>;
        })}
      </div>
      <div>
        <label>
          Your Answer Here:
          <input type="text" value={answer} onChange={answerChangeHandler} />
        </label>
        <button onClick={submitHandler}>Submit Answer</button>
      </div>
    </>
  );
};

export default SessionPage;
