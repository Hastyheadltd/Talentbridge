import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Imprint | Flix Recruit",
  
  };
export default function page() {
  return (
    <main className=" py-10">
    <div className="max-w-7xl mx-auto px-4 mt-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Impressum</h1>
      </header>

      {/* Angaben gemäß § 5 TMG */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
        <p>Vladislav Gohman</p>
        <p>Talentia</p>
        <p>Bussardplatz 11</p>
        <p>85757 Karlsfeld</p>
      </section>

      {/* Kontakt */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
        <p>Telefon: +49 17687850503</p>
        <p>
          E-Mail:{" "}
          <a
            href="mailto:vladik.go@icloud.com"
            className="text-blue-600 underline"
          >
            vladik.go@icloud.com
          </a>
        </p>
      </section>

      {/* Umsatzsteuer-ID */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
        <p>DE999999999</p>
      </section>

      {/* EU-Streitschlichtung */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
          bereit:
        </p>
        <p>
          <a
            href="https://ec.europa.eu/consumers/odr"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
        </p>
        <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
      </section>

      {/* Verbraucherstreitbeilegung / Universalschlichtungsstelle */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Verbraucherstreitbeilegung / Universalschlichtungsstelle
        </h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
          einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </div>
  </main>
  )
}
