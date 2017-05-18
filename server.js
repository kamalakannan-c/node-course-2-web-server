console.log('Inside server.js');

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
  var timestamp = new Date().toString();
  var log = `${timestamp}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err) console.log(err);
  });
  console.log(log);
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs',{
    pageTitle: 'Maintenance Page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Oops somethig went wrong'
  });
});

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(textToScream)=>{
  return textToScream.toUpperCase();
});

app.get('/',(req, res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req, res)=>{
  res.send({item: 'Bad data'});
});

app.use(express.static(__dirname + '/public'));

app.listen(3000);