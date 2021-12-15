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
const textConfirm = vatForm.querySelector('.validation__confirm');
const validationVat = vatForm.querySelector('.validation__vat');
const textRequired = vatForm.querySelector('.text-required');
const allInputs = Array.from(vatForm.querySelectorAll(".all-inputs"));


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

// NETTO INPUT VALIDATION
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
 if (inputConfirm.checked) {
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

/*check if textarea is empty */
const checkText = () => {
 if (formDescription.value == '') {
  formDescription.classList.add("warning-border");
  validationRequired.textContent = "Text is required";
 }
}

/*check if radio is checked */
const checkConfirm = () => {
 if (!inputConfirm.checked) {
  textConfirm.textContent = "This field is required"
 }
}

const checkVat = () => {
 if (vatRate.value == "choose") {
  validationVat.textContent = "Please choose correct VAT rate";
 }
}

/*check if price netto is correct*/
const checkNetto = () => {
 if (vatRate.value !== "choose" && priceNetto.value == '') {
  priceNetto.classList.add("warning-border");
  textRequired.textContent = "This field is required";
 }
}

const showGreenBox = () => {
 const greenBox = document.querySelector(".green-box");
 const greenBtn = greenBox.querySelector(".green-box-btn");
 greenBox.classList.add("show-greenbox");
}


/*check if all is correct */
const checkAll = () => {
 const allWarnings = Array.from(vatForm.querySelectorAll('.warning-text'));

 let countWarnings = 0;
 allWarnings.forEach((element) => {
  if(element.innerHTML !== "") {
   countWarnings++
  }
 })
 if(countWarnings === 0) {
  showGreenBox();
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

submitBtn.addEventListener('click', (event) => {
 event.preventDefault();

 checkBeforeSubmit();
})