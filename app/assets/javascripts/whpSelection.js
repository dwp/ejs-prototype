(function(){
  var $selectCheckboxes = $('table input'),
    $selectionCount = $('#selectionCount');
    $referralsSelected = $('#referralsSelected');

  $selectCheckboxes.on('click', updateSelectionCount);

  function updateSelectionCount(){
    var selectionCount = $selectCheckboxes.filter(':checked').length;
    $selectionCount.text(selectionCount);
    $referralsSelected.val(selectionCount);
  }

  updateSelectionCount();
})();