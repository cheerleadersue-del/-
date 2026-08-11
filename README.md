# 법무법인 유일 — LAW FIRM YUIL

정적 웹사이트(HTML · CSS · JavaScript). 빌드 도구 없이 파일 그대로 배포합니다.

```
index.html      마크업
style.css       스타일 (라이트 · 다크 · 반응형)
main.js         테마 전환 · 검색 · 카드 렌더링
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
zip 파일을 [app.netlify.com/drop](https://app.netlify.com/drop) 에 끌어다 놓아도 즉시 배포됩니다.

---

## 디자인

카카오 코퍼레이트 사이트의 디자인 언어를 참고해 전면 재설계했습니다.

- **밝은 배경 · 넓은 여백** — 기존 어두운 톤에서 전환
- **헤더** — 로고(좌) · 메뉴(중앙) · 도구(우), 현재 섹션은 검은 알약으로 표시
- **초대형 볼드 한글 헤드라인** — 자간 -0.05em
- **하프톤 점 워드마크** — `assets/wordmark-yuil.svg` (788개 점)
- **알약형 칩** — 골드 CTA + `#해시태그` 아웃라인
- **말풍선 검색 바** — 꼬리 달린 다크 바, 사이트 내 검색 동작
- **풀블리드 사진 섹션** — 업무분야 인트로

브랜드 컬러는 기존 유일의 골드(`#c9a45c` / `#e0ba5e`)를 그대로 씁니다.

### 다크 모드

헤더의 달·해 아이콘으로 전환하며 `localStorage` 에 저장됩니다.
첫 방문 시에는 OS 설정(`prefers-color-scheme`)을 따릅니다.
깜빡임을 막기 위해 `<head>` 인라인 스크립트에서 페인트 전에 테마를 적용합니다.

### 모바일

- 640px 이하에서 햄버거 → 전체화면 메뉴
- 히어로 칩은 **가로 스와이프**(스크롤 스냅)
- 변호인단 카드는 **사진 좌측 · 정보 우측 가로형**으로 전환
- **하단 고정 상담 바** (전화 · 카카오톡), `env(safe-area-inset-bottom)` 대응
- 모든 터치 대상 36px 이상

### 검증 결과

| 항목 | 결과 |
|---|---|
| 뷰포트 5종(360~1440px) 가로 넘침 | 0건 |
| JS 에러 | 0건 |
| 로컬 리소스 누락 | 0건 |
| 36px 미만 터치 대상 | 0건 |
| 새로고침 후 테마 유지 | 정상 |
| 이미지 총량 | 0.6MB (원본 12.4MB 대비 95%↓) |

---

## 남은 작업 — 실제 정보로 교체 필요

- **전화번호** `032.000.0000` — `index.html`(헤더·히어로·상담·푸터·모바일 바·JSON-LD)
- **주소** `인천광역시 ○○구 ○○로 00` — `index.html`, JSON-LD
- **변호사 03~06 성명** — `main.js` 의 `lawyers` 배열 (`name`, `role`, `description`, `tags`)
- **카카오톡 채널 주소** `https://pf.kakao.com/` — 실제 채널 URL
- **개인정보처리방침** 링크 — 현재 `#`
- **상담시간** 평일 09:00–18:00 — 실제 운영시간 확인
- **분야별 성공사례 페이지** — 페이지를 만든 뒤 `main.js` `practices[].link` 를 해당 경로로,
  `linkText` 를 "성공사례 보기" 로 바꾸면 됩니다. (현재는 404를 피해 `#contact` 로 연결)

## 워드마크 다시 만들기

문구나 색을 바꾸려면:

```bash
pip install Pillow
python3 - <<'PY'
from PIL import Image, ImageDraw, ImageFont
TEXT, FONT = "yuil", "경로/Outfit-Bold.ttf"
font = ImageFont.truetype(FONT, 420)
box = ImageDraw.Draw(Image.new("L",(10,10))).textbbox((0,0), TEXT, font=font)
w, h, pad = box[2]-box[0], box[3]-box[1], 20
img = Image.new("L", (w+pad*2, h+pad*2), 0)
ImageDraw.Draw(img).text((pad-box[0], pad-box[1]), TEXT, font=font, fill=255)
STEP, R = 11, 4.05
dots = [(x,y) for y in range(0,img.height,STEP) for x in range(0,img.width,STEP)
        if img.getpixel((x,y)) > 118]
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {img.width} {img.height}">',
       '<g fill="#c9a45c">',
       *[f'<circle cx="{x}" cy="{y}" r="{R}"/>' for x,y in dots],
       '</g></svg>']
open("assets/wordmark-yuil.svg","w").write("\n".join(svg))
PY
```

## 이미지 다시 만들기

```bash
python3 - <<'PY'
from PIL import Image
import os
SRC = "원본폴더"
for f in os.listdir(SRC):
    if not f.endswith(".png"): continue
    im = Image.open(os.path.join(SRC, f))
    if im.width > 1400:
        im = im.resize((1400, round(im.height*1400/im.width)), Image.LANCZOS)
    im.save("assets/" + f[:-4] + ".webp", "WEBP", quality=82, method=6)
PY
```

## 참고

- 폰트는 CDN(Pretendard)에서 불러옵니다. 네트워크가 막히면 시스템 한글 폰트로 대체됩니다.
- WebP는 Safari 14+ 를 포함한 모든 최신 브라우저에서 지원됩니다.
- 한글 제목은 `line-height` 를 1.12 아래로 내리지 않습니다. 그 아래에서는 획이 겹칩니다.
