import Image from "next/image"

interface ProductCardProps {
  image: string
  title: string
  price: string
  currency: string
  installment?: string
}

export function ProductCard({ image, title, price, currency, installment }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-center mb-4">
        <img src={image || "/placeholder.svg"} alt={title} width={120} height={120} className="h-32 object-contain" />
      </div>
      <div className="text-right">
        <h3 className="font-medium text-sm mb-2">{title}</h3>
        <div className="flex justify-end items-baseline gap-1">
          <span className="text-xs text-gray-600">{currency}</span>
          <span className="font-bold text-lg">{price}</span>
        </div>
        {installment && (
          <div className="text-xs text-gray-500 mt-1">
            أو {installment} {currency} شهرياً
          </div>
        )}
      </div>
    </div>
  )
}
