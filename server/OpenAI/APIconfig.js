require('dotenv').config();
const { Configuration, OpenAIApi} = require('openai');

// configuring OpenAIApi client with API key
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = OpenAIApi(configuration);

module.exports = { openai };