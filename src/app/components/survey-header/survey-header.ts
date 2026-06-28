import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { THESIS } from '../../data/apps-data';

/**
 * Kopfbereich der Befragung: akademisches Impressum (Bachelorarbeit),
 * Einleitung, Ausfuellhinweise und das Pflichtfeld fuer Name/Rolle.
 *
 * Das Eingabefeld wird ueber ein typisiertes FormControl aus dem
 * Eltern-Formular gesteuert (Single Source of Truth bleibt im Root).
 */
@Component({
  selector: 'app-survey-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './survey-header.html',
  styleUrl: './survey-header.scss'
})
export class SurveyHeader {
  /** Pflichtfeld-Control fuer Name/Rolle des Experten. */
  readonly nameControl = input.required<FormControl<string>>();

  /** Statische Angaben zur Bachelorarbeit (Impressum). */
  protected readonly thesis = THESIS;
}
