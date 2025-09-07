# 💣✨ **Minesweeper** — Retro Puzzle, Reimagined

> *Dig, deduce, and survive.* A stylish, modern take on the classic Minesweeper — built with pure HTML/CSS/JS and crafted for delight.

---

```
  __  __ _                        _
 |  \/  (_) ___  _ __   __ _  ___| | _____
 | |\/| | |/ _ \| '_ \ / _` |/ __| |/ / __|
 | |  | | | (_) | | | | (_| | (__|   <\__ \
 |_|  |_|_|\___/|_| |_|\__,_|\___|_|\_\___/

```

## 🎨 Aesthetic + Vibe

This is Minesweeper but *styled*: soft shadows, neon accents, subtle micro-interactions, and an interface that feels more like a designer toy than a spreadsheet of doom. Minimal, responsive, and keyboard-friendly.

## 🔥 Live Demo

Open the game in your browser and play instantly:

`https://saquibkhan413.github.io/minesweeper/`

---

## ✨ Highlights

* **Safe Start**: First click never detonates a mine.
* **Smart Flags**: Place flags + toggle question marks for suspicion tracking.
* **Hints & Undo**: Need a nudge? Use `H` for a hint. Accidentally clicked? Undo the last open.
* **Pause & Stats**: Pause the timer (`P`) and obsess over your personal best stored in localStorage.
* **Custom Modes**: Beginner / Intermediate / Expert / Custom (set grid & mine count).
* **Open Remaining**: Autocomplete remaining safe cells when you're certain.

---

## 🎮 Controls

* **Left click** — Open cell
* **Right click** (or alternate click) — Toggle Flag / Question
* **H** — Hint
* **P** — Pause / Resume
* **F2** — New Game

> Tip: Hold **Shift** while clicking a number to open its unopened neighbors when flags match.

---

## 🧩 How It Works (Quick)

* Board generation ensures mines are distributed **after** the first click to maintain safe start.
* Each cell computes adjacent mine count on the fly.
* Flood-fill reveals zero-neighbour regions for instant clears.
* Game state (time, best times) saved to **localStorage** for persistence.

---

## 🛠️ Tech Stack

* Vanilla **JavaScript** for game logic
* **HTML5** semantic markup
* **CSS3** with custom properties for theme control
* No build step — drop `index.html` in any static host (GitHub Pages-ready)

---

## 🚀 Run Locally

```bash
# clone
git clone https://github.com/saquibkhan413/minesweeper.git
cd minesweeper
# open index.html in a browser
# or serve with a simple server
npx http-server .
```

---

## 🎯 Ideas for Future Flair

* Theme switcher (Matrix / Retro‑neon / Minimal)
* Animated particle confetti on win
* Global leaderboards (opt‑in)
* Accessibility improvements (screen reader labels, high contrast)

---

## 🤝 Contribute

Love the vibe? PRs are welcome — tidy commits, a short description, and screenshots for UI changes. Found a bug? Open an issue with steps to reproduce.

---

## 📜 License

Add your license here — `MIT` is a great default if you want permissive reuse.

---

Made with ❤️ by **Saquib Khan** — keep digging.

> Want a version with badges, screenshots, or a printable one‑page handout? Tell me which style and I’ll craft it right away.
