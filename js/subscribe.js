// subscribe.js

document.addEventListener('DOMContentLoaded', () => {
    const subscribeForm = document.querySelector('#subscribe-form');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', event => {
        event.preventDefault();
        handleSubscription(event.target);
      });
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
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
    document.addEventListener('DOMContentLoaded', () => {
      const subscribeForm = document.querySelector('#subscribe-form');
      if (subscribeForm) {
        subscribeForm.addEventListener('submit', event => {
          event.preventDefault();
          const email = event.target.querySelector('input[name="email"]').value;
          handleSubscription(email);
        });
      }
    });
    
    function handleSubscription(email) {
      alert(`Subscribed successfully : ${email}`);
      // Implement subscription logic here
    }
    
  function redirectToPayment() {
    window.location.href = 'payment.html';
  }
  