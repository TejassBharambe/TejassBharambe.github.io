// app.js - Light-Theme "Live Playground" Engine, Interactive Sandboxes & Recruiter Filtering

document.addEventListener('DOMContentLoaded', () => {
  initHeroAndStats();
  initSkillsCloud();
  initExperience();
  initEducationAndLeadership();
  initCommandPalette();
  initScrollSpy();
  initToast();

  // Initialize the 3 Interactive Sandbox Widgets
  initVoiceAISandbox();
  initFractalSandbox();
  initRetinalSandbox();
});

// Helper: Auto-bold metric strings
function highlightMetrics(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="metric-highlight">$1</strong>');
}

// 1. Hero & Metrics
function initHeroAndStats() {
  const p = RESUME_DATA.personal;
  document.getElementById('hero-name').innerText = p.name;
  document.getElementById('hero-role-title').innerText = `${p.role} — ${p.subRole}`;
  document.getElementById('hero-bio').innerHTML = highlightMetrics(p.bio);

  const ghLink = document.getElementById('github-cta');
  if (ghLink) ghLink.href = p.github;

  const liLink = document.getElementById('linkedin-cta');
  if (liLink) liLink.href = p.linkedin;

  const resumeCta = document.getElementById('resume-download-btn');
  if (resumeCta) resumeCta.href = p.resumeDownloadUrl;

  // Render Stat Cards
  const statsContainer = document.getElementById('stat-cards-container');
  if (statsContainer) {
    const badgeThemes = ['badge-sky', 'badge-emerald', 'badge-amber', 'badge-lavender'];
    statsContainer.innerHTML = RESUME_DATA.metrics.map((m, idx) => `
      <div class="stat-card">
        <span class="stat-card-badge ${badgeThemes[idx % badgeThemes.length]}">${m.badge}</span>
        <div class="stat-val">${m.value}</div>
        <div class="stat-label">${m.label}</div>
        <div class="stat-desc">${m.note}</div>
      </div>
    `).join('');
  }
}

// 2. Skills Cloud & Interactive Recruiter Filtering
let activeSkillFilter = null;

function initSkillsCloud() {
  const filterWrap = document.getElementById('skills-filter-container');
  const gridWrap = document.getElementById('skills-grid-container');
  if (!gridWrap || !filterWrap) return;

  const categories = ["All", ...RESUME_DATA.skillsCategories.map(c => c.category)];
  filterWrap.innerHTML = categories.map((cat, idx) => `
    <button class="filter-pill ${idx === 0 ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');

  function renderCategoryCards(selectedCat = "All") {
    const list = selectedCat === "All"
      ? RESUME_DATA.skillsCategories
      : RESUME_DATA.skillsCategories.filter(c => c.category === selectedCat);

    gridWrap.innerHTML = list.map(c => `
      <div class="skill-category-card">
        <div class="skill-cat-title">
          <span>${c.category}</span>
          <span style="font-size:0.75rem; font-family:var(--font-mono); color:var(--text-muted);">${c.skills.length}</span>
        </div>
        <div class="badge-cloud">
          ${c.skills.map(s => `
            <span class="skill-badge ${c.colorClass} ${activeSkillFilter === s ? 'active-filter' : ''}" data-skill="${s}">${s}</span>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Attach click listeners to individual skill badges to filter resume bullets & sandboxes
    gridWrap.querySelectorAll('.skill-badge').forEach(badge => {
      badge.addEventListener('click', () => {
        toggleSkillFilter(badge.dataset.skill);
      });
    });
  }

  renderCategoryCards();

  filterWrap.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-pill')) {
      filterWrap.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderCategoryCards(e.target.dataset.cat);
    }
  });
}

// Filter resume experience and projects by skill
function toggleSkillFilter(skillName) {
  if (activeSkillFilter === skillName) {
    activeSkillFilter = null;
    showToast(`Filter cleared`);
  } else {
    activeSkillFilter = skillName;
    showToast(`Filtering by "${skillName}"`);
  }

  // Update badge UI highlights
  document.querySelectorAll('.skill-badge').forEach(b => {
    b.classList.toggle('active-filter', b.dataset.skill === activeSkillFilter);
  });

  // Highlight/dim experience bullet points
  const bullets = document.querySelectorAll('.experience-bullet');
  bullets.forEach(item => {
    if (!activeSkillFilter) {
      item.classList.remove('highlighted-skill', 'dimmed');
    } else {
      const tags = (item.dataset.tags || '').split(',');
      const matches = tags.some(t => t.trim().toLowerCase() === activeSkillFilter.toLowerCase());
      if (matches) {
        item.classList.add('highlighted-skill');
        item.classList.remove('dimmed');
      } else {
        item.classList.remove('highlighted-skill');
        item.classList.add('dimmed');
      }
    }
  });

  // Highlight/dim sandbox project cards
  const cards = document.querySelectorAll('.sandbox-card');
  cards.forEach(card => {
    if (!activeSkillFilter) {
      card.classList.remove('highlighted-project', 'dimmed');
    } else {
      const skills = (card.dataset.skills || '').split(',');
      const matches = skills.some(s => s.trim().toLowerCase() === activeSkillFilter.toLowerCase());
      if (matches) {
        card.classList.add('highlighted-project');
        card.classList.remove('dimmed');
      } else {
        card.classList.remove('highlighted-project');
        card.classList.add('dimmed');
      }
    }
  });
}

// 3. Render Experience Timeline
function initExperience() {
  const container = document.getElementById('experience-timeline');
  if (!container) return;

  container.innerHTML = RESUME_DATA.experience.map(exp => `
    <div class="timeline-item" id="exp-${exp.id}">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <div class="role-title">${exp.role}</div>
          <div class="role-period">${exp.period}</div>
        </div>
        <div class="company-line">
          <span class="company-badge">${exp.company}</span> • <span>${exp.location}</span>
        </div>
        <ul class="bullet-list">
          ${exp.highlights.map(h => `
            <li class="bullet-item experience-bullet" data-tags="${h.tags.join(',')}">
              ${highlightMetrics(h.text)}
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

// 4. Render Education and Leadership
function initEducationAndLeadership() {
  const eduContainer = document.getElementById('education-card');
  const leadContainer = document.getElementById('leadership-card');

  if (eduContainer && RESUME_DATA.education[0]) {
    const e = RESUME_DATA.education[0];
    eduContainer.innerHTML = `
      <div class="card-title">${e.degree}</div>
      <div class="card-sub">${e.institution} • ${e.period}</div>
      <div style="display:inline-block; font-family:var(--font-mono); font-weight:700; font-size:0.85rem; color:#0369a1; background:#f0f9ff; padding:2px 8px; border-radius:4px; margin-bottom:0.75rem;">${e.score}</div>
      <p class="card-detail">${e.details}</p>
    `;
  }

  if (leadContainer && RESUME_DATA.leadership[0]) {
    const l = RESUME_DATA.leadership[0];
    leadContainer.innerHTML = `
      <div class="card-title">${l.role}</div>
      <div class="card-sub">${l.organization}</div>
      <p class="card-detail">${highlightMetrics(l.details)}</p>
    `;
  }
}

// ============================================================================
// 5. INTERACTIVE SANDBOX WIDGET 1: Voice AI Audio Noise-Buster & Stream Simulator
// ============================================================================
function initVoiceAISandbox() {
  const canvas = document.getElementById('waveform-canvas');
  const vadToggle = document.getElementById('vad-toggle');
  const trafficSlider = document.getElementById('traffic-slider');
  const trafficCountLabel = document.getElementById('traffic-count-label');
  const accuracyLabel = document.getElementById('telemetry-accuracy');
  const hallucinationsLabel = document.getElementById('telemetry-hallucinations');
  const latencyLabel = document.getElementById('telemetry-latency');
  const demoBtn = document.getElementById('voice-demo-btn');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let vadActive = true;
  let streamCount = 1200;
  let animationFrameId;
  let phase = 0;
  let demoActive = false;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
    canvas.height = 100 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function drawWaveform() {
    const width = canvas.width / window.devicePixelRatio;
    const height = 100;
    ctx.clearRect(0, 0, width, height);

    // Draw center baseline
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Waveform simulation
    const points = 120;
    const step = width / points;

    ctx.beginPath();
    ctx.lineWidth = 2.5;

    for (let i = 0; i <= points; i++) {
      const x = i * step;
      // Synthesize audio chunk: alternating speech packets and silent/noise intervals
      const isSpeechPacket = Math.sin(i * 0.15 + phase * 0.05) > -0.2;
      let amp = 0;

      if (isSpeechPacket) {
        // Active human speech frequency burst
        amp = Math.sin(i * 0.4 + phase * 0.2) * 28 + Math.sin(i * 0.8 + phase * 0.1) * 12;
      } else {
        // Dead air / background hold tones
        if (vadActive) {
          amp = 0; // VAD completely strips silent packet
        } else {
          // Unfiltered noise causing model hallucinations
          amp = (Math.random() - 0.5) * 14 + Math.sin(i * 0.2 + phase * 0.05) * 8;
        }
      }

      const y = height / 2 + amp;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    // Color: Soft pastel sky blue for clean VAD speech; amber for unfiltered noise
    ctx.strokeStyle = vadActive ? '#0284c7' : '#d97706';
    ctx.stroke();

    phase++;
    animationFrameId = requestAnimationFrame(drawWaveform);
  }

  drawWaveform();

  function updateTelemetry() {
    if (vadActive) {
      accuracyLabel.innerText = "92.0%";
      accuracyLabel.style.color = "#059669";
      hallucinationsLabel.innerText = "-95% (Stripped)";
      hallucinationsLabel.style.color = "#059669";
    } else {
      accuracyLabel.innerText = "45.0%";
      accuracyLabel.style.color = "#dc2626";
      hallucinationsLabel.innerText = "High (+95% Noise)";
      hallucinationsLabel.style.color = "#d97706";
    }

    // Benchmark sub-second latency and RTF ~0.3 based on traffic
    const baseLatency = 210; // ms
    const jitter = Math.floor((streamCount / 1200) * 120);
    latencyLabel.innerText = `${baseLatency + jitter}ms (RTF 0.3x)`;
  }

  if (vadToggle) {
    vadToggle.addEventListener('change', (e) => {
      vadActive = e.target.checked;
      updateTelemetry();
      showToast(vadActive ? 'WebRTC VAD Filter Active: Silent packets eliminated' : 'VAD Filter Disabled: Background noise leaking to model');
    });
  }

  if (trafficSlider) {
    trafficSlider.addEventListener('input', (e) => {
      streamCount = parseInt(e.target.value, 10);
      trafficCountLabel.innerText = `${streamCount.toLocaleString()}+ streams`;
      updateTelemetry();
    });
  }

  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      if (demoActive) return;
      demoActive = true;
      demoBtn.disabled = true;
      demoBtn.innerHTML = `<span>⏳ Simulating Live Audio Session...</span>`;
      
      vadToggle.checked = false;
      vadActive = false;
      updateTelemetry();

      setTimeout(() => {
        vadToggle.checked = true;
        vadActive = true;
        updateTelemetry();
        showToast('WebRTC VAD auto-engaged: Filtered 8.4s dead air in sub-second pass');
      }, 2500);

      setTimeout(() => {
        demoActive = false;
        demoBtn.disabled = false;
        demoBtn.innerHTML = `<span>▶ Run 5s Voice Stream Session</span>`;
      }, 5000);
    });
  }

  updateTelemetry();
}

// ============================================================================
// 6. INTERACTIVE SANDBOX WIDGET 2: Fractal Compression CPU Multiplier
// ============================================================================
function initFractalSandbox() {
  const core1Btn = document.getElementById('core-btn-1');
  const coreAllBtn = document.getElementById('core-btn-all');
  const timerDisplay = document.getElementById('fractal-timer-display');
  const speedupBadge = document.getElementById('fractal-speedup-badge');
  const runBtn = document.getElementById('fractal-run-btn');
  const coreCells = document.querySelectorAll('.core-cell');

  if (!core1Btn || !coreAllBtn) return;

  let mode = 'all'; // '1' or 'all'
  let isRunning = false;

  function setMode(newMode) {
    mode = newMode;
    if (mode === '1') {
      core1Btn.classList.add('active');
      core1Btn.style.background = '#0284c7';
      core1Btn.style.color = '#ffffff';

      coreAllBtn.classList.remove('active');
      coreAllBtn.style.background = '#ffffff';
      coreAllBtn.style.color = '#334155';

      coreCells.forEach((cell, idx) => {
        cell.classList.toggle('active', idx === 0);
      });

      timerDisplay.innerText = "10.4s";
      speedupBadge.innerText = "Baseline (1x)";
      speedupBadge.className = "pastel-pill badge-amber";
    } else {
      coreAllBtn.classList.add('active');
      coreAllBtn.style.background = '#0284c7';
      coreAllBtn.style.color = '#ffffff';

      core1Btn.classList.remove('active');
      core1Btn.style.background = '#ffffff';
      core1Btn.style.color = '#334155';

      coreCells.forEach(cell => cell.classList.add('active'));

      timerDisplay.innerText = "5.2s";
      speedupBadge.innerText = "50% Faster (2x)";
      speedupBadge.className = "pastel-pill badge-emerald";
    }
  }

  core1Btn.addEventListener('click', () => setMode('1'));
  coreAllBtn.addEventListener('click', () => setMode('all'));

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      runBtn.disabled = true;

      const fills = document.querySelectorAll('.core-progress-fill');
      fills.forEach(f => f.style.width = '0%');

      let duration = mode === '1' ? 3000 : 1500;
      let start = performance.now();

      function step(now) {
        let elapsed = now - start;
        let progress = Math.min(100, (elapsed / duration) * 100);

        if (mode === '1') {
          if (fills[0]) fills[0].style.width = `${progress}%`;
        } else {
          fills.forEach((f, idx) => {
            let offset = (idx * 5);
            f.style.width = `${Math.min(100, Math.max(0, progress + offset))}%`;
          });
        }

        if (progress < 100) {
          requestAnimationFrame(step);
        } else {
          isRunning = false;
          runBtn.disabled = false;
          showToast(`Compression finished in ${mode === '1' ? '10.4s (Single Core)' : '5.2s (Multiprocessing across all cores)'}`);
        }
      }

      requestAnimationFrame(step);
    });
  }

  setMode('all');
}

// ============================================================================
// 7. INTERACTIVE SANDBOX WIDGET 3: Neural Retinal Scanner & Classifier
// ============================================================================
function initRetinalSandbox() {
  const scanTriggerBtn = document.getElementById('retinal-scan-trigger');
  const laser = document.getElementById('scanner-laser');
  const diagNormal = document.getElementById('diag-normal-val');
  const diagRetinopathy = document.getElementById('diag-retinopathy-val');
  const diagNormalFill = document.getElementById('diag-normal-fill');
  const diagRetinopathyFill = document.getElementById('diag-retinopathy-fill');
  const confusionToggleBtn = document.getElementById('confusion-matrix-toggle');
  const confusionBox = document.getElementById('confusion-matrix-box');

  if (!scanTriggerBtn) return;

  let scanning = false;

  scanTriggerBtn.addEventListener('click', () => {
    if (scanning) return;
    scanning = true;
    scanTriggerBtn.disabled = true;
    laser.classList.add('scanning');

    // Reset bars
    diagNormalFill.style.width = '0%';
    diagRetinopathyFill.style.width = '0%';
    diagNormal.innerText = 'Analyzing...';
    diagRetinopathy.innerText = 'Analyzing...';

    setTimeout(() => {
      laser.classList.remove('scanning');
      scanning = false;
      scanTriggerBtn.disabled = false;

      // Render model predictions
      diagNormalFill.style.width = '2.1%';
      diagNormalFill.style.background = '#94a3b8';
      diagNormal.innerText = '2.1%';

      diagRetinopathyFill.style.width = '95.9%';
      diagRetinopathyFill.style.background = '#059669';
      diagRetinopathy.innerText = '95.9% (Detected)';

      showToast('ResNet forward pass completed: 95.9% diagnostic confidence (+31.9% vs baseline)');
    }, 2000);
  });

  if (confusionToggleBtn && confusionBox) {
    confusionToggleBtn.addEventListener('click', () => {
      const isOpen = confusionBox.style.display === 'block';
      confusionBox.style.display = isOpen ? 'none' : 'block';
      confusionToggleBtn.innerText = isOpen ? 'Show Confusion Matrix' : 'Hide Confusion Matrix';
    });
  }
}

// ============================================================================
// 8. Command Palette (Cmd+K / Ctrl+K & Search)
// ============================================================================
function initCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-input');
  const resultsList = document.getElementById('cmd-results-list');
  const triggerBtn = document.getElementById('cmd-trigger-btn');

  if (!modal || !input || !resultsList) return;

  const index = [];

  // Skills
  RESUME_DATA.skillsCategories.forEach(c => {
    c.skills.forEach(s => {
      index.push({
        title: s,
        category: `Skill • ${c.category}`,
        action: () => {
          toggleSkillFilter(s);
          scrollToSection('experience');
        }
      });
    });
  });

  // Projects & Sandboxes
  RESUME_DATA.projects.forEach(p => {
    index.push({
      title: p.title,
      category: 'Interactive Sandbox',
      action: () => scrollToSection(`project-${p.id}`)
    });
  });

  // Experience
  RESUME_DATA.experience.forEach(e => {
    index.push({
      title: `${e.role} @ ${e.company}`,
      category: 'Experience',
      action: () => scrollToSection('experience')
    });
  });

  // Quick actions
  index.push({
    title: 'Copy Email (bharambetejas1803@gmail.com)',
    category: 'Action',
    action: () => copyToClipboard(RESUME_DATA.personal.email, 'Email copied!')
  });
  index.push({
    title: 'Copy Phone (+91-9175784987)',
    category: 'Action',
    action: () => copyToClipboard(RESUME_DATA.personal.phone, 'Phone copied!')
  });
  index.push({
    title: 'Download Resume PDF',
    category: 'Action',
    action: () => {
      const link = document.createElement('a');
      link.href = RESUME_DATA.personal.resumeDownloadUrl;
      link.download = 'Tejas_Bharambe_Resume.pdf';
      link.click();
    }
  });

  function renderResults(query = '') {
    const q = query.toLowerCase().trim();
    const matches = q === ''
      ? index.slice(0, 8)
      : index.filter(item => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));

    if (matches.length === 0) {
      resultsList.innerHTML = `<li style="padding:1.5rem; text-align:center; color:#64748b; font-size:0.9rem;">No matching skills, projects, or actions.</li>`;
      return;
    }

    resultsList.innerHTML = matches.map((item, i) => `
      <li class="cmd-item" data-idx="${i}">
        <span>${item.title}</span>
        <span class="cmd-item-type">${item.category}</span>
      </li>
    `).join('');

    resultsList.querySelectorAll('.cmd-item').forEach((li, idx) => {
      li.addEventListener('click', () => {
        matches[idx].action();
        closePalette();
      });
    });
  }

  function openPalette() {
    modal.classList.add('active');
    input.value = '';
    renderResults();
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    modal.classList.remove('active');
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openPalette);

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('active')) closePalette();
      else openPalette();
    }
    if (e.key === 'Escape') closePalette();
  });

  input.addEventListener('input', (e) => renderResults(e.target.value));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 9. Clipboard & Toast Feedback
window.copyToClipboard = function(text, successMsg = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg);
  }).catch(err => {
    console.error('Copy failed:', err);
  });
};

function initToast() {
  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className = 'toast';
  document.body.appendChild(toast);
}

function showToast(msg) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  toast.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="#38bdf8" stroke-width="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
    <span>${msg}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

// 10. ScrollSpy for Navbar
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 110;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
