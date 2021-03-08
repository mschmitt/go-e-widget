# Scriptable Widget für den [go-eCharger](https://go-e.co/)

![Screenshot](https://raw.githubusercontent.com/mschmitt/go-e-widget/main/screenshot.jpg)

## Installation

Installation über Scriptable.app und den Scriptdude-Paketmanager:

- [Scriptable.app](https://scriptable.app/) installieren.
- [Scriptdude](https://scriptdu.de/) installieren.
- Diesen Link klicken, um go-eCharger-Widget.js zu installieren:
  - [Download with ScriptDude](https://scriptdu.de/?name=go-eCharger-Widget&source=https%3A%2F%2Fraw.githubusercontent.com%2Fmschmitt%2Fgo-e-widget%2Fmain%2Fgo-eCharger-Widget.js&docs=https%3A%2F%2Fgithub.com%2Fmschmitt%2Fgo-e-widget%2Fblob%2Fmain%2Fgo-eCharger-README.md)
- Neues Scriptable-Widget auf dem Homescreen anlegen.
- go-eCharger-Widget in den Widget-Einstellungen auswählen.

## Standardkonfiguration

In der Standardkonfiguration greift das Widget per Wifi direkt auf das API des go-eCharger im selben Netz zu, über den standardmäßigen vom Charger angeforderten DHCP-Hostnamen "go-echarger". Das muss nicht überall funktionieren und wird selbst unter günstigen Umständen regelmäßig zu Problemen führen, wenn das iPhone aus dem Ruhezustand aufwacht und versucht, das Widget zu aktualisieren, während es noch nicht mit Wifi verbunden ist.

Es wird dringend empfohlen, eine angepasste Konfiguration mit Zugriff auf den go-eCharger über die Cloud zu machen. In einer angepassten Konfiguration wird auch der Preis zur aktuell geladenen Strommenge berechnet.

## Angepasste Konfiguration

- go-eCharger-Setup.js installieren per Scriptdude:
  - [Download with ScriptDude](https://scriptdu.de/?name=go-eCharger-Setup&source=https%3A%2F%2Fraw.githubusercontent.com%2Fmschmitt%2Fgo-e-widget%2Fmain%2Fgo-eCharger-Setup.js&docs=https%3A%2F%2Fgithub.com%2Fmschmitt%2Fgo-e-widget%2Fblob%2Fmain%2Fgo-eCharger-README.md)
- go-eCharger-Setup.js über die Scriptable-App starten.
- Eingabe von:
  - API-Token (Cloud Token)
  - Preis pro Kilowattstunde
  - Währungssymbol
  - URL, der beim Antippen des Widget aufgerufen werden soll. Einige Beispiel-URLs:
    - https://app.go-e.co (Voreinstellung)
    - [teslamotors://](teslamotors://) (um die Tesla-App zu starten)
    - [myaudi://](myaudi://) (um die Audi-App zu starten)
    - [fb687498638272161://](fb687498638272161://) (um die Hyndai-App zu starten)

## Fehlersuche

- Wenn eine angepasste Konfiguration erstellt wurde und das Widget versucht, per Cloud auf den Charger zuzugreifen, wird das Symbol 🌐 neben dem Datum angezeigt. Dann kann aber immer noch der Charger nicht erreichbar oder das API-Token falsch sein, und der Zugriff fehlschlagen.
- Bitte beachten: Installierte Widgets lassen sich nicht manuell zum Aktualisieren überreden, sondern werden ausschließlich dann aktualisiert, wenn iOS glaubt, dass der richtige Zeitpunkt gekommen ist. Die Codezeile, die das Aktualisieren beschleunigen soll, wirkt nicht über den Placebo-Effekt hinaus. Zum Testen von Konfigurationsänderungen bitte das Widget direkt über die Scriptable-App aufrufen.
- Ein in der angepassten Konfiguration geänderter URL kann wirklich erst getestet werden, wenn das Widget aktualisiert wurde.

## Limitations

- Internationalisierung fehlt. (Fork me on Github!)
- Die native App des go-eCharger registriert kein URL-Schema, aber da sie selbst nur ein Web-View ist, funktioniert die Verknüpfung über https://app.go-e.co genau so, nur im Browser.
- Nicht für einen zweiten Charger konfigurierbar, bitte in diesem Fall site-spezifisch innerhalb der Scripts am Namen der Konfigurationsdatei rummachen.
- Scriptdude erfordert iCloud. Widget und Setup sollten ohne iCloud bei manuellem Copy&Paste in die Scriptable-App auch so funktionieren. Tun sie aber nicht. Sorry.

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
