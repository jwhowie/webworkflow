$(function(){

  $.ajax({
    url: '/work_items',
    method: 'GET',
    dataType: 'json',
    data: {}
  }).done(function(responseData){

    for(var i = 0; i < responseData.length; i++)
    {
      var body = $('#queue-body');
      var row = $('<tr>').attr('id', responseData[i].id);
      var moved = $('<td>').html(responseData[i].moved_to_queue);
      var created = $('<td>').html(responseData[i].created_at);
      var team = $('<td>').html(responseData[i].title);
      var stepName = $('<td>').html(responseData[i].step_name);
      var customerInfo = $('<td>').html(responseData[i].contact_info);
      var assigned =  $('<td>').html(responseData[i].name);
      row.append(moved);
      row.append(created);
      row.append(team);
      row.append(stepName);
      row.append(customerInfo);
      row.append(assigned);
      body.append(row);


    }

    });
  //});

  $('table').on('click', 'tr', function(){
    var clicked = $(this);
    $('tr').css('background-color', '');
    clicked.css('background-color', 'teal');
    $.ajax({
      url: '/work_items/' + clicked.attr('id') + '/edit',
      method: 'GET',
      dataType: 'json',
      data: {}
    }).done(function(responseData){
      console.log(responseData);
      cust = $('#customer-info');
      cust.empty();
      cust.append($('<div>').html(responseData[0].name));
      cust.append($('<div>').html(responseData[0].address_1));
      cust.append($('<div>').html(responseData[0].address_2));
      cust.append($('<div>').html(responseData[0].city));
      cust.append($('<div>').html(responseData[0].phone));
      cust.append($('<div>').html(responseData[0].email));

      var hist = $('#queue-history').val(responseData[0].history_text)


    });
  });
  $('#queue-back').on('click', function(){
    alert('back button pressed')
  });

  $('#queue-escolate').on('click', function(){
    alert('Escolate button pressed')
  });

  $('#queue-forward').on('click', function(){
    alert('forward button pressed')
  });

  $('#queue-save').on('click', function(){
    alert('save button pressed')
  });

  $('#myModal').on('click', '#save-customer', function(){
    $('#new_customer').submit();
  });

});
