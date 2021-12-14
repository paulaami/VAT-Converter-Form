const formDescription = document.querySelector(".form__description");
const validationText = document.querySelector(".validation__text");
const validationLetters = document.querySelector(".validation__letters");
const validationNumbers = document.querySelector('.validation__numbers');
const priceNetto = document.querySelector(".price__netto");
const priceBrutto = document.querySelector(".price__brutto");
const vatRate = document.querySelector(".vat__rate");
const test = Array.from(document.querySelectorAll(".test"));
const maxLength = 255;
const letters = /^[A-Za-z]+$/;

formDescription.addEventListener("keyup", (event) => {
 let formDescriptionValue = event.target.value;
 let remainingChar = maxLength - formDescriptionValue.length;
 validationText.textContent = `You can add ${remainingChar} more characters`;

 if (formDescriptionValue.length == 0) {
  validationText.textContent = "";
 } else if (formDescriptionValue.length >= maxLength) {
  formDescriptionValue = formDescriptionValue.substring(0, maxLength);
  validationText.textContent = "You can’t enter more than 255 characters";
 }

 if (/\d/.test(formDescriptionValue)) {
  validationLetters.textContent = "Text is required";
 } else {
  validationLetters.textContent = "";
 }
});

priceNetto.disabled = true;
vatRate.addEventListener("change", function () {
 if (this.value !== "choose") {
  priceNetto.disabled = false;
 } else if (this.value === "choose") {
  priceNetto.disabled = true;
 }

 let currentValue = this.value;
 // console.log(parseFloat(vatRate.value) / 100.0);
});

/* Price shouldn't be a negative number..? */

const regex = /^\d+([\,]\d+)*([\.]\d+)?$/;
priceNetto.addEventListener('keyup', (event) => {
 let nettoValue = event.target.value;
 if (nettoValue.match(regex)) {
  validationNumbers.textContent = "";
 } else {
  validationNumbers.textContent = "Please, enter input number";
 }

 /*if (nettoValue == '') {
  validationNumbers.textContent = "";
  priceBrutto.value = '';
 } else if (nettoValue >= 0) {
  priceBrutto.value = nettoValue * (parseFloat(vatRate.value) / 100.0)
  console.log(parseFloat(vatRate.value) / 100.0)
 }*/
});

test.forEach(function (el) {
 el.addEventListener('input', function () {
  if (priceNetto.value == '') {
   validationNumbers.textContent = "";
   priceBrutto.value = "";
  } else if (priceNetto.value >= 0) {
   let withoutComa = priceNetto.value.replace(/,/g, '.');
   console.log(withoutComa)
   priceBrutto.value = withoutComa * (parseFloat(vatRate.value) / 100.0) + parseFloat(withoutComa);
  }
 })
})

