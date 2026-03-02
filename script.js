document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("recruit-popup");
    const closeBtn = document.getElementById("close-popup");
    const spotlight = document.getElementById("spotlight");

    // 1. 팝업 카드 등장 애니메이션
    if(popup) {
        const tl = gsap.timeline();
        tl.from(".popup-card", { opacity: 0, scale: 0.95, y: 30, duration: 0.6, ease: "power3.out" })
          .from(".closed-header", { opacity: 0, y: -10, duration: 0.6 }, "-=0.2")
          .from(".popup-title", { opacity: 0, y: 20, scale: 0.95, duration: 0.8, ease: "power4.out" }, "-=0.4")
          .from(".memorial-ticket", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.5")
          .to(".stamp", { opacity: 1, scale: 1, rotation: -15, duration: 0.35, ease: "back.out(1.7)" }) 
          .from(".final-msg, .sns-links, .copyright", { opacity: 0, y: 10, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.2");
    }

    // 2. 메인 화면 타이포그래피 등장
    function playMainAnimation() {
        const mainTl = gsap.timeline();
        mainTl.to(".title-word", { 
            y: "0%", 
            duration: 1, 
            stagger: 0.15, 
            ease: "expo.out" 
        })
        .to(".hero-bottom", { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out" 
        }, "-=0.5");
    }

    // 3. 팝업 닫기 버튼 이벤트
    if (closeBtn && popup) {
        closeBtn.addEventListener("click", () => {
            gsap.to(popup, {
                opacity: 0,
                y: -30,
                duration: 0.5,
                ease: "power3.in",
                onComplete: () => {
                    popup.style.display = "none"; 
                    document.body.style.overflowY = "auto";
                    playMainAnimation(); 
                }
            });
        });
    } else {
        playMainAnimation();
    }

    // 4. 은은한 Solar Lime 스포트라이트 마우스 효과
    window.addEventListener("mousemove", (e) => {
        if(spotlight) {
            spotlight.style.setProperty('--x', `${e.clientX}px`);
            spotlight.style.setProperty('--y', `${e.clientY}px`);
        }
    });
});