# Google Search Console 操作清單（一間屋・福隆攻略）

目的：讓 Google 更快抓取並收錄旅遊攻略頁，用搜尋流量導向訂房。

正式網域：`https://onehouse.asia`

---

## 一、建立／確認資源（約 5–10 分鐘）

1. 開啟 [Google Search Console](https://search.google.com/search-console)
2. 用管理官網的 Google 帳號登入
3. 若尚未新增資源：
   - 選 **網域** 或 **網址前置字元**
   - 建議用 **網址前置字元**：`https://onehouse.asia`
4. 完成所有權驗證（擇一即可）：
   - **HTML 檔案**（專案若已有 `google*.html` 可沿用）
   - **DNS TXT** 記錄
   - **HTML 標籤** meta verification

驗證成功後才繼續下一步。

---

## 二、送出 Sitemap（必做）

1. 左側選單 → **Sitemaps（Sitemap）**
2. 新增 Sitemap 網址：

   ```
   https://onehouse.asia/sitemap.xml
   ```

3. 送出後狀態應為「成功」
4. 可瀏覽器開啟確認內容含：
   - `https://onehouse.asia/`
   - `https://onehouse.asia/fulong`
   - `https://onehouse.asia/fulong/day-trip`
   - `https://onehouse.asia/fulong/bike`
   - `https://onehouse.asia/fulong/water`
   - `https://onehouse.asia/booking` 等

---

## 三、要求編入索引（攻略頁優先）

對下列網址逐一執行：

| 優先 | 網址 |
|------|------|
| 1 | https://onehouse.asia/fulong |
| 2 | https://onehouse.asia/fulong/day-trip |
| 3 | https://onehouse.asia/fulong/bike |
| 4 | https://onehouse.asia/fulong/water |
| 5 | https://onehouse.asia/ |

步驟：

1. 上方搜尋列貼上網址 → **Enter**
2. 若尚未收錄 → 點 **要求編入索引**
3. 送出後等待數小時～數天（非即時）

可每週檢查一次「網頁索引 → 網頁」有無錯誤。

---

## 四、建議追蹤的關鍵字（搜尋成效）

約 1–2 週後看 **成效（Performance）**：

- 福隆旅遊攻略
- 福隆一日遊
- 舊草嶺隧道
- 福隆海水浴場
- 福隆民宿（首頁／訂房）
- 福隆車站住宿

點進查詢 → 看哪些頁面帶來點擊 → 再加強該文 CTA。

---

## 五、加速曝光的站外動作（建議）

1. **Google 商家檔案** 說明或貼文加連結：`https://onehouse.asia/fulong`
2. **IG／FB** 限動或貼文加同一連結
3. 訂房確認訊息或 LINE 歡迎詞可附「福隆怎麼玩」連結
4. 勿一次大量購買垃圾外連

---

## 六、常見問題

**Q：送出索引後搜尋還是找不到？**  
A：正常。新頁需要時間；先確認 GSC 顯示「已編入索引」，再等排名累積。

**Q：會不會被判重複內容？**  
A：總覽頁 `/fulong` 與子頁（一日遊／單車／玩水）主題拆分、各自標題與主關鍵字不同，並用內部連結互連，屬正常站內架構。

**Q：多久看得到成效？**  
A：索引常 3–14 天；穩定自然流量可能數週～數月，依競爭度而定。

---

## 七、完成檢查清單

- [ ] Search Console 驗證 onehouse.asia
- [ ] 送出 sitemap.xml
- [ ] 要求索引 `/fulong` 與三篇子頁
- [ ] GMB／社群貼出攻略連結
- [ ] 兩週後回看「成效」報表

完成以上即完成「Search Console 端」操作；程式端 sitemap／SEO 已由官網支援。
