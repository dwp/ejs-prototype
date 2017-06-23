/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                       ESA Claimant Committmemt Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function viewCommitment (req, res) {
  var newData;
  var commitmentDisplayObject;
  var wca;
  var commitmentDate;

  if (!req.session.wca) {
    wca = "No"
  } else {
    wca = req.session.wca;
  }

  if (!req.session.commitmentDate) {
    commitmentDate = "01 January 2017";
  } else {
    commitmentDate = req.session.commitmentDate;
  }

  if (!req.session.sessionData) {
    let actionDate = new Date('2017-12-31');
    var byWhen = formatDateForDisplay(actionDate);
    var actionData = [
      {
        actionNum : 1,
        action : "Default action 1",
        how : "Deafult how 1",
        byWhen : byWhen,
        volOrMand : "Voluntary"
      },
      {
        actionNum : 2,
        action : "Default action 2",
        how : "Default how 2",
        byWhen : byWhen,
        volOrMand : "Mandatory"
      },
      {
        actionNum : 3,
        action : "Default action 3",
        how : "Default how 3",
        byWhen : byWhen,
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
    wca : wca,
    commitmentDate : commitmentDate,
    actionData : newData
  }

  res.render('latest/esa-claimant-commitment-view', commitmentDisplayObject);
}

function printCommitment (req, res) {

  var actionData = [
    {
      actionNum : 1,
      action : "I will find two jobs per month that I could apply for",
      how : "By searching job internet sites",
      byWhen : "30 September 2017",
      volOrMand : "Voluntary"
    },
    {
      actionNum : 2,
      action : "I will write a CV",
      how : "By attending a local support group",
      byWhen : "31 December 2017",
      volOrMand : "Voluntary"
    },
    {
      actionNum : 3,
      action : "I will improve my word processing skills",
      how : "By attending a Microsoft Word Basics course",
      byWhen : "31 March 2018",
      volOrMand : "Voluntary"
    }
  ];

  var commitmentName = "Janet Anjohn";
  var commitmentNino = "XY192837Z";
  var commitmentWCA = req.query.wca;
  var commitmentDate = "01 February 2017";
  var commitmentActionData = req.session.sessionData ? req.session.sessionData : actionData;

  var commitmentForPrintPage = {
    printName : commitmentName,
    printNino : commitmentNino,
    printWCA : commitmentWCA,
    printCommitmentDate : commitmentDate,
    printActionData : commitmentActionData
  };

  if ( commitmentWCA === 'No') {
    res.render('latest/esa-claimant-commitment-pre-wca', commitmentForPrintPage);
  } else {
    commitmentForPrintPage.printActionData[2].volOrMand = "Mandatory";
    res.render('latest/esa-claimant-commitment-post-wca', commitmentForPrintPage);
  }
}

function viewCommitmentsSummary (req, res) {

  var commitmentsList = [];
  var commitment;
  var commitmentsListDisplayObject;

  commitment = {
    commitmentDate : "08 August 2018",
    wca : "Yes"
  };
  commitmentsList.push(commitment);

  commitment = {
    commitmentDate : "03 July 2016",
    wca : "No"
  };
  commitmentsList.push(commitment);

  commitment = {
    commitmentDate : "01 February 2016",
    wca : "No"
  };
  commitmentsList.push(commitment);

  commitmentsListDisplayObject = {
    name : "Justin Bimbolake",
    commitmentsList : commitmentsList
  };

  res.render('latest/esa-claimant-commitments-summary', commitmentsListDisplayObject);

}

function addClaimantCommitmentPage (req, res) {

  var newData = {
    name : "James Cricket Esq.",
    nino : "XY987654Z"
  }

  res.render('latest/esa-claimant-commitment', newData);
}

function addClaimantCommitmentAction (req, res) {

  var claimantCommitmentData = [];
  var wca = req.body.wca;
  var todaysDate = new Date();
  var commitmentDate;

  for (var i = 0; i < 9; i++) {
    if (req.body['action-' + (i + 1)] !== '') {
      var actionDay = parseInt(req.body['whenDay-' + (i + 1)]);
      var actionMonth = parseInt(req.body['whenMonth-' + (i + 1)]);
      var actionYear = parseInt(req.body['whenYear-' + (i + 1)]);
      var actionDate = new Date(actionYear + '-' + actionMonth + '-' + actionDay);
      var byWhen = formatDateForDisplay(actionDate);
      var volOrMand;
      if (wca === "No") {
        volOrMand = "Voluntary";
      } else {
        volOrMand = req.body['volOrMand-' + (i + 1)];
      }
      var action = {
        actionNum : (i + 1),
        action : req.body['action-' + (i + 1)],
        how : req.body['how-' + (i + 1)],
        byWhen : byWhen,
        volOrMand : volOrMand
      };

      claimantCommitmentData.push(action);
    }
  }

  commitmentDate = formatDateForDisplay(todaysDate);

  req.session.commitmentDate = commitmentDate;
  req.session.wca = wca;
  req.session.sessionData = claimantCommitmentData;
  res.redirect('/latest/esa_claimant/viewCommitment');
}

function formatDateForDisplay (unformattedDate) {
  var formattedDate;
  var dateDay;
  var dateMonth;
  var dateYear;

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

  dateDay = unformattedDate.getDate();
  dateMonth = month[unformattedDate.getMonth()];
  dateYear = unformattedDate.getFullYear();

  formattedDate = dateDay + ' ' + dateMonth + ' ' + dateYear;
  return formattedDate;
}

module.exports.viewCommitment = viewCommitment;
module.exports.printCommitment = printCommitment;
module.exports.viewCommitmentsSummary = viewCommitmentsSummary;
module.exports.addClaimantCommitmentPage = addClaimantCommitmentPage;
module.exports.addClaimantCommitmentAction = addClaimantCommitmentAction;