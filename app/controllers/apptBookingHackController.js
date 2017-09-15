const Appt = require('../models/appthack');
var request = require('request');

function apptUpdatePage(req, res) {
  var pastAppointments = [];
  var futureAppointments = [];
  var apptsIn = [];
  var apptsOut = {};

  //const requestOpts = {
  //  method: 'POST',
  //  url: `localhost:port/urlforapi`,
  //  body: {
  //    customerId : res.locals.customerId
  //  },
  //  headers: {
  //    'X-Request-Id': req.id
  //  },
  //  json: true
  //};
  //
  //request(requestOpts, function (error, response, body) {
  //  console.log('error:', error); // Print the error if one occurred
  //  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //  apptsIn.push(body.appt);
  //});

  apptsIn = req.session.appointments ? req.session.appointments : setInitialAppointmentsList();

  for (var i = 0; i < apptsIn.length; i++) {
    if (apptsIn[i].apptStatus === 'Booked') {
      futureAppointments.push(apptsIn[i]);
    } else {
      pastAppointments.push(apptsIn[i]);
    }
  }

  apptsOut = { futureAppts : futureAppointments,
    pastAppts : pastAppointments};

  req.session.appointments = apptsIn;
  req.session.forUpdate = apptsOut.futureAppts;
  res.locals.data.appointments = apptsOut;
  res.locals.data.hasAppointment = checkForBookedAppointments(apptsIn);

  res.render('appt_hack/appt_hack_single');

}

function apptUpdatePageAction(req, res) {

  var appointmentsFullList = req.session.appointments ? req.session.appointments : setInitialAppointmentsList();
  var appointments = req.session.forUpdate ? req.session.forUpdate : [];

  if (appointments === []) {
    console.log('Appointments to be updated is null array');
    res.redirect('/appt_hack/appt_hack_claimant_summary');
  } else {
    for (var i = 0; i < appointments.length; i++) {
      var id = req.body['id-' + appointments[i].id];
      var numericId = parseInt(id);

      if ((numericId !== null) && (numericId !== undefined) && (numericId > 0)) {

        var index = findPositionOfAppointmentInArray(numericId, appointmentsFullList);
        var type = appointmentsFullList[index].apptType;
        var desc = appointmentsFullList[index].apptDescription;
        var date = appointmentsFullList[index].apptDate;
        var timeHrs = appointmentsFullList[index].apptTimeHrs;
        var timeMins = appointmentsFullList[index].apptTimeMins
        var status = req.body['appt-status-' + appointments[i].id];
        var appt = new Appt(numericId, type, desc, date, timeHrs, timeMins, status);

        appointmentsFullList[index] = appt;

      } else {
        console.log('id is: ', id);
        console.log('numericId is: ', numericId);
      }
    }

    res.locals.data.hasAppointment = checkForBookedAppointments(appointmentsFullList);
    req.session.appointments = appointmentsFullList;

    res.redirect('/apptbookhack/summary');
  }

}

function displayClaimantSummaryPageWithAppointmentFromApi (req, res) {

    var appts = req.session.appointments ? req.session.appointments : setInitialAppointmentsList();
    var appt = appts[0];

  //const requestOpts = {
  //  method: 'POST',
  //  url: `localhost:port/urlforapi`,
  //  body: {
  //    customerId : res.locals.customerId
  //  },
  //  headers: {
  //    'X-Request-Id': req.id
  //  },
  //  json: true
  //};
  //
  //request(requestOpts, function (error, response, body) {
  //  console.log('error:', error); // Print the error if one occurred
  //  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //  appt = body;
  //});

  req.session.appointments = appt;
  res.locals.data.appt = appt;
  if (appt.apptStatus !== 'Booked') {
    res.locals.data.hasAppt = 0;
  } else {
    res.locals.data.hasAppt = 1;
  }
  res.render('appt_hack/appt_hack_claimant_summary');

}

  function findPositionOfAppointmentInArray(inputQueryId, appointments) {
    var positionOfApptInArray;
    var appointmentsArray = appointments;
    var arrLength = appointmentsArray.length;
    var queryId = parseInt(inputQueryId);

    for (var i = 0; i < arrLength; i++) {

      if (appointmentsArray[i].id === queryId) {
        positionOfApptInArray = i;
      }
    }

    return positionOfApptInArray;
  }

  function checkForBookedAppointments(appointmentsListToCheck) {
    var apptsList = appointmentsListToCheck;
    var bookedAppointmentIndicator = 0;
    for (var i = 0; i < apptsList.length; i++) {
      if (apptsList[i].apptStatus === 'Booked') {
        bookedAppointmentIndicator = 1;
        break;
      }
    }
    return bookedAppointmentIndicator;
  }

  function setInitialAppointmentsList() {
    var apptsList = [];
    var appointment;
    appointment = new Appt(1, 'Digital', 'Work focussed interview', '2017-04-22', '11', '30', 'Booked');
    apptsList.push(appointment);

    return apptsList;

  }

  module.exports.apptUpdatePage = apptUpdatePage;
  module.exports.apptUpdatePageAction = apptUpdatePageAction;
  module.exports.displayClaimantSummaryPageWithAppointmentFromApi = displayClaimantSummaryPageWithAppointmentFromApi;
