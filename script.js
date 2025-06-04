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





document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery-images img');

  galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      alert(`Você clicou na imagem: ${img.alt}`);
    });
  });
});


 window.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.block, #legado-text');
    blocks.forEach((block, i) => {
      block.style.opacity = 0;
      block.style.transform = 'translateY(50px)';
      setTimeout(() => {
        block.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        block.style.opacity = 1;
        block.style.transform = 'translateY(0)';
      }, 200 * i);
    });
  });






const flexRows = document.querySelectorAll('.flex-row');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  
  flexRows.forEach(row => {
    const rowTop = row.getBoundingClientRect().top;
    if(rowTop < triggerBottom) {
      row.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Partículas vermelhas sutis no fundo com Canvas
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

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 1 + Math.random() * 2;
    this.speedY = 0.2 + Math.random() * 0.6;
    this.alpha = 0.05 + Math.random() * 0.1;
  }
  
  update() {
    this.y -= this.speedY;
    if(this.y < 0) this.y = canvas.height;
  }
  
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 30, 30, ${this.alpha})`;
    ctx.shadowColor = 'rgba(255,30,30,0.5)';
    ctx.shadowBlur = 8;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];
for(let i=0; i<120; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

