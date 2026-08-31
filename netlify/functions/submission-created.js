/**
 * 상담 신청이 접수되면 대표 휴대폰으로 문자를 보낸다.
 *
 * 파일 이름이 submission-created 여야 Netlify 가 폼 제출마다 자동으로 부른다.
 * 별도 설정은 필요 없다.
 *
 * 환경변수 (Netlify → Site configuration → Environment variables)
 *   SOLAPI_KEY     솔라피 API Key
 *   SOLAPI_SECRET  솔라피 API Secret
 *   SMS_FROM       발신번호 (솔라피에 사전 등록된 번호. 예 025674377)
 *   SMS_TO         받을 휴대폰 번호 (예 01012345678)
 *
 * 넷 중 하나라도 없으면 아무 것도 하지 않고 넘어간다.
 * 문자가 실패해도 상담 접수 자체는 이미 끝난 상태이므로 폼은 영향받지 않는다.
 */

const crypto = require("node:crypto");

exports.handler = async (event) => {
  const { SOLAPI_KEY, SOLAPI_SECRET, SMS_FROM, SMS_TO } = process.env;

  if (!SOLAPI_KEY || !SOLAPI_SECRET || !SMS_FROM || !SMS_TO) {
    console.log("문자 발송 설정이 없어 건너뜁니다.");
    return { statusCode: 200, body: "skipped" };
  }

  let data = {};
  try {
    const body = JSON.parse(event.body || "{}");
    data = (body.payload && body.payload.data) || body.data || {};
  } catch (err) {
    console.log("접수 내용을 읽지 못했습니다.", err.message);
    return { statusCode: 200, body: "bad payload" };
  }

  const name = String(data.name || "이름 미기재").slice(0, 20);
  const tel = String(data.tel || "").replace(/\D/g, "");

  /*
    상담 내용은 문자에 담지 않는다.
    사건 내용이 통신망을 거쳐 잠금화면 알림에까지 그대로 남는다.
    누가 언제 신청했는지만 알리고, 내용은 관리화면에서 보게 한다.
  */
  const text =
    "[법무법인 유일] 상담신청 도착\n" +
    `${name} / ${tel || "연락처 미기재"}\n` +
    "내용은 관리화면에서 확인하세요.";

  const date = new Date().toISOString();
  const salt = crypto.randomBytes(32).toString("hex");
  const signature = crypto
    .createHmac("sha256", SOLAPI_SECRET)
    .update(date + salt)
    .digest("hex");

  try {
    const res = await fetch("https://api.solapi.com/messages/v4/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `HMAC-SHA256 apiKey=${SOLAPI_KEY}, date=${date}, ` +
          `salt=${salt}, signature=${signature}`
      },
      body: JSON.stringify({
        message: { to: SMS_TO, from: SMS_FROM, text }
      })
    });

    const out = await res.text();
    console.log("문자 발송", res.status, out.slice(0, 300));
  } catch (err) {
    console.log("문자 발송 실패", err.message);
  }

  return { statusCode: 200, body: "ok" };
};
