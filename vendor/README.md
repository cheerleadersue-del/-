# vendor — 남이 만든 것

여기 있는 파일은 **제가 쓴 것이 아닙니다.** 다른 사람이 만들어
공개한 것을 받아 와 그대로 둔 것입니다. 고치지 마십시오.

셋 다 `traffic-insurance.html` 한 장에서만 씁니다.

---

## 1. aos.js · aos.css — 떠오르는 효과

화면을 내릴 때 글과 칸이 떠오르는 효과를 냅니다.

| | |
|---|---|
| 이름 | AOS (Animate On Scroll) |
| 만든 사람 | Michał Sajnóg |
| 받아온 곳 | https://github.com/michalsnik/aos |
| 판 | 2.3.2 (master 가지) |
| 받은 날 | 2026-11-23 |
| 쓸 수 있는 조건 | MIT 허가 — `aos-LICENSE.txt` |

---

## 2. pretendard-ksx1001.woff2 — 글꼴

컨셉 그림에 쓰인 글꼴입니다.

| | |
|---|---|
| 이름 | Pretendard |
| 만든 사람 | 길형진 (orioncactus) |
| 받아온 곳 | https://github.com/orioncactus/pretendard |
| 판 | 변수 글꼴(PretendardVariable) |
| 받은 날 | 2026-11-23 |
| 쓸 수 있는 조건 | SIL Open Font License 1.1 — `pretendard-OFL.txt` |

### 손을 댄 곳 — 글자를 잘라 넣었습니다

원본은 **2MB** 입니다. 그대로 두면 휴대폰에서 쪽이 늦게 뜹니다.
그래서 **상용 한글 2,350자(KS X 1001)와 영문 · 숫자 · 문장부호만**
남기고 잘랐습니다. **446KB** 가 되었습니다.

굵기마다 파일을 따로 두면 다섯 장에 888KB 인데, 변수 글꼴은
한 장으로 45~930 모든 굵기를 냅니다. 그래서 변수 글꼴을 썼습니다.

> ⚠️ **아주 드문 글자는 들어 있지 않습니다.**
> 「똠」 「뷁」처럼 쓰지 않는 글자가 그렇습니다. 그런 글자가 나오면
> 그 글자만 Noto Sans KR 로 나와 모양이 살짝 다릅니다.
> 2026-11-23 에 쪽의 글을 다 훑어 빠진 글자가 없는 것을
> 확인했습니다.
>
> ★ **성공사례처럼 글을 새로 넣으신 뒤에는 한 번 봐 주십시오.**
>   어느 글자가 혼자 달라 보이면 그것입니다.

### 다시 자르는 법

```
pip install fonttools brotli
python3 -m fontTools.subset PretendardVariable.woff2 \
        --text-file=글자목록.txt --flavor=woff2 \
        --layout-features='*' --output-file=pretendard-ksx1001.woff2
```

---

## 3. 아이콘 (Phosphor Icons)

쪽에 쓰인 작은 그림 16종입니다.

| | |
|---|---|
| 이름 | Phosphor Icons (fill 묶음) |
| 받아온 곳 | https://github.com/phosphor-icons/core |
| 받은 날 | 2026-11-23 |
| 쓸 수 있는 조건 | MIT 허가 — `phosphor-LICENSE.txt` |

### 파일이 여기 없는 까닭

아이콘은 **`traffic-insurance.html` 안에 직접 그려 넣었습니다.**
쪽 맨 위의 `<svg class="sprite">` 가 그것입니다. 눈에 보이지 않고,
본문에서는 `<use href="#i-이름">` 으로 불러 씁니다.

그림 파일이 아니라 선으로 그린 것(SVG)이라
- 색은 CSS 의 `color` 를 따라갑니다. 파란 동그라미 안에서는 하얗게,
  흰 칸 안에서는 파랗게 나옵니다.
- 아무리 키워도 깨지지 않습니다.
- 따로 받아올 파일이 없어 쪽이 빨리 뜹니다.

> ⚠️ **전에는 이모지(🏛️ 🪙 ⚖️ …)를 썼습니다.**
> 이모지는 아이폰 · 안드로이드 · 윈도우에서 저마다 다른 그림으로
> 보입니다. 제 화면에서 멀쩡해도 의뢰인 휴대폰에서는 다릅니다.
> 그래서 바꿨습니다. **되돌리지 마십시오.**

### 아이콘을 더 넣으시려면

https://phosphoricons.com 에서 이름을 찾아 `fill` 묶음의 svg 를 받아,
`<symbol id="i-이름" viewBox="0 0 256 256">` 안에 넣으면 됩니다.

---

## 왜 남의 서버(CDN)를 쓰지 않았나

- 남의 서버가 멈추면 우리 쪽도 같이 멈춥니다.
- 의뢰인이 어느 쪽을 보고 계신지가 남의 서버로 새어 나가지 않습니다.
- 한 번 올려 두면 다시 받을 일이 없습니다.

## 고쳐야 할 일이 생기면

이 파일들을 직접 고치지 마시고, 위 주소에서 새 판을 받아 통째로
갈아끼우십시오. 그리고 이 표의 「판」과 「받은 날」을 고치십시오.
