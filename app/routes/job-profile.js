var jobProfile = require("../controllers/jobProfileController");

module.exports = function(router) {

  router.get('/latest/job_profile', jobProfile.viewJobProfile);

  router.get('/latest/job_profile/printJobProfile', jobProfile.printJobProfile);

  router.get('/latest/job_profile/editJobProfile', jobProfile.editJobProfilePage);
  router.post('/latest/job_profile/editJobProfile', jobProfile.editJobProfileAction);

}