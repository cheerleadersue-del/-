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

시안(좌우 분할 히어로 + 변호인단 캐러셀 + 우측 상담 레일)대로 구성했습니다.

- **헤더** — `YUIL` 워드마크 + 구분선 + 국문/영문, 우측 원형 메뉴 버튼
- **히어로 좌** — 사옥 사진 위에 "증거주의(골드 그라데이션) / 수사중심", 골드 세로선 문구
- **히어로 우** — 변호인단 캐러셀. 대표변호사부터 5인, `01 / 05` 카운터와 원형 이전·다음
- **썸네일 스트립** — 5인 카드. 클릭하면 히어로가 바뀌고, 비활성 카드는 흑백 처리
- **대응 절차** — 01 증거분석 / 02 수사흐름 예측 / 03 전략회의 / 04 대응 로드맵
- **우측 상담 레일** — 세로쓰기 전화번호 + 카카오톡(노랑) + 온라인 상담, 화면 우측 고정
- **전문센터 · 상담안내 · 푸터**

색: `#0d0d0f` 다크 / `#c9a45c` 골드 / `#fee500` 카카오

### 모바일

- 980px 이하에서 우측 레일이 사라지고 **하단 고정 상담 바**로 전환
- 히어로가 위아래로 쌓이고, 인물 사진은 텍스트 아래로 배치
- 썸네일 스트립은 **가로 스와이프**(스크롤 스냅)
- 대응 절차는 세로 목록으로 전환

### 검증 결과

| 항목 | 결과 |
|---|---|
| 뷰포트 6종(360~1600px) 가로 넘침 | 0건 |
| JS 에러 | 0건 |
| 로컬 리소스 누락 | 0건 |
| 32px 미만 터치 대상 | 0건 |
| 캐러셀 (화살표·썸네일·순환) | 정상 |


---

## ⚠️ 배포 전 반드시 확인할 것

### 1. 변호사 사진과 성명의 짝

시안만으로는 어느 사진이 누구인지 확정할 수 없어 **성별·인상만 보고 임시 배정**했습니다.
`main.js` 의 `attorneys` 배열에서 각 `image` 값을 실제 인물과 대조해 주세요.

| 성명 | 역할 | 현재 배정된 파일 |
|---|---|---|
| 정호길 | 대표변호사 | `assets/lawyer-01.webp` |
| 김제도 | 파트너변호사 | `assets/lawyer-04.webp` |
| 정주형 | 파트너변호사 | `assets/lawyer-02.webp` |
| 김의환 | 파트너변호사 | `assets/lawyer-03.webp` |
| 이경숙 | 파트너변호사 | `assets/lawyer-05.webp` |


### 2. 사옥 사진

보내주신 사옥 사진(법조타워)을 `assets/building.webp` 로 넣었습니다.
CSS 에서 `brightness(0.52)` 로 어둡게 눌러 제목이 읽히게 했습니다.

### 3. 변호사 광고규정

대한변협 변호사광고규정상 **승소율·성공률 등 수치 표기와 특정 결과를 단정하는 표현은
사용할 수 없습니다.** 현재 페이지에는 그런 표현이 없습니다.

성공사례 섹션을 추가하실 계획이라면 결과가 아니라 **"어떤 상황에서 무엇을 하는가"**
구조로 쓰시고, 의뢰인이 특정되지 않도록 해주세요.
푸터의 면책 문구(`.footer-disclaimer`)도 함께 검토하시기 바랍니다.

### 4. 자리표시자

- **전화번호** `010-0000-0000` — `index.html` (상담 레일·모바일 메뉴·상담·푸터·모바일 바·JSON-LD)
- **주소** `인천광역시 ○○구 ○○로 00` — `index.html`, JSON-LD
- **카카오 채널 주소** `https://pf.kakao.com/` — 실제 채널 URL
- **개인정보처리방침** 링크 — 현재 `#`
- **상담시간** 평일 09:00–18:00 — 실제 운영시간 확인

---

## 내용 수정하기

변호인단과 전문센터는 `main.js` 상단의 배열에서 관리합니다.
배열을 고치면 히어로 캐러셀과 썸네일 스트립이 함께 갱신됩니다.

```js
const attorneys = [
  {
    name: "정호길",
    role: "대표변호사",
    title: "25년 경력 형사전문 변호사",
    image: "assets/lawyer-01.webp",
    description: "수사기관의 시각에서<br>증거와 진술의 흐름을<br>분석합니다."
  },
  ...
];

const centers = [
  { name: "형사센터", en: "CRIMINAL", desc: "..." },
  ...
];
```

`01 / 05` 카운터는 배열 길이에서 자동으로 계산되므로 인원을 늘리거나 줄여도 됩니다.

대응 절차 4항목과 히어로 좌측 문구는 `index.html` 에 직접 적혀 있습니다.

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

사옥 사진을 교체할 때:

```python
from PIL import Image
im = Image.open("새사옥.jpg").convert("RGB")
im.thumbnail((1200, 1200), Image.LANCZOS)
im.save("assets/building.webp", "WEBP", quality=84, method=6)
```

어둡게 누르는 처리는 CSS(`.hero-building` 의 `filter`)에서 하므로
원본은 밝은 상태로 두면 됩니다.

## 참고

- 폰트는 CDN(Pretendard)에서 불러옵니다. 네트워크가 막히면 시스템 한글 폰트로 대체됩니다.
- WebP는 Safari 14+ 를 포함한 모든 최신 브라우저에서 지원됩니다.
- 한글 제목은 `line-height` 를 1.12 아래로 내리지 않습니다. 그 아래에서는 획이 겹칩니다.
- `<br>` 을 모바일에서 숨길 때는 **`<br>` 앞에 공백을 둡니다.** 그러지 않으면
  단어가 붙어 "기록 속 놓친 단서와진술의 모순" 처럼 보입니다.
