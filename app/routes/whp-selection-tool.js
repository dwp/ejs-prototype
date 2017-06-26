var selectionTool = require("../controllers/whpSelectionController");

module.exports = function(router) {

  // Landing page routes
  router.get('/latest/selection_tool', selectionTool.landingPage);
  router.post('/latest/selection_tool', selectionTool.landingPageAction);

  // Alternative landing page routes
  router.get('/latest/selection_tool_landing_page_v2', selectionTool.alternativeLandingPage);
  router.post('/latest/selection_tool_landing_page_v2', selectionTool.alternativeLandingPageAction);

  // Alternative landing page routes
  router.get('/latest/selection_tool_content', selectionTool.landingPageWithContentUpdates);
  router.post('/latest/selection_tool_content', selectionTool.landingPageWithContentUpdatesAction);

  // Eligibility question routes
  router.get('/latest/whp_eligibility_questions', selectionTool.eligibilityQuestionsPage);
  router.post('/latest/whp_eligibility_questions', selectionTool.eligibilityQuestionsPageAction);

  // Scoring question routes
  router.get('/latest/scoring_questions/:questionSet', selectionTool.scoringQuestionsPage);


}