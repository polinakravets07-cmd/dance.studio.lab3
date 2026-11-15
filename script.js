const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
     link.addEventListener('click', function() {
          navLinks.forEach(item => {
              item.classList.remove('active');
            });
            this.classList.add('active');
        });
});
const filterButtons = document.querySelectorAll('.filters button');
console.log(filterButtons.length);
const danceCards = document.querySelectorAll('.card');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.dataset.filter;
        danceCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
          });
     });
});
const bookingForm = document.querySelector('#bookingForm');
bookingForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const dance = document.querySelector('#dance').value;
    const message = document.querySelector('#formMessage');
    if (name ==='' || email === '' || dance === '') {
        message.textContent = 'Заповніть усі поля!';
        message.style.color = 'red';
    } else {
        message.textContent = 'Ваша заявка успішно надіслана!';
        message.style.color = 'green';
        bookingForm.reset();
    }
});