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

function landingPageWithContentUpdates(req, res, next){
    res.locals.earlyEntryOptions = content['landing-page'].earlyEntryOptions;

    next();
}

function landingPageWithContentUpdatesAction(req, res){
  var isLongTermUnemployed = req.body['unemployed'] === 'Yes',
    questionSet = req.body['disability'] === 'Yes' ? 'disability' : 'early-entry';

  questionSet = req.body['external'] === 'Yes' ? 'external-referrer' : questionSet;

  if(isLongTermUnemployed){
    res.redirect('/latest/whp-result');
  } else {
    res.redirect('/latest/whp_eligibility_questions?voluntaryOption=' + questionSet);
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
module.exports.landingPageWithContentUpdates = landingPageWithContentUpdates;
module.exports.landingPageWithContentUpdatesAction = landingPageWithContentUpdatesAction;



















