import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AppScenario,
  Criterion,
  POINTS_PER_APP,
  WeightingForm
} from '../../models/survey.model';

/**
 * Eine optisch abgegrenzte Karte fuer genau einen Anwendungsfall.
 * Der Experte verteilt hier 100 Punkte auf die sieben Kriterien.
 *
 * Die Karte ist rein praesentationsorientiert: Der Zustand lebt im
 * uebergebenen WeightingForm (Teil des Root-Formulars).
 */
@Component({
  selector: 'app-app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './app-card.html',
  styleUrl: './app-card.scss'
})
export class AppCard {
  /** Statische Beschreibung des Anwendungsfalls. */
  readonly app = input.required<AppScenario>();
  /** Laufende Nummer der Karte (1-basiert, fuer die Anzeige). */
  readonly index = input.required<number>();
  /** Liste der sieben Bewertungskriterien. */
  readonly criteria = input.required<readonly Criterion[]>();
  /** Typisierte FormGroup mit den Eingaben dieses Anwendungsfalls. */
  readonly form = input.required<WeightingForm>();

  /** Sollwert der Punktsumme (100). */
  protected readonly target = POINTS_PER_APP;

  /** Komfort-Zugriff auf die Begruendung. */
  protected readonly justification = computed(() => this.form().controls.justification);

  /**
   * Die folgenden Werte lesen den aktuellen Formularwert direkt aus.
   * Als getter (statt computed) implementiert, weil der Form-Wert kein
   * Signal ist; bei OnPush werden sie durch die Eingabe-Events dieser
   * Karte stets neu ausgewertet.
   */

  /** Aktuelle Summe der vergebenen Punkte. */
  protected get total(): number {
    const weights = this.form().controls.weights.value;
    return Object.values(weights).reduce<number>((sum, v) => sum + (Number(v) || 0), 0);
  }

  /** Noch zu vergebende Restpunkte (negativ bei Ueberschreitung). */
  protected get remaining(): number {
    return this.target - this.total;
  }

  /** Karte ist abgeschlossen, sobald die Summe exakt 100 ergibt. */
  protected get isComplete(): boolean {
    return this.total === this.target;
  }

  /** Hat der Nutzer mehr als 100 Punkte vergeben? */
  protected get isOver(): boolean {
    return this.total > this.target;
  }

  /** trackBy fuer die Kriterienliste. */
  protected trackByCriterion(_: number, c: Criterion): string {
    return c.id;
  }

  /** Prozentualer Anteil eines Kriteriums (fuer die Mini-Balken). */
  protected share(criterionId: string): number {
    const value = this.form().controls.weights.get(criterionId)?.value ?? 0;
    return Math.max(0, Math.min(100, value));
  }
}
