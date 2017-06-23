class Commitment {
  constructor(name, nino, wca) {
    this.clientName = name;
    this.clientNino = nino;
    this.wca = wca;
    this.commitmentDate;
    this.actionData = [];
  }

  setCommitmentDate(commitmentDate) {
    let unformattedCommitmentDate = new Date(commitmentDate);
    this.commitmentDate = this.formatDateForDisplay(unformattedCommitmentDate);
  }

  addActionToActionData(inputActionNum, inputAction, inputHow, inputByWhen, inputVolOrMand) {
    const unformattedByWhen = new Date(inputByWhen);
    const formattedByWhen = this.formatDateForDisplay(unformattedByWhen);
    let volOrMand;
    if (this.wca === 'No') {
      volOrMand = 'Voluntary';
    } else {
      volOrMand = inputVolOrMand;
    }
    let action = {
        actionNum : inputActionNum,
        action : inputAction,
        how : inputHow,
        byWhen : formattedByWhen,
        volOrMand : volOrMand
    };
    this.actionData.push(action);
  }

  formatDateForDisplay (unformattedDate) {

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

    let dateDay = unformattedDate.getDate();
    let dateMonth = month[unformattedDate.getMonth()];
    let dateYear = unformattedDate.getFullYear();

    let formattedDate = dateDay + ' ' + dateMonth + ' ' + dateYear;
    return formattedDate;
  }
}

module.exports = Commitment;
