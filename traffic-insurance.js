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
    { tag: "판례 01", wait: true },
    { tag: "판례 02", wait: true },
    { tag: "판례 03", wait: true },
    { tag: "판례 04", wait: true },
    { tag: "판례 05", wait: true },
    { tag: "판례 06", wait: true }
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
        row.append(put("dd", "", value || "—"));
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
