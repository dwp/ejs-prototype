const Commitment = require('../model/commitment');
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                       ESA Claimant Committmemt Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function viewCommitment (req, res) {

  if (!req.session.commitment) {
    var commitmentToDisplay = new Commitment('Jade Gladioli', 'PQ102938R', 'Yes');
    commitmentToDisplay.setCommitmentDate(new Date());
    const defaultViewByWhen1 = new Date('2017-12-31');
    const defaultViewByWhen2 = new Date('2018-01-31');
    const defaultViewByWhen3 = new Date('2018-03-31');
    commitmentToDisplay.addActionToActionData(1, 'Default action one werwe', 'Default how one', defaultViewByWhen1, 'Voluntary');
    commitmentToDisplay.addActionToActionData(2, 'Default action twoeee', 'Default how two', defaultViewByWhen2, 'Mandatory');
    commitmentToDisplay.addActionToActionData(3, 'Default action three', 'Default how three', defaultViewByWhen3, 'Voluntary');
    req.session.commitment = commitmentToDisplay;
  }
  res.render('latest/esa-claimant-commitment-view');
}

function printCommitment (req, res) {

  if(!req.session.commitment) {
    var commitmentToPrint = new Commitment('Jackson Pollock', 'RS463728T', 'Yes');
    commitmentToPrint.setCommitmentDate('2018-10-06');
    const defaultPrintByWhen1 = new Date('2017-09-30');
    const defaultPrintByWhen2 = new Date('2017-12-31');
    const defaultPrintByWhen3 = new Date('2018-03-31');
    commitmentToPrint.addActionToActionData(1, 'I will find two jobs per month that I could apply for', 'By searching job internet sites', defaultPrintByWhen1, 'Voluntary');
    commitmentToPrint.addActionToActionData(2, 'I will write a CV', 'By attending a local support group', defaultPrintByWhen2, 'Voluntary');
    if (req.query.wca === 'No') {
      commitmentToPrint.addActionToActionData(3, 'I will improve my word processing skills', 'By attending a Microsoft Word Basics course', defaultPrintByWhen3, 'Voluntary');
    } else {
      commitmentToPrint.addActionToActionData(3, 'I will improve my word processing skills', 'By attending a Microsoft Word Basics course', defaultPrintByWhen3, 'Mandatory');
    }
    req.session.commitment = commitmentToPrint;
  }

  if ( req.query.wca === 'No') {
    res.render('latest/esa-claimant-commitment-pre-wca');
  } else {
    res.render('latest/esa-claimant-commitment-post-wca');
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

  var newCommitment = new Commitment('Justin Bimbolake', 'AB123456C', 'No');
  var todaysDate = new Date();
  newCommitment.setCommitmentDate(todaysDate);
  req.session.commitment = newCommitment;
  res.render('latest/esa-claimant-commitment');

}

function addClaimantCommitmentAction (req, res) {

  var updatedNewCommitment = new Commitment(req.session.commitment.clientName, req.session.commitment.clientNino, req.body.wca);

  updatedNewCommitment.commitmentDate = req.session.commitment.commitmentDate;

  for (var i = 0; i < 9; i++) {
    if (req.body['action-' + (i + 1)] !== '') {
      let newActionNum = (i+1);
      let newAction = req.body['action-' + (i + 1)];
      let newHow = req.body['how-' + (i + 1)];
      let actionDay = parseInt(req.body['whenDay-' + (i + 1)]);
      let actionMonth = parseInt(req.body['whenMonth-' + (i + 1)]);
      let actionYear = parseInt(req.body['whenYear-' + (i + 1)]);
      let newByWhen = new Date(actionYear + '-' + actionMonth + '-' + actionDay);
      let newVolOrMand;

      if (updatedNewCommitment.wca === "No") {
        newVolOrMand = "Voluntary";
      } else {
        newVolOrMand = req.body['volOrMand-' + (i + 1)];
      }
      updatedNewCommitment.addActionToActionData(newActionNum, newAction, newHow, newByWhen, newVolOrMand);
    }
  }
  req.session.commitment = updatedNewCommitment;
  res.redirect('/latest/esa_claimant/viewCommitment');
}

module.exports.viewCommitment = viewCommitment;
module.exports.printCommitment = printCommitment;
module.exports.viewCommitmentsSummary = viewCommitmentsSummary;
module.exports.addClaimantCommitmentPage = addClaimantCommitmentPage;
module.exports.addClaimantCommitmentAction = addClaimantCommitmentAction;