"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import OptimizedImage from "./image-optimization"
import { useRouter } from "next/navigation"
import CTAWrapper from "@/components/cta-wrapper"
import { appendUtmToUrl } from "@/lib/attribution"

interface OptimizedHeaderProps {
  mode?: "full" | "landing"
}

export default function OptimizedHeader({ mode = "landing" }: OptimizedHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const [shouldBounce, setShouldBounce] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      if (mode === "landing") {
        const ctaSections = [
          document.getElementById("consulta"),
          document.querySelector('[data-cta-section="stats"]'),
          document.querySelector('[data-cta-section="hero"]'),
        ]

        let shouldHide = false
        ctaSections.forEach((section) => {
          if (section) {
            const rect = section.getBoundingClientRect()
            const windowHeight = window.innerHeight
            if (rect.top < windowHeight - 100 && rect.bottom > 100) {
              shouldHide = true
            }
          }
        })

        setShowFloatingCTA(!shouldHide)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mode])

  useEffect(() => {
    if (mode === "landing") {
      const bounceInterval = setInterval(() => {
        setShouldBounce(true)
        setTimeout(() => setShouldBounce(false), 1000)
      }, 10000)

      return () => clearInterval(bounceInterval)
    }
  }, [mode])

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Crear LLC", href: "#creacion-llc" },
    { name: "Gestoría para LLCs", href: "/gestoria-para-llcs" },
    { name: "Sobre nosotros", href: "/sobre-nosotros" },
    { name: "FAQ", href: "#faq" },
    { name: "Blog", href: "https://blog.gcmasesores.io" },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    const attr = JSON.parse(localStorage.getItem("gcm_attribution") || "{}")

    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push(appendUtmToUrl("/" + href, attr))
      } else {
        const element = document.querySelector(href)
        if (element) element.scrollIntoView({ behavior: "smooth" })
      }
    } else if (href.startsWith("http")) {
      window.open(appendUtmToUrl(href, attr), "_blank", "noopener,noreferrer")
    } else {
      router.push(appendUtmToUrl(href, attr))
    }
  }

  if (mode === "landing") {
    return (
      <>
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-gradient-to-r from-gray-50/95 via-white/95 to-blue-50/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
              : "bg-gradient-to-r from-gray-50/90 via-white/90 to-blue-50/90 backdrop-blur-sm border-b border-gray-100"
          }`}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl"></div>
          <div className="absolute top-0 left-10 w-40 h-40 bg-blue-600/3 rounded-full blur-2xl"></div>

          <div className="container mx-auto px-4 lg:px-6 relative">
            <div className="flex items-center justify-between h-20">
              <Link href="/" className="flex items-center transition-transform hover:scale-105 mx-auto md:mx-0">
                <OptimizedImage
                  src="/images/logo-blue.webp"
                  alt="GCMAsesores Logo"
                  width={140}
                  height={45}
                  className="h-10 md:h-12 w-auto"
                  priority
                />
              </Link>

              <div className="hidden md:flex items-center">
                <CTAWrapper showMessage={false}>
                  <Button
                    size="lg"
                    className="btn-primary text-base lg:text-lg px-6 lg:px-10 py-3 lg:py-5 text-white font-bold rounded-2xl shadow-lg border border-white/20 whitespace-nowrap"
                    onClick={() => handleNavClick("#consulta")}
                  >
                    <Calendar className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                    Agendar Asesoría Gratuita
                  </Button>
                </CTAWrapper>
              </div>
            </div>
          </div>
        </header>

        <div
          className={`md:hidden fixed bottom-6 left-4 right-4 z-50 transition-all duration-500 ease-in-out ${
            showFloatingCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
          } ${shouldBounce ? "animate-bounce" : ""}`}
        >
          <CTAWrapper showMessage={false}>
            <Button
              size="lg"
              className="btn-primary w-full text-base px-6 py-5 text-white font-bold rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-sm"
              onClick={() => handleNavClick("#consulta")}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Asesoría Gratuita
            </Button>
          </CTAWrapper>
        </div>
      </>
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-gray-50/95 via-white/95 to-blue-50/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : "bg-gradient-to-r from-gray-50/90 via-white/90 to-blue-50/90 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl"></div>
      <div className="absolute top-0 left-10 w-40 h-40 bg-blue-600/3 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="flex items-center justify-between h-20">
          <div className="hidden lg:flex items-center justify-between w-full">
            <Link
              href="/"
              className="flex items-center transition-transform hover:scale-105"
              onClick={() => handleNavClick("#inicio")}
            >
              <OptimizedImage
                src="/images/logo-blue.webp"
                alt="GCMAsesores Logo"
                width={140}
                height={45}
                className="h-12 w-auto"
                priority
              />
            </Link>

            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 relative group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            <div className="flex items-center">
              <CTAWrapper showMessage={false}>
                <Button
                  size="sm"
                  className="btn-primary text-xs md:text-xl px-8 md:px-12 py-4 md:py-6 text-white font-bold rounded-xl shadow-lg border border-white/20"
                  onClick={() => handleNavClick("#consulta")}
                >
                  <Calendar className="w-5 md:w-6 h-5 md:h-6" />
                  Agendar Asesoría Gratuita
                </Button>
              </CTAWrapper>
            </div>
          </div>

          <div className="flex lg:hidden items-center justify-between w-full">
            <div className="flex items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/50 p-2 rounded-xl backdrop-blur-sm border border-white/20 shadow-md"
                  >
                    {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[320px] sm:w-[400px] bg-gradient-to-br from-gray-50 via-white to-blue-50/30 backdrop-blur-md border-r border-gray-200"
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                  <div className="absolute top-10 right-5 w-20 h-20 bg-blue-600/5 rounded-full blur-xl"></div>

                  <nav className="flex flex-col space-y-6 mt-12 relative">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="text-gray-700 hover:text-blue-600 font-medium py-3 text-lg transition-colors border-b border-gray-100 last:border-0 text-left hover:bg-white/30 rounded-lg px-4"
                      >
                        {item.name}
                      </button>
                    ))}
                    <CTAWrapper showMessage={false}>
                      <Button
                        size="lg"
                        className="btn-primary mt-8 text-base px-6 py-4 text-white font-bold rounded-2xl shadow-2xl border-2 border-white/20"
                        onClick={() => handleNavClick("#consulta")}
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Agendar Asesoría
                      </Button>
                    </CTAWrapper>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center justify-center flex-1">
              <Link
                href="/"
                className="flex items-center transition-transform hover:scale-105"
                onClick={() => handleNavClick("#inicio")}
              >
                <OptimizedImage
                  src="/images/logo-blue.webp"
                  alt="GCMAsesores Logo"
                  width={120}
                  height={38}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center">
              <CTAWrapper showMessage={false}>
                <Button
                  size="sm"
                  className="btn-primary text-xs md:text-xl px-8 md:px-12 py-4 md:py-6 text-white font-bold rounded-xl shadow-lg border border-white/20"
                  onClick={() => handleNavClick("#consulta")}
                >
                  <Calendar className="w-5 md:w-6 h-5 md:h-6" />
                  Asesoría Gratuita
                </Button>
              </CTAWrapper>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
