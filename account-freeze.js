/* =====================================================================
   계좌 지급정지 랜딩 (account-freeze.html)

   main.js 를 불러오지 않습니다. 그쪽은 홈페이지 첫 화면의 칸들을
   전제로 짜여 있어서, 이 쪽에 필요한 것(상담폼 · 체크리스트)만
   따로 적었습니다. 받는 곳(formsubmit)은 main.js 와 같습니다.
===================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------
     ★ 신청서를 받는 곳 ★
     main.js 의 FORM_ENDPOINT 와 같은 주소입니다. 그쪽을 바꾸시면
     여기도 같이 바꾸십시오.
  --------------------------------------------------------------- */
  var FORM_ENDPOINT = "https://formsubmit.co/0e6209c0cf4f12db661fc73a5966e290";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };


  /* ---------- 어디에서 오셨는지 ----------
     main.js 의 adEntry 와 같은 방식, 같은 저장 이름(yuil.entry)을 써서
     홈페이지로 넘어가셔도 첫 유입이 유지됩니다. */
  var entry = (function () {
    var KEY = "yuil.entry";
    var NAMES = {
      naver: "네이버", cafe: "네이버 카페", blog: "블로그",
      kakao: "카카오", google: "구글", daum: "다음",
      instagram: "인스타그램", insta: "인스타그램", youtube: "유튜브"
    };
    try {
      var kept = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (kept && kept.label) return kept;
    } catch (e) {}

    var q = new URLSearchParams(location.search);
    var pick = function (k) { return (q.get(k) || "").trim().slice(0, 60); };
    var src = pick("from") || pick("utm_source");
    var medium = pick("utm_medium");
    var camp = pick("utm_campaign") || pick("utm_content");
    var label;

    if (src) {
      var low = src.toLowerCase();
      var head = low.split(/[-_.]/)[0];
      label = NAMES[low] || (NAMES[head] ? NAMES[head] + " · " + src : src);
      if (camp) label += " · " + camp;
      if (medium) label += " (" + medium + ")";
    } else {
      var from = "";
      try {
        if (document.referrer) {
          var h = new URL(document.referrer).hostname;
          if (h && h !== location.hostname) from = h;
        }
      } catch (e) {}
      label = from ? from + " 에서 넘어옴" : "표시 없음";
    }

    var rec = { label: label, page: location.pathname.replace(/^\/+/, "") || "account-freeze.html", tag: src };
    try { sessionStorage.setItem(KEY, JSON.stringify(rec)); } catch (e) {}

    /* 꼬리표는 주소창에서 걷어낸다(look 같은 다른 값은 남긴다) */
    if (src || medium || camp) {
      ["from", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
        .forEach(function (k) { q.delete(k); });
      var rest = q.toString();
      try { history.replaceState(null, "", location.pathname + (rest ? "?" + rest : "") + location.hash); } catch (e) {}
    }
    return rec;
  })();


  /* ---------- 셀프 체크 ---------- */
  var checks = $$("#check input[type=checkbox]");
  var out = $("#checkOut");
  var num = $("#checkNum");
  if (checks.length && out && num) {
    var update = function () {
      var n = checks.filter(function (c) { return c.checked; }).length;
      num.textContent = n ? n + "개" : "하나라도";
      out.classList.toggle("is-on", n > 0);
    };
    checks.forEach(function (c) { c.addEventListener("change", update); });
  }


  /* ---------- 상담 신청 ---------- */
  var form = $("#form");
  var status = $("#formStatus");
  if (!form || !status) return;

  var say = function (msg, ok) {
    status.textContent = msg;
    status.classList.toggle("is-ok", !!ok);
  };
  var hidden = function (name, value) {
    var i = document.createElement("input");
    i.type = "hidden"; i.name = name; i.value = value;
    form.appendChild(i);
  };

  form.setAttribute("action", FORM_ENDPOINT);
  hidden("_next", new URL("thanks.html", location.href).href);
  hidden("_subject", "지급정지 랜딩 상담신청" + (entry.tag ? " — " + entry.label : ""));
  hidden("_template", "table");
  hidden("_captcha", "false");
  hidden("유입경로", entry.label);
  hidden("처음 연 쪽", entry.page);

  /* 오늘 이후 날짜는 고를 수 없게 */
  var date = $("#fDate");
  if (date) {
    var d = new Date();
    date.max = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  form.addEventListener("submit", function (event) {
    $$(".field.is-bad", form).forEach(function (f) { f.classList.remove("is-bad"); });

    var name = $("#fName");
    var tel = $("#fTel");
    var agree = $("#fAgree");

    var stop = function (msg, field) {
      event.preventDefault();
      say(msg);
      if (field.closest(".field")) field.closest(".field").classList.add("is-bad");
      field.focus();
    };

    if (name.value.trim().length < 2) return stop("성함을 입력해 주세요.", name);
    var digits = tel.value.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 11) return stop("연락처를 숫자 9~11자리로 입력해 주세요.", tel);
    if (!agree.checked) return stop("개인정보 수집·이용에 동의해 주세요.", agree);

    say("보내는 중입니다…", true);
  });
})();
