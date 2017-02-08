module.exports = function(router){
  router.get('/latest/toggle_user_role', function(req, res, next){
    var fromIndexPage = !req.header('Referer').includes('latest');

    if(req.session.user && req.session.user.role && req.session.user.role !== 'manager'){
      req.session.user = { name : 'Martha Vansant', role : 'manager' }
    } else {
      req.session.user = { name : 'William Conroy', role : 'workcoach' }
    }

    if(fromIndexPage){
      res.redirect('/');
    } else {
      res.redirect('/latest/job');
    }
  });
}