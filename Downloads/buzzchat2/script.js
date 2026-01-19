// script.js

// Variables to store mouse position
let mouseX = 0;
let mouseY = 0;

// Update variables on mouse move (Cheap operation)
document.addEventListener("mousemove", (e) => {
    mouseX = (window.innerWidth - e.pageX * 2) / 250;
    mouseY = (window.innerHeight - e.pageY * 2) / 250;
});

// Update DOM inside animation frame (Expensive operation, but throttled)
function animate() {
    const items = document.querySelectorAll(".hero-screen .float-item, .join-section .join-float");
    
    items.forEach((item) => {
        const speed = item.getAttribute("data-speed") || 2;
        const xMove = mouseX * speed;
        const yMove = mouseY * speed;
        
        // Use translate3d to force hardware acceleration
        item.style.transform = `translate3d(${xMove}px, ${yMove}px, 0) rotate(var(--rot, 0deg))`;
    });

    requestAnimationFrame(animate);
}

// Start the animation loop
animate();

// --- Interactive Menu Logic (Unchanged) ---
const menuItems = document.querySelectorAll('.menu-item');
const scenes = document.querySelectorAll('.scene-layer');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const targetId = item.getAttribute('data-target');
        scenes.forEach(scene => {
            scene.classList.remove('visible');
            if(scene.id === targetId) {
                scene.classList.add('visible');
            }
        });
    });
});