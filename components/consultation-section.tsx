"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle } from "lucide-react"
import { useVideoProgress } from "@/contexts/video-progress-context"
import { loadAttribution, getCalendlyUtm, listenCalendlyConversion, buildCalendlyUrl } from "@/lib/attribution"

// TODO: Replace with your Calendly booking conversion label from Google Ads
// Google Ads → Goals → Conversions → + New conversion action → Website → event "calendly_booking"
// Label format: NB7YCPzwkoYcEN-D6_pC
const CALENDLY_CONVERSION_LABEL = "CALENDLY_BOOKING_LABEL"

export default function ConsultationSection() {
  const [calendlyReady, setCalendlyReady] = useState(false)
  const { hasWatched90Percent } = useVideoProgress()

  const baseCalendlyUrl = "https://calendly.com/d/cs8k-x7t-xp7/consulta-fiscal-optimizar-tu-fiscalidad-en-paraguay"

  const calendlyContainerRef = useRef<HTMLDivElement>(null)
  const attributionRef = useRef(loadAttribution())

  // Refresh attribution on mount (reads localStorage if URL has no UTM params)
  useEffect(() => {
    attributionRef.current = loadAttribution()
  }, [])

  // Fire Google Ads conversion when Calendly confirms a booking
  useEffect(() => {
    return listenCalendlyConversion(CALENDLY_CONVERSION_LABEL)
  }, [])

  const initCalendlyWidget = () => {
    if (!(window as any).Calendly || !calendlyContainerRef.current) return
    ;(window as any).Calendly.initInlineWidget({
      url: buildCalendlyUrl(baseCalendlyUrl, attributionRef.current),
      parentElement: calendlyContainerRef.current,
      utm: getCalendlyUtm(attributionRef.current),
    })
  }

  useEffect(() => {
    if (hasWatched90Percent && calendlyReady && calendlyContainerRef.current) {
      initCalendlyWidget()
    }
  }, [hasWatched90Percent, calendlyReady])

  useEffect(() => {
    if (!hasWatched90Percent) return
    if ((window as any).Calendly) {
      setCalendlyReady(true)
      return
    }

    const link = document.createElement("link")
    link.href = "https://assets.calendly.com/assets/external/widget.css"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.onload = () => { setCalendlyReady(true); initCalendlyWidget() }
    script.onerror = () => setCalendlyReady(false)

    document.head.appendChild(script)
  }, [hasWatched90Percent])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hola, me gustaría agendar una asesoría fiscal gratuita para crear una LLC.")
    window.open(`https://wa.me/13526080344?text=${message}`, "_blank")
  }

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Solicitud de Asesoría Fiscal - LLC")
    const body = encodeURIComponent(`Hola,
Me gustaría agendar una asesoría para crear una LLC.
Gracias,`)
    window.open(`mailto:info@gcmasesores.io?subject=${subject}&body=${body}`, "_blank")
  }

  const handlePhoneClick = () => {
    window.open("tel:+13526080344", "_blank")
  }

  return (
    <section id="consulta" className="py-10 md:py-16 lg:py-20 gradient-bg relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 md:mb-8 px-2 text-3xl">
            Agenda ya tu consulta inicial gratuita
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            Una reunión de 30 minutos con nuestro equipo donde analizaremos si Paraguay se adapta realmente a tus
            necesidades de manera legal.
          </p>

          {!hasWatched90Percent && (
            <div className="mb-8 flex items-center justify-center gap-3 bg-amber-50 border-2 border-amber-200 text-amber-800 px-6 py-4 rounded-xl">
              <AlertCircle className="w-5 h-5" />
              Debes ver el 90% del vídeo para agendar.
            </div>
          )}

          {hasWatched90Percent && calendlyReady ? (
            <div
              ref={calendlyContainerRef}
              style={{
                minWidth: "100%",
                height: "800px",
                border: "none",
                borderRadius: "16px",
                boxShadow: "0px 12px 40px rgba(0,0,0,0.15)",
              }}
            />
          ) : hasWatched90Percent ? (
            <div className="flex items-center justify-center h-96 bg-gray-50 rounded-2xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : null}

          {/* botones de contacto debajo */}
        </div>
      </div>
    </section>
  )
}
