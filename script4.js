
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      const activeTab = document.getElementById(tab);
      if (activeTab) {
        activeTab.classList.add('active');
      }
    });
  });
});


const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(tab).classList.add('active');
  });
});


const buttons = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active de todos
    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Adiciona active no clicado e no conteúdo correspondente
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');

    // Scroll suave até a seção
    window.scrollTo({
      top: document.querySelector('.album-tabs').offsetTop - 60,
      behavior: 'smooth'
    });
  });
});



const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
let currentIndex = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);

updateCarousel();



document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobile_btn');
  const mobileMenu = document.getElementById('mobile_menu');
  const dropdowns = document.querySelectorAll('#mobile_nav_list .dropdown');

  // Toggle menu mobile
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // Toggle dropdown mobile ao clicar
  dropdowns.forEach(drop => {
    const btn = drop.querySelector('a.dropbtn');
    btn.addEventListener('click', e => {
      e.preventDefault();
      drop.classList.toggle('active');
    });
  });
});


const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '0';

const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Bubble {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * canvas.height;
    this.radius = 4 + Math.random() * 6;
    this.speedY = 0.3 + Math.random() * 0.6;
    this.swing = Math.random() * 100;
    this.alpha = 0.3 + Math.random() * 0.4;
  }

  update(frame) {
    this.y -= this.speedY;
    this.x += Math.sin((frame + this.swing) * 0.01) * 0.3;

    if (this.y < -this.radius) this.reset();
    if (this.x > canvas.width + this.radius) this.x = -this.radius;
    if (this.x < -this.radius) this.x = canvas.width + this.radius;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    const r = this.radius;

    // Bolha com gradiente radial
    const gradient = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 0.8})`);
    gradient.addColorStop(0.5, `rgba(127, 193, 202, ${this.alpha})`);
    gradient.addColorStop(1, `rgba(127, 193, 202, ${this.alpha * 0.1})`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    // Reflexo sutil
    ctx.beginPath();
    ctx.arc(-r * 0.3, -r * 0.3, r * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.3})`;
    ctx.fill();

    ctx.restore();
  }
}

const bubbles = [];
const bubbleCount = 100;
let frame = 0;

for (let i = 0; i < bubbleCount; i++) {
  bubbles.push(new Bubble());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => {
    b.update(frame);
    b.draw();
  });
  frame++;
  requestAnimationFrame(animate);
}

animate();
