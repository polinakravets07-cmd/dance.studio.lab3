const navLinks = document.querySelectorAll('nav a');
nav.Links.forEach(link => {
     links.addEventListener('click', function() {
          navLinks.forEach(item => {
              item.classList.remove('active');
            });
            this.classList.add('active');
        });
});