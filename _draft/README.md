# 아직 켜지 않은 쪽

여기 있는 파일은 **홈페이지에 나가지 않습니다.**
깃허브 페이지스와 넷리파이 양쪽에서 빼 두었습니다.

만들어는 두었지만 아직 공개하지 않기로 한 것을 여기에 둡니다.


## 지금 들어 있는 것

### 건설 (`civil-construction.html` · `civil-construction.js`)

민사 센터의 세부 쪽으로 만들었습니다.
**공사를 맡기신 쪽**(건축주 · 발주자 · 시행사)에게 말하는 내용입니다.
짓는 쪽(시공사 · 하도급)의 이야기는 다루지 않습니다.

다룬 것 — 하자보수와 잔금의 맞물림, 공기 지연과 지체상금,
추가공사비 청구, 유치권, 시공사 도산과 보증 청구.

**켜기 전에 변호사 검토가 필요합니다.**
특히 유치권 요건, 기성고 산정, 하자와 미시공의 구분은
사안마다 결론이 갈립니다.

띠 사진(`construction-1` · `construction-2`)과 머리말 사진
(`topic-construction`)은 아직 없습니다. 없어도 깨지지 않지만,
띠는 어두운 바탕에 글자만 나옵니다.


## 켜는 법

네 군데를 손보면 됩니다. 저에게 말씀하시면 한 번에 해 드립니다.

1. **파일을 제자리로**

   ```sh
   git mv _draft/civil-construction.html .
   git mv _draft/civil-construction.js .
   ```

2. **민사 센터 배너에 넣기** — `civil-list.js`
   부동산 다음에 아래를 넣고, 그 뒤 항목의 `no` 를 한 칸씩 밉니다.

   ```js
   {
     no:   "02",
     name: "건설",
     en:   "CONSTRUCTION",
     href: "civil-construction.html",
     line: "공사를 맡기신 쪽의 이야기입니다. 하자 · 지연 · 추가공사비 · 유치권. 잔금이 남았을 때가 가장 강합니다."
   },
   ```

3. **첫 페이지 민사 칸 알약에 넣기** — `main.js` 의 `practices`
   민사 항목 `tags` 에서 부동산 바로 다음 줄에 넣습니다.

   ```js
   { name: "건설",     href: "civil-construction.html" },
   ```

4. **사이트맵에 넣기** — `sitemap.xml`
   검색에 잡히려면 이 줄이 있어야 합니다.

   ```xml
   <url>
     <loc>https://yuillawfirm.com/civil-construction.html</loc>
     <lastmod>날짜</lastmod>
     <priority>0.7</priority>
   </url>
   ```


## 이 폴더를 막아둔 곳

| 어디 | 무엇 |
|---|---|
| `.github/workflows/pages.yml` | `--exclude='_draft'` — 깃허브 페이지스로 안 나갑니다 |
| `netlify.toml` | `/_draft/*` → 404 — 넷리파이에서도 안 열립니다 |

넷리파이는 저장소 파일을 그대로 올리는 방식이라
빠뜨리면 주소를 아는 사람이 열어볼 수 있습니다. 그래서 두 곳을 다 막았습니다.
