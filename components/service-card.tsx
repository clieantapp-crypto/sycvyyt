import { Store, Shield, ArrowRight, PlusCircle, Download } from "lucide-react"

interface ServiceCardProps {
  icon: "store" | "shield" | "arrow-right" | "plus-circle" | "download"
  title: string
  titleAlignment?: "center" | "default"
}

export function ServiceCard({ icon, title, titleAlignment = "default" }: ServiceCardProps) {
  const getIcon = (): JSX.Element => {
    switch (icon) {
      case "store":
        return <Store className="w-6 h-6 text-white" />
      case "shield":
        return <Shield className="w-6 h-6 text-white" />
      case "arrow-right":
        return <ArrowRight className="w-6 h-6 text-white" />
      case "plus-circle":
        return <PlusCircle className="w-6 h-6 text-white" />
      case "download":
        return <Download className="w-6 h-6 text-white" />
      default:
        return <></>
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-emerald-500 rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-md">
        {getIcon()}
      </div>
      <span className={`mt-2 text-xs ${titleAlignment === "center" ? "text-center" : "text-right"} leading-tight`}>
        {title}
      </span>
    </div>
  )
}
