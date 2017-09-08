const Appointment = require('../models/appointment');
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Appointment Page Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function appointmentsPage(req, res) {

  var appointments = setInitialAppointmentsList();
  var pastAppointments = [];
  var futureAppointments = [];
  var apptsIn = req.session.appointments || appointments;
  var apptsOut = {};

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
  res.locals.data.appointments = apptsOut;
  res.locals.data.hasAppointment = checkForBookedAppointments(apptsIn);

  res.render('appointments/appointments');
}

function appointmentViewPage(req, res) {

  var appointments = req.session.appointments || [];
  var dummyAppointmentForView = new Appointment(500, 'Telephone', '2018-01-01', '09', '00', 'Provision discussion', 'Booked', 'No', 'Claimant would like to discuss possible work experience opportunities')


  if (req.query.id === '500') {
    res.locals.data.appointmentForView = dummyAppointmentForView;
  } else {
    var index = findPositionOfAppointmentInArray(req.query.id, appointments);
    res.locals.data.appointmentForView = appointments[index];
  }

  res.locals.data.hasAppointment = 1;
  res.render('appointments/appointment_view');

}

// If not new appointment, but is an update direct from the index page (i.e. test appointment array has not yet been set up), use dummy appointment details
function appointmentEditPage(req, res) {

  var appointments = req.session.appointments || [];
  var dummyAppointmentForUpdate = new Appointment(500, 'Telephone', '2018-01-01', '09', '00', 'Provision discussion', 'Booked', 'No', 'Claimant would like to discuss possible work experience opportunities')

// If new appointment, set new appointment marker and set up empty object to give to page
  if (!req.query.id) {
    res.locals.data.newAppt = 1;
    res.locals.data.appointmentForUpdate = {}
// If not new appointment, but is an update request direct from the index page (i.e. test appointment array has not yet been set up), give page dummy appointment
  } else if (req.query.id === '500') {
    req.session.appointments = setInitialAppointmentsList();
    req.session.appointments.unshift(dummyAppointmentForUpdate);
    res.locals.data.appointmentForUpdate = dummyAppointmentForUpdate;
// If not new appointment, find the appointment in the existing array using the id provided in the query, and give that appointment to the page
  } else {
    var index = findPositionOfAppointmentInArray(req.query.id, appointments);
    res.locals.data.appointmentForUpdate = appointments[index];
  }

  res.locals.data.hasAppointment = checkForBookedAppointments(appointments);
  res.render('appointments/appointment_edit');

}

function appointmentEditPageAction(req, res) {

  var appointments = req.session.appointments ? req.session.appointments : setInitialAppointmentsList();
  var appointment = new Appointment(0, req.body['appt-type'], (req.body['appt-year'] + '-' + req.body['appt-month'] + '-' + req.body['appt-day']), req.body['appt-time-hrs'], req.body['appt-time-mins'], req.body['appt-description'], 'Booked', req.body['appt-immediate'], 'Default for now');
  var numericApptId = req.body.id ? parseInt(req.body.id) : {};

// If appointment update, find which array position the appointment is in, set status to new status,
// or keep existing status if status not changed on screen, add updated appointment back into array at same position
  if ((numericApptId !== null) && (numericApptId !== undefined) && (numericApptId > 0)) {
    var index = findPositionOfAppointmentInArray(numericApptId, appointments);
    appointment.id = numericApptId;
    appointment.apptStatus = req.body['appt-status'] ? req.body['appt-status'] : appointments[index].apptStatus;
    appointments[index] = appointment;
// If new appointment, add one to existing array length to get id for new appointment, then add the appointment as first object in array
// (so don't have to sort array at moment - may change)
  } else {
    appointment.id = appointments.length + 1;
    appointments.unshift(appointment);
  }

  res.locals.data.hasAppointment = 1;
  req.session.appointments = appointments;

  res.redirect('/appointments/summary');

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

function setInitialAppointmentsList(){
  var apptsList = [];
  var appointment;
  appointment = new Appointment(8,'Face-to-face', '2017-12-01', '10', '15', 'Group information discussion', 'Booked', 'No', '');
  apptsList.push(appointment);
  appointment = new Appointment(7,'Telephone', '2017-07-09', '14', '10', 'Advisory discretion fund (ADF)', 'Failed to attend', 'No', '');
  apptsList.push(appointment);
  appointment = new Appointment(6,'Face-to-face', '2017-06-01', '11', '05', 'Group information session', 'Attended', 'Yes', '');
  apptsList.push(appointment);
  appointment = new Appointment(5,'Face-to-face', '2017-11-14', '14', '45', 'Work focussed interview', 'Booked', 'No', '');
  apptsList.push(appointment);
  appointment = new Appointment(4,'Face-to-face', '2017-10-03', '10', '15', 'Provision discussion', 'Booked', 'Yes', '');
  apptsList.push(appointment);
  appointment = new Appointment(3,'Digital', '2017-07-06', '09', '20', 'Provision referral', 'Failed to attend', 'No', '');
  apptsList.push(appointment);
  appointment = new Appointment(2,'Face-to-face', '2017-06-01', '15', '20', 'Work focussed interview', 'Re-booked', 'No', '');
  apptsList.push(appointment);
  appointment = new Appointment(1,'Digital', '2017-04-22', '11', '30', 'Provision sanction', 'Failed to attend', 'No', '');
  apptsList.push(appointment);

  return apptsList;

}

module.exports.appointmentsPage = appointmentsPage;
module.exports.appointmentViewPage = appointmentViewPage;
module.exports.appointmentEditPage = appointmentEditPage;
module.exports.appointmentEditPageAction = appointmentEditPageAction;