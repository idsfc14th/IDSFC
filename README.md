# IDSFC 2026 — Static Website

A no-build, static HTML/CSS/JavaScript recreation scaffold for IDSFC 2026, designed for GitHub Pages. The site reads its visible content from `config/site.json`; images and documents live under `assets/`.

> **Content and visual fidelity note:** The original Wix site could not be fully inspected or downloaded in this execution environment. This implementation uses public event details published by YunTech and Taiwan's National Science and Technology Council. The generated hero artwork and logo are placeholders, not original IDSFC branding. Before treating this as a faithful 1:1 reproduction, compare it against the live Wix site and replace placeholders with assets you have permission to reuse.

## Directory structure

```text
.
├── index.html
├── config/
│   └── site.json            # Centralized text, links, images, dates and contact info
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   ├── images/              # Hero and workshop images (placeholders included)
│   ├── logos/               # Logo (placeholder included)
│   ├── documents/           # Put downloadable PDFs and other files here
│   └── icons/
└── .github/workflows/pages.yml
```

## Local preview

Do not open `index.html` directly with `file://`, because browsers may block `fetch()` for the JSON configuration. From the project directory run one of:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

Or use the Live Server extension in VS Code.

## Deploy to GitHub Pages

1. Create a GitHub repository and upload/commit the contents of this folder to the repository's `main` branch.
2. Open **Settings → Pages** in the repository.
3. Set the build/deployment source to **GitHub Actions**.
4. Push to `main`. The workflow in `.github/workflows/pages.yml` deploys the repository root as a static site.
5. Check the workflow run and open the published Pages URL.

The app resolves the JSON configuration relative to the JavaScript file, and resource paths are relative rather than rooted at `/`, so it supports project URLs such as `https://USERNAME.github.io/REPOSITORY/`.

## Common updates

### Replace the homepage hero artwork

1. Add the licensed image to `assets/images/`, for example `conference-hero.jpg`.
2. In `config/site.json`, change `site.heroImage` to `assets/images/conference-hero.jpg`. The renderer reads this setting automatically. Do not remove attribution required by the asset license.

### Replace the logo

Place the replacement logo under `assets/logos/` and update `site.logo` in `config/site.json`. Keep the image aspect ratio square where possible.

### Change the submission button URL

Edit `sections.submission.buttons` in `config/site.json`, then commit and push the change. For example:

```json
{
  "label": {
    "en": "Open abstract submission form",
    "zh-TW": "開啟摘要投稿表單"
  },
  "href": "https://forms.gle/MphCJyUNFyecjuFT8",
  "external": true
}
```

### Add a PDF document

1. Copy the PDF into `assets/documents/`, e.g. `author-guidelines.pdf`.
2. Add an item under `sections.announcements.items` with `"href": "assets/documents/author-guidelines.pdf"`.
3. Commit and push. The link will open the PDF in the browser where supported.

### Update an announcement

Edit `sections.announcements.items` in `config/site.json`. Each item supports `title`, `description`, and `href`; `en` and `zh-TW` values control language display.

### Update bilingual text

For translatable fields, edit both `"en"` and `"zh-TW"` values. The language toggle saves the selected language in local storage. For items that are not yet translated, English is used as the fallback.

### Publish an update

```bash
git add .
git commit -m "Update IDSFC website content"
git push origin main
```

GitHub Actions deploys the updated static files automatically.

## Content source notes

The following public sources were used to seed event information:

- YunTech official event announcement: https://www.yuntech.edu.tw/index.php/2019-04-10-08-06-20/2019-04-10-08-06-21/2019-04-10-08-06-56/2019-04-10-08-06-58/item/13977-2026
- National Science and Technology Council announcement: https://www.nstc.gov.tw/folksonomy/detail/24903f84-ee2e-44a8-8fea-dac26592a320?l=CH
- YunTech English announcement: https://eng.yuntech.edu.tw/index.php/2019-04-10-08-06-20/item/13617-design-beyond-borders-13th-international-design-research-forum-integrated-design-workshop-idsfc-2026
- Original Wix website: https://idsfc2026.wixsite.com/home

## Known gaps / manual follow-up required

- Original Wix page-by-page layout, exact typography, colors, mobile breakpoints, and every link could not be verified here.
- Original Wix images, logos, PDFs, workshop photos, and other media have not been downloaded. The included SVG illustrations are explicit placeholders.
- A public announcement links to the abstract Google Form; the site should be checked to confirm whether this is still the intended active submission endpoint.
- A `call-for-papers.pdf` link is optional and will only work after you place the actual authorized PDF in `assets/documents/`.
- No browser automation or live GitHub Pages deployment was available during this run. Test the deployed URL and use browser devtools to verify all assets and links before announcing the site as complete.
- This is a static website. Any registration, submission, or payment flow remains on the linked external service; this website does not collect or store submissions.
