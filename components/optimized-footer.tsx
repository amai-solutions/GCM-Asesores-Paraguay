"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Instagram, Facebook, Youtube, Mail, Phone, Building } from "lucide-react"
import OptimizedImage from "./image-optimization"
import { appendUtmToUrl } from "@/lib/attribution"

export default function OptimizedFooter() {
  const router = useRouter()

  const handleConsultaClick = () => {
    const element = document.querySelector("#consulta")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const go = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    const attr = JSON.parse(localStorage.getItem("gcm_attribution") || "{}")
    if (href.startsWith("http")) {
      window.open(appendUtmToUrl(href, attr), "_blank", "noopener noreferrer")
    } else {
      router.push(appendUtmToUrl(href, attr))
    }
  }

  return (
    <footer className="bg-gray-950 text-white py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#225DF6]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#225DF6]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-6">
              <OptimizedImage
                src="/images/logo-gcm-white.webp"
                alt="GCMAsesores Logo"
                width={140}
                height={45}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-8 text-base leading-relaxed">
              ¡Agenda ya tu asesoría fiscal gratuita y descubre la mejor estructura para tu negocio digital!
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#225DF6] transition-colors">
                <Mail className="w-5 h-5 text-[#225DF6] flex-shrink-0" />
                <a href="mailto:info@gcmasesores.io" className="text-sm">
                  info@gcmasesores.io
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#225DF6] transition-colors">
                <Phone className="w-5 h-5 text-[#225DF6] flex-shrink-0" />
                <a href="tel:+13526080344" className="text-sm">
                  +1 352 608 0344
                </a>
              </div>
            </div>

            {/* Social media */}
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/gcmsociety/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#225DF6] transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
                onClick={(e) => go("https://www.instagram.com/gcmsociety/", e)}
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.facebook.com/people/Global-Community-Management-LLC/100091921369533/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#225DF6] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
                onClick={(e) => go("https://www.facebook.com/people/Global-Community-Management-LLC/100091921369533/", e)}
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCe0BfgldW1X_i-RL-nkq1aA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#225DF6] transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
                onClick={(e) => go("https://www.youtube.com/channel/UCe0BfgldW1X_i-RL-nkq1aA", e)}
              >
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-lg mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/aviso-legal"
                  className="text-gray-400 hover:text-[#225DF6] transition-colors text-sm block"
                  onClick={(e) => go("/aviso-legal", e)}
                >
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-privacidad"
                  className="text-gray-400 hover:text-[#225DF6] transition-colors text-sm block"
                  onClick={(e) => go("/politica-privacidad", e)}
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-cookies"
                  className="text-gray-400 hover:text-[#225DF6] transition-colors text-sm block"
                  onClick={(e) => go("/politica-de-cookies", e)}
                >
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/descargo-de-responsabilidad"
                  className="text-gray-400 hover:text-[#225DF6] transition-colors text-sm block"
                  onClick={(e) => go("/descargo-de-responsabilidad", e)}
                >
                  Descargo de responsabilidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-5 h-5 text-[#225DF6]" />
                <h3 className="font-bold text-base text-white">Información de la Empresa</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <span className="text-gray-500">Razón Social:</span>
                  <p className="text-white font-medium">GCM SERVICES LLC</p>
                </div>
                <div>
                  <span className="text-gray-500">EIN:</span>
                  <p className="text-white font-medium">99-1045312</p>
                </div>
                <div>
                  <span className="text-gray-500">Sitio Web:</span>
                  <p>
                    <Link
                      href="https://gcmasesores.io"
                      className="text-[#225DF6] hover:underline font-medium"
                      onClick={(e) => go("https://gcmasesores.io", e)}
                    >
                      gcmasesores.io
                    </Link>
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Dirección:</span>
                  <p className="text-gray-400 leading-relaxed mt-1">
                    4300 RIDGECREST DR SE SUITE L 1277
                    <br />
                    RIO RANCHO, NM 87124
                    <br />
                    Estados Unidos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="bg-gray-900/30 rounded-xl p-6 mb-6">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Descargo de responsabilidad:</strong> La información proporcionada en
              GCM es únicamente para fines informativos y no debe interpretarse como consejo o asesoramiento profesional
              en ninguna de sus formas. Antes de tomar decisiones basadas en el contenido de este sitio, se recomienda
              encarecidamente consultar con un profesional calificado. Cualquier acción tomada en base a la información
              de este sitio web es estrictamente bajo su propio riesgo.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} GCM SERVICES LLC. Todos los derechos reservados.</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500">
                Desarrollado por{" "}
                <Link
                  href="https://amai.solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#225DF6] hover:text-[#1e52d9] transition-colors font-medium"
                  onClick={(e) => go("https://amai.solutions/", e)}
                >
                  AMAI
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
