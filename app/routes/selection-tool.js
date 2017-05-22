var selectionTool= require("../controllers/selectionToolController");

module.exports = function(router) {

  // Landing page routes
  router.get('/latest/selection_tool', selectionTool.landingPage);
  router.post('/latest/selection_tool', selectionTool.landingPageAction);

  // Alternative landing page routes
  router.get('/latest/selection_tool_landing_page_v2', selectionTool.alternativeLandingPage);
  router.post('/latest/selection_tool_landing_page_v2', selectionTool.alternativeLandingPageAction);

  // Eligibility question routes
  router.get('/latest/whp_eligibility_questions', selectionTool.eligibilityQuestionsPage);
  router.post('/latest/whp_eligibility_questions', selectionTool.eligibilityQuestionsPageAction);

  // Scoring question routes
  router.get('/latest/scoring_questions/:questionSet', selectionTool.scoringQuestionsPage);

  // Gatekeeper routes
  router.get('/latest/gatekeeper/profile', selectionTool.districtProfilePage);
  //router.get('/latest/gatekeeper/weeklyProfile', gateKeeper.districtWeekelyProfilePage);
  //router.post('/latest/gatekeeper/profile', gateKeeper.districtProfileAction);
  //router.post('/latest/gatekeeper/weeklyProfile', gateKeeper.districtWeekelyProfileAction);

}