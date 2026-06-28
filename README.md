# Expertenbefragung zur Gewichtung von Bewertungskriterien

Eine moderne, lokal laufende **Angular-Anwendung** (Standalone Components, TypeScript,
Reactive Forms, Signals) fuer eine wissenschaftliche Expertenbefragung im Rahmen der
Bachelorarbeit *„Frontend-Framework-Auswahl fuer SAP-Logistikanwendungen"*. Pro
Anwendungsfall werden **100 Punkte auf sieben Bewertungskriterien** verteilt; am Ende
werden alle Angaben als **vorausgefuellte E-Mail** an `02gerdom@gmail.com` uebergeben.

> Es gibt **kein Backend** und **keinen externen Dienst**. Die App laeuft ausschliesslich
> lokal in Ihrem Browser.

## Funktionen

- Kopfbereich mit akademischem Impressum (Bachelorarbeit, Titel, Autor), Einleitung
  und Pflichtfeld für **Name/Rolle des Experten**.
- Eine optisch abgegrenzte **Karte pro Anwendungsfall** mit Beschreibung und
  Punkte-Eingabe je Kriterium:
  - **Punktefelder 0–100** je Kriterium mit Live-Anteilsbalken,
  - **Live-Summenanzeige** (grün bei genau 100, rot bei Überschreitung),
  - optionale **Begründung** je Anwendungsfall.
- **Fortschrittsbalken** oben: wie viele der vier Apps vollständig gewichtet sind (Summe = 100).
- Pflicht-**Gesamtbegründung** der Schwerpunktsetzung.
- **Reactive Forms** mit Validierung (inkl. Summe-=-100-Validator); der Absenden-Button
  ist deaktiviert, bis alles gültig ist.
- Datenübergabe ohne Backend: **`mailto:`** öffnet das Standard-Mailprogramm mit Betreff
  und kompaktem Text (URL-codiert). Es ist **ausschließlich der E-Mail-Versand** vorgesehen.

> **Hinweis zu `mailto`:** Mail-Clients/Browser begrenzen die Länge des `mailto`-Links
> (oft ~2000 Zeichen). Der E-Mail-Text wird deshalb bewusst kompakt gehalten
> (kurze Labels, eine Zeile je Kriterium).

## Voraussetzungen

- [Node.js](https://nodejs.org/) (LTS, z. B. 20 oder neuer)
- npm (wird mit Node.js installiert)

## Installation & Start

```bash
# 1. In den Projektordner wechseln
cd expert-survey

# 2. Abhaengigkeiten installieren
npm install

# 3. Entwicklungsserver starten
npm start
# bzw.
ng serve
```

Danach im Browser öffnen: **http://localhost:4200**

## Projektstruktur

```
expert-survey/
├─ angular.json                 # Angular CLI Build-/Serve-Konfiguration
├─ package.json                 # Abhaengigkeiten & npm-Skripte
├─ tsconfig*.json               # TypeScript-Konfiguration
└─ src/
   ├─ index.html               # HTML-Einstieg (lädt <app-root>)
   ├─ main.ts                  # Bootstrap der Standalone-App
   ├─ styles.scss              # Globale Styles + Design-Tokens + Feld-Styles
   └─ app/
      ├─ app.config.ts         # App-Konfiguration (bewusst minimal, kein Router)
      ├─ app.ts                # Root-Component: Reactive Form, Signals, Export-Logik
      ├─ app.html              # Layout: Header, Fortschritt, Karten, Aktionen
      ├─ app.scss              # Layout- und Button-Styles
      ├─ models/
      │  └─ survey.model.ts    # Typisierte Interfaces & FormGroup-Typ
      ├─ data/
      │  └─ apps-data.ts       # Statische Beschreibungen der vier Apps
      └─ components/
         ├─ survey-header/     # Kopfbereich + Namensfeld
         ├─ progress-bar/      # Fortschrittsanzeige
         └─ app-card/          # Karte je App (Beschreibung + Eingaben)
```

## Hinweise

- **Kein `localStorage`:** Der Zustand wird ausschliesslich über Angular Reactive Forms
  und Signals im Component-State gehalten.
- **Barrierearmut:** Labels für alle Felder, ARIA-Attribute, `role="alert"` für Fehler,
  sichtbarer Fokus-Ring und ausreichende Kontraste.
- **Responsive:** Layout funktioniert auf Smartphone, Tablet und Desktop.
