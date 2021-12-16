
# VAT Form Validator

Application - a form-based VAT converter that provides validation of each input and sends data from form via AJAX to the REST API.

Live demo: [https://paulaami.github.io/VAT-Converter-Form/](https://paulaami.github.io/VAT-Converter-Form/)


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Screenshots](#screenshots)
* [Setup](#setup)


## General Information
  
* The first input area of the application is where the user can enter text, which cannot exceed 255 characters. While the user is entering the text, a live view is available of   the remaining number of characters that can be added.
* Input in the radio type, is required and validated when the submit button is clicked.
* The next input is for selecting the appropriate VAT rate, which is required to calculate the gross amount in the last inpute. 
* When the appropriate VAT rate is selected, the net price field activates. Input accept only positive numbers both with symbols “,” and “.” 
* The last gross price input is deactivated by default. The gross price is calculated here based on the VAT rate and net price, and it changes dynamically when the value of any   of the above inputs changes.
* When the submit button is clicked, the form is validated. If all the data is completed correctly, the data are sent via AJAX to the REST API (https://reqres.in/),  a green       congratulations box appears on the screen and we can see the form data in the console.
  If there is an error while submitting the data, an alert appears at the top of the screen stating the error.



## Technologies Used

- HTML 
- SCSS
- JavaScript ES6


## Screenshots
![Country information app](./assets/images/screenshot.png)



## Setup
Live demo: [https://paulaami.github.io/VAT-Converter-Form/](https://paulaami.github.io/VAT-Converter-Form/)





