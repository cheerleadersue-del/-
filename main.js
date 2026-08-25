/* =====================================================================
   법무법인 유일 — LAW FIRM YUIL
   main.js

   - 업무분야 탭 (버튼 · 화살표 · 좌우 스와이프)
   - 변호인단 카드 (터치에서는 탭으로 경력 펼침)
   - 약속 6항목 렌더링
   - 상담 폼 검증
   - 헤더 상태 · 현재 섹션 · 모바일 메뉴
===================================================================== */

(() => {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const prefersReducedMotion =
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 마우스가 없는 기기 — 호버 대신 탭으로 펼쳐야 한다 */
  const isTouch = matchMedia("(hover: none)").matches;


  /* ===================================================================
     데이터

     ⚠ 사진 파일과 성명의 짝은 시안만으로 확정할 수 없어 임시 배정했다.
        실제 인물과 대조해 image 값을 확인할 것.
  =================================================================== */

  const practices = [
    {
      name: "형사센터",
      en: "CRIMINAL CENTER",
      image: "assets/center-criminal.webp",
      desc: "초기 진술부터 압수수색, 조사와 재판까지 증거를 중심으로 대응합니다. " +
            "수사기관이 무엇을 보고 있는지 먼저 파악한 뒤 진술 방향을 함께 정리합니다.",
      tags: ["구속영장", "압수수색", "마약", "성범죄", "폭력·상해", "음주운전"]
    },
    {
      name: "민사센터",
      en: "CIVIL CENTER",
      image: "assets/center-civil.webp",
      desc: "계약과 손해배상, 부동산 분쟁의 핵심 자료와 책임 관계를 분석합니다. " +
            "무엇이 증명되고 무엇이 증명되지 않는지 먼저 가린 뒤 소송 순서를 정합니다.",
      tags: ["손해배상", "계약분쟁", "부동산", "임대차", "대여금", "명도"]
    },
    {
      name: "가사센터",
      en: "FAMILY CENTER",
      image: "assets/center-family.webp",
      desc: "이혼과 상속, 친권과 양육권 문제를 현실적인 해결 방향으로 설계합니다. " +
            "법률적 판단과 의뢰인의 생활 여건을 함께 놓고 검토합니다.",
      tags: ["이혼", "재산분할", "양육권", "상속", "유류분", "가사조정"]
    },
    {
      name: "회생센터",
      en: "RECOVERY CENTER",
      image: "assets/center-recovery.webp",
      desc: "채무와 소득, 재산 구조를 분석해 개인회생과 파산 절차를 준비합니다. " +
            "채권자 대응과 변제계획안 작성까지 절차 전체를 함께합니다.",
      tags: ["개인회생", "개인파산", "법인회생", "채무조정", "변제계획"]
    },
    {
      name: "공증센터",
      en: "NOTARY CENTER",
      image: "assets/center-notary.webp",
      desc: "계약과 의사표시를 명확한 문서와 절차로 남겨 미래의 분쟁을 예방합니다. " +
            "분쟁이 생긴 뒤보다 남겨두는 편이 훨씬 저렴합니다.",
      tags: ["금전소비대차", "약속어음", "정관인증", "사서증서", "유언공증"]
    }
  ];

  const attorneys = [
    {
      name: "정호길", role: "대표변호사", field: "형사 · 수사 및 재판 대응",
      image: "assets/lawyer-01.webp",
      career: ["25년 경력 형사전문", "광역수사대 강력·마약 수사 경력", "형사사건 직접 변론 및 총괄"]
    },
    {
      name: "김제도", role: "변호사", field: "형사 · 기업분쟁",
      image: "assets/lawyer-02.webp",
      career: ["사법연수원 47기 수료", "마약·사기·폭행 사건 수행", "계좌·통신 자료 분석"]
    },
    {
      name: "심상한", role: "변호사", field: "기업 회생 · 파산",
      image: "assets/lawyer-03.webp",
      career: ["사법시험 49회 합격", "前 서울지방노동위원회 공익위원", "25년 이상 경력"]
    },
    {
      name: "정주현", role: "변호사", field: "부동산 · 민사 · 형사",
      image: "assets/lawyer-04.webp",
      career: ["사법연수원 30기 수료", "前 서울중앙지방법원 조정위원", "부동산·민사 분야 전문"]
    },
    {
      name: "이경숙", role: "변호사", field: "이혼 · 상속 · 형사",
      image: "assets/lawyer-05.webp",
      career: ["사법시험 50회 합격", "대한변협 전문분야 등록", "이혼·상속 사건 다수 수행"]
    }
  ];

  const values = [
    { title: "의뢰인 권익 보호",
      desc: "의뢰인의 이익이 기준입니다. 사건 수임보다 지금 무엇이 필요한지를 먼저 말씀드립니다." },
    { title: "신뢰 우선 원칙",
      desc: "가능한 것과 어려운 것을 있는 그대로 알려드립니다. 결과를 약속하지 않습니다." },
    { title: "최적의 해법 제시",
      desc: "소송만이 답은 아닙니다. 합의·조정을 포함해 부담이 가장 적은 길을 함께 찾습니다." },
    { title: "진행 상황 공유",
      desc: "지금 어느 단계인지, 다음에 무엇이 오는지 단계마다 알려드립니다." },
    { title: "전문성으로 증명",
      desc: "분야별 전문 변호사가 하나의 사건을 교차 검토해 놓치는 쟁점을 줄입니다." },
    { title: "끝까지 함께",
      desc: "조사 동행부터 재판 변론까지, 사건이 끝날 때까지 담당 변호사가 유지됩니다." }
  ];

  const pad = (n) => String(n).padStart(2, "0");


  /* ===================================================================
     업무분야 탭
  =================================================================== */

  const tabsBox      = $("#practiceTabs");
  const panel        = $("#practicePanel");
  const pImage       = $("#practiceImage");
  const pEn          = $("#practiceEn");
  const pName        = $("#practiceName");
  const pDesc        = $("#practiceDesc");
  const pTags        = $("#practiceTags");
  const pCurrent     = $("#practiceCurrent");
  const pTotal       = $("#practiceTotal");

  let practiceIndex = 0;
  let panelTimer = null;

  if (tabsBox) {
    tabsBox.replaceChildren(...practices.map((item, index) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "tab";
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", String(index === 0));
      tab.dataset.index = String(index);
      tab.textContent = item.name;
      tab.addEventListener("click", () => showPractice(index));
      return tab;
    }));
  }

  const tabs = $$(".tab");

  const showPractice = (index, animate = true) => {
    const item = practices[index];
    if (!item) return;

    practiceIndex = index;
    window.clearTimeout(panelTimer);

    tabs.forEach((tab, i) => {
      tab.classList.toggle("is-active", i === index);
      tab.setAttribute("aria-selected", String(i === index));
    });

    if (pCurrent) pCurrent.textContent = String(index + 1);

    /*
      좁은 화면에서 선택한 탭이 보이도록 탭 줄만 가로로 움직인다.
      scrollIntoView 를 쓰면 초기 렌더에서 페이지가 이 섹션으로 튄다.
    */
    const tab = tabs[index];
    if (animate && tab && tabsBox) {
      tabsBox.scrollTo({
        left: tab.offsetLeft - (tabsBox.clientWidth - tab.offsetWidth) / 2,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }

    const apply = () => {
      if (pImage) {
        pImage.src = item.image;
        pImage.alt = item.name;
      }
      if (pEn)   pEn.textContent   = item.en;
      if (pName) pName.textContent = item.name;
      if (pDesc) pDesc.textContent = item.desc;

      if (pTags) {
        pTags.replaceChildren(...item.tags.map((tag) => {
          const li = document.createElement("li");
          li.textContent = tag;
          return li;
        }));
      }
    };

    if (!animate || !panel || prefersReducedMotion) {
      apply();
      return;
    }

    panel.classList.add("is-changing");

    panelTimer = window.setTimeout(() => {
      apply();
      requestAnimationFrame(() => panel.classList.remove("is-changing"));
      /* rAF 는 탭이 백그라운드면 멈추므로 타이머로 안전망을 둔다 */
      window.setTimeout(() => panel.classList.remove("is-changing"), 200);
    }, 220);
  };

  const stepPractice = (delta) => {
    showPractice((practiceIndex + delta + practices.length) % practices.length);
  };

  $("#practicePrev")?.addEventListener("click", () => stepPractice(-1));
  $("#practiceNext")?.addEventListener("click", () => stepPractice(1));

  if (pTotal) pTotal.textContent = String(practices.length);

  /* 패널 위 좌우 스와이프 */
  if (panel) {
    let sx = 0, sy = 0, tracking = false, axis = null;

    panel.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") return;   // 마우스는 화살표로
      sx = event.clientX; sy = event.clientY;
      tracking = true; axis = null;
    });

    panel.addEventListener("pointermove", (event) => {
      if (!tracking || axis) return;
      const dx = event.clientX - sx;
      const dy = event.clientY - sy;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      /* 세로 의도면 페이지 스크롤에 양보한다 */
      axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    });

    panel.addEventListener("pointerup", (event) => {
      if (!tracking) return;
      const dx = event.clientX - sx;
      if (axis === "x" && Math.abs(dx) > 46) stepPractice(dx < 0 ? 1 : -1);
      tracking = false; axis = null;
    });

    panel.addEventListener("pointercancel", () => { tracking = false; axis = null; });
  }

  showPractice(0, false);


  /* ===================================================================
     변호인단
  =================================================================== */

  const lawyerGrid = $("#lawyerGrid");

  if (lawyerGrid) {
    lawyerGrid.replaceChildren(...attorneys.map((person) => {
      const li = document.createElement("li");

      /*
        터치 기기에서는 호버가 없으므로 버튼으로 만들어 탭하면 펼쳐지게 한다.
        마우스 환경에서는 호버로 열리므로 버튼이어도 방해되지 않는다.
      */
      const card = document.createElement("button");
      card.type = "button";
      card.className = "lawyer-card";
      card.setAttribute("aria-expanded", "false");

      const img = document.createElement("img");
      img.className = "lawyer-photo";
      img.src = person.image;
      img.alt = `${person.name} ${person.role}`;
      img.loading = "lazy";

      const plus = document.createElement("span");
      plus.className = "lawyer-plus";
      plus.setAttribute("aria-hidden", "true");
      plus.textContent = "+";

      const info = document.createElement("span");
      info.className = "lawyer-info";

      const name = document.createElement("span");
      name.className = "lawyer-name";
      name.append(document.createTextNode(person.name));
      const role = document.createElement("small");
      role.textContent = person.role;
      name.append(role);

      const field = document.createElement("span");
      field.className = "lawyer-field";
      field.textContent = person.field;

      const career = document.createElement("ul");
      career.className = "lawyer-career";
      career.append(...person.career.map((line) => {
        const item = document.createElement("li");
        item.textContent = line;
        return item;
      }));

      info.append(name, field, career);
      card.append(img, plus, info);

      card.addEventListener("click", () => {
        const open = card.classList.toggle("is-open");
        card.setAttribute("aria-expanded", String(open));
      });

      li.append(card);
      return li;
    }));
  }


  /* ===================================================================
     약속 6항목
  =================================================================== */

  const valueGrid = $("#valueGrid");

  if (valueGrid) {
    valueGrid.replaceChildren(...values.map((item, index) => {
      const li = document.createElement("li");
      li.className = "value-card";

      const no = document.createElement("span");
      no.className = "value-no";
      no.setAttribute("aria-hidden", "true");
      no.textContent = pad(index + 1);

      const title = document.createElement("h3");
      title.textContent = item.title;

      const desc = document.createElement("p");
      desc.textContent = item.desc;

      li.append(no, title, desc);
      return li;
    }));
  }


  /* ===================================================================
     상담 폼

     전송 처리는 아직 연결되지 않았다. 값 검증까지만 하고
     실제 접수는 Netlify Forms 또는 백엔드에 연결해야 한다 (README 참고).
  =================================================================== */

  const form   = $("#contactForm");
  const status = $("#formStatus");

  const setStatus = (message, isError = false) => {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name  = $("#fName");
    const phone = $("#fPhone");
    const agree = $("#fAgree");

    [name, phone].forEach((el) => el?.setAttribute("aria-invalid", "false"));

    if (!name?.value.trim()) {
      name?.setAttribute("aria-invalid", "true");
      name?.focus();
      setStatus("이름을 입력해 주세요.", true);
      return;
    }

    /* 숫자만 남겨 9~11자리면 통과 — 하이픈·공백 형식은 따지지 않는다 */
    const digits = (phone?.value || "").replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 11) {
      phone?.setAttribute("aria-invalid", "true");
      phone?.focus();
      setStatus("연락처를 다시 확인해 주세요.", true);
      return;
    }

    if (!agree?.checked) {
      agree?.focus();
      setStatus("개인정보 수집·이용 동의가 필요합니다.", true);
      return;
    }

    setStatus("전송 기능이 아직 연결되지 않았습니다. 010-0000-0000 으로 연락 주세요.", true);
  });


  /* ===================================================================
     헤더 상태 · 현재 섹션
  =================================================================== */

  const header = $("#header");
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

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
      ticking = false;
    });
  };

  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  $("#railTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });


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

  if (isTouch) document.documentElement.classList.add("is-touch");
})();
