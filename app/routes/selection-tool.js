var selectionTool = require("../controllers/whpSelectionController");
var gatekeeper = require("../controllers/whpGatekeeperController");

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
  router.get('/latest/gatekeeper/places', gatekeeper.districtPlacesPage);
  router.post('/latest/gatekeeper/places', gatekeeper.districtPlacesAction);

  router.get('/latest/gatekeeper/profilePlaces', gatekeeper.districtProfilePlacesPage);
  router.post('/latest/gatekeeper/profilePlaces', gatekeeper.districtProfilePlacesAction);

  router.get('/latest/gatekeeper/allocations', gatekeeper.viewAllocationsPage);

  //router.get('latest/gatekeeper/selection', gatekeeper.districtSelectionPage);
  //router.post('latest/gatekeeper/selection', gatekeeper.districtSelectionAction);

  // Routers for old profiling pages

  router.get('/latest/gatekeeper/profile', gatekeeper.districtProfilePage);
  router.post('/latest/gatekeeper/profile', gatekeeper.districtProfileAction);

  router.get('/latest/gatekeeper/weeklyProfile', gatekeeper.districtWeeklyProfilePage);
  router.post('/latest/gatekeeper/weeklyProfile', gatekeeper.districtWeeklyProfileAction);
}