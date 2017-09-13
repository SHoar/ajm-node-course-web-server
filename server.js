const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000; 

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) throw console.log('Unable to append to server.log.');
  });
  console.log(log);
  next();
})
/* Maintenance page middleware */
// app.use((req,res,next) => {
//   res.render('maintenance');
// })

// We can also use the static pages in /public
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})


app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    pageTitle: 'Help Page',
  });
})

app.get('/bad', (req,res)=> {
  res.send({ errorMessage: "Unable to Display Page"});
});

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}.`);
});