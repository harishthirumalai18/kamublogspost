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
  });
  
  function getBookDetails(button) {
    const bookElement = button.closest('.book');
    return {
      title: bookElement.querySelector('h2').textContent,
      price: bookElement.querySelector('.price').textContent,
      imgSrc: bookElement.querySelector('img').src,
      description: bookElement.querySelector('p').textContent
    };
  }
  
  function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${book.title} has been added to your cart.`);
  }
  
  function updateCartDisplay() {
    const cartContainer = document.querySelector('#cart-items');
    if (cartContainer) {
      cartContainer.innerHTML = '';
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.forEach((book, index) => {
        cartContainer.innerHTML += `
          <div class="cart-item">
            <img src="${book.imgSrc}" alt="${book.title}">
            <div class="cart-details">
              <h3>${book.title}</h3>
              <p>${book.description}</p>
              <p>${book.price}</p>
              <button class="remove-from-cart" data-index="${index}">Remove</button>
            </div>
          </div>
        `;
      });
  
      document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', event => {
          const index = event.target.dataset.index;
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
  