module.exports = function(router){
  router.get('/', function (req, res) {

    req.session.regenerate(err => {});

    res.render('index');
  });

  router.get('/index', function (req, res, next) {

    req.session.regenerate(err => {});

    next();
  });
}