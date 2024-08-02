// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartDisplay();

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
      const book = getBookDetails(event.target);
      addToCart(book);
      updateCartDisplay();
    });
  });

  // Add event listeners to "Buy Now" buttons
  document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', event => {
      const book = getBookDetails(event.target);
      addToCart(book);
      redirectToPayment();
    });
  });

  // Add event listeners for subscription form
  const subscribeForm = document.querySelector('#subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', event => {
      event.preventDefault();
      handleSubscription(event.target);
    });
  }

  // Contact form handler
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      handleContactForm(event.target);
    });
  }

  // Payment form handler
  const paymentForm = document.querySelector('#payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', event => {
      event.preventDefault();
      handlePayment(event.target);
    });
  }
});

// Helper functions
function getBookDetails(button) {
  const bookElement = button.closest('.book');
  return {
    title: bookElement.querySelector('h2').textContent,
    price: bookElement.querySelector('.price').textContent,
    imgSrc: bookElement.querySelector('img').src
  };
}

function addToCart(book) {
  cart.push(book);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${book.title} has been added to your cart.`);
}

function updateCartDisplay() {
  const cartContainer = document.querySelector('#cart');
  if (cartContainer) {
    cartContainer.innerHTML = '';
    cart.forEach((book, index) => {
      cartContainer.innerHTML += `
        <div class="cart-item">
          <img src="${book.imgSrc}" alt="${book.title}">
          <div class="cart-details">
            <h3>${book.title}</h3>
            <p>${book.price}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
    });

    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', event => {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
      });
    });
  }
}

function redirectToPayment() {
  window.location.href = 'payment.html';
}

function handleSubscription(form) {
  const formData = new FormData(form);
  const email = formData.get('email');
  if (validateEmail(email)) {
    alert('Thank you for subscribing!');
    form.reset();
  } else {
    alert('Please enter a valid email address.');
  }
}

function handleContactForm(form) {
  const formData = new FormData(form);
  const email = formData.get('email');
  const message = formData.get('message');
  if (validateEmail(email) && message.trim() !== '') {
    alert('Thank you for contacting us!');
    form.reset();
  } else {
    alert('Please fill in all fields correctly.');
  }
}

function handlePayment(form) {
  const formData = new FormData(form);
  const cardNumber = formData.get('cardNumber');
  const expiryDate = formData.get('expiryDate');
  const cvv = formData.get('cvv');
  if (validateCardDetails(cardNumber, expiryDate, cvv)) {
    alert('Payment successful!');
    form.reset();
    localStorage.removeItem('cart');
  } else {
    alert('Please enter valid payment details.');
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateCardDetails(cardNumber, expiryDate, cvv) {
  const cardRe = /^\d{16}$/;
  const dateRe = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRe = /^\d{3}$/;
  return cardRe.test(cardNumber) && dateRe.test(expiryDate) && cvvRe.test(cvv);
}
