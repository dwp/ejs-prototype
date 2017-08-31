const Appointment = require('../models/appointment');
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Appointment Page Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function appointmentsPage(req, res) {

  var appointments = setInitialAppointmentsList();
  req.session.appointments = req.session.appointments || appointments;
  res.locals.data.appointments = req.session.appointments;
  res.render('latest/appointments');
}


// If not new appointment, but is an update direct from the index page (i.e. test appointment array has not yet been set up), use dummy appointment details
function appointmentEditPage(req, res) {

  var appointments = req.session.appointments || {};
  var dummyAppointmentForUpdate = new Appointment(500, 'Provision discussion', '2018-01-01', '09', '00', 'Booked', 0, 'Claimant would like to discuss possible work experience opportunities')

  console.log('req.query.id is:  ', req.query.id);

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

  console.log('res.locals.data.appointmentForUpdate is: ', res.locals.data.appointmentForUpdate);
  console.log('res.locals.data.newAppt is: ', res.locals.data.newAppt );

  res.render('latest/appointments_edit');

}

function appointmentEditPageAction(req, res) {

  var appointments = req.session.appointments ? req.session.appointments : setInitialAppointmentsList();
  var appointment = new Appointment(0, req.body['appt-type'], (req.body['appt-year'] + '-' + req.body['appt-month'] + '-' + req.body['appt-day']), req.body['appt-time-hrs'], req.body['appt-time-mins'], 'Booked' , 0, 'Default for now');
  var numericApptId = req.body.id ? parseInt(req.body.id) : {};

// If appointment update, change id provided in query to numeric value, find which array position the appointment is in, set status to new status,
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

  req.session.appointments = appointments;

  res.redirect('/latest/appointments');

}

function setInitialAppointmentsList(){
  var apptsList = [];
  var appointment;
  appointment = new Appointment(8, 'Provision sanction', '2017-10-01', '10', '15', 'Booked', 0, '');
  apptsList.push(appointment);
  appointment = new Appointment(7,'Advisory discretion fund (ADF)', '2017-07-09', '14', '10', 'Failed to attend', 0, '');
  apptsList.push(appointment);
  appointment = new Appointment(6,'Group information session', '2017-06-01', '11', '05', 'Attended', 0, '');
  apptsList.push(appointment);
  appointment = new Appointment(5,'Provision referral', '2017-04-14', '14', '45', 'Booked', 0, '');
  apptsList.push(appointment);
  appointment = new Appointment(4,'Provision discussion', '2017-10-03', '10', '15', 'Booked', 0, '');
  apptsList.push(appointment);
  appointment = new Appointment(3,'Provision referral', '2017-07-06', '09', '20', 'Failed to attend', 0, '');
  apptsList.push(appointment);
  appointment = new Appointment(2,'Work focused interview', '2017-06-01', '15', '20', 'Re-booked', 0, '');
  apptsList.push(appointment);
  appointment = new Appointment(1,'Provision referral', '2017-04-22', '11', '30', 'Failed to attend', 0, '');
  apptsList.push(appointment);

  return apptsList;

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

  console.log('Position in array is: ', positionOfApptInArray);
  return positionOfApptInArray;
}

module.exports.appointmentsPage = appointmentsPage;
module.exports.appointmentEditPage = appointmentEditPage;
module.exports.appointmentEditPageAction = appointmentEditPageAction;