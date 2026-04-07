// Initialize UI Icons
lucide.createIcons();

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * MOUSE CURSOR LOGIC
 */
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power2.out"
    });
});

/**
 * FLAVOR DATA OBJECT
 */
const flavorData = {
    classic: {
        name: "CRIMSON",
        label: "Classic",
        colors: ["#ef4444", "#7f1d1d"],
        glow: "#ff0000"
    },
    zero: {
        name: "MIDNIGHT",
        label: "Zero Sugar",
        colors: ["#3f3f46", "#09090b"],
        glow: "#ffffff"
    },
    blue: {
        name: "ELECTRIC",
        label: "Blue Razz",
        colors: ["#3b82f6", "#1e3a8a"],
        glow: "#0066ff"
    },
    mango: {
        name: "TROPIC",
        label: "Mango Bolt",
        colors: ["#f97316", "#7c2d12"],
        glow: "#ff9900"
    }
};

/**
 * SWITCH FLAVOR FUNCTION
 * Updates the theme, product colors, and text with GSAP
 */
function switchFlavor(key) {
    const data = flavorData[key];
    
    // Update Swatch Active State
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    event.target.classList.add('active');

    // 1. Animate Can Background
    gsap.to("#main-can", {
        background: `linear-gradient(to bottom, ${data.colors[0]}, ${data.colors[1]})`,
        duration: 0.6,
        ease: "power2.inOut"
    });

    // 2. Animate Background Glow
    gsap.to("#main-glow", {
        "--accent-glow": data.glow,
        duration: 1
    });

    // 3. Update Text Content with Fade Effect
    const title = document.getElementById('flavor-title');
    const label = document.getElementById('can-label');

    gsap.timeline()
        .to([title, label], { opacity: 0, y: 10, duration: 0.2 })
        .call(() => {
            title.innerText = data.name;
            label.innerText = data.label;
        })
        .to([title, label], { opacity: 1, y: 0, duration: 0.4, ease: "back.out" });

    // 4. Subtle Can "Pop" Animation
    gsap.fromTo("#main-can", { scale: 0.95 }, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" });
}

/**
 * INITIAL LOAD ANIMATIONS
 */
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.from("nav", { y: -100, opacity: 0, duration: 1, ease: "power4.out" })
      .from("#hero-text h1", { x: -100, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.5")
      .from("#hero-text p", { opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".can-wrap", { scale: 0, rotate: -20, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }, "-=1");

    // Continuous Floating Animation
    gsap.to("#main-can", {
        y: -15,
        rotate: 1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

/**
 * SCROLL REVEAL ANIMATIONS
 */
gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power2.out"
    });
});

gsap.from(".flavor-card", {
    scrollTrigger: {
        trigger: "#flavors",
        start: "top 70%",
    },
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: "power3.out"
});