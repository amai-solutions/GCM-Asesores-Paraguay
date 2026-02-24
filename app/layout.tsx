import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { VideoProgressProvider } from "@/contexts/video-progress-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap", // Already has font-display: swap for 160ms savings
})

export const metadata: Metadata = {
  metadataBase: new URL("https://gcmasesores.io"),
  title: {
    default: "Optimiza tu fiscalidad desde Paraguay de forma 100% legal",
    template: "%s | GCMAsesores.io",
  },
  description:
    "Especialistas en negocios digitales e internacionales. Optimiza tu fiscalidad desde Paraguay de manera 100% legal con nuestros expertos.",
  keywords: [
    // Paraguay y residencia fiscal
    "residencia fiscal Paraguay",
    "optimización fiscal Paraguay",
    "fiscalidad Paraguay",
    "residencia permanente Paraguay",
    "trámites residencia Paraguay",
    "cómo obtener residencia Paraguay",
    "requisitos residencia Paraguay",
    "ventajas fiscales Paraguay",
    "beneficios fiscales Paraguay",
    "impuestos Paraguay",
    "tax planning Paraguay",
    "fiscalidad territorial Paraguay",
    "cero impuestos Paraguay",
    "Paraguay para emprendedores",
    "vivir en Paraguay",
    "mudarse a Paraguay",

    // Negocios digitales e internacionales
    "negocios digitales Paraguay",
    "emprendedores digitales Paraguay",
    "nómadas digitales Paraguay",
    "digital nomad Paraguay",
    "negocios internacionales",
    "asesoría fiscal internacional",
    "planificación fiscal internacional",
    "residencia fiscal digital",
    "optimización tributaria internacional",
    "planificación patrimonial",
    "protección de activos",
    "libertad financiera Paraguay",

    // Servicios y gestoría
    "asesoría fiscal Paraguay",
    "gestoría fiscal Paraguay",
    "gestoría digital Paraguay",
    "asesor fiscal internacional",
    "consultoría fiscal Paraguay",
    "servicios fiscales Paraguay",
    "trámites migratorios Paraguay",
    "abogado migratorio Paraguay",

    // Long-tail y preguntas frecuentes
    "cómo pagar menos impuestos legalmente",
    "optimizar impuestos desde Paraguay",
    "ventajas de vivir en Paraguay",
    "Paraguay vs otros países fiscalidad",
    "mejor país para emprendedores digitales",
    "países con baja fiscalidad",
    "residencia fiscal para nómadas digitales",
    "cómo cambiar residencia fiscal",
    "planificación fiscal legal",

    // LLC y servicios complementarios (manteniendo relevancia)
    "LLC Estados Unidos",
    "crear LLC EEUU",
    "gestoría LLC",
    "optimización fiscal LLC",
    "compliance LLC",
    "reportes BOI LLC",
    "EIN LLC",
    "ITIN trámite",
    "tratados fiscales EEUU",

    // Marca
    "GCMAsesores",
    "GCMAsesores Paraguay",
    "gcmasesores.io",
    "gcmsociety",
  ],
  authors: [{ name: "GCMAsesores.io", url: "https://gcmasesores.io" }],
  creator: "GCMAsesores.io",
  publisher: "GCMAsesores.io",
  alternates: { canonical: "/" },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  verification: {
    google: "google-site-verification-code",
    bing: "bing-site-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Optimiza tu fiscalidad desde Paraguay de forma 100% legal",
    description: "Especialistas en negocios digitales e internacionales.",
    url: "https://gcmasesores.io",
    siteName: "GCMAsesores.io",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://gcmasesores.io/images/logo.png",
        width: 1200,
        height: 630,
        alt: "GCMAsesores.io - Optimiza tu fiscalidad desde Paraguay",
      },
    ],
  },
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://iframe.mediadelivery.net" />
        <link rel="preconnect" href="https://assets.mediadelivery.net" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
      </head>
      <body className="font-poppins antialiased bg-white text-gray-900">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17974346207"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17974346207');
          `}
        </Script>
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "GCMAsesores.io",
                url: "https://gcmasesores.io",
                logo: "https://gcmasesores.io/images/logo.png",
                description:
                  "Especialistas en negocios digitales e internacionales. Optimización fiscal desde Paraguay de forma 100% legal.",
                address: { "@type": "PostalAddress", addressCountry: "PY" },
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  availableLanguage: ["Spanish", "English"],
                },
                sameAs: [
                  "https://www.instagram.com/gcmsociety/",
                  "https://www.facebook.com/people/Global-Community-Management-LLC/100091921369533/",
                  "https://www.youtube.com/channel/UCe0BfgldW1X_i-RL-nkq1aA",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                url: "https://gcmasesores.io",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://gcmasesores.io/?s={query}",
                  "query-input": "required name=query",
                },
              },
            ]),
          }}
        />
        <VideoProgressProvider>{children}</VideoProgressProvider>
      </body>
    </html>
  )
}
