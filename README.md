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

## 디자인

시안(변호사 소개 페이지)대로 구성했습니다.

- **헤더** — 골드 모노그램 + 국문/영문, `변호사 소개` 활성 표시
- **헤드** — "사건은 한 사람이 **해결**하지 않습니다." (해결만 골드)
- **커버플로우 캐러셀** — 5인 3D 배치. 가운데 카드는 골드 테두리 + 발광,
  측면 카드는 흑백 + 뒤로 밀림. 아래에 알약형 점 표시
- **변호사 상세** — 좌: 경력 + 서명 / 우: 강점 4항목(골드 아이콘)
- **지표 5칸** — 아래 광고규정 항목 참고
- **상담안내 · 푸터**

색: `#0a0908` 다크 / `#c9a45c` 골드 / `#fee500` 카카오

### 캐러셀 조작

| 입력 | 동작 |
|---|---|
| 마우스 드래그 | 카드가 손가락/커서를 따라 움직이고, 놓으면 가까운 카드로 스냅 |
| 터치 스와이프 | 동일. 세로로 그으면 캐러셀이 반응하지 않고 페이지가 스크롤됩니다 |
| 빠른 플릭 | 짧게 튕겨도 속도를 읽어 한 칸 넘어갑니다 |
| 측면 카드 클릭 | 해당 변호사로 이동 |
| 화살표 · 점 | 이동 |
| 키보드 | 캐러셀에 포커스 후 ← → · Home · End |

드래그 중에는 CSS 전환을 꺼서 손가락을 그대로 따라오고,
놓는 순간 다시 켜서 부드럽게 안착합니다.

### 모바일

- 900px 이하에서 상단 메뉴가 햄버거로 전환
- 620px 이하에서 캐러셀 화살표를 감추고 **스와이프**로만 조작
- 카드 크기와 간격은 화면 폭에 맞춰 JS가 조정
- 지표는 2열 + 마지막 항목 전체 폭
- **하단 고정 상담 바**, `env(safe-area-inset-bottom)` 대응

### 검증 결과

| 항목 | 결과 |
|---|---|
| 뷰포트 6종(360~1600px) 가로 넘침 | 0건 |
| JS 에러 | 0건 |
| 로컬 리소스 누락 | 0건 |
| 캐러셀 (드래그·스와이프·플릭·클릭·키보드) | 정상 |
| 세로 제스처가 캐러셀을 가로채는지 | 가로채지 않음 |


---

## ⚠️ 배포 전 반드시 확인할 것

### 1. 변호사 사진과 성명의 짝

시안만으로는 어느 사진이 누구인지 확정할 수 없어 **성별·인상만 보고 임시 배정**했습니다.
`main.js` 의 `attorneys` 배열에서 각 `image` 값을 실제 인물과 대조해 주세요.

| 캐러셀 순서 | 성명 | 현재 배정된 파일 |
|---|---|---|
| 1 | 심상한 변호사 | `assets/lawyer-03.webp` |
| 2 | 김제도 변호사 | `assets/lawyer-02.webp` |
| 3 | **정호길 대표변호사** (첫 화면) | `assets/lawyer-01.webp` |
| 4 | 정주현 변호사 | `assets/lawyer-04.webp` |
| 5 | 이경숙 변호사 | `assets/lawyer-05.webp` |

명단이 시안마다 달랐습니다. 이번 시안 기준(심상한 · 김제도 · 정호길 · 정주현 · 이경숙)으로
반영했습니다. `김의환`, `정주형` 은 다른 시안에만 있었습니다.


### 2. 배경 이미지와 강점 문구

시안의 법률사무소 사진과 의사봉 사진을 받지 못해 **분위기가 맞는 SVG로 대체**했습니다
(`backdrop-office.svg`, `backdrop-desk.svg`). 실제 사진이 있으면 교체하세요.

**정호길 대표변호사의 강점 4항목만 시안에 있었습니다.** 나머지 4인의 4항목은
각자의 전문분야에서 실제로 하는 일을 서술한 것이라 사실 확인이 필요합니다
(`main.js` 의 `attorneys[].points`).

서명 이미지(`signature.png`)는 대표변호사만 넣었습니다. 다른 분들 것은
실제 서명을 받아 추가하시면 `attorneys[].signature` 에 경로만 넣으면 됩니다.

### 3. ⚠️ 지표 5칸 — 광고규정 검토가 꼭 필요합니다

시안의 지표 중 아래 세 개는 **대한변협 변호사광고규정에서 문제가 될 수 있습니다.**

| 표기 | 우려 |
|---|---|
| `2,500+ 형사 사건 성공 경험` | "성공" 건수는 사실상 승소 실적 광고로 읽힙니다 |
| `95.6% 의뢰인 만족도` | 산출 근거가 없으면 객관적으로 증명할 수 없는 표시입니다 |
| `1,800+ 마약 사건 해결 건수` | "해결"의 정의가 불분명합니다 |

특히 시안의 주석 **"일부 각색되었으며"** 는 위험합니다. 숫자를 광고하면서
그 숫자가 각색되었다고 밝히는 것은 면책이 아니라 **허위·과장광고를 자인하는 문구**로
읽힐 수 있습니다.

권고 사항:

1. **실제 집계된 수치만** 쓰고, 산출 기준(기간·모수·집계 방법)을 함께 밝히세요.
2. "성공 / 해결" 대신 **"수행"·"상담"** 같은 중립적인 표현으로 바꾸세요.
   (예: `2,500+ 형사 사건 수행`)
3. 근거를 댈 수 없다면 해당 항목을 빼는 편이 안전합니다.
4. "각색" 문구는 지우고, 대신 산출 기준을 적으세요.

수치와 라벨은 `main.js` 의 `stats` 배열에, 주석 문구는 `index.html` 의
`.stats-note` 에 있습니다. 지표 전체를 없애려면 `index.html` 에서
`<ul class="stats" id="stats">` 와 `.stats-note` 단락을 지우면 됩니다.

이건 법률 자문이 아니니, 최종적으로는 소속 변호사회에 확인하시기 바랍니다.

### 4. 자리표시자

- **전화번호** `010-0000-0000` — `index.html` (상담 레일·모바일 메뉴·상담·푸터·모바일 바·JSON-LD)
- **주소** `인천광역시 ○○구 ○○로 00` — `index.html`, JSON-LD
- **카카오 채널 주소** `https://pf.kakao.com/` — 실제 채널 URL
- **개인정보처리방침** 링크 — 현재 `#`
- **상담시간** 평일 09:00–18:00 — 실제 운영시간 확인

---

## 내용 수정하기

변호인단과 지표는 `main.js` 상단의 배열에서 관리합니다.
배열을 고치면 캐러셀·점·상세 패널이 함께 갱신됩니다.

```js
const attorneys = [
  {
    name: "정호길",              // 카드에 표시
    role: "대표변호사",
    sub:  "25년 경력 형사전문 변호사",
    image: "assets/lawyer-01.webp",
    heading: "정호길 대표변호사",  // 상세 패널 제목
    title:   "25년 경력 형사전문",
    signature: "assets/signature.png",   // 없으면 생략
    career: ["광주경찰청 광수대 강력팀", ...],
    points: [{ icon: "shield", title: "...", desc: "..." }, ...]
  },
  ...
];

const stats = [
  { icon: "team", value: "25년+", label: "형사전문 경력" },
  ...
];
```

- 첫 화면에 놓을 사람은 `role` 이 `"대표변호사"` 인 항목이 자동으로 선택됩니다.
- 점 개수와 카드 배치는 배열 길이에서 자동 계산되므로 인원을 늘리거나 줄여도 됩니다.
- `icon` 에 쓸 수 있는 값: `shield` `scale` `doc` `user` `team` `gavel` `thumb` `medal`

## 이미지 다시 만들기

```bash
pip install Pillow
python3 - <<'PY'
from PIL import Image
import os
SRC = "원본폴더"
for f in os.listdir(SRC):
    if not f.endswith(".png"): continue
    im = Image.open(os.path.join(SRC, f))
    if im.width > 1400:
        im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
    im.save("assets/" + f[:-4] + ".webp", "WEBP", quality=82, method=6)
PY
```

서명 이미지를 만들 때:

```python
from PIL import Image, ImageDraw, ImageFont
font = ImageFont.truetype("NothingYouCouldDo-Regular.ttf", 190)
text = "Hogil. Jeong"
box = ImageDraw.Draw(Image.new("RGBA", (10, 10))).textbbox((0, 0), text, font=font)
w, h, pad = box[2] - box[0], box[3] - box[1], 40
img = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
ImageDraw.Draw(img).text((pad - box[0], pad - box[1]), text, font=font,
                         fill=(201, 164, 92, 235))
img.save("assets/signature.png")
```

실제 손글씨 서명을 스캔해 배경을 지우고 넣는 편이 더 좋습니다.

## 참고

- 폰트는 CDN(Pretendard)에서 불러옵니다. 네트워크가 막히면 시스템 한글 폰트로 대체됩니다.
- WebP는 Safari 14+ 를 포함한 모든 최신 브라우저에서 지원됩니다.
- 한글 제목은 `line-height` 를 1.12 아래로 내리지 않습니다. 그 아래에서는 획이 겹칩니다.
- `<br>` 을 모바일에서 숨길 때는 **`<br>` 앞에 공백을 둡니다.** 그러지 않으면
  단어가 붙어 "기록 속 놓친 단서와진술의 모순" 처럼 보입니다.
- 3D 캐러셀에서 `transform-style: preserve-3d` 컨테이너가 화면을 덮고 있으면,
  `translateZ` 로 뒤에 놓인 카드를 **컨테이너가 가려 클릭이 안 됩니다.**
  `.coverflow-track` 에 `pointer-events: none`, 카드에 `auto` 를 준 이유입니다.
