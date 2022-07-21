$(document).ready(function() {
  const tableBody = $('#tableBody')

  $.get('https://backend.marathon.ivashev.com/find', function (data) {
    $("#container").removeClass('loading')

    data.forEach(function(item) {
      tableBody.append(
        `
          <tr>
            <td>${item.name}</td>
            <td>${item.age || ''}</td>
            <td>${item.email}</td>
          </tr>
        `
      )
    })
  })
})
