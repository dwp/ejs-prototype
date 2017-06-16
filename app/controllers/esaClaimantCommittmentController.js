/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                       ESA Claimant Committmemt Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function committmentActionsPage (req, res) {
  var sessionData = req.session.committmentData || {};

  var newName = sessionData.name || "Jiminy Cricket";
  var newNino = sessionData.nino || "DE987654F";

  var newData = {
    name : newName,
    nino : newNino
  }

  res.render('latest/esa-claimant-committment', newData);
}

function committmentActionsAction (req, res) {

  var getEsaCommittmentData = {
    name  : "Jane Gleadall",
    nino  : "AB123456C"
  };

  req.session.sessionData = getEsaCommittmentData;
  res.redirect('/latest/esa_claimant/actions');
}

module.exports.committmentActionsPage = committmentActionsPage;
module.exports.committmentActionsAction = committmentActionsAction;