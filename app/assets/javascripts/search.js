$(document).on('turbolinks:load', function(){
  $("#searchfield").on('input', function () {
    window.customerId = ''
    $('#autocomplete').autocomplete({
      source: function(request, response){
        console.log(request);
        $.ajax({
          url: '/customers?term='+request['term'],
          method: 'GET',
          dataType: 'json',
          data: {}

        }).done(function(responseData){
          var result = [];
          var customer = ''
          for(var i = 0; i < responseData.length; i++){
            customer = ''
            customer = responseData[i].first_name + ' ';
            customer += responseData[i].last_name + ' ';
            customer += responseData[i].address_1 + ' ';
            customer += responseData[i].phone;
            result.push({label:customer, value:responseData[i].id});
          }

          response(result);

          console.log(response);
        })
      },
      select: function (suggestion, ui) {
        event.preventDefault();
        // window.customerId = ui.item.value;
        this.value = ui.item.label;
        //var customerDisplay = this.value;
        window.location.href = '/customers/' + ui.item.value;
        //$('#customerInfo').text(customerDisplay);
        return false;
        // $('#autocomplete').val(ui.itme.label);
        // PK.render(ui.item.value);
      // some function here
      console.log(suggestion);
      },
      focus: function(event, ui) {
        event.preventDefault();
        $("#autocomplete").val(ui.item.label);
    },
    appendTo : "#autoCompleteParent"
    });
  });
});
