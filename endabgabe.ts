// Holen des Canvas-Elements und Initialisierung des 2D-Zeichenkontexts
const canvas = document.getElementById("fireworkCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Funktion, um die Größe des Canvas an die Fenstergröße anzupassen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
// Event-Listener für die Fenstergrößenänderung
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initiales Setzen der Canvas-Größe

// Definition des Rocket-Interfaces für Raketenobjekte
interface Rocket {
    radius: number;
    particles: number;
    color: string;
    type: string;
    x: number;
    y: number;
    time: number;
}

let rockets: Rocket[] = []; // Array zur Speicherung der gestarteten Raketen

// Standardwerte für die aktuelle Rakete
const currentRocket: Omit<Rocket, 'x' | 'y' | 'time'> = {
    radius: 50,
    particles: 100,
    color: "#ff0000",
    type: "circle"
};

// Event-Listener für Klicks auf das Canvas zum Starten von Raketen
canvas.addEventListener("click", (e) => {
    launchRocket(e.clientX, e.clientY); // Rakete wird an der Klickposition gestartet
});

// Event-Listener für die Eingabefelder zur Anpassung der Raketenparameter
document.getElementById("radius")!.addEventListener("input", (e) => {
    currentRocket.radius = +(e.target as HTMLInputElement).value;
});

document.getElementById("particles")!.addEventListener("input", (e) => {
    currentRocket.particles = +(e.target as HTMLInputElement).value;
});

document.getElementById("color")!.addEventListener("input", (e) => {
    currentRocket.color = (e.target as HTMLInputElement).value;
});

document.getElementById("rocketType")!.addEventListener("change", (e) => {
    currentRocket.type = (e.target as HTMLSelectElement).value;
});

// Event-Listener für den "Raketen starten"-Button
// Startet mehrere Raketen zufällig auf dem Bildschirm
document.getElementById("launchRocket")!.addEventListener("click", () => {
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        launchRocket(x, y);
    }
});

// Funktion zum Hinzufügen einer Rakete zum rockets-Array
function launchRocket(x: number, y: number) {
    rockets.push({
        ...currentRocket,
        x,
        y,
        time: Date.now() // Startzeit der Rakete
    });
}

// Render-Funktion für die kontinuierliche Animation des Feuerwerks
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Transparenter Hintergrund für Nachzieheffekt
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();
    rockets = rockets.filter(rocket => now - rocket.time < 2000); // Entfernt alte Raketen nach 2 Sekunden

    // Zeichnen der Partikel jeder Rakete
    rockets.forEach((rocket) => {
        for (let i = 0; i < rocket.particles; i++) {
            let angle = (Math.PI * 2 * i) / rocket.particles; // Berechnung des Winkels
            let speed = Math.random() * rocket.radius; // Geschwindigkeit basierend auf dem Radius
            let px, py;

            // Anpassung der Partikelbewegung basierend auf dem Raketentyp
            if (rocket.type === "star") {
                speed *= (i % 2 === 0 ? 1 : 0.5); // Sternmuster mit abwechselnden Abständen
            } else if (rocket.type === "spiral") {
                angle += (Math.PI / 4) * (i % 2); // Spiralmuster durch Winkelverschiebung
            }

            // Berechnung der Partikelpositionen
            px = rocket.x + Math.cos(angle) * speed;
            py = rocket.y + Math.sin(angle) * speed;

            // Zeichnen des Partikels
            ctx.fillStyle = rocket.color;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    requestAnimationFrame(render); // Wiederholung der Animation
}

render(); // Start der Animationsschleife
