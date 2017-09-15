class Appt {
  constructor(id, day, month, year, hrs, mins, status) {
    this.id = id;
    this.apptDateDay = day;
    this.apptDateMonth = month;
    this.apptDateYear = year;
    this.apptDateForDisplay = this.getApptDateForDisplay(this.apptDateDay, this.apptDateMonth, this.apptDateYear);
    this.apptTimeHrs = hrs;
    this.apptTimeMins = mins;
    this.apptStatus = status;
  }

  getApptDateForDisplay(apptDateDay, apptDateMonth, apptDateYear) {
    let month = parseInt(apptDateMonth);
    let displayMonth = this.getApptMonthForDisplay(month - 1);
    let displayDate = apptDateDay + ' ' + displayMonth + ' ' + apptDateYear;
    return displayDate;
  }

  getApptMonthForDisplay(monthIn) {
    var monthOut = new Array()
    monthOut[0] = 'January';
    monthOut[1] = 'February';
    monthOut[2] = 'March';
    monthOut[3] = 'April';
    monthOut[4] = 'May';
    monthOut[5] = 'June';
    monthOut[6] = 'July';
    monthOut[7] = 'August';
    monthOut[8] = 'September';
    monthOut[9] = 'October';
    monthOut[10] = 'November';
    monthOut[11] = 'December';

    return monthOut[monthIn];

  }
}

module.exports = Appt;
