/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                       ESA Claimant Committmemt Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function viewCommitment (req, res) {
  var newData = {};
  var commitmentDisplayObject = {};

  if (!req.session.sessionData) {
    var actionData = [
      {
        actionNum : 1,
        action : "Default action 1",
        how : "Deafult how 1",
        byWhen : {
          whenDay : "31",
          whenMonth : getMonth(12),
          whenYear : "2017"
        },
        volOrMand : "Voluntary"
      },
      {
        actionNum : 2,
        action : "Default action 2",
        how : "Default how 2",
        byWhen : {
          whenDay : "31",
          whenMonth : getMonth(12),
          whenYear : "2017"
        },
        volOrMand : "Mandatory"
      },
      {
        actionNum : 3,
        action : "Default action 3",
        how : "Default how 3",
        byWhen : {
          whenDay : "31",
          whenMonth : getMonth(12),
          whenYear : "2017"
        },
        volOrMand : "Mandatory"
      }
    ];
    newData = actionData;
  } else {
    newData = req.session.sessionData;
  }
  commitmentDisplayObject = {
    name : "Justin Bimbolake",
    nino : "AB123456C",
    wca : "Yes",
    actionData : newData
  }
  res.render('latest/esa-claimant-commitment-view', commitmentDisplayObject);
}

function addClaimantCommitmentPage (req, res) {

  newData = {
    name : "James Cricket Esq.",
    nino : "XY987654Z"
  }

  res.render('latest/esa-claimant-commitment', newData);
}

function addClaimantCommitmentAction (req, res) {

  var claimantCommitmentData = [];

  for (var i = 0; i < 9; i++) {
    if (req.body['action-' + (i + 1)] !== '') {
      var actionDay = req.body['whenDay-' + (i + 1)];
      var actionMonth = req.body['whenMonth-' + (i + 1)];
      var actionYear = req.body['whenYear-' + (i + 1)];
      var action = {
        actionNum : (i + 1),
        action : req.body['action-' + (i + 1)],
        how : req.body['how-' + (i + 1)],
        byWhen : {
          whenDay : parseInt(actionDay),
          whenMonth : getMonth(parseInt(actionMonth)),
          whenYear : parseInt(actionYear)
        },
        volOrMand : req.body['volOrMand-' + (i + 1)]
      };
      claimantCommitmentData.push(action);
    }
  }

  req.session.sessionData = claimantCommitmentData;
  res.redirect('/latest/esa_claimant/viewCommitment');
}

function getMonth(monthNumber) {

  var textMonth;
  var month = new Array()
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';

  textMonth = month[monthNumber - 1];
  return textMonth;
}

module.exports.viewCommitment = viewCommitment;
module.exports.addClaimantCommitmentPage = addClaimantCommitmentPage;
module.exports.addClaimantCommitmentAction = addClaimantCommitmentAction;