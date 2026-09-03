# Tejas Bharambe — Interactive Developer Portfolio

A modern, high-contrast, sub-second latency interactive developer portfolio tailored specifically for technical recruiters and hiring managers. Built with pure semantic HTML5, modern CSS3 (Custom Properties & Glassmorphism), and vanilla ES6+ JavaScript.

Live on **GitHub Pages**: Automatically deployed via GitHub Actions.

---

## 🚀 Key Highlights & Architectural Features

- **Production Impact Metrics Front-and-Center:** Highlights key achievements ($5M+/year potential savings at HSBC, 1,200+ concurrent audio streams, 92% ASR transcription accuracy via WebRTC VAD, RTF ~0.3).
- **Interactive Command Palette (`Cmd+K` / `Ctrl+K`):** Keyboard-driven instant search over technical skills, project architectures, work experience, and quick actions (copy email/phone).
- **Categorized Tech Stack Badges:** Filterable cloud across Languages, Backend & Streaming, Cloud/Infra, Core CS, and Tools with active highlight feedback.
- **Architectural Deep-Dive Drawers:** Expandable system design breakdowns for real-time WebSockets/Kafka microservices, CPU-parallelized fractal compression, and ResNet medical classifiers.
- **One-Click Recruiter Actions:** Click-to-copy buttons for email and phone with toast feedback, direct GitHub/LinkedIn profiles, and one-click resume download.
- **SEO & ATS Optimizations:** Complete Open Graph, Twitter Cards, and structured `JSON-LD` (`schema.org/Person`) metadata.

---

## 📂 Project Structure

```text
.
├── index.html                   # Semantic markup, SEO metadata, JSON-LD structured data
├── styles.css                   # Modern dark-mode palette, glassmorphism, responsive styles
├── js/
│   ├── resumeData.js            # Structured resume entity data extracted from main.md
│   └── app.js                   # Interactive logic, Command Palette, filters, modals, copy tools
├── Tejas_Bharambe_Resume.pdf    # PDF resume file served for download
├── main.md                      # Source resume markdown file
└── README.md                    # Documentation
```

---

## 🔄 Updating Resume Content

If you update your resume:
1. Update `main.md` with any new achievements or roles.
2. Update the structured entities in [`js/resumeData.js`](file:///d:/VsCode/Profile_github_Page/js/resumeData.js) (metrics, experience bullets, deep dives, skills). The portfolio automatically renders changes from this file!

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/TejassBharambe/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Every push to the `main` branch will automatically trigger `.github/workflows/deploy.yml` and publish your site!
