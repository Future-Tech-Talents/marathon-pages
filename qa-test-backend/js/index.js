$(document).ready(function() {
  const tableBody = $('#tableBody')

  $.get('https://backend.marathon.ivashev.com/find', function (data) {
    $("#container").removeClass('loading')

    const indexToSlice = data.findIndex(function(item) {
      return item.name === 'test' && item.email === 'andrew@ivashev.com'
    })


    data.slice(0, indexToSlice).forEach(function(item) {
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
