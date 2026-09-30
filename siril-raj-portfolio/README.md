# Siril Raj - Modern Developer Portfolio

An interactive, high-performance portfolio website built for **Siril Raj**, 3rd Year B.Tech student at **Andhra Loyola Institute of Engineering and Technology (ALIET)**.

![Portfolio Preview Banner](assets/favicon.svg)

---

## 🌟 Highlights & Features

- **Futuristic Dark Glassmorphism**: Tailored with deep obsidian tones (`#07090e`), neon cyan (`#00f2fe`), and violet (`#7928ca`) glowing accents.
- **Interactive Canvas Particle Constellation**: Real-time particle network connecting based on proximity and reacting dynamically to cursor movement.
- **Dynamic Typewriter Headline**: Showcasing roles across Java engineering, database architecture, rapid typing velocity, and analytical inquiry.
- **The Typing Lab Challenge**: A live 30-second typing test widget directly embedded in the portfolio. Visitors can test their keystroke speed against Siril's **95+ WPM** benchmark!
- **Interactive Developer Console (CLI)**: A retro-modern shell allowing visitors to type or click commands (`skills`, `projects`, `education`, `why-hire`, `quote`, `contact`, `clear`).
- **Comprehensive Academic Journey**: Showcasing B.Tech at *Andhra Loyola Institute of Engineering and Technology (ALIET)* and Intermediate at *Sri Akshara Junior College, Kanchikacherla*.
- **Deep-Dive Project Modals**: Complete architectural breakdowns for **Pathfinder** (graph traversal & pathfinding visualizer) and **StudyPlan** (academic scheduler & relational DBMS).
- **Interactive Contact Form & Custom Glowing Cursor**: Modern micro-interactions, responsive navigation drawer, and animated feedback.

---

## 📁 Project Structure

```
siril-raj-portfolio/
│
├── index.html            # Semantic HTML5 layout and sections
├── style.css             # Glassmorphic CSS design system, animations, responsive layouts
├── script.js             # Particle canvas, typing engine, terminal, modals, and event listeners
├── assets/
│   └── favicon.svg       # Custom neon monogram favicon
└── README.md             # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Simply double-click `index.html` or right-click and choose **Open with > Chrome / Edge / Firefox**. No build steps, Node packages, or compilation required!

### Option 2: Local HTTP Server (Optional)
If you have Node.js or Python installed, you can launch a local dev server:

**Using Node.js:**
```bash
npx serve .
# Or:
npx http-server -p 3000
```

**Using Python:**
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 Free 1-Click Deployment

### Deploy to GitHub Pages:
1. Create a repository on GitHub named `portfolio` or `sirilraj.github.io`.
2. Push these files to the `main` branch.
3. Go to **Settings > Pages > Branch: main > Save**.
4. Your website will be live at `https://<your-username>.github.io`!

### Deploy to Vercel or Netlify:
- Simply drag and drop the `siril-raj-portfolio` folder into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).

---

## ✏️ Customization

- **Contact Email / Socials**: Open `index.html` and search for `sirilraj.dev@gmail.com` or social links to insert your direct LinkedIn and GitHub profiles.
- **Projects**: To add more projects or adjust existing ones, update the project cards in `index.html` and the `projectData` object inside `script.js`.
- **Typing Snippets**: Edit the `sampleTexts` array in `script.js` to add your favorite programming quotes or custom coding phrases.

---

© 2026 Siril Raj • Andhra Loyola Institute of Engineering and Technology (ALIET).
