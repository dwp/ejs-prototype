
// New code for multiple appointments and multiple appointment types

/**
 * Created by janegleadall on 24/08/2017.
 */
var appointment = require("../controllers/appointmentController");

module.exports = function(router) {

  // Appointments page routes
  router.get('/latest/appointments', appointment.appointmentsPage);
  router.get('/latest/appointment-edit', appointment.appointmentEditPage);
  router.post('/latest/appointment-edit', appointment.appointmentEditPageAction);
}
