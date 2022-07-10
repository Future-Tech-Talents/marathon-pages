$(document).ready(function() {
  const nameInput = $('#name')
  const nameErrorLabel = $('#nameError')
  const ageInput = $('#age')
  const ageErrorLabel = $('#ageError')
  const emailInput = $('#email')
  const emailErrorLabel = $('#emailError')
  const button = $('#button')

  const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  ageInput.change(function() {
    ageErrorLabel.addClass('hidden')
  })

  nameInput.change(function() {
    nameErrorLabel.addClass('hidden')
  })

  button.click(function () {
    console.log(nameInput.value, ageInput.value, emailInput.value)

    if (Number(ageInput.val()) < 18) {
      ageErrorLabel.removeClass('hidden')

      return
    }

    if (nameInput.length > 20) {
      nameErrorLabel.removeClass('hidden')
    }

    button.addClass('loading')

    $.post('https://backend.marathon.ivashev.com/save', {
      name: nameInput.val(),
      //age: ageInput.val(),
      email: emailInput.val(),
    })
      .done(function () {
        alert('Данные сохранены')
      })
      .fail(function () {
        alert('Ошибка при сохранении данных')
      })
      .always(function () {
        button.removeClass('loading')
      })
  })
})
