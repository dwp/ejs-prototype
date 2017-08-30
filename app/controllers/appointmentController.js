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

function appointmentEditPage(req, res) {

  var appointments = req.session.appointments || {};

  if (req.query.id) {
    var index = findPositionOfAppointmentInArray(req.query.id, appointments);
    res.locals.data.appointmentForUpdate = appointments[index];
  } else {
    res.locals.data.newAppt = 1;
    res.locals.data.appointmentForUpdate = {}
  }
  res.render('latest/appointments_edit');

}

function appointmentEditPageAction(req, res) {

  var appointments = req.session.appointments;
  var appointment = {
      apptType: req.body['appt-type'],
      apptDateValues: [req.body['appt-day'],req.body['appt-month'], req.body['appt-year']],
      apptTimeHrs: req.body['appt-time-hrs'],
      apptTimeMins: req.body['appt-time-mins'],
  };
  var numericApptId = req.body.id ? parseInt(req.body.id) : {};

  if ((numericApptId !== null) && (numericApptId !== undefined) && (numericApptId > 0)) {

    var index = findPositionOfAppointmentInArray(numericApptId, appointments);
    appointment.id = numericApptId;
    appointment.apptStatus = req.body['appt-status'] ? req.body['appt-status'] : appointments[index].apptStatus;
    appointments[index] = appointment;
  } else {
    appointment.id = appointments.length + 1;
    appointment.apptStatus = 'Booked';
    appointments.unshift(appointment);
  }

  console.log('Amended appointment looks like : ', appointment);

  req.session.appointments = appointments;

  res.redirect('/latest/appointments');

}

function setInitialAppointmentsList(){
  return [
    { id: 4, apptType: 'Appointment type 4', apptDateValues: [ '01', '10', '2017'], apptStatus: 'Confirmed', apptTimeHrs: '10', apptTimeMins: '15'},
    { id: 3, apptType: 'Appointment type 3', apptDateValues: [ '01', '07', '2017'], apptStatus: 'Failed to attend', apptTimeHrs: '14', apptTimeMins: '10'},
    { id: 2, apptType: 'Appointment type 1', apptDateValues: [ '01', '06', '2017'], apptStatus: 'Re-booked', apptTimeHrs: '11', apptTimeMins: '05'},
    { id: 1, apptType: 'Appointment type 1', apptDateValues: [ '01', '04', '2017'], apptStatus: 'Attended', apptTimeHrs: '14', apptTimeMins: '45'}
  ];
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

module.exports.appointmentsPage = appointmentsPage;
module.exports.appointmentEditPage = appointmentEditPage;
module.exports.appointmentEditPageAction = appointmentEditPageAction;