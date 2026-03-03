import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  effect,
  input,
} from '@angular/core';

type AnimateNumberEffect = 'count' | 'scramble' | 'hybrid';

@Directive({
  selector: '[appAnimateNumber]',
  standalone: true,
})
export class AnimateNumberDirective implements OnDestroy {
  readonly appAnimateNumber = input<number | null | undefined>(null);
  readonly animateWhen = input<boolean>(true);
  readonly animateDuration = input<number>(700);
  readonly animateEffect = input<AnimateNumberEffect>('hybrid');
  readonly animateStartFrom = input<number | null>(0);
  readonly animateScrambleMs = input<number>(260);
  readonly animateScrambleRate = input<number>(1);
  readonly animateFallback = input<string>('--');

  private frameId?: number;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {
    effect(() => {
      const value = this.appAnimateNumber();
      const shouldAnimate = this.animateWhen();

      if (!shouldAnimate) {
        this.renderImmediate(value);
        return;
      }

      this.animateTo(value);
    });
  }

  ngOnDestroy(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  private animateTo(targetValue: number | null | undefined): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = undefined;
    }

    if (targetValue === null || targetValue === undefined || Number.isNaN(targetValue)) {
      this.setText(this.animateFallback());
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      this.setText(Math.round(targetValue).toLocaleString());
      return;
    }

    const end = Number(targetValue);
    const effect = this.animateEffect();
    const startFrom = this.resolveStartValue();

    if (effect === 'scramble') {
      this.runScrambleOnly(end);
      return;
    }

    if (effect === 'hybrid') {
      this.runHybrid(startFrom, end);
      return;
    }

    this.runCount(startFrom, end, Math.max(1, this.animateDuration()));
  }

  private renderImmediate(targetValue: number | null | undefined): void {
    if (targetValue === null || targetValue === undefined || Number.isNaN(targetValue)) {
      this.setText(this.animateFallback());
      return;
    }

    this.setText(Math.round(targetValue).toLocaleString());
  }

  private runHybrid(start: number, end: number): void {
    const totalDuration = Math.max(1, this.animateDuration());
    const scrambleDuration = Math.min(Math.max(0, this.animateScrambleMs()), Math.max(0, totalDuration - 80));
    const countDuration = Math.max(80, totalDuration - scrambleDuration);
    const startTime = performance.now();

    const tick = (now: number): void => {
      const elapsed = now - startTime;

      if (elapsed < scrambleDuration) {
        const progress = scrambleDuration ? elapsed / scrambleDuration : 1;
        const anchored = Math.round(start + (end - start) * progress);
        this.setText(this.scrambleNumberString(anchored));
        this.frameId = requestAnimationFrame(tick);
        return;
      }

      const countElapsed = elapsed - scrambleDuration;
      const progress = Math.min(1, countElapsed / countDuration);
      const eased = 1 - (1 - progress) * (1 - progress);
      const value = Math.round(start + (end - start) * eased);
      this.setText(value.toLocaleString());

      if (progress < 1) {
        this.frameId = requestAnimationFrame(tick);
      }
    };

    this.frameId = requestAnimationFrame(tick);
  }

  private runScrambleOnly(end: number): void {
    const duration = Math.max(1, this.animateDuration());
    const startTime = performance.now();

    const tick = (now: number): void => {
      const progress = Math.min(1, (now - startTime) / duration);
      if (progress < 1) {
        this.setText(this.scrambleNumberString(end));
        this.frameId = requestAnimationFrame(tick);
        return;
      }

      this.setText(end.toLocaleString());
    };

    this.frameId = requestAnimationFrame(tick);
  }

  private runCount(start: number, end: number, duration: number): void {
    const startTime = performance.now();

    const tick = (now: number): void => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - (1 - progress) * (1 - progress);
      const value = Math.round(start + (end - start) * eased);
      this.setText(value.toLocaleString());

      if (progress < 1) {
        this.frameId = requestAnimationFrame(tick);
      }
    };

    this.frameId = requestAnimationFrame(tick);
  }

  private resolveStartValue(): number {
    const configured = this.animateStartFrom();
    if (configured !== null && configured !== undefined) {
      return Number(configured);
    }

    const current = this.readCurrentNumber();
    return Number.isFinite(current) ? current : 0;
  }

  private scrambleNumberString(anchorValue: number): string {
    const anchorText = Math.abs(Math.round(anchorValue)).toLocaleString();
    let out = '';

    for (let index = 0; index < anchorText.length; index += 1) {
      const char = anchorText[index];
      if (/\d/.test(char)) {
        out += Math.random() < this.animateScrambleRate() ? String(Math.floor(Math.random() * 10)) : char;
      } else {
        out += char;
      }
    }

    return anchorValue < 0 ? `-${out}` : out;
  }

  private readCurrentNumber(): number {
    const raw = this.elementRef.nativeElement.textContent?.replace(/,/g, '').trim() || '0';
    return Number(raw);
  }

  private setText(value: string): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', value);
  }
}
