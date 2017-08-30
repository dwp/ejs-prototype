/**
 * Created by janegleadall on 30/08/2017.
 */
class Appointment {
  constructor(id, type, date, time, status, immediateMarker, notes) {
    this.id = id;
    this.apptType = type;
    this.apptDate = date;
    this.apptTime = time;
    this.apptStatus = status;
    this.apptImmediateMarker = immediateMarker;
    this.apptNotes = notes;
  }
  
  constructor(id, date, time) {
    this.id;
    this.apptType = 'Provision referral';
    this.apptDate = date;
    this.apptTime = time;
    this.apptStatus = 'Booked'
    this.apptImmediateMarker = 0;
    this.apptNotes = '';
  }

  setId(id) {
    this.id = id;
  }
  setApptDate(date) {
    this.date = date;
  }
  setAppointmentType(type) {
    this.apptType = type;
  }
  setApptStatus(status) {
    this.apptStatus = status;
  }
  setImmediateMarker() {
    this.apptImmediateMarker = 1;
  }
  setApptNotes(notes) {
    this.apptNotes = notes;
  }

  getApptDateForDisplay() {
    let unformattedApptDate = new Date(this.date);
    let displayDate = formatDateForDisplay(unformattedApptDate);
    return displayDate;
  }

  getApptDay() {
    return this.date.getDate();
  }

  getApptMonth() {
    var month = new Array()
    month[0] = '01';
    month[1] = '02';
    month[2] = '03';
    month[3] = '04';
    month[4] = '05';
    month[5] = '06';
    month[6] = '07';
    month[7] = '08';
    month[8] = '09';
    month[9] = '10';
    month[10] = '11';
    month[11] = '12';
    
    return month(this.date.getMonth());

  }

  getApptMonthForDisplay() {
    var month = new Array()
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

    return month(this.date.getMonth());

  }

  getApptYear() {
    return this.date.getFullYear();
  }

  formatDateForDisplay () {

    let apptDay = getApptDay();
    let apptMonth = getApptMonthForDisplay();
    let apptYear = getApptYear();

    let formattedDate = apptDay + ' ' + apptMonth + ' ' + apptYear;
    return formattedDate;
  }
}

module.exports = Appointment;
