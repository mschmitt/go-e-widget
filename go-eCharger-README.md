# Scriptable Widget für den go-eCharger

Status: Doku in Überarbeitung

![Screenshot](https://raw.githubusercontent.com/mschmitt/go-e-widget/main/screenshot.jpg)

## Installation

Installation über Scriptable.app und den Scriptdude-Paketmanager:

- [Scriptable.app](https://scriptable.app/) installieren.
- [Scriptdude](https://scriptdu.de/) installieren.
- Diesen Link klicken, um go-eCharger.js zu installieren:
  - [Download with ScriptDude](https://scriptdu.de/?name=go-eCharger-Widget&source=https%3A%2F%2Fraw.githubusercontent.com%2Fmschmitt%2Fgo-e-widget%2Fmain%2Fgo-eCharger-Widget.js&docs=https%3A%2F%2Fgithub.com%2Fmschmitt%2Fgo-e-widget%2Fblob%2Fmain%2Fgo-eCharger-README.md)
- Neues Scriptable-Widget auf dem Homescreen anlegen.
- go-eCharger in den Widget-Einstellungen auswählen,

## Standardkonfiguration

In der Standardkonfiguration greift das Widget per WLAN direkt auf das API des go-eCharger zu. Das wird immer dann zu Problemen führen, wenn das iPhone aus dem Ruhezustand aufwacht und versucht, das Widget zu aktualisieren, während es nicht mit dem WLAN verbunden ist.

Es wird dringend empfohlen, eine angepasste Konfiguration mit Zugriff auf den go-eCharger über die Cloud zu machen. In einer angepassten Konfiguration wird auch der Preis zur aktuell geladenen Strommenge berechnet.

## Angepasste Konfiguration

- go-eCharger-Setup.js installieren per Scriptdude:
  - [Download with ScriptDude](https://scriptdu.de/?name=go-eCharger-Setup&source=https%3A%2F%2Fraw.githubusercontent.com%2Fmschmitt%2Fgo-e-widget%2Fmain%2Fgo-eCharger-Setup.js&docs=https%3A%2F%2Fgithub.com%2Fmschmitt%2Fgo-e-widget%2Fblob%2Fmain%2Fgo-eCharger-README.md)
- go-eCharger-Setup.js über die Scriptable-App starten.
- Eingabe von:

  - API-Token (Cloud Token)

  - Preis pro Kilowattstunde
  - Währungssymbol
- Die angepasste Konfiguration ohne iCloud ist nicht getestet, aber es ist Code vorhanden, der sie unterstützt, so dass sie theoretisch vielleicht funktionieren könnte.

## Fehlersuche

Bitte beachten: Installierte Widgets lassen sich nicht manuell zum Aktualisieren überreden, sondern aktualisieren sich ausschließlich dann, wenn iOS das für richtig hält. Zum Testen von Konfigurationsänderungen bitte das Widget direkt über die Scriptable-App aufrufen.

## Todo

- Internationalisierung. Fork me on Github!

## Lizenz und Haftungsausschluss

```
Copyright 2021, Martin Schmitt <mas at scsy dot de>

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
```