(function(){
  var $selectCheckboxes = $('table input'),
    $selectionCount = $('#selectionCount'),
    $eagSelectionCount = $('#eagSelectionCount'),
    $healthConditionSelectionCount = $('#healthConditionSelectionCount'),
    $referralsSelected = $('#referralsSelected');

  $selectCheckboxes.on('click', updateSelectionCounts);

  function updateSelectionCounts(){
    var $allChecked = $selectCheckboxes.filter(':checked'),
      totalSelectionCount = $allChecked.length,
      healthConditionSelectionCount = $allChecked.filter('[data-selection-type="healthCondition"]').length
      eagSelectionCount = $allChecked.filter('[data-selection-type="eag"]').length;
    $selectionCount.text(totalSelectionCount);
    $referralsSelected.val(totalSelectionCount);
    $healthConditionSelectionCount.text(healthConditionSelectionCount);
    $eagSelectionCount.text(eagSelectionCount);
  }

  updateSelectionCounts();
})();