import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Cookie-Richtlinie | Flix Recruit",
  
  };
export default function page() {

  return (
    <main className=" py-10 mt-10">
      <div className="max-w-7xl mx-auto pt-10 ">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">COOKIE-RICHTLINIE</h1>
          <p className="text-lg font-medium mb-1">FLIXRECRUIT.COM</p>
          <p className="text-sm text-gray-600">Stand: 13. April 2025</p>
        </header>

        {/* 1. Einleitung und Überblick */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. EINLEITUNG UND ÜBERBLICK</h2>
          <p className="mb-4">
            Diese Cookie-Richtlinie erläutert, wie Talentia ("wir", "uns", "unser") Cookies und ähnliche Technologien auf unserer Website <span className="font-medium">flixrecruit.com</span> und unserer Rekrutierungsplattform (gemeinsam als "Dienste" bezeichnet) verwendet.
          </p>
          <p className="mb-4">
            Durch die Nutzung unserer Dienste stimmen Sie der Verwendung von Cookies gemäß dieser Cookie-Richtlinie zu. Wenn Sie der Verwendung von Cookies nicht zustimmen möchten, lesen Sie bitte den Abschnitt "Wie Sie Cookies kontrollieren können", um zu erfahren, wie Sie Cookies deaktivieren oder blockieren können.
          </p>
          <p>
            Diese Cookie-Richtlinie ist Teil unserer Datenschutzerklärung und sollte in Verbindung mit dieser gelesen werden.
          </p>
        </section>

        {/* 2. Was sind Cookies? */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. WAS SIND COOKIES?</h2>
          <p className="mb-4">
            Cookies sind kleine Textdateien, die auf Ihrem Computer, Tablet, Mobiltelefon oder anderen Geräten gespeichert werden, wenn Sie eine Website besuchen. Sie werden weithin verwendet, um Websites funktionsfähig zu machen oder effizienter zu arbeiten, sowie um dem Websitebetreiber Informationen bereitzustellen.
          </p>
          <p>
            Cookies ermöglichen es einer Website, Ihr Gerät zu erkennen und Informationen über Ihre Nutzungspräferenzen zu speichern. Beispielsweise können Cookies speichern, welche Seiten Sie besucht haben, wie lange Sie auf der Website waren, welche Links Sie angeklickt haben und welche Präferenzen Sie festgelegt haben.
          </p>
        </section>

        {/* 3. Arten von Cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. ARTEN VON COOKIES, DIE WIR VERWENDEN</h2>
          {/* 3.1 Nach Funktion */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">3.1 Nach Funktion</h3>
            <div className="pl-4">
              <h4 className="text-lg font-semibold mb-1">
                3.1.1 Unbedingt erforderliche Cookies (Essential Cookies)
              </h4>
              <p className="mb-2">
                Diese Cookies sind für das Funktionieren unserer Website unerlässlich und können in unseren Systemen nicht abgeschaltet werden. Sie werden in der Regel nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt, wie z.B. das Festlegen Ihrer Datenschutzeinstellungen, dem Anmelden oder dem Ausfüllen von Formularen.
              </p>
              <p>
                Sie können Ihren Browser so einstellen, dass diese Cookies blockiert oder Sie über diese Cookies benachrichtigt werden, aber einige Bereiche der Website werden dann nicht funktionieren.
              </p>
            </div>
            <div className="pl-4 mt-4">
              <h4 className="text-lg font-semibold mb-1">
                3.1.2 Präferenz-Cookies (Preference Cookies)
              </h4>
              <p>
                Diese Cookies ermöglichen erweiterte Funktionalitäten und Personalisierung. Sie können von uns oder von Drittanbietern gesetzt werden. Werden sie nicht zugelassen, funktionieren einige Dienste möglicherweise nicht einwandfrei.
              </p>
            </div>
            <div className="pl-4 mt-4">
              <h4 className="text-lg font-semibold mb-1">
                3.1.3 Statistik-Cookies (Statistical/Analytical Cookies)
              </h4>
              <p>
                Diese Cookies erlauben es uns, Besuche und Verkehrsquellen zu zählen, um die Leistung der Website zu messen und zu verbessern. Die gesammelten Daten sind aggregiert und anonym.
              </p>
            </div>
            <div className="pl-4 mt-4">
              <h4 className="text-lg font-semibold mb-1">
                3.1.4 Marketing-Cookies (Marketing/Targeting Cookies)
              </h4>
              <p>
                Diese Cookies werden von Werbepartnern gesetzt, um Interessenprofile zu erstellen und Ihnen relevante Werbung zu zeigen. Sie speichern keine direkten persönlichen Informationen, sondern basieren auf der Identifizierung Ihres Browsers.
              </p>
            </div>
          </div>

          {/* 3.2 Nach Lebensdauer */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">3.2 Nach Lebensdauer</h3>
            <div className="pl-4">
              <h4 className="text-lg font-semibold mb-1">
                3.2.1 Sitzungs-Cookies (Session Cookies)
              </h4>
              <p>
                Diese Cookies werden nur während Ihrer Browsersitzung gespeichert und gelöscht, wenn Sie den Browser schließen.
              </p>
            </div>
            <div className="pl-4 mt-4">
              <h4 className="text-lg font-semibold mb-1">
                3.2.2 Permanente Cookies (Persistent Cookies)
              </h4>
              <p>
                Diese Cookies bleiben auch nach dem Schließen des Browsers gespeichert und werden bei jedem Besuch aktiviert. Die Lebensdauer variiert je nach Zweck.
              </p>
            </div>
          </div>

          {/* 3.3 Nach Herkunft */}
          <div>
            <h3 className="text-xl font-semibold mb-2">3.3 Nach Herkunft</h3>
            <div className="pl-4">
              <h4 className="text-lg font-semibold mb-1">
                3.3.1 Erstanbieter-Cookies (First-Party Cookies)
              </h4>
              <p>
                Diese Cookies werden direkt von FlixRecruit gesetzt und nur von unserer Website gelesen.
              </p>
            </div>
            <div className="pl-4 mt-4">
              <h4 className="text-lg font-semibold mb-1">
                3.3.2 Drittanbieter-Cookies (Third-Party Cookies)
              </h4>
              <p>
                Diese Cookies werden von Drittanbietern gesetzt (z. B. Analysedienste, Social-Media-Plugins) und können Sie über verschiedene Websites hinweg verfolgen.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Konkrete Cookies, die wir verwenden */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. KONKRETE COOKIES, DIE WIR VERWENDEN</h2>
          {/* 4.1 Unbedingt erforderliche Cookies */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">4.1 Unbedingt erforderliche Cookies</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border border-gray-300">Name des Cookies</th>
                    <th className="p-2 border border-gray-300">Anbieter</th>
                    <th className="p-2 border border-gray-300">Zweck</th>
                    <th className="p-2 border border-gray-300">Ablaufzeit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-gray-300">session_id</td>
                    <td className="p-2 border border-gray-300">FlixRecruit</td>
                    <td className="p-2 border border-gray-300">Authentifizierung und Sitzungsverwaltung</td>
                    <td className="p-2 border border-gray-300">Sitzung</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">xsrf-token</td>
                    <td className="p-2 border border-gray-300">FlixRecruit</td>
                    <td className="p-2 border border-gray-300">
                      Schutz vor Cross-Site-Request-Forgery-Angriffen
                    </td>
                    <td className="p-2 border border-gray-300">Sitzung</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">cookie_consent</td>
                    <td className="p-2 border border-gray-300">FlixRecruit</td>
                    <td className="p-2 border border-gray-300">
                      Speichert Ihre Cookie-Einwilligungspräferenzen
                    </td>
                    <td className="p-2 border border-gray-300">1 Jahr</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">auth_token</td>
                    <td className="p-2 border border-gray-300">Firebase</td>
                    <td className="p-2 border border-gray-300">
                      Authentifizierung für Firebase-Services
                    </td>
                    <td className="p-2 border border-gray-300">2 Wochen</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4.2 Präferenz-Cookies */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">4.2 Präferenz-Cookies</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border border-gray-300">Name des Cookies</th>
                    <th className="p-2 border border-gray-300">Anbieter</th>
                    <th className="p-2 border border-gray-300">Zweck</th>
                    <th className="p-2 border border-gray-300">Ablaufzeit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-gray-300">language</td>
                    <td className="p-2 border border-gray-300">FlixRecruit</td>
                    <td className="p-2 border border-gray-300">
                      Speichert Ihre Sprachpräferenz
                    </td>
                    <td className="p-2 border border-gray-300">1 Jahr</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">user_preferences</td>
                    <td className="p-2 border border-gray-300">FlixRecruit</td>
                    <td className="p-2 border border-gray-300">
                      Speichert Ihre Einstellungen für Layout und Ansichtsoptionen
                    </td>
                    <td className="p-2 border border-gray-300">6 Monate</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">recently_viewed</td>
                    <td className="p-2 border border-gray-300">FlixRecruit</td>
                    <td className="p-2 border border-gray-300">
                      Speichert Informationen über zuletzt angesehene Jobs
                    </td>
                    <td className="p-2 border border-gray-300">30 Tage</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">search_filters</td>
                    <td className="p-2 border border-gray-300">FlixRecruit</td>
                    <td className="p-2 border border-gray-300">
                      Speichert Ihre letzten Suchfilter
                    </td>
                    <td className="p-2 border border-gray-300">30 Tage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4.3 Statistik-Cookies */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">4.3 Statistik-Cookies</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border border-gray-300">Name des Cookies</th>
                    <th className="p-2 border border-gray-300">Anbieter</th>
                    <th className="p-2 border border-gray-300">Zweck</th>
                    <th className="p-2 border border-gray-300">Ablaufzeit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-gray-300">_ga</td>
                    <td className="p-2 border border-gray-300">Google Analytics</td>
                    <td className="p-2 border border-gray-300">
                      Wird verwendet, um Benutzer zu unterscheiden
                    </td>
                    <td className="p-2 border border-gray-300">2 Jahre</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">_gid</td>
                    <td className="p-2 border border-gray-300">Google Analytics</td>
                    <td className="p-2 border border-gray-300">
                      Wird verwendet, um Benutzer zu unterscheiden
                    </td>
                    <td className="p-2 border border-gray-300">24 Stunden</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">_gat</td>
                    <td className="p-2 border border-gray-300">Google Analytics</td>
                    <td className="p-2 border border-gray-300">
                      Wird verwendet, um die Anforderungsrate zu drosseln
                    </td>
                    <td className="p-2 border border-gray-300">1 Minute</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">collect</td>
                    <td className="p-2 border border-gray-300">Google Analytics</td>
                    <td className="p-2 border border-gray-300">
                      Sendet Daten über das Gerät und Verhalten des Besuchers an Google Analytics
                    </td>
                    <td className="p-2 border border-gray-300">Sitzung</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">fr_analytics</td>
                    <td className="p-2 border border-gray-300">FlixRecruit</td>
                    <td className="p-2 border border-gray-300">
                      Eigene Analysesoftware zur Messung der Websitenutzung
                    </td>
                    <td className="p-2 border border-gray-300">90 Tage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4.4 Marketing-Cookies */}
          <div>
            <h3 className="text-xl font-semibold mb-2">4.4 Marketing-Cookies</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border border-gray-300">Name des Cookies</th>
                    <th className="p-2 border border-gray-300">Anbieter</th>
                    <th className="p-2 border border-gray-300">Zweck</th>
                    <th className="p-2 border border-gray-300">Ablaufzeit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-gray-300">fr</td>
                    <td className="p-2 border border-gray-300">Facebook</td>
                    <td className="p-2 border border-gray-300">
                      Wird von Facebook für Werbezwecke verwendet
                    </td>
                    <td className="p-2 border border-gray-300">3 Monate</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">ads/ga-audiences</td>
                    <td className="p-2 border border-gray-300">Google</td>
                    <td className="p-2 border border-gray-300">
                      Wird von Google AdWords verwendet, um Besucher wieder anzusprechen
                    </td>
                    <td className="p-2 border border-gray-300">Sitzung</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">IDE</td>
                    <td className="p-2 border border-gray-300">Google</td>
                    <td className="p-2 border border-gray-300">
                      Verfolgt die Benutzeraktionen nach Anzeigenklicks
                    </td>
                    <td className="p-2 border border-gray-300">1 Jahr</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-300">conversion_tracking</td>
                    <td className="p-2 border border-gray-300">LinkedIn</td>
                    <td className="p-2 border border-gray-300">
                      Verwendet für LinkedIn-Conversion-Tracking
                    </td>
                    <td className="p-2 border border-gray-300">90 Tage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Wie wir Cookies verwenden */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. WIE WIR COOKIES VERWENDEN</h2>
          <div className="pl-4">
            <h3 className="text-xl font-semibold mb-2">5.1 Bereitstellung und Verbesserung unserer Dienste</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Um unsere Dienste bereitzustellen und zu unterhalten</li>
              <li>Um Ihr Benutzerkonto zu authentifizieren und Ihre Sitzung zu verwalten</li>
              <li>Um Ihre Präferenzen und Einstellungen zu speichern</li>
              <li>Um den Inhalt unserer Website an Ihre Bedürfnisse anzupassen</li>
              <li>Um die Leistung der Website zu verbessern</li>
              <li>Um neue Funktionen zu entwickeln</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">5.2 Analyse und Statistik</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Um zu verstehen, wie Benutzer unsere Website nutzen</li>
              <li>Um Nutzungsmuster und -trends zu identifizieren</li>
              <li>Um die Effektivität unserer Dienste zu messen</li>
              <li>Um Probleme und Fehler zu diagnostizieren</li>
              <li>Um Websitenutzungsstatistiken zu sammeln</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">5.3 Marketing und Werbung</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Optimierung unserer Marketingmaßnahmen</li>
              <li>Anzeige relevanter Werbung</li>
              <li>Messung der Werbewirksamkeit</li>
              <li>Personalisierte Empfehlungen</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">5.4 Sicherheit</h3>
            <ul className="list-disc list-inside">
              <li>Sicherstellung der Dienstsicherheit</li>
              <li>Erkennung und Verhinderung von Betrug</li>
              <li>Schutz vor Missbrauch</li>
            </ul>
          </div>
        </section>

        {/* 6. Cookies kontrollieren */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. WIE SIE COOKIES KONTROLLIEREN KÖNNEN</h2>
          <div className="pl-4">
            <h3 className="text-xl font-semibold mb-2">6.1 Cookie-Banner und Einstellungen</h3>
            <p className="mb-4">
              Beim ersten Besuch unserer Website informiert ein Cookie-Banner über den Einsatz von Cookies. Hier können Sie Ihre Präferenzen einstellen und entscheiden, welche Cookies Sie zulassen möchten. Änderungen sind jederzeit über den Link "Cookie-Einstellungen" im Footer möglich.
            </p>
            <h3 className="text-xl font-semibold mb-2">6.2 Browser-Einstellungen</h3>
            <p className="mb-4">
              Die meisten Browser erlauben es, Cookies zu kontrollieren. Sie können so konfiguriert werden, dass sie Sie bei neuen Cookies benachrichtigen oder bestimmte Cookies blockieren. Beachten Sie, dass das Blockieren aller Cookies die Funktionalität unserer Website beeinträchtigen kann.
            </p>
            <p className="mb-4">Informationen zur Verwaltung finden Sie hier:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Google Chrome: Menü &gt; Einstellungen &gt; Erweitert &gt; Datenschutz und Sicherheit &gt; Inhaltseinstellungen &gt; Cookies</li>
              <li>Mozilla Firefox: Menü &gt; Einstellungen &gt; Datenschutz &amp; Sicherheit &gt; Cookies und Website-Daten</li>
              <li>Safari: Einstellungen &gt; Datenschutz &gt; Cookies und Website-Daten</li>
              <li>Microsoft Edge: Menü &gt; Einstellungen &gt; Cookies und Website-Berechtigungen</li>
              <li>Opera: Einstellungen &gt; Erweitert &gt; Datenschutz &amp; Sicherheit &gt; Inhaltseinstellungen &gt; Cookies</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">6.3 Deaktivierung spezifischer Drittanbieter-Cookies</h3>
            <p className="mb-4">
              Für einige Drittanbieter-Cookies können Sie auch direkt beim Anbieter Einstellungen vornehmen:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Google Analytics: Über ein Browser-Add-on zur Deaktivierung von Google Analytics.</li>
              <li>Facebook: Anpassung der Werbeeinstellungen in den Facebook-Einstellungen.</li>
              <li>LinkedIn: Änderung der Datenschutzeinstellungen in Ihrem LinkedIn-Profil.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">6.4 Do-Not-Track-Signale</h3>
            <p>
              Einige Browser unterstützen "Do Not Track" (DNT)-Signale, die Websites mitteilen, dass Sie nicht verfolgt werden möchten. Da es keinen allgemein akzeptierten Standard gibt, reagieren wir derzeit nicht auf DNT-Signale, verfolgen jedoch weiterhin die Branchenstandards.
            </p>
          </div>
        </section>

        {/* 7. Cookies und ähnliche Technologien */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. COOKIES UND ÄHNLICHE TECHNOLOGIEN</h2>
          <div className="pl-4">
            <h3 className="text-xl font-semibold mb-2">7.1 Web Beacons / Pixel-Tags</h3>
            <p className="mb-4">
              Kleine transparente Bilddateien (auch als Pixel-Tags bekannt), die in Webseiten oder E-Mails eingebettet werden, um Zugriffsstatistiken zu erfassen.
            </p>
            <h3 className="text-xl font-semibold mb-2">7.2 Local Storage / Session Storage</h3>
            <p className="mb-4">
              Technologien, die es ermöglichen, Daten lokal im Browser zu speichern, ohne dass diese automatisch mit jeder Anfrage an den Server gesendet werden.
            </p>
            <h3 className="text-xl font-semibold mb-2">7.3 Fingerprinting</h3>
            <p>
              Eine Technik, die Eigenschaften Ihres Browsers und Geräts kombiniert, um einen eindeutigen "Fingerabdruck" zu erstellen, auch wenn Cookies deaktiviert sind.
            </p>
          </div>
        </section>

        {/* 8. Änderungen */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. ÄNDERUNGEN AN DIESER COOKIE-RICHTLINIE</h2>
          <p className="mb-4">
            Wir behalten uns vor, diese Cookie-Richtlinie von Zeit zu Zeit zu aktualisieren, um Änderungen in unseren Praktiken oder aufgrund betrieblicher, rechtlicher oder regulatorischer Gründe widerzuspiegeln. Die aktualisierte Version wird mit einem neuen "Stand"-Datum auf unserer Website veröffentlicht.
          </p>
          <p>
            Bitte überprüfen Sie die Richtlinie regelmäßig, um stets informiert zu bleiben. Bei wesentlichen Änderungen informieren wir Sie entweder direkt auf unserer Website oder per E-Mail.
          </p>
        </section>

        {/* 9. Kontakt */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. KONTAKT</h2>
          <p className="mb-4">
            Bei Fragen zu unserer Verwendung von Cookies oder dieser Cookie-Richtlinie kontaktieren Sie uns bitte unter:
          </p>
          <p className="font-medium ">E-Mail: <span className='hover:underline text-blue-500 cursor-pointer'>   support@flixrecruit.com </span> </p>
        </section>
      </div>
    </main>
  );
}

 