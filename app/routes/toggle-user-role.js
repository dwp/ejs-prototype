module.exports = function(router, users){
  router.get('/latest/toggle_user_role', function(req, res, next){
    var fromIndexPage = !req.header('Referer').includes('latest');

    if(req.session.user){
      var indexOfUser = users.indexOf(users.find((user) => req.session.user.name === user.name));
      var newIndex = ((indexOfUser + 1) % (users.length));
      
      req.session.user = users[newIndex];
    } else {
      req.session.user = users[1];
    }

    if(fromIndexPage){
      res.redirect('/');
    } else {
      res.redirect('/latest/job');
    }
  });
}