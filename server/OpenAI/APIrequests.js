require('dotenv').config()
const express = require('express');
//const openai = require('./APIconfig').openai; 
const generatePrompt = require('./generatePrompt'); 
//const fetch = require('node-fetch');


const router = express.Router();


const OPENAI_API_KEY = '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';

// const studySessionsStore = {};

router.post('/create-study-session', async (req, res, next) => {
    //console.log test
    console.log('Received request to create study session')

    const { firstName, gradeLevel, sessionName, topic, notes, mainPoints, painPoints } = req.body;
//console.log test
console.log('req.body:', req.body)
    const session = {
        firstName,
        gradeLevel,
        sessionName,
        topic,
        notes,
        mainPoints,
        painPoints,
        messages: []
    };
const testPrompt = "pretend you are a very cool person!"
    //Create initial chatbot prompt based on session details

//     const customPrompt = generatePrompt(req.body)

    //console.log testing
    console.log('customPrompt:', customPrompt)

    // Push prompt to program chatbot 
    session.messages.push({ role: "system", content: customPrompt })
    
    // Push simulated greeting to evoke response from chatbot
    session.messages.push({ role: "user", content: 'hi!' })
    
    // Save session to session store with sessionName as key
    studySessionsStore[sessionName] = session;
//console.log test
console.log('session object:', session)
    //API call

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                'model': "gpt-3.5-turbo",
                'messages': session.messages
            })
        });
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        //console.log testing
        console.log('responsedata:',responseData)
        const sanitizedResponse = responseData.choices[0].message.content.trim();
        //console.log testing
        console.log('API call succeeded:', responseData.choices[0]);

        //add chatbot response to messages list for reference in next user interaction
        studySessionsStore[sessionName].messages.push({ role: "assistant", content: sanitizedResponse });

        res.json({
            success: true,
            message: 'Study session created and chatbot initialized',
            studySession: studySessionsStore[sessionName],
            chatbotMessage: sanitizedResponse
        });
    } catch (error) {
        //console.log testing
        console.error('API call failed:', error)
        res.status(500).json({
            success: false,
            message: 'Error while initializing chatbot',
            error: error.message
        });
        next(error);
    }
});

router.post('/ask-question', async (req,res, next) => {
    const { question, sessionName } = req.body;

    //console.log testing
    console.log('request body:', req.body)
    
    
    // Get session details from session store
    const session = studySessionsStore[sessionName];
    
    //console.log testing
    console.log('Session:', session)

    if(!session) {
        return res.status(404).json({
            success: false,
            message: 'Study session not found',
        });
    }

    // Add the new question to the message list
    studySessionsStore[sessionName].messages.push({ role: "user", content: question });

    // API call (rest of code is same as previous route)
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: session.messages
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        const sanitizedResponse = responseData.choices[0].message.content.trim();
        //console.log testing
        console.log('API call succeeded:', responseData.choices[0]);

        //add chatbot response to messages list for reference in next user interaction
        studySessionsStore[sessionName].messages.push({ role: "assistant", content: sanitizedResponse });

        res.json({
            success: true,
            message: 'Chatbot responded',
            studySession: studySessionsStore[sessionName],
            chatbotMessage: sanitizedResponse
        });
    } catch (error) {
        //console.log testing
        console.error('API call failed:', error)
        res.status(500).json({
            success: false,
            message: 'Error while creating chatbot response',
            error: error.message
        });
        next(error);
    }
});

// module.exports = router;
