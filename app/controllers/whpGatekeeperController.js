/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District Yearly Profile Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
function districtProfilePage(req, res) {

  const profileYearList = ["Select", "2017/2018", "2018/2019", "2019/2020"];

  req.session.profileData = req.session.profileData || {};

  var profileData = {
    profileYearList : profileYearList,
    profileYear : req.session.profileData.profileYear ? req.session.profileData.profileYear : "2017/2018",
    whpProfile : req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile : req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    totalProvPlaces : req.session.profileData.totalProvPlaces ? req.session.profileData.totalProvPlaces : 1400,
    controlGpPlaces : req.session.profileData.controlGpPlaces ? req.session.profileData.controlGpPlaces : 140,
    totalPlaces : req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1540
  };

  if (req.session.user.role !== 'gatekeeper') {
    res.redirect('/latest/selection_tool');
  } else {
    res.locals.user = req.session.user;
    res.render('latest/whp-annual-profile', profileData);
  }
}

function districtProfileAction(req, res) {

  var totalProvPlaces = parseInt(req.body.whpProfile) + parseInt(req.body.pscProfile);
  var controlGpPlaces = Math.round(totalProvPlaces / 10);
  var totalPlaces = Math.round(totalProvPlaces + controlGpPlaces);
  var inputProfileData = {
    profileYear : req.body.profileYear,
    whpProfile : req.body.whpProfile,
    pscProfile : req.body.pscProfile,
    addPlaces : req.body.addPlaces,
    totalProvPlaces : totalProvPlaces,
    controlGpPlaces : controlGpPlaces,
    totalPlaces : totalPlaces
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

  var whpFlatProfile = 0;
  var pscFlatProfile = 0;
  var fullYearProfileData = [];
  var weeklyProfileDataToRender = {};

  if (isFalsey(req.session.profileData) || Object.keys(req.session.profileData).length === 0) {
    whpFlatProfile = Math.round(1300 / 52);
    pscFlatProfile = Math.round(100 / 52);
  } else {
    whpFlatProfile = Math.round(req.session.profileData.whpProfile / 52);
    pscFlatProfile = Math.round(req.session.profileData.pscProfile / 52);

  };

  // Check if data already saved in fullYearProfileData. If so, use session.weeklyProfileData. If not, initialise session.weeklyProfileData.
  if (isFalsey(req.session.weeklyProfileData) || Object.keys(req.session.weeklyProfileData).length === 0 ) {
    fullYearProfileData = setUpInitialFullYearProfile(req, whpFlatProfile, pscFlatProfile);
  } else {
    fullYearProfileData = setUpFullYearProfileFromSessionData(req);
  };

  var weeklyProfileDataToRender = {
    totalPlaces : req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1540,
    district : req.session.profileData.district ? req.session.profileData.district : "Mercia",
    profileYear : req.session.profileData.profileYear ? req.session.profileData.profileYear : "2017/2018",
    whpProfile : req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile : req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    fullYearProfileData : fullYearProfileData
  };

  res.render('latest/whp-weekly-profile', weeklyProfileDataToRender);
}

function districtWeeklyProfileAction (req, res) {

  let fullYearProfileData = getFullYearProfileDataFromRequestBody(req);

  req.session.weeklyProfileData = fullYearProfileData;

  res.redirect('/latest/gatekeeper/weeklyProfile');

}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        View Allocation Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function viewAllocationsPage (req, res) {

  res.render('latest/whp-district-allocations');

}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Utilities
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function setUpInitialFullYearProfile(req, whpFlatProfile, pscFlatProfile) {
  let i;
  let fullYearProfileData = [];
  var weekDate;
  if (req.session.profileData.profileYear === "2017/2018") {
    weekDate = new Date("2017-04-06");
  } else if (req.session.profileData.profileYear === "2018/2019") {
    weekDate = new Date("2018-04-06");
  } else {
    weekDate = new Date("2019-04-06");
  }

  var stringDate;
  var newDate;

  for (i = 0; i <= 51; i++) {
    let weekNum = i + 1;
    console.log("Weekdate is : ", weekDate);
    if (weekNum > 1) {
      newDate = weekDate.getDate() + 7;
      weekDate.setDate(newDate);
    }
    stringDate = weekDate.toDateString();
    let weekProfileData = {
      weekNum : weekNum,
      weekDate : stringDate,
      weekwhpProfile : whpFlatProfile,
      weekpscProfile : pscFlatProfile,
      weekwhpExtrasProfile : 0,
      weekpscExtrasProfile : 0
    };
    fullYearProfileData.push(weekProfileData);
  }

  return fullYearProfileData;
}

function setUpFullYearProfileFromSessionData(req) {
  let j;
  let fullYearProfileData = [];
  for (j = 0; j <= 51; j++) {
    let weekProfileData = {
      weekNum : req.session.weeklyProfileData[j].weekNum,
      weekDate : req.session.weeklyProfileData[j].weekDate,
      weekwhpProfile : req.session.weeklyProfileData[j].weekwhpProfile,
      weekpscProfile : req.session.weeklyProfileData[j].weekpscProfile,
      weekwhpExtrasProfile : req.session.weeklyProfileData[j].weekwhpExtrasProfile,
      weekpscExtrasProfile : req.session.weeklyProfileData[j].weekpscExtrasProfile
    };
    fullYearProfileData.push(weekProfileData);
  }
  return fullYearProfileData;
}

function getFullYearProfileDataFromRequestBody(req) {
  let k;
  let fullYearProfileData = [];
  for (k = 0; k <= 51; k++) {
    let weekNum = k + 1;
    let weekProfileData = {
      weekNum : weekNum,
      weekwhpProfile : req.body['week' + weekNum + 'whpProfile'],
      weekpscProfile : req.body['week' + weekNum + 'pscProfile'],
      weekwhpExtrasProfile : req.body['week' + weekNum + 'whpExtrasProfile'],
      weekpscExtrasProfile : req.body['week' + weekNum + 'pscExtrasProfile']
    }
    fullYearProfileData.push(weekProfileData);
  }
  return fullYearProfileData;
}

function calcPercentAndFloor (num, perNum) {
  return Math.floor(num * perNum / 100);
}

function calcPercentAndRound (num, perNum) {
  return Math.round(num * perNum / 100);
}

function isFalsey (testValue) {
  return (testValue === undefined || testValue == null || testValue.length <= 0) ? true : false;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Module Exports
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

module.exports.districtProfilePage = districtProfilePage;
module.exports.districtProfileAction = districtProfileAction;
module.exports.districtWeeklyProfilePage= districtWeeklyProfilePage;
module.exports.districtWeeklyProfileAction= districtWeeklyProfileAction;
module.exports.viewAllocationsPage = viewAllocationsPage;
