// functionality to show/hide filters
function toggleFilters () {
  var filters = $('#filters-holder')
  var filterToggle = $('#filterToggle')
  filters.toggle()

  if (filters.is(':visible')) {
    filterToggle.removeClass('filters-hidden')
    filterToggle.addClass('filters-showing')
  } else {
    filterToggle.removeClass('filters-showing')
    filterToggle.addClass('filters-hidden')
  }
}

(function(){
  var $annotationToggle = $("#annotationToggle"),
    $annotations = $('.annotation');

  if($annotations.length){
    $annotationToggle.show();
  }

  $("#annotationToggle").on('click', function(e){
    e.preventDefault();
    $annotations.toggle();
  });
})()