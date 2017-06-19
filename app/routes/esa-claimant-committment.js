var esaClaimant = require("../controllers/esaClaimantCommittmentController");

module.exports = function(router) {

  router.get('/latest/esa_claimant/addCommittment', esaClaimant.addClaimantCommittmentPage);
  router.post('/latest/esa_claimant/addCommittment', esaClaimant.addClaimantCommittmentAction);

  router.get('/latest/esa_claimant/viewCommittment', esaClaimant.viewCommittment);

}