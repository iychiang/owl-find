const express = require('express');
const morgan = require('morgan');
const axios = require('axios')

const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/search/:word', (req, res) => {
  // console.log('testing');
  axios(`https://owlbot.info/api/v2/dictionary/${req.params.word}`)
  .then(wordAPI => {
    //chain next axios call after getting first set of data back
    axios(`https://api.datamuse.com/words?sl=${req.params.word}`)
    .then(spellingAPI => {
      var responses = {
        wordAPI: wordAPI.data,
        spellingAPI: spellingAPI.data
      }
      res.send(responses);
      // console.log(response.data);
    })
    .catch(err => {
      console.log('err', err);
    })
  })
  .catch(err => {
    console.log(err);
  })
  
})

app.get('*', (req, res) => {
  res.sendFile('/public/index.html', {root: './'});
});

module.exports = app;
