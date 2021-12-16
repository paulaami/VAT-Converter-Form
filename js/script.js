const vatForm = document.querySelector('.form');

const formDescription = vatForm.querySelector(".form__description");
const validationText = vatForm.querySelector(".validation__text");
const validationRequired = vatForm.querySelector(".validation__required");
const validationNumbers = vatForm.querySelector('.validation__numbers');
const priceNetto = vatForm.querySelector("#price-netto");
const priceBrutto = vatForm.querySelector("#price-brutto");
const vatRate = vatForm.querySelector(".vat__rate");
const submitBtn = vatForm.querySelector('.form__button');
const inputConfirm = vatForm.querySelector('#confirmation');
const inputUnconfirm = vatForm.querySelector('#unconfirmation');
const textConfirm = vatForm.querySelector('.validation__confirm');
const validationVat = vatForm.querySelector('.validation__vat');
const greenBox = document.querySelector(".green-box");
const greenBtn = greenBox.querySelector(".green-box-btn");
const textRequired = vatForm.querySelector('.text-required');
const allInputs = [...vatForm.querySelectorAll(".all-inputs")];


const maxLength = 255;
const priceRegex = /^\d+([\,]\d+)*([\.]\d+)?$/;
priceNetto.disabled = true;



// TEXT AREA VALIDATION
const textValidation = () => {
  let formDescriptionValue = formDescription.value;
  let remainingChar = maxLength - formDescriptionValue.length;
  validationText.textContent = `You can add ${remainingChar} more characters`;

  if (formDescriptionValue.length == 0) {
    validationText.textContent = "";
  } else if (formDescriptionValue.length >= 1 && formDescriptionValue.length < maxLength) {
    formDescription.classList.remove("warning-border");
    validationRequired.textContent = "";
  } else if (formDescriptionValue.length >= maxLength) {
    formDescriptionValue = formDescriptionValue.substring(0, maxLength);
    validationText.textContent = "You can’t enter more than 255 characters";
  }
}

// VAT SELECT VALIDATION
const vatValidation = () => {
  let vatValue = vatRate.value;
  if (vatValue !== "choose") {
    priceNetto.disabled = false;
    validationVat.textContent = "";
  } else if (vatValue === "choose") {
    priceNetto.disabled = true;
  }
}

// NETTO INPUT VALIDATION (netto value should be only positive number?)
const nettoValidation = () => {
  let nettoValue = priceNetto.value;
  if (!nettoValue.match(priceRegex) || nettoValue.length < 1) {
    validationNumbers.textContent = "Please, enter correct number";
  } else {
    validationNumbers.textContent = "";
    priceNetto.classList.remove("warning-border");
  }

  if (nettoValue.length >= 1) {
    textRequired.textContent = '';
  }
}


// BRUTTO INPUT VALIDATION
const bruttoValidation = () => {
  let convertedPrice = priceNetto.value.replace(/,/g, '.');
  if (convertedPrice == '') {
    validationNumbers.textContent = "";
    priceBrutto.value = "";
  } else if (convertedPrice >= 0) {
    priceBrutto.value = convertedPrice * (parseFloat(vatRate.value) / 100.0) + parseFloat(convertedPrice);
  }
}

//RADIO INPUT CHECK
const radioValidation = () => {
  if (inputConfirm.checked || inputUnconfirm.checked) {
    textConfirm.textContent = "";
  }
}

const inputsValidation = () => {
  textValidation()
  vatValidation()
  nettoValidation()
  bruttoValidation()
  radioValidation()
}

// CHECK INPUTS WHILE TYPING
allInputs.forEach((input) => {
  input.addEventListener('input', inputsValidation)
})

/*CHECK TEXT AREA */
const checkText = () => {
  if (formDescription.value == '') {
    formDescription.classList.add("warning-border");
    validationRequired.textContent = "Text is required";
  }
}

/*CHECK RADIO BTN*/
const checkConfirm = () => {
  if (!inputConfirm.checked && !inputUnconfirm.checked) {
    textConfirm.textContent = "This field is required"
  }
}


// CHECK VAT RATE
const checkVat = () => {
  if (vatRate.value == "choose") {
    validationVat.textContent = "Please choose correct VAT rate";
  }
}

/*CHECK PRICE NETTO*/
const checkNetto = () => {
  if (vatRate.value !== "choose" && priceNetto.value == '') {
    priceNetto.classList.add("warning-border");
    textRequired.textContent = "This field is required";
  }
}

// SHOW SUCCESS BOX
const showGreenBox = () => {
  greenBox.classList.add("show-greenbox");
}

greenBtn.addEventListener('click', function () {
  greenBox.classList.add("hide");
})


// HIDE FORM
const hideForm = () => {
  vatForm.classList.add("hide");
}


/*CHECK ALL WARNINGS */
const checkAll = () => {
  const allWarnings = [...vatForm.querySelectorAll('.warning-text')];

  let countWarnings = 0;
  allWarnings.forEach((element) => {
    if (element.innerHTML !== "") {
      countWarnings++
    }
  })
  if (countWarnings === 0) {
    sendData();
  }
}

// CHECK INPUTS BEFORE SUBMIT
const checkBeforeSubmit = () => {
  checkText();
  checkConfirm();
  checkVat();
  checkNetto();
  checkAll();
}

//SEND DATA DO REST API
const sendData = async () => {
  const formData = new FormData(vatForm).entries()
  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData))
  });

  const result = await response.json();
  if (response.status === 201) {
    console.log(result)
    hideForm();
    showGreenBox();
  } else {
    alert('ERROR IN SENDING DATA');
  }
}

// SUBMIT
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  checkBeforeSubmit();
});
