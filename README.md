# IDSFC 2026 靜態網站

換圖片時，做兩件事：把圖檔放到對應資料夾，再把 `config/site.json` 裡的路徑改成那個檔名。頁面上看到的圖，都是跟著這份設定走。

## 整體結構

```text
頁面由上到下
│
├── 瀏覽器分頁小圖（favicon）
├── 頁首 Logo
├── 首頁主視覺（Hero 背景）
├── 工作營圖片
└── 其餘文字、按鈕、日期、公告    ← 改 config/site.json 的文字，不是圖片
```

```text
idsfc2026-static/
├── index.html                         分頁小圖的路徑寫在這裡
├── config/
│   └── site.json                      Logo、主視覺、工作營圖的路徑寫在這裡
└── assets/
    ├── logos/                         放 Logo、分頁小圖
    │   └── idsfc-logo.svg             目前使用的 Logo
    ├── images/                        放主視覺、工作營照片
    │   ├── hero-placeholder.svg       目前使用的首頁主視覺
    │   └── workshop-placeholder.svg   目前使用的工作營圖片
    ├── documents/                     放 PDF 等可下載檔案
    ├── css/
    ├── js/
    └── icons/
```

## 圖片對照

| 頁面上的位置 | 圖檔放這裡 | 要改的設定 |
| --- | --- | --- |
| 頁首 Logo | `assets/logos/` | `config/site.json` → `site.logo` |
| 瀏覽器分頁小圖 | `assets/logos/` | `index.html` 第 9 行 `href` |
| 首頁主視覺 | `assets/images/` | `config/site.json` → `site.heroImage` |
| 工作營圖片 | `assets/images/` | `config/site.json` → `sections.workshop.image` |

路徑一律從網站根目錄寫起，例如 `assets/images/hero.jpg`。不要寫成 `/assets/...`，也不要寫電腦上的完整路徑。

## 換某一張圖

1. 把新圖放進上表的資料夾。檔名用英文，例如 `hero.jpg`、`logo.png`。
2. 打開上表「要改的設定」，把路徑改成新檔名。
3. 檔名如果跟現在完全一樣，直接覆蓋原檔即可，不必改設定。

### 頁首 Logo

圖檔放 `assets/logos/`。在 `config/site.json` 改 `site.logo`：

```json
"logo": "assets/logos/idsfc-logo.png"
```

Logo 以正方形為宜。頁首會把它顯示成約 44×44。

### 瀏覽器分頁小圖

圖檔也放 `assets/logos/`。這張不讀 `site.json`，要改 `index.html`：

```html
<link rel="icon" href="assets/logos/idsfc-logo.png" type="image/png">
```

若沿用 `assets/logos/idsfc-logo.svg` 這個檔名，覆蓋原檔即可，不用改這一行。`type` 要跟副檔名一致：SVG 用 `image/svg+xml`，PNG 用 `image/png`。

### 首頁主視覺

圖檔放 `assets/images/`。在 `config/site.json` 改 `site.heroImage`：

```json
"heroImage": "assets/images/hero.jpg"
```

這張是首屏背景，會裁成鋪滿。橫向照片比較合適。

### 工作營圖片

圖檔放 `assets/images/`。在 `config/site.json` 改 `sections.workshop.image`：

```json
"image": "assets/images/workshop.jpg"
```

旁邊的說明文字改同一段的 `imageAlt`，`en` 與 `zh-TW` 都要寫。

## 本機預覽

不要用檔案總管直接打開 `index.html`。在專案根目錄執行：

```bash
python3 -m http.server 8000
```

然後打開 `http://localhost:8000`。換過圖之後重新整理頁面。

## 發佈更新

```bash
git add .
git commit -m "Update IDSFC website images"
git push origin main
```

推上 `main` 之後，GitHub Actions 會把整站發佈到 GitHub Pages。
