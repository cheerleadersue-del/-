# 법무법인 유일 — LAW FIRM YUIL

정적 웹사이트(HTML · CSS · JavaScript). 빌드 도구 없이 파일 그대로 배포합니다.

```
index.html      마크업
style.css       스타일 (반응형)
main.js         변호인단 캐러셀 · 모바일 메뉴 · 전문센터 렌더링
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

Netlify에 저장소를 연결하면 됩니다. 빌드 명령 없이 `publish = "."` 입니다.
zip을 [app.netlify.com/drop](https://app.netlify.com/drop) 에 끌어다 놓아도 즉시 배포됩니다.

---

## 디자인 — 레퍼런스 두 곳을 층으로 나눠 섞음

- **정보 구조** → 법무법인 목현: 탭형 업무분야 · 01~06 그리드 · 오시는 길 카드 · 상담 폼
- **색과 인물 연출** → 법무법인 테헤란: 다크 브라운 + 골드 · ghost 타이포 · 풀블리드 인물

테헤란의 **규모 과시 섹션(148명 / 8,952건 / 3개 지사)은 넣지 않았습니다.**
변호사 5인 · 1개 사무소인 유일에서는 빈 칸이 남아 오히려 작아 보입니다.
그 자리에는 숫자 대신 **선언문 3항목**을 넣었습니다.

### 섹션

| # | 섹션 | 출처 |
|---|---|---|
| 1 | 히어로 — 대표변호사 풀블리드 + ghost `Professional` + 상황별 칩 | 테헤란 연출 + 목현 칩 |
| 2 | 유일의 방식 — ghost `Principle` + 선언 3항목 | 테헤란 History 자리 대체 |
| 3 | 업무분야 — 탭 5개 + 좌 이미지 / 우 설명 + 태그 | 목현 |
| 4 | 변호인단 — 카드 5인 + `YUIL` 워터마크 + `+` 버튼 | 목현 |
| 5 | 약속 — 01~06 밝은 카드 그리드 | 목현 |
| 6 | 오시는 길 — 정보 카드 + 지도 | 목현 |
| 7 | 상담신청 — 이름 / 연락처 / 내용 / 동의 | 목현 |
| 8 | 우측 고정 레일 — 홈 · 전화 · 카톡 · 오시는 길 · TOP | 두 곳 공통 |

색: `#1a1512` 다크 브라운 / `#c9a45c` 골드 / `#efe9e0` 샌드 / `#fee500` 카카오

### 조작

| 대상 | 동작 |
|---|---|
| 업무분야 탭 | 버튼 클릭 · 좌우 화살표 · 터치 좌우 스와이프 (세로 제스처는 페이지 스크롤) |
| 변호사 카드 | 마우스는 호버, 터치는 탭하면 경력이 펼쳐집니다 |
| 상담 폼 | 이름 · 연락처(숫자 9~11자리) · 동의 검증 |

### 모바일

- 980px 이하에서 우측 레일이 사라지고 **하단 고정 상담 바**로 전환
- 히어로 인물은 텍스트 뒤로 은은하게 깔림
- 히어로 칩과 업무분야 탭은 **가로 스와이프**
- 변호사 카드는 **사진 좌측 · 정보 우측 가로형**으로 전환, 경력은 항상 노출
- 약속 카드는 1열

### 검증 결과

| 항목 | 결과 |
|---|---|
| 뷰포트 6종(360~1600px) 가로 넘침 | 0건 |
| 로드 시 스크롤 튐 | 없음 |
| JS 에러 | 0건 |
| 로컬 리소스 누락 | 0건 |
| 업무분야 탭 (클릭·화살표·순환) | 정상 |
| 상담 폼 검증 4단계 | 정상 |
| 28px 미만 터치 대상 | 체크박스(22px)뿐 — 라벨 전체가 클릭되어 실제 영역은 충분 |


---

## ⚠️ 배포 전 반드시 확인할 것

### 1. 변호사 사진과 성명의 짝

시안만으로는 어느 사진이 누구인지 확정할 수 없어 **임시 배정**했습니다.
`main.js` 의 `attorneys` 배열에서 각 `image` 값을 실제 인물과 대조해 주세요.

| 순서 | 성명 | 현재 배정된 파일 |
|---|---|---|
| 1 | 정호길 대표변호사 | `assets/lawyer-01.webp` |
| 2 | 김제도 변호사 | `assets/lawyer-02.webp` |
| 3 | 심상한 변호사 | `assets/lawyer-03.webp` |
| 4 | 정주현 변호사 | `assets/lawyer-04.webp` |
| 5 | 이경숙 변호사 | `assets/lawyer-05.webp` |

정호길 대표변호사 사진은 히어로에도 쓰입니다.

### 2. 지도

`assets/map-placeholder.svg` 는 **약도 자리표시자**입니다.
`index.html` 의 `.location-map` 안을 실제 지도 임베드로 바꾸세요.

```html
<div class="location-map">
  <iframe src="네이버/카카오 지도 임베드 주소"
          title="법무법인 유일 위치" loading="lazy"
          style="width:100%;height:100%;border:0"></iframe>
</div>
```

`.location-map-note` 단락(“실제 지도로 교체 예정”)은 지우면 됩니다.

### 3. 상담 폼 전송

**아직 어디로도 전송되지 않습니다.** 값 검증까지만 동작합니다.
Netlify 를 쓰신다면 `<form>` 에 아래를 더하면 바로 접수됩니다.

```html
<form class="contact-form" id="contactForm" name="consult"
      method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="consult">
```

그리고 `main.js` 의 `submit` 핸들러에서 `event.preventDefault()` 와
마지막 `setStatus(...)` 줄을 지우면 됩니다.

개인정보를 받는 폼이므로 **개인정보처리방침 페이지**를 먼저 준비하고
`.field-link` 의 `href="#"` 를 그 주소로 바꾸세요.

### 4. 변호사 광고규정

이번 페이지에는 승소율·성공 건수 같은 수치가 **없습니다.**
나중에 성공사례나 지표를 추가하실 계획이라면, 결과가 아니라
**"어떤 상황에서 무엇을 하는가"** 구조로 쓰시고 의뢰인이 특정되지 않도록 해주세요.
푸터의 면책 문구(`.footer-disclaimer`)도 함께 검토하시기 바랍니다.

### 5. 자리표시자

- **전화번호** `010-0000-0000` — `index.html` (레일·모바일 메뉴·히어로·오시는 길·상담·푸터·모바일 바·JSON-LD)
- **주소** `인천광역시 ○○구 ○○로 00, 유일빌딩 0층`
- **카카오 채널 주소** `https://pf.kakao.com/`
- **개인정보처리방침** 링크 — 현재 `#`
- **상담시간** 평일 09:00–18:00
- 변호사 경력 문구 — 실제 이력과 대조 필요

---

## 내용 수정하기

업무분야 · 변호인단 · 약속은 `main.js` 상단 배열에서 관리합니다.

```js
const practices = [
  { name: "형사센터", en: "CRIMINAL CENTER",
    image: "assets/center-criminal.webp",
    desc: "...", tags: ["구속영장", "압수수색"] },
];

const attorneys = [
  { name: "정호길", role: "대표변호사", field: "형사 · 수사 및 재판 대응",
    image: "assets/lawyer-01.webp",
    career: ["25년 경력 형사전문"] },
];

const values = [
  { title: "의뢰인 권익 보호", desc: "..." },
];
```

- 탭 개수와 `1 / 5` 카운터는 배열 길이에서 자동 계산됩니다.
- 약속은 6개를 넘어도 3열 그리드로 계속 이어집니다.
- 히어로 문구와 선언 3항목은 `index.html` 에 직접 적혀 있습니다.

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
    if im.width > 1200:
        im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
    im.save("assets/" + f[:-4] + ".webp", "WEBP", quality=82, method=6)
EOF
```

## 참고

- 폰트는 CDN(Pretendard)에서 불러옵니다. 네트워크가 막히면 시스템 한글 폰트로 대체됩니다.
- WebP는 Safari 14+ 를 포함한 모든 최신 브라우저에서 지원됩니다.
- 한글 제목은 `line-height` 를 1.12 아래로 내리지 않습니다. 그 아래에서는 획이 겹칩니다.
- `<br>` 을 모바일에서 숨길 때는 **`<br>` 앞에 공백을 둡니다.** 그러지 않으면
  단어가 붙어 "기록 속 놓친 단서와진술의 모순" 처럼 보입니다.
- 탭을 바꿀 때 `scrollIntoView` 를 쓰면 **초기 렌더에서 페이지가 그 섹션으로 튑니다.**
  탭 줄만 가로로 움직이도록 `tabsBox.scrollTo({ left })` 를 씁니다.
