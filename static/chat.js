$(document).ready(function() {
 
  var scrolled = false;

  setInterval(function() {
    getMessages();
  }, 1000);

  function getMessages() {
    $.get("/all-messages", function(data, status) {
      console.log(data);
      dataArray = JSON.parse(data);
      console.log(dataArray);

      $("#messages").html("");

      dataArray.forEach(x => {
        $("#messages").append(
            `<div><span class="message"> <span class="username">${x[1]}: ${x[2]}</div>`);
      });
    });
  }

  $("#submit").click(function()  {
    var username = $("#username").val();
    var message = $("#message").val();
    $.post("/message", { username: username, message: message }, function(data) {
    $("#message").val("");
    });
  });

  $(document).on("keypress", function(e)  {
    if (e.which == 13) {
        var username = $("#username").val();
        var message = $("#message").val();
        $.post("/message", { username: username, message: message }, function(data) {
            $("#message").val("");
        });
    }
  });
});