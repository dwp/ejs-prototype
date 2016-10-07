var express = require('express');
var router = express.Router();

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

// add your routes here
router.use(function(req, res, next){
  Object.assign(res.locals,{
    postData: (req.body ? req.body : false)
  });

  Object.assign(res.locals,{
    getData: (req.query ? req.query : false)
  });

  next();
});

function getTestProvisions(){
  return [ 
    { id: 0, type : 'Work experience', startDateValues: [ '01', '01', '2016'], startDate: '1 January 2016', status: 'Confirmed', endDateValues: ['31', '04', '2016'], endDate: '31 April 2016', outcome: 'Completed'},
    { id: 1, type : 'Work experience', startDateValues: [ '01', '05', '2016'], startDate: '1 May 2016', status: 'Did not start', endDateValues: ['', '', ''], endDate: '', outcome: ''},
    { id: 2, type : 'Work experience', startDateValues: [ '01', '08', '2016'], startDate: '1 August 2016', status: 'Confirmed', endDateValues: ['04', '09', '2016'], endDate: '4 September 2016', outcome: 'Dismissed'}
  ];
}

module.exports = router;