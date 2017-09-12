
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
  router.get('/appointments/edit/multiple', appointment.appointmentsEditMultiplePage);
  router.post('/appointments/edit/multiple', appointment.appointmentsEditMultiplePageAction);

}
