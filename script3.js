
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



const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '-1';

const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = 12 + Math.random() * 10;
    this.speedY = 0.5 + Math.random() * 1;
    this.wind = 0.4 + Math.random() * 0.6;
    this.angle = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.01;
    this.alpha = 0.5 + Math.random() * 0.5;
    this.swing = Math.random() * 100;
    this.hue = 45 + Math.random() * 5; // amarelo mais vivo
  }

  update(frame) {
    this.y += this.speedY;
    this.x += Math.sin((frame + this.swing) * 0.01) * this.wind;
    this.angle += this.rotationSpeed;

    if (this.y > canvas.height + this.size) this.reset();
    if (this.x > canvas.width + this.size) this.x = -this.size;
    if (this.x < -this.size) this.x = canvas.width + this.size;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    const s = this.size;

    const gradient = ctx.createRadialGradient(0, 0, s * 0.2, 0, 0, s);
    gradient.addColorStop(0, `hsla(${this.hue}, 85%, 60%, ${this.alpha})`);
    gradient.addColorStop(0.6, `hsla(${this.hue}, 90%, 50%, ${this.alpha * 0.9})`);
    gradient.addColorStop(1, `hsla(${this.hue}, 95%, 40%, ${this.alpha * 0.3})`); // ponta menos transparente

    ctx.fillStyle = gradient;

    // Forma realista de pétala
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(s * 0.6, -s * 0.3, s * 0.6, -s * 1.2, 0, -s);
    ctx.bezierCurveTo(-s * 0.6, -s * 1.2, -s * 0.6, -s * 0.3, 0, 0);
    ctx.closePath();
    ctx.fill();

    // Textura central da pétala
    ctx.strokeStyle = `hsla(${this.hue}, 80%, 20%, ${this.alpha * 0.5})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(0, 0);
    ctx.stroke();

    // Linhas laterais de textura sutil
    ctx.lineWidth = 0.3;
    for (let i = -0.4; i <= 0.4; i += 0.2) {
      ctx.beginPath();
      ctx.moveTo(i * s, -s * 0.8);
      ctx.lineTo(i * s * 0.6, -s * 0.2);
      ctx.stroke();
    }

    ctx.restore();
  }
}

const petals = [];
const petalCount = 80;
let frame = 0;

for (let i = 0; i < petalCount; i++) {
  petals.push(new Petal());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => {
    p.update(frame);
    p.draw();
  });
  frame++;
  requestAnimationFrame(animate);
}

animate();