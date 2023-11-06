//const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function createSession(sessionName, topic, notes, mainPoints, painPoints) {
  try {
    const response = await fetch(`${BASE_URL}/api/create-study-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionName,
        topic,
        notes,
        mainPoints,
        painPoints
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Session Response:', data);
  } catch (error) {
    console.error('Error creating session:', error.message);
  }
}

async function askQuestion(sessionName, question) {
  try {
    const response = await fetch(`${BASE_URL}/api/ask-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionName,
        question
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Question Response:', data);
  } catch (error) {
    console.error('Error asking question:', error.message);
  }
}

// Example usage:
createSession('Joe', '7', 'Biology Session', 'Biology', 'Cell structures', 'Genetics', 'Understanding Mitosis');
//askQuestion('Biology Session', 'What is the process of mitosis?');

module.exports = {
  createSession,
  askQuestion
}
