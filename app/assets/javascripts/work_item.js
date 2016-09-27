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
      alert('getting queue');
      // <tr>
      //   <td id='<%= work_item.id%>'><%= work_item.history_text %></td>
      //   <td><%= work_item.moved_to_queue %></td>
      //   <td><%= work_item.customer %></td>
      //   <td><%= work_item.process_flow_id %></td>
      //   <td><%= work_item.moved_to_queue %></td>
      //   <td><%= work_item.user %></td>
      //   <td><%= link_to 'Show', work_item %></td>
      //   <td><%= link_to 'Edit', edit_work_item_path(work_item) %></td>
      //   <td><%= link_to 'Destroy', work_item, method: :delete, data: { confirm: 'Are you sure?' } %></td>
      // </tr>
    });
  //});

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

});
