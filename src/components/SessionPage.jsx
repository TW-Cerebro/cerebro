import React from "react";
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";
import { useState } from "react";
import Message from "./Message.jsx";
import { useNavigate } from "react-router-dom";

const questions = [
  "How are you?",
  "How can I help you today?",
  "What are you going to do tomorrow?",
];

const SessionPage = ({username}) => {
  const randomQuestion = () => {
    const index = Math.floor(Math.random() * questions.length);
    return questions[index];
  };

  const initialQuestion = randomQuestion();

  const [inputText, setInputText] = useState('');
  const [messageList, updateMessageList] = useState([initialQuestion]);
  const [answer, updateAnswer] = useState('');

  const answerChangeHandler = (e) => {
    updateAnswer(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newMessage = [...messageList];
    newMessage.push(randomQuestion());
    newMessage.push(inputText);
    updateMessageList(newMessage);

    //updateMessageList(messageList.concat([inputText, randomQuestion()]));
  }

  return (
    <div className="studySession">
      <HeaderMenu username = {username} />
      <div className="chatView">
        <nav>
          <button className="orangeBtn">Start Session</button>
          <button className="orangeBtn">Save Session</button>
        </nav>
        <div className="chatArea">
          <div>
            {messageList.map((message, index) => {
              return <Message message={message} key={index}></Message>;
            })}
          </div>
        </div>
        <form className="chatUserInput">
          <input
            className="formInput" 
            name="topic"
            type="textarea" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required 
            placeholder="Chat with Grace">
          </input>
          <button className="orangeBtn" onClick={submitHandler}>Submit</button>
        </form>
      </div>
      <FooterMenu />
    </div>



    // <>
    //   <h1>studying session</h1>
    //   <div>
    //     {messageList.map((message, index) => {
    //       return <Message message={message} key={index}></Message>;
    //     })}
    //   </div>
    //   <div>
    //     <label>
    //       Your Answer Here:
    //       <input type="text" value={answer} onChange={answerChangeHandler} />
    //     </label>
    //     <button onClick={submitHandler}>Submit Answer</button>
    //   </div>
    // </>
  );
};

export default SessionPage;
