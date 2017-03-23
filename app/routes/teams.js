module.exports = function(router) {
  router.use(function(req, res, next){
    req.session.teams = req.session.teams || getTestTeams();
    req.session.workcoaches = req.session.workcoaches || getWorkcoaches();

    next();
  });

  router.get('/latest/teams', function (req, res) {
    req.session.teams = req.session.teams || getTestTeams();
    req.session.workcoaches = req.session.workcoaches || getWorkcoaches();

    res.render('latest/teams');
  });

  router.get('/latest/team_create/:id', function (req, res) {
    var team = req.session.teams[req.params.id];

    res.render('latest/team_create', {
      team: team
    });
  });

  router.post('/latest/team_create/:id', function (req, res) {
    var team = req.session.teams ? req.session.teams[req.params.id] : getTestTeams()[req.params.id];

    team.name = req.body['team-name'];
    team.workcoaches = Object.keys(req.body);

    // remove team name from the array
    team.workcoaches.splice( team.workcoaches.indexOf('team-name'), 1)

    res.redirect('/latest/teams');
  });

  router.post('/latest/team_create', function (req, res) {
    var workcoaches =  Object.keys(req.body);

    // remove team name from the array
    workcoaches.splice( workcoaches.indexOf('team-name'), 1)

    req.session.teams.push({ 
      id: req.session.teams.length, 
      name: req.body['team-name'],
      workcoaches: workcoaches
    })

    res.redirect('/latest/teams');
  });

  router.get('/latest/team_delete/:id', function (req, res) {
    req.session.teams.splice( req.params.id, 1)

    res.redirect('/latest/teams?errorMessage=Team deleted');
  });

  function getTestTeams(){
    return [ 
      { id: 0, name : 'Blue team', workcoaches: getWorkcoaches().slice(0,29)},
      { id: 1, name : 'Yellow team', workcoaches: getWorkcoaches().slice(3,6)},
      { id: 2, name : 'Red team', workcoaches: getWorkcoaches().slice(6,9)}
    ];
  }

  function getWorkcoaches(){
    return ['richard.kaine', 'john.smith2', 'amanda.wright', 'darren.moody', 'mark.jones1', 'sam.steel', 'harry.brown2', 'julia.granger', 'paul.brookes1', 'sarah.fielding',
    'richard.kaine', 'john.smith2', 'amanda.wright', 'darren.moody', 'mark.jones1', 'sam.steel', 'harry.brown2', 'julia.granger', 'paul.brookes1', 'sarah.fielding',
    'richard.kaine', 'john.smith2', 'amanda.wright', 'darren.moody', 'mark.jones1', 'sam.steel', 'harry.brown2', 'julia.granger', 'paul.brookes1', 'sarah.fielding'];
  }
}