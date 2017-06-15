var esaClaimant = require("../controllers/esaClaimantCommittmentController");

module.exports = function(router) {

  router.get('/latest/esa_claimant', esaClaimant.committmentPage);
  router.post('/latest/esa_claimant', esaClaimant.committmentAction);

}