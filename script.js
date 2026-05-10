window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    document.body.style.overflowY = "hidden";

    gsap.set(".stamp", { xPercent: -50, yPercent: -50, scale: 2, rotation: -15, z: 30, opacity: 0 });
    // Pre-state: hide intro overlay components properly
    gsap.set(".intro-overlay", { display: "none" });
    gsap.set(".light-cones", { opacity: 0 });
    gsap.set(".lens-flare", { opacity: 0 });
    gsap.set(".side-hud", { opacity: 0 });

    // === 1. Recruit popup intro ===
    const tl = gsap.timeline();
    tl.from(".logo, .status-badge", { opacity: 0, y: -10, duration: 0.6 })
      .from(".main-title", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .from(".memorial-ticket", { opacity: 0, scale: 0.95, rotationX: 10, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(".stamp", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" })
      .from(".final-msg", { opacity: 0, y: 10, duration: 0.6 }, "-=0.2");

    // === 2. Close popup → INTRO CINEMATIC → HERO ===
    const closeBtn = document.getElementById("close-popup");
    const popup = document.getElementById("recruit-popup");
    const popupContent = popup.querySelector(".popup-content");

    if (closeBtn && popup) {
        closeBtn.addEventListener("click", () => {
            gsap.to(popupContent, { scale: 0.95, opacity: 0, duration: 0.4, ease: "power2.inOut" });
            gsap.to(popup, {
                opacity: 0, backdropFilter: "blur(0px)", duration: 0.5, delay: 0.1,
                onComplete: () => {
                    popup.style.display = "none";
                    document.body.style.overflowY = "auto";
                    playIntroSequence();
                }
            });
        });
    }

    // ============ THE ENTRANCE ============
    function playIntroSequence() {
        const intro = document.getElementById("intro-overlay");
        intro.style.display = "flex";
        gsap.set(".ibar", { 
            scaleY: 1, transformOrigin: "top center",
            backgroundColor: "var(--black)"
        });
        gsap.set(".intro-text", { opacity: 0, y: 20 });
        gsap.set(".intro-flash", { opacity: 0 });

        const introTl = gsap.timeline({
            onComplete: () => {
                intro.style.display = "none";
                initHeroAnimation();
                setTimeout(() => {
                    initScrollAnimations();
                    ScrollTrigger.refresh();
                }, 100);
            }
        });

        introTl
          // Phase A: KRAFT logo emerges
          .to(".intro-text", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
          .to(".intro-line", { 
              letterSpacing: "16px", duration: 1.4, ease: "power2.out" 
          }, "-=0.4")
          // Phase B: Camera flash
          .to(".intro-flash", { opacity: 1, duration: 0.1, ease: "power2.in" }, "+=0.4")
          .to(".intro-flash", { opacity: 0, duration: 0.45, ease: "power2.out" })
          // Phase C: Logo fades, then horizontal bars wipe up smoothly to reveal site
          .to(".intro-text", { opacity: 0, duration: 0.35, ease: "power2.in" }, "-=0.4")
          .to(".ibar", { 
              scaleY: 0, duration: 0.9, 
              stagger: { amount: 0.4, from: "start" },
              ease: "expo.inOut"
          }, "-=0.1");
    }

    // ============ HERO ENTRANCE ============
    function initHeroAnimation() {
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        // 1. Stage floor & background ambient
        heroTl
          // 2. Spotlights mount and turn on
          .from(".spotlight", { 
              opacity: 0, scale: 0, duration: 0.5, stagger: 0.12, ease: "back.out(2.5)" 
          })
          // 3. Light cones fade in (stage gets lit)
          .to(".light-cones", { opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.3")
          // 4. Lens flares pop
          .to(".lens-flare", { opacity: 1, duration: 1.5, ease: "power2.out" }, "-=1")
          // 5. Navbar drops in
          .from(".navbar", { y: -40, opacity: 0, duration: 0.7 }, "-=1.3")
          // 6. Tag pops up
          .from(".hero-tag", { 
              opacity: 0, y: 20, scale: 0.9, duration: 0.6 
          }, "-=0.9")
          // 7. Title characters cascade in (the IDOL ENTRANCE)
          .from(".hero-title .char", { 
              opacity: 0, yPercent: 100, rotateX: -90,
              duration: 0.9, ease: "back.out(1.4)",
              stagger: { amount: 0.7, from: "start" },
              clearProps: "transform,opacity"
          }, "-=0.5")
          // 8. Accent characters get an extra flash
          .from(".hero-title .accent-char", { 
              color: "#ffffff", duration: 0.4, stagger: 0.05,
              clearProps: "color"
          }, "-=0.7")
          // 9. Sub copy + buttons
          .from(".hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
          .from(".hero-cta .explore-btn", { 
              opacity: 0, y: 20, scale: 0.9, duration: 0.5, stagger: 0.1 
          }, "-=0.4")
          .from(".hero-stats > *", { 
              opacity: 0, y: 20, duration: 0.5, stagger: 0.06 
          }, "-=0.3")
          // 10. HUD elements come online
          .to(".side-hud", { opacity: 1, duration: 0.6, stagger: 0.15 }, "-=0.6")
          .from(".scroll-indicator", { opacity: 0, duration: 0.6 }, "-=0.4");

        // Live HUD updates
        startHudUpdates();
    }

    function startHudUpdates() {
        const timeEl = document.getElementById("hud-time");
        const bpmEl = document.getElementById("hud-bpm");
        if (timeEl) {
            const updateTime = () => {
                const d = new Date();
                const hh = String(d.getHours()).padStart(2, '0');
                const mm = String(d.getMinutes()).padStart(2, '0');
                const ss = String(d.getSeconds()).padStart(2, '0');
                timeEl.textContent = `${hh}:${mm}:${ss}`;
            };
            updateTime();
            setInterval(updateTime, 1000);
        }
        if (bpmEl) {
            setInterval(() => {
                const bpm = 124 + Math.floor(Math.random() * 8);
                bpmEl.textContent = bpm;
            }, 2400);
        }
    }

    // ============ SCROLL ANIMATIONS ============
    function initScrollAnimations() {
        gsap.utils.toArray(".section-header").forEach(header => {
            gsap.from(header.querySelectorAll(".section-num, .section-title, .section-sub"), {
                scrollTrigger: { trigger: header, start: "top 85%", toggleActions: "play none none none" },
                opacity: 0, y: 40, duration: 0.9, stagger: 0.12, ease: "power3.out"
            });
        });

        gsap.from(".about-text > *", {
            scrollTrigger: { trigger: ".about-grid", start: "top 80%", toggleActions: "play none none none" },
            opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: "power3.out"
        });
        gsap.from(".ab-card", {
            scrollTrigger: { trigger: ".about-cards", start: "top 85%", toggleActions: "play none none none" },
            opacity: 0, x: 50, duration: 0.7, stagger: 0.12, ease: "power3.out"
        });

        gsap.from(".dept-card", {
            scrollTrigger: { trigger: ".depts-grid", start: "top 90%", toggleActions: "play none none none" },
            opacity: 0, y: 80, scale: 0.92, rotationX: 20,
            duration: 1, stagger: { amount: 0.6, from: "start" }, 
            ease: "expo.out", immediateRender: false,
            transformOrigin: "center top"
        });

        gsap.utils.toArray(".phase").forEach((phase) => {
            const card = phase.querySelector(".phase-card");
            const marker = phase.querySelector(".phase-marker");
            gsap.from(card, {
                scrollTrigger: { trigger: phase, start: "top 85%", toggleActions: "play none none none" },
                opacity: 0, x: -60, duration: 0.9, ease: "expo.out", immediateRender: false
            });
            gsap.from(marker, {
                scrollTrigger: { trigger: phase, start: "top 85%", toggleActions: "play none none none" },
                opacity: 0, scale: 0, duration: 0.6, ease: "back.out(2)", immediateRender: false
            });
        });

        gsap.from(".phase-line", {
            scrollTrigger: { trigger: ".phase-track", start: "top 80%", end: "bottom 60%", scrub: 1 },
            scaleY: 0, transformOrigin: "top center"
        });

        gsap.from(".join-inner > *", {
            scrollTrigger: { trigger: ".join-section", start: "top 75%", toggleActions: "play none none none" },
            opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: "power3.out"
        });

        gsap.fromTo(".curtain-left", { x: 0 }, 
            { x: -200, scrollTrigger: { trigger: ".join-section", start: "top 80%", end: "center center", scrub: 1.2 } });
        gsap.fromTo(".curtain-right", { x: 0 }, 
            { x: 200, scrollTrigger: { trigger: ".join-section", start: "top 80%", end: "center center", scrub: 1.2 } });

        gsap.to(".join-bg-text", {
            scrollTrigger: { trigger: ".join-section", start: "top bottom", end: "bottom top", scrub: 1 },
            xPercent: -10, ease: "none"
        });

        gsap.utils.toArray(".section-title").forEach(title => {
            gsap.from(title, {
                scrollTrigger: { trigger: title, start: "top 88%", toggleActions: "play none none none" },
                opacity: 0, y: 40, skewY: 4, duration: 1, ease: "expo.out"
            });
        });
    }

    // ============ CURSOR & PARALLAX ============
    const cursorGlow = document.getElementById("cursor-glow");
    const ambientLight = document.getElementById("ambient-light");
    const grid = document.getElementById("grid");
    const stardust = document.querySelector(".stardust");
    
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 100; 
        const y = (e.clientY / window.innerHeight - 0.5) * 100;

        gsap.to(cursorGlow, { x: e.clientX, y: e.clientY, opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(ambientLight, { x: e.clientX, y: e.clientY, duration: 0.8, ease: "power2.out" });
        gsap.to(stardust, { x: -x * 0.3, y: -y * 0.3, duration: 1.5, ease: "power2.out" });
        gsap.to(grid, { x: x * 0.5, y: y * 0.5, duration: 1.5, ease: "power2.out" });
    });
    document.addEventListener("mouseleave", () => {
        gsap.to(cursorGlow, { opacity: 0, duration: 0.4 });
    });

    // ============ MAGNETIC BUTTONS ============
    document.querySelectorAll('.magnetic').forEach(btn => {
        const text = btn.querySelector('.btn-text');
        const svg = btn.querySelector('svg');
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.25, y: y * 0.4, duration: 0.5, ease: "power2.out" });
            if (text) gsap.to(text, { x: x * 0.15, y: y * 0.25, duration: 0.5, ease: "power2.out" });
            if (svg) gsap.to(svg, { x: x * 0.2, y: y * 0.3, duration: 0.5, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
            if (text) gsap.to(text, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
            if (svg) gsap.to(svg, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        });
    });

    // ============ HERO TITLE — CHARACTER HOVER (CSS handles via :hover) ============

    // ============ TICKET 3D ============
    const ticket = document.getElementById("ticket");
    const ticketGlare = document.querySelector("#ticket .glare");
    if(ticket) {
        ticket.addEventListener("mousemove", (e) => {
            const rect = ticket.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;  
            const cx = rect.width / 2; const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -15; const rotateY = ((x - cx) / cx) * 15;
            gsap.to(ticket, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, duration: 0.4, ease: "power1.out" });
            if(ticketGlare) gsap.to(ticketGlare, { opacity: 1, backgroundPosition: `${x}px ${y}px`, duration: 0.4 });
        });
        ticket.addEventListener("mouseleave", () => {
            gsap.to(ticket, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });
            if(ticketGlare) gsap.to(ticketGlare, { opacity: 0, duration: 0.6 });
        });
    }

    // ============ DEPT CARDS 3D + SPOTLIGHT ============
    document.querySelectorAll(".dept-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const cx = rect.width / 2; const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -6; const rotateY = ((x - cx) / cx) * 6;
            gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, duration: 0.4, ease: "power1.out" });
            const xPct = (x / rect.width) * 100;
            const yPct = (y / rect.height) * 100;
            card.style.setProperty('--mx', xPct + '%');
            card.style.setProperty('--my', yPct + '%');
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        });
    });

    // ============ PHASE TILT ============
    document.querySelectorAll(".phase-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const cx = rect.width / 2; const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -3; const rotateY = ((x - cx) / cx) * 3;
            gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1200, duration: 0.4 });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });
        });
    });

    // ============ MEMBERS OVERLAY ============
    const navMembersBtn = document.getElementById("nav-members");
    const membersOverlay = document.getElementById("members-overlay");
    const closeMembersBtn = document.getElementById("close-members");
    const memberCardWrappers = document.querySelectorAll(".member-card-wrapper");

    if (navMembersBtn) {
        navMembersBtn.addEventListener("click", (e) => {
            e.preventDefault();
            membersOverlay.style.display = "flex";
            document.body.style.overflowY = "hidden";
            const membersTl = gsap.timeline();
            membersTl.to(membersOverlay, { opacity: 1, backdropFilter: "blur(20px)", duration: 0.5 })
                     .from(".members-header, .dept-title-overlay", { opacity: 0, y: -20, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.2")
                     .from(memberCardWrappers, { opacity: 0, y: 50, rotationX: 15, stagger: 0.05, duration: 0.6, ease: "back.out(1.5)" }, "-=0.4");
        });
    }
    if (closeMembersBtn) {
        closeMembersBtn.addEventListener("click", () => {
            gsap.to(membersOverlay, {
                opacity: 0, backdropFilter: "blur(0px)", duration: 0.5,
                onComplete: () => {
                    membersOverlay.style.display = "none";
                    document.body.style.overflowY = "auto";
                    memberCardWrappers.forEach(w => w.classList.remove("flipped"));
                }
            });
        });
    }
    memberCardWrappers.forEach(wrapper => {
        const frontGlare = wrapper.querySelector(".member-card-front .m-glare");
        wrapper.addEventListener("mousemove", (e) => {
            if(wrapper.classList.contains("flipped")) return;
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;  
            const cx = rect.width / 2; const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -10; const rotateY = ((x - cx) / cx) * 10;
            gsap.to(wrapper, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, duration: 0.4, ease: "power1.out" });
            if(frontGlare) gsap.to(frontGlare, { opacity: 1, backgroundPosition: `${x}px ${y}px`, duration: 0.4 });
        });
        wrapper.addEventListener("mouseleave", () => {
            gsap.to(wrapper, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });
            if(frontGlare) gsap.to(frontGlare, { opacity: 0, duration: 0.6 });
        });
        wrapper.addEventListener("click", () => {
            wrapper.classList.toggle("flipped");
            gsap.to(wrapper, { rotationX: 0, rotationY: 0, duration: 0.2 });
        });
    });

    // ============ SMOOTH SCROLL ============
    document.querySelectorAll('a[href^="#"]:not(#nav-members)').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});