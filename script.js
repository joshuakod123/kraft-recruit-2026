window.onload = () => {
    // GSAP 타임라인 설정
    const tl = gsap.timeline();

    // 1. 헤더와 타이틀 등장
    tl.from(".closed-header", { opacity: 0, y: -20, duration: 0.8 })
      .from(".main-title", { 
        opacity: 0, 
        y: 30, 
        scale: 0.95, 
        duration: 1, 
        ease: "power4.out" 
      }, "-=0.4")

    // 2. 티켓 등장
      .from(".memorial-ticket", { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.6")

    // 3. 스탬프 쾅! (가장 중요한 연출)
      .to(".stamp", { 
        opacity: 1, 
        scale: 1, 
        rotation: -15, 
        duration: 0.35, 
        ease: "back.out(1.7)" 
      })

    // 4. 하단 텍스트 및 링크 순차 등장
      .from(".final-msg, .sns-links, .copyright", { 
        opacity: 0, 
        y: 10,
        stagger: 0.15, 
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2");
};
