const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./Database/UserController.js')
const sessionController = require('./Database/SessionController.js')

const mongoose = require('mongoose');

const atlasUri = 'mongodb+srv://lfv2bcerebro:IQBO5fsrsenrmg9A@cluster0.rfcpwqu.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(atlasUri)
  .then(() => {
  console.log('Connected to the database!');
  }) .catch (err => {
    console.error('MongoDB connection error:', err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));
db.once('open', function() {
  console.log('Connected to the database');
});

const APIrequests = require('./OpenAI/APIrequests');

const app = express();
const PORT = process.env.PORT || 3000;

//body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src/images')));

app.get('/', (req, res) => {
  //console.log testing:
  console.log('Received request from root')

  res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
  //console.log testing:
  console.log('Response sent back to root')
})

app.use('/api', APIrequests);

app.use('/user', userController);

app.use('/session', sessionController);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  console.error('Path:', req.path);
  console.error('Method:', req.method);
  //console.log testing:
  if(res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: 'Internal Server Error',
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
