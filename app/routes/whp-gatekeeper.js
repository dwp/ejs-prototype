var gatekeeper = require("../controllers/whpGatekeeperController");

module.exports = function(router) {

// Gatekeeper routes
  router.get('/latest/gatekeeper/places', gatekeeper.districtPlacesPage);
  router.post('/latest/gatekeeper/places', gatekeeper.districtPlacesAction);

  router.get('/latest/gatekeeper/placesBreakdown', gatekeeper.districtPlacesBreakdownPage);
  router.post('/latest/gatekeeper/placesBreakdown', gatekeeper.districtPlacesBreakdownAction);

  router.get('/latest/gatekeeper/placesSummary', gatekeeper.districtPlacesSummaryPage);

//router.get('/latest/gatekeeper/allocations', gatekeeper.viewAllocationsPage);

  router.get('/latest/gatekeeper/selection', gatekeeper.districtSelectionPage);
  router.post('/latest/gatekeeper/selection', gatekeeper.districtSelectionAction);

// Routers for old profiling pages

  router.get('/latest/gatekeeper/profile', gatekeeper.districtProfilePage);
  router.post('/latest/gatekeeper/profile', gatekeeper.districtProfileAction);

  router.get('/latest/gatekeeper/weeklyProfile', gatekeeper.districtWeeklyProfilePage);
  router.post('/latest/gatekeeper/weeklyProfile', gatekeeper.districtWeeklyProfileAction);

}