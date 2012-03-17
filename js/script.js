/* Author:

*/

/**
 * REPL console
 */

$(function () {

  console.log = function (data) {
    $(".log").append("<p class='data'>" + JSON.stringify(data) + "</p>");
  };

  console.info = function (message) {
    $(".log").append("<p class='command'>" + message + "</p>");
  };

  console.error = function (message) {
    $(".log").append("<p class='error'>" + message + "</p>");
  };

  $(document).on("keyup", "textarea#console", function (e) {
    var $textarea = $(e.target), $log = $(".log"), data, r;
    if (e.keyCode === 13) {
      try {
        data = eval("(" + $textarea.val() + ")");
        console.info($textarea.val());
        console.log(data);
      } catch (exc) {
        console.info($textarea.val());
        console.error(exc);
      }
      $textarea.val("");
      $log.scrollTop($log.prop("scrollHeight"));
    }
  });

});
      

