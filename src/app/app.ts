import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { SkillsPageComponent } from './components/skills-page/skills-page.component';
import { AiLabPageComponent } from './components/ai-lab-page/ai-lab-page.component';
import { PageDotsComponent } from './components/page-dots/page-dots.component';
import {
  GithubEvent,
  GithubProfile,
  GithubRepo,
  GithubService,
  GithubSocialAccount,
} from './github.service';

@Component({
  selector: 'app-root',
  imports: [
    HomePageComponent,
    AboutPageComponent,
    ProjectsPageComponent,
    SkillsPageComponent,
    AiLabPageComponent,
    PageDotsComponent,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('spaceCanvas', { static: true })
  protected readonly spaceCanvas?: ElementRef<HTMLCanvasElement>;

  private readonly githubService = inject(GithubService);

  private readonly autoRefreshMs = 90_000;
  private readonly pageCount = 5;
  private readonly wheelThreshold = 85;
  private readonly wheelLockMs = 950;
  private clockIntervalId?: ReturnType<typeof setInterval>;
  private countdownIntervalId?: ReturnType<typeof setInterval>;
  private autoRefreshIntervalId?: ReturnType<typeof setInterval>;
  private wheelAccumulator = 0;
  private wheelLockedUntil = 0;
  private touchStartY = 0;
  private animationFrameId?: number;

  protected readonly pages = [
    { index: 0, id: 'home', title: 'Home' },
    { index: 1, id: 'about', title: 'About' },
    { index: 2, id: 'projects', title: 'Projects' },
    { index: 3, id: 'skills', title: 'Stack' },
    { index: 4, id: 'ai-lab', title: 'AI Lab' },
  ];

  protected readonly currentUser = signal(this.getInitialUser());
  protected profileInput = this.currentUser();
  protected aiInput = '';

  protected readonly activePage = signal(0);
  protected readonly isAnimating = signal(false);
  protected readonly isSyncing = signal(false);
  protected readonly hasLoadedProfile = signal(false);
  protected readonly nextRefreshAt = signal<number | null>(null);

  protected readonly liveState = signal('Waiting for sync');
  protected readonly liveTime = signal('--:--:--');
  protected readonly refreshCountdown = signal('Next refresh: --s');

  protected readonly profile = signal<GithubProfile | null>(null);
  protected readonly repos = signal<GithubRepo[]>([]);
  protected readonly socialAccounts = signal<GithubSocialAccount[]>([]);
  protected readonly events = signal<GithubEvent[]>([]);
  protected readonly aiLog = signal<Array<{ speaker: string; text: string }>>([]);

  protected readonly displayName = computed(() => {
    if (this.isSyncing() && !this.hasLoadedProfile()) {
      return `Loading @${this.currentUser()}...`;
    }

    const profile = this.profile();
    return profile?.name || profile?.login || 'Loading Profile...';
  });

  protected readonly displayBio = computed(() => {
    const profile = this.profile();
    return profile?.bio || 'Syncing GitHub profile intelligence.';
  });

  protected readonly heroMeta = computed(() => {
    const profile = this.profile();
    if (!profile) {
      return [];
    }

    return [
      `@${profile.login}`,
      profile.location || 'Location not listed',
      `GitHub since ${this.compactDate(profile.created_at)}`,
    ];
  });

  protected readonly stats = computed(() => {
    const profile = this.profile();
    return {
      followers: profile?.followers ?? null,
      repos: profile?.public_repos ?? null,
      following: profile?.following ?? null,
    };
  });

  protected readonly profileLinks = computed(() => {
    const profile = this.profile();
    if (!profile) {
      return [] as Array<{ label: string; href: string }>;
    }

    const links: Array<{ label: string; href: string }> = [{ label: 'GitHub', href: profile.html_url }];

    if (profile.blog) {
      links.push({ label: 'Website', href: this.ensureLink(profile.blog) });
    }

    if (profile.twitter_username) {
      links.push({ label: 'X/Twitter', href: `https://x.com/${profile.twitter_username}` });
    }

    if (profile.email) {
      links.push({ label: 'Email', href: `mailto:${profile.email}` });
    }

    this.socialAccounts().forEach((account) => {
      if (!account.provider || !account.url) {
        return;
      }

      const exists = links.some((item) => item.href === account.url);
      if (!exists) {
        links.push({ label: account.provider, href: account.url });
      }
    });

    return links;
  });

  protected readonly featuredRepos = computed(() => {
    return [...this.repos()]
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .slice(0, 4);
  });

  protected readonly pinnedRepos = computed(() => {
    return this.featuredRepos().map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      primaryLanguage: repo.language,
    }));
  });

  protected readonly repoMetrics = computed(() => {
    return this.repos().reduce(
      (acc, repo) => {
        acc.stars += repo.stargazers_count || 0;
        acc.forks += repo.forks_count || 0;
        return acc;
      },
      { stars: 0, forks: 0 }
    );
  });

  protected readonly languageRows = computed(() => {
    const languageCount = new Map<string, number>();

    this.repos().forEach((repo) => {
      if (!repo.language) {
        return;
      }
      languageCount.set(repo.language, (languageCount.get(repo.language) || 0) + 1);
    });

    const rows = [...languageCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
    const total = rows.reduce((sum, [, count]) => sum + count, 0);

    return rows.map(([language, count]) => ({
      language,
      percentage: total ? Math.round((count / total) * 100) : 0,
    }));
  });

  protected readonly skillChips = computed(() => {
    const languageCount = new Map<string, number>();
    const topicCount = new Map<string, number>();

    this.repos().forEach((repo) => {
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

    return [...topLanguages, ...topTopics].slice(0, 10);
  });

  protected readonly connectLinks = computed(() => this.profileLinks().slice(0, 8));

  protected readonly profileUrl = computed(() => {
    const profile = this.profile();
    return profile?.html_url || `https://github.com/${this.currentUser()}`;
  });

  protected readonly allReposUrl = computed(() => `${this.profileUrl()}?tab=repositories`);

  protected readonly contactTitle = computed(() => {
    const profile = this.profile();
    if (!profile) {
      return 'Connect & Collaborate';
    }
    return `Connect with ${profile.name || profile.login}`;
  });

  protected readonly contactCopy = computed(() => {
    const profile = this.profile();
    if (!profile) {
      return 'Loading profile contact channels...';
    }

    if (profile.email) {
      return 'Public email detected. Reach out directly or open the GitHub profile.';
    }

    return 'No public email available. Use the GitHub profile to connect.';
  });

  protected readonly contactMailHref = computed(() => {
    const profile = this.profile();
    if (profile?.email) {
      return `mailto:${profile.email}`;
    }

    return this.profileUrl();
  });

  protected readonly contactMailLabel = computed(() => {
    const profile = this.profile();
    return profile?.email ? 'Email' : 'GitHub Contact';
  });

  protected readonly repoSubtitle = computed(() => {
    if (this.isSyncing() && !this.hasLoadedProfile()) {
      return 'Syncing repositories and profile metadata...';
    }

    const count = this.featuredRepos().length;
    if (!count) {
      return 'Waiting for profile selection.';
    }

    return `Showing top ${count} repositories by stars and activity.`;
  });

  protected readonly pinnedSubtitle = computed(() => {
    return this.pinnedRepos().length
      ? 'Featured repositories from public profile data.'
      : 'Waiting for profile selection.';
  });

  protected readonly activitySubtitle = computed(() => {
    return this.events().length
      ? 'Latest public GitHub events (live feed).'
      : 'Waiting for profile selection.';
  });

  protected readonly skillSummary = computed(() => {
    if (!this.skillChips().length) {
      return 'Top languages and technologies will render from repositories.';
    }
    return `Generated from ${this.repos().length} public repositories for @${this.currentUser()}.`;
  });

  ngOnInit(): void {
    this.syncPageFromHash();
    this.addAiLine('AI', 'Neural assistant online. Use: set user <github-username>.');
    this.updateClock();
    this.updateRefreshCountdown();

    this.clockIntervalId = setInterval(() => this.updateClock(), 1000);
    this.countdownIntervalId = setInterval(() => this.updateRefreshCountdown(), 1000);
    this.autoRefreshIntervalId = setInterval(() => {
      if (!document.hidden) {
        void this.loadGithubData(false);
      }
    }, this.autoRefreshMs);

    void this.loadGithubData(true);
  }

  ngAfterViewInit(): void {
    this.initSpaceField();
  }

  ngOnDestroy(): void {
    if (this.clockIntervalId) {
      clearInterval(this.clockIntervalId);
    }
    if (this.countdownIntervalId) {
      clearInterval(this.countdownIntervalId);
    }
    if (this.autoRefreshIntervalId) {
      clearInterval(this.autoRefreshIntervalId);
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  protected goToPage(index: number): void {
    if (this.isAnimating() || index === this.activePage() || index < 0 || index >= this.pageCount) {
      return;
    }

    this.isAnimating.set(true);
    this.activePage.set(index);
    this.updateLocationHash(index);

    setTimeout(() => this.isAnimating.set(false), 920);
  }

  protected nextPage(): void {
    this.goToPage(Math.min(this.activePage() + 1, this.pageCount - 1));
  }

  protected previousPage(): void {
    this.goToPage(Math.max(this.activePage() - 1, 0));
  }

  protected async onProfileSubmit(event?: Event): Promise<void> {
    event?.preventDefault();
    const username = this.profileInput;
    this.addAiLine('You', `set user ${username}`);
    await this.setActiveUser(username, true);
  }

  protected async onAiSubmit(event?: Event): Promise<void> {
    event?.preventDefault();
    const prompt = this.aiInput;
    this.addAiLine('You', prompt);
    await this.runAiCommand(prompt);
    this.aiInput = '';
  }

  @HostListener('window:wheel', ['$event'])
  protected onWheel(event: WheelEvent): void {
    if (event.defaultPrevented || this.shouldPreserveInnerScroll(event)) {
      return;
    }

    const now = Date.now();
    if (now < this.wheelLockedUntil) {
      return;
    }

    if (Math.abs(event.deltaY) < 4) {
      return;
    }

    this.wheelAccumulator += event.deltaY;

    if (Math.abs(this.wheelAccumulator) < this.wheelThreshold) {
      return;
    }

    if (this.wheelAccumulator > 0) {
      this.nextPage();
    } else {
      this.previousPage();
    }

    this.wheelAccumulator = 0;
    this.wheelLockedUntil = now + this.wheelLockMs;
  }

  @HostListener('window:keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    const isTypingTarget =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      Boolean(target?.isContentEditable);

    if (isTypingTarget) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      this.nextPage();
    }

    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      this.previousPage();
    }
  }

  @HostListener('window:touchstart', ['$event'])
  protected onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.changedTouches[0].screenY;
  }

  @HostListener('window:touchend', ['$event'])
  protected onTouchEnd(event: TouchEvent): void {
    const touchEndY = event.changedTouches[0].screenY;
    const diff = this.touchStartY - touchEndY;

    if (Math.abs(diff) < 40) {
      return;
    }

    if (diff > 0) {
      this.nextPage();
    } else {
      this.previousPage();
    }
  }

  @HostListener('window:hashchange')
  protected onHashChange(): void {
    this.syncPageFromHash();
  }

  protected formatDateTime(rawDate: string): string {
    if (!rawDate) {
      return 'unknown time';
    }

    const date = new Date(rawDate);
    return date.toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      month: 'short',
      day: 'numeric',
    });
  }

  protected compactDate(rawDate: string): string {
    if (!rawDate) {
      return 'unknown date';
    }

    const date = new Date(rawDate);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
  }

  protected humanizeEvent(event: GithubEvent): string {
    const repoName = event.repo?.name || 'repository';

    if (event.type === 'PushEvent') {
      const commitCount = event.payload?.commits?.length || 0;
      return `Pushed ${commitCount} commit${commitCount === 1 ? '' : 's'} to ${repoName}`;
    }

    if (event.type === 'CreateEvent') {
      const refType = event.payload?.ref_type || 'resource';
      return `Created ${refType} in ${repoName}`;
    }

    if (event.type === 'PullRequestEvent') {
      const action = event.payload?.action || 'updated';
      return `${action} pull request in ${repoName}`;
    }

    if (event.type === 'IssuesEvent') {
      const action = event.payload?.action || 'updated';
      return `${action} issue in ${repoName}`;
    }

    if (event.type === 'WatchEvent') {
      return `Star activity on ${repoName}`;
    }

    return `${event.type.replace('Event', '')} activity on ${repoName}`;
  }

  private addAiLine(speaker: string, text: string): void {
    if (!text.trim()) {
      return;
    }

    this.aiLog.update((current) => [...current, { speaker, text }]);
  }

  private ensureLink(urlOrText: string): string {
    if (!urlOrText) {
      return '';
    }

    if (urlOrText.startsWith('http://') || urlOrText.startsWith('https://') || urlOrText.startsWith('mailto:')) {
      return urlOrText;
    }

    return `https://${urlOrText}`;
  }

  private shouldPreserveInnerScroll(event: WheelEvent): boolean {
    const target = event.target;
    if (!(target instanceof Element)) {
      return false;
    }

    return this.hasScrollableAncestor(target, event.deltaY);
  }

  private hasScrollableAncestor(start: Element, deltaY: number): boolean {
    let current: HTMLElement | null = start instanceof HTMLElement ? start : start.parentElement;

    while (current && current !== document.body) {
      if (this.canScrollVertically(current, deltaY)) {
        return true;
      }

      current = current.parentElement;
    }

    return false;
  }

  private canScrollVertically(element: HTMLElement, deltaY: number): boolean {
    const styles = window.getComputedStyle(element);
    const overflowY = styles.overflowY;
    const isScrollable = (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay')
      && element.scrollHeight > element.clientHeight + 1;

    if (!isScrollable) {
      return false;
    }

    if (deltaY > 0) {
      return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
    }

    if (deltaY < 0) {
      return element.scrollTop > 1;
    }

    return false;
  }

  private syncPageFromHash(): void {
    const index = this.getPageIndexFromHash(window.location.hash);
    if (index === null || index === this.activePage()) {
      return;
    }

    this.activePage.set(index);
  }

  private getPageIndexFromHash(hash: string): number | null {
    const normalized = hash.replace(/^#/, '').trim().toLowerCase();
    if (!normalized) {
      return null;
    }

    const index = this.pages.findIndex((page) => page.id.toLowerCase() === normalized);
    return index >= 0 ? index : null;
  }

  private updateLocationHash(index: number): void {
    const page = this.pages[index];
    if (!page) {
      return;
    }

    const nextHash = `#${page.id}`;
    if (window.location.hash === nextHash) {
      return;
    }

    window.history.replaceState(null, '', nextHash);
  }

  private getInitialUser(): string {
    const queryUser = new URLSearchParams(window.location.search).get('user');
    const storedUser = localStorage.getItem('portfolio.githubUser');
    return queryUser || storedUser || 'Ketan-K';
  }

  private setLiveState(message: string): void {
    this.liveState.set(message);
  }

  private updateClock(): void {
    this.liveTime.set(new Date().toLocaleTimeString());
  }

  private updateRefreshCountdown(): void {
    const nextRefreshAt = this.nextRefreshAt();
    if (!nextRefreshAt) {
      this.refreshCountdown.set('Next refresh: --s');
      return;
    }

    const seconds = Math.max(0, Math.ceil((nextRefreshAt - Date.now()) / 1000));
    this.refreshCountdown.set(`Next refresh: ${seconds}s`);
  }

  private scheduleNextRefresh(): void {
    this.nextRefreshAt.set(Date.now() + this.autoRefreshMs);
  }

  private async setActiveUser(username: string, fullLoading: boolean): Promise<void> {
    const sanitized = (username || '').trim().replace(/^@/, '');
    if (!sanitized) {
      this.addAiLine('AI', 'Please provide a valid GitHub username.');
      return;
    }

    this.currentUser.set(sanitized);
    this.profileInput = sanitized;
    localStorage.setItem('portfolio.githubUser', sanitized);

    const url = new URL(window.location.href);
    url.searchParams.set('user', sanitized);
    window.history.replaceState({}, '', url);

    await this.loadGithubData(fullLoading);
  }

  private async runAiCommand(rawPrompt: string): Promise<void> {
    const prompt = rawPrompt.toLowerCase().trim();

    if (!prompt) {
      this.addAiLine('AI', 'No command detected. Try: set user octocat.');
      return;
    }

    if (prompt.includes('set user') || prompt.includes('load user') || prompt.includes('switch user')) {
      const username = rawPrompt.split(/set user|load user|switch user/i)[1]?.trim();
      if (!username) {
        this.addAiLine('AI', 'Usage: set user <github-username>');
        return;
      }

      await this.setActiveUser(username, true);
      this.addAiLine('AI', `Switching profile to @${username.replace(/^@/, '')}.`);
      return;
    }

    if (prompt.includes('go to')) {
      if (prompt.includes('home')) this.goToPage(0);
      else if (prompt.includes('about')) this.goToPage(1);
      else if (prompt.includes('project')) this.goToPage(2);
      else if (prompt.includes('skill')) this.goToPage(3);
      else if (prompt.includes('ai')) this.goToPage(4);

      this.addAiLine('AI', 'Navigation command executed.');
      return;
    }

    if (prompt.includes('open github')) {
      window.open(this.profileUrl(), '_blank', 'noopener,noreferrer');
      this.addAiLine('AI', 'GitHub profile opened in a new tab.');
      return;
    }

    if (prompt.includes('contact') || prompt.includes('email')) {
      this.goToPage(4);
      const profile = this.profile();
      if (profile?.email) {
        window.open(`mailto:${profile.email}`);
        this.addAiLine('AI', 'Public email channel initiated.');
      } else {
        window.open(this.profileUrl(), '_blank', 'noopener,noreferrer');
        this.addAiLine('AI', 'Public email unavailable. Opened GitHub profile for contact.');
      }
      return;
    }

    if (prompt.includes('summarize') || prompt.includes('profile')) {
      const profile = this.profile();
      if (!profile) {
        this.addAiLine('AI', 'Profile data is still syncing. Try again in a second.');
        return;
      }

      const summary = `${profile.name || profile.login} has ${profile.public_repos} public repositories, ${profile.followers} followers, and follows ${profile.following}.`;
      this.addAiLine('AI', summary);
      return;
    }

    this.addAiLine('AI', 'Suggested commands: set user <name>, summarize profile, open github, go to projects.');
  }

  private async loadGithubData(fullLoading: boolean): Promise<void> {
    try {
      this.isSyncing.set(true);
      this.setLiveState('Syncing live data...');

      const user = this.currentUser();
      const profile = await this.githubService.getProfile(user);
      this.profile.set(profile);
      document.title = `${profile.name || profile.login} | Futuristic Portfolio`;

      try {
        const socialAccounts = await this.githubService.getSocialAccounts(user);
        this.socialAccounts.set(socialAccounts);
      } catch {
        this.socialAccounts.set([]);
      }

      const repos = await this.githubService.getRepos(user);
      this.repos.set(repos);

      try {
        const events = await this.githubService.getEvents(user);
        this.events.set(events);
      } catch {
        this.events.set([]);
      }

      this.scheduleNextRefresh();
      this.setLiveState(`Live sync complete for @${user}`);
      this.isSyncing.set(false);
      this.hasLoadedProfile.set(true);

      if (fullLoading) {
        this.addAiLine('AI', `Sync complete. Live GitHub data loaded for @${user}.`);
      }
    } catch {
      this.isSyncing.set(false);
      this.setLiveState('Live sync error');
      this.profile.set(null);
      this.repos.set([]);
      this.socialAccounts.set([]);
      this.events.set([]);
      this.addAiLine('AI', `Failed to load @${this.currentUser()}. Verify username and try again.`);
    }
  }

  private initSpaceField(): void {
    const canvas = this.spaceCanvas?.nativeElement;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let stars: Array<{ x: number; y: number; z: number }> = [];
    const starCount = 240;

    const resize = (): void => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: starCount }, () => ({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: Math.random() * width,
      }));
    };

    const draw = (): void => {
      context.clearRect(0, 0, width, height);

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

        context.beginPath();
        context.arc(sx, sy, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(113, 223, 255, ${Math.min(1, perspective * 2)})`;
        context.fill();
      }

      this.animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();
  }
}
