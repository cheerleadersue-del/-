/* =====================================================================
   변호사 한 분 쪽(lawyer-*.html)을 만드는 프로그램

   2026-10-29 에 만들었습니다.

   왜 이렇게 하나
     쪽 네 장에 같은 모양이 반복됩니다. 손으로 네 번 적으면
     한 분만 고치고 세 분을 빠뜨리게 됩니다. 그래서 자료 한 벌에서
     네 장을 한 번에 찍어 냅니다.

   자료는 어디에 있나
     main.js 의 attorneys 배열 하나뿐입니다.
     이름 · 학력 · 경력 · 자문 · 수행 사건 · 승소사례 모두 거기입니다.
     이 프로그램은 그 배열을 읽기만 합니다.

   어떻게 돌리나
     node tools/make-lawyer-pages.mjs
     홈페이지 폴더(main.js 가 있는 곳)에서 치시면 됩니다.

   ⚠️ 쪽을 손으로 고치지 마십시오. 다음에 이 프로그램을 돌리면
      고치신 것이 지워집니다. main.js 를 고치고 다시 돌리십시오.
   ⚠️ 주요 승소사례(wins)는 비어 있으면 그 묶음이 아예 나오지 않습니다.
      적으실 때 지켜야 할 선은 docs/승소사례-적는-법.md 에 있습니다.
===================================================================== */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

/* ---------- main.js 에서 attorneys 배열만 꺼내 온다 ---------- */
const mainJs = read("main.js");
const m = mainJs.match(/const attorneys = (\[[\s\S]*?\n\]);/);
if (!m) throw new Error("main.js 에서 attorneys 배열을 찾지 못했습니다.");
const attorneys = eval(m[1]);

/* ---------- 쪽마다 다른 글 ----------
   검색결과에 뜨는 제목 · 설명 · 검색어입니다.
   자료가 아니라 '문구' 라서 여기에 둡니다.
   ⚠️ 제목 60칸 · 설명 155칸을 넘기지 마십시오. 아래에서 재 줍니다.
   ⚠️ 검색어는 스무 개로 맞춥니다.                                  */
const META = {
  jeonghogil: {
    title: "정호길 변호사 — 형사법 전문변호사 | 법무법인 유일",
    desc: "법조경력 25년. 대한변협 등록 형사법 전문변호사. 제40회 사법시험 · 사법연수원 30기. 강력범죄 · 형사 · 민사. 서초동 법무법인 유일 대표변호사.",
    keywords: "정호길, 정호길 변호사, 정호길변호사, 변호사 정호길, 법무법인 유일, 서초동 변호사, 형사법전문변호사, 형사전문변호사, 형사변호사, 대표변호사, 강력범죄, 마약, 성범죄, 민사, 손해배상, 사법연수원 30기, 사법시험, 법률자문, 고문변호사, 서초동",
    tags: [
      ["형사 전문 센터", "criminal.html"],
      ["민사 전문 센터", "civil.html"]
    ]
  },
  yangjinhee: {
    title: "양진희 변호사 — 건설 · 부동산 | 법무법인 유일",
    desc: "건설 · 부동산을 중심으로 민사와 형사를 맡습니다. 고려대 법학과 · 제주대 법학전문대학원. 방송통신위원회 · 서울시의회 법률자문. 서초동 법무법인 유일.",
    keywords: "양진희, 양진희 변호사, 양진희변호사, 변호사 양진희, 법무법인 유일, 서초동 변호사, 건설변호사, 부동산변호사, 건설, 부동산, 민사, 형사, 가처분, 행정소송, 신탁, 법학전문대학원, 고려대학교, 법률자문, 조례, 서초동",
    tags: [
      ["건설", "civil-construction.html"],
      ["부동산", "civil-realestate.html"],
      ["민사 전문 센터", "civil.html"],
      ["형사 전문 센터", "criminal.html"]
    ]
  },
  jeongjuhyeon: {
    title: "정주현 변호사 — 부동산 · 민사 | 법무법인 유일",
    desc: "부동산을 중심으로 민사와 형사를 맡습니다. 1998년 사법시험 · 사법연수원 30기. 건국대 부동산대학원 석사. 저서 『헌법 완결』 『행정법 완결』.",
    keywords: "정주현, 정주현 변호사, 정주현변호사, 변호사 정주현, 법무법인 유일, 서초동 변호사, 부동산변호사, 부동산, 민사, 형사, 부동산대학원, 사법연수원 30기, 사법시험, 조정위원, 순직보상, 헌법, 행정법, 고려대학교, 저서, 서초동",
    tags: [
      ["부동산", "civil-realestate.html"],
      ["민사 전문 센터", "civil.html"],
      ["형사 전문 센터", "criminal.html"]
    ]
  },
  kimjedo: {
    title: "김제도 변호사 — 의료사고 · 형사 | 법무법인 유일",
    desc: "의료사고를 중심으로 형사와 민사를 맡습니다. 사법연수원 47기. 前 서울서부지검 검사 직무대리 · 의정부지법 고양지원 조정위원. 서초동 법무법인 유일.",
    keywords: "김제도, 김제도 변호사, 김제도변호사, 변호사 김제도, 법무법인 유일, 서초동 변호사, 의료사고, 의료소송, 의료법위반, 업무상과실치사상, 형사변호사, 검사 직무대리, 사법연수원 47기, 조정위원, 마약, 사기, 횡령, 교통사고, 자문, 서초동",
    tags: [
      ["의료사고", "civil-medical.html"],
      ["형사 전문 센터", "criminal.html"],
      ["민사 전문 센터", "civil.html"]
    ]
  }
};

/* 한글은 두 칸으로 센다. 검색결과에서 잘리는 길이를 재는 방법이다. */
const width = (s) => [...s].reduce((n, c) => n + (c.codePointAt(0) > 0x1100 ? 2 : 1), 0);

/* ---------- 머리 · 꼬리는 형사 센터 쪽에서 그대로 가져온다 ----------
   한 곳만 고치면 쉰다섯 장이 같이 바뀌는 구조를 깨지 않기 위해서다. */
const src = read("criminal.html");
const grab = (re, what) => {
  const r = src.match(re);
  if (!r) throw new Error(`criminal.html 에서 ${what} 을(를) 찾지 못했습니다.`);
  return r[0];
};
const HEADER = grab(/<header class="head[\s\S]*?<\/header>/, "머리말")
  .replace(/<span class="head-call-label">[^<]*<\/span>/, '<span class="head-call-label">무료상담</span>');
const DRAWER = grab(/<div class="drawer"[\s\S]*?\n<\/div>\n/, "모바일 메뉴");
const BAR    = grab(/<div class="bar">[\s\S]*?\n<\/div>\n/, "하단 바");
const FOOTER = grab(/<footer class="foot">[\s\S]*?<\/footer>/, "바닥글");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const li = (arr) => arr.map((x) => `        <li>${x}</li>`).join("\n");

/* ---------- 묶음 하나 ---------- */
function section(n, head, inner) {
  const alt = n % 2 === 1 ? " lw-sec-alt" : "";
  return `
  <section class="lw-sec${alt}" aria-labelledby="${head.id}">
    <div class="shell lw-sec-in">
      <h2 id="${head.id}"><small>${head.en}</small>${head.ko}</h2>
      <div>
${inner}
      </div>
    </div>
  </section>
`;
}

function build(p) {
  const meta = META[p.slug];
  if (!meta) throw new Error(`${p.name} 의 문구가 META 에 없습니다.`);
  const url = `https://yuillawfirm.com/${p.page}`;

  /* 묶음을 차례로 쌓는다. 바탕색은 흰색과 회색이 번갈아야 한다. */
  const parts = [];
  let n = 0;

  parts.push(section(n++, { id: "workTitle", en: "PRACTICE", ko: "맡는 일" },
    `        <div class="lw-tags">
${meta.tags.map(([ko, href]) =>
  `          <a href="${href}">${ko}<i aria-hidden="true"></i></a>`).join("\n")}
        </div>`));

  if (p.edu?.length) {
    parts.push(section(n++, { id: "eduTitle", en: "EDUCATION", ko: "학력" },
      `        <ul class="lw-list">\n${li(p.edu)}\n        </ul>`));
  }

  if (p.work?.length || p.books?.length) {
    parts.push(section(n++, { id: "careerTitle", en: "CAREER", ko: "경력" },
      `        <ul class="lw-list">\n${li([...(p.work || []), ...(p.books || [])])}\n        </ul>`));
  }

  /* 주요 승소사례 — 자료가 없으면 묶음을 아예 만들지 않는다 */
  if (p.wins?.length) {
    parts.push(section(n++, { id: "winTitle", en: "RESULTS", ko: "주요 승소사례" },
      p.wins.map((w) => `        <div class="lw-win">
          <h3>${esc(w.title)}</h3>
          <p>${esc(w.body)}</p>${w.meta ? `
          <p class="lw-win-meta">${w.meta.map(esc).join(" · ")}</p>` : ""}
        </div>`).join("\n") +
      `\n        <p class="lw-note">사건의 결과는 사실관계와 증거에 따라 달라집니다.
        위 사례가 같은 결과를 보장하지 않습니다.</p>`));
  }

  if (p.cases?.length) {
    parts.push(section(n++, { id: "caseTitle", en: "CASES", ko: "다룬 사건" },
      `        <ul class="lw-list">\n${li(p.cases)}\n        </ul>
        <p class="lw-note">결과가 아니라 어떤 사건을 다루었는지를 적었습니다.
        의뢰인의 이름은 적지 않습니다.</p>`));
  }

  if (p.advisory?.length) {
    parts.push(section(n++, { id: "advTitle", en: "ADVISORY", ko: "자문" },
      `        <ul class="lw-list">\n${li(p.advisory)}\n        </ul>`));
  }

  const badge = p.badge ? `\n        <p class="member-badge">${p.badge}</p>` : "";

  return `<!DOCTYPE html>
<html lang="ko">
<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!--
  ⚠️ 이 쪽은 손으로 고치지 마십시오.
     tools/make-lawyer-pages.mjs 가 main.js 의 자료로 찍어 냅니다.
     고치실 것은 main.js 의 attorneys 배열입니다.
     고치신 뒤 홈페이지 폴더에서 아래를 치십시오.
         node tools/make-lawyer-pages.mjs
     자세한 것은 docs/변호사-쪽-고치는-법.md 에 있습니다.
-->
<title>${meta.title}</title>
<meta name="description" content="${meta.desc}">
<!--
  검색어입니다. 구글은 이 줄을 보지 않습니다(2009년부터).
  네이버가 아직 참고한다고 알려져 있어 넣어 둡니다.
  ★ 쪽마다 스무 개로 맞췄습니다. 더 늘리지 마십시오.
  ★ 이름을 띄어 쓴 것과 붙여 쓴 것을 모두 넣었습니다.
    실적을 보니 「정호길 변호사」와 「정호길변호사」가 따로 들어옵니다.
-->
<meta name="keywords" content="${meta.keywords}">

<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow">

<meta property="og:type" content="profile">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="법무법인 유일">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.desc}">
<meta property="og:image" content="https://yuillawfirm.com/${p.image}">

<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/favicon-48.png" type="image/png" sizes="48x48">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Noto+Serif+KR:wght@200;300;400;500&family=Noto+Sans+KR:wght@300;400;500;700&display=swap">

<link rel="stylesheet" href="style.css">

</head>

<body>

<a class="skip" href="#main">본문 바로가기</a>


${HEADER}


${DRAWER}

<main id="main">

  <section class="lw-hero">
    <div class="shell lw-hero-in">
      <div>
        <nav class="crumb" aria-label="위치">
          <a href="index.html">홈</a>
          <span aria-hidden="true">/</span>
          <a href="index.html#lawyers">구성원</a>
          <span aria-hidden="true">/</span>
          <b>${p.name}</b>
        </nav>

        <p class="lw-eyebrow">ATTORNEY</p>
        <h1 class="lw-name">${p.name}<em>${p.role}</em></h1>
        <p class="lw-field">${p.field}</p>${badge}
        <p class="lw-intro">${p.intro}</p>

        <div class="lw-acts">
          <a class="btn btn-fill" href="tel:02-6254-8485">무료상담전화<i aria-hidden="true"></i></a>
          <a class="btn btn-line" href="index.html#contact">상담 신청서 쓰기</a>
        </div>
      </div>

      <figure class="lw-photo">
        <img src="${p.image}" alt="${p.name} ${p.role}"
             width="300" height="370" fetchpriority="high">
      </figure>
    </div>
  </section>

${parts.join("")}
  <section class="topic-cta">
    <div class="shell topic-cta-in">
      <p class="eyebrow eyebrow-light">CONTACT</p>
      <h2 class="topic-cta-title">
        먼저 사실관계부터 <br>들려주십시오.
      </h2>
      <p class="topic-cta-lead">
        언제 무슨 일이 있었는지, 지금 어디까지 와 있는지.
        가지고 계신 서류가 있으면 함께 보내 주십시오.
        되지 않을 사건을 붙잡고 의뢰인의 시간을 쓰지 않습니다.
      </p>

      <dl class="done-tel">
        <div>
          <dt>대표전화</dt>
          <dd><a href="tel:02-6254-8485">02-6254-8485</a></dd>
        </div>
      </dl>

      <p class="topic-cta-act">
        <a class="btn btn-cream" href="index.html#contact">상담 신청서 쓰기<i aria-hidden="true"></i></a>
      </p>
    </div>
  </section>

</main>


${FOOTER}


${BAR}

<!-- 구조화 데이터 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://yuillawfirm.com/" },
    { "@type": "ListItem", "position": 2, "name": "구성원", "item": "https://yuillawfirm.com/#lawyers" },
    { "@type": "ListItem", "position": 3, "name": "${p.name}", "item": "${url}" }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "${url}#person",
  "name": "${p.name}",
  "jobTitle": "${p.role}",
  "url": "${url}",
  "image": "https://yuillawfirm.com/${p.image}",
  "telephone": "+82-2-6254-8485",
  "knowsAbout": ${JSON.stringify(p.field.split(" · "))},
  "alumniOf": ${JSON.stringify((p.edu || []).map((e) => ({ "@type": "EducationalOrganization", name: e })))},
  "worksFor": {
    "@type": "LegalService",
    "@id": "https://yuillawfirm.com/#firm",
    "name": "법무법인 유일",
    "url": "https://yuillawfirm.com/",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "서초대로 264, 2층 (서초동, 법조타워)",
      "addressLocality": "서초구",
      "addressRegion": "서울특별시",
      "addressCountry": "KR"
    }
  }
}
</script>

<script src="main.js"></script>

</body>
</html>
`;
}

/* ---------- 찍어 내기 ---------- */
let over = 0;
for (const p of attorneys) {
  if (!p.page) continue;
  const html = build(p);
  fs.writeFileSync(path.join(ROOT, p.page), html, "utf8");
  const meta = META[p.slug];
  const t = width(meta.title), d = width(meta.desc), k = meta.keywords.split(",").length;
  if (t > 60 || d > 155 || k !== 20) over++;
  console.log(
    `${p.page.padEnd(28)} 제목 ${String(t).padStart(3)}칸` +
    `${t > 60 ? " ← 60칸 넘음" : ""}  설명 ${String(d).padStart(3)}칸` +
    `${d > 155 ? " ← 155칸 넘음" : ""}  검색어 ${k}개${k !== 20 ? " ← 스무 개가 아님" : ""}` +
    `  승소사례 ${p.wins?.length || 0}건`
  );
}
console.log(over ? `\n⚠️ 손봐야 할 쪽이 ${over}장 있습니다.` : "\n모두 한도 안에 있습니다.");
