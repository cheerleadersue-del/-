/* =====================================================================
   법무법인 유일 — LAW FIRM YUIL
   main.js

   - 전체 메뉴
   - HERO 가로 전환 (스크롤 연동)
   - WHY YUIL 등장
   - OUR LAWYERS 시네마틱 전환 (스크롤 연동)
   - PRACTICE AREAS 전환

   스크롤 핸들러는 하나만 등록하고, requestAnimationFrame 으로 묶어 처리한다.
   prefers-reduced-motion 이 켜져 있으면 스크롤 연출을 모두 끄고
   CSS 가 정적 레이아웃으로 대체한다.
===================================================================== */

(() => {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  /* 0 → 1 로 정규화한 진행도 */
  const progressBetween = (value, start, end) =>
    clamp((value - start) / (end - start), 0, 1);


  /* ===================================================================
     데이터
  =================================================================== */

  const lawyers = [
    {
      number: "01",
      name: "정호길",
      position: "대표변호사 · 형사전문",
      role: "REPRESENTATIVE LAWYER · CRIMINAL DEFENSE",
      image: "assets/lawyer-01.webp",
      description:
        "형사사건의 초기 대응부터 수사와 재판까지, 증거와 기록을 중심으로 사건의 방향과 방어 전략을 직접 총괄합니다.",
      careers: [
        "형사사건 25년 경력",
        "수사·재판 대응 총괄",
        "법무법인 유일 대표변호사"
      ]
    },
    {
      number: "02",
      name: "김제도",
      position: "변호사",
      role: "LAWYER · LITIGATION STRATEGY",
      image: "assets/lawyer-02.webp",
      description:
        "사건 기록과 사실관계를 면밀히 검토해 쟁점을 정리하고, 수사와 재판 과정에 필요한 대응 논리를 설계합니다.",
      careers: [
        "형사·민사 사건 수행",
        "사건 기록 및 증거 분석",
        "법무법인 유일 변호사"
      ]
    },
    {
      number: "03",
      name: "변호사 03",
      position: "변호사",
      role: "LAWYER · CRIMINAL LITIGATION",
      image: "assets/lawyer-03.webp",
      description:
        "사건의 초기 사실관계부터 증거 제출과 변론까지, 의뢰인에게 필요한 대응 방향을 구체적으로 준비합니다.",
      careers: [
        "형사사건 대응",
        "증거 및 진술 분석",
        "법무법인 유일 변호사"
      ]
    },
    {
      number: "04",
      name: "변호사 04",
      position: "변호사",
      role: "LAWYER · CIVIL LITIGATION",
      image: "assets/lawyer-04.webp",
      description:
        "계약과 손해배상, 부동산 분쟁의 핵심 쟁점을 분석하고 실질적인 해결을 위한 소송 전략을 준비합니다.",
      careers: [
        "민사소송 수행",
        "계약·손해배상 분쟁",
        "법무법인 유일 변호사"
      ]
    },
    {
      number: "05",
      name: "변호사 05",
      position: "변호사",
      role: "LAWYER · FAMILY LITIGATION",
      image: "assets/lawyer-05.webp",
      description:
        "이혼과 상속, 친권과 양육권 문제에서 법률적 판단과 의뢰인의 현실을 함께 고려한 해결 방향을 제시합니다.",
      careers: [
        "이혼·가사 사건 수행",
        "상속 및 재산분할",
        "법무법인 유일 변호사"
      ]
    },
    {
      number: "06",
      name: "변호사 06",
      position: "변호사",
      role: "LAWYER · REHABILITATION",
      image: "assets/lawyer-06.webp",
      description:
        "의뢰인의 채무와 소득, 재산 상황을 분석해 개인회생과 파산 절차에 필요한 자료와 계획을 준비합니다.",
      careers: [
        "개인회생·파산 사건",
        "채무 구조 분석",
        "법무법인 유일 변호사"
      ]
    }
  ];

  /*
    각 센터의 성공사례 페이지는 아직 준비되지 않았다.
    페이지를 만들기 전까지 link 는 상담 섹션(#contact)을 가리켜
    404 가 발생하지 않도록 한다. 페이지가 준비되면 link 값만 교체하면 된다.
  */
  const practices = [
    {
      number: "01",
      title: "형사센터",
      english: "CRIMINAL CENTER",
      image: "assets/center-criminal.webp",
      link: "#contact",
      linkText: "형사센터 상담 안내"
    },
    {
      number: "02",
      title: "민사센터",
      english: "CIVIL CENTER",
      image: "assets/center-civil.webp",
      link: "#contact",
      linkText: "민사센터 상담 안내"
    },
    {
      number: "03",
      title: "가사센터",
      english: "FAMILY CENTER",
      image: "assets/center-family.webp",
      link: "#contact",
      linkText: "가사센터 상담 안내"
    },
    {
      number: "04",
      title: "회생센터",
      english: "RECOVERY CENTER",
      image: "assets/center-recovery.webp",
      link: "#contact",
      linkText: "회생센터 상담 안내"
    },
    {
      number: "05",
      title: "공증센터",
      english: "NOTARY CENTER",
      image: "assets/center-notary.webp",
      link: "#contact",
      linkText: "공증센터 상담 안내"
    }
  ];


  /* ===================================================================
     요소
  =================================================================== */

  const $ = (id) => document.getElementById(id);

  const header         = $("siteHeader");
  const menuButton     = $("menuButton");
  const fullscreenMenu = $("fullscreenMenu");

  const hero        = $("hero");
  const heroTrack   = $("heroTrack");
  const heroGoddess = document.querySelector(".hero-goddess");
  const heroProgress = $("heroProgress");
  const heroCurrent  = $("heroCurrent");

  const strategySection = document.querySelector(".yuil-strategy");

  const lawyersSection     = document.querySelector(".lawyers-cinematic");
  const lawyersCity        = $("lawyersCity");
  const lawyersOverlay     = $("lawyersOverlay");
  const lawyersIntro       = $("lawyersIntro");
  const lawyersProfile     = $("lawyersProfile");
  const lawyersScrollGuide = $("lawyersScrollGuide");
  const lawyersFallback    = $("lawyersFallback");
  const lawyersProgressFill = $("lawyersProgressFill");
  const lawyerSteps = Array.from(
    document.querySelectorAll(".lawyers-cinematic__steps span")
  );

  const lawyerImage       = $("lawyerImage");
  const lawyerNumber      = $("lawyerNumber");
  const lawyerRole        = $("lawyerRole");
  const lawyerName        = $("lawyerName");
  const lawyerPosition    = $("lawyerPosition");
  const lawyerDescription = $("lawyerDescription");
  const lawyerCareer      = $("lawyerCareer");
  const lawyerCurrent     = $("lawyerCurrent");

  const practiceItems = Array.from(
    document.querySelectorAll(".practice-item")
  );
  const practiceImage     = $("practiceImage");
  const practiceImageWrap = document.querySelector(".practice-areas__image-wrap");
  const practiceEnglish   = $("practiceEnglish");
  const practiceNumber    = $("practiceVisualNumber");
  const practiceCaseLink  = $("practiceCaseLink");

  let activeLawyerIndex   = 0;
  let activePracticeIndex = 0;
  let lawyerChangeTimer   = null;
  let practiceChangeTimer = null;


  /* ===================================================================
     전체 메뉴
  =================================================================== */

  const setMenuState = (isOpen) => {
    if (!menuButton || !fullscreenMenu) return;

    menuButton.classList.toggle("is-open", isOpen);
    fullscreenMenu.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("is-menu-open", isOpen);

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");

    /*
      inert 는 닫힌 메뉴를 포커스·스크린리더 양쪽에서 완전히 제외한다.
      aria-hidden 만 쓰면 링크가 그대로 탭 순서에 남아 키보드 사용자가 갇힌다.
    */
    fullscreenMenu.toggleAttribute("inert", !isOpen);

    /*
      메뉴는 visibility 전환을 거치므로, 클래스를 붙인 직후에는 아직
      focus() 가 먹지 않는다. 다음 프레임까지 기다렸다가 첫 링크로 보낸다.
    */
    if (isOpen) {
      window.requestAnimationFrame(() => {
        fullscreenMenu.querySelector("a")?.focus();
      });
    }
  };

  menuButton?.addEventListener("click", () => {
    setMenuState(!fullscreenMenu.classList.contains("is-open"));
  });

  fullscreenMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && fullscreenMenu?.classList.contains("is-open")) {
      setMenuState(false);
      menuButton?.focus();
    }
  });


  /* ===================================================================
     헤더
  =================================================================== */

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 30);
  };


  /* ===================================================================
     HERO — 스크롤에 따라 트랙을 가로로 이동
  =================================================================== */

  const updateHero = () => {
    if (!hero || !heroTrack) return;

    const scrollDistance = hero.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return;

    /* getBoundingClientRect 는 offsetTop 과 달리 부모 레이아웃에 영향받지 않는다 */
    const passed = -hero.getBoundingClientRect().top;
    const progress = clamp(passed / scrollDistance, 0, 1);

    heroTrack.style.transform = `translate3d(-${progress * 200}vw, 0, 0)`;

    if (heroGoddess) {
      const fade = 1 - progressBetween(progress, 0.18, 0.46);
      heroGoddess.style.opacity = String(0.44 * fade);
      heroGoddess.style.transform =
        `translate(-50%, -50%) scale(${1 + progress * 0.05})`;
    }

    if (heroProgress) {
      heroProgress.style.width = `${progress * 100}%`;
    }

    if (heroCurrent) {
      const panel = progress >= 0.66 ? 3 : progress >= 0.33 ? 2 : 1;
      heroCurrent.textContent = String(panel).padStart(2, "0");
    }
  };


  /* ===================================================================
     WHY YUIL — 뷰포트에 들어오면 한 번만 등장
  =================================================================== */

  if (strategySection) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        strategySection.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.24 }
    );

    observer.observe(strategySection);
  }


  /* ===================================================================
     OUR LAWYERS
  =================================================================== */

  const renderLawyer = (index, animate = true) => {
    const lawyer = lawyers[index];
    if (!lawyer) return;

    activeLawyerIndex = index;
    window.clearTimeout(lawyerChangeTimer);

    const apply = () => {
      if (lawyerImage) {
        lawyerImage.src = lawyer.image;
        lawyerImage.alt = `${lawyer.name} ${lawyer.position}`;
      }

      if (lawyerNumber)      lawyerNumber.textContent      = lawyer.number;
      if (lawyerRole)        lawyerRole.textContent        = lawyer.role;
      if (lawyerName)        lawyerName.textContent        = lawyer.name;
      if (lawyerPosition)    lawyerPosition.textContent    = lawyer.position;
      if (lawyerDescription) lawyerDescription.textContent = lawyer.description;
      if (lawyerCurrent)     lawyerCurrent.textContent     = lawyer.number;

      if (lawyerCareer) {
        lawyerCareer.replaceChildren(
          ...lawyer.careers.map((career, i) => {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = String(i + 1).padStart(2, "0");
            li.append(span, document.createTextNode(career));
            return li;
          })
        );
      }

      if (lawyersProgressFill) {
        lawyersProgressFill.style.width =
          `${((index + 1) / lawyers.length) * 100}%`;
      }

      lawyerSteps.forEach((step, i) => {
        step.classList.toggle("is-active", i === index);
      });
    };

    if (!animate || !lawyersProfile) {
      apply();
      return;
    }

    lawyersProfile.classList.add("is-changing");

    lawyerChangeTimer = window.setTimeout(() => {
      apply();
      /*
        클래스 제거를 rAF 로 미루면 새 내용이 페인트된 뒤 페이드가 시작된다.
        rAF 는 탭이 백그라운드일 때 멈추므로, 타이머로 안전망을 둔다.
      */
      window.requestAnimationFrame(() => {
        lawyersProfile.classList.remove("is-changing");
      });
      window.setTimeout(() => {
        lawyersProfile.classList.remove("is-changing");
      }, 200);
    }, 240);
  };

  const updateLawyersSequence = () => {
    if (!lawyersSection) return;

    const scrollDistance = lawyersSection.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return;

    const passed = clamp(
      -lawyersSection.getBoundingClientRect().top,
      0,
      scrollDistance
    );
    const progress = passed / scrollDistance;

    /* 컬러 → 흑백 */
    const gray = progressBetween(progress, 0, 0.22);

    if (lawyersCity) {
      lawyersCity.style.filter =
        `grayscale(${gray * 100}%) ` +
        `saturate(${88 - gray * 88}%) ` +
        `brightness(${0.72 - gray * 0.43}) ` +
        `contrast(${1.04 + gray * 0.12})`;

      lawyersCity.style.transform = `scale(${1.015 + gray * 0.065})`;
    }

    if (lawyersOverlay) {
      lawyersOverlay.style.opacity = String(0.45 + gray * 0.45);
    }

    /* OUR LAWYERS 인트로 등장 → 퇴장 */
    if (lawyersIntro) {
      const introIn  = progressBetween(progress, 0.08, 0.17);
      const introOut = progressBetween(progress, 0.21, 0.28);

      lawyersIntro.style.opacity = String(introIn * (1 - introOut));
      lawyersIntro.style.transform =
        `translateY(${50 - introIn * 50 - introOut * 30}px)`;
    }

    if (lawyersScrollGuide) {
      lawyersScrollGuide.style.opacity = String(Math.max(1 - progress * 9, 0));
    }

    const profileStart = 0.27;
    lawyersSection.classList.toggle("is-profile", progress >= profileStart);

    if (progress < profileStart) return;

    const profileProgress = clamp(
      (progress - profileStart) / (1 - profileStart),
      0,
      0.9999
    );

    const nextIndex = Math.min(
      Math.floor(profileProgress * lawyers.length),
      lawyers.length - 1
    );

    if (nextIndex !== activeLawyerIndex) {
      renderLawyer(nextIndex);
    }
  };

  /* 모션 최소화 시 CSS 가 보여주는 정적 목록을 채운다 */
  const buildLawyersFallback = () => {
    if (!lawyersFallback) return;

    lawyersFallback.replaceChildren(
      ...lawyers.map((lawyer) => {
        const li = document.createElement("li");

        const img = document.createElement("img");
        img.src = lawyer.image;
        img.alt = `${lawyer.name} ${lawyer.position}`;
        img.loading = "lazy";

        const name = document.createElement("h3");
        name.textContent = lawyer.name;

        const role = document.createElement("p");
        role.className = "role";
        role.textContent = lawyer.position;

        const description = document.createElement("p");
        description.textContent = lawyer.description;

        li.append(img, name, role, description);
        return li;
      })
    );
  };


  /* ===================================================================
     PRACTICE AREAS
  =================================================================== */

  const renderPractice = (index, animate = true) => {
    const practice = practices[index];
    if (!practice) return;

    activePracticeIndex = index;
    window.clearTimeout(practiceChangeTimer);

    practiceItems.forEach((item, i) => {
      item.classList.toggle("is-active", i === index);
    });

    const apply = () => {
      if (practiceImage) {
        practiceImage.src = practice.image;
        practiceImage.alt = practice.title;
      }

      if (practiceEnglish) practiceEnglish.textContent = practice.english;
      if (practiceNumber)  practiceNumber.textContent  = practice.number;

      if (practiceCaseLink) {
        practiceCaseLink.href = practice.link;
        const label = practiceCaseLink.querySelector("strong");
        if (label) label.textContent = practice.linkText;
      }
    };

    if (!animate || !practiceImageWrap) {
      apply();
      return;
    }

    practiceImageWrap.classList.add("is-changing");

    practiceChangeTimer = window.setTimeout(() => {
      apply();
      window.requestAnimationFrame(() => {
        practiceImageWrap.classList.remove("is-changing");
      });
      window.setTimeout(() => {
        practiceImageWrap.classList.remove("is-changing");
      }, 200);
    }, 220);
  };

  if (practiceItems.length) {
    /* 스크롤에 따라 활성 항목 전환 */
    const practiceObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const index = Number(visible[0].target.dataset.index);
        if (Number.isInteger(index) && index !== activePracticeIndex) {
          renderPractice(index);
        }
      },
      {
        rootMargin: "-24% 0px -34% 0px",
        threshold: [0.15, 0.3, 0.5, 0.7]
      }
    );

    practiceItems.forEach((item) => {
      practiceObserver.observe(item);

      item.querySelector(".practice-item__button")
        ?.addEventListener("click", () => {
          const index = Number(item.dataset.index);
          if (!Number.isInteger(index)) return;

          renderPractice(index);
          item.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "center"
          });
        });
    });
  }


  /* ===================================================================
     부드러운 앵커 이동
  =================================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      setMenuState(false);

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });


  /* ===================================================================
     스크롤 루프 — 핸들러 하나로 통합
  =================================================================== */

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    window.requestAnimationFrame(() => {
      updateHeader();

      if (!prefersReducedMotion) {
        updateHero();
        updateLawyersSequence();
      }

      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });


  /* ===================================================================
     초기화
  =================================================================== */

  const currentYear = $("currentYear");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  buildLawyersFallback();
  renderLawyer(0, false);
  renderPractice(0, false);

  updateHeader();

  if (!prefersReducedMotion) {
    updateHero();
    updateLawyersSequence();
  }
})();
