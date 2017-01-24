module.exports = function(router){
  router.post('/latest/job_next_new', function(req, res){

    if(req.body.appointmentUpdate){
      req.session.hasAppointment = false;
      req.session.appointmentUpdate = req.body.appointmentUpdate;
    } else {
      req.session.hasAppointment = true;
      req.session.appointmentUpdate = false;
    }

    if( req.body.action === 'Create appointment'){
      req.session.hasAppointment = false;
      req.session.appointmentUpdate = false;
    }

    res.render('latest/job_next_new');
  });
}