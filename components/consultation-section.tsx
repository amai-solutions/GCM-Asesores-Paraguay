"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { useVideoProgress } from "@/contexts/video-progress-context"

export default function ConsultationSection() {
  const [calendlyReady, setCalendlyReady] = useState(false)
  const pathname = usePathname()
  const { hasWatched90Percent } = useVideoProgress()

  const baseCalendlyUrl = "https://calendly.com/d/cs8k-x7t-xp7/consulta-fiscal-optimizar-tu-fiscalidad-en-paraguay"

  const calendlyContainerRef = useRef<HTMLDivElement>(null)
  const utmsRef = useRef<Record<string, string>>({})

  useEffect(() => {
    if (typeof window === "undefined") return
    const urlParams = new URLSearchParams(window.location.search)
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
    utmKeys.forEach((key) => {
      const value = urlParams.get(key)
      if (value) utmsRef.current[key] = value
    })
  }, [])

  const initCalendlyWidget = () => {
    if (!(window as any).Calendly || !calendlyContainerRef.current) return
    const u = utmsRef.current
    ;(window as any).Calendly.initInlineWidget({
      url: baseCalendlyUrl,
      parentElement: calendlyContainerRef.current,
      utm: {
        utmSource: u.utm_source || "",
        utmMedium: u.utm_medium || "",
        utmCampaign: u.utm_campaign || "",
        utmContent: u.utm_content || "",
        utmTerm: u.utm_term || "",
      },
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
