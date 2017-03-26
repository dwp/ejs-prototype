module.exports = function(router, users){
  router.use(function(req, res, next){
    Object.assign(res.locals,{
      postData: (req.body ? req.body : false)
    });

    Object.assign(res.locals,{
      getData: (req.query ? req.query : false)
    });

    req.session.user = req.session.user || users[0];
    
    Object.assign(res.locals,{
      sessionData: (req.session ? req.session : false)
    });

    next();
  });
}