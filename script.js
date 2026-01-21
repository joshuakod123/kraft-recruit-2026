gsap.registerPlugin(ScrollTrigger);

// 1. 히어로 섹션
const introTl = gsap.timeline();
introTl.fromTo(".kraft-text:nth-child(odd)", 
    { x: "-100vw", opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 }
)
.fromTo(".kraft-text:nth-child(even)", 
    { x: "100vw", opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, "<0.1"
)
.from(".scroll-down", { opacity: 0, y: -20, duration: 1 }, "-=0.5");


// 2. 히어로 흐려짐
gsap.to(".hero-section", {
    opacity: 0,
    scale: 0.9,
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});


// 3. 앱 섹션
const track = document.querySelector(".phones-track");
const trackWidth = track.scrollWidth;
gsap.set(track, { x: window.innerWidth }); 

gsap.to(track, {
    x: -trackWidth, 
    ease: "none",
    scrollTrigger: {
        trigger: ".app-section",
        start: "top top", 
        end: "+=3000",    
        pin: true,        
        scrub: 1,         
        anticipatePin: 1
    }
});


// 4. [NEW] 커리큘럼 인터랙션 & 자동 리셋
const timelineList = document.querySelector(".timeline-list");
const timelineItems = document.querySelectorAll(".timeline-item");

// (1) 스크롤 등장 효과
gsap.utils.toArray(timelineItems).forEach((item, i) => {
    gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        delay: i * 0.05
    });

    // (2) [NEW] 화면 밖으로 나가면 자동 닫기 (Auto Reset)
    ScrollTrigger.create({
        trigger: item,
        start: "top bottom", // 화면 아래로 사라질 때
        end: "bottom top",   // 화면 위로 사라질 때
        onLeave: () => closeItem(item),
        onLeaveBack: () => closeItem(item)
    });
});

// 아이템 닫는 함수
function closeItem(item) {
    item.classList.remove("active");
    // 모든 아이템이 닫히면 부모의 has-active 클래스 제거 (블러 해제)
    if (!document.querySelector(".timeline-item.active")) {
        timelineList.classList.remove("has-active");
    }
}

// (3) 클릭 이벤트 (스포트라이트 모드)
timelineItems.forEach((item) => {
    item.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // 1. 다른 모든 아이템 닫기
        timelineItems.forEach(el => el.classList.remove("active"));

        // 2. 클릭한 아이템 토글
        if (!isActive) {
            item.classList.add("active");
            timelineList.classList.add("has-active"); // 블러 효과 켜기
        } else {
            timelineList.classList.remove("has-active"); // 블러 효과 끄기
        }
    });
});


// 5. 지원하기 버튼
gsap.to(".apply-container", {
    scrollTrigger: {
        trigger: ".apply-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
    },
    opacity: 1,
    scale: 1, 
    duration: 0.8,
    ease: "back.out(1.7)" 
});
