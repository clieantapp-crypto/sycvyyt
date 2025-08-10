import Image from "next/image"

interface GiftCardProps {
  image: string
  title: string
}

export function GiftCard({ image, title }: GiftCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-center mb-2">
        <Image src={image || "/placeholder.svg"} alt={title} width={100} height={100} className="h-24 object-contain" />
      </div>
      <div className="text-center">
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
    </div>
  )
}
