# IDSFC 2026 靜態網站

換圖片時，用下面的檔名覆蓋原檔，然後 `add`、`commit`、`push`。不用改 `config/site.json`，也不用改 `index.html`。

## 整體結構

```text
頁面由上到下
│
├── 頁首 Logo、瀏覽器分頁小圖     assets/logos/idsfc-logo.svg
├── 首頁主視覺（Hero 背景）        assets/images/hero-placeholder.svg
└── 工作營圖片                     assets/images/workshop-placeholder.svg
```

```text
idsfc2026-static/
└── assets/
    ├── logos/
    │   └── idsfc-logo.svg             頁首 Logo，也是分頁小圖
    └── images/
        ├── hero-placeholder.svg       首頁主視覺
        └── workshop-placeholder.svg   工作營圖片
```

## 圖片怎麼命名、放哪裡

檔名要完全一樣，包含 `.svg`。用新圖覆蓋原檔。

| 頁面上的位置 | 檔名 | 放到這個資料夾 |
| --- | --- | --- |
| 頁首 Logo、分頁小圖 | `idsfc-logo.svg` | `assets/logos/` |
| 首頁主視覺 | `hero-placeholder.svg` | `assets/images/` |
| 工作營圖片 | `workshop-placeholder.svg` | `assets/images/` |

Logo 用正方形。主視覺用橫圖。工作營圖片用 4:3。

## 覆蓋後上傳

在專案資料夾執行：

```powershell
git add .
git commit -m "Update IDSFC website images"
git push origin main
```

他就會自己更新網站了

## 本機預覽

直接點index.html兩下就出現了


## 初次設置帳號

使用 `setup-git.bat`。

1. 安裝 [Git for Windows](https://git-scm.com/download/win)。
2. 打開 [https://code.visualstudio.com/](https://code.visualstudio.com/)，下載並安裝 VS Code。
3. 把 `setup-git.bat` 放到要存放專案的地方，例如桌面。
4. 對 `setup-git.bat` 按兩下。

它會依序做完：

1. 設定使用者 `idsfc14th`、信箱 `IDSFC14th@gmail.com`。
2. 若旁邊還沒有專案，下載到 `IDSFC` 資料夾。
3. 進入該資料夾，拉下最新程式。

視窗會顯示資料夾路徑、使用者名稱和信箱。確認後按任意鍵關閉。之後再按兩下，會再拉一次最新程式。

接著打開 VS Code，選 **File → Open Folder**，選新的 `IDSFC` 資料夾。 