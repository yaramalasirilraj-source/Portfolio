/**
 * SIRIL RAJ - PORTFOLIO INTERACTION ENGINE
 * Features:
 * - Dynamic Canvas Particle Constellation
 * - Custom Glowing Cursor
 * - Typing Headline Effect
 * - Interactive 30-Second Typing Lab Challenge
 * - Interactive Developer Terminal
 * - Project Deep Dive Modals
 * - Scroll Reveal & Navbar State
 * - Contact Form Handler with Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initCustomCursor();
  initTypewriter();
  initScrollReveal();
  initNavbar();
  initTypingLab();
  initTerminal();
  initProjectModals();
  initContactForm();
  setCurrentYear();
});

/* ==========================================================================
   1. INTERACTIVE CANVAS PARTICLE CONSTELLATION
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const maxDistance = 120;
  const mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? '#00f2fe' : '#7928ca';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 90);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00f2fe';
          ctx.globalAlpha = (1 - dist / maxDistance) * 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  animate();
}

/* ==========================================================================
   2. CUSTOM GLOWING CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(renderOutline);
  }
  renderOutline();

  // Hover expansion on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, .glass-card, .cmd-pill');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      outline.style.width = '54px';
      outline.style.height = '54px';
      outline.style.borderColor = '#00f2fe';
      outline.style.background = 'rgba(0, 242, 254, 0.08)';
    });
    el.addEventListener('mouseleave', () => {
      outline.style.width = '36px';
      outline.style.height = '36px';
      outline.style.borderColor = 'rgba(0, 242, 254, 0.45)';
      outline.style.background = 'transparent';
    });
  });
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const words = [
    "B.Tech 3rd Year Engineer @ ALIET",
    "Java & OOPs Developer",
    "DBMS & Relational SQL Architect",
    "High-Speed Typer (95+ WPM)",
    "Passionate Problem Solver",
    "Deep Inquirer & System Questioner"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. SCROLL REVEAL & SKILL BARS
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Animate skill progress bars if inside this section
        const progressBars = entry.target.querySelectorAll('.progress-fill');
        progressBars.forEach((bar) => {
          const targetWidth = bar.style.getPropertyValue('--target-width') || '85%';
          bar.style.width = targetWidth;
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   5. NAVBAR STATE & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Sticky background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(7, 9, 14, 0.92)';
      navbar.style.borderColor = 'rgba(0, 242, 254, 0.2)';
    } else {
      navbar.style.background = 'rgba(7, 9, 14, 0.7)';
      navbar.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    }

    // Active link highlighting
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile drawer toggle
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   6. INTERACTIVE 30-SECOND TYPING LAB CHALLENGE WIDGET
   ========================================================================== */
function initTypingLab() {
  const wordsContainer = document.getElementById('words-container');
  const inputField = document.getElementById('typing-input');
  const restartBtn = document.getElementById('restart-game-btn');
  const timeLeftDisplay = document.getElementById('time-left');
  const liveWpmDisplay = document.getElementById('live-wpm');
  const liveAccDisplay = document.getElementById('live-acc');
  const liveScoreDisplay = document.getElementById('live-score');
  const statusText = document.getElementById('game-status-text');
  const resultBanner = document.getElementById('game-result-banner');
  const resultIcon = document.getElementById('result-icon');
  const resultTitle = document.getElementById('result-title');
  const resultMessage = document.getElementById('result-message');

  if (!wordsContainer || !inputField) return;

  const sampleTexts = [
    "Clean code always reads like well-written prose and reveals intent clearly.",
    "In Java object oriented principles allow us to build modular scalable and robust systems.",
    "Database normalization prevents redundant anomalies while structured queries fetch results instantly.",
    "A great software engineer does not just code solutions but continuously questions how systems perform under scale.",
    "Algorithmic problem solving is the art of breaking complex puzzles into elegant logical steps.",
    "Speed typing empowers developers to translate creative thoughts directly into functional software without friction."
  ];

  let currentText = "";
  let words = [];
  let currentWordIndex = 0;
  let correctCharsCount = 0;
  let totalCharsTyped = 0;
  let timeLeft = 30;
  let timerInterval = null;
  let isGameActive = false;
  let hasStarted = false;

  function setupNewGame() {
    clearInterval(timerInterval);
    timeLeft = 30;
    currentWordIndex = 0;
    correctCharsCount = 0;
    totalCharsTyped = 0;
    isGameActive = false;
    hasStarted = false;

    timeLeftDisplay.textContent = "30s";
    liveWpmDisplay.textContent = "0";
    liveAccDisplay.textContent = "100%";
    liveScoreDisplay.textContent = "0";
    statusText.textContent = "Ready to test your typing speed (Type below to start!)";
    resultBanner.classList.remove('active');
    inputField.value = "";
    inputField.disabled = false;

    // Pick random text
    currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    words = currentText.split(' ');

    wordsContainer.innerHTML = '';
    words.forEach((w, wIdx) => {
      const span = document.createElement('span');
      span.className = 'word' + (wIdx === 0 ? ' current' : '');
      span.textContent = w;
      wordsContainer.appendChild(span);
    });
  }

  function startGame() {
    hasStarted = true;
    isGameActive = true;
    statusText.textContent = "Challenge in progress! Keep your focus and rhythm...";

    timerInterval = setInterval(() => {
      timeLeft--;
      timeLeftDisplay.textContent = `${timeLeft}s`;

      const timeElapsed = (30 - timeLeft) / 60;
      if (timeElapsed > 0) {
        const wpm = Math.round((correctCharsCount / 5) / timeElapsed);
        liveWpmDisplay.textContent = Math.max(0, wpm);
      }

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    clearInterval(timerInterval);
    isGameActive = false;
    inputField.disabled = true;
    statusText.textContent = "Time is up! Check your final stats below.";

    const finalWpm = Math.round((correctCharsCount / 5) / 0.5);
    const accuracy = totalCharsTyped > 0 ? Math.round((correctCharsCount / totalCharsTyped) * 100) : 0;
    liveWpmDisplay.textContent = finalWpm;
    liveAccDisplay.textContent = `${accuracy}%`;
    liveScoreDisplay.textContent = Math.round(finalWpm * (accuracy / 100));

    // Show result banner
    resultBanner.classList.add('active');
    if (finalWpm >= 85) {
      resultIcon.textContent = "⚡";
      resultTitle.textContent = "Outstanding Speed!";
      resultMessage.textContent = `You clocked ${finalWpm} WPM with ${accuracy}% accuracy! You are rivaling Siril's benchmark!`;
    } else if (finalWpm >= 50) {
      resultIcon.textContent = "🚀";
      resultTitle.textContent = "Great Typing Velocity!";
      resultMessage.textContent = `You scored ${finalWpm} WPM with ${accuracy}% accuracy. Solid performance!`;
    } else {
      resultIcon.textContent = "🎯";
      resultTitle.textContent = "Good Effort!";
      resultMessage.textContent = `You achieved ${finalWpm} WPM. Consistent practice leads to mastery!`;
    }
  }

  inputField.addEventListener('input', (e) => {
    if (!hasStarted && inputField.value.trim().length > 0) {
      startGame();
    }

    if (!isGameActive) return;

    const typedVal = inputField.value;
    const currentWord = words[currentWordIndex];
    const wordElements = wordsContainer.querySelectorAll('.word');
    const currentElement = wordElements[currentWordIndex];

    // Check if user hit space to finish word
    if (typedVal.endsWith(' ')) {
      const cleanWord = typedVal.trim();
      totalCharsTyped += typedVal.length;

      if (cleanWord === currentWord) {
        currentElement.className = 'word correct';
        correctCharsCount += currentWord.length + 1;
      } else {
        currentElement.className = 'word incorrect';
      }

      currentWordIndex++;
      inputField.value = '';

      if (currentWordIndex < words.length) {
        wordElements[currentWordIndex].classList.add('current');
      } else {
        // If finished all words before 30s, add bonus and loop or finish
        endGame();
      }
    } else {
      // In-progress word checking
      if (currentWord.startsWith(typedVal)) {
        currentElement.className = 'word current';
      } else {
        currentElement.className = 'word current incorrect';
      }
    }

    // Live accuracy update
    const totalConsidered = totalCharsTyped + typedVal.length;
    const liveAcc = totalConsidered > 0 ? Math.min(100, Math.round((correctCharsCount / totalConsidered) * 100)) : 100;
    liveAccDisplay.textContent = `${liveAcc}%`;
  });

  restartBtn.addEventListener('click', () => {
    setupNewGame();
    inputField.focus();
  });

  setupNewGame();
}

/* ==========================================================================
   7. INTERACTIVE DEVELOPER TERMINAL CONSOLE
   ========================================================================== */
function initTerminal() {
  const termInput = document.getElementById('term-input');
  const termHistory = document.getElementById('term-history');
  const clearBtn = document.getElementById('clear-term-btn');
  const quickCmds = document.querySelectorAll('.cmd-pill');

  if (!termInput || !termHistory) return;

  const commands = {
    help: () => `
Available Commands:
  • <span class="term-highlight">skills</span>     - View core technical stack & competencies
  • <span class="term-highlight">projects</span>   - Overview of Pathfinder & StudyPlan
  • <span class="term-highlight">education</span>  - Details on ALIET & Sri Akshara Junior College
  • <span class="term-highlight">why-hire</span>   - What makes Siril an invaluable team member
  • <span class="term-highlight">quote</span>      - Siril's favorite engineering quote
  • <span class="term-highlight">contact</span>    - Email, college location & social channels
  • <span class="term-highlight">clear</span>      - Clear terminal screen
`,
    skills: () => `
<strong style="color:#00f2fe;">TECHNICAL PROFICIENCIES:</strong>
  ▸ <strong>Java:</strong> Core OOP, Collections, Multithreading, Exceptions, Streams.
  ▸ <strong>DBMS:</strong> SQL, Relational Schema, 3NF Normalization, ACID Transactions.
  ▸ <strong>Problem Solving:</strong> Graph algorithms, space-time analysis, structured debugging.
  ▸ <strong>Typing Velocity:</strong> 95+ WPM with 98% accuracy (Rapid ideation & coding).
  ▸ <strong>Questioning:</strong> Analytical curiosity, edge-case probing, architectural validation.
`,
    projects: () => `
<strong style="color:#4facfe;">FEATURED REPOSITORIES:</strong>
  1. <strong>Pathfinder:</strong>
     Graph traversal simulation visualizing Dijkstra, A*, and BFS across dynamic obstacle grids.
     <em>Key Tech:</em> Java, Graph Algorithms, PriorityQueues.
  
  2. <strong>StudyPlan:</strong>
     Smart syllabus pacing and academic scheduler with relational persistence.
     <em>Key Tech:</em> Java, Relational DBMS (MySQL), 3NF Schema.
`,
    education: () => `
<strong style="color:#7928ca;">ACADEMIC BACKGROUND:</strong>
  🎓 <strong>B.Tech in Engineering (3rd Year, 1st Sem)</strong>
     Andhra Loyola Institute of Engineering and Technology (ALIET)
     Focus: Java, DBMS, Operating Systems, Algorithm Design.

  🏫 <strong>Board of Intermediate Education (MPC)</strong>
     Sri Akshara Junior College, Kanchikacherla
     Focus: Mathematics, Mechanics, Analytical Deduction.
`,
    'why-hire': () => `
<strong style="color:#10b981;">WHY HIRE SIRIL RAJ?</strong>
  ✔ <strong>First-Principles Mindset:</strong> Doesn't just write code—understands memory, CPU, and DB cost.
  ✔ <strong>Deep Inquirer:</strong> Asks clarifying questions that unearth edge cases before deployment.
  ✔ <strong>Execution Velocity:</strong> High typing speed (95+ WPM) combined with rigorous OOP disciplines.
  ✔ <strong>Collaborative Spirit:</strong> Dedicated, adaptable, and perpetually eager to learn.
`,
    quote: () => `
<em style="color:#f59e0b;">"Questioning the design before writing the first line of code saves ten rewrites later."</em>
— Siril Raj
`,
    contact: () => `
<strong style="color:#00f2fe;">CONTACT DIRECTORY:</strong>
  • Email:    <a href="mailto:sirilraj.dev@gmail.com" style="color:#4facfe;">sirilraj.dev@gmail.com</a>
  • College:  Andhra Loyola Institute of Engineering & Technology, Vijayawada, AP
  • Status:   Open for Summer & Semester Internships
`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      termHistory.innerHTML = '';
      termInput.value = '';
      return;
    }

    const entry = document.createElement('div');
    entry.className = 'term-entry';

    const echo = document.createElement('div');
    echo.className = 'term-cmd-echo';
    echo.innerHTML = `<span class="term-prompt">siril@aliet:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
    entry.appendChild(echo);

    const result = document.createElement('div');
    result.className = 'term-result';

    if (commands[cmd]) {
      result.innerHTML = commands[cmd]();
    } else {
      result.innerHTML = `<span style="color:#f43f5e;">Command not found: "${escapeHtml(cmd)}". Type <span class="term-highlight">help</span> for a list of available commands.</span>`;
    }

    entry.appendChild(result);
    termHistory.appendChild(entry);
    termInput.value = '';

    // Scroll to bottom
    const termBody = document.getElementById('terminal-body');
    if (termBody) termBody.scrollTop = termBody.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(termInput.value);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      termHistory.innerHTML = '';
    });
  }

  quickCmds.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        termInput.value = cmd;
        executeCommand(cmd);
      }
    });
  });
}

/* ==========================================================================
   8. PROJECT DEEP DIVE MODALS
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close');
  const openButtons = document.querySelectorAll('.open-modal-btn');

  if (!modal || !modalContent) return;

  const projectData = {
    pathfinder: {
      tag: "JAVA & GRAPH THEORY",
      title: "Pathfinder: Algorithmic Routing Engine",
      body: `
        <div class="modal-tags">
          <span>Java</span>
          <span>Dijkstra Algorithm</span>
          <span>A* Search</span>
          <span>Breadth-First Search</span>
          <span>PriorityQueue</span>
        </div>

        <h4>Architectural Vision</h4>
        <p>
          <strong>Pathfinder</strong> was born from a deep curiosity to demystify how navigation engines find the most optimal path in fractions of a second. Rather than treating graph algorithms as static textbook formulas, this project implements a dynamic, visual Java application that renders node exploration in real time.
        </p>

        <h4>Algorithmic Breakdown</h4>
        <p>
          The engine allows users to compare and contrast multiple shortest-path search strategies across weighted grids:
        </p>
        <div class="modal-code-block">
// Heuristic calculation in A* Search:
int calculateManhattanDistance(Node current, Node target) {
    return Math.abs(current.x - target.x) + Math.abs(current.y - target.y);
}
// Node evaluation function: f(n) = g(n) + h(n)
        </div>

        <h4>Key Engineering Highlights</h4>
        <ul class="styled-list">
          <li><strong>Dijkstra's Algorithm:</strong> Guaranteed shortest path through weighted nodes using a custom Min-Heap Priority Queue.</li>
          <li><strong>A* Heuristic Search:</strong> Exponentially faster path resolution by factoring Manhattan and Euclidean heuristics.</li>
          <li><strong>Interactive Grid Obstacles:</strong> Real-time recalculation when barriers or walls are dynamically placed by the user.</li>
          <li><strong>Performance Telemetry:</strong> Live metrics tracking total explored nodes, path length, and execution milliseconds.</li>
        </ul>
      `
    },
    studyplan: {
      tag: "JAVA & DATABASE ARCHITECTURE",
      title: "StudyPlan: Academic Scheduling & Progress Engine",
      body: `
        <div class="modal-tags">
          <span>Java</span>
          <span>Relational DBMS</span>
          <span>SQL (MySQL)</span>
          <span>Third Normal Form (3NF)</span>
          <span>Academic Productivity</span>
        </div>

        <h4>Architectural Vision</h4>
        <p>
          Engineering coursework demands balancing multiple complex syllabi, lab deadlines, and semester exams. <strong>StudyPlan</strong> is an automated schedule synthesizer and relational database management system designed specifically for collegiate engineering workflows.
        </p>

        <h4>Relational Database Schema (3NF)</h4>
        <p>
          The database model was strictly normalized to Third Normal Form (3NF) to eliminate update and deletion anomalies:
        </p>
        <div class="modal-code-block">
CREATE TABLE courses (
    course_id VARCHAR(10) PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    difficulty_score INT CHECK (difficulty_score BETWEEN 1 AND 5)
);

CREATE TABLE study_sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id VARCHAR(10),
    scheduled_date DATE NOT NULL,
    status ENUM('PENDING', 'COMPLETED', 'RESCHEDULED'),
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);
        </div>

        <h4>Key Engineering Highlights</h4>
        <ul class="styled-list">
          <li><strong>Dynamic Workload Balancing:</strong> Automatically recalculates remaining study intervals if an engineering student misses a milestone.</li>
          <li><strong>ACID Transaction Compliance:</strong> Ensures data integrity across schedule updates and completed milestone commits.</li>
          <li><strong>Query Optimization:</strong> Indexed queries for instant timetable retrieval and progress velocity tracking.</li>
        </ul>
      `
    }
  };

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <span class="modal-header-tag">${data.tag}</span>
      <h2 class="modal-title">${data.title}</h2>
      <div class="modal-body">${data.body}</div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const proj = btn.getAttribute('data-project');
      if (proj) openModal(proj);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. CONTACT FORM & TOAST NOTIFICATIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      <span>Sending Message...</span>
    `;
    submitBtn.disabled = true;

    // Simulate network submission
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast(`Thank you, ${name}! Your message has been received. Siril will get back to you shortly.`, 'success');
    }, 1200);
  });
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : 'toast-error'}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✔' : '⚠'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

/* ==========================================================================
   10. CURRENT YEAR FOOTER HELPER
   ========================================================================== */
function setCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
