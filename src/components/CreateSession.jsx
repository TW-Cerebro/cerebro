import React from "react";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";

function CreateSession({username}) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [mainPoints, setMainPoints] = useState('');
  const [painPoints, setPainPoints] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="createSession">
      <HeaderMenu username = {username} />
      <section className = "createSessionMain">
        <form>
        <h1>CREATE NEW STUDY SESSION</h1>
          <div className="formLeftSide">
            <label>Title</label>
            <input 
              className="formInput" 
              name="title"
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
              placeholder="What would you like to name this session?">
            </input>
            <label>Topic</label>
            <input 
              className="formInput" 
              name="topic"
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required 
              placeholder="What topic would you like to study?">
            </input>
            <label>Main Points</label>
            <input 
              className="formInput" 
              name="topic"
              type="text" 
              value={mainPoints}
              onChange={(e) => setMainPoints(e.target.value)}
              required 
              placeholder="What are the main areas you want to cover?">
            </input>
            <label>Pain Points</label>
            <input 
              className="formInput" 
              name="topic"
              type="text" 
              value={painPoints}
              onChange={(e) => setPainPoints(e.target.value)}
              required 
              placeholder="What areas do you need help with?">
            </input>
          </div>
          <div className="formRightSide">
            <label>Notes</label>
            <input 
              className="formInput" 
              name="topic"
              type="text" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required 
              placeholder="Copy and Paste Your Notes Here">
            </input>
          </div>
        </form>
      </section>
      <FooterMenu />
    </div>
  )



}

export default CreateSession;