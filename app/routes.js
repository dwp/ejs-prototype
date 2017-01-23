var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  Object.assign(res.locals,{
    postData: (req.body ? req.body : false)
  });

  Object.assign(res.locals,{
    getData: (req.query ? req.query : false)
  });

  req.session.user = req.session.user || { name : 'Martha Vansant', role : 'manager' };
  
  Object.assign(res.locals,{
    sessionData: (req.session ? req.session : false)
  });

  next();
});

require('./routes/init')(router);
require('./routes/index')(router);
require('./routes/provision')(router);
require('./routes/toggle-user-role')(router);
require('./routes/appointments')(router);

module.exports = router;