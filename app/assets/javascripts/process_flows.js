$(document).on('turbolinks:load', function(){


  if (window.location.pathname === "/process_flows") {

  x = window.location.search.split('&');
   window.id = x[0].split('=');
  var  y = decodeURIComponent(window.location.search)
  title = y.split('=');

  var teams = [];
  window.teams = teams;
  //
  // titleArray = title.split('20');
  // for (var i = 0; i < title.length; i++) {
  //   title = titleArray[i] } ' ';
  // }

  $('.process-table').attr('id', id[1]);
  $('#business-process-name').html('<b>Process Name: </b>' + title[2]);

  // var row = $('<tr>');
  // var step = $('<input>').attr('type', 'text').attr('class', 'step-name');
  // var option = $('<select>');
  // var action = $('<button>').attr('id', 0).attr('class', 'process-button').html('+');
  var option
  $.ajax({
    url: '/teams?all=1',
    method: 'GET',
    dataType: 'json',
    data: {}
  }).done(function(responseData){
    console.log(responseData);
    var option = $('<select>');

    for(var i = 0; i < responseData.length; i++)
    {
      window.teams.push([responseData[i].id, responseData[i].title]);
      option.append($('<option>').val(window.teams[i][0]).html(window.teams[i][1]));
    }
    window.option = option;

    buildEmptyRow();
  });

function buildEmptyRow() {
  var currentOption = window.option.clone();
  var row = $('<tr>');
  var step = $('<input>').attr('type', 'text').attr('class', 'step-name');
  var action = $('<button>').attr('id', 0).attr('class', 'process-button').html('+');
  row.append($('<td>').append(step));
  row.append($('<td>').append(currentOption));
  row.append($('<td>').append(action));
  $('#process_flow_body').append(row);
}
  // for(var i = 0; i < window.teams.length; i++) {
  //
  //   option.append($('<option>').value(window.teams[i].id).html(window.teams[i].title));
  // }



  $('#process_flow_body').on('click', '.process-button', function() {

    var oldRow = $(this).closest('tr');
    var cells = oldRow.find('td');

    if ($(this).text() == '+') {


    var sendData = {};
    if (cells[0].children[0].value === '') {
      return;
      }
    if (oldRow.attr('id') != undefined) {
      sendData['id'] = oldRow.attr('id');
    }
    sendData['step_name'] = cells[0].children[0].value;
    sendData['business_process_id'] = window.id[1];
    sendData['team_id'] = cells[1].children[0].value;
    $(this).html(' - ');
    window.row = oldRow;

    $.ajax({
      url: '/process_flows',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      method: 'POST',
      dataType: 'json',
      data: {process_flow: sendData}

    }).done(function(responseData){

      var row = window.row.attr('id', responseData.id);
      buildEmptyRow();
      console.log(responseData);

    });
  }
  else {

    $.ajax({
      url: 'process_flows/' + oldRow.attr('id'),
      method: 'DELETE',
      dataType: 'html',
      data: {}
    }).done(function(){
      oldRow.remove();
    });

  }


  $('#back-to-teams').on('click', function() {
      window.location.href = '/teams';
  });
});

  $('#finish').on('click', function(){
      rows = $('#process_flow_body tr');
      process_flows = {};
      process_flows['business_process_id'] =  window.id[1];
      process_flows['process_flow'] = [];
      for(var i = 0; i < rows.length; i ++){
        var row = $(rows[i]);
        //row = $(row);
        var cells = row.find('td');
        if(cells[0].children[0].value != '')
        {
          var process = {};
          process['id'] = row.attr('id');
          process['step_name'] = cells[0].children[0].value;
          process['team_id'] = cells[1].children[0].value;
          process['step_number'] = i + 1;
          process_flows['process_flow'].push(process);
        }
      }

      $.ajax({
        url: '/process_flows/' + window.id[1],
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        method: 'PATCH',
        dataType: 'json',
        data: process_flows
      }). done(function(responseData){
        console.log(responseData);
        window.location.href = '/work_items';
      });


      //console.log(process_flows);
  });

}

});
