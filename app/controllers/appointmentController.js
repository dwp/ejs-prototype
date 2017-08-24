/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Appointment Page Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

//if(req.body.appointmentUpdate){
//      req.session.hasAppointment = false;
//      req.session.appointmentUpdate = req.body.appointmentUpdate;
//    } else {
//      req.session.hasAppointment = true;
//      req.session.appointmentUpdate = false;
//    }
//
//    if( req.body.action === 'Create appointment'){
//      req.session.hasAppointment = false;
//      req.session.appointmentUpdate = false;
//
//      res.render('latest/job_next_new')
//    } else {
//      res.redirect('/latest/job_record_confirm');
//    }





if (req.body.action === 'Create appointment') {

}






function appointmentPage(req, res) {

  req.session.appointments = req.session.appointments || getTestAppointments();
  res.render('latest/appointments');
}

function appointmentPageAction(req, res) {

}


function getTestAppointments(){
  return [
    { id: 0, apptType : 'Appointment type 1', apptDateValues: [ '01', '10', '2017'], apptStatus: 'Confirmed', apptTime: '10:15'},
    { id: 1, apptType : 'Appointment type 2', apptDateValues: [ '01', '07', '2017'], apptStatus: 'Failed to attend', apptTime: '14:10'},
    { id: 2, apptType : 'Appointment type 3', apptDateValues: [ '01', '06', '2017'], apptStatus: 'Re-booked', apptTime: '11:05'},
    { id: 3, apptType : 'Appointment type 4', apptDateValues: [ '01', '04', '2017'], apptStatus: 'Attended', aapptTime: '14:45'}
  ];
}

