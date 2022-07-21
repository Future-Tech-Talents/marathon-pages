const hostAddressInput = document.getElementById("host-address");
const nameInput = document.getElementById("name-input");
const ageInput = document.getElementById("age-input");
const emailInput = document.getElementById("email-input");
const getDataBtn = document.getElementById("get-data-btn");
const sendDataBtn = document.getElementById("send-data-btn");
const outputBox = document.getElementById("output-box");

const printResult = (outputBox, text) => {
  outputBox.innerHTML = text;
}

const getHost = () => {
  let value = hostAddressInput.value;
  if (!value) {
    alert("Все поля обязательные")
    return null;
  }
  return value;
}

const getData = () => {
  const value = getHost();
  if (!value) return;

  return fetch(`${value}/find`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("check network page");
      }
    })
    .then(result => {
      printResult(outputBox, JSON.stringify(result));
    });
}

const sendData = () => {
  const value = getHost();
  if (!value) return;


  let reqPayload = {
    name: nameInput.value,
    age: Number(ageInput.value),
    email: emailInput.value,
  };

  if (!reqPayload.name || !reqPayload.age || !reqPayload.email) {
    alert("Все поля обязательные")
    return;
  }

  return fetch(`${value}/save`, {
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
    });

}

getDataBtn.addEventListener("click", function () {
  getData();
});
sendDataBtn.addEventListener("click", function () {
  sendData().then(getData);
})
