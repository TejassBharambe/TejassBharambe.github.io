// app.js - High-impact portfolio interactions, dynamic rendering, command palette & metrics

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initStatGrid();
  initSkills();
  initExperience();
  initProjects();
  initEducationAndLeadership();
  initCommandPalette();
  initScrollSpy();
  initToast();
});

// 1. Helper to auto-bold numbers & metrics in text strings
function highlightMetrics(text) {
  // Replaces markdown **bold** with metric-highlight spans or strong
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="metric-highlight">$1</strong>');
}

// 2. Render Hero & Quick Actions
function initHero() {
  const p = RESUME_DATA.personal;
  document.getElementById('hero-name').innerText = p.name;
  document.getElementById('hero-role-title').innerText = `${p.role} — ${p.subRole}`;
  document.getElementById('hero-bio').innerHTML = highlightMetrics(p.bio);
  
  // Set direct links
  const ghLink = document.getElementById('github-cta');
  if (ghLink) ghLink.href = p.github;
  
  const liLink = document.getElementById('linkedin-cta');
  if (liLink) liLink.href = p.linkedin;

  const resumeCta = document.getElementById('resume-download-btn');
  if (resumeCta) {
    resumeCta.href = p.resumeDownloadUrl;
  }
}

// 3. Render Stat Grid
function initStatGrid() {
  const container = document.getElementById('stat-cards-container');
  if (!container) return;

  container.innerHTML = RESUME_DATA.metrics.map(m => `
    <div class="stat-card">
      <div class="stat-val text-gradient">${m.value}</div>
      <div class="stat-label">${m.label}</div>
      <div class="stat-desc">${m.note}</div>
    </div>
  `).join('');
}

// 4. Render Skills Cloud with Filter Pills
function initSkills() {
  const filterWrap = document.getElementById('skills-filter-container');
  const gridWrap = document.getElementById('skills-grid-container');
  if (!gridWrap || !filterWrap) return;

  // Render Category Filter Pills
  const categories = ["All", ...RESUME_DATA.skillsCategories.map(c => c.category)];
  filterWrap.innerHTML = categories.map((cat, idx) => `
    <button class="filter-pill ${idx === 0 ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');

  // Render Skill Cards
  function renderCards(filter = "All") {
    const list = filter === "All" 
      ? RESUME_DATA.skillsCategories 
      : RESUME_DATA.skillsCategories.filter(c => c.category === filter);

    gridWrap.innerHTML = list.map(c => `
      <div class="skill-category-card">
        <div class="skill-cat-title">
          <span>${c.category}</span>
          <span class="cat-count">${c.skills.length} skills</span>
        </div>
        <div class="badge-cloud">
          ${c.skills.map(s => `<span class="skill-badge" data-skill="${s}">${s}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  renderCards();

  filterWrap.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-pill')) {
      filterWrap.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderCards(e.target.dataset.cat);
    }
  });
}

// 5. Render Timeline & Expandable Architecture Deep-Dives
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
          ${exp.highlights.map(h => `<li class="bullet-item">${highlightMetrics(h)}</li>`).join('')}
        </ul>

        ${exp.deepDive ? `
          <div class="deep-dive-box">
            <button class="deep-dive-toggle" data-target="deepdive-${exp.id}">
              <span>⚙️ Architectural Deep Dive: ${exp.deepDive.title}</span>
              <span class="toggle-icon">▼</span>
            </button>
            <div class="deep-dive-body" id="deepdive-${exp.id}">
              <div class="deep-dive-grid">
                <div class="deep-dive-col">
                  <h5>Challenge & Bottleneck</h5>
                  <p>${exp.deepDive.challenge}</p>
                </div>
                <div class="deep-dive-col">
                  <h5>Engineered Solution</h5>
                  <p>${exp.deepDive.solution}</p>
                </div>
              </div>
              <h5>Key Architectural Highlights</h5>
              <ul class="bullet-list" style="margin-top: 0.5rem;">
                ${exp.deepDive.architectureHighlights.map(h => `<li class="bullet-item">${h}</li>`).join('')}
              </ul>
              <div class="project-tags" style="margin-top: 0.75rem;">
                ${exp.deepDive.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');

  // Toggle Deep-Dive
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.deep-dive-toggle');
    if (!btn) return;
    const targetId = btn.dataset.target;
    const body = document.getElementById(targetId);
    if (!body) return;
    const isOpen = body.classList.contains('open');
    body.classList.toggle('open', !isOpen);
    btn.querySelector('.toggle-icon').textContent = isOpen ? '▼' : '▲';
  });
}

// 6. Render Projects Grid & Details Modal
function initProjects() {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  container.innerHTML = RESUME_DATA.projects.map(proj => `
    <div class="project-card" id="proj-${proj.id}">
      <div class="project-top">
        <div class="project-badge-line">
          <span class="project-domain">${proj.period}</span>
          <span class="project-metric-pill">${proj.metrics}</span>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.summary}</p>
        <div class="project-tags">
          ${proj.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>
        <ul class="bullet-list">
          ${proj.bullets.map(b => `<li class="bullet-item" style="font-size: 0.875rem;">${highlightMetrics(b)}</li>`).join('')}
        </ul>
      </div>
      <div class="project-actions">
        <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-glass" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          Source Code
        </a>
        <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="openProjectModal('${proj.id}')">
          Architecture Deep-Dive
        </button>
      </div>
    </div>
  `).join('');
}

// Open modal for project deep-dive
window.openProjectModal = function(id) {
  const proj = RESUME_DATA.projects.find(p => p.id === id);
  if (!proj) return;

  const modal = document.getElementById('project-modal');
  const body = document.getElementById('project-modal-body');
  if (!modal || !body) return;

  body.innerHTML = `
    <h3 style="font-size: 1.5rem; margin-bottom: 0.25rem;">${proj.title}</h3>
    <p style="color: #38bdf8; font-size: 0.9rem; margin-bottom: 1.5rem;">${proj.subtitle}</p>
    
    <h5 style="text-transform: uppercase; font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.4rem;">The Challenge</h5>
    <p style="font-size: 0.95rem; color: #cbd5e1; margin-bottom: 1.25rem;">${proj.deepDive.problem}</p>

    <h5 style="text-transform: uppercase; font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.4rem;">Architectural Solution</h5>
    <p style="font-size: 0.95rem; color: #cbd5e1; margin-bottom: 1.25rem;">${proj.deepDive.solution}</p>

    <h5 style="text-transform: uppercase; font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.4rem;">Engineering Outcomes</h5>
    <ul class="bullet-list" style="margin-bottom: 1.5rem;">
      ${proj.deepDive.results.map(r => `<li class="bullet-item">${r}</li>`).join('')}
    </ul>

    <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
      Explore Repository on GitHub
    </a>
  `;

  modal.classList.add('active');
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
};

// 7. Render Education and Leadership
function initEducationAndLeadership() {
  const eduContainer = document.getElementById('education-card');
  const leadContainer = document.getElementById('leadership-card');
  
  if (eduContainer && RESUME_DATA.education[0]) {
    const e = RESUME_DATA.education[0];
    eduContainer.innerHTML = `
      <div class="card-title">${e.degree}</div>
      <div class="card-sub">${e.institution} • ${e.period}</div>
      <div class="metric-highlight" style="display:inline-block; margin-bottom: 0.75rem;">${e.score}</div>
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

// 8. Command Palette (Cmd+K / Ctrl+K & Search)
function initCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-input');
  const resultsList = document.getElementById('cmd-results-list');
  const triggerBtn = document.getElementById('cmd-trigger-btn');

  if (!modal || !input || !resultsList) return;

  // Build searchable index
  const index = [];

  // Skills
  RESUME_DATA.skillsCategories.forEach(c => {
    c.skills.forEach(s => {
      index.push({
        title: s,
        category: `Skill (${c.category})`,
        action: () => {
          highlightSkillBadge(s);
          scrollToSection('skills');
        }
      });
    });
  });

  // Projects
  RESUME_DATA.projects.forEach(p => {
    index.push({
      title: p.title,
      category: 'Project',
      action: () => {
        scrollToSection(`proj-${p.id}`);
      }
    });
  });

  // Experience
  RESUME_DATA.experience.forEach(e => {
    index.push({
      title: `${e.role} @ ${e.company}`,
      category: 'Experience',
      action: () => {
        scrollToSection('experience');
      }
    });
  });

  // Actions
  index.push({
    title: 'Copy Email Address',
    category: 'Action',
    action: () => copyToClipboard(RESUME_DATA.personal.email, 'Email address copied!')
  });
  index.push({
    title: 'Copy Phone Number',
    category: 'Action',
    action: () => copyToClipboard(RESUME_DATA.personal.phone, 'Phone number copied!')
  });
  index.push({
    title: 'View GitHub Profile',
    category: 'External Link',
    action: () => window.open(RESUME_DATA.personal.github, '_blank')
  });

  function renderResults(query = '') {
    const q = query.toLowerCase().trim();
    const matches = q === '' 
      ? index.slice(0, 7) 
      : index.filter(item => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));

    if (matches.length === 0) {
      resultsList.innerHTML = `<li style="padding: 1.5rem; text-align: center; color: #64748b;">No matching skills, projects, or actions found.</li>`;
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
      if (modal.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
    if (e.key === 'Escape') {
      closePalette();
      closeProjectModal();
    }
  });

  input.addEventListener('input', (e) => renderResults(e.target.value));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });
}

// 9. Interactive Skill Badge Highlighting
function highlightSkillBadge(skillName) {
  document.querySelectorAll('.skill-badge').forEach(b => {
    if (b.dataset.skill.toLowerCase() === skillName.toLowerCase()) {
      b.classList.add('highlighted');
      setTimeout(() => b.classList.remove('highlighted'), 3000);
    }
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 10. Copy-to-Clipboard & Toast
window.copyToClipboard = function(text, successMsg = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg);
  }).catch(err => {
    console.error('Copy failed: ', err);
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
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// 11. ScrollSpy for Navbar
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
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
