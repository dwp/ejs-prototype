$(function(){

  function setNameChangeToStatus(){
    var nameChangeFromValue = $('#nameChangeFrom').val();

    if(nameChangeFromValue){
      $('#nameChangeTo').prop('disabled', false);
      $('#nameChangeTo').removeClass('disabled');
    } else {
      $('#nameChangeTo').prop('disabled', true);
      $('#nameChangeTo').addClass('disabled');
    }
  }

  $('#nameChangeFrom').on('change', setNameChangeToStatus);

  setNameChangeToStatus();
})