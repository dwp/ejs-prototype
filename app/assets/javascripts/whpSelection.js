(function(){
  var $selectCheckboxes = $('table input'),
    $selectionCount = $('#selectionCount');

  $selectCheckboxes.on('click', updateSelectionCount);

  function updateSelectionCount(){
    var selectionCount = $selectCheckboxes.filter(':checked').length;
    $selectionCount.text(selectionCount);
  }

  updateSelectionCount();
})();