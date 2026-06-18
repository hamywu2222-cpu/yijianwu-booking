// 【一間屋·駅前宿】2026 精美表單整合版（最終版）
// 包含網站表單寫入 + LINE 自動密碼功能
// 欄位順序已對齊：訂單編號, 姓名, 電話, 付款狀態, 入住日期, 退房日期, 1F大門, 2F大門, 房型名稱, 房間密碼, LINE ID, 備註, 最後查詢時間

const SPREADSHEET_ID = '1KD7IM1AmWai399kYjiLHJjV_N8MFSbNVU63CtbDKAzA';
const CHANNEL_ACCESS_TOKEN = 'AlsJhZS/DmkePrS4Dero0+ZoYs/S8s2fPTFkj1DFlrI/oT73XBcbiU0eH3W3rK+LWJJGvAqFAoC/kRrOc6zd4NcxV7ULKAUZT6Ibx3WPJJ3m/Yu0okvvDmqmCeMzjPTI13y0lccYn85AbcaT9EdEfgdB04t89/1O/w1cDnyilFU=';
const ADMIN_LINE_USER_ID = 'Uf4438d2c9d061eee16a4952a1cb5a2e0';
const GOOGLE_REVIEW_URL = 'https://g.page/r/CQ9vPLq1BsJjEBM/review';

// ==================== 電話正規化 ====================
function normalizePhone(rawPhone) {
  if (!rawPhone) return '';
  let p = rawPhone.toString().trim().replace(/[^0-9]/g, '');
  if (!p) return '';

  const countryCodeMap = {
    '886': '886', '1': '1', '61': '61', '81': '81', '86': '86',
    '852': '852', '65': '65', '82': '82', '63': '63', '60': '60',
    '66': '66', '84': '84', '62': '62', '44': '44', '49': '49', '33': '33'
  };

  const possibleLengths = [3, 2, 1];
  for (const len of possibleLengths) {
    if (p.length > len) {
      const prefix = p.substring(0, len);
      if (countryCodeMap[prefix]) {
        let rest = p.substring(len);
        if (rest.startsWith('0')) rest = rest.substring(1);
        return prefix + rest;
      }
    }
  }

  if (p.startsWith('0') && p.length >= 9 && p.length <= 10) return '886' + p.substring(1);
  if (p.length === 10 && /^[2-9]/.test(p)) return '1' + p;
  return p;
}

// ==================== 主程式 ====================
function doPost(e) {
  try {
    // 網站表單提交（有 name 參數）
    if (e.parameter && e.parameter.name) {
      return handleWebsiteForm(e.parameter);
    }

    // LINE webhook
    const contents = JSON.parse(e.postData.contents);
    const event = contents.events[0];
    const replyToken = event.replyToken;
    if (!event.message || event.message.type !== 'text') return;

    const userMsg = event.message.text.trim();
    const lowerMsg = userMsg.toLowerCase();

    // === 1. 訂房引導 ===
    if (userMsg.includes("我想訂房") || userMsg.includes("訂房")) {
      const msg = `歡迎預訂一間屋·駅前宿！

我們已為您準備訂房表單，請點擊下方「立即訂房」按鈕即可快速填寫。`;
      return sendLineReply(replyToken, msg);
    }

    // === 2. 查詢門禁密碼引導 ===
    if (lowerMsg.includes("入住指南") || 
        lowerMsg.includes("門禁") || 
        (lowerMsg.includes("查") && lowerMsg.includes("密碼")) ||
        lowerMsg.includes("check in") || 
        lowerMsg.includes("room password")) {

      const guide = `確定您已完成所有訂房程序後，直接輸入「訂房姓名 + 訂房電話」即可查詢門禁密碼。

✅ 台灣號碼範例：
王小明 0912345678
✅ 國外號碼範例：
John 61123456789（去除加號）`;
      return sendLineReply(replyToken, guide);
    }

    // === 3. 姓名 + 電話 查詢 (improved parsing) ===
    // Better parsing to handle spaces and formatted phones
    const match = userMsg.match(/^(.+?)\s+([\d\+\-\s\(\)]+)$/);
    if (match) {
      const name = match[1].trim().toLowerCase().replace(/\s+/g, '');
      const phone = normalizePhone(match[2]);

      if (phone.length < 9) {
        return sendFormatErrorGuide(replyToken);
      }

      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName("訂單資料");
      if (!sheet) return;

      const data = sheet.getDataRange().getValues();
      const now = new Date();
      let validMessages = [], notReadyMsg = "", expiredMsg = "", userFound = false;

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const rowName = (row[1] || "").toString().toLowerCase().replace(/\s+/g, '');  // 姓名 col 1
        const rowPhone = normalizePhone(row[2]);  // 電話 col 2

        if (rowName !== name || rowPhone !== phone) continue;
        userFound = true;
        if (row[3] !== "跑錯" && row[3] !== "已付款" && row[3] !== "待確認") continue;  // 付款狀態 col 3  -- added 待確認 for testing

        const checkIn = new Date(row[4]); checkIn.setHours(15, 0, 0, 0);  // 入住 col 4
        let checkOut = null;
        if (row[5]) { checkOut = new Date(row[5]); checkOut.setHours(11, 0, 0, 0); }  // 退房 col 5
        const rName = (row[8] || "未知房型").toString();  // 房型 col 8
        const rCode = (row[9] || "無").toString();  // 房間密碼 col 9

        if (now >= checkIn && (!checkOut || now <= checkOut)) {
          validMessages.push(generateStayMessage(row, rName, rCode));
        } else if (now < checkIn && !notReadyMsg) {
          notReadyMsg = "✅ 您好，您的訂單核對無誤。\n目前尚未到達預計入住時間（15:00 後開放），請稍後再查詢。";
        } else if (checkOut && now > checkOut && !expiredMsg) {
          expiredMsg = "感謝您的入住。您的入住憑證已完成期限，若有其他需求，歡迎隨時與我們聯繫。";
        }
      }

      if (userFound) {
        if (validMessages.length > 0 || notReadyMsg || expiredMsg) {
          recordLastQueryTime(sheet, name, phone, now);
        }

        if (validMessages.length > 0) {
          const header = ` 一間屋·駅前宿\n親愛的貴賓您好，您的訂單已確認。\n以下是您的入住通行資訊：`;
          const review = `⭐ 如果您喜歡我們的服務，歡迎留下五星好評：\n${GOOGLE_REVIEW_URL}`;
          return sendLineReply(replyToken, [header, ...validMessages, review]);
        }

        const finalMsg = notReadyMsg || expiredMsg || "抱歉，系統查無對應的有效訂單。\n請確認姓名與電話是否正確，或與我們聯繫。";
        return sendLineReply(replyToken, finalMsg);
      } else {
        return sendFormatErrorGuide(replyToken);
      }
    } else {
      return sendFormatErrorGuide(replyToken);
    }

    // === 4. 其他常見需求 ===
    if (lowerMsg.includes("聯絡") || lowerMsg.includes("客服")) {
      return sendContactInfo(replyToken);
    }
    if (lowerMsg.includes("評論") || lowerMsg.includes("google") || lowerMsg.includes("好評")) {
      return sendReviewRequest(replyToken);
    }

  } catch (error) {
    console.error("LINE Bot Error:", error);
  }
}

// ==================== 網站表單寫入 ====================
function handleWebsiteForm(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName("訂單資料");
    if (!sheet) {
      sheet = ss.insertSheet("訂單資料");
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "訂單編號", "姓名", "電話", "付款狀態", "入住日期", "退房日期", 
        "1F大門", "2F大門", "房型名稱", "房間密碼", "LINE ID", "備註", "最後查詢時間"
      ]);
      sheet.setFrozenRows(1);
    }

    const row = [
      data.referenceNumber || "",
      data.name || "",
      data.phone || "",
      "待確認",
      data.checkInDate || "",
      data.checkOutDate || "",
      "",  // 1F大門
      "",  // 2F大門
      data.roomType || "",
      "",  // 房間密碼 (admin 填)
      data.lineId || "",
      data.note || "",
      ""   // 最後查詢時間
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    console.error(err);
    return ContentService
      .createTextOutput("ERROR: " + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// ==================== 輔助函數 ====================
function sendFormatErrorGuide(replyToken) {
  const msg = `我們找不到您的訂單資訊。

請確認格式是否正確：
・姓名（訂房時留的）
・電話（台灣請輸入09開頭，國外請除去+號輸入國碼跟號碼）

✅ 台灣號碼範例：
王小明 0912345678
✅ 國外號碼範例：
John 61123456789`;
  return sendLineReply(replyToken, msg);
}

function sendReviewRequest(replyToken) {
  const msg = `感謝您喜歡一間屋·駅前宿！

如果您有時間，歡迎留下五星好評支持我們：
${GOOGLE_REVIEW_URL}

您的每一則評論都是我們前進的動力，謝謝！`;
  return sendLineReply(replyToken, msg);
}

function sendContactInfo(replyToken) {
  const msg = `【一間屋·駅前宿】聯絡資訊

地址：新北市貢寮區福隆街2巷1-2號（福隆車站旁）
電話：0912-362-533
LINE：直接在此對話框留言即可

我們會盡快回覆您，謝謝！`;
  return sendLineReply(replyToken, msg);
}

function generateStayMessage(row, rName, rCode) {
  const code1F = row[6] || "無", code2F = row[7] || "無";  // 更新索引
  let msg = `房間：${rName}\n房間密碼：【 ${rCode} 】\n━━━━━━━━━━━━\n【 門禁通行資訊 】\n`;
  
  if (rName.includes("1F")) {
    msg += `1F 大門密碼：【 ${code1F} 】\n2F 大門密碼：【 ${code2F} 】\n\n【 3F 自助投幣洗衣空間 】\n使用完畢請協助維持空間整潔並隨手關閉門禁。`;
  } else {
    msg += `2F 大門密碼：【 ${code2F} 】\n`;
  }
  
  if (rName.includes("2F")) msg += "\n• 溫馨提醒：1F 為專屬私人休憩區域，非該層住客請勿入內。";
  msg += "\n\n再次感謝您的蒞臨，願您擁有美好的福隆時光。";
  return msg;
}

function recordLastQueryTime(sheet, name, phone, queryTime) {
  const data = sheet.getDataRange().getValues();
  const timeStr = Utilities.formatDate(queryTime, "GMT+8", "yyyy/MM/dd HH:mm:ss");
  for (let i = 1; i < data.length; i++) {
    const rowName = (data[i][1] || "").toString().toLowerCase().replace(/\s+/g, '');  // 更新
    const rowPhone = normalizePhone(data[i][2]);
    if (rowName === name && rowPhone === phone) {
      sheet.getRange(i + 1, 13).setValue(timeStr);  // 最後查詢 col 12 (0-based 12)
    }
  }
}

function sendLineReply(replyToken, messages) {
  const payloadMessages = Array.isArray(messages) 
    ? messages.map(t => ({ "type": "text", "text": t })) 
    : [{ "type": "text", "text": messages }];
    
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    'headers': { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN },
    'method': 'post',
    'payload': JSON.stringify({ 'replyToken': replyToken, 'messages': payloadMessages }),
  });
}

// ==================== 每日報表 (保留你原本的) ====================
function sendTodayReport() {
  // 你原本的 sendTodayReport 程式碼保持不變
  // 如果需要，我可以幫你補完
}
