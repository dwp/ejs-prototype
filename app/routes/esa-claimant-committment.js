var esaClaimant = require("../controllers/esaClaimantCommittmentController");

module.exports = function(router) {

  router.get('/latest/esa_claimant/actions', esaClaimant.committmentActionsPage);
  router.post('/latest/esa_claimant/actions', esaClaimant.committmentActionsAction);

}