"use client"

import { ArrowRight, ChevronDown, Globe, Menu, QrCode } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function KuwaitMobileID() {
  const [language, setLanguage] = useState("English")
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

    // Check for iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setIsIOS(true)
    }

    // Check for Android
    if (/android/i.test(userAgent)) {
      setIsAndroid(true)
    }
  }, [])

  const handleOpenApp = () => {
    if (isIOS) {
      window.open(
        "https://apps.apple.com/kw/app/kuwait-mobile-id-%D9%87%D9%88%D9%8A%D8%AA%D9%8A/id1449712307",
        "_blank",
      )
    } else if (isAndroid) {
      window.open("https://play.google.com/store/apps/details?id=kw.gov.paci.PACIMobileID", "_blank")
    } else {
      // Fallback for desktop or unknown devices - show both options
      window.open(
        "https://apps.apple.com/kw/app/kuwait-mobile-id-%D9%87%D9%88%D9%8A%D8%AA%D9%8A/id1449712307",
        "_blank",
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full transform -translate-x-1/3 translate-y-1/3 opacity-15"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-yellow-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-20"></div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
      </div>

      {/* Header with language selector */}
     
      {/* Main content */}
      <main className="flex flex-col items-center px-6 pt-8 pb-16 relative z-10">
        {/* Phone illustration */}
        <div className="mb-12 relative">
          <div className="w-64 h-[500px] bg-black rounded-[40px] shadow-2xl p-3 relative">
            {/* Phone notch */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20"></div>

            {/* Phone screen */}
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-900 rounded-[32px] relative overflow-hidden">
              {/* Status bar */}
              <div className="h-8 px-6 flex justify-between items-center">
                <div className="text-white text-xs">9:00</div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-white/80"></div>
                  <div className="w-3 h-3 rounded-full bg-white/80"></div>
                  <div className="w-3 h-3 rounded-full bg-white/80"></div>
                </div>
              </div>

              {/* App content */}
              <div className="p-4 flex flex-col h-[calc(100%-32px)]">
                {/* Kuwait emblem */}
                <div className="flex justify-center mb-6 mt-4">
                  <div className="w-20 h-20 relative">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>
                    <div className="absolute inset-2 bg-white rounded-full"></div>
                    <div className="absolute inset-3 bg-blue-800 rounded-full"></div>
                    <div className="absolute inset-5 bg-yellow-400 rounded-full"></div>
                    <div className="absolute inset-7 bg-white rounded-full flex items-center justify-center">
                      <div className="text-blue-900 font-bold text-xs">KWT</div>
                    </div>
                  </div>
                </div>

                {/* App title */}
                <div className="text-center mb-8">
                  <h3 className="text-white text-lg font-medium">Kuwait Mobile ID</h3>
                  <h4 className="text-yellow-400 text-sm">Digital Identity Platform</h4>
                </div>

                {/* ID Card */}
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-20 bg-blue-100 rounded-lg overflow-hidden">
                      <div className="w-full h-3/4 bg-[url('/placeholder.svg?height=120&width=80')] bg-cover bg-center"></div>
                      <div className="w-full h-1/4 bg-blue-800 flex items-center justify-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded mb-2 w-1/2"></div>
                      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                      <div className="mt-3 flex items-center">
                        <QrCode className="w-5 h-5 text-blue-800" />
                        <div className="ml-2 h-2 bg-blue-800 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-1 mb-auto">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                </div>

                {/* Bottom app bar */}
                <div className="mt-auto pt-4 flex justify-around">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                      <QrCode className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-xs">Scan</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mb-1">
                      <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
                    </div>
                    <span className="text-white text-xs">ID</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                      <Menu className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-xs">Menu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone reflection */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-48 h-20 bg-black/20 rounded-[100%] blur-md"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-white text-3xl font-bold mb-2">
            <span className="text-yellow-400">Kuwait</span> Mobile ID
          </h1>
          <h2 className="text-white text-4xl font-bold mb-3" style={{ fontFamily: "Arial, sans-serif" }}>
            هـــويــتــي
          </h2>
          <p className="text-white/80 max-w-md mx-auto">
          يرجى فتح تطبيق "هويتي" والمصادقة على الطلب لإتمام العملية.
</p>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-sm space-y-2">
          <Button
            onClick={handleOpenApp}
            className="w-full bg-white hover:bg-gray-100 text-blue-800 font-semibold py-6 text-lg rounded-xl flex items-center justify-center"
          >
            <span style={{ fontFamily: "Arial, sans-serif" }}>فتح التطبيق</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            className="w-full border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-6 text-lg rounded-xl"
          >
            Learn More
          </Button>
        </div>
      </main>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-8 pt-4 relative z-10">
        <div className="w-12 h-1.5 bg-white/30 rounded-full"></div>
      </div>
    </div>
  )
}