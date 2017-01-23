var express = require('express');
var router = express.Router();
var provisionRoutes = require('./routes/provision.js')

router.use(function(req, res, next){
  Object.assign(res.locals,{
    postData: (req.body ? req.body : false)
  });

  Object.assign(res.locals,{
    getData: (req.query ? req.query : false)
  });

  req.session.user = req.session.user || { name : 'Martha Vansant', role : 'manager' };
  
  Object.assign(res.locals,{
    sessionData: (req.session ? req.session : false)
  });

  next();
});

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/latest/provision', function (req, res) {

  req.session.provisions = req.session.provisions || getTestProvisions();

  res.render('latest/provision', {
  	provisions: req.session.provisions
  });
});

router.get('/latest/provision_edit', function (req, res) {

  var provision = req.session.provisions ? req.session.provisions[req.query.id] : getTestProvisions()[req.query.id];
  //var provision = getTestProvisions()[req.query.id];

  res.render('latest/provision_edit', {
    provision: provision
  });
});


router.post('/latest/provision_edit', function (req, res) {

  var provisions = req.session.provisions || getTestProvisions();

  //add a new provision if we have an i
  //otherwise update an old provision
  if(!req.body.id){
    provisions.push({ 
      id: provisions.length, 
      type: req.body['provision-type'], 
      startDateValues: [req.body['start-day'], req.body['start-month'], req.body['start-year']], 
      status: req.body['start-status'], 
      endDateValues: [req.body['end-day'], req.body['end-month'], req.body['end-year']],
      outcome: req.body['outcome']
    })
  } else {
    var provision = provisions.find( function(d){ return d.id == req.body.id});

    provision.type = req.body['provision-type'];
    provision.startDateValues = [req.body['start-day'], req.body['start-month'], req.body['start-year']];
    provision.status = req.body['start-status'];
    provision.endDateValues = [req.body['end-day'], req.body['end-month'], req.body['end-year']];
    provision.outcome = req.body['outcome'];
  }

  res.redirect('/latest/provision');
});

router.get('/latest/toggle_user_role', function(req, res, next){
  var fromIndexPage = !req.header('Referer').includes('latest');

  if(req.session.user && req.session.user.role && req.session.user.role !== 'manager'){
    req.session.user = { name : 'Martha Vansant', role : 'manager' }
  } else {
    req.session.user = { name : 'William Conroy', role : 'workcoach' }
  }

  if(fromIndexPage){
    res.redirect('/');
  } else {
    res.redirect('/latest/job');
  }
});

router.post('/latest/job_next_new', function(req, res){
  req.session.hasAppointment = true;

  res.redirect('/latest/job_next_new');
});

function getTestProvisions(){
  return [ 
    { id: 0, type : 'Work experience', startDateValues: [ '01', '01', '2016'], status: 'Confirmed', endDateValues: ['31', '04', '2016'], outcome: 'Completed'},
    { id: 1, type : 'Work experience', startDateValues: [ '01', '05', '2016'], status: 'Did not start', endDateValues: ['', '', ''], outcome: ''},
    { id: 2, type : 'Work experience', startDateValues: [ '01', '08', '2016'], status: 'Confirmed', endDateValues: ['04', '09', '2016'], outcome: 'Dismissed'}
  ];
}

module.exports = router;