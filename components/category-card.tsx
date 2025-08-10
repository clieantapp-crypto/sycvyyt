import { Smartphone, Wifi, Monitor, Headphones, Phone } from "lucide-react"
import Image from "next/image"
import type { JSX } from "react"

interface CategoryCardProps {
  icon?: "phone" | "wifi" | "mobile" | "tv" | "headphones"
  label: string
  image?: string
  bgColor?: string
}

export function CategoryCard({ icon, label, image, bgColor = "bg-gray-100" }: CategoryCardProps) {
  const getIcon = (): JSX.Element => {
    switch (icon) {
      case "phone":
        return <Smartphone className="w-6 h-6 text-purple-800" />
      case "wifi":
        return <Wifi className="w-6 h-6 text-purple-800" />
      case "mobile":
        return <Phone className="w-6 h-6 text-purple-800" />
      case "tv":
        return <Monitor className="w-6 h-6 text-purple-800" />
      case "headphones":
        return <Headphones className="w-6 h-6 text-purple-800" />
      default:
        return <></>
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`${bgColor} hover:ring-2 ring-purple-500/50 rounded-xl p-3 w-full aspect-square flex items-center justify-center shadow-sm`}>
        {image ? (
          <img
            src={image || "/placeholder.svg"}
            alt={label}
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        ) : (
          getIcon()
        )}
      </div>
      <span className="mt-2 text-xs text-center leading-tight">{label}</span>
    </div>
  )
}
