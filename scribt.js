// Initialize Lucide Icons
lucide.createIcons();

// Custom Cursor Movement
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Floating Animation
gsap.to("#hero-can", {
    y: 30,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

gsap.to("#hero-can", {
    rotation: 5,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Reveal on Scroll
gsap.from(".hero-title", {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power4.out"
});

gsap.from(".product-card", {
    scrollTrigger: {
        trigger: "#shop",
        start: "top 80%"
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1
});

// Flavor Switcher Data
const flavors = {
    classic: {
        name: "Classic",
        desc: "The original bold spark. Perfectly balanced carbonation for the ultimate refresh.",
        color: "#ff2d2d",
        bg: "#ff2d2d"
    },
    lemon: {
        name: "Lemon Zest",
        desc: "A sharp, citrusy explosion that wakes up your senses. Tangy and electric.",
        color: "#facc15",
        bg: "#eab308"
    },
    berry: {
        name: "Berry Blast",
        desc: "Deep forest berries crushed into a fizzy masterpiece. Sweet, dark, and bold.",
        color: "#a855f7",
        bg: "#9333ea"
    },
    mint: {
        name: "Mint Fresh",
        desc: "Cooling menthol meets high-fizz refreshment. The ultimate chill-out drink.",
        color: "#22c55e",
        bg: "#16a34a"
    }
};

function updateFlavor(key) {
    const data = flavors[key];
    
    // Update Buttons
    document.querySelectorAll('.flavor-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === key) btn.classList.add('active');
    });

    // Update Hero Section Background
    gsap.to("#hero", { backgroundColor: data.bg, duration: 0.8 });

    // Update Can Visuals
    const heroCan = document.getElementById('hero-can');
    const previewCan = document.getElementById('preview-can');
    const flavorLabel = document.getElementById('hero-flavor-label');

    // Simple swap classes for the CSS Can
    [heroCan, previewCan].forEach(can => {
        can.className = `can-visual ${key} ${can.id === 'preview-can' ? 'scale-75' : ''}`;
    });

    // Animate Text Update
    gsap.to(["#flavor-name", "#flavor-desc", flavorLabel], {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => {
            document.getElementById('flavor-name').innerText = data.name;
            document.getElementById('flavor-name').style.color = data.color;
            document.getElementById('flavor-desc').innerText = data.desc;
            flavorLabel.innerText = key.toUpperCase();
            
            gsap.to(["#flavor-name", "#flavor-desc", flavorLabel], {
                opacity: 1,
                x: 0,
                duration: 0.3
            });
        }
    });
}

// Simple Cart Logic
let cartCount = 0;
function addToCart() {
    cartCount++;
    const badge = document.getElementById('cart-count');
    badge.innerText = cartCount;
    
    // Tiny bounce animation
    gsap.fromTo("#cart-icon", { scale: 0.8 }, { scale: 1, duration: 0.3, ease: "back.out" });
    
    // Magnetic effect or feedback could be added here
    alert("Added to cart! Let's FizzUp!");
}