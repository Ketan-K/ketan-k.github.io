import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  readonly isActive = input.required<boolean>();
  readonly isPast = input.required<boolean>();
  readonly isFuture = input.required<boolean>();
  readonly displayName = input.required<string>();
  readonly displayBio = input.required<string>();
  readonly heroMeta = input.required<string[]>();
  readonly profileInput = input.required<string>();
  readonly profileUrl = input.required<string>();
  readonly contactMailHref = input.required<string>();
  readonly liveState = input.required<string>();
  readonly liveTime = input.required<string>();
  readonly refreshCountdown = input.required<string>();
  readonly showOffline = input.required<boolean>();

  readonly profileInputChange = output<string>();
  readonly profileSubmit = output<void>();
  readonly nextPage = output<void>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.profileInputChange.emit(target.value);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.profileSubmit.emit();
  }
}
