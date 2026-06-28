/**
 * Typisierte Datenmodelle fuer die Expertenbefragung zur
 * Gewichtung von Bewertungskriterien (Bachelorarbeit).
 */
import { FormControl, FormGroup } from '@angular/forms';

/** Anzahl der je Anwendungsfall zu verteilenden Punkte. */
export const POINTS_PER_APP = 100;

/** Ein Bewertungskriterium fuer die Framework-Auswahl. */
export interface Criterion {
  /** Stabiler Schluessel (FormControl-Name, JSON-Key). */
  readonly id: string;
  /** Anzeigename des Kriteriums. */
  readonly name: string;
  /** Kurzbeschreibung (Hilfetext). */
  readonly description: string;
  /**
   * Ankerpunkt-Hinweis: erklaert kurz, wann dieses Kriterium viele
   * bzw. wenige Punkte erhalten sollte (grobe Orientierung).
   */
  readonly scaleHint?: string;
}

/** Ein zu bewertender Anwendungsfall (App / Szenario). */
export interface AppScenario {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
}

/** Punkte je Kriterium (Kriterium-id -> Punkte). */
export type Weights = Record<string, number>;

/** Eine vom Experten abgegebene Gewichtung fuer einen Anwendungsfall. */
export interface AppWeighting {
  appId: string;
  appTitle: string;
  /** Punkte je Kriterium (Summe soll genau 100 ergeben). */
  weights: Weights;
  /** Summe der vergebenen Punkte. */
  total: number;
  /** Optionale Begruendung der Schwerpunktsetzung fuer diesen Fall. */
  justification: string;
}

/** Gesamtes Befragungsergebnis (Wurzelobjekt fuer den JSON-Export). */
export interface SurveyResult {
  expertName: string;
  /** ISO-Zeitstempel der Abgabe. */
  submittedAt: string;
  /** Pflicht-Gesamtbegruendung der Schwerpunktsetzung. */
  overallJustification: string;
  weightings: AppWeighting[];
}

/**
 * Stark typisierte FormGroup fuer die Gewichtung eines Anwendungsfalls.
 * - `weights`: dynamische Gruppe mit je einem Punkte-Control pro Kriterium.
 * - `justification`: optionale Begruendung fuer diesen Fall.
 */
export type WeightingForm = FormGroup<{
  weights: FormGroup<Record<string, FormControl<number>>>;
  justification: FormControl<string>;
}>;
