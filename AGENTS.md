<!-- BEGIN:project-guard -->
# 一間屋民宿官網 — 專案保護規則

**此專案已上線，預設為唯讀。**

| 項目 | 內容 |
|------|------|
| 專案名稱 | 一間屋民宿官網 |
| 路徑 | `C:\Users\aaron\Desktop\yijianwu-website` |
| 正式站 | https://yijianwu-booking.vercel.app |
| GitHub | hamywu2222-cpu/yijianwu-booking |

## 預設行為（保護是什麼）

除非使用者**明確授權**，AI 助理必須：

1. **不修改**此專案任何檔案（含程式、設定、圖片、`.env`）
2. **不執行**會改動此專案的指令（`npm install`、`git commit`、`vercel deploy` 等）
3. **不刪除、搬移、覆寫**任何內容
4. 可**唯讀**參考此專案（讀檔、說明架構、複製做法到新專案）

目的：避免在處理其他專案（例如星空藝素村）時誤改已上線的一間屋官網。

## 如何解除保護、允許修改

使用者須在訊息中**明確**說要改一間屋，例如：

```
【專案：一間屋】允許修改 yijianwu-website
【任務】（具體要做的事）
```

或任一種清楚表述：

- 「改一間屋官網」
- 「修改 yijianwu-website」
- 「一間屋：把訂房文案改成……」

**不夠明確、未點名一間屋的請求 → 仍視為禁止修改。**

## 與其他專案並行時

若同時提到多個專案，以訊息開頭的 `【專案：…】` 為準；未授權的一間屋仍不可動。

## 相關專案（勿混淆）

| 專案 | 路徑 | 說明 |
|------|------|------|
| 星空藝素村（新官網） | `C:\Users\aaron\Desktop\fulongskyartvegan-website` | 獨立 repo，非本專案 |
<!-- END:project-guard -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
