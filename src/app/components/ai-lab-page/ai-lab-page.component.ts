import { Component, input, output } from '@angular/core';

export interface AiLogLine {
  speaker: string;
  text: string;
}

export interface ConnectLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-ai-lab-page',
  standalone: true,
  templateUrl: './ai-lab-page.component.html',
  styleUrl: './ai-lab-page.component.scss',
})
export class AiLabPageComponent {
  readonly isActive = input.required<boolean>();
  readonly isPast = input.required<boolean>();
  readonly isFuture = input.required<boolean>();
  readonly aiLog = input.required<AiLogLine[]>();
  readonly aiInput = input.required<string>();
  readonly contactTitle = input.required<string>();
  readonly contactCopy = input.required<string>();
  readonly contactMailHref = input.required<string>();
  readonly contactMailLabel = input.required<string>();
  readonly profileUrl = input.required<string>();
  readonly connectLinks = input.required<ConnectLink[]>();

  readonly aiInputChange = output<string>();
  readonly aiSubmit = output<void>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.aiInputChange.emit(target.value);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.aiSubmit.emit();
  }
}
