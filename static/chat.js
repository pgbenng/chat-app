$(document).ready(function() {
  $.get("/all-messages", function(data, status) {
    dataArray = JSON.parse(data);

    dataArray.forEach(x => {
      $("#messages").append(`<div>${x[1]}: ${x[2]}</div>`);
    });
  });
  $("#submit").click(function() {
      var username = $('#username').val();
      var message = $('#message').val();
      $.post("/message", {username: username, message: message}, function(data){
      
      })
  });
});

