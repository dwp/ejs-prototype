var esaClaimant = require("../controllers/esaClaimantCommitmentController");

module.exports = function(router) {

  router.get('/latest/esa_claimant/addCommitment', esaClaimant.addClaimantCommitmentPage);
  router.post('/latest/esa_claimant/addCommitment', esaClaimant.addClaimantCommitmentAction);

  router.get('/latest/esa_claimant/viewCommitment', esaClaimant.viewCommitment);

  router.get('/latest/esa_claimant/viewCommitmentsSummary', esaClaimant.viewCommitmentsSummary);

  router.get('/latest/esa_claimant/printCommitment', esaClaimant.printCommitment);

  router.get('/latest/esa_claimant/jobProfile', esaClaimant.addJobProfilePage);
  router.post('latest/esa_claimant/jobProfile', esaClaimant.addJobProfileAction);

}