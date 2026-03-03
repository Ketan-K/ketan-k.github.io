import { Component, input, output } from '@angular/core';

export interface DotPage {
  index: number;
  id: string;
}

@Component({
  selector: 'app-page-dots',
  standalone: true,
  templateUrl: './page-dots.component.html',
  styleUrl: './page-dots.component.scss',
})
export class PageDotsComponent {
  readonly pages = input.required<DotPage[]>();
  readonly activePage = input.required<number>();
  readonly goToPage = output<number>();
}
