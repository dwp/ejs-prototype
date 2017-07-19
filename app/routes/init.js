module.exports = function(router, users){
  router.use(function(req, res, next){

    req.session.user = req.session.user || users[0];
    res.locals.data.user = req.session.user;
    
    next();
  });
}