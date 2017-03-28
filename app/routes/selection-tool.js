module.exports = function(router) {
  var fs = require('fs');
  var questions = {};

  fs.readdir(__dirname + '/whp-selection-questions', function(err, filenames){
    if(err) return;

    filenames.forEach(function(filename){
      questions[filename.split('.')[0]] = require('./whp-selection-questions/' + filename);
    })
  })

  router.get('/latest/selection_tool', function (req, res) {
    res.locals.questions = questions['claimant-group'].questions;
    res.locals.next = questions['claimant-group'].nextQuestionSet;
    res.locals.questionTitle = questions['claimant-group'].title;

    res.render('latest/selection_tool');
  });

  router.post('/latest/selection_tool', function (req, res) {
    var questionGroup = req.body['claimant-group'] || 'voluntary';

    if(questionGroup=== 'long-term-unemployed'){
      res.redirect('/latest/whp-result');
    } else {
      res.redirect('/latest/selection_tool/' + questionGroup);
    }
  });

  router.post('/latest/selection_tool/scoring-questions', function(req, res, next){
    res.redirect('/latest/whp-result');
  });

  router.post('/latest/selection_tool/*', function (req, res) {
    if(req.body['scoring-questions']){
      res.redirect('/latest/selection_tool/scoring-questions');
    } else {
      res.redirect('/latest/selection_tool/non-ltu-knockout');
    }
  });

  router.get('/latest/selection_tool/:questionSet', function (req, res) {
    res.locals.questions = questions[req.params.questionSet].questions;
    res.locals.next = questions[req.params.questionSet].nextQuestionSet;
    res.locals.questionTitle = questions[req.params.questionSet].title;
    res.locals.explanation = questions[req.params.questionSet].explanation;
  
    res.render('latest/selection_tool');
  });

  router.get('/latest/selection_tool_v2/:questionSet', function (req, res) {
    var scoringQuestionsConfig = questions['scoring-questions-v2'];
    
    res.locals.questions = [scoringQuestionsConfig.questions[req.params.questionSet]];
    res.locals.next = scoringQuestionsConfig.nextQuestionSet;
    res.locals.questionTitle = scoringQuestionsConfig.title;
    
    res.locals.formMethod = 'GET';

    if(req.params.questionSet == scoringQuestionsConfig.questions.length){
      res.redirect('/latest/whp-result');
    } else {
      res.locals.formAction = `/latest/selection_tool_v2/${++req.params.questionSet}`;
      res.render('latest/selection_tool');
    }
  });
}