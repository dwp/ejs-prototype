(function(){
  var $extraOption = $('#extraCaseloadSegmentationOption'),
    $dayOneEvidenceFilter = $('#day-one-evidence-filter'),
    $childAgeFilter = $('#child-age-filter'),
    $workcoachLabels = $('#organisations-filter').find('label'),
    $sortableHeaders = $('th.sortable span'),
    $jobcentreSelect = $('#jobcentreSelect');

  toggleCaseloadSegmentationOptions();
  toggleDayOneEvidenceFilter();
  toggleChildAgeFilter();

  $('#search-caseload').on('click', function(e){
    e.preventDefault();

    var provisionSelected = $('#provision-type').find('option:selected').val(),
      benefitSelected = $('#benefit').find('option:selected').data('type'),
      childAgeSelected = $('#child-age-select').find('option:selected').val(),
      action = 'performance_' + (benefitSelected.toLowerCase() || 'jsa' ) + '?childAge=' + childAgeSelected;

    if(provisionSelected){
      window.location = action + '&provisionSelected';
    } else {
      window.location = action;
    }
  });

  function toggleCaseloadSegmentationOptions(){
    var type = $('#benefit').find('option:selected').data('type');

    if(type === 'IS' || type === 'ESA'){
      $extraOption.show()
    } else {
      $extraOption.hide()
    }
  }

  function toggleDayOneEvidenceFilter(){
    var type = $('#benefit').find('option:selected').data('type');

    if(type === 'JSA'){
      $dayOneEvidenceFilter.show();
    } else{
      $dayOneEvidenceFilter.hide();
    }
  }

  function toggleChildAgeFilter(){
    var type = $('#benefit').find('option:selected').data('subtype');

    if(type === 'lone-parent'){
      $childAgeFilter.show();
    } else{
      $childAgeFilter.hide();
    }
  }

  function fixWorkcoachLabels(jobcentre){
    $workcoachLabels.each(function(){
      $(this).html($(this).html().replace(/\(([A-Z|a-z ])*\)/, ''));
    })
    
    if(jobcentre){
      $workcoachLabels.filter(':gt(0):lt(3)').each(function(){
        $(this).html($(this).html() + ' (not in ' + jobcentre + ')')
      });
    }
  }

  $('#benefit').on('change', function(){
    toggleCaseloadSegmentationOptions();
    toggleDayOneEvidenceFilter();
    toggleChildAgeFilter();
  });

  $jobcentreSelect.on('change', function(){
    fixWorkcoachLabels(this.value);

  })

  $sortableHeaders.on('click', function(){
    var $this = $(this),
      hasAscClass = $this.hasClass('sort-asc'),
      hasDescClass = $this.hasClass('sort-desc');

    if(hasAscClass){
      $this.removeClass('sort-asc').addClass('sort-desc');
    } else if (hasDescClass){
      $this.removeClass('sort-desc').addClass('sort-asc');
    } else {
      $sortableHeaders.removeClass();
      $this.addClass('sort-asc');
    }
  });
})()