import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface GithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string;
  html_url: string;
  email: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export interface GithubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
}

export interface GithubSocialAccount {
  provider: string;
  url: string;
}

export interface GithubEvent {
  type: string;
  created_at: string;
  repo?: {
    name?: string;
  };
  payload?: {
    commits?: unknown[];
    ref_type?: string;
    action?: string;
  };
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);

  getProfile(username: string): Promise<GithubProfile> {
    return firstValueFrom(this.http.get<GithubProfile>(`https://api.github.com/users/${username}`));
  }

  getRepos(username: string): Promise<GithubRepo[]> {
    return firstValueFrom(
      this.http.get<GithubRepo[]>(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    );
  }

  getSocialAccounts(username: string): Promise<GithubSocialAccount[]> {
    return firstValueFrom(
      this.http.get<GithubSocialAccount[]>(`https://api.github.com/users/${username}/social_accounts`)
    );
  }

  getEvents(username: string): Promise<GithubEvent[]> {
    return firstValueFrom(this.http.get<GithubEvent[]>(`https://api.github.com/users/${username}/events/public?per_page=10`));
  }
}
