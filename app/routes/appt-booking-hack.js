
// Code for appointment booking hack - 15 September 2017

/**
 * Created by janegleadall on 14/09/2017.
 */
var appthack = require("../controllers/apptBookingHackController");

module.exports = function(router) {

  // Appointment page routes
  router.get('/apptbookhack/update', appthack.apptUpdatePage);
  router.post('/apptbookhack/update', appthack.apptUpdatePageAction);
  router.get('/apptbookhack/summary', appthack.displayClaimantSummaryPageWithAppointmentFromApi);
}