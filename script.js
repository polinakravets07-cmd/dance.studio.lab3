const navLinks = document.querySelectorAll('nav a');
nav.Links.forEach(link => {
     links.addEventListener('click', function() {
          navLinks.forEach(item => {
              item.classList.remove('active');
            });
            this.classList.add('active');
        });
});
const filterButtons = document.querySelectorAll('.filters button');
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