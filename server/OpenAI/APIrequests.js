const express = require('express');
const { openai } = require('./APIconfig');

const router = express.Router();

const studySessionsStore = {};

app.post('/create-study-session', async (req, res) => {
    const { firstName, gradeLevel, sessionName, topic, notes, mainPoints, painPoints } = req.body;

    studySessionsStore[sessionName] = {
        firstName,
        gradeLevel,
        sessionName,
        topic,
        notes,
        mainPoints,
        painPoints,
    };

    //Create initial chatbot message based on session details

    const customPrompt = generatePrompt(req.body)

    //API call

    try {
        const inititalResponse = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: customPrompt,
            temperature: 0.7,
            max_tokens: 150,
        });

        

        const chatbotMessage = initialResponse.data.choices[0].text.trim();

        res.json({
            success: true,
            message: 'Study session created and chatbot initialized',
            studySession: studySessionStore[sessionName],
            chatbotMessage: chatbotMessage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while initializing chatbot',
            error: message.error
        });
    }
});

app.post('/ask-question', async (req,res) => {
    const { question, sessionName } = req.body;

    // Get session details from session store
    const studySession = studySessionStore[sessionName];

    if(!studySession) {
        return res.status(404).json({
            success: false,
            message: 'Study session not found',
        });
    }

    //Check if this is the first question in the chat or a follow-up
    if(!studySession.messages){
        studySession.messages = [
            { role: "system", content: customPrompt }
        ];
    }
    // Add the new question to the message list
    studySession.messages.push({ role: "user", content: question });

    try {
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            messages: studySession.messages,
        });

    // Add bot's response to the message list
    studySession.messages.push({ role: "assistant", content: response.data.choices[0].message.content });

    //Respond to front-end request with answer from bot
    res.json({
        success: true,
        answer: response.data.choices[0].message.content,
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while asking question',
            error: error.message,
        })
    }
});

messages:
{ role: 'system', content: "I want you to pretend that you're a fighter pilot"}
{ role: 'user', content: "hi my name's jordan"}
{role: 'assistant', content: 'Hi jordan how can i help today'}
{ role: 'user', content: "question2"}
{role: 'assistant', content: 'Hi jordan how can i help today'}
