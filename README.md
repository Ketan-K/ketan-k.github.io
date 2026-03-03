# NeonFlip — AI Futuristic GitHub Portfolio

Welcome to a cyberpunk-style portfolio that feels like a sci-fi interface and runs on **live GitHub data**.

This site is built for `Ketan-K`, designed to host on **GitHub Pages**, and crafted with:
- no-scroll full-screen navigation,
- 3D page-flip transitions,
- AI-style command console,
- dynamic profile/project/skills rendering from GitHub API.

## Make it yours

You can directly customize this for your own use with your GitHub profile.
If you like this project, please mark a star and fork it.

---

## Why this is cool

Instead of hardcoded content, this portfolio behaves like a live profile engine:

- Load **any GitHub username** instantly
- Pull profile stats + repositories in real time
- Auto-generate tech stack from languages/topics
- Keep the same futuristic visual identity for every profile

It feels like a personal website, but works like a smart dashboard.

---

## Repository + Hosting Target

- GitHub account: `Ketan-K`
- Repository: `Ketan-K`
- Preferred domain target: `https://ketan-k.github.io`

---

## Feature Highlights

- Fullscreen **no-scroll UX**
- 3D **flipbook-style page transitions**
- Keyboard/mouse/touch navigation
- AI Console commands (e.g. `set user torvalds`)
- Dynamic sections:
  - Hero + About from profile metadata
  - Live repository ranking (stars + recency)
  - Repo analytics (total stars + forks)
  - Pinned-style featured repositories (public-data mode)
  - Language share visualization
  - Dynamic stack cloud (languages + topics)
  - Smart contact action (email if public, otherwise GitHub)

---

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- GitHub REST API

---

## Project Structure

- `index.html` — page structure and sections
- `style.css` — visual system, dark futuristic UI, effects
- `script.js` — navigation engine, AI commands, GitHub data pipeline
- `README.md` — docs
- `LICENSE` — MIT license

---

## Run Locally

From project root:

```bash
python -m http.server 5500
```

Open in browser:

- `http://127.0.0.1:5500/index.html`

---

## How to Customize Live

### 1) Username Input (UI)

On the first page, enter a GitHub username and click **Load Profile**.

### 2) AI Console Commands

Try commands like:

- `set user Ketan-K`
- `set user octocat`
- `go to projects`
- `summarize profile`
- `open github`

### 3) URL Parameter

You can directly open with a profile:

- `index.html?user=Ketan-K`
- `index.html?user=torvalds`

The last loaded username is saved in local storage.

---

## GitHub Pages Deployment (for Ketan-K)

1. Push all files to repository `Ketan-K`.
2. Open `Settings` → `Pages`.
3. Under source, select **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`.
5. Save and wait for build.

Live URL patterns:

- Repo project page: `https://ketan-k.github.io/Ketan-K/`
- User site (if repo is `ketan-k.github.io`): `https://ketan-k.github.io/`

---

## Important Notes

- GitHub API rate limits apply for unauthenticated requests.
- If sync fails, retry after a short cooldown.
- Some fields (like email) depend on what is public on GitHub profile.

---

## License

Released under the **MIT License**. See `LICENSE`.
