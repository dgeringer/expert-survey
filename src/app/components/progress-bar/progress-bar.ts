import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Schlanke, praesentationsorientierte Fortschrittsanzeige.
 * Zeigt, wie viele der vier Apps bereits vollstaendig bewertet wurden.
 */
@Component({
  selector: 'app-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss'
})
export class ProgressBar {
  /** Anzahl vollstaendig bewerteter Apps. */
  readonly completed = input.required<number>();
  /** Gesamtzahl der Apps. */
  readonly total = input.required<number>();

  /** Fortschritt in Prozent (0&ndash;100), abgeleitet aus completed/total. */
  protected readonly percent = computed(() => {
    const total = this.total();
    if (total <= 0) {
      return 0;
    }
    return Math.round((this.completed() / total) * 100);
  });
}
