const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let estrellas = [], meteoritos = [];

function comenzar() {
    document.getElementById('overlay').style.display = 'none';
    const musica = document.getElementById('musica');
    musica.volume = 0.6;
    musica.play().catch(e => console.log("Audio bloqueado"));

    const container = document.getElementById('petals-layer');
    for(let i = 0; i < 18; i++) {
        const petal = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        petal.setAttribute("cx", "100"); petal.setAttribute("cy", "75");
        petal.setAttribute("rx", "18"); petal.setAttribute("ry", "46");
        petal.classList.add("petal-geo");
        petal.style.transform = `rotate(${i * 20}deg)`;
        petal.style.transitionDelay = `${(i * 0.1) + 1.2}s`;
        container.appendChild(petal);
    }

    document.getElementById('titulo-superior').classList.add('visible');
    document.getElementById('flower-svg-container').classList.add('visible');
    setTimeout(() => document.getElementById('mensaje').classList.add('visible'), 5000);

    crearEspacio(); animarEspacio();
}

function crearEspacio() {
    for(let i=0; i<100; i++) estrellas.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, s: Math.random()*1.2});
    for(let i=0; i<2; i++) meteoritos.push(nuevoMeteorito());
}

function nuevoMeteorito() {
    return { x: Math.random()*canvas.width, y: 0, len: Math.random()*80+40, v: Math.random()*10+5, o: 1 };
}

function animarEspacio() {
    ctx.fillStyle = 'black'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    estrellas.forEach(e => { ctx.beginPath(); ctx.arc(e.x, e.y, e.s, 0, Math.PI*2); ctx.fill(); });
    meteoritos.forEach((m, i) => {
        ctx.strokeStyle = `rgba(255,255,255,${m.o})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x + m.len, m.y - m.len); ctx.stroke();
        m.x -= m.v; m.y += m.v; m.o -= 0.02;
        if(m.o <= 0) meteoritos[i] = nuevoMeteorito();
    });
    requestAnimationFrame(animarEspacio);
}
