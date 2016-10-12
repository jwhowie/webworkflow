
$(document).on('turbolinks:load', function(){

 $('.status-row').on('click', function(e){
   e.preventDefault();
   $('#status-history').val($(this).attr('data-work-history'));
 });

});
