gsap.registerPlugin(ScrollTrigger);

// 1. Lenis + GSAP Sync
let lenis;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0); 
}

// 2. Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

const xSetDot = gsap.quickSetter(cursorDot, "x", "px");
const ySetDot = gsap.quickSetter(cursorDot, "y", "px");

window.addEventListener('mousemove', (e) => {
    xSetDot(e.clientX);
    ySetDot(e.clientY);
    gsap.to(cursorOutline, {
        x: e.clientX, y: e.clientY,
        duration: 0.15, ease: "power2.out"
    });
});

const hoverables = document.querySelectorAll('.hoverable');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
});

// 3. Loader & Init
function startLoader() {
    const tl = gsap.timeline();
    tl.to('.loader-text span', { y: 0, duration: 1, ease: "power4.out" })
      .to('.loader-text', { opacity: 0, duration: 0.5, delay: 0.5 })
      .to('.loader', { height: 0, duration: 1, ease: "power4.inOut" })
      .add(() => initAnimations(), "-=0.5");
}

window.onload = () => {
    const loaderTitle = document.querySelector('.loader-text');
    if (loaderTitle) {
        loaderTitle.innerHTML = `<span>${loaderTitle.innerText}</span>`;
        startLoader();
    }
};
