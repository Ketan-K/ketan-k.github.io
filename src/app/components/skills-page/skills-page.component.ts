import { Component, input } from '@angular/core';
import { AnimateNumberDirective } from '../../directives/animate-number.directive';

export interface LanguageRow {
  language: string;
  percentage: number;
}

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [AnimateNumberDirective],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss',
})
export class SkillsPageComponent {
  readonly isActive = input.required<boolean>();
  readonly isPast = input.required<boolean>();
  readonly isFuture = input.required<boolean>();
  readonly languageRows = input.required<LanguageRow[]>();
  readonly skillChips = input.required<string[]>();
  readonly skillSummary = input.required<string>();
}
