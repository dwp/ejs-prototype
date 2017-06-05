/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                       District Places Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function districtPlacesPage (req, res) {
  var sessionPlacesData = req.session.placesData || {}

  var placesData = {
    totalWHP: sessionPlacesData.totalWHP ? sessionPlacesData.totalWHP : 0,
    totalPSC: sessionPlacesData.totalPSC ? sessionPlacesData.totalPSC : 0
  }

  if (req.session.user.role !== 'gatekeeper') {
    res.redirect('/latest/selection_tool');
  } else {
    res.locals.user = req.session.user;
    res.render('latest/whp-places', placesData)
  }
}

function districtPlacesAction (req, res) {
  var placesData = {
    totalWHP: parseInt(req.body.totalWHP),
    totalPSC: parseInt(req.body.totalPSC),
    previousCalcFlag: 0
  }

  req.session.placesData = placesData;
  res.redirect('/latest/gatekeeper/profilePlaces')
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District ProfilePlaces Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function districtProfilePlacesPage (req, res) {
  var sessionPlacesData = req.session.placesData || {}

  let totalWHP;
  let totalPSC;
  let totalRCT;
  let total;
  let totalLTU;
  let totalVol;
  let ltuRCT;
  let volRCT;
  let ltuPSC;
  let volPSC;
  let ltuWHP;
  let volWHP;
  let previousCalcFlag;
  let placesData = {};

  if (sessionPlacesData.previousCalcFlag !== 1) {
    totalWHP = sessionPlacesData.totalWHP || 20;
    totalPSC = sessionPlacesData.totalPSC || 5;
    totalRCT = Math.ceil((totalWHP + totalPSC) / 10) || 3;
    total = (totalPSC + totalRCT + totalWHP) || 28;
    totalLTU = Math.floor((15 / 100) * total) || 4;
    totalVol = (totalWHP + totalPSC + totalRCT - totalLTU) || 24;
    ltuRCT = Math.ceil((10 / 100) * totalLTU) || 1;
    volRCT = totalRCT - ltuRCT || 2;
    ltuPSC = Math.floor((totalLTU - ltuRCT) * totalPSC / (totalPSC + totalWHP)) || 0;
    volPSC = totalPSC - ltuPSC || 5;
    ltuWHP = totalLTU - ltuRCT - ltuPSC || 3;
    volWHP = totalWHP - ltuWHP || 17;
  } else {
    totalWHP = sessionPlacesData.totalWHP;
    totalPSC = sessionPlacesData.totalPSC;
    totalRCT = sessionPlacesData.totalRCT;
    total = sessionPlacesData.total;
    totalLTU = sessionPlacesData.totalLTU;
    totalVol = sessionPlacesData.totalVol;
    ltuRCT = sessionPlacesData.ltuRCT;
    volRCT = sessionPlacesData.volRCT;
    ltuPSC = sessionPlacesData.ltuPSC;
    volPSC = sessionPlacesData.volPSC;
    ltuWHP = sessionPlacesData.ltuWHP;
    volWHP = sessionPlacesData.volWHP;
  }

  placesData = {
    totalWHP: totalWHP,
    totalPSC: totalPSC,
    totalRCT: totalRCT,
    totalLTU: totalLTU,
    totalVol: totalVol,
    total: total,
    ltuWHP: ltuWHP,
    ltuPSC: ltuPSC,
    ltuRCT: ltuRCT,
    volWHP: volWHP,
    volPSC: volPSC,
    volRCT: volRCT
  };

  res.render('latest/whp-profile-places', placesData);
}

function districtProfilePlacesAction (req, res) {

  let totalWHP;
  let totalPSC;
  let totalRCT;
  let total;
  let totalLTU;
  let totalVol;
  let ltuRCT;
  let volRCT;
  let ltuPSC;
  let volPSC;
  let ltuWHP;
  let volWHP;
  let placesData;

  ltuWHP = parseInt(req.body.ltuWHP);
  ltuPSC = parseInt(req.body.ltuPSC);
  volPSC = parseInt(req.body.volPSC);
  volWHP = parseInt(req.body.volWHP);
  ltuRCT = parseInt(req.body.ltuRCT);
  volRCT = parseInt(req.body.volRCT);
  totalRCT = ltuRCT + volRCT;
  totalWHP = ltuWHP + volWHP;
  totalPSC = ltuPSC + volPSC;
  totalLTU = ltuWHP + ltuPSC + ltuRCT;
  totalVol = volWHP + volPSC + volRCT;
  total = totalWHP + totalPSC + totalRCT;

  placesData = {
    totalWHP: totalWHP,
    totalPSC: totalPSC,
    totalRCT: totalRCT,
    totalLTU: totalLTU,
    totalVol: totalVol,
    total: total,
    ltuWHP: ltuWHP,
    ltuPSC: ltuPSC,
    ltuRCT: ltuRCT,
    volWHP: volWHP,
    volPSC: volPSC,
    volRCT: volRCT,
    previousCalcFlag: 1
  };

  req.session.placesData = placesData;
  res.redirect('/latest/gatekeeper/selection');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        District Selection Report Controllers
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

function districtSelectionPage (req, res) {
  const placesData = req.session.placesData || {};
  const referralsSelected = (placesData.totalVol - 3) || 27;

  const selectionReport = {
    newReferrals: 70,
    placesToFill: placesData.totalVol ? placesData.totalVol : 30,
    referralsSelected: referralsSelected
  };

  res.render('latest/whp-selection-report', selectionReport);
}

function districtSelectionAction (req, res) {

  const confirmPlaces = {
    newReferrals: req.body.newReferrals,
    referralsSelected: req.body.referralsSelected,
    placesToFill: req.body.placesToFill
  };

  res.render('latest/whp-confirm-selection', confirmPlaces);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/*                                        OLD - District Yearly Profile Controllers
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
function districtProfilePage (req, res) {
  const profileYearList = ['Select', '2017/2018', '2018/2019', '2019/2020'];

  req.session.profileData = req.session.profileData || {};

  var profileData = {
    profileYearList: profileYearList,
    profileYear: req.session.profileData.profileYear ? req.session.profileData.profileYear : '2017/2018',
    whpProfile: req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile: req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    totalProvPlaces: req.session.profileData.totalProvPlaces ? req.session.profileData.totalProvPlaces : 1400,
    controlGpPlaces: req.session.profileData.controlGpPlaces ? req.session.profileData.controlGpPlaces : 140,
    totalPlaces: req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1540
  };
  res.render('latest/whp-annual-profile', profileData);
}

function districtProfileAction (req, res) {
  var totalProvPlaces = parseInt(req.body.whpProfile) + parseInt(req.body.pscProfile);
  var controlGpPlaces = Math.round(totalProvPlaces / 10);
  var totalPlaces = Math.round(totalProvPlaces + controlGpPlaces);
  var inputProfileData = {
    profileYear: req.body.profileYear,
    whpProfile: req.body.whpProfile,
    pscProfile: req.body.pscProfile,
    addPlaces: req.body.addPlaces,
    totalProvPlaces: totalProvPlaces,
    controlGpPlaces: controlGpPlaces,
    totalPlaces: totalPlaces
  };

  req.session.profileData = inputProfileData;
  res.redirect('/latest/gatekeeper/weeklyProfile');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        OLD - District Weekly Profile Controllers
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
  }

  // Check if data already saved in fullYearProfileData. If so, use session.weeklyProfileData. If not, initialise session.weeklyProfileData.
  if (isFalsey(req.session.weeklyProfileData) || Object.keys(req.session.weeklyProfileData).length === 0) {
    fullYearProfileData = setUpInitialFullYearProfile(req, whpFlatProfile, pscFlatProfile);
  } else {
    fullYearProfileData = setUpFullYearProfileFromSessionData(req);
  }

  var weeklyProfileDataToRender = {
    totalPlaces: req.session.profileData.totalPlaces ? req.session.profileData.totalPlaces : 1540,
    district: req.session.profileData.district ? req.session.profileData.district : 'Mercia',
    profileYear: req.session.profileData.profileYear ? req.session.profileData.profileYear : '2017/2018',
    whpProfile: req.session.profileData.whpProfile ? req.session.profileData.whpProfile : 1300,
    pscProfile: req.session.profileData.pscProfile ? req.session.profileData.pscProfile : 100,
    fullYearProfileData: fullYearProfileData
  };

  req.session.weeklyProfileData = fullYearProfileData;

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

function setUpInitialFullYearProfile (req, whpFlatProfile, pscFlatProfile) {
  let i;
  let fullYearProfileData = [];
  var weekDate;
  var stringDate;
  var newDate;
  var weekNum;

  if (req.session.profileData.profileYear === '2019/2020') {
    weekDate = new Date('2019-04-06');
  } else if (req.session.profileData.profileYear === '2018/2019') {
    weekDate = new Date('2018-04-06');
  } else {
    weekDate = new Date('2017-04-06');
  }

  for (i = 0; i <= 51; i++) {
    weekNum = i + 1;

    if (weekNum > 1) {
      newDate = weekDate.getDate() + 7;
      weekDate.setDate(newDate);
    }

    stringDate = formatDateForDisplay(weekDate);

    let weekProfileData = {
      weekNum: weekNum,
      weekDate: stringDate,
      weekwhpProfile: whpFlatProfile,
      weekpscProfile: pscFlatProfile,
      weekwhpExtrasProfile: 0,
      weekpscExtrasProfile: 0
    };
    fullYearProfileData.push(weekProfileData);
  }

  return fullYearProfileData;
}

function setUpFullYearProfileFromSessionData (req) {
  let j;
  let fullYearProfileData = [];
  for (j = 0; j <= 51; j++) {
    let weekProfileData = {
      weekNum: req.session.weeklyProfileData[j].weekNum,
      weekDate: req.session.weeklyProfileData[j].weekDate,
      weekwhpProfile: req.session.weeklyProfileData[j].weekwhpProfile,
      weekpscProfile: req.session.weeklyProfileData[j].weekpscProfile,
      weekwhpExtrasProfile: req.session.weeklyProfileData[j].weekwhpExtrasProfile,
      weekpscExtrasProfile: req.session.weeklyProfileData[j].weekpscExtrasProfile
    };
    fullYearProfileData.push(weekProfileData);
  }
  return fullYearProfileData;
}

function getFullYearProfileDataFromRequestBody (req) {
  req.session.weeklyProfileData = req.session.weeklyProfileData || {};

  let k;
  let fullYearProfileData = [];
  for (k = 0; k <= 51; k++) {
    let weekNum = k + 1;
    let weekProfileData = {
      weekNum: weekNum,
      weekDate: req.session.weeklyProfileData[k].weekDate,
      weekwhpProfile: req.body['week' + weekNum + 'whpProfile'],
      weekpscProfile: req.body['week' + weekNum + 'pscProfile'],
      weekwhpExtrasProfile: req.body['week' + weekNum + 'whpExtrasProfile'],
      weekpscExtrasProfile: req.body['week' + weekNum + 'pscExtrasProfile']
    };
    fullYearProfileData.push(weekProfileData);
  }
  return fullYearProfileData;
}

function isFalsey (testValue) {
  return (testValue === undefined || testValue == null || testValue.length <= 0) ? true : false;
}

function formatDateForDisplay (unformattedDate) {
  var formattedDate;
  var dateDay;
  var dateMonth;
  var dateYear;

  var month = new Array();
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';

  dateDay = unformattedDate.getDate();
  dateMonth = month[unformattedDate.getMonth()];
  dateYear = unformattedDate.getFullYear();

  formattedDate = dateDay + ' ' + dateMonth + ' ' + dateYear;
  return formattedDate;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 /*                                        Module Exports
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

module.exports.districtPlacesPage = districtPlacesPage;
module.exports.districtPlacesAction = districtPlacesAction;
module.exports.districtProfilePlacesPage = districtProfilePlacesPage;
module.exports.districtProfilePlacesAction = districtProfilePlacesAction;
module.exports.viewAllocationsPage = viewAllocationsPage;
module.exports.districtSelectionPage = districtSelectionPage;
module.exports.districtSelectionAction = districtSelectionAction;

// Old profile and weekly profile modules

module.exports.districtProfilePage = districtProfilePage;
module.exports.districtProfileAction = districtProfileAction;
module.exports.districtWeeklyProfilePage = districtWeeklyProfilePage;
module.exports.districtWeeklyProfileAction = districtWeeklyProfileAction;

