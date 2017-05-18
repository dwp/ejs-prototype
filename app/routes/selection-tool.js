module.exports = function(router) {
  var fs = require('fs');
  var content = loadContent();

  // Landing page routes
  router.get('/latest/selection_tool', function (req, res) {
    res.locals.questions = content['landing-page'].questions;
    res.locals.questionTitle = content['landing-page'].title;
    res.locals.earlyEntryOptions = content['landing-page'].earlyEntryOptions;

    res.render('latest/selection_tool_landing_page');
  });   
    
  router.post('/latest/selection_tool', function (req, res) {
    var isLongTermUnemployed = req.body['initialOptions'] === 'Long term unemployed',
      isExternalReferrer =  req.body['voluntary'] === 'External referral';

    if(isLongTermUnemployed){
      res.redirect('/latest/whp-result');
    } else {
      res.redirect('/latest/whp_eligibility_questions?voluntaryOption=' + req.body.voluntary);
    }
  });
  
  // Alternative landing page route for GET
  router.get('/latest/selection_tool_landing_page_v2', function (req, res) {
    res.locals.questions = content['landing-page'].questions;
    res.locals.questionTitle = content['landing-page'].title;
    res.locals.earlyEntryOptions = content['landing-page'].earlyEntryOptions;

    res.render('latest/selection_tool_landing_page_v2');
  });
    
  // Alternative landing page route for POST
  router.post('/latest/selection_tool_landing_page_v2', function (req, res) {
    var isLongTermUnemployed = req.body['initialOptions'] === 'Long term unemployed',
      isExternalReferrer =  req.body['voluntary'] === 'External referral';

    if(isLongTermUnemployed){
      res.redirect('/latest/whp-result');
    } else if (isExternalReferrer){
      res.redirect('/latest/scoring_questions/0');
    } else {
      res.redirect('/latest/whp_eligibility_questions?voluntaryOption=' + req.body.voluntary);
    }
  });

  // Eligibility routes
  router.get('/latest/whp_eligibility_questions', function (req, res) {
    res.locals.questions = content[req.query.voluntaryOption].questions;
    res.locals.questionTitle = content[req.query.voluntaryOption].title;
    res.locals.earlyEntryOptions = content[req.query.voluntaryOption].earlyEntryOptions;

    res.render('latest/whp_eligibility_questions');
  });

  router.post('/latest/whp_eligibility_questions', function (req, res) {
    var isEligible = true;

    // If any of the eligibility questions have been answered 'No' 
    // then the applicant is not eligible
    for(var param in req.body){
      if(req.body[param] === 'No'){
        isEligible = false;
      }
    }

    if(isEligible){
      res.redirect('/latest/scoring_questions/0');
    } else {
      res.redirect('/latest/failed-eligibility');
    }
  });

  // Scoring question routes
  router.get('/latest/scoring_questions/:questionSet', function (req, res) {
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
  });
  
  // Gatekeeper routes
  router.get('/latest/gatekeeper_menu', function (req, res) {
    if (req.session.user.role !== 'gatekeeper') {
      res.redirect('/latest/selection_tool');
    } else {
      res.locals.user = req.session.user;
      res.render('latest/whp-annual-profile');
    }
  });

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
}