function initAnimations() {
    // Hero
    gsap.from('.hero-title span', {
        y: 200, duration: 1.5, stagger: 0.1, ease: "power4.out", skewY: 7
    });
    gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 1, delay: 0.5 });
    gsap.from('nav', { y: -100, opacity: 0, duration: 1, delay: 0.8 });

    // Marquee
    gsap.to(".marquee-track", { xPercent: -50, repeat: -1, duration: 10, ease: "linear" });

    // Horizontal Scroll
    const sections = gsap.utils.toArray(".panel");
    const track = document.querySelector(".horizontal-section");
    if (track) {
        let getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-wrapper",
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true, 
                end: () => "+=" + (track.scrollWidth - window.innerWidth), 
            }
        });

        // Parallax inside Horizontal
        sections.forEach(section => {
            const img = section.querySelector(".img-parallax");
            if(img) {
                gsap.to(img, {
                    xPercent: 20, scale: 1.1, ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: tween,
                        start: "left right",
                        end: "right left",
                        scrub: true,
                    }
                });
            }
        });
    }

    // Reveal Text
    document.querySelectorAll('.reveal-text').forEach(text => {
        gsap.fromTo(text, 
            { opacity: 0.2, y: 20 },
            { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: text, start: "top 80%", scrub: true, end: "top 50%" } }
        );
    });

    // Timeline Animation
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        // Line Progress
        gsap.to(".timeline-progress", {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top center",
                end: "bottom center",
                scrub: 0.5
            }
        });

        // Timeline Items pop in
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                opacity: 0,
                x: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1
                }
            });
            // Animate the dots
            const dot = item.querySelector('.timeline-dot');
            gsap.to(dot, {
                backgroundColor: "#ccff00",
                borderColor: "#ccff00",
                boxShadow: "0 0 10px #ccff00",
                scrollTrigger: {
                    trigger: item,
                    start: "top center",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // Pulse
    gsap.to(".pulse-glow", { scale: 1.5, opacity: 0, duration: 2, repeat: -1, ease: "power1.out" });
}
