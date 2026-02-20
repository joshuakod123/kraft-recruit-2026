window.onload = () => {
    const tl = gsap.timeline();

    tl.from(".closed-header", { opacity: 0, y: -20, duration: 1 })
      .from(".main-title", { 
        opacity: 0, 
        y: 50, 
        scale: 0.9, 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=0.5")
      .from(".ticket-wrapper", { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        ease: "power3.out" 
      }, "-=0.8")
      .to(".stamp", { 
        opacity: 1, 
        scale: 1, 
        rotation: -15, 
        duration: 0.4, 
        ease: "bounce.out" 
      })
      .from(".final-msg, .sns-links, .copyright", { 
        opacity: 0, 
        stagger: 0.2, 
        duration: 1 
      }, "-=0.2");
};
