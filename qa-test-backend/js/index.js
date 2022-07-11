$(document).ready(function() {
  $.get('https://backend.marathon.ivashev.com/find', function (data) {
    $("#container").removeClass('loading')


  })
})
