/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                       Job Profile Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function viewJobProfile (req, res) {

  if (!req.session.jobProfile) {
    var jobProfile = {
      clientName : 'Jade Gladioli',
      clientNino : 'ZZ999999Z',
      workTypes     : 'Builder, plumber, odd-job man',
      qualifications: 'O-level English and Maths; no vocational qualifications',
      strengths     : 'Ability to follow direction; willingness to learn; practical skills good',
      experience    : 'Acted as builder\'s mate to my brother for a couple of years',
      circumstances : 'Single Dad; no family living close; not much support'
    };
    req.session.jobProfile = jobProfile;
    }
  res.render('latest/job-profile-view');
}

function printJobProfile (req, res) {
  res.render('latest/job-profile-view-print');
}

function editJobProfilePage (req, res) {
  res.render('latest/job-profile');
}

function editJobProfileAction (req, res) {

  var currentJobProfile = req.session.jobProfile ? req.session.jobProfile : {};
  var newJobProfile = {
    clientName : currentJobProfile.clientName,
    clientNino : currentJobProfile.clientNino,
    workTypes : req.body['jobProfile-workTypes'],
    qualifications : req.body['jobProfile-qualifications'],
    strengths : req.body['jobProfile-strengths'],
    experience : req.body['jobProfile-experience'],
    circumstances : req.body['jobProfile-circumstances']
  };
  req.session.jobProfile = newJobProfile;
  res.redirect('/latest/job_profile');

}

module.exports.viewJobProfile = viewJobProfile;
module.exports.printJobProfile = printJobProfile;
module.exports.editJobProfilePage = editJobProfilePage;
module.exports.editJobProfileAction = editJobProfileAction;