# 법무법인 유일 — LAW FIRM YUIL

정적 웹사이트(HTML · CSS · JavaScript). 빌드 도구 없이 파일 그대로 배포합니다.

```
index.html      마크업
style.css       스타일 (반응형)
main.js         질문 아코디언 · 업무분야 · 변호인단 · 폼
assets/         이미지(WebP) · SVG
netlify.toml    Netlify 캐시 · 보안 헤더
robots.txt
```

## 로컬에서 보기

```bash
npx http-server . -p 8080
# http://localhost:8080
```

## 배포

`claude/law-firm-website-recode-phtrgb` 에 푸시하면 Netlify가 자동 배포합니다.

---

## 디자인

**골드 베이지 · 여백 · 명조.** 색으로 권위를 만들지 않고 활자와 여백으로 만듭니다.

### 색 — 로고에서 가져옴

| 이름 | 값 | 쓰임 |
|---|---|---|
| `--paper` | `#fbf8f3` | 기본 바탕 (순백 아님) |
| `--paper-2` | `#f4ede2` | 섹션 교대용 크림 |
| `--sand` | `#e7dbc5` | 인물 뒤 베이지 면 |
| `--gold` | `#ac8a55` | 강조 (광택 없음) |
| `--ink` | `#1c1a17` | 본문 글자 |
| `--dark` | `#1c1c1c` | 어두운 구간 (로고 바탕) |
| `--cream` | `#e4d5b7` | 로고 글자색 |

**그라데이션은 쓰지 않습니다.** 히어로의 사진 위 scrim만 예외입니다.

### 글꼴 — 모두 Google Fonts

| 용도 | 글꼴 |
|---|---|
| 한글 제목 | Noto Serif KR (명조) |
| 라틴 디스플레이 | Cormorant Garamond |
| 본문 | Noto Sans KR |

이전에 쓰던 Pretendard(jsDelivr)는 일부 망에서 차단되어 Google Fonts로 통일했습니다.

### 섹션

| # | 섹션 | 비고 |
|---|---|---|
| 1 | 히어로 | 배경 사진 + Y 로고가 그려지는 애니메이션 |
| 2 | 대표변호사 인사말 | 밝은 배경 + 컷아웃 인물 |
| 3 | 의뢰인의 질문 | 7문항 아코디언 |
| 4 | 업무분야 | 가로 아코디언 5칸 (모바일은 세로) |
| 5 | 변호인단 | 3열 그리드, 사진 위에 아무것도 안 덮음 |
| 6 | 원칙 | 어두운 구간 |
| 7 | 오시는 길 · 상담 | |

---

## 첫 화면 사진 바꾸기

`index.html` 의 `.hero-bg` 한 줄만 바꾸면 됩니다.

```html
<img class="hero-bg" src="assets/hero-building.webp" alt="" ...>
```

새 사진을 `assets/` 에 넣고 `src` 를 그 파일명으로 바꾸세요.
가로로 넓게 잘리므로 **가로 1600px 이상**을 권합니다.

### 동영상으로 바꾸려면

`.hero-bg` 를 통째로 아래로 교체합니다.

```html
<video class="hero-video" autoplay muted loop playsinline
       poster="assets/hero-building.webp">
  <source src="assets/hero.mp4" type="video/mp4">
</video>
```

`.hero-video` 스타일은 이미 준비돼 있습니다. 다만 세 가지를 유의하세요.

- **용량** — 5MB를 넘기지 마세요. 모바일에서 첫 화면이 늦게 뜹니다.
- **소리** — `muted` 가 없으면 브라우저가 자동재생을 막습니다.
- **모션 민감 사용자** — `prefers-reduced-motion` 설정을 켠 분에게는
  동영상 대신 `poster` 이미지가 보이도록 처리를 추가하셔야 합니다.

### 사진 저작권

`assets/hero-building.webp` 는 **직접 촬영하신 사무실 건물 사진**이라 문제가 없습니다.

인터넷에서 받은 사진을 쓰실 때는 상업적 이용이 허용되는지 반드시 확인하세요.
법인 홈페이지는 상업적 이용에 해당합니다. 무료로 쓸 수 있는 곳은
Unsplash, Pexels 등이 있습니다.

---

## ⚠️ 공개 전 반드시 확인할 것

### 1. 의뢰인 질문 7문항의 법률 내용 — 가장 중요

`main.js` 상단 `questions` 배열에 구속영장실질심사, 불송치 이의신청,
성범죄, 의료사고, 대여금 등 **법률 절차 설명이 들어 있습니다.**

이 문구는 일반적인 절차를 설명한 초안입니다.
**반드시 변호사가 직접 검토하고 수정하신 뒤 공개하세요.**
법 개정이나 실무 변화가 반영되지 않았을 수 있습니다.

특히 다음 항목은 재확인이 필요합니다.

- 불송치 이의신청 — **고발인의 이의신청권이 제외**된다고 썼습니다. 현행 조문 확인 필요
- 영장실질심사가 "청구 다음 날 열리는 것이 보통"이라는 서술
- 의료사고·대여금의 소멸시효 — 기간을 명시하지 않았으나 표현 검토 필요
- "착수 전에 서면으로 확인되지 않은 비용은 청구하지 않습니다" —
  **유일의 실제 수임 방침과 맞는지** 확인 필요

### 2. 사무실 주소 — 앞뒤가 맞지 않습니다

히어로 배경의 법조타워 사진에 **`공증 2F 02-567-4377`** 간판이 보입니다.
`02` 는 서울 지역번호인데, 현재 주소 자리표시자는 **인천**으로 되어 있습니다.

실제 주소가 어디인지 알려주시면 맞추겠습니다.

### 3. 변호사 사진과 성명의 짝

시안만으로는 확정할 수 없어 **임시 배정**했습니다.
`main.js` 의 `attorneys` 배열에서 각 `image` 값을 실제 인물과 대조해 주세요.

| 순서 | 성명 | 현재 배정된 파일 |
|---|---|---|
| 1 | 정호길 대표변호사 | `assets/lawyer-01.webp` |
| 2 | 김제도 변호사 | `assets/lawyer-02.webp` |
| 3 | 심상한 변호사 | `assets/lawyer-03.webp` |
| 4 | 정주현 변호사 | `assets/lawyer-04.webp` |
| 5 | 이경숙 변호사 | `assets/lawyer-05.webp` |

정호길 대표변호사 사진은 인사말 섹션에도 쓰입니다.

### 4. 로고

`assets/logo-y.svg` 와 히어로·헤더·푸터의 Y 심볼은 **목업 사진을 보고 다시 그린 근사치**입니다.
원본 벡터 파일(`.ai` · `.svg`)이 있으시면 교체하는 편이 정확합니다.

### 5. 지도

`assets/map-placeholder.svg` 는 자리표시자입니다.
`index.html` 의 `.map` 안을 실제 지도 임베드로 바꾸세요.

```html
<figure class="map">
  <iframe src="네이버/카카오 지도 임베드 주소"
          title="법무법인 유일 위치" loading="lazy"
          style="width:100%;aspect-ratio:8/5;border:0"></iframe>
</figure>
```

### 6. 상담 폼 전송

**아직 어디로도 전송되지 않습니다.** 값 검증까지만 동작합니다.
Netlify를 쓰시므로 `<form>` 에 아래를 더하면 바로 접수됩니다.

```html
<form class="form" id="form" name="consult"
      method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="consult">
```

그리고 `main.js` 의 `submit` 핸들러에서 `event.preventDefault()` 와
마지막 `say(...)` 줄을 지우면 됩니다.

개인정보를 받는 폼이므로 **개인정보처리방침 페이지**를 먼저 준비하고
`.agree-link` 의 `href="#"` 를 그 주소로 바꾸세요.

### 7. 변호사 광고규정

이번 페이지에는 승소율·사건 처리 건수 같은 수치가 **없습니다.**
나중에 성공사례나 지표, 의뢰인 후기를 추가하실 계획이라면
대한변협 변호사광고규정을 먼저 확인해 주세요.

### 8. 자리표시자

- **전화번호** `010-0000-0000` — `index.html` (헤더·모바일 메뉴·오시는 길·푸터·모바일 바·JSON-LD)
- **주소** `인천광역시 ○○구 ○○로 00, 유일빌딩 0층`
- **개인정보처리방침** 링크 — 현재 `#`
- **상담시간** 평일 09:00–18:00
- 변호사 경력 문구 — 실제 이력과 대조 필요

### 9. 검색엔진 차단 해제

실제 연락처를 넣으신 뒤 두 곳을 바꾸세요.

- `robots.txt` → `Disallow: /` 를 `Allow: /` 로
- `index.html` 의 `<meta name="robots">` → `content="index, follow"`

---

## 내용 수정하기

`main.js` 상단 세 배열에서 관리합니다.

```js
const questions = [
  { tag: "형사", q: "질문", a: ["문단1", "문단2"] },
];

const practices = [
  { name: "형사", en: "CRIMINAL", image: "assets/center-criminal.webp",
    desc: "...", tags: ["구속영장", "압수수색"] },
];

const attorneys = [
  { name: "정호길", role: "대표변호사", field: "형사 · 수사 및 재판 대응",
    image: "assets/lawyer-01.webp", career: ["25년 경력 형사전문"] },
];
```

- 질문은 개수 제한이 없습니다. 번호는 자동으로 매겨집니다.
- 업무분야 이름은 **두 글자**로 맞추세요. 길면 닫힌 칸에서 잘립니다.
- 히어로 문구와 인사말, 원칙 3항목은 `index.html` 에 직접 적혀 있습니다.

## 이미지 다시 만들기

```bash
pip install Pillow
python3 - <<'EOF'
from PIL import Image
import os
SRC = "원본폴더"
for f in os.listdir(SRC):
    if not f.endswith(".png"): continue
    im = Image.open(os.path.join(SRC, f)).convert("RGB")
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    im.save("assets/" + f[:-4] + ".webp", "WEBP", quality=82, method=6)
EOF
```

## 검증 결과

| 항목 | 결과 |
|---|---|
| 뷰포트 7종(360~1440px) 가로 넘침 | 0건 |
| 로드 시 스크롤 튐 | 없음 |
| JS 에러 | 0건 |

## 참고 — 반복해서 걸렸던 것들

- 한글 명조 제목은 `line-height` 를 **1.3 아래로 내리지 않습니다.** 획이 겹칩니다.
- `<br>` 을 모바일에서 숨길 때는 **`<br>` 앞에 공백을 둡니다.** 그러지 않으면
  단어가 붙어 "기록 속 놓친 단서와진술의 모순" 처럼 보입니다.
- 그리드에서 **일부 자식만 위치를 지정하면 나머지가 엉뚱한 칸으로 밀립니다.**
  `.q-head` 에서 이 문제로 가로 넘침이 났습니다. 셋 다 `grid-area` 로 못박습니다.
- `max-width` 에 `ch` 단위를 쓰면 한글에서 너무 좁아집니다. `px` 을 씁니다.
- 인물 사진은 **세로 비율**입니다. 좁은 화면에서 가로로 눕히면 눈높이 한 줄만 남습니다.
- `assets/lawyer-01.webp` 는 배경을 지운 **컷아웃**이라 `object-fit` 은 `contain` 입니다.
- 히어로가 어두운 사진이므로 **헤더 글자는 밝게 시작**해야 합니다.
  스크롤해 히어로를 지나면 `.is-stuck` 이 붙어 어두운 글자로 바뀝니다.
