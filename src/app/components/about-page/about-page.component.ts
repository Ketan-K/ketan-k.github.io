import { Component, input } from '@angular/core';

export interface ProfileLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent {
  readonly isActive = input.required<boolean>();
  readonly isPast = input.required<boolean>();
  readonly isFuture = input.required<boolean>();
  readonly displayBio = input.required<string>();
  readonly location = input.required<string>();
  readonly company = input.required<string>();
  readonly website = input.required<string>();
  readonly profileLinks = input.required<ProfileLink[]>();
  readonly followers = input.required<number | string>();
  readonly repos = input.required<number | string>();
  readonly following = input.required<number | string>();
}
