import { Component, input } from '@angular/core';
import { GithubEvent } from '../../github.service';

export interface FeaturedRepo {
  html_url: string;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  primaryLanguage: string | null;
}

@Component({
  selector: 'app-projects-page',
  standalone: true,
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
})
export class ProjectsPageComponent {
  readonly isActive = input.required<boolean>();
  readonly isPast = input.required<boolean>();
  readonly isFuture = input.required<boolean>();
  readonly totalStars = input.required<number | string>();
  readonly totalForks = input.required<number | string>();
  readonly repoSubtitle = input.required<string>();
  readonly featuredRepos = input.required<FeaturedRepo[]>();
  readonly pinnedSubtitle = input.required<string>();
  readonly pinnedRepos = input.required<PinnedRepo[]>();
  readonly activitySubtitle = input.required<string>();
  readonly events = input.required<GithubEvent[]>();
  readonly allReposUrl = input.required<string>();
  readonly compactDate = input.required<(rawDate: string) => string>();
  readonly humanizeEvent = input.required<(event: GithubEvent) => string>();
  readonly formatDateTime = input.required<(rawDate: string) => string>();
}
