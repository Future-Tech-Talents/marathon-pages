$(document).ready(function() {
  const nameInput = $('#name')
  const nameErrorLabel = $('#nameError')
  const nameErrorLabelEmpty = $('#nameErrorEmpty')
  const ageInput = $('#age')
  const ageErrorLabel = $('#ageError')
  const ageErrorLabelEmpty = $('#ageErrorEmpty')
  const emailInput = $('#email')
  const emailErrorLabel = $('#emailError')
  const emailErrorLabelEmpty = $('#emailErrorEmpty')
  const button = $('#button')

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  function checkAge() {
    if (!ageInput.val().length) {
      ageErrorLabelEmpty.removeClass('hidden')

      return false
    }
    //
    //if (Number(ageInput.val()) < 18) {
    //  ageErrorLabel.removeClass('hidden')
    //
    //  return
    //}

    ageErrorLabelEmpty.addClass('hidden')
    ageErrorLabel.addClass('hidden')

    return true
  }

  function checkName() {
    if (!nameInput.val().length) {
      nameErrorLabelEmpty.removeClass('hidden')

      return false
    }

    if (nameInput.val().length > 20) {
      nameErrorLabel.removeClass('hidden')

      return false
    }

    nameErrorLabelEmpty.addClass('hidden')
    nameErrorLabel.addClass('hidden')

    return true
  }

  function checkEmail() {
    if (!emailInput.val().length) {
      emailErrorLabelEmpty.removeClass('hidden')

      return false
    }

    if (!emailRegex.test(emailInput.val())) {
      emailErrorLabel.removeClass('hidden')

      return false
    }

    emailErrorLabelEmpty.addClass('hidden')
    emailErrorLabel.addClass('hidden')

    return true
  }

  ageInput.change(function() {
    ageErrorLabel.addClass('hidden')
    ageErrorLabelEmpty.addClass('hidden')
  })

  nameInput.change(function() {
    nameErrorLabel.addClass('hidden')
    nameErrorLabelEmpty.addClass('hidden')
  })

  emailInput.change(function() {
    emailErrorLabel.addClass('hidden')
    emailErrorLabelEmpty.addClass('hidden')
  })

  nameInput.blur(checkName)
  emailInput.blur(checkEmail)
  ageInput.blur(checkAge)

  button.click(function () {
    console.log(nameInput.value, ageInput.value, emailInput.value)

    const nameCheck = checkName()
    const ageCheck = checkAge()
    const emailCheck = checkEmail()

    if (!nameCheck || !ageCheck || !emailCheck) {
      return
    }

    button.addClass('loading')

    $.post('https://backend.marathon.ivashev.com/save', {
      name: nameInput.val(),
      age: "", // ageInput.val(),
      email: emailInput.val(),
    })
      .done(function () {
        alert('Данные сохранены')

        nameInput.val('')
        ageInput.val('')
        emailInput.val('')
      })
      .fail(function () {
        alert('Ошибка при сохранении данных')
      })
      .always(function () {
        button.removeClass('loading')
      })
  })
})
