# 법무법인 유일 — LAW FIRM YUIL

정적 웹사이트(HTML · CSS · JavaScript). 빌드 도구 없이 파일 그대로 배포합니다.

```
index.html      마크업
style.css       스타일
main.js         스크롤 연출 · 상호작용
assets/         이미지(WebP) · SVG 심볼
netlify.toml    Netlify 캐시 · 보안 헤더
robots.txt
```

## 로컬에서 보기

```bash
npx http-server . -p 8080
# http://localhost:8080
```

`file://` 로 직접 열어도 동작하지만, 캐시 헤더 확인 등은 서버로 띄워야 정확합니다.

## 배포

Netlify에 이 저장소를 연결하면 됩니다. 빌드 명령은 없고 `publish = "."` 입니다.

---

## 이번 리코딩에서 고친 것

| 문제 | 처리 |
|---|---|
| `assets/hero-goddess.png` 파일 없음 → 히어로에 깨진 이미지 노출 | 저울 모티프 SVG(`hero-goddess.svg`)로 대체 |
| 히어로 제목의 한글 획이 서로 겹침 (`line-height:0.95` + `margin-top:-0.08em`) | 한글에 맞춰 `line-height:1.02`, 음수 마진 제거 |
| `criminal-cases.html` 등 존재하지 않는 5개 페이지로 링크 → 404 | 페이지가 생길 때까지 `#contact` 로 연결 (아래 "남은 작업" 참고) |
| 이미지 12.4MB (PNG 원본) | WebP 변환 + 리사이즈 → **0.6MB (95% 감소)** |
| 닫힌 전체 메뉴의 링크가 키보드 탭 순서에 남아 포커스가 갇힘 | `inert` 속성으로 완전히 제외, ESC 로 닫으면 버튼에 포커스 복귀 |
| 스크롤 연출을 끌 방법이 없음 (모션 민감 사용자) | `prefers-reduced-motion` 시 가로 히어로·시네마틱 구간을 정적 레이아웃으로 전환하고 변호인단 대체 목록 제공 |
| 시티뷰 위 인트로 문구의 명암 대비 부족 | `text-shadow` 추가 |
| 고정 헤더가 전문분야 이미지 상단을 가림 | sticky 위치를 헤더 높이만큼 보정 |
| `!important`·중복 규칙이 겹겹이 쌓인 CSS | 단일 캐스케이드로 재작성 |
| 스크롤 리스너 2개가 각각 등록 | 하나의 rAF 루프로 통합 |
| `innerHTML` 로 목록 생성 | `createElement` 기반으로 변경 |
| OG·트위터 카드·파비콘·구조화 데이터 없음 | 추가 (`LegalService` JSON-LD 포함) |

## 남은 작업 — 실제 정보로 교체 필요

배포 전에 아래 자리표시자를 실제 값으로 바꿔야 합니다.

- **전화번호** `032.000.0000` — `index.html`(헤더·메뉴·상담·푸터·JSON-LD), 모바일 하단 바
- **주소** `인천광역시 ○○구 ○○로 00` — `index.html`, JSON-LD
- **변호사 03~06 성명** — `main.js` 의 `lawyers` 배열 (`name`, `role`, `description`, `careers`)
- **카카오톡 채널 주소** `https://pf.kakao.com/` — 실제 채널 URL
- **개인정보처리방침** 링크 — 현재 `#`
- **상담시간** 평일 09:00–18:00 — 실제 운영시간 확인
- **분야별 성공사례 페이지** — 페이지를 만든 뒤 `main.js` `practices[].link` 를 해당 경로로,
  `linkText` 를 "○○센터 성공사례 보기" 로 되돌리고, `index.html` 의 `#practiceLinkLabel`
  텍스트를 `SUCCESS CASES` 로 바꾸면 됩니다.

## 이미지 다시 만들기

원본 PNG를 교체했다면 아래로 WebP를 다시 생성합니다.

```bash
pip install Pillow
python3 - <<'PY'
from PIL import Image
import os
for f in os.listdir('원본폴더'):
    if not f.endswith('.png'): continue
    im = Image.open(os.path.join('원본폴더', f))
    if im.width > 1400:
        im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
    im.save('assets/' + f[:-4] + '.webp', 'WEBP', quality=82, method=6)
PY
```

## 참고

- 폰트는 CDN(Pretendard, Playfair Display)에서 불러옵니다. 네트워크가 막히면
  시스템 한글 폰트로 자연스럽게 대체됩니다.
- WebP는 Safari 14+ 를 포함한 모든 최신 브라우저에서 지원됩니다.
