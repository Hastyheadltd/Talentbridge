import React from 'react'

export default function page() {
  return (
    <main className="py-10 mt-10">
      <div className="max-w-7xl mx-auto mt-10">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">DATENSCHUTZERKLÄRUNG</h1>
          <p className="text-lg font-medium mb-1">FLIXRECRUIT.COM</p>
          <p className="text-sm text-gray-600">Stand: 13. April 2025</p>
        </header>

        {/* 1. Allgemeine Informationen und Verantwortliche Stelle */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            1. ALLGEMEINE INFORMATIONEN UND VERANTWORTLICHE STELLE
          </h2>
          <h3 className="text-xl font-semibold mb-2">1.1 Verantwortliche Stelle</h3>
          <p className="mb-2">
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO), anderer in den Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und sonstiger datenschutzrechtlicher Bestimmungen ist:
          </p>
          <p className="mb-2 font-medium">
            Talentia<br />
            Bussardplatz 11<br />
            85757 Karlsfeld<br />
            Deutschland
          </p>
          <p className="mb-2">E-Mail: support@flixrecruit.com</p>
          <p>Website: www.flixrecruit.com</p>
        </section>

        {/* 2. Grundlegende Informationen zum Datenschutz */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            2. GRUNDLEGENDE INFORMATIONEN ZUM DATENSCHUTZ
          </h2>
          <h3 className="text-xl font-semibold mb-2">
            2.1 Umfang der Verarbeitung personenbezogener Daten
          </h3>
          <p className="mb-4">
            Wir erheben und verwenden personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Erhebung und Verwendung personenbezogener Daten erfolgt in der Regel nur nach Einwilligung des Nutzers. Eine Ausnahme gilt, wenn die Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung durch gesetzliche Vorschriften gestattet ist.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            2.2 Rechtsgrundlage für die Verarbeitung personenbezogener Daten
          </h3>
          <p className="mb-4">
            Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung einholen, dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage. Für Verträge gilt Art. 6 Abs. 1 lit. b DSGVO, für rechtliche Verpflichtungen Art. 6 Abs. 1 lit. c DSGVO, für lebenswichtige Interessen Art. 6 Abs. 1 lit. d DSGVO und für berechtigte Interessen Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            2.3 Datenlöschung und Speicherdauer
          </h3>
          <p>
            Die personenbezogenen Daten werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt – außer es bestehen gesetzliche Aufbewahrungsfristen, die eine längere Speicherung erfordern.
          </p>
        </section>

        {/* 3. Erhebung personenbezogener Daten */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            3. ERHEBUNG PERSONENBEZOGENER DATEN
          </h2>
          <h3 className="text-xl font-semibold mb-2">
            3.1 Von uns erhobene personenbezogene Daten
          </h3>
          <p className="mb-2">
            FlixRecruit erhebt verschiedene Arten von Informationen von und über Nutzer:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>3.1.1 Informationen, die Sie uns zur Verfügung stellen:</strong> Personenstammdaten (z. B. vollständiger Name, Geschlecht, Geburtsdatum, Nationalität, Anschrift), Kontaktdaten, Profildaten (Profilbild, Lebenslauf, Ausbildungs- und Berufsdaten), Nutzerkonto-Informationen und Bewerbungsunterlagen.
            </li>
            <li>
              <strong>3.1.2 Unternehmensdaten (für Arbeitgeber-Accounts):</strong> Unternehmensname, -logo, Profil, Branchenzugehörigkeit, Firmensitz, Gründungsjahr, Mission, Vision, Kontaktdaten, Handelsregisternummer, USt-ID und Rechtsform.
            </li>
            <li>
              <strong>3.1.3 Automatisch erhobene Daten:</strong> IP-Adresse, Datum/Uhrzeit des Zugriffs, Browser- und Betriebssysteminformationen, besuchte Seiten, Referrer-URL, Besuchsdauer, übertragene Datenmengen, Geräteinformationen und Standortdaten.
            </li>
            <li>
              <strong>3.1.4 Nutzergenerierte Inhalte:</strong> Inhalte, die Sie im Rahmen unserer Dienste erstellen, wie z. B. Stellenanzeigen, Nachrichten, Bewertungen, Kommentare und Beiträge.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">
            3.2 Wie wir Ihre Daten erheben
          </h3>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>3.2.1 Direkte Erhebung:</strong> Daten, die Sie uns direkt durch Registrierung, Profilaktualisierung, Upload von Dokumenten, Bewerbung oder Kommunikation bereitstellen.
            </li>
            <li>
              <strong>3.2.2 Automatisierte Erhebung:</strong> Erfassung über Cookies, Web Beacons, Tracking-Technologien, Log-Dateien und Analytics-Dienste.
            </li>
            <li>
              <strong>3.2.3 Erhebung von Drittanbietern:</strong> Daten von Social-Media-Plattformen, Integrationspartnern, öffentlich zugänglichen Quellen, Geschäftspartnern und Dienstleistern.
            </li>
          </ul>
        </section>

        {/* 4. Zwecke der Datenverarbeitung */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            4. ZWECKE DER DATENVERARBEITUNG
          </h2>
          <h3 className="text-xl font-semibold mb-2">
            4.1 Bereitstellung und Verbesserung unserer Dienste
          </h3>
          <p className="mb-4">
            Ihre Daten werden verarbeitet, um Ihr Talent- bzw. Unternehmensprofil zu erstellen und zu verwalten, Bewerbungsprozesse zu erleichtern, passende Job-Empfehlungen zu liefern und die Plattform kontinuierlich zu verbessern.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            4.2 Kommunikation
          </h3>
          <p className="mb-4">
            Wir nutzen Ihre Daten, um dienstbezogene Benachrichtigungen, Updates, Informationen über neue Funktionen sowie Werbeinhalte (bei entsprechender Einwilligung) zu versenden und Ihre Anfragen zu beantworten.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            4.3 Plattformverbesserung und Analysen
          </h3>
          <p className="mb-4">
            Die Analyse von Nutzungsmustern dient der Optimierung unserer Dienste, der Behebung technischer Probleme sowie der Überwachung von Trends und Aktivitäten.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            4.4 Rechtliche und Sicherheitszwecke
          </h3>
          <p>
            Ihre Daten werden außerdem verarbeitet, um unsere Nutzungsbedingungen durchzusetzen, uns vor unbefugten Aktivitäten zu schützen, rechtlichen Verpflichtungen nachzukommen und unsere Rechtsansprüche zu wahren.
          </p>
        </section>

        {/* 5. Speicherung Ihrer Daten */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            5. SPEICHERUNG IHRER DATEN
          </h2>
          <h3 className="text-xl font-semibold mb-2">
            5.1 Speicherort und Infrastruktur
          </h3>
          <p className="mb-4">
            Alle über unsere Dienste erhobenen Nutzerdaten werden in sicheren Cloud-Datenbanken gespeichert – etwa in Firebase Cloud Storage, MongoDB, Render und Vercel. Unsere Server befinden sich in der Europäischen Union. Wird in Ausnahmefällen außerhalb der EU verarbeitet, stellen wir angemessene Garantien sicher.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            5.2 Datensicherheit
          </h3>
          <p className="mb-4">
            Wir setzen technische und organisatorische Maßnahmen (z. B. Verschlüsselung, regelmäßige Sicherheitsüberprüfungen, Zugriffskontrollen, Backups) ein, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust oder Beschädigung zu schützen.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            5.3 Aufbewahrungsfristen
          </h3>
          <p>
            Ihre personenbezogenen Daten werden so lange gespeichert, wie es für die Erfüllung der Verarbeitungszwecke notwendig ist – unter Beachtung gesetzlicher Aufbewahrungsfristen.
          </p>
        </section>

        {/* 6. Weitergabe und Offenlegung Ihrer Daten */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            6. WEITERGABE UND OFFENLEGUNG IHRER DATEN
          </h2>
          <h3 className="text-xl font-semibold mb-2">
            6.1 Sichtbarkeit von Profilen
          </h3>
          <p className="mb-4">
            Bestimmte von Ihnen bereitgestellte Informationen (z. B. Name, Profilbild, Fähigkeiten) können als Teil Ihres öffentlichen Profils für andere Nutzer sichtbar sein. Die Sichtbarkeit hängt von Ihrem Kontotyp ab.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            6.2 Dienstleister und Auftragsverarbeiter
          </h3>
          <p className="mb-4">
            Wir können Ihre Daten an Drittanbieter weitergeben, die für uns Dienstleistungen (z. B. Cloud-Hosting, Datenbankmanagement, E-Mail-Dienste, Analysen, IT-Support) erbringen – jeweils auf Basis vertraglicher Vereinbarungen.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            6.3 Unternehmenstransaktionen
          </h3>
          <p className="mb-4">
            Im Rahmen von Fusionen, Übernahmen oder Verkäufen können Ihre Daten übertragen werden. Hierüber informieren wir Sie entsprechend.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            6.4 Rechtliche Anforderungen
          </h3>
          <p className="mb-4">
            Eine Weitergabe Ihrer Daten erfolgt auch, wenn wir gesetzlich dazu verpflichtet sind oder Behörden entsprechende Anfragen stellen – etwa zum Schutz unserer Rechte und zur Gewährleistung der Sicherheit.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            6.5 Mit Ihrer Einwilligung
          </h3>
          <p className="mb-4">
            Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn Sie hierzu ausdrücklich Ihre Einwilligung gegeben haben.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            6.6 Datenverkauf
          </h3>
          <p>
            FlixRecruit verkauft Ihre personenbezogenen Daten nicht an Dritte.
          </p>
        </section>

        {/* 7. Ihre Datenschutzrechte */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            7. IHRE DATENSCHUTZRECHTE
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Recht auf Auskunft (Art. 15 DSGVO):</strong> Sie haben das Recht zu erfahren, ob und welche personenbezogenen Daten von Ihnen verarbeitet werden, sowie Informationen zu Verarbeitungszwecken, Kategorien, Empfängern und der Speicherdauer.
            </li>
            <li>
              <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie können die Korrektur unrichtiger oder unvollständiger Daten verlangen.
            </li>
            <li>
              <strong>Recht auf Löschung ("Recht auf Vergessenwerden") (Art. 17 DSGVO):</strong> Unter bestimmten Voraussetzungen können Sie die unverzügliche Löschung Ihrer Daten verlangen.
            </li>
            <li>
              <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie können unter bestimmten Umständen die Einschränkung der Datenverarbeitung verlangen.
            </li>
            <li>
              <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und diese an einen anderen Verantwortlichen zu übermitteln.
            </li>
            <li>
              <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können jederzeit Widerspruch gegen die Verarbeitung Ihrer Daten einlegen – insbesondere wenn diese auf berechtigten Interessen beruhen oder für Direktwerbung verwendet werden.
            </li>
            <li>
              <strong>Recht auf Widerruf der Einwilligung:</strong> Sie können Ihre datenschutzrechtliche Einwilligung jederzeit widerrufen, ohne dass die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung berührt wird.
            </li>
            <li>
              <strong>Recht auf automatisierte Entscheidungen einschließlich Profiling:</strong> Sie haben das Recht, nicht einer allein automatisierten Entscheidung unterworfen zu werden, die rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt.
            </li>
            <li>
              <strong>Recht auf Beschwerde bei einer Aufsichtsbehörde:</strong> Sollten Sie der Ansicht sein, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt, können Sie sich bei einer zuständigen Aufsichtsbehörde beschweren.
            </li>
            <li>
              <strong>Ausübung Ihrer Rechte:</strong> Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter{" "}
              <a href="mailto:support@flixrecruit.com" className="underline">
                support@flixrecruit.com
              </a>.
            </li>
          </ol>
        </section>
      </div>
    </main>
  )
}
