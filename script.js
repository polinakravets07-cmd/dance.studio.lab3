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
const danceCards = document.querySelectorAll('.card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCategory = button.getAttribute('data-filter');
        danceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            card.hidden = !(selectedCategory === 'all' || selectedCategory === cardCategory);
          });
     });
});
const bookingForm = document.querySelector('#bookingForm');
bookingForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const dance = document.querySelector('#dance').value;
    const message = document.querySelector('#formMessage');
    if (name ==='' || email === '' || dance === '') {
        message.textContent = 'Заповніть усі поля!';
        message.style.color = 'red';
        return;
    }
    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                dance_style: dance
        })
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.error || 'Помилка відправлення');
    }
    message.textContent = 'Ваша заявка успішно надіслана!';
    message.style.color = 'green';
    bookingForm.requestFullscreen();
  } catch (error ) {
    message.textContent = 'Не вдалося надіслати зявку. Спробуйте пезніше.';
    message.style.color = 'red';
  }
});
