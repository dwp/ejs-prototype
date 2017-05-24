/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District Yearly Profile Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
function districtProfilePage(req, res) {

  var districtList = ["Select", "Bradford", "Derby", "Mercia", "Manchester", "Portsmouth", "Southampton", "Wolverhampton", "Worcester"];

  req.session.profileData = req.session.profileData || {};

  var profileData = {
    districtList : districtList,
    district : req.session.profileData.district ? req.session.profileData.district : "Mercia",
    profileYear : req.session.profileData.profileYear ? req.session.profileData.profileYear : "2017",
    whpProfile : req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile : req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    addPlaces : req.session.profileData.addPlaces ? req.session.profileData.addPlaces : 50,
    totalProvPlaces : req.session.profileData.totalProvPlaces ? req.session.profileData.totalProvPlaces : 1450,
    controlGpPlaces : req.session.profileData.controlGpPlaces ? req.session.profileData.controlGpPlaces : 145,
    totalPlaces : req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1595,
    startDay : req.session.profileData.startDay ? req.session.profileData.startDay : 01,
    startMonth : req.session.profileData.startMonth? req.session.profileData.startMonth : 08,
    startYear : req.session.profileData.startYear ? req.session.profileData.startYear : 2017,
    endDay : req.session.profileData.endDay ? req.session.profileData.endDay : 31,
    endMonth : req.session.profileData.endMonth ? req.session.profileData.endMonth : 07,
    endYear : req.session.profileData.endYear ? req.session.profileData.endYear: 2018
  };

  console.log("profileData looks like this : ", profileData);

  if (req.session.user.role !== 'gatekeeper') {
    res.redirect('/latest/selection_tool');
  } else {
    res.locals.user = req.session.user;
    res.render('latest/whp-annual-profile', profileData);
  }
}

function districtProfileAction(req, res) {

  var totalProvPlaces = parseInt(req.body.whpProfile) + parseInt(req.body.pscProfile) + parseInt(req.body.addPlaces);
  var controlGpPlaces = Math.round(totalProvPlaces / 10);
  var totalPlaces = Math.round(totalProvPlaces + controlGpPlaces);
  var inputProfileData = {
    district : req.body.district,
    profileYear : req.body.profileYear,
    whpProfile : req.body.whpProfile,
    pscProfile : req.body.pscProfile,
    addPlaces : req.body.addPlaces,
    totalProvPlaces : totalProvPlaces,
    controlGpPlaces : controlGpPlaces,
    totalPlaces : totalPlaces,
    startDay : req.body.whpStartDay,
    startMonth: req.body.whpStartMonth,
    startYear : req.body.whpStartYear,
    endDay : req.body.whpEndDay,
    endMonth : req.body.whpEndMonth,
    endYear : req.body.whpEndYear
  };

  req.session.profileData = inputProfileData;
  res.redirect('/latest/gatekeeper/profile');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District Weekly Profile Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
function districtWeeklyProfilePage (req, res) {

  req.session.profileData = req.session.profileData || {};
  req.session.weeklyProfileData = req.session.weeklyProfileData || {};

  var flatProfile = 0;
  var week1DisabledProfile = 0,
      week2DisabledProfile = 0,
      week3DisabledProfile = 0,
      week4DisabledProfile = 0,
      week5DisabledProfile = 0,
      week52DisabledProfile = 0;
      week1EarlyEntryProfile = 0;
      week2EarlyEntryProfile = 0;
      week3EarlyEntryProfile = 0;
      week4EarlyEntryProfile = 0;
      week5EarlyEntryProfile = 0;
      week52EarlyEntryProfile = 0;
      week1LTUProfile = 0;
      week2LTUProfile = 0;
      week3LTUProfile = 0;
      week4LTUProfile = 0;
      week5LTUProfile = 0;
      week52LTUProfile = 0;

  if (!req.session.profileData.totalPlaces && !req.session.weeklyProfileData.week1Places) {
    flatProfile = 30;
  } else {
    flatProfile = Math.round(req.session.profileData.totalPlaces / 52);
  };

  // Calculate % disabled of weekly places
  if (!req.session.weeklyProfileData.week1Places) {
    week1DisabledProfile = calcPercentAndRound(flatProfile, 75);
    week2DisabledProfile = calcPercentAndRound(flatProfile, 75);
    week3DisabledProfile = calcPercentAndRound(flatProfile, 75);
    week4DisabledProfile = calcPercentAndRound(flatProfile, 75);
    week5DisabledProfile = calcPercentAndRound(flatProfile, 75);
    week52DisabledProfile = calcPercentAndRound(flatProfile, 75);
    week1EarlyEntryProfile = calcPercentAndRound(flatProfile, 10);
    week2EarlyEntryProfile = calcPercentAndRound(flatProfile, 10);
    week3EarlyEntryProfile = calcPercentAndRound(flatProfile, 10);
    week4EarlyEntryProfile = calcPercentAndRound(flatProfile, 10);
    week5EarlyEntryProfile = calcPercentAndRound(flatProfile, 10);
    week52EarlyEntryProfile = calcPercentAndRound(flatProfile, 10);
    week1LTUProfile = calcPercentAndRound(flatProfile, 15);
    week2LTUProfile = calcPercentAndRound(flatProfile, 15);
    week3LTUProfile = calcPercentAndRound(flatProfile, 15);
    week4LTUProfile = calcPercentAndRound(flatProfile, 15);
    week5LTUProfile = calcPercentAndRound(flatProfile, 15);
    week52LTUProfile = calcPercentAndRound(flatProfile, 15);
  } else {
    week1DisabledProfile = calcPercentAndRound(req.session.weeklyProfileData.week1Places, 75);
    week2DisabledProfile = calcPercentAndRound(req.session.weeklyProfileData.week2Places, 75);
    week3DisabledProfile = calcPercentAndRound(req.session.weeklyProfileData.week3Places, 75);
    week4DisabledProfile = calcPercentAndRound(req.session.weeklyProfileData.week4Places, 75);
    week5DisabledProfile = calcPercentAndRound(req.session.weeklyProfileData.week5Places, 75);
    week52DisabledProfile = calcPercentAndRound(req.session.weeklyProfileData.week52Places, 75);
    week1EarlyEntryProfile = calcPercentAndRound(req.session.weeklyProfileData.week1Places, 10);
    week2EarlyEntryProfile = calcPercentAndRound(req.session.weeklyProfileData.week2Places, 10);
    week3EarlyEntryProfile = calcPercentAndRound(req.session.weeklyProfileData.week3Places, 10);
    week4EarlyEntryProfile = calcPercentAndRound(req.session.weeklyProfileData.week4Places, 10);
    week5EarlyEntryProfile = calcPercentAndRound(req.session.weeklyProfileData.week5Places, 10);
    week52EarlyEntryProfile = calcPercentAndRound(req.session.weeklyProfileData.week52Places, 10);
    week1LTUProfile = calcPercentAndRound(req.session.weeklyProfileData.week1Places, 15);
    week2LTUProfile = calcPercentAndRound(req.session.weeklyProfileData.week2Places, 15);
    week3LTUProfile = calcPercentAndRound(req.session.weeklyProfileData.week3Places, 15);
    week4LTUProfile = calcPercentAndRound(req.session.weeklyProfileData.week4Places, 15);
    week5LTUProfile = calcPercentAndRound(req.session.weeklyProfileData.week5Places, 15);
    week52LTUProfile = calcPercentAndRound(req.session.weeklyProfileData.week52Places, 15);
  };

  var weeklyProfileData = {
    totalPlaces : req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1595,
    district : req.session.profileData.district ? req.session.profileData.district : "Mercia",
    profileYear : req.session.profileData.profileYear ? req.session.profileData.profileYear : 2017,
    week1Places : req.session.weeklyProfileData.week1Places ? req.session.weeklyProfileData.week1Places : flatProfile,
    week2Places : req.session.weeklyProfileData.week2Places ? req.session.weeklyProfileData.week2Places: flatProfile,
    week3Places : req.session.weeklyProfileData.week3Places ? req.session.weeklyProfileData.week3Places : flatProfile,
    week4Places : req.session.weeklyProfileData.week4Places ? req.session.weeklyProfileData.week4Places : flatProfile,
    week5Places : req.session.weeklyProfileData.week5Places ? req.session.weeklyProfileData.week5Places : flatProfile,
    week52Places : req.session.weeklyProfileData.week52Places ? req.session.weeklyProfileData.week52Places : flatProfile,
    week1DisabledProfile : week1DisabledProfile,
    week2DisabledProfile : week2DisabledProfile,
    week3DisabledProfile : week3DisabledProfile,
    week4DisabledProfile : week4DisabledProfile,
    week5DisabledProfile : week5DisabledProfile,
    week52DisabledProfile : week52DisabledProfile,
    week1EarlyEntryProfile : week1EarlyEntryProfile,
    week2EarlyEntryProfile : week2EarlyEntryProfile,
    week3EarlyEntryProfile : week3EarlyEntryProfile,
    week4EarlyEntryProfile : week4EarlyEntryProfile,
    week5EarlyEntryProfile : week5EarlyEntryProfile,
    week52EarlyEntryProfile : week52EarlyEntryProfile,
    week1LTUProfile : week1LTUProfile,
    week2LTUProfile : week2LTUProfile,
    week3LTUProfile : week3LTUProfile,
    week4LTUProfile : week4LTUProfile,
    week5LTUProfile : week5LTUProfile,
    week52LTUProfile : week52LTUProfile
  };

  res.render('latest/whp-weekly-profile', weeklyProfileData);
}

function districtWeeklyProfileAction (req, res) {

  var totalProvPlaces = parseInt(req.body.whpProfile) + parseInt(req.body.pscProfile) + parseInt(req.body.addPlaces);
  var controlGpPlaces = Math.round(totalProvPlaces / 10);
  var totalPlaces = Math.round(totalProvPlaces + controlGpPlaces);
  var inputWeeklyProfileData = {
    week1Places : req.body.week1,
    week2Places : req.body.week2,
    week3Places : req.body.week3,
    week4Places : req.body.week4,
    week5Places : req.body.week5,
    week52Places : req.body.week52,
  };

  req.session.weeklyProfileData = inputWeeklyProfileData;
  res.redirect('/latest/gatekeeper/weeklyProfile');
}

function calcPercentAndFloor (num, perNum) {
  return Math.floor(num * perNum / 100);
}

function calcPercentAndRound (num, perNum) {
  return Math.round(num * perNum / 100);
}

module.exports.districtProfilePage = districtProfilePage;
module.exports.districtProfileAction = districtProfileAction;
module.exports.districtWeeklyProfilePage= districtWeeklyProfilePage;
module.exports.districtWeeklyProfileAction= districtWeeklyProfileAction;