/* =====================================================================
   법무법인 유일 — LAW FIRM YUIL
   main.js

   - 테마 전환 (라이트 / 다크)
   - 헤더 상태 · 현재 섹션 표시
   - 모바일 메뉴
   - 사이트 내 검색
   - 변호인단 · 업무분야 카드 렌더링
===================================================================== */

(() => {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const prefersReducedMotion =
    matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ===================================================================
     데이터
  =================================================================== */

  const lawyers = [
    {
      name: "정호길",
      role: "대표변호사 · 형사전문",
      image: "assets/lawyer-01.webp",
      description:
        "형사사건의 초기 대응부터 수사와 재판까지, 증거와 기록을 중심으로 사건의 방향과 방어 전략을 직접 총괄합니다.",
      tags: ["형사사건 25년", "수사·재판 총괄"]
    },
    {
      name: "김제도",
      role: "변호사 · 소송 전략",
      image: "assets/lawyer-02.webp",
      description:
        "사건 기록과 사실관계를 면밀히 검토해 쟁점을 정리하고, 수사와 재판 과정에 필요한 대응 논리를 설계합니다.",
      tags: ["형사·민사", "증거 분석"]
    },
    {
      name: "변호사 03",
      role: "변호사 · 형사소송",
      image: "assets/lawyer-03.webp",
      description:
        "사건의 초기 사실관계부터 증거 제출과 변론까지, 의뢰인에게 필요한 대응 방향을 구체적으로 준비합니다.",
      tags: ["형사사건", "진술 분석"]
    },
    {
      name: "변호사 04",
      role: "변호사 · 민사소송",
      image: "assets/lawyer-04.webp",
      description:
        "계약과 손해배상, 부동산 분쟁의 핵심 쟁점을 분석하고 실질적인 해결을 위한 소송 전략을 준비합니다.",
      tags: ["민사소송", "손해배상"]
    },
    {
      name: "변호사 05",
      role: "변호사 · 가사소송",
      image: "assets/lawyer-05.webp",
      description:
        "이혼과 상속, 친권과 양육권 문제에서 법률적 판단과 의뢰인의 현실을 함께 고려한 해결 방향을 제시합니다.",
      tags: ["이혼·가사", "상속"]
    },
    {
      name: "변호사 06",
      role: "변호사 · 개인회생",
      image: "assets/lawyer-06.webp",
      description:
        "의뢰인의 채무와 소득, 재산 상황을 분석해 개인회생과 파산 절차에 필요한 자료와 계획을 준비합니다.",
      tags: ["개인회생", "파산"]
    }
  ];

  /*
    분야별 성공사례 페이지는 아직 없다. 페이지가 준비되면 link 값만
    해당 경로로 바꾸고 linkText 를 "성공사례 보기" 로 되돌리면 된다.
  */
  const practices = [
    {
      name: "형사센터",
      english: "CRIMINAL CENTER",
      image: "assets/center-criminal.webp",
      description: "초기 진술부터 압수수색, 조사와 재판까지 증거를 중심으로 대응합니다.",
      link: "#contact",
      linkText: "형사 상담 안내"
    },
    {
      name: "민사센터",
      english: "CIVIL CENTER",
      image: "assets/center-civil.webp",
      description: "계약과 손해배상, 부동산 분쟁의 핵심 자료와 책임 관계를 분석합니다.",
      link: "#contact",
      linkText: "민사 상담 안내"
    },
    {
      name: "가사센터",
      english: "FAMILY CENTER",
      image: "assets/center-family.webp",
      description: "이혼과 상속, 친권과 양육권 문제를 현실적인 해결 방향으로 설계합니다.",
      link: "#contact",
      linkText: "가사 상담 안내"
    },
    {
      name: "회생센터",
      english: "RECOVERY CENTER",
      image: "assets/center-recovery.webp",
      description: "채무와 소득, 재산 구조를 분석해 개인회생과 파산 절차를 준비합니다.",
      link: "#contact",
      linkText: "회생 상담 안내"
    },
    {
      name: "공증센터",
      english: "NOTARY CENTER",
      image: "assets/center-notary.webp",
      description: "계약과 의사표시를 명확한 문서와 절차로 남겨 미래의 분쟁을 예방합니다.",
      link: "#contact",
      linkText: "공증 상담 안내"
    }
  ];


  /* ===================================================================
     테마
  =================================================================== */

  const themeToggle = $("#themeToggle");

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;

    themeToggle?.setAttribute(
      "aria-label",
      theme === "dark" ? "밝은 화면으로 전환" : "어두운 화면으로 전환"
    );

    $('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#17171a" : "#ffffff");

    try {
      localStorage.setItem("yuil-theme", theme);
    } catch (_) {
      /* 저장이 막힌 브라우저에서도 전환 자체는 동작해야 한다 */
    }
  };

  applyTheme(document.documentElement.dataset.theme || "light");

  themeToggle?.addEventListener("click", () => {
    applyTheme(
      document.documentElement.dataset.theme === "dark" ? "light" : "dark"
    );
  });


  /* ===================================================================
     카드 렌더링
  =================================================================== */

  const lawyerGrid = $("#lawyerGrid");

  if (lawyerGrid) {
    lawyerGrid.replaceChildren(...lawyers.map((lawyer) => {
      const li = document.createElement("li");
      li.className = "lawyer-card";

      const photo = document.createElement("div");
      photo.className = "lawyer-photo";

      const img = document.createElement("img");
      img.src = lawyer.image;
      img.alt = `${lawyer.name} ${lawyer.role}`;
      img.loading = "lazy";
      photo.append(img);

      const body = document.createElement("div");
      body.className = "lawyer-body";

      const role = document.createElement("p");
      role.className = "lawyer-role";
      role.textContent = lawyer.role;

      const name = document.createElement("h3");
      name.className = "lawyer-name";
      name.textContent = lawyer.name;

      const desc = document.createElement("p");
      desc.className = "lawyer-desc";
      desc.textContent = lawyer.description;

      const tags = document.createElement("div");
      tags.className = "lawyer-tags";
      tags.append(...lawyer.tags.map((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        return span;
      }));

      body.append(role, name, desc, tags);
      li.append(photo, body);
      return li;
    }));
  }


  const practiceGrid = $("#practiceGrid");

  if (practiceGrid) {
    practiceGrid.replaceChildren(...practices.map((practice) => {
      const li = document.createElement("li");

      const card = document.createElement("a");
      card.className = "practice-card";
      card.href = practice.link;

      const thumb = document.createElement("div");
      thumb.className = "practice-thumb";

      const img = document.createElement("img");
      img.src = practice.image;
      img.alt = practice.name;
      img.loading = "lazy";
      thumb.append(img);

      const body = document.createElement("div");
      body.className = "practice-body";

      const en = document.createElement("p");
      en.className = "practice-en";
      en.textContent = practice.english;

      const name = document.createElement("h3");
      name.className = "practice-name";
      name.textContent = practice.name;

      const desc = document.createElement("p");
      desc.className = "practice-desc";
      desc.textContent = practice.description;

      const more = document.createElement("span");
      more.className = "practice-more";
      const moreText = document.createElement("span");
      moreText.textContent = practice.linkText;
      const arrow = document.createElement("i");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "→";
      more.append(moreText, arrow);

      body.append(en, name, desc, more);
      card.append(thumb, body);
      li.append(card);
      return li;
    }));
  }


  /* ===================================================================
     모바일 메뉴
  =================================================================== */

  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  const setMenu = (open) => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.toggle("is-open", open);
    mobileMenu.classList.toggle("is-open", open);
    document.body.classList.toggle("is-locked", open);

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");

    /* 닫힌 메뉴는 포커스와 스크린리더 양쪽에서 완전히 제외한다 */
    mobileMenu.toggleAttribute("inert", !open);
  };

  menuToggle?.addEventListener("click", () => {
    setMenu(!mobileMenu.classList.contains("is-open"));
  });

  $$("a", mobileMenu).forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });


  /* ===================================================================
     검색
  =================================================================== */

  const searchLayer   = $("#searchLayer");
  const searchToggle  = $("#searchToggle");
  const searchInput   = $("#searchInput");
  const searchClear   = $("#searchClear");
  const searchResults = $("#searchResults");
  const heroSearch    = $("#heroSearch");

  /* 검색 색인 — 페이지 안의 섹션을 대상으로 한다 */
  const searchIndex = [
    { title: "소개 · 유일의 방식", hint: "증거 · 초기 대응 · 변호인단 전략", href: "#about",
      keywords: "소개 유일 방식 증거 기록 전략 초기대응 why" },
    { title: "변호인단", hint: "정호길 대표변호사 외 5인", href: "#lawyers",
      keywords: "변호사 변호인단 정호길 김제도 대표변호사 프로필 경력 lawyer" },
    { title: "사건 절차", hint: "상담 접수부터 선임까지 4단계", href: "#process",
      keywords: "절차 과정 상담 접수 선임 진행 프로세스 process" },
    { title: "상담안내", hint: "032.000.0000 · 평일 09:00–18:00", href: "#contact",
      keywords: "상담 문의 전화 연락처 카카오톡 예약 위치 오시는길 주소 contact" },
    ...practices.map((p) => ({
      title: p.name,
      hint: p.description,
      href: "#practice",
      keywords: `${p.name} ${p.english} ${p.description}`
    }))
  ];

  const renderResults = (query) => {
    if (!searchResults) return;

    const q = query.trim().toLowerCase();

    if (!q) {
      searchResults.replaceChildren();
      return;
    }

    const hits = searchIndex.filter((item) =>
      `${item.title} ${item.hint} ${item.keywords}`.toLowerCase().includes(q)
    );

    if (!hits.length) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = `"${query.trim()}" 에 대한 결과가 없습니다.`;
      searchResults.replaceChildren(empty);
      return;
    }

    searchResults.replaceChildren(...hits.map((item) => {
      const a = document.createElement("a");
      a.href = item.href;

      const strong = document.createElement("strong");
      strong.textContent = item.title;

      const span = document.createElement("span");
      span.textContent = item.hint;

      a.append(strong, span);
      a.addEventListener("click", () => setSearch(false));
      return a;
    }));
  };

  const setSearch = (open) => {
    if (!searchLayer || !searchToggle) return;

    searchLayer.hidden = !open;
    searchToggle.setAttribute("aria-expanded", String(open));
    searchToggle.setAttribute("aria-label", open ? "검색 닫기" : "검색 열기");

    if (open) {
      searchInput?.focus();
    } else {
      if (searchInput) searchInput.value = "";
      searchResults?.replaceChildren();
    }
  };

  searchToggle?.addEventListener("click", () => setSearch(searchLayer.hidden));

  heroSearch?.addEventListener("click", () => {
    setSearch(true);
    searchLayer?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest"
    });
  });

  searchInput?.addEventListener("input", (event) => {
    renderResults(event.target.value);
  });

  $("#searchBar")?.addEventListener("submit", (event) => event.preventDefault());

  searchClear?.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = "";
    renderResults("");
    searchInput.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (mobileMenu?.classList.contains("is-open")) {
      setMenu(false);
      menuToggle?.focus();
    } else if (searchLayer && !searchLayer.hidden) {
      setSearch(false);
      searchToggle?.focus();
    }
  });


  /* ===================================================================
     헤더 상태 · 현재 섹션
  =================================================================== */

  const header = $("#header");
  const navLinks = $$(".nav a");

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setCurrent = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
    });
  };

  if (sections.length) {
    /*
      화면 위쪽 1/3 지점을 지나는 섹션을 "현재"로 본다.
      IntersectionObserver 만으로는 긴 섹션에서 상태가 끊겨 보인다.
    */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      header?.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    });
  };

  addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  /* ===================================================================
     부드러운 앵커 이동
  =================================================================== */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      setMenu(false);

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });


  /* ===================================================================
     초기화
  =================================================================== */

  const year = $("#currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
})();
