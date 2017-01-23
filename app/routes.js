var express = require('express');
var router = express.Router();

require('./routes/init')(router);
require('./routes/index')(router);
require('./routes/provision')(router);
require('./routes/toggle-user-role')(router);
require('./routes/appointments')(router);

module.exports = router;