/* =====================================================================
   법무법인 유일 — LAW FIRM YUIL
   main.js

   - 변호인단 캐러셀 (히어로 ↔ 썸네일 스트립 연동)
   - 모바일 메뉴
   - 전문센터 렌더링
   - 헤더 현재 섹션 표시
===================================================================== */

(() => {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const prefersReducedMotion =
    matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ===================================================================
     데이터

     ⚠ 사진 파일과 성명의 짝은 시안만으로 확정할 수 없어 임시 배정했다.
        실제 인물과 대조해 image 값을 확인할 것.
  =================================================================== */

  const attorneys = [
    {
      name: "정호길",
      role: "대표변호사",
      title: "25년 경력 형사전문 변호사",
      image: "assets/lawyer-01.webp",
      description:
        "수사기관의 시각에서<br>증거와 진술의 흐름을<br>분석합니다."
    },
    {
      name: "김제도",
      role: "파트너변호사",
      title: "형사 · 기업분쟁",
      image: "assets/lawyer-04.webp",
      description:
        "사건 기록과 사실관계를<br>면밀히 검토해<br>쟁점을 정리합니다."
    },
    {
      name: "정주형",
      role: "파트너변호사",
      title: "부동산 · 민사 · 형사",
      image: "assets/lawyer-02.webp",
      description:
        "계약과 손해배상의<br>핵심 자료와 책임 관계를<br>분석합니다."
    },
    {
      name: "김의환",
      role: "파트너변호사",
      title: "형사 · 수사 대응",
      image: "assets/lawyer-03.webp",
      description:
        "조사 단계부터 변론까지<br>필요한 대응 방향을<br>구체적으로 준비합니다."
    },
    {
      name: "이경숙",
      role: "파트너변호사",
      title: "이혼 · 상속 · 형사",
      image: "assets/lawyer-05.webp",
      description:
        "법률적 판단과<br>의뢰인의 현실을 함께<br>고려해 방향을 정합니다."
    }
  ];

  const centers = [
    { name: "형사센터", en: "CRIMINAL",
      desc: "초기 진술부터 압수수색, 조사와 재판까지 증거를 중심으로 대응합니다." },
    { name: "민사센터", en: "CIVIL",
      desc: "계약과 손해배상, 부동산 분쟁의 핵심 자료와 책임 관계를 분석합니다." },
    { name: "가사센터", en: "FAMILY",
      desc: "이혼과 상속, 친권과 양육권 문제를 현실적인 해결 방향으로 설계합니다." },
    { name: "회생센터", en: "RECOVERY",
      desc: "채무와 소득, 재산 구조를 분석해 개인회생과 파산 절차를 준비합니다." },
    { name: "공증센터", en: "NOTARY",
      desc: "계약과 의사표시를 명확한 문서와 절차로 남겨 미래의 분쟁을 예방합니다." }
  ];

  const pad = (n) => String(n).padStart(2, "0");


  /* ===================================================================
     변호인단 캐러셀
  =================================================================== */

  const heroProfile = $("#heroProfile");
  const profileRole  = $("#profileRole");
  const profileName  = $("#profileName");
  const profileTitle = $("#profileTitle");
  const profileDesc  = $("#profileDesc");
  const profilePhoto = $("#profilePhoto");
  const heroCurrent  = $("#heroCurrent");
  const heroTotal    = $("#heroTotal");
  const stripList    = $("#stripList");

  let activeIndex = 0;
  let changeTimer = null;

  /* 썸네일 스트립 */
  if (stripList) {
    stripList.replaceChildren(...attorneys.map((person, index) => {
      const li = document.createElement("li");

      const card = document.createElement("button");
      card.type = "button";
      card.className = "strip-card";
      card.setAttribute("role", "tab");
      card.setAttribute("aria-selected", String(index === 0));
      card.dataset.index = String(index);

      const img = document.createElement("img");
      img.src = person.image;
      img.alt = "";
      img.loading = index < 3 ? "eager" : "lazy";

      const indexLabel = document.createElement("span");
      indexLabel.className = "strip-index";
      indexLabel.textContent = pad(index + 1);

      const info = document.createElement("span");
      info.className = "strip-info";

      const name = document.createElement("span");
      name.className = "strip-name";
      name.textContent = person.name;

      const role = document.createElement("span");
      role.className = "strip-role";
      role.textContent = person.role;

      info.append(name, role);
      card.append(img, indexLabel, info);
      li.append(card);
      return li;
    }));
  }

  const stripCards = $$(".strip-card");

  const render = (index, animate = true) => {
    const person = attorneys[index];
    if (!person) return;

    activeIndex = index;
    window.clearTimeout(changeTimer);

    stripCards.forEach((card, i) => {
      card.classList.toggle("is-active", i === index);
      card.setAttribute("aria-selected", String(i === index));
    });

    if (heroCurrent) heroCurrent.textContent = pad(index + 1);

    const apply = () => {
      if (profileRole)  profileRole.textContent  = person.role;
      if (profileName)  profileName.textContent  = person.name;
      if (profileTitle) profileTitle.textContent = person.title;

      /* description 은 줄바꿈만 포함한 자체 문자열이라 innerHTML 로 넣는다 */
      if (profileDesc) profileDesc.innerHTML = person.description;

      if (profilePhoto) {
        profilePhoto.src = person.image;
        profilePhoto.alt = `${person.name} ${person.role}`;
      }
    };

    if (!animate || !heroProfile || prefersReducedMotion) {
      apply();
      return;
    }

    heroProfile.classList.add("is-changing");

    changeTimer = window.setTimeout(() => {
      apply();
      requestAnimationFrame(() => heroProfile.classList.remove("is-changing"));
      /* rAF 는 탭이 백그라운드면 멈추므로 타이머로 안전망을 둔다 */
      window.setTimeout(() => heroProfile.classList.remove("is-changing"), 200);
    }, 260);
  };

  const step = (delta) => {
    render((activeIndex + delta + attorneys.length) % attorneys.length);
  };

  stripCards.forEach((card) => {
    card.addEventListener("click", () => render(Number(card.dataset.index)));
  });

  $("#heroPrev")?.addEventListener("click", () => step(-1));
  $("#heroNext")?.addEventListener("click", () => step(1));
  $("#stripPrev")?.addEventListener("click", () => step(-1));
  $("#stripNext")?.addEventListener("click", () => step(1));

  /* 스트립 위에서 좌우 방향키 */
  stripList?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft")  { event.preventDefault(); step(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
  });

  if (heroTotal) heroTotal.textContent = pad(attorneys.length);
  render(0, false);


  /* ===================================================================
     전문센터
  =================================================================== */

  const centerList = $("#centerList");

  if (centerList) {
    centerList.replaceChildren(...centers.map((center, index) => {
      const li = document.createElement("li");
      li.className = "center-item";

      const num = document.createElement("p");
      num.className = "center-num";
      num.textContent = `${pad(index + 1)} · ${center.en}`;

      const name = document.createElement("h3");
      name.className = "center-name";
      name.textContent = center.name;

      const desc = document.createElement("p");
      desc.className = "center-desc";
      desc.textContent = center.desc;

      li.append(num, name, desc);
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

    /* visibility 전환 직후에는 focus() 가 먹지 않아 다음 프레임까지 기다린다 */
    if (open) {
      requestAnimationFrame(() => $("a", mobileMenu)?.focus());
    }
  };

  menuToggle?.addEventListener("click", () => {
    setMenu(!mobileMenu.classList.contains("is-open"));
  });

  $$("a", mobileMenu).forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu?.classList.contains("is-open")) {
      setMenu(false);
      menuToggle?.focus();
    }
  });


  /* ===================================================================
     헤더 현재 섹션
  =================================================================== */

  const navLinks = $$(".nav a");

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const id = visible[0].target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
        });
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
  }


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
