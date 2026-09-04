/* =====================================================================
   법무법인 유일 — main.js

   내용은 아래 세 배열에서 관리합니다.
   ⚠️ 법률 절차를 설명하는 문구(questions)는 반드시 변호사 검토를 거치세요.
===================================================================== */

/* ---------------------------------------------------------------------
   ★ 카카오톡 상담 주소 ★

   여기 한 줄만 고치시면 모든 페이지에 노란 카톡 버튼이 나타납니다.
   HTML 파일은 하나도 손대지 않으셔도 됩니다.

   1. 카카오톡 채널 관리자센터(business.kakao.com)에 들어가십시오.
   2. [채널] → [상세설정] 에 "채널 홈 URL" 이 있습니다.
   3. 그 주소를 아래 따옴표 안에 그대로 붙여 넣으십시오.
      예)  const KAKAO_URL = "https://pf.kakao.com/_abcdEF/chat";

   오픈채팅방을 쓰신다면 그 초대 주소를 넣으셔도 됩니다.

   비워 두면 카톡 버튼이 아예 나오지 않습니다.
   눌리지 않는 버튼을 보여드리는 것보다 없는 편이 낫기 때문입니다.

   지금 들어 있는 주소는 법무법인 유일 채널의 채팅 화면입니다.
   끝의 /chat 이 있으면 채널 소개를 건너뛰고 바로 대화창이 열립니다.
--------------------------------------------------------------------- */
const KAKAO_URL = "https://pf.kakao.com/_YxiDPX/chat";


/*
  세부 분야 페이지(criminal-*.html)는 자기 데이터를 window.PAGE_DATA 에
  담아 먼저 불러옵니다. 있으면 그것을 쓰고, 없으면 아래 기본값을 씁니다.
*/
const PAGE = window.PAGE_DATA || {};

const questions = PAGE.questions || [
  {
    tag: "형사",
    q: "수사기관에서 연락이 왔습니다. 변호사는 언제 선임해야 하나요?",
    a: [
      "조사를 받기 전입니다. 첫 진술은 이후 절차 내내 따라다닙니다. " +
      "한 번 조서에 남은 말은 나중에 바꾸기 어렵고, 바꾸면 그 자체가 불리한 사정으로 읽힙니다.",
      "무엇을 말하고 무엇을 말하지 않을지는 사실관계를 정리한 뒤에 정해야 합니다. " +
      "조사 일정이 잡히셨다면 그 전에 연락 주십시오. 변호인은 조사에 함께 들어갈 수 있습니다."
    ]
  },
  {
    tag: "형사",
    q: "구속영장이 청구되었습니다. 영장실질심사는 어떻게 준비하나요?",
    a: [
      "검사가 구속영장을 청구하면 판사가 피의자를 직접 심문합니다. " +
      "청구 다음 날 열리는 것이 보통이어서, 준비할 시간이 하루 남짓입니다.",
      "심사에서 다투는 것은 유무죄가 아니라 <b>구속의 필요성</b>입니다. " +
      "도주하거나 증거를 없앨 우려가 없다는 점을 소명해야 합니다. " +
      "주거와 직업, 가족관계, 피해 회복을 위해 한 일, 신원을 보증할 사람 — " +
      "이런 자료를 하루 안에 모아 의견서로 정리합니다.",
      "심문기일에는 변호인이 출석할 수 있습니다. " +
      "유일은 청구 사실을 확인한 즉시 기록 검토와 의견서 작성에 들어갑니다."
    ]
  },
  {
    tag: "형사",
    q: "경찰이 불송치 결정을 했습니다. 이대로 끝나는 건가요?",
    a: [
      "아닙니다. 이의신청을 할 수 있습니다. " +
      "경찰이 사건을 검찰로 넘기지 않기로 하면 고소인에게 그 이유를 통지하는데, " +
      "여기에 이의를 제기하면 사건이 검사에게 송치되어 다시 판단을 받습니다.",
      "다만 <b>고소인과 피해자</b>가 할 수 있고, 고발인의 이의신청권은 법 개정으로 제외되었습니다. " +
      "고소인이 아닌 지위에서 신고하신 경우라면 다른 방법을 찾아야 합니다.",
      "이의신청서에 무엇을 쓰느냐가 결과를 좌우합니다. " +
      "불송치 이유서를 먼저 받아 어느 지점에서 판단이 갈렸는지 확인하고, " +
      "그 부분을 겨냥한 자료를 붙여야 합니다. 같은 주장을 반복하면 결론도 반복됩니다."
    ]
  },
  {
    tag: "형사",
    q: "성범죄로 조사를 받게 되었습니다. 벌금만 내면 끝나는 것 아닌가요?",
    a: [
      "형벌만 보시면 안 됩니다. 성범죄는 유죄가 인정되면 형과 별도로 " +
      "<b>신상정보 등록, 취업제한, 경우에 따라 신상공개</b>가 따라붙습니다. " +
      "벌금형이라도 이런 처분이 함께 내려질 수 있어, 형량보다 부수처분이 삶에 더 오래 남는 경우가 많습니다.",
      "통신매체이용음란(통매음), 아동·청소년성보호법 위반, 강제추행, 강간 — " +
      "죄명마다 요건과 따라오는 처분이 다릅니다. 어떤 조문으로 의율되는지부터 확인해야 합니다.",
      "억울하게 지목되신 경우도, 실제로 잘못이 있어 수습이 필요한 경우도 " +
      "초기 진술을 어떻게 하느냐가 갈림길입니다. 혼자 조사에 응하지 마십시오."
    ]
  },
  {
    tag: "민사",
    q: "의료사고를 당했습니다. 병원을 상대로 손해배상을 받을 수 있나요?",
    a: [
      "가능하지만, 입증 책임이 원칙적으로 <b>환자 측</b>에 있다는 점이 어렵습니다. " +
      "나쁜 결과가 생겼다는 것만으로는 부족하고, 의료진의 과실과 그 과실이 결과를 불러왔다는 " +
      "연결고리를 함께 보여야 합니다.",
      "가장 먼저 하실 일은 <b>진료기록 확보</b>입니다. 환자와 보호자는 진료기록 사본을 청구할 수 있습니다. " +
      "검사 영상과 간호기록까지 빠짐없이 받아두셔야 합니다. 시간이 지나면 확보가 어려워집니다.",
      "소송 외에 한국의료분쟁조정중재원의 조정 절차도 있습니다. " +
      "비용과 기간이 적게 드는 대신 상대가 응하지 않으면 진행되지 않는 한계가 있어, " +
      "사안에 따라 어느 쪽이 유리한지 먼저 따져봅니다.",
      "손해배상 청구권에는 시효가 있습니다. 늦어질수록 선택지가 줄어듭니다."
    ]
  },
  {
    tag: "민사",
    q: "빌려준 돈을 돌려받지 못하고 있습니다. 차용증이 없어도 되나요?",
    a: [
      "차용증이 없어도 청구할 수 있습니다. 계좌이체 내역, 문자와 메신저 대화, " +
      "통화 녹음처럼 <b>빌려준 사실과 갚기로 한 약속</b>을 보여주는 자료면 됩니다.",
      "실무에서 가장 자주 걸리는 지점은 상대가 <b>“빌린 게 아니라 받은 것”</b>이라고 다투는 경우입니다. " +
      "돈이 오간 사실 자체는 인정하면서 증여라고 주장하는 것이지요. " +
      "그래서 송금 직전후의 대화 내용이 계좌내역보다 중요할 때가 많습니다.",
      "판결을 받아도 상대에게 재산이 없으면 회수하지 못합니다. " +
      "그래서 소송을 걸기 전에 재산을 먼저 파악하고, 필요하면 <b>가압류</b>로 묶어두는 순서를 권합니다. " +
      "이 순서를 바꾸면 이기고도 못 받는 일이 생깁니다.",
      "대여금 채권에도 소멸시효가 있습니다. 오래된 채권일수록 먼저 확인이 필요합니다."
    ]
  },
  {
    tag: "공통",
    q: "비용은 어떻게 정해지나요?",
    a: [
      "사건의 종류와 절차 단계에 따라 다릅니다. " +
      "수사 단계만 대응하는 경우와 재판까지 가는 경우, 심급이 올라가는 경우가 각각 다릅니다.",
      "상담 단계에서 예상되는 절차와 그에 따르는 비용 범위를 먼저 말씀드립니다. " +
      "착수 전에 서면으로 확인되지 않은 비용은 청구하지 않습니다."
    ]
  }
];

const practices = [
  {
    name: "형사",
    en: "CRIMINAL",
    credit: "정호길 대표변호사 · 양진희 변호사(성범죄)",
    image: "assets/center-criminal.webp",
    desc: "수사 단계부터 재판까지 같은 변호인이 맡습니다. " +
          "진술의 모순과 기록의 공백을 먼저 찾습니다.",
    /*
      태그에 href 를 넣으면 링크가 되고, 없으면 그냥 글자로 나온다.
      상세 페이지를 만들 때마다 href 를 채우면 된다.
    */
    tags: [
      { name: "마약",         href: "criminal-drug.html" },
      { name: "도박",         href: "criminal-gambling.html" },
      { name: "해외조직범죄",  href: "criminal-organized.html" },
      { name: "금융범죄",      href: "criminal-finance.html" },
      { name: "성범죄",       href: "criminal-sex.html" },
      { name: "코인 OTC",     href: "criminal-crypto.html" },
      { name: "성병감염",      href: "criminal-std.html" },
      /* 교통형사전문로펌.com — 법인이 따로 운영하는 사이트로 나간다 */
      { name: "교통사고",      href: "https://xn--9d0bn3sz9bs7hu8jjtol6ch2g.com/" }
    ]
  },
  {
    name: "민사",
    en: "CIVIL",
    credit: "정주현 변호사(부동산) · 김제도 변호사(의료사고)",
    image: "assets/center-civil.webp",
    desc: "다투기 전에 회수 가능성을 먼저 봅니다. " +
          "이길 수 있는지와 받을 수 있는지는 다른 문제입니다.",
    tags: [
      { name: "의료사고", href: "civil-medical.html" },
      { name: "부동산",   href: "civil-realestate.html" },
      { name: "대여금",   href: "civil-loan.html" },
      { name: "계약분쟁", href: "civil-contract.html" },
      { name: "전세사기", href: "civil-jeonse.html" },
      { name: "손해배상", href: "civil-damages.html" }
    ]
  },
  {
    name: "가사",
    en: "FAMILY",
    credit: "이경숙 변호사 · 대한변협 가사법 전문분야 등록",
    image: "assets/center-family.webp",
    desc: "재산과 양육은 감정과 분리해 다룹니다. " +
          "합의로 끝낼 수 있는 부분과 아닌 부분을 나눕니다.",
    tags: [
      { name: "이혼",     href: "family-divorce.html" },
      { name: "재산분할", href: "family-property.html" },
      { name: "양육권",   href: "family-custody.html" },
      { name: "상속",     href: "family-inheritance.html" }
    ]
  },
  {
    name: "회생",
    en: "REHABILITATION",
    credit: "심상한 변호사 · 前 서울지방노동위원회 공익위원",
    image: "assets/center-recovery.webp",
    desc: "폐업과 회생 사이에서 남길 것을 정합니다. " +
          "채권자 구성과 현금 흐름을 먼저 확인합니다.",
    tags: [
      { name: "법인회생",    href: "rehab-corporate.html" },
      { name: "개인회생",    href: "rehab-personal.html" },
      { name: "파산",        href: "rehab-bankruptcy.html" },
      { name: "복권 · 면책", href: "rehab-discharge.html" }
    ]
  },
  {
    name: "공증 · 법인/부동산 등기",
    en: "NOTARY & REGISTRATION",
    /* 담당 변호사 미정. credit 을 비워두면 그 줄은 아예 나오지 않는다. */
    image: "assets/center-notary.webp",
    desc: "분쟁이 생기기 전에 문서로 정리합니다. " +
          "나중에 다투는 비용보다 지금 확인하는 비용이 적습니다.",
    tags: [
      { name: "공증",           href: "notary.html" },
      /* moadg.com — 법인 · 부동산 등기 사이트로 나간다 */
      { name: "법인/부동산 등기", href: "https://moadg.com/" },
      { name: "계약검토",        href: "notary-review.html" },
      { name: "내용증명",        href: "notary-content.html" }
    ]
  }
];

/*
  ⚠️ "전문" 이라는 표현은 대한변협 전문분야 등록을 마친 경우에만 쓸 수 있습니다.
     등록이 확인된 항목(이경숙 변호사 가사법)만 그렇게 적었습니다.
     다른 분들도 등록이 되어 있다면 field 문구를 바꾸셔도 됩니다.
*/
const attorneys = [
  {
    name: "정호길", role: "대표변호사",
    field: "강력범죄 · 형사 · 교통사고",
    /*
      lawyer-01.webp 은 전신 컷아웃이라 목록에 넣으면 얼굴이 작아
      다른 분들과 크기가 안 맞는다. 목록에는 상반신 컷을 쓴다.
      전신 컷은 인사말 섹션에서 그대로 쓴다.
    */
    image: "assets/lawyer-01-portrait.webp",
    career: [
      "법조경력 25년 차",
      "제40회 사법시험 합격 · 사법연수원 30기",
      "한양대학교 법학과",
      "공무원연금관리공단 · 서울시교육청 법률자문",
      "한국자산관리공사 · 기술신용보증기금 법률자문",
      "前 주택도시보증공사 고문변호사"
    ]
  },
  {
    name: "양진희", role: "변호사",
    field: "강력범죄 · 성범죄 · 성감염",
    /* 사진을 올리기 전까지는 자리표시자가 대신 보인다. */
    image: "assets/lawyer-06.webp",
    career: [
      "제11회 변호사시험 합격",
      "고려대학교 법학과",
      "前 법무법인 송우",
      "現 법무법인 유일",
      "서울시의회 법률자문"
    ]
  },
  {
    name: "심상한", role: "변호사",
    field: "기업회생 · 파산 · 보험분쟁",
    image: "assets/lawyer-02.webp",
    career: [
      "제49회 사법시험 합격 · 사법연수원 39기",
      "연세대학교 법학과",
      "미국 조지워싱턴 로스쿨 IBT 과정",
      "前 서울지방노동위원회 공익위원(심판담당)",
      "前 서울지방국세청 납세자보호위원회 위원",
      "서울지방변호사회 중소기업 고문변호사단"
    ]
  },
  {
    name: "정주현", role: "변호사",
    field: "부동산 소송 · 민사 · 형사",
    image: "assets/lawyer-03.webp",
    career: [
      "1998년 사법시험 합격 · 사법연수원 30기",
      "고려대학교 법학과",
      "건국대학교 부동산대학원 석사",
      "강남대학교 부동산대학원 박사과정 수료",
      "前 행정안전부 순직보상심사위원회 위원",
      "前 서울중앙지방법원 조정위원",
      "저서 『헌법 완결』 『행정법 완결』"
    ]
  },
  {
    name: "김제도", role: "변호사",
    field: "의료사고 · 형사 · 민사",
    image: "assets/lawyer-04.webp",
    /*
      수행 사건은 '결과' 가 아니라 '어떤 사건을 다뤘는가' 로 적는다.
      무죄·승소 같은 결과 표현은 광고규정 검토가 필요해 넣지 않는다.
    */
    career: [
      "사법연수원 47기",
      "국민대학교 법학과",
      "前 서울서부지방검찰청 검사 직무대리",
      "前 의정부지방법원 고양지원 조정위원",
      "수행 — 의료법위반 · 업무상과실치사상 · 사문서위조 · 특경법위반(사기)",
      "수행 — 특가법위반(도주치상) · 도교법위반(사고후미조치) · 교특법위반(치사)",
      "수행 — 폭처법위반(공동주거침입 · 공동강요) · 업무방해 · 상해 · 폭행",
      "수행 — 마약류관리법위반(향정) · 사기 · 업무상횡령 · " +
      "특경법위반(알선수재) · 변호사법위반",
      "자문 — 국토교통부 · LH공사 · GH공사 · 주택도시보증공사 · 농협정보시스템",
      "자문 — 충청북도 · 수원시 · 과천시 · 동대문구청",
      "자문 — 집합건물 관리단(인천 · 부산 · 광주), " +
      "영종도 분양형호텔, 부산 엘시티 호텔"
    ]
  },
  {
    name: "이경숙", role: "변호사",
    field: "이혼 · 상속 · 가사 · 형사",
    image: "assets/lawyer-05.webp",
    career: [
      "제50회 사법시험 합격 · 사법연수원 40기",
      "숙명여자대학교 영문과 및 동대학원",
      "대한변협 가사법 전문분야 등록",
      "現 서울중앙지방법원 조정위원",
      "대한변협 교육이사 · 대의원",
      "서울 성동구청 · 광진구 · 중랑구 치과의사회 고문변호사",
      "방위사업청 · 한국콘텐츠진흥원 · 성동경찰서 법률자문"
    ]
  }
];


/* ------------------------------------------------------------------ */

const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const reduceMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ---------- 의뢰인의 질문 ---------- */

const qList = $("#qList");

if (qList) {
  const items = questions.map((item, i) => {
    const li = el("li", "q-item");
    const open = i === 0;

    const head = el("button", "q-head", `
      <span class="q-no">${String(i + 1).padStart(2, "0")}</span>
      <span class="q-tag">${item.tag}</span>
      <span class="q-q">${item.q}</span>
      <span class="q-mark" aria-hidden="true"></span>
    `);
    head.type = "button";
    head.setAttribute("aria-expanded", String(open));

    const panel = el("div", "q-panel",
      `<div class="q-inner">${item.a.map((p) => `<p>${p}</p>`).join("")}</div>`);

    li.classList.toggle("is-open", open);
    li.append(head, panel);

    head.addEventListener("click", () => {
      const nowOpen = head.getAttribute("aria-expanded") !== "true";

      /* 한 번에 하나만 열어 둔다. 여백이 유지되어야 읽힌다. */
      items.forEach(({ li: other, head: otherHead }) => {
        other.classList.remove("is-open");
        otherHead.setAttribute("aria-expanded", "false");
      });

      if (nowOpen) {
        li.classList.add("is-open");
        head.setAttribute("aria-expanded", "true");
      }
    });

    return { li, head };
  });

  qList.replaceChildren(...items.map((i) => i.li));
}


/* ---------- 업무분야 ---------- */

const panels = $("#panels");

if (panels) {
  panels.replaceChildren(...practices.map((p, i) => {
    /*
      칸 전체는 <div> 이고, 그 위를 덮는 <button> 을 따로 둔다.

      전에는 칸 자체가 <button> 이었고 세부 분야 링크가 그 안에 들어 있었다.
      버튼 안에 링크를 넣는 것은 규칙에 어긋나는 구조라,
      휴대폰에서 칸을 누르려다 링크에 닿아 그대로 다른 페이지로
      넘어가는 일이 있었다. 형사 칸은 아래쪽 38% 가 링크였다.

      이제는 이렇게 나뉜다.
        · 링크 알약을 누르면  → 그 페이지로 간다
        · 그 밖의 아무 데나 누르면 → 칸이 펼쳐진다
    */
    const box = el("div", "panel" + (i === 0 ? " is-open" : ""));

    const btn = el("button", "panel-hit");
    btn.type = "button";
    btn.setAttribute("aria-expanded", i === 0 ? "true" : "false");
    btn.append(el("span", "sr-only", `${p.name} 분야 자세히 보기`));

    const img = el("img", "panel-img");
    img.src = p.image;
    img.alt = "";
    img.width = 1200;
    img.height = 800;
    img.loading = i === 0 ? "eager" : "lazy";

    box.append(
      img,
      el("span", "panel-veil"),
      btn,
      el("span", "panel-body", `
        <span class="panel-en">${p.en}</span>
        <span class="panel-name">${p.name}</span>
        <span class="panel-detail"><span class="panel-detail-in">
          ${p.credit ? `<span class="panel-credit">${p.credit}</span>` : ""}
          <span class="panel-desc">${p.desc}</span>
          <span class="panel-tags">${
            p.tags.map((t) => {
              if (typeof t === "string") return `<span>${t}</span>`;
              if (!t.href) return `<span>${t.name}</span>`;

              /*
                바깥 사이트로 나가는 링크는 새 탭에서 연다.
                보고 있던 페이지를 잃지 않게 하기 위함이다.

                화살표는 안쪽 링크와 똑같이 둔다. 배너가 나란히 놓이는
                자리라 표시가 다르면 그것만 눈에 걸린다.
                새 창으로 열린다는 것은 화면 낭독기에만 따로 알린다.
              */
              const out = /^https?:/i.test(t.href);
              return `<a href="${t.href}"${
                out ? ` target="_blank" rel="noopener noreferrer"` : ""
              }>${t.name}${
                out ? `<span class="sr-only">(새 창)</span>` : ""
              }<i aria-hidden="true"></i></a>`;
            }).join("")
          }</span>
        </span></span>
      `)
    );

    btn.addEventListener("click", () => open(i));
    return box;
  }));

  const all = [...panels.children];

  function open(index) {
    all.forEach((node, i) => {
      const on = i === index;
      node.classList.toggle("is-open", on);
      node.querySelector(".panel-hit").setAttribute("aria-expanded", String(on));
    });
  }

  /*
    넓은 화면에서는 마우스를 올리기만 해도 펼쳐진다.
    터치 기기에는 hover 가 없으므로 클릭만 동작한다.
  */
  if (window.matchMedia("(hover: hover) and (min-width: 900px)").matches) {
    all.forEach((node, i) => node.addEventListener("mouseenter", () => open(i)));
  }
}


/* ---------- 변호인단 ---------- */

const roster = $("#roster");

if (roster) {
  /* 세부 분야 페이지에서는 그 분야를 맡는 변호사만 세운다 */
  const people = PAGE.attorneyNames
    ? attorneys.filter((a) => PAGE.attorneyNames.includes(a.name))
    : attorneys;

  roster.replaceChildren(...people.map((person) => {
    const li = el("li", "member");

    const img = el("img", "member-photo");
    img.src = person.image;
    img.alt = `${person.name} ${person.role}`;
    /* 카드 비율(3 : 3.7)과 같은 값. 로딩 중 자리를 미리 잡아준다. */
    img.width = 300;
    img.height = 370;
    img.loading = "lazy";

    /*
      확장자를 바꿔가며 찾는다. .webp 로 적어두어도
      .jpg 나 .png 로 올리시면 그대로 뜬다.
      모두 없으면 깨진 이미지 대신 자리표시자를 보여준다.
    */
    const base = person.image.replace(/\.[a-z]+$/i, "");
    const now = (person.image.match(/\.([a-z]+)$/i) || ["", ""])[1].toLowerCase();
    const rest = ["webp", "jpg", "jpeg", "png"].filter((e) => e !== now);
    let at = 0;

    img.addEventListener("error", () => {
      img.src = at < rest.length
        ? `${base}.${rest[at++]}`
        : "assets/lawyer-placeholder.svg";
    });

    const figure = el("figure", "member-figure");
    figure.append(img);

    /*
      경력이 길면 카드 높이가 제각각이 되어 여섯 분을 견주기 어렵다.
      앞의 세 줄만 항상 보여주고 나머지는 접어 둔다.
    */
    const OPEN_COUNT = 3;
    const shown = person.career.slice(0, OPEN_COUNT);
    const hidden = person.career.slice(OPEN_COUNT);

    /*
      이름·분야를 member-head 로 묶어둔다.
      좁은 화면에서 사진 옆에는 이 묶음만 두고,
      경력은 아래 칸으로 내려 가로 폭을 다 쓰게 하기 위해서다.
    */
    const body = el("div", "member-body", `
      <div class="member-head">
        <p class="member-name">${person.name}<em>${person.role}</em></p>
        <p class="member-field">${person.field}</p>
      </div>
      <ul class="member-career">${
        shown.map((c) => `<li>${c}</li>`).join("")
      }</ul>
    `);

    if (hidden.length) {
      const id = `more-${person.name}`;

      const wrap = el("div", "member-more",
        `<div class="member-more-in"><ul class="member-career member-career-more">${
          hidden.map((c) => `<li>${c}</li>`).join("")
        }</ul></div>`);
      wrap.id = id;

      const btn = el("button", "member-toggle",
        `<span>경력 더 보기</span><i aria-hidden="true"></i>`);
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", id);

      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        li.classList.toggle("is-more", open);
        btn.querySelector("span").textContent = open ? "접기" : "경력 더 보기";
      });

      body.append(wrap, btn);
    }

    li.append(figure, body);
    return li;
  }));
}


/* ---------- 히어로 배경 갈아끼우기 ---------- */

/*
  assets/hero.webp · hero.jpg · hero.png 가 있으면 그것을 쓰고,
  없으면 지금 걸린 법조타워 사진을 그대로 둔다.
  파일만 올리면 코드를 고치지 않아도 첫 화면이 바뀐다.
*/
const heroBg = $(".hero-bg");

if (heroBg) {
  const candidates = ["assets/hero.webp", "assets/hero.jpg", "assets/hero.png"];

  (function tryNext(i) {
    if (i >= candidates.length) return;
    const probe = new Image();
    probe.onload = () => { heroBg.src = candidates[i]; };
    probe.onerror = () => tryNext(i + 1);
    probe.src = candidates[i];
  })(0);
}



/* ---------- 세부 분야 머리말 배경 ---------- */

/*
  세부 분야 페이지(마약 · 도박 · 성범죄 …)는 지금 모두 같은 사진을 쓴다.
  assets/topic-<이름>.webp · jpg · png 를 올리면 그 페이지만 바뀐다.

  이름은 각 페이지 <img class="topic-hero-bg" data-topic="drug"> 의
  data-topic 값이다. 파일이 없으면 지금 사진이 그대로 남는다.
*/
const topicBg = $(".topic-hero-bg[data-topic]");

if (topicBg) {
  const base = "assets/topic-" + topicBg.dataset.topic;
  const exts = ["webp", "jpg", "png"];

  (function tryNext(i) {
    if (i >= exts.length) return;
    const probe = new Image();
    probe.onload = () => { topicBg.src = probe.src; };
    probe.onerror = () => tryNext(i + 1);
    probe.src = `${base}.${exts[i]}`;
  })(0);
}

/* ---------- 히어로 동영상 ---------- */

/*
  assets/hero.mp4 (또는 hero.webm) 를 올리면 첫 화면이 동영상으로 바뀝니다.
  파일이 없으면 위의 사진이 그대로 남습니다. 코드는 건드리지 않습니다.

  동영상은 "재생이 실제로 시작된 뒤에" 서서히 덮습니다.
  파일이 없거나, 브라우저가 자동재생을 막거나, 통신이 느려 첫 프레임이
  안 나오면 — 사진이 그대로 보입니다. 검은 네모가 뜨는 일은 없습니다.
*/
const heroSlot = $(".hero");

/*
  ┌─ 손봐도 되는 값 ────────────────────────────────────────────┐
  │ 화면 너비가 이 값보다 좁으면 동영상 대신 사진을 보여준다.   │
  │                                                             │
  │   0    → 휴대폰에서도 동영상 (지금 설정)                    │
  │   820  → 휴대폰은 사진, 태블릿·PC 는 동영상                 │
  │                                                             │
  │ 지금 영상은 가로로 매우 긴 비율(1920 × 800)이라             │
  │ 세로로 긴 휴대폰 화면에서는 가운데 부분만 크게 잘려 보인다. │
  │ 휴대폰에서 보시고 어색하면 이 값을 820 으로 바꾸십시오.     │
  └─────────────────────────────────────────────────────────────┘
*/
const HERO_VIDEO_MIN_WIDTH = 0;

const motionOff =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 데이터 절약 모드를 켜 둔 분에게 몇 MB 를 내려받게 하지 않는다 */
const saveData = !!(navigator.connection && navigator.connection.saveData);

const wideEnough = window.innerWidth >= HERO_VIDEO_MIN_WIDTH;

if (heroSlot && heroBg && wideEnough && !motionOff && !saveData) {
  const clips = ["assets/hero.mp4", "assets/hero.webm"];

  (function tryNext(i) {
    if (i >= clips.length) return;

    const v = document.createElement("video");
    v.className = "hero-video";

    /*
      iOS 는 muted / playsinline 이 "속성"으로도 붙어 있어야
      전체화면으로 튀지 않고 조용히 자동재생합니다.
      property 만 넣으면 기기에 따라 막힙니다.
    */
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.autoplay = true;
    v.loop = true;
    v.preload = "auto";
    v.setAttribute("aria-hidden", "true");
    v.src = clips[i];

    let settled = false;

    v.addEventListener("error", () => {
      if (settled) return;
      settled = true;
      v.remove();
      tryNext(i + 1);          /* mp4 가 없으면 webm 을 찾아본다 */
    });

    v.addEventListener("playing", () => {
      settled = true;
      v.classList.add("is-on");
    }, { once: true });

    heroBg.after(v);           /* 사진 바로 위, 그늘막 아래 */

    const started = v.play();
    if (started && started.catch) {
      started.catch(() => {
        if (settled) return;
        settled = true;
        v.remove();            /* 자동재생이 막히면 조용히 사진으로 돌아간다 */
      });
    }
  })(0);
}


/* ---------- 헤더 · 모바일 메뉴 ---------- */

const head = $("#head");

if (head) {
  const hero = $(".hero");

  /*
    히어로 위에서는 헤더가 투명하게 떠 있고, 히어로를 지나면
    밝은 막대로 바뀐다. 12px 만에 바꾸면 사진 위에 크림색 막대가
    걸쳐 어색하다.

    세부 분야 페이지에는 .hero 가 없다. 그런 페이지에서는
    처음부터 밝은 막대로 두고 스크롤을 보지 않는다.
  */
  if (!hero) {
    head.classList.add("is-stuck");
  } else {
    const onScroll = () => {
      head.classList.toggle("is-stuck", window.scrollY > hero.offsetHeight - 120);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }
}

const burger = $("#burger");
const drawer = $("#drawer");

if (burger && drawer) {
  const setOpen = (on) => {
    document.body.classList.toggle("no-scroll", on);
    drawer.classList.toggle("is-open", on);
    burger.classList.toggle("is-on", on);
    burger.setAttribute("aria-expanded", String(on));
    burger.setAttribute("aria-label", on ? "메뉴 닫기" : "메뉴 열기");

    /*
      닫힌 메뉴는 inert 로 완전히 빼둔다.
      aria-hidden 만 쓰면 링크가 탭 순서에 남아 키보드가 갇힌다.
    */
    if (on) {
      drawer.removeAttribute("inert");
      requestAnimationFrame(() => drawer.querySelector("a")?.focus());
    } else {
      drawer.setAttribute("inert", "");
    }
  };

  burger.addEventListener("click", () =>
    setOpen(burger.getAttribute("aria-expanded") !== "true"));

  drawer.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      setOpen(false);
      burger.focus();
    }
  });
}


/* ---------- 상담 폼 ---------- */

const form = $("#form");
const formStatus = $("#formStatus");

if (form && formStatus) {
  const say = (msg, ok) => {
    formStatus.textContent = msg;
    formStatus.classList.toggle("is-ok", !!ok);
    formStatus.classList.toggle("is-bad", !ok);
  };

  /*
    검증만 여기서 하고, 통과하면 브라우저가 그대로 제출한다.
    제출은 Netlify Forms 가 받아 /thanks.html 로 보낸다.
  */
  form.addEventListener("submit", (event) => {
    const name = $("#fName").value.trim();
    const tel = $("#fTel").value.replace(/\D/g, "");
    const agreed = $("#fAgree").checked;

    const stop = (msg, field) => {
      event.preventDefault();
      say(msg);
      field.focus();
    };

    if (name.length < 2) return stop("성함을 입력해 주세요.", $("#fName"));
    if (tel.length < 9 || tel.length > 11)
      return stop("연락처를 숫자 9~11자리로 입력해 주세요.", $("#fTel"));
    if (!agreed) return stop("개인정보 수집·이용에 동의해 주세요.", $("#fAgree"));

    say("보내는 중입니다…", true);
  });
}


/* ---------- 등장 ---------- */

if (!reduceMotion && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  document.querySelectorAll(".sec-head, .q-item, .member, .principle-list li")
    .forEach((node) => { node.classList.add("rise"); io.observe(node); });
}


/* =====================================================================
   카카오톡 상담 버튼

   맨 위의 KAKAO_URL 이 채워져 있을 때만 만들어진다.
   비어 있으면 아무것도 하지 않는다 — 눌리지 않는 버튼은 없느니만 못하다.

   버튼이 들어가는 자리는 셋이다.
     · 아래 고정 막대 (휴대폰에서만 보인다)
     · 페이지 머리말의 큰 버튼 줄
     · 맨 아래 상담 안내의 버튼 줄
   HTML 을 고치지 않고 여기서 한 번에 넣는 이유는,
   주소가 바뀌었을 때 고칠 곳을 한 군데로 두기 위해서다.
===================================================================== */

if (KAKAO_URL) {
  const kakaoLink = (cls, label, arrow) => {
    const a = document.createElement("a");
    a.className = cls;
    a.href = KAKAO_URL;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = label;

    /* 새 창으로 열린다는 것은 화면 낭독기에만 따로 알린다 */
    const note = document.createElement("span");
    note.className = "sr-only";
    note.textContent = "(새 창)";
    a.append(note);

    if (arrow) {
      const i = document.createElement("i");
      i.setAttribute("aria-hidden", "true");
      a.append(i);
    }
    return a;
  };

  /* ----- 큰 버튼 줄 -----
     맨 뒤가 아니라 첫 버튼 바로 뒤에 넣는다.
     줄 끝에는 "업무분야 보기" 같은 둘러보기 버튼이 오는데,
     그 뒤에 노란 버튼을 두면 순서가 어색해진다. */
  document.querySelectorAll(".topic-acts, .topic-cta-act, .hero-acts, .done-back")
    .forEach((row) => {
      const kakao = kakaoLink("btn btn-kakao", "카톡 상담", true);
      const first = row.firstElementChild;
      if (first) first.after(kakao);
      else row.append(kakao);
    });
}


/* =====================================================================
   사진 띠

   data-photo="이름" 이 붙은 자리에 assets/이름.jpg 를 찾아 넣는다.
   webp · jpg · jpeg · png 를 차례로 시도하고, 없으면 글자만 남는다.
   그래서 사진을 나중에 올리셔도 되고, 코드는 고치지 않는다.

   전에는 페이지마다 이 코드가 하나씩 들어 있었다(아홉 벌).
   같은 내용이라 이리로 모았다. 고칠 일이 생기면 여기 한 곳만 고친다.
===================================================================== */

document.querySelectorAll("[data-photo]").forEach((band) => {
  const base = "assets/" + band.dataset.photo;
  const exts = ["webp", "jpg", "jpeg", "png"];

  (function tryNext(i) {
    if (i >= exts.length) return;
    const probe = new Image();
    probe.onload = () => {
      const img = document.createElement("img");
      img.className = "band-photo";
      img.src = probe.src;
      img.alt = "";
      img.loading = "lazy";
      band.prepend(img);
      band.classList.add("has-photo");
    };
    probe.onerror = () => tryNext(i + 1);
    probe.src = `${base}.${exts[i]}`;
  })(0);
});


/* =====================================================================
   넓은 화면의 빠른 상담 (오른쪽 아래)

   전화 · 카톡 · 상담신청 세 개와 맨 위로 버튼을 세워 둔다.

   번호와 주소는 새로 적지 않고 그 페이지의 아래 막대(.bar)에서
   그대로 가져온다. 페이지마다 상담 번호가 다르고(첫 화면은 상담,
   공증 페이지는 공증 상담), 나중에 번호를 고칠 때 두 군데를
   고쳐야 하는 일을 만들지 않기 위해서다.

   첫 화면을 보고 계실 때는 나오지 않는다.
   머리말을 지나 내려가면 그때 올라온다.
===================================================================== */

(function buildRail() {
  const bar = $(".bar");
  if (!bar) return;

  const src = {
    tel: $(".bar-call", bar),
    form: $(".bar-form", bar)
  };
  if (!src.tel || !src.form) return;

  const rail = el("aside", "rail");
  rail.setAttribute("aria-label", "빠른 상담");

  const tile = (cls, href, label, out) => {
    const a = el("a", "rail-btn " + cls);
    a.href = href;
    /*
      이름을 aria-label 로도 박아 둔다.
      안쪽 이름표는 손가락으로 쓰는 기기에서 숨는데(hover 가 없다),
      숨은 글자는 화면 낭독기도 읽지 않아 이름 없는 단추가 되어 버린다.
    */
    a.setAttribute("aria-label", label + (out ? " (새 창)" : ""));
    if (out) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.append(el("span", "", label));
    return a;
  };

  /*
    전화 — 번호는 그 페이지의 것을 그대로 쓰되 이름은 "전화상담" 으로 고정한다.
    아래 막대의 이름("상담")을 그대로 가져오면
    바로 밑의 "상담신청" 과 헷갈린다.
  */
  rail.append(tile("rail-tel", src.tel.getAttribute("href"), "전화상담"));

  /* 카톡 — 주소가 채워져 있을 때만 */
  if (KAKAO_URL) {
    rail.append(tile("rail-kakao", KAKAO_URL, "카톡상담", true));
  }

  rail.append(tile("rail-form", src.form.getAttribute("href"), "상담신청"));

  /* 맨 위로 */
  const top = el("button", "rail-top");
  top.type = "button";
  top.setAttribute("aria-label", "맨 위로");
  top.append(el("i", ""));
  top.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
  rail.append(top);

  document.body.append(rail);

  /*
    머리말이 화면에서 사라지면 나타난다.
    머리말이 없는 페이지(개인정보처리방침 등)에서는 바로 보인다.
  */
  const hero = $(".hero") || $(".topic-hero") || $(".doc-head");
  if (!hero || !("IntersectionObserver" in window)) {
    rail.classList.add("is-on");
    return;
  }

  new IntersectionObserver((entries) => {
    entries.forEach((e) => rail.classList.toggle("is-on", !e.isIntersecting));
  }, { threshold: 0 }).observe(hero);
})();
