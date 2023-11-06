const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');

//API request import
const APIrequests = require('./OpenAI/APIrequests');

const mongoose = require('mongoose');
const studentController = require('./StudentController');

const app = express();
const PORT = process.env.PORT || 3000;



// const { MongoClient } = require("mongodb");
// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://lfv2bcerebro:IQBO5fsrsenrmg9A@cluster0.rfcpwqu.mongodb.net/?retryWrites=true&w=majority|";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

//body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src/images')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(APIrequests)

/////////////// express.js route for openAI interaction (boilerplate)
const openAIrouter = express.Router();
const axios = require('axios');
const { ensureAuth } = require('../middleware/auth'); // Custom auth middleware

router.post('/generate-content', ensureAuth, async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    // Here you could add the logic to save the session data to MongoDB

    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error generating content: " + error.message);
  }
});

module.exports = openAIrouter;

/////////////// 

mongoose.connect('connectionString', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const studentRouter = express.Router(); // do we need to define separate routers for student and openAI? I believe so. 
app.use('/student', studentRouter);

// Create a student in the database
// http://localhost:3000/student
studentRouter.post('/', studentController.createStudent);

// Get a student from the database
// http://localhost:3000/student/"username"
studentRouter.get('/:username', studentController.getStudent);

// Change a students name
// http://localhost:3000/student/"username"
studentRouter.patch('/:username', studentController.updateStudent);

// Delete a student from the database
// http://localhost:3000/student/"username"
studentRouter.delete('/:username', studentController.deleteStudent);

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;