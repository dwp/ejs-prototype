module.exports = function(router){
  router.post('/latest/job_next_new', function(req, res){

    if(req.body.appointmentUpdate){
      req.session.hasAppointment = false;
    } else {
      req.session.hasAppointment = true;
    }

    res.render('latest/job_next_new');
  });
}