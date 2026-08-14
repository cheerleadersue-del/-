/* =====================================================================
   법무법인 유일 — LAW FIRM YUIL
   main.js

   - 3D 커버플로우 캐러셀 (포인터 드래그 · 터치 스와이프 · 키보드 · 점)
   - 선택된 변호사 상세 전환
   - 모바일 메뉴
===================================================================== */

(() => {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const prefersReducedMotion =
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);


  /* ===================================================================
     데이터

     ⚠ 사진 파일과 성명의 짝은 시안만으로 확정할 수 없어 임시 배정했다.
        실제 인물과 대조해 image 값을 확인할 것.
  =================================================================== */

  const attorneys = [
    {
      name: "심상한",
      role: "변호사",
      sub: "기업 회생 · 파산 전문",
      image: "assets/lawyer-03.webp",
      heading: "심상한 변호사",
      title: "기업 회생 · 파산 전문",
      career: [
        "사법시험 49회 합격",
        "前 법무법인 세명 구성원",
        "前 서울지방노동위원회 공익위원 (심판담당)",
        "25년 이상 경력",
        "법무법인 유일 변호사"
      ],
      points: [
        { icon: "shield", title: "회생·파산 절차 총괄",
          desc: "채무와 소득, 재산 구조를 분석해 절차 전체의 방향을 설계합니다." },
        { icon: "scale", title: "채권자 대응",
          desc: "채권자 목록과 이의를 검토해 협상과 대응 순서를 정리합니다." },
        { icon: "doc", title: "변제계획안 작성",
          desc: "인가 요건에 맞춰 계획안을 작성하고 보정 절차를 수행합니다." },
        { icon: "user", title: "기업 법률자문",
          desc: "노동·계약 분쟁까지 함께 검토해 재무 위험을 줄입니다." }
      ]
    },
    {
      name: "김제도",
      role: "변호사",
      sub: "형사사건 전문",
      image: "assets/lawyer-02.webp",
      heading: "김제도 변호사",
      title: "형사사건 전문",
      career: [
        "사법연수원 47기 수료",
        "마약류관리법 위반 사건 다수 수행",
        "사기 · 폭행 · 상해 · 도주치상 사건 수행",
        "법무법인 유일 변호사"
      ],
      points: [
        { icon: "shield", title: "마약사건 대응",
          desc: "감정 결과의 의미와 한계를 검토하고 진술 방향을 함께 준비합니다." },
        { icon: "scale", title: "쟁점 정리",
          desc: "기록과 사실관계를 면밀히 검토해 다툴 지점을 먼저 가립니다." },
        { icon: "doc", title: "증거 분석",
          desc: "계좌·통신 자료가 실제로 무엇을 증명하는지 확인합니다." },
        { icon: "user", title: "조사 동행",
          desc: "경찰·검찰 조사에 동행해 진술이 왜곡되지 않도록 합니다." }
      ]
    },
    {
      name: "정호길",
      role: "대표변호사",
      sub: "25년 경력 형사전문 변호사",
      image: "assets/lawyer-01.webp",
      heading: "정호길 대표변호사",
      title: "25년 경력 형사전문",
      signature: "assets/signature.png",
      career: [
        "광주경찰청 광수대 강력팀",
        "서울경찰청 광역수사대",
        "지능범죄수사대 마약수사팀",
        "여성 · 청소년범죄수사대",
        "법무법인 유일 대표변호사"
      ],
      points: [
        { icon: "shield", title: "광수대 강력사건 총괄",
          desc: "광역수사 경험을 바탕으로 사건을 정확하게 분석하고 전략을 설계합니다." },
        { icon: "scale", title: "마약 사건 직접 검토",
          desc: "수사 초기부터 재판까지 직접 검토하여 불리한 상황을 뒤집는 경험이 많습니다." },
        { icon: "doc", title: "형사사건 직접 변론",
          desc: "수사 대응부터 재판 변론까지 대표변호사가 직접 수행합니다." },
        { icon: "user", title: "대표변호사 직접 상담",
          desc: "모든 상담은 대표변호사가 직접 진행하여 사건의 본질을 정확히 파악합니다." }
      ]
    },
    {
      name: "정주현",
      role: "변호사",
      sub: "부동산 · 민사 · 형사 전문",
      image: "assets/lawyer-04.webp",
      heading: "정주현 변호사",
      title: "부동산 · 민사 · 형사 전문",
      career: [
        "사법연수원 30기 수료",
        "前 서울중앙지방법원 조정위원",
        "부동산 · 민사 분야 전문",
        "형사사건 다수 수행",
        "법무법인 유일 변호사"
      ],
      points: [
        { icon: "shield", title: "부동산 분쟁 대응",
          desc: "등기와 계약 경위를 확인해 권리 관계를 먼저 정리합니다." },
        { icon: "scale", title: "조정 경험",
          desc: "법원 조정위원 경험을 바탕으로 합의 가능 지점을 찾습니다." },
        { icon: "doc", title: "손해배상 검토",
          desc: "책임 범위와 손해액 산정을 자료로 뒷받침합니다." },
        { icon: "user", title: "민형사 병행 대응",
          desc: "같은 사실관계의 민사와 형사를 함께 놓고 순서를 정합니다." }
      ]
    },
    {
      name: "이경숙",
      role: "변호사",
      sub: "이혼 · 상속 · 형사 전문",
      image: "assets/lawyer-05.webp",
      heading: "이경숙 변호사",
      title: "이혼 · 상속 · 부동산 · 형사 전문",
      career: [
        "사법시험 50회 합격",
        "대한변협 전문분야 등록",
        "이혼 · 상속 사건 다수 수행",
        "형사사건 전문",
        "법무법인 유일 변호사"
      ],
      points: [
        { icon: "shield", title: "이혼 · 재산분할",
          desc: "재산 형성 경위를 자료로 정리해 분할 기준을 다툽니다." },
        { icon: "scale", title: "상속 · 유류분",
          desc: "상속 관계와 생전 처분을 확인해 청구 범위를 정합니다." },
        { icon: "doc", title: "친권 · 양육권",
          desc: "양육 환경을 구체적으로 증명할 자료를 준비합니다." },
        { icon: "user", title: "의뢰인 현실 고려",
          desc: "법률적 판단과 생활 여건을 함께 놓고 방향을 제시합니다." }
      ]
    }
  ];

  /* 시안 기준 첫 화면은 대표변호사(가운데) */
  const START_INDEX = attorneys.findIndex((a) => a.role === "대표변호사");

  const stats = [
    { icon: "team",   value: "25년+",  label: "형사전문 경력" },
    { icon: "shield", value: "1,800+", label: "마약 사건 해결 건수" },
    { icon: "gavel",  value: "2,500+", label: "형사 사건 성공 경험" },
    { icon: "thumb",  value: "95.6%",  label: "의뢰인 만족도" },
    { icon: "medal",  value: "25년",   label: "평균 경력의\n형사전문 변호사 팀" }
  ];


  /* ===================================================================
     아이콘
  =================================================================== */

  const ICONS = {
    shield: '<path d="M12 2.8 4.5 6v6.2c0 4.6 3.2 7.8 7.5 9 4.3-1.2 7.5-4.4 7.5-9V6L12 2.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m8.8 11.8 2.3 2.4 4.2-4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    scale:  '<path d="M12 4v16M7 20h10M4 8h16M6 8l-2.5 5a2.8 2.8 0 0 0 5 0L6 8Zm12 0-2.5 5a2.8 2.8 0 0 0 5 0L18 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    doc:    '<path d="M6 3.2h7.5L19 8.6v12.2H6V3.2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M13.2 3.4v5.4H19M9 12.6h6M9 16.2h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    user:   '<circle cx="12" cy="8" r="3.6" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    team:   '<circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16 6.6a3 3 0 0 1 0 5.8M17.4 14.6a6.2 6.2 0 0 1 3.8 4.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    gavel:  '<path d="m4 19 6.5-6.5M13.5 4.5 19.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="10.6" y="5.4" width="8.4" height="4.4" rx="2.2" transform="rotate(45 10.6 5.4)" stroke="currentColor" stroke-width="1.5"/><path d="M3 21h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    thumb:  '<path d="M7 10.5 11 3a2.2 2.2 0 0 1 2.2 2.2V9h4.6a2 2 0 0 1 2 2.4l-1.3 6A2 2 0 0 1 16.5 19H7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><rect x="3.2" y="10" width="3.8" height="9.5" rx="1.2" stroke="currentColor" stroke-width="1.5"/>',
    medal:  '<circle cx="12" cy="9.5" r="5.2" stroke="currentColor" stroke-width="1.5"/><path d="m12 7.2 1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3 1-2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="m8.6 14.4-1.4 6.4 4.8-2.4 4.8 2.4-1.4-6.4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>'
  };

  const svgIcon = (name) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = ICONS[name] || "";
    return svg;
  };


  /* ===================================================================
     커버플로우 캐러셀
  =================================================================== */

  const coverflow = $("#coverflow");
  const stage     = $("#cfStage");
  const track     = $("#cfTrack");
  const dotsBox   = $("#cfDots");

  let activeIndex = START_INDEX < 0 ? 0 : START_INDEX;
  let dragFraction = 0;          // 드래그 중 카드가 손가락을 따라오는 양 (카드 단위)
  const total = attorneys.length;

  /* ---------- 카드 만들기 ---------- */

  if (track) {
    track.replaceChildren(...attorneys.map((person, index) => {
      const li = document.createElement("li");
      li.className = "coverflow-card";
      li.dataset.index = String(index);

      const panel = document.createElement("button");
      panel.type = "button";
      panel.className = "coverflow-panel";
      panel.setAttribute("aria-label", `${person.name} ${person.role} 보기`);

      const img = document.createElement("img");
      img.className = "coverflow-photo";
      img.src = person.image;
      img.alt = "";
      img.loading = index === START_INDEX ? "eager" : "lazy";
      img.draggable = false;

      const info = document.createElement("span");
      info.className = "coverflow-info";

      const role = document.createElement("span");
      role.className = "card-role";
      role.textContent = person.role;

      const name = document.createElement("span");
      name.className = "card-name";
      name.textContent = person.name;

      const sub = document.createElement("span");
      sub.className = "card-sub";
      sub.textContent = person.role === "대표변호사" ? person.sub : person.role;

      const plus = document.createElement("span");
      plus.className = "card-plus";
      plus.setAttribute("aria-hidden", "true");
      plus.textContent = "+";

      const cta = document.createElement("span");
      cta.className = "card-cta";
      cta.textContent = `${person.role} 상담`;

      info.append(role, name, sub, plus, cta);
      panel.append(img, info);
      li.append(panel);
      return li;
    }));
  }

  const cards = $$(".coverflow-card");

  /* ---------- 점 ---------- */

  if (dotsBox) {
    dotsBox.replaceChildren(...attorneys.map((person, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "coverflow-dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `${person.name} ${person.role}`);
      dot.addEventListener("click", () => goTo(index));
      return dot;
    }));
  }

  const dots = $$(".coverflow-dot");

  /* ---------- 위치 계산 ---------- */

  /* 원형 배치라 가장 가까운 방향으로 도는 거리를 쓴다 */
  const shortestOffset = (index) => {
    let diff = index - activeIndex;
    if (diff >  total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const layout = () => {
    const step = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--cf-step")
    ) || 196;

    cards.forEach((card, index) => {
      const offset = shortestOffset(index) + dragFraction;
      const dist = Math.abs(offset);

      /* 가장자리로 갈수록 뒤로 밀고, 기울이고, 줄인다 */
      const x  = offset * step;
      const z  = -190 * Math.min(dist, 2.6);
      const ry = clamp(offset * 21, -42, 42);
      const s  = Math.max(1 - 0.11 * dist, 0.72);
      const o  = dist > 2.55 ? 0 : dist > 1.6 ? 0.5 : dist > 0.6 ? 0.85 : 1;

      card.style.setProperty("--x",  `${x}px`);
      card.style.setProperty("--z",  `${z}px`);
      card.style.setProperty("--ry", `${ry}deg`);
      card.style.setProperty("--s",  s.toFixed(3));
      card.style.setProperty("--o",  o.toFixed(2));
      card.style.zIndex = String(100 - Math.round(dist * 10));

      const isActive = Math.abs(shortestOffset(index)) < 0.5;
      card.classList.toggle("is-active", isActive);

      /* 화면 밖 카드는 탭 순서에서 뺀다 */
      const panel = $(".coverflow-panel", card);
      if (panel) {
        panel.tabIndex = dist > 2.55 ? -1 : 0;
        panel.setAttribute("aria-hidden", dist > 2.55 ? "true" : "false");
      }
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  };

  /* ---------- 상세 전환 ---------- */

  const profile          = $("#profile");
  const profileName      = $("#profileName");
  const profileTitle     = $("#profileTitle");
  const profileCareer    = $("#profileCareer");
  const profilePoints    = $("#profilePoints");
  const profileSignature = $("#profileSignature");

  let profileTimer = null;

  const renderProfile = (index, animate = true) => {
    const person = attorneys[index];
    if (!person) return;

    window.clearTimeout(profileTimer);

    const apply = () => {
      if (profileName)  profileName.textContent  = person.heading;
      if (profileTitle) profileTitle.textContent = person.title;

      if (profileCareer) {
        profileCareer.replaceChildren(...person.career.map((line) => {
          const li = document.createElement("li");
          li.textContent = line;
          return li;
        }));
      }

      if (profilePoints) {
        profilePoints.replaceChildren(...person.points.map((point) => {
          const li = document.createElement("li");

          const icon = document.createElement("span");
          icon.className = "point-icon";
          icon.setAttribute("aria-hidden", "true");
          icon.append(svgIcon(point.icon));

          const title = document.createElement("h3");
          title.className = "point-title";
          title.textContent = point.title;

          const desc = document.createElement("p");
          desc.className = "point-desc";
          desc.textContent = point.desc;

          li.append(icon, title, desc);
          return li;
        }));
      }

      /* 서명은 가진 사람만 노출한다 */
      if (profileSignature) {
        if (person.signature) {
          profileSignature.src = person.signature;
          profileSignature.hidden = false;
        } else {
          profileSignature.hidden = true;
        }
      }
    };

    if (!animate || !profile || prefersReducedMotion) {
      apply();
      return;
    }

    profile.classList.add("is-changing");

    profileTimer = window.setTimeout(() => {
      apply();
      requestAnimationFrame(() => profile.classList.remove("is-changing"));
      /* rAF 는 탭이 백그라운드면 멈추므로 타이머로 안전망을 둔다 */
      window.setTimeout(() => profile.classList.remove("is-changing"), 200);
    }, 240);
  };

  /* ---------- 이동 ---------- */

  const goTo = (index, animate = true) => {
    activeIndex = ((index % total) + total) % total;
    dragFraction = 0;
    layout();
    renderProfile(activeIndex, animate);
  };

  const step = (delta) => goTo(activeIndex + delta);

  $("#cfPrev")?.addEventListener("click", () => step(-1));
  $("#cfNext")?.addEventListener("click", () => step(1));

  cards.forEach((card) => {
    $(".coverflow-panel", card)?.addEventListener("click", (event) => {
      /* 드래그로 끝난 포인터라면 클릭으로 치지 않는다 */
      if (suppressClick) {
        event.preventDefault();
        return;
      }
      goTo(Number(card.dataset.index));
    });
  });


  /* ---------- 포인터 드래그 · 터치 스와이프 ---------- */

  let pointerId   = null;
  let startX      = 0;
  let startY      = 0;
  let lastX       = 0;
  let lastTime    = 0;
  let velocity    = 0;
  let moved       = 0;
  let axisLocked  = null;     // "x" | "y" | null
  let suppressClick = false;

  const stepPx = () =>
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--cf-step")
    ) || 196;

  const onPointerDown = (event) => {
    if (pointerId !== null) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerId = event.pointerId;
    startX = lastX = event.clientX;
    startY = event.clientY;
    lastTime = event.timeStamp;
    velocity = 0;
    moved = 0;
    axisLocked = null;
    suppressClick = false;
  };

  const onPointerMove = (event) => {
    if (event.pointerId !== pointerId) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    /* 처음 몇 px 로 가로/세로 의도를 판별한다. 세로면 페이지 스크롤에 양보 */
    if (!axisLocked) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      axisLocked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";

      if (axisLocked === "x") {
        coverflow?.classList.add("is-dragging");
        stage?.setPointerCapture(pointerId);
      } else {
        pointerId = null;
        return;
      }
    }

    const now = event.timeStamp;
    const dt = now - lastTime;
    if (dt > 0) {
      velocity = (event.clientX - lastX) / dt;   // px/ms
      lastX = event.clientX;
      lastTime = now;
    }

    moved = Math.abs(dx);
    /* 끝단에서도 계속 끌리되 과하게 벌어지지 않도록 범위를 제한한다 */
    dragFraction = clamp(dx / stepPx(), -total / 2, total / 2);
    layout();
  };

  const endDrag = (event) => {
    if (event.pointerId !== pointerId) return;

    if (axisLocked === "x") {
      coverflow?.classList.remove("is-dragging");

      if (stage?.hasPointerCapture?.(pointerId)) {
        stage.releasePointerCapture(pointerId);
      }

      /* 이동량 + 튕김 속도로 몇 칸 넘길지 정한다 */
      const byDistance = -Math.round(dragFraction);
      const flick = Math.abs(velocity) > 0.45 ? (velocity > 0 ? -1 : 1) : 0;
      const delta = byDistance !== 0 ? byDistance : flick;

      suppressClick = moved > 6;
      goTo(activeIndex + delta);

      /* 클릭 억제는 이번 포인터에만 적용한다 */
      window.setTimeout(() => { suppressClick = false; }, 0);
    }

    pointerId = null;
    axisLocked = null;
  };

  if (stage) {
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    /* 이미지 기본 드래그가 제스처를 방해하지 않도록 */
    stage.addEventListener("dragstart", (event) => event.preventDefault());

    stage.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft")  { event.preventDefault(); step(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
      if (event.key === "Home")       { event.preventDefault(); goTo(0); }
      if (event.key === "End")        { event.preventDefault(); goTo(total - 1); }
    });
  }


  /* ---------- 화면 폭에 맞춰 카드 크기 조정 ---------- */

  const resize = () => {
    const w = window.innerWidth;
    let cardW, cardH, cfStep;

    if (w <= 480) {
      cardW = Math.min(232, w * 0.62); cardH = cardW * 1.62; cfStep = cardW * 0.56;
    } else if (w <= 720) {
      cardW = 244; cardH = 396; cfStep = 150;
    } else if (w <= 1024) {
      cardW = 250; cardH = 406; cfStep = 172;
    } else {
      cardW = 268; cardH = 432; cfStep = 196;
    }

    const root = document.documentElement.style;
    root.setProperty("--card-w",  `${Math.round(cardW)}px`);
    root.setProperty("--card-h",  `${Math.round(cardH)}px`);
    root.setProperty("--cf-step", `${Math.round(cfStep)}px`);

    layout();
  };

  let resizeTimer = null;
  addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 120);
  });


  /* ===================================================================
     지표
  =================================================================== */

  const statsBox = $("#stats");

  if (statsBox) {
    statsBox.replaceChildren(...stats.map((stat) => {
      const li = document.createElement("li");

      const icon = document.createElement("span");
      icon.className = "stat-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.append(svgIcon(stat.icon));

      const value = document.createElement("strong");
      value.className = "stat-value";
      value.textContent = stat.value;

      const label = document.createElement("span");
      label.className = "stat-label";
      /* 라벨의 줄바꿈은 데이터에 \n 으로 들어 있다 */
      stat.label.split("\n").forEach((line, i, arr) => {
        label.append(document.createTextNode(line));
        if (i < arr.length - 1) label.append(document.createElement("br"));
      });

      li.append(icon, value, label);
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

  resize();
  goTo(activeIndex, false);
})();
