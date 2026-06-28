import { AppScenario, Criterion } from '../models/survey.model';

/**
 * Angaben zur Bachelorarbeit fuer den Kopfbereich (Impressum).
 * Bei Bedarf hier zentral anpassbar.
 */
export const THESIS = {
  title: 'Expertenbefragung zur Gewichtung von Bewertungskriterien',
  thesisTitle: 'Frontend-Framework-Auswahl fuer SAP-Logistikanwendungen',
  type: 'Bachelorarbeit',
  author: 'Dominik Geringer',
  institution: 'Steinbeis-Hochschule',
  company: 'Koerber AG'
} as const;

/**
 * Die sieben Bewertungskriterien fuer die Framework-Auswahl
 * (Reihenfolge und Texte entsprechen der Excel-Vorlage).
 */
export const CRITERIA: readonly Criterion[] = [
  {
    id: 'funktionaler-abdeckungsgrad',
    name: 'Funktionaler Abdeckungsgrad',
    description:
      'Wie viel sich fachlich umsetzen laesst – auch komplexe oder ungewoehnliche ' +
      'Anforderungen. Stichworte: eigene Bausteine, fertige Bibliotheken, anspruchsvolle ' +
      'Logik und Leistung auch bei vielen Nutzern/Daten.',
    scaleHint:
      '1 – Nur Standardbausteine nutzbar; individuelle Geschaeftslogik und eigene Komponenten ' +
      'kaum umsetzbar; nicht fuer groessere Daten- und Nutzerzahlen ausgelegt. · ' +
      '5 – Grossteil der Anforderungen umsetzbar; Spezialfaelle nur ueber Workarounds; ' +
      'Skalierbarkeit mit Einschraenkungen gegeben. · ' +
      '10 – Praktisch jede Anforderung nativ umsetzbar (externe Bibliotheken, eigene Komponenten, ' +
      'komplexe Logik); frei skalierbar.'
  },
  {
    id: 'sap-integration',
    name: 'SAP-Integrationsfaehigkeit',
    description:
      'Wie nahtlos und mit wie wenig Eigenaufwand sich die App an SAP koppelt: ' +
      'Daten (OData), Login/Berechtigungen und Einbettung in die SAP-Oberflaeche.',
    scaleHint:
      '1 – Keine Kopplungsdimension nativ unterstuetzt; Datenanbindung, Authentifizierung ' +
      'und Einbettung vollstaendig ueber Eigenentwicklung. · ' +
      '5 – OData-Anbindung ueber offizielle Bibliotheken und zentrale SAP-Authentifizierung ' +
      'nutzbar; Berechtigungskonzept mit Zusatzaufwand. · ' +
      '10 – Alle drei Integrationsdimensionen werden ohne nennenswerten Zusatzaufwand erfuellt: ' +
      'native OData-Anbindung, automatische Uebernahme von SSO und Berechtigungskonzept sowie ' +
      'vollwertige Einbettung in die SAP-Oberflaeche.'
  },
  {
    id: 'benutzeroberflaeche',
    name: 'Benutzeroberflaeche',
    description:
      'Bedienbarkeit im Arbeitsalltag (UX) fuer die operativen Nutzer und Design der Anwendung',
    scaleHint:
      '1 – Umstaendliche, ineffiziente Bedienung mit hoher Einarbeitungshuerde; ' +
      'Gestaltung starr an ein Designsystem gebunden, kein eigenes Erscheinungsbild moeglich. · ' +
      '5 – Solide Bedienung; Corporate Design im Rahmen des Designsystems anpassbar ' +
      '(Farben, Logo, Typografie), darueber hinaus gebunden. · ' +
      '10 – Unmittelbar intuitive, hocheffiziente Bedienung; vollstaendige gestalterische ' +
      'Freiheit bis hin zu eigenen Komponenten.'
  },
  {
    id: 'wartbarkeit',
    name: 'Wartbarkeit & Erweiterbarkeit',
    description:
      'Aufwand fuer Anpassungen, Erweiterungen und Pflege nach dem Go-Live (Produktivstart). ' +
      'Wichtig: sauberer, modularer Aufbau und gute Testbarkeit.',
    scaleHint:
      '1 – Aenderungen nach Go-Live riskant und aufwaendig; geringe Modularitaet, kaum testbar. · ' +
      '5 – Erweiterungen mit vertretbarem Aufwand; teilweise modular und testbar. · ' +
      '10 – Hoch modular und gut testbar; Erweiterungen schnell, sicher und mit geringem Folgeaufwand.'
  },
  {
    id: 'time-to-market',
    name: 'Time-to-Market',
    description:
      'Aufwand und Zeit bis die App produktiv nutzbar ist (Time-to-Market = Zeit bis zum ' +
      'Einsatz).',
    scaleHint:
      '1 – Sehr lange bis zur Produktivsetzung; steile Lernkurve, kaum Beschleunigung ' +
      'durch Vorlagen oder Generatoren. · ' +
      '5 – Mittlerer Initialaufwand; brauchbare Vorlagen und Tooling beschleunigen die ' +
      'Entwicklung, Einarbeitung in vertretbarem Rahmen. · ' +
      '10 – Sehr schnell produktiv; geringe Lernkurve, starke Generatoren/Vorlagen ' +
      'ermoeglichen kurze Time-to-Market.'
  },
  {
    id: 'tco',
    name: 'Total Cost of Ownership',
    description:
      'Gesamtkosten ueber die gesamte Nutzungsdauer (Total Cost of Ownership): Lizenzen, ' +
      'Betrieb und Pflege – inkl. Verfuegbarkeit von geeignetem Fachpersonal.',
    scaleHint:
      '1 – Hohe Gesamtkosten (Lizenz, Hosting, Pflege); benoetigtes Fachpersonal knapp und teuer. · ' +
      '5 – Moderate Gesamtkosten; Fachpersonal mit vertretbarem Aufwand verfuegbar oder aufbaubar. · ' +
      '10 – Minimale Gesamtkosten; guenstig zu betreiben und zu besetzen.'
  },
  {
    id: 'zukunftssicherheit',
    name: 'Zukunftssicherheit',
    description:
      'Langfristige Verlaesslichkeit der Technik: regelmaessige Updates, klare Roadmap ' +
      '(geplante Weiterentwicklung), Wartungszusagen sowie Verbreitung und aktive Community.',
    scaleHint:
      '1 – Abgekuendigt oder stagnierend; unklare Roadmap, schrumpfende Community. Migration droht. · ' +
      '5 – Stabil gepflegt, solide Roadmap; Marktanteil und Community konstant. · ' +
      '10 – Aktiv weiterentwickelt, langfristige Hersteller-Zusage, wachsende Community.'
  }
];

/**
 * Die vier zu bewertenden Anwendungsfaelle (Apps/Szenarien).
 * Pro Anwendungsfall werden 100 Punkte auf die sieben Kriterien verteilt.
 */
export const APP_SCENARIOS: readonly AppScenario[] = [
  {
    id: 'verladung',
    title: 'App Verladung',
    subtitle: 'fuer LKW-Fahrer',
    description:
      'Steuert den Ablauf der LKW-Fahrer. Funktional sehr anspruchsvoll: dynamische ' +
      'Tourenauswahl, Sortieren von Stopps per Drag-and-Drop, komplexe Rueckwaerts-' +
      'Kommissionierungslogik, Offline-Faehigkeit fuer Funkloecher sowie direkte ' +
      'Abspruenge in das Reklamationsmodul inklusive digitaler Unterschrift.'
  },
  {
    id: 'quanten-lagerplatz',
    title: 'App Quanten- und Lagerplatzinformationen',
    subtitle: 'Informationsabruf (Read-Only)',
    description:
      'Dient lediglich dem Abruf von Informationen zu Versandeinheiten (NVE) und ' +
      'Lagerplaetzen ueber den Scanner (Read-Only). Darstellung in einer simplen ' +
      'Standard-Tabelle.'
  },
  {
    id: 'pack-prozesse',
    title: 'App Pack-Prozesse',
    subtitle: 'Ein- und Auspacken',
    description:
      'Steuert das physische Ein- und Auspacken am Packtisch. Nutzt den Scanner fuer ' +
      'einfache Scans sowie Multi-Scans (Stapelverarbeitung). Ohne angegebene Ueber-NVE ' +
      'generiert die App automatisch eine neue im System.'
  },
  {
    id: 'reklamation',
    title: 'App Reklamation',
    subtitle: 'Bearbeitung von Reklamationslisten',
    description:
      'Zeigt Reklamationslisten aus dem ERP an. Lagerarbeiter koennen per Scanner ' +
      'Details einsehen, Fotos beschaedigter Ware hochladen und Vorgaenge durch ' +
      'Status-Updates bearbeiten (abhaken).'
  }
];