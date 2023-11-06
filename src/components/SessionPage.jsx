import React from "react";
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";
import { useState } from "react";
import Message from "./Message.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// const questions = [
//   "How are you?",
//   "How can I help you today?",
//   "What are you going to do tomorrow?",
// ];

const SessionPage = ({username}) => {
  const [question, setQuestion] = useState('');
  const [messageList, updateMessageList] = useState([]);
  const [convoHistory, setConvoHistory] = useState([]);
  //const [answer, updateAnswer] = useState('');
  const location = useLocation();
  const data = location.state;

  // createSession(data.sessionName,  

  function startSession() {
    fetch('/api/create-study-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionName: data.sessionName,
        topic: data.topic,
        notes: data.notes,
        mainPoints: data.mainPoints,
        painPoints: data.painPoints,
      })
      })
      .then(response => response.json())
      .then(data => {
        setConvoHistory(data.convoHistory);
        const newMessage = [...messageList];
        newMessage.push(data.chatbotMessage);
        updateMessageList(newMessage);
      })
      .catch(err => {
        console.error('Error creating session');
      })
  
  }

  function askQuestion(e) {
    e.preventDefault();
    fetch('/api/ask-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        convoHistory,
        question
      })
    })
    .then(response => response.json())
    .then(data => {
      setConvoHistory(data.convoHistory);
      const newMessage = [...messageList];
      newMessage.push(question);
      newMessage.push(data.chatbotMessage);
      updateMessageList(newMessage);
    })
  }
  
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const newMessage = [...messageList];
  //   newMessage.push(randomQuestion());
  //   newMessage.push(inputText);
  //   updateMessageList(newMessage);
  // }

  return (
    <div className="studySession">
      <HeaderMenu username = {username} />
      <div className="chatView">
        <nav>
          <button className="orangeBtn" onClick={startSession}>Start Session</button>
          <button className="orangeBtn">Save Session</button>
        </nav>
        <div className="chatArea">
          <div>
            {messageList.map((message, index) => {
              return <Message message={message} key={index}></Message>;
            })}
          </div>
        </div>
        <form className="chatUserInput" onSubmit={askQuestion}>
          <input
            className="formInput" 
            name="topic"
            type="textarea" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required 
            placeholder="Chat with Grace">
          </input>
          <button className="orangeBtn" type="submit">Submit</button>
        </form>
      </div>
      <FooterMenu />
    </div>


//updateMessageList(messageList.concat([inputText, randomQuestion()]));

  // const randomQuestion = () => {
  //   const index = Math.floor(Math.random() * questions.length);
  //   return questions[index];
  // };

  //const initialQuestion = randomQuestion();
  
  // const answerChangeHandler = (e) => {
  //   updateAnswer(e.target.value);
  // };

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
