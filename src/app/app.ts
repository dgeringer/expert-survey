import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { APP_SCENARIOS, CRITERIA, THESIS } from './data/apps-data';
import {
  AppWeighting,
  POINTS_PER_APP,
  SurveyResult,
  Weights,
  WeightingForm
} from './models/survey.model';
import { AppCard } from './components/app-card/app-card';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { SurveyHeader } from './components/survey-header/survey-header';

/**
 * EmailJS-Konfiguration.
 * Einmalige Einrichtung unter https://www.emailjs.com (kostenloser Account):
 *  1. Gmail-Dienst hinzufuegen  → SERVICE_ID kopieren
 *  2. E-Mail-Template anlegen  → TEMPLATE_ID kopieren
 *     Template-Variablen: {{to_email}}, {{subject}}, {{message}}
 *  3. Account → "Public Key" kopieren
 */
const EMAILJS_SERVICE_ID  = 'service_f3emrnx';
const EMAILJS_TEMPLATE_ID = 'template_zrw2t99';
const EMAILJS_PUBLIC_KEY  = 'Qzf7RnGpcidIhFT2t';

/** Empfaengeradresse fuer den E-Mail-Versand. */
const RECIPIENT = '02gerdom@gmail.com';

/**
 * Validator fuer eine Gewichtungs-Gruppe: Die Summe aller Punkte
 * muss exakt POINTS_PER_APP (100) ergeben.
 */
function sumEquals100(control: AbstractControl): ValidationErrors | null {
  const group = control as FormGroup;
  const total = Object.values(group.controls).reduce<number>(
    (sum, c) => sum + (Number(c.value) || 0),
    0
  );
  return total === POINTS_PER_APP ? null : { sumNot100: { actual: total } };
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SurveyHeader, ProgressBar, AppCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  /** Statische Anwendungsfaelle und Kriterien. */
  protected readonly apps = APP_SCENARIOS;
  protected readonly criteria = CRITERIA;
  protected readonly thesis = THESIS;

  /** Anzahl der zu bewertenden Anwendungsfaelle. */
  protected readonly totalApps = APP_SCENARIOS.length;

  /** Bestaetigungs-/Hinweismeldung. */
  protected readonly statusMessage = signal<string>('');

  /** Wird waehrend des E-Mail-Versands auf true gesetzt. */
  protected readonly isSending = signal(false);

  /** Versand war erfolgreich. */
  protected readonly sendSuccess = signal(false);

  /** FormBuilder per inject(), damit er vor den Feld-Initialisierern bereitsteht. */
  private readonly fb: FormBuilder = inject(FormBuilder);

  /**
   * Reaktives Wurzel-Formular:
   * - expertName: Pflichtfeld,
   * - weightings: FormArray mit je einer Gewichtungs-Gruppe pro Anwendungsfall,
   * - overallJustification: Pflicht-Gesamtbegruendung.
   */
  protected readonly form = this.buildForm();

  /**
   * Signal, das bei jeder Formularaenderung aktualisiert wird.
   * Reaktive Grundlage fuer Fortschritt und Button-Status.
   */
  private readonly formValue = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue()
  });

  /** Anzahl der Anwendungsfaelle, deren Summe exakt 100 ergibt. */
  protected readonly completedCount = computed(() => {
    this.formValue(); // Abhaengigkeit registrieren
    return this.weightings.controls.filter((g) => g.controls.weights.valid).length;
  });

  /** Ist das gesamte Formular gueltig und absendbar? */
  protected readonly canSubmit = computed(() => {
    this.formValue();
    return this.form.valid;
  });

  /** Typisierter Zugriff auf das FormArray der Gewichtungen. */
  protected get weightings(): FormArray<WeightingForm> {
    return this.form.controls.weightings;
  }

  /** Namensfeld (fuer den Header). */
  protected get expertNameControl(): FormControl<string> {
    return this.form.controls.expertName;
  }

  /** Gesamtbegruendung. */
  protected get overallJustificationControl(): FormControl<string> {
    return this.form.controls.overallJustification;
  }

  /** Liefert die WeightingForm zu einem Index (fuer das Template). */
  protected weightingAt(index: number): WeightingForm {
    return this.weightings.at(index);
  }

  // ----------------------------------------------------------------------
  // Aktionen
  // ----------------------------------------------------------------------

  /**
   * Absenden: Validiert das Formular und sendet die Antworten per EmailJS
   * direkt aus dem Browser heraus (kein Mailprogramm noetig).
   */
  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.statusMessage.set(
        'Bitte vergeben Sie je Anwendungsfall genau 100 Punkte und fuellen Sie die Pflichtfelder aus.'
      );
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      this.statusMessage.set(
        'EmailJS ist noch nicht konfiguriert. Bitte SERVICE_ID, TEMPLATE_ID und PUBLIC_KEY ' +
        'in src/app/app.ts eintragen (Anleitung im Kommentar dort).'
      );
      return;
    }

    this.isSending.set(true);
    this.sendSuccess.set(false);
    this.statusMessage.set('');

    try {
      const result = this.collectResult();
      const subject = `${this.thesis.type}: Gewichtung Bewertungskriterien – ${result.expertName}`;
      const body = this.buildEmailBody(result);

      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { to_email: RECIPIENT, subject, message: body },
        EMAILJS_PUBLIC_KEY
      );

      this.sendSuccess.set(true);
      this.statusMessage.set(
        'Ihre Antworten wurden erfolgreich gesendet. Vielen Dank fuer Ihre Teilnahme!'
      );
    } catch (err: unknown) {
      const detail = (err as { text?: string; status?: number })?.text
        ?? (err instanceof Error ? err.message : String(err));
      console.error('EmailJS-Fehler:', err);
      this.statusMessage.set(
        `Fehler beim Senden: ${detail}. Bitte pruefen Sie Ihre Internetverbindung und versuchen Sie es erneut.`
      );
    } finally {
      this.isSending.set(false);
    }
  }

  // ----------------------------------------------------------------------
  // Hilfsfunktionen
  // ----------------------------------------------------------------------

  /** Erstellt das reaktive Wurzel-Formular inkl. einer Gruppe pro Anwendungsfall. */
  private buildForm() {
    const groups = APP_SCENARIOS.map(() => {
      // Je Kriterium ein Punkte-Control (Startwert 0).
      const weightControls: Record<string, FormControl<number>> = {};
      for (const criterion of CRITERIA) {
        weightControls[criterion.id] = this.fb.nonNullable.control(0, {
          validators: [Validators.required, Validators.min(0), Validators.max(100)]
        });
      }

      return this.fb.group({
        weights: this.fb.group(weightControls, { validators: sumEquals100 }),
        justification: this.fb.nonNullable.control('')
      });
    });

    return this.fb.group({
      expertName: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      weightings: this.fb.array<WeightingForm>(groups),
      overallJustification: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(10)]
      })
    });
  }

  /** Summe der Punkte einer Gewichtungs-Gruppe. */
  private sumOf(weights: Weights): number {
    return Object.values(weights).reduce<number>((sum, v) => sum + (Number(v) || 0), 0);
  }

  /** Wandelt den Formularzustand in das typisierte Ergebnisobjekt um. */
  private collectResult(): SurveyResult {
    const raw = this.form.getRawValue();
    const weightings: AppWeighting[] = raw.weightings.map((w, i) => ({
      appId: APP_SCENARIOS[i].id,
      appTitle: APP_SCENARIOS[i].title,
      weights: w.weights as Weights,
      total: this.sumOf(w.weights as Weights),
      justification: w.justification.trim()
    }));

    return {
      expertName: raw.expertName.trim(),
      submittedAt: new Date().toISOString(),
      overallJustification: raw.overallJustification.trim(),
      weightings
    };
  }

  /** Baut einen kompakten, gut lesbaren Klartext-Bericht (mailto-tauglich). */
  private buildEmailBody(result: SurveyResult): string {
    const lines: string[] = [
      'Expertenbefragung: Gewichtung von Bewertungskriterien',
      `Bachelorarbeit: ${this.thesis.thesisTitle}`,
      '=====================================================',
      `Experte: ${result.expertName}`,
      `Zeitpunkt: ${new Date(result.submittedAt).toLocaleString('de-DE')}`,
      ''
    ];

    result.weightings.forEach((w, i) => {
      lines.push(`${i + 1}. ${w.appTitle}  (Summe: ${w.total}/100)`);
      // Kompakte Kriterium=Punkte-Zeilen.
      for (const criterion of CRITERIA) {
        lines.push(`   - ${criterion.name}: ${w.weights[criterion.id] ?? 0}`);
      }
      if (w.justification) {
        lines.push(`   Begruendung: ${w.justification}`);
      }
      lines.push('');
    });

    lines.push('Gesamtbegruendung der Schwerpunktsetzung:', result.overallJustification);

    return lines.join('\n');
  }
}
