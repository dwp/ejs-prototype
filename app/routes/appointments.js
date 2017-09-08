
// New code for multiple appointments and multiple appointment types

/**
 * Created by janegleadall on 24/08/2017.
 */
var appointment = require("../controllers/appointmentController");

module.exports = function(router) {

  // Appointments page routes
  router.get('/appointments/summary', appointment.appointmentsPage);
  router.get('/appointments/view', appointment.appointmentViewPage);
  router.get('/appointments/edit', appointment.appointmentEditPage);
  router.post('/appointments/edit', appointment.appointmentEditPageAction);

}

//
//module.exports = function(router){
//  router.post('/latest/job_next_new', function(req, res){
//
//    if(req.body.appointmentUpdate){
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
//  });
//}