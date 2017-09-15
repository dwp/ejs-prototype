const Appt = require('../models/appthack');
const request = require('request');

function apptUpdatePage(req, res) {

  var claimId = 221;
  var appt;
  var apptToDisplay;

  const requestOpts = {
    method: 'POST',
    url: `http://localhost:8200/appointment`,
    body: {
      claimId : claimId
    },
    json: true
  };

  request(requestOpts, function (error, response, body) {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
    } else if (response.statusCode !== 200) {
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    } else {
      appt = body;
      console.log("appt.id is: ", appt.id);
      if (appt.id !== '') {
        apptToDisplay = new Appt(appt.id, appt.aptDay, appt.aptMonth, appt.aptYear, appt.aptHour, appt.aptMinute, '');
      } else {
        apptToDisplay = {};
      }
      console.log('apptToDisplay is: ', apptToDisplay);
      res.locals.data.appointment = apptToDisplay;
      req.session.forUpdate = apptToDisplay;

      res.render('appt_hack/appt_hack_single');
    }
  });
}

function apptUpdatePageAction(req, res) {

  var appointment = req.session.forUpdate ? req.session.forUpdate : [];
  var bodyAppt = {};

  if (appointment === {}) {
    console.log('Appointment to be updated is empty');
    res.local.data.hasAppt = 0;
    res.redirect('/appt_hack/appt_hack_claimant_summary');
  } else {
    var id = req.body['id'];
    var numericId = parseInt(id);

    if ((numericId !== null) && (numericId !== undefined) && (numericId > 0)) {
      var day = appointment.apptDateDay;
      var month = appointment.apptDateMonth;
      var year = appointment.apptDateYear;
      var timeHrs = appointment.apptTimeHrs;
      var timeMins = appointment.apptTimeMins
      var status = req.body['appt-status'];
      var appt = new Appt(numericId, day, month, year, timeHrs, timeMins, status);
      bodyAppt = {
        id : id,
        closeReason : status
      }

      const requestOpts = {
        method: 'POST',
        url   : `http://localhost:8200/appointment/edit`,
        body  : bodyAppt,
        json  : true
      };

      request(requestOpts, function (error, response, body) {
        if (error) {
          console.log('error:', error); // Print the error if one occurred
        }
        if (response.statusCode !== 200) {
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        } else {
          console.log('status is: ', status);
          //if (status === '') {
          //  res.locals.data.hasAppt = 1;
          //} else {
          //  res.locals.data.hasAppt = 0;
          //}
          req.session.appointment = appt;
          res.redirect('/apptbookhack/summary');
        }
      });

    } else {
      console.log('Something went wrong with appointment with id: ', id);
      console.log('numericId is: ', numericId);
    }
  }
}

function displayClaimantSummaryPageWithAppointmentFromApi (req, res) {

  var newAppt = new Appt(1, '22', '04', '2017', '11', '30', '');
  var appt = req.session.appointment ? req.session.appointment : newAppt;
  if (appt.apptStatus === '') {
    res.locals.data.hasAppt = 1;
  } else {
    res.locals.data.hasAppt = 0;
  }
  res.render('appt_hack/appt_hack_claimant_summary');

}

  module.exports.apptUpdatePage = apptUpdatePage;
  module.exports.apptUpdatePageAction = apptUpdatePageAction;
  module.exports.displayClaimantSummaryPageWithAppointmentFromApi = displayClaimantSummaryPageWithAppointmentFromApi;
