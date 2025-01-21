// Add items to the cart
const addCartButtons = document.querySelectorAll('.add-cart-button');
const cartList = document.querySelector('.cart-display-full');
const cartFilled = document.querySelector('.cart-full-container');
const emptyCartMessage = document.querySelector('.cart-display-empty');
const trashIcon = document.querySelector('.trash-icon');
const cartIconMobile = document.querySelector('.cart-icon');
const cartScreen = document.querySelector('.cart-inventory');
const viewCartBtn = document.querySelector('.view-cart-button');
const cartIconDesktop = document.querySelector('.cart-icon-desktop');

// Function to save the cart to sessionStorage
function saveCartToSessionStorage() {
   const cartItems = Array.from(cartList.querySelectorAll('.product-in-cart')).map(item => item.textContent);
   sessionStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to load the cart from sessionStorage
function loadCartFromSessionStorage() {
   const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
   storedCart.forEach(productName => {
      const cartItem = document.createElement('li');
      cartItem.className = 'product-in-cart';
      cartItem.textContent = productName;
      cartList.appendChild(cartItem);
    });

   if (storedCart.length > 0) {
      cartList.classList.remove('hidden');
      cartFilled.classList.remove('hidden');
      emptyCartMessage.classList.add('hidden');
   }
}

// Check if cart-related elements exist
if (cartList && emptyCartMessage && trashIcon && cartFilled) {
   // Load the cart from sessionStorage on page load
   loadCartFromSessionStorage();

   // Function to add an item to the cart
   function addToCart(event) {
      const productContainer = event.target.closest('.gallery-product');
      const productName = productContainer.querySelector('.gallery-product-title').textContent;
      const cartItems = cartList.querySelectorAll('.product-in-cart');
      const itemExists = Array.from(cartItems).some(item => item.textContent === productName);

      if (!itemExists) {
         const cartItem = document.createElement('li');
         cartItem.className = 'product-in-cart';
         cartItem.textContent = productName;
         cartList.appendChild(cartItem);
         cartList.classList.remove('hidden');
         cartFilled.classList.remove('hidden');
         emptyCartMessage.classList.add('hidden');

         // Save to sessionStorage
         saveCartToSessionStorage();

         alert("Item added.");
      } 
      else {
         alert(`${productName} is already in the cart.`);
      }
   }

   // Function to clear the cart
   function clearCart() {
      cartList.innerHTML = '';
      emptyCartMessage.classList.remove('hidden');
      cartFilled.classList.add('hidden');

      // Clear sessionStorage
      sessionStorage.removeItem('cart');
      alert("Cart has been cleared.");
   }

   // Attach event listeners to "Add to Cart" buttons
   addCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
   });

   // Attach event listener to the trash icon
   trashIcon.addEventListener('click', clearCart);
}

// Check if the cart elements exist before adding functionality
if (cartIconMobile && cartScreen && viewCartBtn) {
   // Function to reveal and hide the cart inventory screen
   function revealCart() {
      if (cartScreen.classList.contains('hidden')) {
         cartScreen.classList.remove('hidden');
         viewCartBtn.textContent = "Hide Cart";
         document.addEventListener('click', hideCart);
      } 
      else {
         cartScreen.classList.add('hidden');
         viewCartBtn.textContent = "View Cart";
         document.removeEventListener('click', hideCart);
      }
   }

   function hideCart(event) {
      if (
         !cartScreen.contains(event.target) &&
         event.target !== cartIconMobile &&
         event.target !== cartIconDesktop &&
         event.target !== viewCartBtn &&
         !event.target.classList.contains('add-cart-button') // Prevent hiding when clicking "Add to Cart"
      ) {
         cartScreen.classList.add('hidden');
         document.removeEventListener('click', hideCart);
      }
   }

   cartIconMobile.addEventListener('click', revealCart);
   viewCartBtn.addEventListener('click', revealCart);
   cartIconDesktop.addEventListener('click', revealCart);
}




// Mobile Hamburger Menu
const btnHamburger = document.querySelector('#btnHamburger');
const overlayAnim = document.querySelector('#overlay');
const overlayAnim2 = document.querySelector('#overlay2');
const fadeElems = document.querySelectorAll('.has-fade');
const fadeElems2 = document.querySelectorAll('.has-fade2');
const body = document.querySelector('body');

// Check if hamburger menu elements exist
if (btnHamburger && overlayAnim && overlayAnim2) {
   btnHamburger.addEventListener('click', function () {
      if (btnHamburger.classList.contains('header-open')) {
         // Close Hamburger menu
         btnHamburger.classList.remove('header-open');
         body.classList.remove('no-scroll');

         fadeElems.forEach(element => {
            element.classList.remove('fade-in');
            element.classList.add('fade-out');
         });
         fadeElems2.forEach(element => {
            element.classList.remove('fade-in2');
            element.classList.add('fade-out2');
         });
      } 
      else {
         // Open Hamburger menu
         btnHamburger.classList.add('header-open');
         body.classList.add('no-scroll');

         fadeElems.forEach(element => {
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
         });
         fadeElems2.forEach(element => {
            element.classList.remove('fade-out2');
            element.classList.add('fade-in2');
         });
      }
   });

   // Add sliding effect to hamburger menu components when the menu is opened
   btnHamburger.addEventListener("click", function () {
      overlayAnim.classList.toggle("open");
      overlayAnim2.classList.toggle("open");
   });
} 
else {
   console.warn('Hamburger menu elements are missing on this page.');
}

// Process order button message
const processOrderButton = document.querySelector('.checkout-btn');

// Add a click event listener to the button
if (processOrderButton) {
   processOrderButton.addEventListener('click', function () {
      alert('Thank you for your order!');
      cartList.innerHTML = '';
      emptyCartMessage.classList.remove('hidden');
      cartFilled.classList.add('hidden');

      // Clear sessionStorage
      sessionStorage.removeItem('cart');
   });
}

// Web storage and validation

// Select form elements
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// Event listener for form submission
if (contactForm) {
   contactForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission behavior
   
      // Capture form data
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
   
      // Validate input
      if (!name || !phone || !email || !message) {
         alert('Please fill out all fields correctly.');
         return;
      }
   
      if (!validateEmail(email)) {
         alert('Please enter a valid email address.');
         return;
      }
   
      // Store data in web storage (localStorage or sessionStorage)
      const formData = {
         name,
         phone,
         email,
         message,
      };
   
      // Save to localStorage
      localStorage.setItem('contactFormData', JSON.stringify(formData));
   
      // Provide user feedback
      successMessage.textContent = 'Form data saved successfully!';
      successMessage.classList.remove('hidden');
   
      // Optionally clear the form
      contactForm.reset();
   });
   
   // Function to validate email format
   function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   }
   
   // Retrieve stored data (Optional: for debug or summary display)
   function getStoredFormData() {
      const storedData = localStorage.getItem('contactFormData');
      return storedData ? JSON.parse(storedData) : null;
   }
}



// Footer Newsletter Subscription Validation
const emailInput = document.getElementById('email-input');
const subscribeButton = document.getElementById('subscribe-button');
const messageBox = document.getElementById('email-validation-message');

// Ensure the footer elements exist before adding event listeners
if (emailInput && subscribeButton && messageBox) {
   subscribeButton.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default form submission behavior
      messageBox.style.display = 'none'; // Hide any previous messages

      // Check for validity using HTML5 validation
      if (!emailInput.validity.valid) {
         messageBox.style.display = 'block';
         if (emailInput.validity.valueMissing) {
            // Field is empty
            messageBox.textContent = 'Please fill out the email field.';
         } 
         else if (emailInput.validity.typeMismatch) {
            // Invalid email format
            messageBox.textContent = 'Please enter a valid email address.';
         }
      } 
      else {
         // Email is valid
         messageBox.textContent = 'Thank you for subscribing!';
         messageBox.style.color = 'var(--enduranceWhite)'; // Set color for success
         messageBox.style.display = 'block'; // Ensure the message is shown

         // Clear input and hide message after 3 seconds
         emailInput.value = '';
         setTimeout(() => {
            messageBox.style.display = 'none';
            messageBox.style.color = 'var(--enduranceWhite)'; // Reset color for error messages
         }, 3000);
      }
   });
}

