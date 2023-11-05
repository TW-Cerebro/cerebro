const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');

//API request import
// const APIrequests = require('./OpenAI/APIrequests');

const app = express();
const PORT = process.env.PORT || 3000;

//body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src/images')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})

// app.use('/api', APIrequests);

app.use( (err,req,res,next) => {
  console.error(err);
  res.status(500).send('Something went wrong!')
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
