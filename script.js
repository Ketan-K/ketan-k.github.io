const pages = [...document.querySelectorAll('.page')];
const dotsRoot = document.getElementById('page-dots');
const nextBtn = document.getElementById('next-btn');

const repoList = document.getElementById('repo-list');
const repoSubtitle = document.getElementById('repo-subtitle');
const allReposLink = document.getElementById('all-repos-link');
const pinnedList = document.getElementById('pinned-list');
const pinnedSubtitle = document.getElementById('pinned-subtitle');

const skillCloud = document.getElementById('skill-cloud');
const skillSummary = document.getElementById('skill-summary');
const languageShare = document.getElementById('language-share');

const aiLog = document.getElementById('ai-log');
const aiForm = document.getElementById('ai-form');
const aiInput = document.getElementById('ai-input');

const heroName = document.getElementById('hero-name');
const heroBio = document.getElementById('hero-bio');
const heroMeta = document.getElementById('hero-meta');
const aboutBio = document.getElementById('about-bio');
const profileLinks = document.getElementById('profile-links');

const githubLink = document.getElementById('github-link');
const contactCta = document.getElementById('contact-cta');
const contactMail = document.getElementById('contact-mail');
const contactGithub = document.getElementById('contact-github');
const contactCopy = document.getElementById('contact-copy');
const connectTitle = document.getElementById('connect-title');
const contactActions = document.getElementById('contact-actions');
const connectLinks = document.getElementById('connect-links');

const profileForm = document.getElementById('profile-form');
const profileInput = document.getElementById('profile-input');

const queryUser = new URLSearchParams(window.location.search).get('user');
const storedUser = localStorage.getItem('portfolio.githubUser');
let currentUser = queryUser || storedUser || 'Ketan-K';

let activePage = 0;
let isAnimating = false;
let profileCache = null;
let reposCache = [];
let socialAccountsCache = [];

function ensureLink(urlOrText) {
  if (!urlOrText) return '';
  if (urlOrText.startsWith('http://') || urlOrText.startsWith('https://')) {
    return urlOrText;
  }
  return `https://${urlOrText}`;
}

function compactDate(rawDate) {
  if (!rawDate) return 'unknown date';
  const date = new Date(rawDate);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

function setProfileField(key, value, asLink = false) {
  const node = document.querySelector(`[data-profile="${key}"]`);
  if (!node) return;

  if (!value) {
    node.textContent = 'Not available';
    return;
  }

  if (asLink) {
    const href = ensureLink(value);
    node.innerHTML = `<a href="${href}" target="_blank" rel="noreferrer">${value}</a>`;
    return;
  }

  node.textContent = value;
}

function renderProfileLinks(profile, socials = []) {
  profileLinks.innerHTML = '';

  const links = [];
  links.push({ label: 'GitHub', href: profile.html_url });

  if (profile.blog) {
    links.push({ label: 'Website', href: ensureLink(profile.blog) });
  }

  if (profile.twitter_username) {
    links.push({
      label: 'X/Twitter',
      href: `https://x.com/${profile.twitter_username}`,
    });
  }

  if (profile.email) {
    links.push({ label: 'Email', href: `mailto:${profile.email}` });
  }

  socials.forEach((account) => {
    if (!account?.provider || !account?.url) {
      return;
    }

    const exists = links.some((item) => item.href === account.url);
    if (!exists) {
      links.push({ label: account.provider, href: account.url });
    }
  });

  links.forEach((item) => {
    const anchor = document.createElement('a');
    anchor.href = item.href;
    if (!item.href.startsWith('mailto:')) {
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
    }
    anchor.textContent = item.label;
    profileLinks.append(anchor);
  });
}

function renderConnectSection(profile, socials = []) {
  if (!profile) {
    connectTitle.textContent = 'Connect';
    contactCopy.textContent = 'Unable to load profile contact channels.';
    contactActions.style.display = 'none';
    connectLinks.innerHTML = '';
    return;
  }

  contactActions.style.display = 'flex';
  connectTitle.textContent = `Connect with ${profile.name || profile.login}`;
  contactCopy.textContent = `Open collaboration channels for @${profile.login}.`;

  const links = [];
  links.push({ label: 'GitHub Profile', href: profile.html_url });

  if (profile.blog) {
    links.push({ label: 'Website', href: ensureLink(profile.blog) });
  }

  if (profile.twitter_username) {
    links.push({ label: 'X/Twitter', href: `https://x.com/${profile.twitter_username}` });
  }

  if (profile.email) {
    links.push({ label: 'Email', href: `mailto:${profile.email}` });
  }

  socials.forEach((account) => {
    if (!account?.provider || !account?.url) {
      return;
    }

    const exists = links.some((item) => item.href === account.url);
    if (!exists) {
      links.push({ label: account.provider, href: account.url });
    }
  });

  connectLinks.innerHTML = '';
  links.slice(0, 8).forEach((item) => {
    const anchor = document.createElement('a');
    anchor.href = item.href;
    anchor.textContent = item.label;
    if (!item.href.startsWith('mailto:')) {
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
    }
    connectLinks.append(anchor);
  });
}

function renderRepoAnalytics(repos) {
  const totals = repos.reduce(
    (acc, repo) => {
      acc.stars += repo.stargazers_count || 0;
      acc.forks += repo.forks_count || 0;
      return acc;
    },
    { stars: 0, forks: 0 }
  );

  const starsNode = document.querySelector('[data-metric="stars"]');
  const forksNode = document.querySelector('[data-metric="forks"]');

  starsNode.textContent = totals.stars.toLocaleString();
  forksNode.textContent = totals.forks.toLocaleString();
}

function renderLanguageShare(repos) {
  languageShare.innerHTML = '';

  const languageCount = new Map();
  repos.forEach((repo) => {
    if (!repo.language) return;
    languageCount.set(repo.language, (languageCount.get(repo.language) || 0) + 1);
  });

  const rows = [...languageCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const total = rows.reduce((sum, [, count]) => sum + count, 0);

  if (!rows.length) {
    languageShare.innerHTML = '<p class="muted">Language share unavailable for this profile.</p>';
    return;
  }

  rows.forEach(([language, count]) => {
    const percentage = Math.round((count / total) * 100);
    const row = document.createElement('div');
    row.className = 'lang-row';
    row.innerHTML = `
      <span class="lang-name">${language}</span>
      <div class="lang-track"><div class="lang-fill" style="width: ${percentage}%"></div></div>
      <span class="lang-value">${percentage}%</span>
    `;
    languageShare.append(row);
  });
}

function renderPinnedList(items) {
  pinnedList.innerHTML = '';

  if (!items.length) {
    pinnedSubtitle.textContent = 'No pinned/featured repositories available.';
    pinnedList.innerHTML = '<p class="muted">Pinned feed is empty.</p>';
    return;
  }

  pinnedSubtitle.textContent = 'Featured repositories from public profile data.';

  items.slice(0, 4).forEach((repo) => {
    const card = document.createElement('article');
    card.className = 'pinned-card';
    card.innerHTML = `
      <h4><a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a></h4>
      <p>${repo.description || 'No description provided.'}</p>
      <p class="repo-meta">★ ${repo.stars || 0} · ${repo.primaryLanguage || 'Mixed stack'}</p>
    `;
    pinnedList.append(card);
  });
}

function renderSkillCloud(repos) {
  skillCloud.innerHTML = '';

  const languageCount = new Map();
  const topicCount = new Map();

  repos.forEach((repo) => {
    if (repo.language) {
      languageCount.set(repo.language, (languageCount.get(repo.language) || 0) + 1);
    }

    if (Array.isArray(repo.topics)) {
      repo.topics.forEach((topic) => {
        topicCount.set(topic, (topicCount.get(topic) || 0) + 1);
      });
    }
  });

  const topLanguages = [...languageCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => `${name} (${count})`);

  const topTopics = [...topicCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => `${name} (${count})`);

  const chips = [...topLanguages, ...topTopics].slice(0, 10);

  if (!chips.length) {
    const empty = document.createElement('span');
    empty.className = 'empty-chip';
    empty.textContent = 'No language/topic metadata detected yet.';
    skillCloud.append(empty);
    skillSummary.textContent = 'Add languages or topics in repositories to enrich this section.';
    return;
  }

  chips.forEach((chip) => {
    const span = document.createElement('span');
    span.textContent = chip;
    skillCloud.append(span);
  });

  skillSummary.textContent = `Generated from ${repos.length} public repositories for @${currentUser}.`;
}

function hydrateProfile(profile) {
  const displayName = profile.name || profile.login;
  const displayBio = profile.bio || `GitHub developer profile for @${profile.login}.`;
  const joined = compactDate(profile.created_at);

  document.title = `${displayName} | Futuristic Portfolio`;
  heroName.textContent = displayName;
  heroBio.textContent = displayBio;
  aboutBio.textContent = displayBio;

  heroMeta.innerHTML = '';
  [
    `@${profile.login}`,
    profile.location || 'Location not listed',
    `GitHub since ${joined}`,
  ].forEach((chip) => {
    const span = document.createElement('span');
    span.textContent = chip;
    heroMeta.append(span);
  });

  setProfileField('location', profile.location);
  setProfileField('company', profile.company);
  setProfileField('blog', profile.blog, true);

  document.querySelector('[data-stat="followers"]').textContent = profile.followers;
  document.querySelector('[data-stat="repos"]').textContent = profile.public_repos;
  document.querySelector('[data-stat="following"]').textContent = profile.following;

  const profileUrl = profile.html_url;
  githubLink.href = profileUrl;
  allReposLink.href = `${profileUrl}?tab=repositories`;
  contactGithub.href = profileUrl;

  const hasPublicEmail = Boolean(profile.email);
  if (hasPublicEmail) {
    const mailto = `mailto:${profile.email}`;
    contactCta.href = mailto;
    contactMail.href = mailto;
    contactMail.textContent = 'Email';
    contactCopy.textContent = 'Public email detected. Reach out directly or open the GitHub profile.';
  } else {
    contactCta.href = profileUrl;
    contactMail.href = profileUrl;
    contactMail.textContent = 'GitHub Contact';
    contactCopy.textContent = 'No public email available. Use the GitHub profile to connect.';
  }
}

function renderRepositories(repos) {
  const featuredRepos = [...repos]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    })
    .slice(0, 4);

  repoList.innerHTML = '';

  if (!featuredRepos.length) {
    repoSubtitle.textContent = 'No public repositories found for this profile.';
    repoList.innerHTML = '<p class="muted">Repository feed is empty.</p>';
    return;
  }

  repoSubtitle.textContent = `Showing top ${featuredRepos.length} repositories by stars and activity.`;

  featuredRepos.forEach((repo) => {
    const card = document.createElement('article');
    card.className = 'repo-card';
    card.innerHTML = `
      <h3><a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a></h3>
      <p>${repo.description || 'No description provided.'}</p>
      <p class="repo-meta">★ ${repo.stargazers_count} · ${repo.language || 'No primary language'} · Updated ${compactDate(repo.updated_at)}</p>
    `;
    repoList.append(card);
  });
}

function renderFallbackPinnedFromRepos(repos) {
  const featured = [...repos]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    })
    .slice(0, 4)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      primaryLanguage: repo.language,
    }));

  renderPinnedList(featured);
}

const dots = pages.map((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'dot';
  dot.setAttribute('aria-label', `Go to page ${index + 1}`);
  dot.addEventListener('click', () => goToPage(index));
  dotsRoot.append(dot);
  return dot;
});

function renderPages() {
  pages.forEach((page, index) => {
    page.classList.remove('past', 'active', 'future');
    if (index < activePage) {
      page.classList.add('past');
    } else if (index > activePage) {
      page.classList.add('future');
    } else {
      page.classList.add('active');
    }
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activePage);
  });
}

function goToPage(index) {
  if (isAnimating || index === activePage || index < 0 || index >= pages.length) {
    return;
  }

  isAnimating = true;
  activePage = index;
  renderPages();

  window.setTimeout(() => {
    isAnimating = false;
  }, 920);
}

function nextPage() {
  goToPage(Math.min(activePage + 1, pages.length - 1));
}

function previousPage() {
  goToPage(Math.max(activePage - 1, 0));
}

function addAiLine(speaker, text) {
  const line = document.createElement('p');
  line.className = 'ai-line';
  line.innerHTML = `<strong>${speaker}:</strong> ${text}`;
  aiLog.append(line);
  aiLog.scrollTop = aiLog.scrollHeight;
}

async function setActiveUser(username) {
  const sanitized = (username || '').trim().replace(/^@/, '');
  if (!sanitized) {
    addAiLine('AI', 'Please provide a valid GitHub username.');
    return;
  }

  currentUser = sanitized;
  profileInput.value = sanitized;
  localStorage.setItem('portfolio.githubUser', sanitized);

  const url = new URL(window.location.href);
  url.searchParams.set('user', sanitized);
  window.history.replaceState({}, '', url);

  await loadGithubData();
}

function runAiCommand(rawPrompt) {
  const prompt = rawPrompt.toLowerCase().trim();

  if (!prompt) {
    addAiLine('AI', 'No command detected. Try: set user octocat.');
    return;
  }

  if (prompt.includes('set user') || prompt.includes('load user') || prompt.includes('switch user')) {
    const username = rawPrompt.split(/set user|load user|switch user/i)[1]?.trim();
    if (!username) {
      addAiLine('AI', 'Usage: set user <github-username>');
      return;
    }
    setActiveUser(username);
    addAiLine('AI', `Switching profile to @${username.replace(/^@/, '')}.`);
    return;
  }

  if (prompt.includes('go to')) {
    if (prompt.includes('home')) goToPage(0);
    else if (prompt.includes('about')) goToPage(1);
    else if (prompt.includes('project')) goToPage(2);
    else if (prompt.includes('skill')) goToPage(3);
    else if (prompt.includes('ai')) goToPage(4);
    addAiLine('AI', 'Navigation command executed.');
    return;
  }

  if (prompt.includes('open github')) {
    const target = profileCache?.html_url || `https://github.com/${currentUser}`;
    window.open(target, '_blank', 'noopener,noreferrer');
    addAiLine('AI', 'GitHub profile opened in a new tab.');
    return;
  }

  if (prompt.includes('contact') || prompt.includes('email')) {
    goToPage(4);
    if (profileCache?.email) {
      window.open(`mailto:${profileCache.email}`);
      addAiLine('AI', 'Public email channel initiated.');
    } else {
      window.open(profileCache?.html_url || `https://github.com/${currentUser}`, '_blank', 'noopener,noreferrer');
      addAiLine('AI', 'Public email unavailable. Opened GitHub profile for contact.');
    }
    return;
  }

  if (prompt.includes('summarize') || prompt.includes('profile')) {
    if (!profileCache) {
      addAiLine('AI', 'Profile data is still syncing. Try again in a second.');
      return;
    }

    const summary = `${profileCache.name || profileCache.login} has ${profileCache.public_repos} public repositories, ${profileCache.followers} followers, and follows ${profileCache.following}.`;
    addAiLine('AI', summary);
    return;
  }

  addAiLine('AI', 'Suggested commands: set user <name>, summarize profile, open github, go to projects.');
}

let wheelTimeout = null;
window.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault();

    if (wheelTimeout) {
      return;
    }

    if (event.deltaY > 0) {
      nextPage();
    } else if (event.deltaY < 0) {
      previousPage();
    }

    wheelTimeout = window.setTimeout(() => {
      wheelTimeout = null;
    }, 180);
  },
  { passive: false }
);

window.addEventListener('keydown', (event) => {
  const target = event.target;
  const isTypingTarget =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target?.isContentEditable;

  if (isTypingTarget) {
    return;
  }

  if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    nextPage();
  }

  if (event.key === 'ArrowUp' || event.key === 'PageUp') {
    event.preventDefault();
    previousPage();
  }
});

let touchStartY = 0;
window.addEventListener('touchstart', (event) => {
  touchStartY = event.changedTouches[0].screenY;
});

window.addEventListener('touchend', (event) => {
  const touchEndY = event.changedTouches[0].screenY;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) < 40) {
    return;
  }

  if (diff > 0) {
    nextPage();
  } else {
    previousPage();
  }
});

if (nextBtn) {
  nextBtn.addEventListener('click', nextPage);
}

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = profileInput.value;
  addAiLine('You', `set user ${username}`);
  await setActiveUser(username);
});

aiForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const prompt = aiInput.value;
  addAiLine('You', prompt);
  runAiCommand(prompt);
  aiInput.value = '';
});

async function loadGithubData() {
  try {
    heroName.textContent = `Loading @${currentUser}...`;
    repoSubtitle.textContent = 'Syncing repositories and profile metadata...';

    const profileResponse = await fetch(`https://api.github.com/users/${currentUser}`);
    if (!profileResponse.ok) {
      throw new Error('Profile API returned an error');
    }

    const profile = await profileResponse.json();
    profileCache = profile;
    hydrateProfile(profile);

    let socialAccounts = [];
    try {
      const socialsResponse = await fetch(`https://api.github.com/users/${currentUser}/social_accounts`);
      if (socialsResponse.ok) {
        socialAccounts = await socialsResponse.json();
      }
    } catch (socialError) {
      socialAccounts = [];
    }

    socialAccountsCache = socialAccounts;

    renderProfileLinks(profile, socialAccounts);
    renderConnectSection(profile, socialAccounts);

    const repoResponse = await fetch(
      `https://api.github.com/users/${currentUser}/repos?sort=updated&per_page=100`
    );
    if (!repoResponse.ok) {
      throw new Error('Repository API returned an error');
    }

    reposCache = await repoResponse.json();
    renderRepoAnalytics(reposCache);
    renderRepositories(reposCache);
    renderLanguageShare(reposCache);
    renderSkillCloud(reposCache);

    renderFallbackPinnedFromRepos(reposCache);

    addAiLine('AI', `Sync complete. Live GitHub data loaded for @${currentUser}.`);
  } catch (error) {
    repoSubtitle.textContent = 'Profile sync failed. Check username or API rate limits.';
    repoList.innerHTML = '<p class="muted">No data available at the moment.</p>';
    pinnedSubtitle.textContent = 'Pinned feed unavailable.';
    pinnedList.innerHTML = '<p class="muted">No pinned data available at the moment.</p>';
    profileLinks.innerHTML = '';
    renderConnectSection(null, []);
    languageShare.innerHTML = '<p class="muted">Language share unavailable.</p>';
    document.querySelector('[data-metric="stars"]').textContent = '--';
    document.querySelector('[data-metric="forks"]').textContent = '--';
    skillCloud.innerHTML = '<span class="empty-chip">No data available at the moment.</span>';
    skillSummary.textContent = 'Try another username or wait for GitHub API cooldown.';
    addAiLine('AI', `Failed to load @${currentUser}. Verify username and try again.`);
  }
}

function initSpaceField() {
  const canvas = document.getElementById('space-canvas');
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let stars = [];
  const starCount = 240;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const star of stars) {
      star.z -= 6;
      if (star.z <= 1) {
        star.x = (Math.random() - 0.5) * width;
        star.y = (Math.random() - 0.5) * height;
        star.z = width;
      }

      const perspective = 420 / star.z;
      const sx = star.x * perspective + width / 2;
      const sy = star.y * perspective + height / 2;
      const radius = Math.max(0.5, 1.6 * perspective);

      if (sx < 0 || sx > width || sy < 0 || sy > height) {
        continue;
      }

      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(113, 223, 255, ${Math.min(1, perspective * 2)})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

renderPages();
addAiLine('AI', 'Neural assistant online. Use: set user <github-username>.');
profileInput.value = currentUser;
loadGithubData();
initSpaceField();
