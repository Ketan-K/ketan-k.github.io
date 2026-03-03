import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { GithubService } from './github.service';

const githubServiceMock: Partial<GithubService> = {
  getProfile: async () => ({
    login: 'Ketan-K',
    name: 'Ketan',
    bio: 'Bio',
    location: null,
    company: null,
    blog: '',
    html_url: 'https://github.com/Ketan-K',
    email: null,
    twitter_username: null,
    followers: 0,
    following: 0,
    public_repos: 0,
    created_at: new Date().toISOString(),
  }),
  getRepos: async () => [],
  getSocialAccounts: async () => [],
  getEvents: async () => [],
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: GithubService, useValue: githubServiceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render hero heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Ketan');
  });
});
