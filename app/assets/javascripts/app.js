/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }
//
// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }
//$(function(){
$(document).on('turbolinks:load', function(){

  console.log('page loaded');
  $.ajax({
    url: '/business_processes',
    method: 'GET',
    dataType: 'json',
    data: {}

  }).done(function(responseData){
    console.log(responseData);
    var menuPlaceHolder = $('#dynamic-items');
    for(var i = 0; i < responseData.length; i++) {
      listItem = $('<li>').attr('role', 'presentation');

        href = ($('<a>'))
        .attr('href', '/work_items/new?business=' + responseData[i].id)
        .attr('role', 'menuitem')
        .attr('tabindex', '-1')
        .html(responseData[i].title);

        listItem.append(href);
        listItem.insertAfter(menuPlaceHolder);
        // $('.dropdown-toggle').dropdown();
    }
  });
});
