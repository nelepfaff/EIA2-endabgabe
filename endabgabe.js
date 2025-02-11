"use strict";
const canvas = document.getElementById("fireworkCanvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
let rockets = [];
const currentRocket = {
    radius: 50,
    particles: 100,
    color: "#ff0000",
    type: "circle"
};
canvas.addEventListener("click", (e) => {
    launchRocket(e.clientX, e.clientY);
});
document.getElementById("radius").addEventListener("input", (e) => {
    currentRocket.radius = +e.target.value;
});
document.getElementById("particles").addEventListener("input", (e) => {
    currentRocket.particles = +e.target.value;
});
document.getElementById("color").addEventListener("input", (e) => {
    currentRocket.color = e.target.value;
});
document.getElementById("rocketType").addEventListener("change", (e) => {
    currentRocket.type = e.target.value;
});
document.getElementById("launchRocket").addEventListener("click", () => {
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        launchRocket(x, y);
    }
});
function launchRocket(x, y) {
    rockets.push({
        ...currentRocket,
        x,
        y,
        time: Date.now()
    });
}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const now = Date.now();
    rockets = rockets.filter(rocket => now - rocket.time < 2000);
    rockets.forEach((rocket) => {
        for (let i = 0; i < rocket.particles; i++) {
            let angle = (Math.PI * 2 * i) / rocket.particles;
            let speed = Math.random() * rocket.radius;
            let px, py;
            if (rocket.type === "star") {
                speed *= (i % 2 === 0 ? 1 : 0.5);
            }
            else if (rocket.type === "spiral") {
                angle += (Math.PI / 4) * (i % 2);
            }
            px = rocket.x + Math.cos(angle) * speed;
            py = rocket.y + Math.sin(angle) * speed;
            ctx.fillStyle = rocket.color;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    requestAnimationFrame(render);
}
render();
//# sourceMappingURL=endabgabe.js.map