import { Store, Shield, ArrowRight, PlusCircle } from "lucide-react"

interface ServiceCardProps {
  icon: "store" | "shield" | "arrow-right" | "plus-circle"
  title: string
  titleAlignment?: "center" | "default"
}

export function ServiceCard({ icon, title, titleAlignment = "default" }: ServiceCardProps) {
  const getIcon = (): JSX.Element => {
    switch (icon) {
      case "store":
        return <Store className="w-8 h-8 text-white text-center" />
      case "shield":
        return <Shield className="w-8 h-8 text-white" />
      case "arrow-right":
        return <ArrowRight className="w-8 h-8 text-white" />
      case "plus-circle":
        return <PlusCircle className="w-8 h-8 text-white" />
      default:
        return <></>
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-emerald-500 rounded-full p-4 w-16 h-16 flex items-center justify-center shadow-md">
        {getIcon()}
      </div>
      <span className={`mt-2 text-sm ${titleAlignment === "center" ? "text-center" : "text-center"} leading-tight`}>
        {title}
      </span>
    </div>
  )
}
