
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.lore-paragraph.reveal');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});

ScrollReveal().reveal('.lore-block', {
    distance: '60px',
    duration: 1000,
    easing: 'ease-out',
    origin: 'bottom',
    interval: 200,
    reset: false
});

ScrollReveal().reveal('.lore-conclusion', {
    distance: '30px',
    duration: 1500,
    origin: 'bottom',
    delay: 300
});

document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');
    const dropdowns = document.querySelectorAll('#mobile_nav_list .dropdown');

   
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

  
    dropdowns.forEach(drop => {
        const btn = drop.querySelector('a.dropbtn');
        btn.addEventListener('click', e => {
            e.preventDefault();
            drop.classList.toggle('active');
        });
    });
});
