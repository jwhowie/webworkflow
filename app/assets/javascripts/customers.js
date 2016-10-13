
$(document).on('turbolinks:load', function(){

 $('.status-row').on('click', function(e){
   e.preventDefault();
   $('tr').css('background-color', '');
   $('#status-history').val($(this).attr('data-work-history'));
   $(this).css('background-color', 'aqua');
 });

});
