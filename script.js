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


// 3. 앱 섹션 (가로 이동)
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


// 4. [NEW] 커리큘럼 타임라인 애니메이션
// (1) 수직선이 쭉- 그려짐
gsap.to(".vertical-line", {
    height: "100%", // 높이 0 -> 100%
    ease: "none",
    scrollTrigger: {
        trigger: ".timeline-wrapper",
        start: "top center", // 화면 중간쯤 왔을 때 시작
        end: "bottom center", // 끝까지 그리기
        scrub: 1 // 스크롤 속도에 맞춰서 그려짐 (천천히)
    }
});

// (2) 각 아이템(점+글자)이 선에 맞춰 등장
const items = gsap.utils.toArray(".timeline-item");

items.forEach((item) => {
    // 불렛 포인트 뽕!
    gsap.to(item.querySelector(".bullet-point"), {
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)", // 띠용 효과
        scrollTrigger: {
            trigger: item,
            start: "top 60%", // 아이템 위치쯤 오면 실행
            toggleActions: "play none none reverse"
        }
    });

    // 글자 스르륵
    gsap.to(item, {
        opacity: 1,
        x: 0, // 원래 위치로
        duration: 0.8,
        scrollTrigger: {
            trigger: item,
            start: "top 60%",
            toggleActions: "play none none reverse"
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
