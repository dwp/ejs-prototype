var esaClaimant = require("../controllers/esaClaimantCommittmentController");

module.exports = function(router) {

  router.get('/latest/esa-claimant', esaClaimant.committmentPage);
  router.post('/latest/esa-claimant', esaClaimant.committmentAction);

}