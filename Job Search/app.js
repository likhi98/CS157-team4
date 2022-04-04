

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

// View Engine
app.engine('handlebars', exphbs.engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

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

// Create job listing Page
app.get('/joblisting/create', function(req, res, next){
  res.render('createjoblisting');
});

/**
 * @todo check if job listing gets input into database or not
 */
// Process Create job listing Page
app.post('/joblisting/create', function(req,res,next) {
  job_id = "job1"
  let job_title = req.body.job_title;
  let salary_type = req.body.salary_type
  let salary_range_start= req.body.salary_range_start;
  let salary_range_end = req.body.salary_range_end;
  let job_type = req.body.job_type
  let location = req.body.location;
  let experience = req.body.experience;
  let exp_date  = req.body.exp_date;
  let description = req.body.description;
  let m_qualifications = req.body.m_qualifications;
  let p_qualifications = req.body.p_qualifications;

  const job_listing = {
    job_title: job_title,
    salary_type:  salary_type,
    salary_range_start: salary_range_start,
    salary_range_end: salary_range_end,
    job_type: job_type,
    location: location,
    experience: experience,
    exp_date: exp_date,
    description: description,
    m_qualifications: m_qualifications,
    p_qualifications: p_qualifications
  }
   client.json.set(job_id, JSON.stringify(job_listing))
});
app.listen(port, function(){
    console.log('Server started on port '+port);
  });
