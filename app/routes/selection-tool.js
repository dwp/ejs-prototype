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
    var claimantGroup = req.body['claimant-group'] || 'voluntary';
    res.redirect('/latest/selection_tool/' + claimantGroup);
  });

  router.post('/latest/selection_tool/scoring-questions', function(req, res, next){
    if(req.body['learn-new-tasks'] === '5'){
      res.redirect('/latest/selection_tool_provision');
    } else {
      next();
    }
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
}