import { Component, ElementRef, effect, input, signal, viewChild } from '@angular/core';
import { GithubEvent } from '../../github.service';
import { AnimateNumberDirective } from '../../directives/animate-number.directive';

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
  imports: [AnimateNumberDirective],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
})
export class ProjectsPageComponent {
  private readonly repoRail = viewChild<ElementRef<HTMLDivElement>>('repoRail');

  readonly isActive = input.required<boolean>();
  readonly isPast = input.required<boolean>();
  readonly isFuture = input.required<boolean>();
  readonly totalStars = input.required<number>();
  readonly totalForks = input.required<number>();
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

  protected readonly canScrollReposLeft = signal(false);
  protected readonly canScrollReposRight = signal(false);

  constructor() {
    effect(() => {
      this.featuredRepos();
      queueMicrotask(() => this.syncRepoScrollState());
    });
  }

  protected scrollRepos(direction: 'left' | 'right'): void {
    const rail = this.repoRail()?.nativeElement;
    if (!rail) {
      return;
    }

    const amount = Math.max(rail.clientWidth * 0.82, 280);
    rail.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });

    requestAnimationFrame(() => this.syncRepoScrollState());
  }

  protected onRepoScroll(): void {
    this.syncRepoScrollState();
  }

  protected onRepoWheel(event: WheelEvent): void {
    const rail = this.repoRail()?.nativeElement;
    if (!rail || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }

    rail.scrollBy({ left: event.deltaY, behavior: 'auto' });
    event.preventDefault();
    this.syncRepoScrollState();
  }

  private syncRepoScrollState(): void {
    const rail = this.repoRail()?.nativeElement;
    if (!rail) {
      this.canScrollReposLeft.set(false);
      this.canScrollReposRight.set(false);
      return;
    }

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    this.canScrollReposLeft.set(rail.scrollLeft > 4);
    this.canScrollReposRight.set(maxScrollLeft - rail.scrollLeft > 4);
  }
}
