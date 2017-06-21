var esaClaimant = require("../controllers/esaClaimantCommitmentController");

module.exports = function(router) {

  router.get('/latest/esa_claimant/addCommitment', esaClaimant.addClaimantCommitmentPage);
  router.post('/latest/esa_claimant/addCommittment', esaClaimant.addClaimantCommitmentAction);

  router.get('/latest/esa_claimant/viewCommitment', esaClaimant.viewCommitment);

}