window.onload = () => {
    // 1. 팝업 내부 티켓 등장 & 스탬프 애니메이션
    const tl = gsap.timeline();

    tl.from(".logo, .status-badge", { opacity: 0, y: -10, duration: 0.6 })
      .from(".main-title", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .from(".memorial-ticket", { opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(".stamp", { opacity: 1, scale: 1, rotation: -15, duration: 0.4, ease: "back.out(2)" })
      .from(".final-msg", { opacity: 0, y: 10, duration: 0.6 }, "-=0.2");

    // 2. 팝업 닫기 버튼 로직
    const closeBtn = document.getElementById("close-popup");
    const popup = document.getElementById("recruit-popup");

    closeBtn.addEventListener("click", () => {
        gsap.to(popup, {
            opacity: 0,
            scale: 0.95,
            backdropFilter: "blur(0px)",
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
                popup.style.display = "none";
                document.body.style.overflowY = "auto";
                
                // 메인 사이트 텍스트 애니메이션 트리거
                gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1, ease: "power4.out" });
                gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 1, delay: 0.2 });
                gsap.from(".explore-btn", { opacity: 0, y: 20, duration: 1, delay: 0.4 });
            }
        });
    });

    // 3. 우주 테마 마우스 Parallax (시차) 효과 - 대폭 강화!
    const nebula = document.getElementById("nebula");
    const grid = document.getElementById("grid");
    const stardust = document.querySelector(".stardust"); // 별먼지도 애니메이션에 추가
    
    document.addEventListener("mousemove", (e) => {
        // 움직임 폭을 기존 20에서 100으로 대폭 증가시켜 확연한 움직임을 줌
        const x = (e.clientX / window.innerWidth - 0.5) * 100; 
        const y = (e.clientY / window.innerHeight - 0.5) * 100;

        // 1번 레이어: 성운 (가장 멀리서 크게 반대로 움직임 + 약간의 회전)
        gsap.to(nebula, {
            x: -x * 1.5,
            y: -y * 1.5,
            rotation: x * 0.05, 
            duration: 1.5,
            ease: "power2.out"
        });

        // 2번 레이어: 별먼지 (중간 깊이에서 부드럽게 따라감)
        gsap.to(stardust, {
            x: -x * 0.5,
            y: -y * 0.5,
            duration: 1.5,
            ease: "power2.out"
        });

        // 3번 레이어: 전면 그리드 (마우스 방향과 같은 쪽으로 빠르게 움직여 입체감 극대화)
        gsap.to(grid, {
            x: x * 0.8,
            y: y * 0.8,
            duration: 1.5,
            ease: "power2.out"
        });
    });
};