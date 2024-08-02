// payment.js

document.addEventListener('DOMContentLoaded', () => {
  const paymentForm = document.querySelector('#payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', event => {
      event.preventDefault();
      handlePayment(event.target);
    });
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

  function validateCardDetails(cardNumber, expiryDate, cvv) {
    const cardRe = /^\d{16}$/;
    const dateRe = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRe = /^\d{3}$/;
    return cardRe.test(cardNumber) && dateRe.test(expiryDate) && cvvRe.test(cvv);
  }
});
