// contact.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', event => {
        event.preventDefault();
        handleContactForm(event.target);
      });
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
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  });
  