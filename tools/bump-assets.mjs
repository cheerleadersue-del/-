/* =====================================================================
   style.css 와 main.js 뒤에 날짜표를 붙이는 프로그램

   2026-10-29 에 만들었습니다.

   왜 필요한가
     브라우저는 style.css 를 한 번 받아 두고 한동안 다시 받지 않습니다.
     그래서 글(html)은 새것인데 꾸밈(css)은 옛것인 상태가 생깁니다.
     2026-10-29 에 변호사 쪽에서 실제로 그랬습니다. 사진이 화면
     절반이 아니라 화면 전체를 덮는 거대한 얼굴로 나왔습니다.

     주소 뒤에 ?v=20261029 를 붙이면 브라우저가 다른 파일로 보고
     새로 받아 갑니다. 날짜를 바꿀 때마다 모두가 새것을 받습니다.

   언제 돌리나
     style.css 나 main.js 를 고쳐 올릴 때마다 돌리십시오.
     글만 고쳤을 때는 돌릴 필요가 없습니다.

   어떻게 돌리나
     node tools/bump-assets.mjs            오늘 날짜로 붙입니다
     node tools/bump-assets.mjs 20261101   날짜를 직접 정합니다

   ⚠️ 변호사 쪽(lawyer-*.html)은 이 프로그램으로 고치지 마십시오.
      make-lawyer-pages.mjs 가 다시 찍을 때 지워집니다.
      그 쪽은 make-lawyer-pages.mjs 안의 판에 날짜가 박혀 있습니다.
      둘 다 돌리시면 됩니다. 이 프로그램이 판도 함께 고칩니다.
===================================================================== */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const arg = process.argv[2];
const today = new Date();
const stamp = arg && /^\d{8}$/.test(arg)
  ? arg
  : [today.getFullYear(),
     String(today.getMonth() + 1).padStart(2, "0"),
     String(today.getDate()).padStart(2, "0")].join("");

/*
  이미 ?v=... 가 붙어 있으면 숫자만 갈아 끼웁니다. 없으면 새로 붙입니다.

  ⚠️ href= 와 src= 뒤에 있는 것만 고칩니다.
     그냥 따옴표 안의 "main.js" 까지 고치면, 파일을 읽는 줄까지
     "main.js?v=…" 로 바뀌어 프로그램이 멈춥니다. 실제로 그랬습니다.
  ⚠️ 같은 폴더의 파일만 고칩니다. 바깥 주소(구글 폰트 등)는 건드리지
     않습니다. 슬래시가 들어 있으면 건너뜁니다.
*/
const RE = /\b(href|src)=(["'])([A-Za-z0-9_.\-]+\.(?:css|js))(\?v=\d+)?\2/g;

function stampText(text) {
  let n = 0;
  const out = text.replace(RE, (m, attr, q, file) => {
    n++;
    return `${attr}=${q}${file}?v=${stamp}${q}`;
  });
  return [out, n];
}

let files = 0, hits = 0;

for (const name of fs.readdirSync(ROOT)) {
  if (!name.endsWith(".html")) continue;
  const p = path.join(ROOT, name);
  const [out, n] = stampText(fs.readFileSync(p, "utf8"));
  if (n) {
    fs.writeFileSync(p, out, "utf8");
    files++; hits += n;
  }
}

/* 변호사 쪽을 찍어 내는 판도 함께 고친다 */
const gen = path.join(ROOT, "tools", "make-lawyer-pages.mjs");
if (fs.existsSync(gen)) {
  const [out, n] = stampText(fs.readFileSync(gen, "utf8"));
  if (n) {
    fs.writeFileSync(gen, out, "utf8");
    console.log(`tools/make-lawyer-pages.mjs  ${n}곳`);
  }
}

console.log(`\n날짜표 v=${stamp} · 쪽 ${files}장 · ${hits}곳을 고쳤습니다.`);
console.log("변호사 쪽은 node tools/make-lawyer-pages.mjs 도 함께 돌리십시오.");
