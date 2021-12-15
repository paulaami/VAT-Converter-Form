const formDescription = document.querySelector(".form__description");
const validationText = document.querySelector(".validation__text");
const validationLetters = document.querySelector(".validation__letters");
const validationNumbers = document.querySelector('.validation__numbers');
const priceNetto = document.querySelector(".price__netto");
const priceBrutto = document.querySelector(".price__brutto");
const vatRate = document.querySelector(".vat__rate");
const allInputs = Array.from(document.querySelectorAll(".all-inputs"));

const maxLength = 255;
const letters = /^[A-Za-z]+$/;
const regex = /^\d+([\,]\d+)*([\.]\d+)?$/;
priceNetto.disabled = true;

// TEXT AREA VALIDATION
const textValidation = () => {
 let formDescriptionValue = formDescription.value;
 let remainingChar = maxLength - formDescriptionValue.length;
 validationText.textContent = `You can add ${remainingChar} more characters`;

 if (formDescriptionValue.length == 0) {
  validationText.textContent = "";
 } else if (formDescriptionValue.length >= maxLength) {
  formDescriptionValue = formDescriptionValue.substring(0, maxLength);
  validationText.textContent = "You can’t enter more than 255 characters";
  formDescription.style.borderColor = "red";
 }

 if (/\d/.test(formDescriptionValue)) {
  validationLetters.textContent = "Text is required";
 } else {
  validationLetters.textContent = "";
 }
}

// VAT SELECT VALIDATION
const vatValidation = () => {
 let vatValue = vatRate.value;
 if (vatValue !== "choose") {
  priceNetto.disabled = false;
 } else if (vatValue === "choose") {
  priceNetto.disabled = true;
 }
}

// NETTO INPUT VALIDATION
// SHOULD BE ONLY POSITIVE NUMBERS?
const nettoValidation = () => {
 let nettoValue = priceNetto.value;
 if (nettoValue.match(regex)) {
  validationNumbers.textContent = "";
 } else {
  validationNumbers.textContent = "Please, enter input number";
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

const inputsValidation = () => {
 textValidation()
 vatValidation()
 nettoValidation()
 bruttoValidation()
}

allInputs.forEach((input) => {
 input.addEventListener('input', inputsValidation)
})

