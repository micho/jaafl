/* Author:

*/

/**
 * REPL console
 */

$(function () {

  console.log = function (data) {
    var formatted;
    try {
      formatted = JSON.stringify(data);
    } catch (e) {
      formatted = data;
    }
    $(".log")
      .append("<p class='data'>" + formatted + "</p>")
      .scrollTop($(".log").prop("scrollHeight"));
  };

  console.info = function (message) {
    $(".log")
      .append("<p class='command'>" + message + "</p>")
      .scrollTop($(".log").prop("scrollHeight"));
  };

  console.error = function (message) {
    $(".log")
      .append("<p class='error'>" + message + "</p>")
      .scrollTop($(".log").prop("scrollHeight"));
  };

  var history = [];
  history.pos = 0;

  $(document).on("keydown", "textarea#console", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });

  $(document).on("keyup", "textarea#console", function (e) {
    var $textarea = $(e.target), $log = $(".log"), data, r,
        val = $textarea.val();
    // Press enter
    if (e.keyCode === 13) {
      e.preventDefault();

      // Move history
      history.unshift(val);
      history.pos = 0;

      // Output results
      try {
        data = eval("(" + (val.length ? val : "undefined") + ")");
        console.info($textarea.val());
        console.log(data);
      } catch (exc) {
        console.info($textarea.val());
        console.error(exc);
      }
      $textarea.val("");
    }

    // Navigate history
    if (e.keyCode === 38) {
      history.pos = Math.max(Math.min(history.pos + 1, history.length), 0);
      $textarea.val(history[history.pos - 1]);
    } else if (e.keyCode === 40) {
      history.pos = Math.max(history.pos - 1, 0);
      $textarea.val(history[history.pos - 1]);
    } else {
      history.pos = 0;
    }
  });

  console.info("<br>This is your interactive JS console.<br><br><br>Use it to try new commands as you read this guide.<br><br>It works pretty much like a calculator.<br>Try typing these and see what you get:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;a = 27 + 15<br>&nbsp;&nbsp;&nbsp;&nbsp;Math.min(2,5)<br>&nbsp;&nbsp;&nbsp;&nbsp;'Hello, world!'<br>&nbsp;&nbsp;&nbsp;&nbsp;alert('hey!')<br><br>Let the coding begin!<br><br>");

});
      

