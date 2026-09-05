# Tejas Bharambe — Light-Theme "Live Playground" Portfolio

An aesthetic, sophisticated light-mode developer portfolio featuring client-side **"Live Playground" Sandboxes** designed to convert complex backend, voice AI, and systems engineering concepts into intuitive, interactive widgets for technical recruiters and hiring managers.

Live on **GitHub Pages**: [https://tejassbharambe.github.io/](https://tejassbharambe.github.io/)

---

## 🎨 Aesthetic & Design System

- **Warm Light-Mode Palette:** Warm off-white foundation (`#faf9f6`), pure white cards (`#ffffff`), soft border outlines, and ambient pastel glow meshes.
- **Pastel Accents:** Sage Emerald (`#a7f3d0`), Soft Sky Blue (`#bae6fd`), Gentle Lavender (`#ddd6fe`), and Warm Amber (`#fde68a`).
- **Typography:** `Plus Jakarta Sans` for clean headings and body, paired with `JetBrains Mono` for code badges, telemetry stats, and numbers.
- **Compact Avatar Placement:** Profile photo positioned alongside the initial summary in the Hero section.

---

## ⚡ Interactive Live Sandbox Widgets (100% Client-Side)

### 1. The Audio Noise-Buster & Stream Simulator (HSBC Greenfield Voice AI)
- **Interactive Dual-Waveform Canvas:** Real-time 60 FPS HTML5 Canvas rendering speech bursts vs silence/noise packets.
- **WebRTC VAD Switch:** Toggling VAD strips background noise, updating metrics in real-time (`ASR Accuracy: 45% -> 92%` and `Hallucinations: -95%`).
- **Traffic Load Slider:** Dynamically simulates 100 to 1,200+ concurrent streams, benchmarking sub-second latency and an RTF of **~0.3x (3x faster than real-time)**.
- **Simulated Voice Session:** Auto-runs a 5-second simulated call session.

### 2. The CPU Core Multiplier (Parallel Fractal Image Compression)
- **Core Dispatcher Grid:** Interactive core grid showing animated worker thread distributions.
- **Core Count Mode:** Toggles between 1 Core (Serial - 10.4s) and All Cores (Parallel Multiprocessing - 5.2s, **50% faster**).
- **Live Benchmark Dispatcher:** Simulates chunk task distribution across CPU cores with animated progress tracks.

### 3. The Neural Scanner (PyTorch Retinal Disease Classification)
- **Fundus Scanner Visualizer:** Simulated laser scan sweep over an ocular fundus medical visualization.
- **Forward-Pass Diagnostics:** Renders model classification probabilities (**95.9% Diabetic Retinopathy Detection**, +31.9% gain over baseline).
- **Confusion Matrix Drawer:** Expandable matrix displaying true/false positive and negative benchmarks.

---

## 🔍 Recruiter Skill Highlighting (`Cmd + K` & Badge Filter)

- Clicking any pastel skill badge or using `Cmd + K` automatically highlights matching experience achievements at HSBC while dimming unrelated bullets.

---

## 📂 Project Structure

```text
.
├── index.html                   # Light-theme layout with 3 interactive dual-pane sandboxes
├── styles.css                   # Warm pastel palette, glassmorphism, responsive grid
├── js/
│   ├── resumeData.js            # Structured resume entity data, skill tags, metrics
│   └── app.js                   # Interactive sandbox engines, canvas loops, Cmd+K filter
├── Tejas_Bharambe_Resume.pdf    # Downloadable PDF resume
├── resume pic new.png           # Profile avatar
└── README.md                    # Project documentation
```

---

## 🚀 Deploying / Updating on GitHub Pages

1. Stage and commit changes:
   ```bash
   git add .
   git commit -m "Build aesthetic light-theme Live Playground portfolio with interactive sandboxes"
   git push -u origin main
   ```
2. Your GitHub Pages site at `https://tejassbharambe.github.io/` will be updated with sub-second load times.
