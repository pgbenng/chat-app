$(document).ready(function() {
  var scrolled = false;

  setTimeout(function() {
    getMessages();
  }, 1000);

  function getMessages() {
    $.get("/all-messages", function(data, status) {
      dataArray = JSON.parse(data);

      $("#messages").html("");

      dataArray.forEach(x => {
        $("#messages").append(
          `<div class="message"><div class="username">${x[1]}</div> <span class="message-text"> ${
            x[2]
          }</span></div>`
        );
      });

      if (!scrolled) {
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight + 150;
        scrolled = true;
      }
    });
  }

  $("#submit").click(function() {
    postMessage()
  });

  $(document).on("keypress", function(e) {
    if (e.which == 13) {
      postMessage()
      
    }
  });
  function postMessage() {
    var username = $("#username").val();
      var message = $("#message").val();
      if (username != "" || message != "") {
        $.post("/message", { username: username, message: message }, function(
          data
        ) {
          $("#messages").append(
            `<div class="message"><div class="username">${username}</div> <span class="message-text"> ${message}</span></div>`
          );
          var objDiv = document.getElementById("messages");
          objDiv.scrollTop = objDiv.scrollHeight;

          $("#message").val("");
        });
      }
      
  }
});
