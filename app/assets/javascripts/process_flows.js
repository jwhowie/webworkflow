$(document).on('turbolinks:load', function(){

  var x = window.location.search.split('&');
   window.id = x[0].split('=');
  title = x[1].split('=');
  var teams = [];
  window.teams = teams;

  $('.process-table').attr('id', id[1]);
  $('#business-process-name').html('<b>Process Name: </b>' + title[1]);

  var row = $('<tr>').attr('id', 0);
  var step = $('<input>').attr('type', 'text').attr('class', 'step-name');
  var option = $('<select>');
  var action = $('<button>').attr('id', 0).attr('class', 'process-button').html('+');

  $.ajax({
    url: '/teams?all=1',
    method: 'GET',
    dataType: 'json',
    data: {}
  }).done(function(responseData){
    console.log(responseData);
    for(var i = 0; i < responseData.length; i++)
    {
      window.teams.push([responseData[i].id, responseData[i].title]);
      option.append($('<option>').val(window.teams[i][0]).html(window.teams[i][1]));
    }
    row.append($('<td>').append(step));
    row.append($('<td>').append(option));
    row.append($('<td>').append(action));
    $('tbody').append(row);

  });

  for(var i = 0; i < window.teams.length; i++) {

    option.append($('<option>').value(window.teams[i].id).html(window.teams[i].title));
  }



  $('tbody').on('click', '.process-button', function() {
    var oldRow = $(this).closest('tr');
    var cells = oldRow.find('td');
    var sendData = {};
    sendData['id'] = oldRow.attr('id');
    sendData['step_name'] = cells[0].children[0].value;
    sendData['business_process_id'] = window.id[1];
    // sendData['action'] = 1;


    sendData['team_id'] = cells[1].children[0].value;
    // sendData['name'] = cells[1].children[0].value;
    // sendData['email'] = cells[2].children[0].value;
    // // sendData['user_id'] = cells[2].attr('id');
    $(this).html(' - ');


    $.ajax({
      url: '/process_flows',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      method: 'POST',
      dataType: 'json',
      data: {process_flow: sendData}

    }).done(function(responseData){
      console.log(responseData);

    });


  $('#back-to-teams').on('click', function() {
      window.location.href = '/teams';
  });
});
});
  //
  //
  // var newButton = 0;
  //
  //
  // if (window.location.pathname == "/process_flows") {
  //   $.ajax({
  //     URL: "/process_flows",
  //     method: "GET",
  //     dataType: "json",
  //     data: {}
  //   }).done(function(responseData){
  //   console.log(responseData);
  //   var processName = $('<input>').attr('type', 'text').attr('class', 'process-name');
  //   $('#business-process-name').append(processName);
  //
  //   for (var i = 0; i < responseData.length; i++) {
  //     var row = $('<tr>').attr('id', responseData[i].id);
  //
  //     var step = $('<input>').attr('type', 'text').attr('class', 'step-name').val(responseData[i].name);
  //     var team = $('<input>').attr('type', 'text').attr('class', 'team-name').val(responseData[i].title);
  //     var action = $('<button>').attr('id', responseData[i].id).attr('class', 'action_button').html('+');
  //
  //
  //
  //     row.append($('<td>').append(step));
  //
  //     row.append($('<td>').append(team));
  //
  //     $('tbody').append(row);
  //   }
  //   });
  //
  // }
  //
  //
  // $('tbody').on('click', '.action_button', function(e) {
  //   var oldRow = $(this).closest('tr');
  //   var cells = oldRow.find('td');
  //   var sendData = {};
  //   sendData['id'] = oldRow.attr('id');
  //   sendData['business_process_name'] = $('.process-name').val();
  //   sendData['action'] = 1;
  //   sendData['title'] = cells[0].children[0].value;
  //   sendData['name'] = cells[1].children[0].value;
  //   $(this).html(' - ');
  //
  //
  //
  //   $.ajax({
  //     url: '/process_flows',
  //     beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
  //     method: 'POST',
  //     dataType: 'json',
  //     data: {team: sendData}
  //
  //   }).done(function(responseData){
  //     console.log(responseData);
  //
  //   });
  //
  //
  //   console.log(sendData);
  //
  //   var row = $('<tr>').attr('id', 0);
  //
  //   var team = $('<input>').attr('type', 'text').attr('class', 'team-name');
  //   var leader = $('<input>').attr('type', 'text').attr('class', 'team-lead');
  //   var email = $('<input>').attr('type', 'text').attr('class', 'team-email').attr('id', 0);
  //   var action = $('<button>').attr('id', 0).attr('class', 'action_button').html('+');
  //
  //
  //     row.append($('<td>').append(team));
  //
  //     row.append($('<td>').append(leader));
  //
  //     row.append($('<td>').append(email));
  //
  //     row.append($('<td>').append(action));
  //
  //     $('tbody').append(row);
