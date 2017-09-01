/**
 * Created by janegleadall on 30/08/2017.
 */
class Appointment {
  constructor(id, type, date, hrs, mins, description, status, immediateMarker, notes) {
    this.id = id;
    this.apptType = type;
    this.apptDate = date;
    this.apptDateDay;
    this.apptDateMonth;
    this.apptDateYear;
    this.apptDateForDisplay = this.getApptDateForDisplay();
    this.apptTimeHrs = hrs;
    this.apptTimeMins = mins;
    this.apptDescription= description;
    this.apptStatus = status;
    this.apptImmediateMarker = immediateMarker;
    this.apptNotes = notes;
  }

  getApptDateForDisplay() {
    let unformattedApptDate = new Date(this.apptDate);
    let displayDate = this.formatDateForDisplay(unformattedApptDate);
    return displayDate;
  }

  getApptMonth(monthIn) {
    var monthOut = new Array()
    monthOut[0] = '01';
    monthOut[1] = '02';
    monthOut[2] = '03';
    monthOut[3] = '04';
    monthOut[4] = '05';
    monthOut[5] = '06';
    monthOut[6] = '07';
    monthOut[7] = '08';
    monthOut[8] = '09';
    monthOut[9] = '10';
    monthOut[10] = '11';
    monthOut[11] = '12';
    
    return monthOut[monthIn];

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

  formatDateForDisplay (unformattedApptDate) {

    this.apptDateDay = unformattedApptDate.getDate();
    this.apptDateMonth = this.getApptMonth(unformattedApptDate.getMonth());
    this.apptDateYear = unformattedApptDate.getFullYear();

    let formattedDate = this.apptDateDay + ' ' + this.getApptMonthForDisplay(unformattedApptDate.getMonth()) + ' ' + this.apptDateYear;
    return formattedDate;
  }
}

module.exports = Appointment;
