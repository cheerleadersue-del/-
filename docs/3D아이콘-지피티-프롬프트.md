# 지피티로 3D 아이콘 만들기 — 프롬프트

2026-11-26. `traffic-insurance.html` (운전자보험 랜딩 쪽)에 쓸 것입니다.

---

## ⚠️ 먼저 — 아홉 개만 만드시면 됩니다

쪽에 아이콘이 열여덟 종 들어 있지만, **3D로 바꿔서 효과가 있는 것은
아홉 개뿐**입니다. 나머지는 자리가 너무 작아서 3D로 만들어도
뭉개지기만 합니다. 지금의 선그림이 더 또렷합니다.

| 자리 | 칸 크기 | 아이콘 크기 | 3D? |
|---|---|---|---|
| **법정형 두 칸** | 54px | **28px** | ⭕ 만드십시오 |
| **세 알약** | 40px | **20px** | ⭕ 만드십시오 |
| **네 가지 잃는 것** | — | **26px** | ⭕ 만드십시오 |
| 믿을 거리 띠 | 34px | 18px | ❌ 너무 작습니다 |
| 휴대폰 모형 속 | 28px | 15px | ❌ 너무 작습니다 |
| 단추 안 (카톡 · 전화) | — | 18px | ❌ 너무 작습니다 |

> **28px 이 작아 보이시면 칸을 키우면 됩니다.**
> 컨셉 그림은 세로로 긴 한 장이라 아이콘이 커 보이는 것이고,
> 실제 쪽에서는 그만큼 크지 않습니다. 3D로 가시면 제가 법정형 칸을
> 54px → 72px 로, 아이콘을 28px → 40px 로 키우겠습니다.
> 그래야 3D로 만든 보람이 있습니다. **말씀만 주십시오.**

---

## ⚠️ 그림을 받으실 때 지켜 주셔야 하는 것

1. **글자를 넣지 마십시오.** 지피티는 한글을 제대로 쓰지 못합니다.
   「벌금」이 「벌금」처럼 나옵니다. 글자는 제가 넣습니다.
2. **배경은 투명하게.** 흰 배경으로 받으시면 파란 칸 위에 흰 네모가
   생깁니다. 「transparent background, PNG」를 꼭 적으십시오.
3. **그림자를 그려 넣지 마십시오.** 그림자는 제가 CSS로 넣습니다.
   그림에 박혀 있으면 칸 색이 바뀔 때 어색해집니다.
4. **아홉 개의 빛 방향과 각도가 같아야 합니다.** 이게 제일 중요합니다.
   하나씩 따로 만들면 제각각이 됩니다 — 아래 **「한 장에 모아 받기」**
   를 보십시오.

---

# 방법 1 — 한 장에 모아 받기 (권해 드립니다)

아홉 개를 **한 장에** 받으시면 빛과 각도가 저절로 맞습니다.
제가 받아서 아홉 조각으로 잘라 쓰겠습니다.

지피티에 이대로 넣으십시오.

```
Create ONE image containing a 3x3 grid of nine separate 3D rendered icons,
evenly spaced on a transparent background.

Style for all nine, identical across the grid:
- Soft 3D clay / glossy plastic render, rounded edges, friendly but
  professional. Think modern fintech app icons.
- Color palette ONLY: deep blue #1150bd, bright blue #2f84f5,
  light blue #d9e8fe, white, and a small amount of warm gold #ffd84d
  for accents.
- Lighting: single soft key light from the TOP-LEFT, gentle ambient fill.
  Identical light direction for every icon.
- Camera: straight-on front view, very slight 10-degree top-down tilt.
  Identical angle for every icon.
- NO drop shadows on the ground. NO background. NO text, letters,
  numbers or words anywhere.
- Each icon centered in its own cell with clear empty margin around it.

The nine icons, left to right, top to bottom:
1. A classical courthouse building with columns
2. A stack of gold-and-blue coins
3. A judge's gavel resting on its round block
4. An ID card / driver's licence card, slightly angled
5. A line chart arrow trending sharply upward
6. A circular "prohibited" sign (circle with a diagonal bar)
7. A single sheet of paper document with a folded corner
8. A closed briefcase with a handle
9. A shield with a checkmark inside

Square image, high resolution, transparent background.
```

받으신 **한 장을 그대로 저에게 보내 주십시오.** 제가 자르겠습니다.
칸이 어긋나 있어도 괜찮습니다.

---

# 방법 2 — 하나씩 받기

한 장이 마음에 안 드시면 하나씩 받으셔도 됩니다.
**아래 「공통」을 먼저 넣고**, 그다음 아이콘 아홉 개를 하나씩 이어
붙이십시오. 공통 문구를 매번 함께 넣으셔야 모양이 맞습니다.

## 공통 (매번 앞에 붙이십시오)

```
A single 3D rendered icon on a fully transparent background.

Style:
- Soft 3D clay / glossy plastic render, rounded edges, friendly but
  professional. Modern fintech app icon.
- Colors ONLY: deep blue #1150bd, bright blue #2f84f5,
  light blue #d9e8fe, white, small gold #ffd84d accents.
- Lighting: one soft key light from the TOP-LEFT, gentle ambient fill.
- Camera: straight-on front view with a slight 10-degree top-down tilt.
- Centered, with empty margin around it.
- NO ground shadow. NO background. NO text, letters, numbers or words.

Square, 1024x1024, transparent PNG.

The icon is:
```

## 아홉 개 — 위 공통 뒤에 이어 붙이실 말

| 파일 이름 | 이어 붙이실 말 | 어디에 쓰나 |
|---|---|---|
| `ins-3d-bank.png` | `a classical courthouse building with columns and steps` | 「5년 이하 금고」 |
| `ins-3d-coins.png` | `a neat stack of gold and blue coins` | 「2천만원 이하 벌금」 · 「벌금 가능성」 |
| `ins-3d-gavel.png` | `a judge's gavel resting on its round sound block` | 「정식기소 · 구공판」 |
| `ins-3d-card.png` | `a driver's licence card, slightly angled, with a tiny portrait area but no text` | 「별도 행정처분」 |
| `ins-3d-chart.png` | `a line chart with an arrow trending sharply upward` | 「합의금이 올라갈 수 있습니다」 |
| `ins-3d-ban.png` | `a circular prohibition sign, a ring with one diagonal bar across it` | 「보험금을 받지 못할 수 있습니다」 |
| `ins-3d-doc.png` | `a single sheet of paper document with a folded corner` | 「합의서 효력이 문제될 수 있습니다」 |
| `ins-3d-case.png` | `a closed business briefcase with a handle` | 「선임비 보장이 어려울 수 있습니다」 |
| `ins-3d-shield.png` | `a shield with a checkmark inside it` | (예비 — 쓸 자리가 생기면) |

**파일 이름을 위와 똑같이 지어 주십시오.** 그러면 제가 그대로
`assets/` 에 넣고 쪽에 끼울 수 있습니다. 이름이 다르면 제가
하나씩 열어 보고 맞춰야 합니다.

---

# 영문 한 줄 요약 (지피티가 어수선하게 그릴 때)

위 프롬프트로 나온 그림이 복잡하면 이 한 줄을 뒤에 더 붙이십시오.

```
Keep it extremely simple — a single clean object, minimal detail,
no scene, no props, no environment. Icon, not illustration.
```

---

# 받으신 뒤에

**그림 파일을 저에게 보내 주시면** 제가

1. 투명 배경인지, 글자가 섞이지 않았는지 확인하고
2. 아홉 개의 빛 방향과 각도가 맞는지 견주어 보고
3. `.webp` 로 줄여서 (`.png` 는 무겁습니다) `assets/` 에 넣고
4. 법정형 칸을 54px → 72px 로 키우고
5. 휴대폰 화면에서도 또렷한지 확인하고
6. 지금의 선그림은 **지우지 않고 남겨 둡니다** — 그림이 안 뜨면
   선그림이 대신 나오도록 해 두겠습니다

하겠습니다.

> **마음에 안 드시면 지금 상태로 되돌리기 쉽습니다.**
> 선그림을 남겨 두기 때문입니다. 부담 없이 받아 보십시오.

---

# 돈이 드는지

지피티 그림은 요금제에 따라 다릅니다. 한 장에 모아 받으시면
**한 번만** 만들면 되니 가장 쌉니다. 하나씩 받으시면 아홉 번입니다.

Phosphor 선그림(지금 쓰는 것)과 Pretendard 글꼴은 **둘 다 무료**이고
이미 넣어 두었습니다. 3D를 안 하셔도 쪽은 지금 그대로 괜찮습니다.
