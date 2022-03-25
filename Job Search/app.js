

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

// Create Redis Client
let client = redis.createClient();

client.on('connect', function(){
  console.log('Connected to Redis...');
});

// Set Port
const port = 3000;

// Init app
const app = express();

// View Engine\
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


// methodOverride
app.use(methodOverride('_method'));

// Search Page
app.get('/', function(req, res, next){
  //res.render('searchusers');
  res.sendFile(__dirname + '/views/searchusers.html');

});

app.listen(port, function(){
    console.log('Server started on port '+port);
  });
