const hostAddressInput = document.getElementById("host-address");
const nameInput = document.getElementById("name-input");
const ageInput = document.getElementById("age-input");
const emailInput = document.getElementById("email-input");
const getDataBtn = document.getElementById("get-data-btn");
const sendDataBtn = document.getElementById("send-data-btn");
const outputBox = document.getElementById("output-box");
const loader = document.getElementById('loader')

const printResult = (outputBox, text) => {
  outputBox.innerHTML = text;
}

const getHost = () => {
  let value = hostAddressInput.value;
  if (!value) {
    alert("Укажи адрес своего сервера")
    return null;
  }
  return value;
}

const showLoader = () => loader.classList.remove('hidden')
const hideLoader = () => loader.classList.add('hidden')


const getData = () => {
  const value = getHost();
  if (!value) return;

  showLoader()

  return fetch(`${value}/find`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        alert('Произошла ошибка')

        throw new Error("check network page");
      }
    })
    .then(result => {
      printResult(outputBox, `
        <table class="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            ${
              result.map((item) => {
                const { name, email, age } = item
                
                return (`
                  <tr>
                    <td>
                    ${name}
                    </td>
                    <td>
                    ${age}
                    </td>
                    <td>
                    ${email}
                    </td>
                  </tr>
                `)
              }).join('')
            }
          </tbody>
        </table>
      `);
    })
    .finally(() => hideLoader())
}

const sendData = () => {
  const host = getHost();
  if (!host) return;


  let reqPayload = {
    name: nameInput.value,
    age: Number(ageInput.value),
    email: emailInput.value,
  };

  if (!reqPayload.name || !reqPayload.age || !reqPayload.email) {
    alert("Нужно заполнить все поля")
    return;
  }

  return fetch(`${host}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqPayload)
  })
    .then(response => {
      if (response.ok) {
        return response.text()
      } else {
        throw new Error("check network page");
      }
    })
    .then(result => {
      printResult(outputBox, result);
    })
    .finally(() => hideLoader());


}

getDataBtn.addEventListener("click", function () {
  getData();
});
sendDataBtn.addEventListener("click", function () {
  sendData().then(getData);
})
