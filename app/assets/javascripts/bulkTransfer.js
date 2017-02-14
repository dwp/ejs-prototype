$(function(){

  var $selectAllInput = $('#select-all')
    $claimantInputs = $('input[name^="claimants_"]'),
    $continueButton = $('#continue-button');

  $selectAllInput.on('click', function(){
    if($selectAllInput.is(':checked')){
      $claimantInputs.prop('checked', true);
    } else {
      $claimantInputs.prop('checked', false);
    }

    toggleContinueButton();
  });

  $claimantInputs.on('click', toggleContinueButton);

  function toggleContinueButton(){
    if($claimantInputs.filter(':checked').length){
      $continueButton.removeClass('disabled').prop('disabled', false);
    } else {
      $continueButton.addClass('disabled').prop('disabled', true);
    }
  }
})