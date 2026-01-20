gsap.registerPlugin(ScrollTrigger);

// 1. 히어로 섹션 등장 (기존 유지)
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


// 2. 히어로 섹션 흐려지기 (기존 유지)
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


// === [완전 수정됨] 아이폰 가로 이동 애니메이션 ===
const track = document.querySelector(".phones-track");
const trackWidth = track.scrollWidth;

// 1. 초기 상태 설정: 트랙을 화면 오른쪽 밖으로(window.innerWidth) 밀어둠
gsap.set(track, { x: window.innerWidth });

// 2. 스크롤 애니메이션
gsap.to(track, {
    x: -trackWidth, // 왼쪽으로 트랙 길이만큼 이동 (완전히 사라짐)
    ease: "none",
    scrollTrigger: {
        trigger: ".app-section",
        start: "top top", // 앱 섹션이 화면 꼭대기에 닿으면 시작
        end: "+=3000",    // 스크롤을 3000px 만큼 내리는 동안 재생 (길게 잡음)
        pin: true,        // 화면 고정 (기차 지나가는 거 구경하게)
        scrub: 1,         // 스크롤 따라 움직임
        anticipatePin: 1
    }
});


// 4. 고려대 섹션 등장 (기존 유지)
gsap.to(".ku-section .content-wrapper", {
    scrollTrigger: {
        trigger: ".ku-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
});


// 5. 지원하기 버튼 등장 (기존 유지)
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