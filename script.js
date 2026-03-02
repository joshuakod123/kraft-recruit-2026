window.addEventListener('DOMContentLoaded', () => {
    // 0. 도장(Stamp) 초기 위치 완벽 세팅 (CSS 충돌 방지)
    gsap.set(".stamp", { xPercent: -50, yPercent: -50, scale: 2, rotation: -15, z: 30, opacity: 0 });

    // === 1. 리크루트 마감 팝업 내부 티켓 등장 애니메이션 ===
    const tl = gsap.timeline();

    tl.from(".logo, .status-badge", { opacity: 0, y: -10, duration: 0.6 })
      .from(".main-title", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .from(".memorial-ticket", { opacity: 0, scale: 0.95, rotationX: 10, duration: 0.6, ease: "power2.out" }, "-=0.4")
      // 도장 쾅! (위치 이탈 없이 그 자리에서 꽂힘)
      .to(".stamp", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" })
      .from(".final-msg", { opacity: 0, y: 10, duration: 0.6 }, "-=0.2");

    // === 2. 리크루트 팝업 닫기 버튼 로직 (클릭 무조건 보장) ===
    const closeBtn = document.getElementById("close-popup");
    const popup = document.getElementById("recruit-popup");
    const popupContent = popup.querySelector(".popup-content");

    if (closeBtn && popup) {
        closeBtn.addEventListener("click", () => {
            // 콘텐츠 박스 먼저 작아지며 사라지기
            gsap.to(popupContent, { scale: 0.95, opacity: 0, duration: 0.4, ease: "power2.inOut" });
            
            // 배경 페이드아웃 후 완전 종료
            gsap.to(popup, {
                opacity: 0, backdropFilter: "blur(0px)", duration: 0.5, delay: 0.1,
                onComplete: () => {
                    popup.style.display = "none";
                    document.body.style.overflowY = "auto"; // 메인 스크롤 살리기
                    
                    // 메인 사이트 텍스트 애니메이션 시작
                    gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1, ease: "power4.out" });
                    gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 1, delay: 0.2 });
                    gsap.from(".explore-btn", { opacity: 0, y: 20, duration: 1, delay: 0.4 });
                }
            });
        });
    }

    // === 3. 배경 마우스 Parallax & 스포트라이트 (Ambient Light) ===
    const ambientLight = document.getElementById("ambient-light");
    const grid = document.getElementById("grid");
    const stardust = document.querySelector(".stardust");
    
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 100; 
        const y = (e.clientY / window.innerHeight - 0.5) * 100;

        gsap.to(ambientLight, { x: e.clientX, y: e.clientY, duration: 0.8, ease: "power2.out" });
        gsap.to(stardust, { x: -x * 0.5, y: -y * 0.5, duration: 1.5, ease: "power2.out" });
        gsap.to(grid, { x: x * 0.8, y: y * 0.8, duration: 1.5, ease: "power2.out" });
    });

    // === 4. 기존 티켓 홀로그램 3D 호버 인터랙션 ===
    const ticket = document.getElementById("ticket");
    const ticketGlare = document.querySelector("#ticket .glare");

    if(ticket) {
        ticket.addEventListener("mousemove", (e) => {
            const rect = ticket.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;

            gsap.to(ticket, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, duration: 0.4, ease: "power1.out" });
            if(ticketGlare) {
                gsap.to(ticketGlare, { opacity: 1, backgroundPosition: `${x}px ${y}px`, duration: 0.4 });
            }
        });

        ticket.addEventListener("mouseleave", () => {
            gsap.to(ticket, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });
            if(ticketGlare) gsap.to(ticketGlare, { opacity: 0, duration: 0.6 });
        });
    }

    // === 5. MEMBERS 섹션 로직 (Stagger 등장, 3D Hover & Click Flip) ===
    const navMembersBtn = document.getElementById("nav-members");
    const membersOverlay = document.getElementById("members-overlay");
    const closeMembersBtn = document.getElementById("close-members");
    const memberCardWrappers = document.querySelectorAll(".member-card-wrapper");

    navMembersBtn.addEventListener("click", (e) => {
        e.preventDefault();
        membersOverlay.style.display = "flex";
        document.body.style.overflowY = "hidden";

        const membersTl = gsap.timeline();
        membersTl.to(membersOverlay, { opacity: 1, backdropFilter: "blur(20px)", duration: 0.5 })
                 .from(".members-header, .dept-title", { opacity: 0, y: -20, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.2")
                 .from(memberCardWrappers, { 
                     opacity: 0, y: 50, rotationX: 15, 
                     stagger: 0.05, 
                     duration: 0.6, ease: "back.out(1.5)" 
                 }, "-=0.4");
    });

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

    memberCardWrappers.forEach(wrapper => {
        const frontGlare = wrapper.querySelector(".member-card-front .m-glare");
        
        wrapper.addEventListener("mousemove", (e) => {
            if(wrapper.classList.contains("flipped")) return;

            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(wrapper, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, duration: 0.4, ease: "power1.out" });
            if(frontGlare) {
                gsap.to(frontGlare, { opacity: 1, backgroundPosition: `${x}px ${y}px`, duration: 0.4 });
            }
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
});