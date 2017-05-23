var fs = require('fs');
var content = loadContent();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/*                                        Landing Page Controllers
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
function landingPage(req, res) {
    res.locals.questions = content['landing-page'].questions;
    res.locals.questionTitle = content['landing-page'].title;
    res.locals.earlyEntryOptions = content['landing-page'].earlyEntryOptions;

    res.render('latest/selection_tool_landing_page');
}

function landingPageAction(req, res) {
  var isLongTermUnemployed = req.body['initialOptions'] === 'Long term unemployed',
    isExternalReferrer =  req.body['voluntary'] === 'External referral';
  if(isLongTermUnemployed){
    res.redirect('/latest/whp-result');
  } else {
    res.redirect('/latest/whp_eligibility_questions?voluntaryOption=' + req.body.voluntary);
  }
}

function alternativeLandingPage(req, res) {
  res.locals.questions = content['landing-page'].questions;
  res.locals.questionTitle = content['landing-page'].title;
  res.locals.earlyEntryOptions = content['landing-page'].earlyEntryOptions;

  res.render('latest/selection_tool_landing_page_v2');
}

function alternativeLandingPageAction(req, res) {
  var isLongTermUnemployed = req.body['initialOptions'] === 'Long term unemployed',
    isExternalReferrer =  req.body['voluntary'] === 'External referral';

  if(isLongTermUnemployed){
    res.redirect('/latest/whp-result');
  } else if (isExternalReferrer){
    res.redirect('/latest/scoring_questions/0');
  } else {
    res.redirect('/latest/whp_eligibility_questions?voluntaryOption=' + req.body.voluntary);
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/*                                        Eligibility Questions Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
function eligibilityQuestionsPage(req, res) {
  res.locals.questions = content[req.query.voluntaryOption].questions;
  res.locals.questionTitle = content[req.query.voluntaryOption].title;
  res.locals.earlyEntryOptions = content[req.query.voluntaryOption].earlyEntryOptions;

  res.render('latest/whp_eligibility_questions');
}

function eligibilityQuestionsPageAction (req, res) {
  var isEligible = true;

  if(req.body['paid-employment'] === 'Yes' || req.body['next-twelve'] === 'No' || req.body['next-twelve-with-support'] === 'Yes'){
    isEligible = false;
  }

  if(isEligible){
    res.redirect('/latest/scoring_questions/0');
  } else {
    res.redirect('/latest/failed-eligibility');
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/*                                        Scoring Questions Controllers
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
function scoringQuestionsPage(req, res) {
  var scoringQuestionsConfig = content['scoring-questions'];

  res.locals.questions = [scoringQuestionsConfig.questions[req.params.questionSet]];
  res.locals.questionTitle = scoringQuestionsConfig.title;
  res.locals.questionIndex = +req.params.questionSet + 1;
  res.locals.questionCount = scoringQuestionsConfig.questions.length;

  res.locals.formMethod = 'GET';

  if(req.params.questionSet == scoringQuestionsConfig.questions.length){
    res.redirect('/latest/whp-result');
  } else {
    res.locals.formAction = `/latest/scoring_questions/${++req.params.questionSet}`;
    res.render('latest/scoring_questions');
  }
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/*                                        Gatekeeper Controllers
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
function districtProfilePage(req, res) {

  var districtList = ["Select", "Bradford", "Derby", "Mercia", "Manchester", "Portsmouth", "Southampton", "Wolverhampton", "Worcester"];

  console.log("req.session.profileData looks like this before initialisation : ", req.session.profileData);

  req.session.profileData = req.session.profileData || {};

  console.log("req.session.profileData looks like this after initialisation : ", req.session.profileData);
  
  var profileData = {
    districtList : districtList,
    district       : req.session.profileData.district ? req.session.profileData.district : "Mercia",
    profileYear : req.session.profileData.profileYear ? req.session.profileData.profileYear : "2017",
    whpProfile     : req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile     : req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    addPlaces      : req.session.profileData.addPlaces ? req.session.profileData.addPlaces : 50,
    totalProvPlaces: req.session.profileData.totalProvPlaces ? req.session.profileData.totalProvPlaces : 1450,
    controlGpPlaces :req.session.profileData.controlGpPlaces ? req.session.profileData.controlGpPlaces : 145,
    totalPlaces : req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1595,
    startDay : req.session.profileData.startDay ? req.session.profileData.startDay : 01,
    startMonth: req.session.profileData.startMonth? req.session.profileData.startMonth : 08,
    startYear : req.session.profileData.startYear ? req.session.profileData.startYear : 2017,
    endDay : req.session.profileData.endDay ? req.session.profileData.endDay : 31,
    endMonth : req.session.profileData.endMonth ? req.session.profileData.endMonth : 07,
    endYear : req.session.profileData.endYear ? req.session.profileData.endYear: 2018
  };

  console.log("profileData looks like this : ", profileData);

  if (req.session.user.role !== 'gatekeeper') {
    res.redirect('/latest/selection_tool');
  } else {
    res.locals.user = req.session.user;
    res.render('latest/whp-annual-profile', profileData);
  }
}

function districtProfileAction(req, res) {

  console.log("req.body looks like this : ", req.body);

  var totalProvPlaces = parseInt(req.body.whpProfile) + parseInt(req.body.pscProfile) + parseInt(req.body.addPlaces);
  var controlGpPlaces = totalProvPlaces / 10;
  var totalPlaces = totalProvPlaces + controlGpPlaces;
  var inputProfileData = {
    district : req.body.district,
    profileYear : req.body.profileYear,
    whpProfile : req.body.whpProfile,
    pscProfile : req.body.pscProfile,
    addPlaces : req.body.addPlaces,
    totalProvPlaces : totalProvPlaces,
    controlGpPlaces : controlGpPlaces,
    totalPlaces : totalPlaces,
    startDay : req.body.whpStartDay,
    startMonth: req.body.whpStartMonth,
    startYear : req.body.whpStartYear,
    endDay : req.body.whpEndDay,
    endMonth : req.body.whpEndMonth,
    endYear : req.body.whpEndYear
  };

  console.log("inputProfileData look like this : ", inputProfileData);

  req.session.profileData = inputProfileData;
  res.redirect('/latest/gatekeeper/profile');
}

function districtWeeklyProfilePage (req, res) {
  res.render('latest/whp-weekly-profile');
}

function districtWeeklyProfileAction (req, res) {
  res.redirect('/latest/gatekeeper/profile');
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/*                                        Utilities
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
function loadContent(){
  var content = {};

  fs.readdir(__dirname + '/whp-selection-questions', function(err, filenames){
    if(err) return;

    filenames.forEach(function(filename){
      content[filename.split('.')[0]] = require('./whp-selection-questions/' + filename);
    })
  })

  return content;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/*                                        Module Exports
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
module.exports.landingPage = landingPage;
module.exports.landingPageAction = landingPageAction;
module.exports.alternativeLandingPage = alternativeLandingPage;
module.exports.alternativeLandingPageAction = alternativeLandingPageAction;
module.exports.eligibilityQuestionsPage = eligibilityQuestionsPage;
module.exports.eligibilityQuestionsPageAction = eligibilityQuestionsPageAction;
module.exports.scoringQuestionsPage = scoringQuestionsPage;
module.exports.districtProfilePage = districtProfilePage;
module.exports.districtProfileAction = districtProfileAction;
module.exports.districtWeeklyProfilePage= districtWeeklyProfilePage;
module.exports.districtWeeklyProfileAction= districtWeeklyProfileAction;


















