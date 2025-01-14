// Mobile
const btnHamburger = document.querySelector('#btnHamburger');
const overlayAnim = document.querySelector('#overlay');
const overlayAnim2 = document.querySelector('#overlay2');
const fadeElems = document.querySelectorAll('.has-fade');
const fadeElems2 = document.querySelectorAll('.has-fade2');
const body = document.querySelector('body');



btnHamburger.addEventListener('click', function() {
   if(btnHamburger.classList.contains('header-open')) {    // close Hamburger menu 
      btnHamburger.classList.remove('header-open');
      fadeElems.forEach(function(element){
         element.classList.remove('fade-in');
         element.classList.add('fade-out');
       });
      fadeElems2.forEach(function(element){
         element.classList.remove('fade-in2');
         element.classList.add('fade-out2');
      });
      body.classList.remove('no-scroll');
   }
   else {                                                // open Hamburger menu
      btnHamburger.classList.add('header-open');
      overlayAnim.classList.add('overlay');
      overlayAnim2.classList.add('overlay-2');
      fadeElems.forEach(function(element){
         element.classList.remove('fade-out');
         element.classList.add('fade-in');
       });
      fadeElems2.forEach(function(element){
         element.classList.remove('fade-out2');
         element.classList.add('fade-in2');
      });
      body.classList.add('no-scroll');
   }
});

// Add sliding effect to hamburger menu components when the menu is opened

btnHamburger.addEventListener("click", function() {
   overlayAnim.classList.toggle("open");
   overlayAnim2.classList.toggle("open");
});

