/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Appointment Page Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function appointmentsPage(req, res) {

  req.session.appointments = req.session.appointments || setInitialAppointments();
  res.locals.data.appointments = req.session.appointments;
  res.render('latest/appointments');
}

function appointmentEditPage(req, res) {

  var appointments = {};
  appointments = req.session.appointments;

  if (req.query.id) {
    res.locals.data.appointmentForUpdate = appointments[req.query.id];
  } else {
    res.locals.data.appointmentForUpdate = {}
  }

  req.session.appointments = appointments;
  res.render('latest/appointments_edit');

}

function appointmentEditPageAction(req, res) {

  var appointments = req.session.appointments;
  var index;
  var appointment = {
      apptType: req.body['appt-type'],
      apptDateValues: [req.body['appt-day'],req.body['appt-month'], req.body['appt-year']],
      apptTimeHrs: req.body['appt-time-hrs'],
      apptTimeMins: req.body['appt-time-mins'],
      apptStatus: req.body['appt-status']
  };

  if (req.query.id) {
    index = appointments.indexOf(req.body.id);
    appointment.id = req.body.id;
    appointments[index] = appointment;
  } else {
    appointments.unshift(appointment);
  }

  req.session.appointments = appointments;
  res.redirect('/latest/appointments');

}

function setInitialAppointments(){
  return [
    { id: 0, apptType: 'Appointment type 4', apptDateValues: [ '01', '10', '2017'], apptStatus: 'Confirmed', apptTimeHrs: '10', apptTimeMins: '15'},
    { id: 1, apptType: 'Appointment type 3', apptDateValues: [ '01', '07', '2017'], apptStatus: 'Failed to attend', apptTimeHrs: '14', apptTimeMins: '10'},
    { id: 2, apptType: 'Appointment type 1', apptDateValues: [ '01', '06', '2017'], apptStatus: 'Re-booked', apptTimeHrs: '11', apptTimeMins: '05'},
    { id: 3, apptType: 'Appointment type 1', apptDateValues: [ '01', '04', '2017'], apptStatus: 'Attended', apptTimeHrs: '14', apptTimeMins: '45'}
  ];
}

module.exports.appointmentsPage = appointmentsPage;
module.exports.appointmentEditPage = appointmentEditPage;
module.exports.appointmentEditPageAction = appointmentEditPageAction;