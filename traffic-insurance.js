/* =====================================================================
   운전자보험 교통사고 랜딩 쪽 — traffic-insurance.html 전용

   main.js 보다 먼저 불러와야 합니다.

   이 파일이 하는 일은 넷입니다.
     1. 성공사례 여섯 칸을 그립니다 (아래 wins).
     2. 숫자가 0 에서 올라가는 효과.
     3. 화면을 내릴 때 칸이 떠오르는 효과를 켭니다(AOS).
     4. 카톡 단추에 법인 채널 주소를 끼웁니다.

   ⚠️ 법정형 · 조문 · 보험 약관의 한도는 개정되거나 상품마다 다릅니다.
      내용을 고치실 때는 반드시 변호사 검토를 거치세요.
===================================================================== */


/* =====================================================================
   성공사례

   ★ 판결문을 받으시면 여기만 고치면 됩니다. HTML 은 건드리지
     않습니다. 아래 칸을 채운 만큼 쪽에 나옵니다.

   한 칸은 이렇게 적습니다.

       {
         tag:  "판례 01",                 // 칸 위의 작은 딱지
         title:"신호위반 · 전치 8주",      // 칸의 제목
         case: "서울중앙지법 2026고단0000", // 사건번호(있으면)
         fact: "사건 개요를 한두 줄로",
         work: "유일이 한 일을 한두 줄로",
         result:"판결 결과를 한 줄로"
       }

   ⚠️ 꼭 지켜 주셔야 하는 것 (변호사법 제23조 제2항)

      · 적은 결과는 **근거를 보관**하고 계셔야 합니다.
        판결문 · 결정문을 사건번호와 선고일로 찾을 수 있게
        정리해 두십시오. 근거 없이 적으면 거짓 광고입니다.

      · **의뢰인을 알아볼 수 있는 것은 적지 마십시오.**
        이름 · 나이 · 차량번호 · 회사 이름 · 사고 장소와 날짜가
        그렇습니다. 「40대 운전자」 「서울 시내 교차로」 정도로
        충분합니다.

      · 「무조건」 「반드시」 「100%」 같은 말을 쓰지 마십시오.
        결과를 약속하는 광고가 됩니다.

      · 다른 법률사무소의 사례를 옮겨 적지 마십시오.

   ★ 아직 자료가 없는 칸은 wait: true 로 두십시오.
     「실제 판결문 등록 예정」으로 흐리게 나옵니다.
     여섯 칸을 다 채우지 않으셔도 됩니다. 넷이면 넷만 나옵니다.
===================================================================== */

window.PAGE_DATA = {

  wins: [
    {
      tag:  "판례 01",
      title:"오토바이 동승자 대뇌 손상",
      fact: "승객을 태우려 갑자기 차로를 바꾼 택시가 직진하던 오토바이를 충격. 동승자가 대뇌 · 소뇌 손상을 입었습니다.",
      work: "배달통 때문에 위험이 커졌고 동승자에게도 안전운행을 촉구할 의무가 있었다는 상대방 주장을 다퉈 배척시켰습니다.",
      result:"<b>1억 7,283만원</b> 인용",
      case: "서울중앙지방법원 2015가단5285870 · 2018. 1. 25. 선고"
    },
    {
      tag:  "판례 02",
      title:"비보호 좌회전 버스 — 동승자는 감액 없이",
      fact: "교차로에서 비보호 좌회전하던 전세버스가 직진 차량을 충격. 운전자는 대퇴골 · 경골 골절, 동승자는 늑골 다발골절.",
      work: "운전자 쪽 과실로 책임이 85%로 제한되는 가운데, 동승자는 운행이익을 함께 누린 사이가 아님을 밝혀 동승자에게는 제한이 적용되지 않게 했습니다.",
      result:"운전자 <b>9,301만원</b> · 동승자 <b>3,064만원</b> 인용",
      case: "서울서부지방법원 2016가단239331 · 2017. 10. 17. 선고"
    },
    {
      tag:  "판례 03",
      title:"「전적으로 피해자 과실」 주장을 깨다",
      fact: "고속도로에서 앞 차량이 갑자기 차로를 바꾸자 이를 피하려다 중앙분리대를 들이받아 요추가 골절됐습니다.",
      work: "상대방은 피해자가 시속 136km로 과속했으니 책임이 없다고 주장했습니다. 블랙박스 영상과 상대 운전자의 진술로 <b>방향지시등을 켜지 않고</b> 진로를 바꾼 사실을 밝혔습니다.",
      result:"<b>8,052만원</b> 인용",
      case: "서울중앙지방법원 2016가단5145283 · 2017. 8. 9. 선고"
    },
    {
      tag:  "판례 04",
      title:"조수석 동승자 청력 상실 — 감액 주장 둘 다 배척",
      fact: "전방주시의무를 지키지 않은 차량이 앞차를 추돌. 조수석 동승자가 한쪽 청력을 잃었습니다.",
      work: "상대방의 <b>호의동승 감액</b> 주장과 <b>안전띠 미착용</b> 주장을 모두 다퉈 받아들여지지 않게 했습니다.",
      result:"<b>3,656만원</b> 인용 · 노동능력상실률 20% 인정",
      case: "서울중앙지방법원 2016가단5040166 · 2017. 4. 12. 선고"
    },
    {
      tag:  "판례 05",
      title:"중앙선 침범 유턴 택시 — 이륜차 과실 부정",
      fact: "2차로에 서 있다가 급히 1차로를 가로질러 황색 복선 중앙선을 넘어 유턴한 택시와 뒤따르던 이륜차가 충돌했습니다.",
      work: "뒤따르던 이륜차 운전자에게도 과실이 있다는 주장을 다퉈, 상대방 책임이 제한되지 않게 했습니다.",
      result:"<b>2,700만원</b> 화해권고결정",
      case: "서울중앙지방법원 2024가단5238388 · 2026. 7. 3. 결정"
    },
    {
      tag:  "판례 06",
      title:"보험사가 낸 채무부존재확인의 소 — 각하",
      fact: "버스 안에서 넘어져 외상성 경막하 출혈을 입은 승객을 상대로, 버스 기사와 보험사가 「배상할 채무가 없음을 확인해 달라」며 소를 냈습니다.",
      work: "치료비가 이미 지급됐고 달리 청구받은 바도 없어 <b>확인의 이익이 없다</b>는 점을 들어 본안 전 항변을 했습니다.",
      result:"<b>소 각하</b> · 소송비용도 상대방 부담",
      case: "인천지방법원 2024가단236845 · 2025. 1. 14. 선고"
    }
  ]

};


/* =====================================================================
   성공사례를 그린다
===================================================================== */

(function drawWins() {
  const grid = document.getElementById("winGrid");
  if (!grid) return;

  const rows = (window.PAGE_DATA && window.PAGE_DATA.wins) || [];
  if (!rows.length) {
    grid.remove();
    return;
  }

  /* 글을 그대로 넣는다. 꺾쇠가 섞여도 화면에 글자로만 보이게. */
  const put = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  /*
    본문 세 줄(사건 개요 · 유일의 대응 · 판결 결과)만 <b> 를 쓸 수 있게
    한다. 금액처럼 눈에 띄어야 하는 말이 있기 때문이다.

    ⚠️ 이 글은 위의 wins 에 우리가 직접 적은 것뿐이다. 바깥에서
       들어온 글을 여기에 넣지 마십시오.
    ⚠️ <b> 와 <br> 말고 다른 꺾쇠는 쓰지 마십시오.
  */
  const putRich = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html) n.innerHTML = String(html).replace(/<(?!\/?(?:b|br)\b)[^>]*>/g, "");
    return n;
  };

  const card = (w, i) => {
    const li = document.createElement("li");
    li.className = "win" + (w.wait ? " is-wait" : "");

    /* 하나씩 차례로 떠오르게. 여섯 칸이 한꺼번에 튀면 어지럽다. */
    li.setAttribute("data-aos", "fade-up");
    li.setAttribute("data-aos-delay", String((i % 3) * 90));

    /*
      판결문 그림. assets/ins-3d-verdict.webp 가 있으면 들어갑니다.
      위의 PIC 묶음이 data-i3d 를 찾아 넣으므로 여기서는 자리만 만듭니다.
    */
    const pic = put("span", "win-pic");
    pic.setAttribute("data-i3d", "verdict");
    pic.setAttribute("aria-hidden", "true");
    li.append(pic);

    li.append(put("span", "win-no", w.tag || "판례 " + String(i + 1).padStart(2, "0")));
    li.append(put("h3", "win-ttl", w.wait ? "실제 판결문 등록 예정" : (w.title || "")));

    const dl = document.createElement("dl");
    dl.className = "win-rows";

    [["사건 개요", w.fact], ["유일의 대응", w.work], ["판결 결과", w.result]]
      .forEach(([label, value]) => {
        const row = document.createElement("div");
        row.append(put("dt", "", label));
        row.append(putRich("dd", "", value || "—"));
        dl.append(row);
      });

    li.append(dl);

    /* 사건번호가 있으면 맨 아래에 작게 */
    if (!w.wait && w.case) {
      li.append(put("p", "win-case", w.case));
    }

    return li;
  };

  grid.replaceChildren(...rows.map(card));
})();


/* =====================================================================
   숫자가 올라가는 효과

   ⚠️ 숫자는 HTML 에 이미 적혀 있습니다(data-count 와 같은 값).
      자바스크립트가 돌지 않아도 3,000 과 25 는 그대로 보입니다.
      그러니 이 부분이 사라져도 쪽이 망가지지 않습니다.
===================================================================== */

(function countUp() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;

  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still || !("IntersectionObserver" in window)) return;   /* 적힌 값 그대로 */

  /* 3000 → 3,000 */
  const comma = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const run = (el) => {
    const end = parseInt(el.dataset.count, 10);
    if (!Number.isFinite(end)) return;

    const useComma = el.hasAttribute("data-comma");
    const ms = 1200;
    const t0 = performance.now();

    (function step(now) {
      const p = Math.min((now - t0) / ms, 1);
      /* 끝에서 부드럽게 멎도록 */
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(end * eased);
      el.textContent = useComma ? comma(v) : String(v);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = useComma ? comma(end) : String(end);
    })(t0);
  };

  const io = new IntersectionObserver((rows) => {
    rows.forEach((row) => {
      if (!row.isIntersecting) return;
      run(row.target);
      io.unobserve(row.target);
    });
  }, { threshold: 0.6 });

  nums.forEach((n) => io.observe(n));
})();


/* =====================================================================
   떠오르는 효과 (AOS)

   꾸러미는 vendor/aos.js 에 있습니다. 어디서 받아왔는지는
   vendor/README.md 를 보십시오.

   ⚠️ 「화면 움직임 줄이기」를 켜 두신 분께는 효과를 끕니다.
      멀미를 하시는 분이 있고, 그분들께는 효과가 방해입니다.
      disable 은 AOS 가 제공하는 기능입니다.

   ⚠️ once: true — 한 번 떠오르면 다시 숨기지 않습니다.
      올렸다 내렸다 할 때마다 글이 사라지면 읽기 어렵습니다.
===================================================================== */

(function startAOS() {
  if (typeof AOS === "undefined") return;    /* 꾸러미가 없으면 그냥 넘어간다 */

  AOS.init({
    duration: 620,
    easing: "ease-out-cubic",
    once: true,
    offset: 90,
    disable: () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  });

  /*
    성공사례처럼 나중에 그려 넣은 칸은 AOS 가 모릅니다.
    한 번 다시 세어 달라고 알려 줍니다.
  */
  window.addEventListener("load", () => AOS.refreshHard());
})();


/* =====================================================================
   카톡 단추

   채널 주소는 main.js 의 KAKAO_URL 한 곳에만 둡니다.
   여기에 주소를 적지 마십시오. 주소가 바뀌면 두 군데를 고쳐야 합니다.

   main.js 가 이 파일보다 나중에 불러와지므로, 다 불러온 뒤에
   (load) 가져옵니다. 주소가 비어 있으면 단추는 상담 신청서로
   내려가게 그대로 둡니다 — 눌리지 않는 단추보다 낫습니다.
===================================================================== */

window.addEventListener("load", function wireKakao() {
  let url = "";
  try { url = KAKAO_URL || ""; } catch (e) { url = ""; }
  if (!url) return;

  document.querySelectorAll("[data-kakao]").forEach((a) => {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    /* 새 창으로 열린다는 것은 화면 낭독기에만 따로 알린다 */
    const note = document.createElement("span");
    note.className = "sr-only";
    note.textContent = "(새 창)";
    a.append(note);
  });
});


/* =====================================================================
   3D 아이콘

   data-i3d="이름" 이 붙은 칸에 assets/ins-3d-이름.webp 를 찾아 넣습니다.

   ★ 파일이 없으면 아무 일도 일어나지 않고, 안에 들어 있는
     선그림(.ic)이 그대로 보입니다. 그래서
       · 그림을 나중에 올리셔도 되고
       · 그림이 마음에 안 드시면 assets/ 에서 지우기만 하면
         선그림으로 되돌아갑니다.
     쪽의 코드는 어느 쪽이든 고치지 않습니다.

   ⚠️ 파일 이름을 바꾸지 마십시오. HTML 의 data-i3d 와 짝입니다.
      (data-i3d="bank"  ↔  assets/ins-3d-bank.webp)

   ⚠️ 그림은 투명 배경이어야 합니다. 흰 배경으로 올리시면
      옅은 파란 칸 위에 흰 네모가 생깁니다.
===================================================================== */

/*
  data-i3d="이름"  →  assets/ins-3d-이름.webp   (작은 3D 아이콘)
  data-art="이름"  →  assets/ins-art-이름.webp  (휴대폰 화면 속 그림)
  둘 다 같은 방식으로 찾아 넣습니다.
*/
const PIC = [["i3d", "ins-3d-", "i3d"], ["art", "ins-art-", "art"]];

/*
  ★ 함수로 둔 까닭 — 성공사례 칸은 이 파일 위쪽에서 자바스크립트가
    그립니다. 그래서 그림 찾기를 그보다 뒤에서 불러야 합니다.
    쪽에 칸을 더 넣으시고 다시 부르셔도 되도록 함수로 두었습니다.
    이미 그림이 들어간 칸은 has-i3d 가 붙어 있어 건너뜁니다.
*/
function fillPictures() {
PIC.forEach(([attr, prefix, cls]) => {
document.querySelectorAll("[data-" + attr + "]:not(.has-" + cls + ")").forEach((slot) => {
  const src = "assets/" + prefix + slot.dataset[attr] + ".webp";

  const probe = new Image();
  probe.onload = () => {
    const img = document.createElement("img");
    img.className = cls;
    img.src = src;
    img.alt = "";
    img.width = probe.naturalWidth;
    img.height = probe.naturalHeight;
    img.loading = "lazy";
    img.decoding = "async";
    slot.append(img);
    slot.classList.add("has-" + cls);  /* 이것이 붙으면 선그림이 숨습니다 */
  };
  probe.onerror = () => {};            /* 없으면 선그림 그대로 */
  probe.src = src;
});
});
}

fillPictures();


/* =====================================================================
   더 오래 머물게 하는 움직임 셋

   2026-11-26. 법인 요청으로 넣었습니다.
     ① 형광펜이 그어집니다
     ② 맨 위 진행 막대
     ③ 머리말 휴대폰이 스크롤에 따라 아주 조금 움직입니다

   ⚠️ 셋 다 「화면 움직임 줄이기」를 켜 두신 분께는 돌지 않습니다.
      멀미를 하시는 분이 있습니다. 이 검사를 빼지 마십시오.
   ⚠️ 셋 다 없어도 쪽은 그대로 읽힙니다. 장식입니다.
===================================================================== */

(function liveliness() {
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- ① 형광펜 ---------- */
  const marks = document.querySelectorAll(".mark");
  if (marks.length) {
    if (still || !("IntersectionObserver" in window)) {
      /* 움직임 없이, 처음부터 그어진 채로 */
      marks.forEach((m) => m.classList.add("is-lit"));
    } else {
      const io = new IntersectionObserver((rows) => {
        rows.forEach((row) => {
          if (!row.isIntersecting) return;
          row.target.classList.add("is-lit");
          io.unobserve(row.target);
        });
      }, { threshold: 0.9, rootMargin: "0px 0px -8% 0px" });
      marks.forEach((m) => io.observe(m));
    }
  }

  /* ---------- ② 진행 막대 · ③ 휴대폰 ---------- */
  const bar = document.querySelector(".prog i");

  /*
    ★ 진행 막대는 「화면 움직임 줄이기」를 켜 두신 분께도 그립니다.
      어디까지 읽었는지 알려 주는 길잡이이지, 눈을 어지럽히는
      장식이 아닙니다. 휴대폰 모형이 따라 움직이는 것만 끕니다.
  */
  const phones = still ? [] : [...document.querySelectorAll(".lp-hero-art .phone")];
  if (!bar && !phones.length) return;

  /*
    스크롤마다 계산하면 화면이 버벅입니다.
    requestAnimationFrame 으로 한 프레임에 한 번만 셈합니다.
  */
  let waiting = false;

  const paint = () => {
    waiting = false;
    const y = window.scrollY || 0;

    if (bar) {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, (y / total) * 100) : 0;
      bar.style.setProperty("--p", pct.toFixed(2) + "%");
    }

    /*
      머리말 휴대폰. 내려갈수록 아주 조금 올라가고 더 눕습니다.
      ⚠️ 크게 움직이면 어지럽습니다. 최대 26px · 4도입니다.
      ⚠️ 기울기는 CSS 의 .phone-tilt-* 가 정합니다. 여기서는
         --sy(올라가는 거리)와 --sr(더 눕는 각도)만 건넵니다.
    */
    if (phones.length) {
      const k = Math.max(0, Math.min(1, y / (window.innerHeight || 800)));
      phones.forEach((el, i) => {
        const depth = i === 0 ? 1 : 0.62;     /* 뒤쪽은 덜 움직입니다 */
        el.style.setProperty("--sy", (-26 * k * depth).toFixed(1) + "px");
        el.style.setProperty("--sr", (4 * k * depth).toFixed(2) + "deg");
      });
    }
  };

  const onScroll = () => {
    if (waiting) return;
    waiting = true;
    requestAnimationFrame(paint);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  paint();
})();
