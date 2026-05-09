const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let shootingStars = [];
let backgroundStars = [];
let flowerProgress = 0;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', init);
init();

function comenzar() {
    document.getElementById('overlay').style.display = 'none';
    const musica = document.getElementById('musica');
    musica.volume = 0.6;
    musica.play();
    
    document.getElementById('titulo-superior').classList.add('visible');
    
    // El mensaje aparece un poco después para dar protagonismo a la flor
    setTimeout(() => document.getElementById('mensaje').classList.add('visible'), 5000);

    createBackgroundStars();
    animate();
}

function createBackgroundStars() {
    for (let i = 0; i < 100; i++) {
        backgroundStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            v: Math.random() * 0.4 + 0.1,
            blink: Math.random() * 0.05
        });
    }
}

function drawShootingStars() {
    if (Math.random() < 0.04) {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: 0,
            len: Math.random() * 70 + 40,
            v: Math.random() * 9 + 4,
            o: 1
        });
    }

    shootingStars.forEach((p, i) => {
        ctx.strokeStyle = `rgba(255, 0, 127, ${p.o})`; // ROSA NEÓN
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.len, p.y - p.len);
        ctx.stroke();
        p.x -= p.v; p.y += p.v; p.o -= 0.012;
        if (p.o <= 0) shootingStars.splice(i, 1);
    });
}

function drawFlower() {
    if (flowerProgress < 1) flowerProgress += 0.005;

    const centerX = canvas.width / 2;
    // AJUSTE EXPERTO: Subimos la flor para que no la tape el mensaje
    const centerY = canvas.height * 0.38; 
    const petals = 14;
    // AJUSTE EXPERTO: Reducimos el radio un poco para celulares
    const radius = Math.min(canvas.width, canvas.height) * 0.26 * flowerProgress;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Date.now() * 0.0004);

    for (let j = 0; j < 4; j++) {
        ctx.rotate(Math.PI / petals);
        for (let i = 0; i < petals; i++) {
            ctx.rotate((Math.PI * 2) / petals);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(radius / 2, -radius / (2.5 + j), radius, 0);
            ctx.quadraticCurveTo(radius / 2, radius / (2.5 + j), 0, 0);
            
            ctx.strokeStyle = `rgba(255, 0, 127, ${0.85 - j * 0.15})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.fillStyle = `rgba(255, 20, 147, ${0.08 - j * 0.01})`;
            ctx.fill();
        }
    }
    ctx.restore();
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    backgroundStars.forEach(s => {
        let opacity = Math.abs(Math.sin(Date.now() * s.blink)) * 0.6 + 0.4;
        ctx.fillStyle = `rgba(255, 102, 178, ${opacity})`; // ESTRELLAS ROSAS
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        s.y -= s.v;
        if (s.y < 0) s.y = canvas.height;
    });

    drawShootingStars();
    drawFlower();

    requestAnimationFrame(animate);
}
