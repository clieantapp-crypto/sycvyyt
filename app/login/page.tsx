import Image from "next/image"
import { Search, ShoppingCart, User, Store, Shield, ArrowRight, PlusCircle, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"


export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center space-x-4">
          <button className="p-2">
            <User className="w-6 h-6 text-red-500" />
          </button>
          <button className="p-2">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
          </button>
          <button className="p-2">
            <Search className="w-6 h-6 text-gray-800" />
          </button>
        </div>
       
        <div className="flex items-center">
          <Image src="/next.svg" alt="STC Logo" width={80} height={40} className="h-10 w-auto" />
        </div>
        <button className="p-2">
          <div className="flex flex-col space-y-1">
            <div className="w-6 h-0.5 bg-purple-800"></div>
            <div className="w-6 h-0.5 bg-purple-800"></div>
            <div className="w-6 h-0.5 bg-purple-800"></div>
          </div>
        </button>
      </header>

      {/* Hero Banner */}
      <div className="relative rounded-3xl mx-4 my-6 overflow-hidden">
        <img src="/hero-banner.jpg" alt="Hero Banner" width={700} height={400} className="rounded-3xl" />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="bg-white/90 p-2 rounded-lg w-32 text-center">
            <div className="text-red-500 font-bold text-xl">ON خلك</div>
            <div className="text-red-500 text-[8px] mt-1">باقات الدفع المسبقة الجديدة كلياً</div>
          </div>

          <div className="space-y-2">
            <h1 className="text-white font-bold text-3xl text-right">
              تواصل بدون انقطاع
              <br />
              مع باقات الدفع الآجل
            </h1>
            <div className="flex justify-end mt-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6">اعرف أكثر</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Icons */}
      <div className="grid grid-cols-4 gap-4 px-4 mt-6">
        <div className="flex flex-col items-center">
          <div className="bg-emerald-500 rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <Store className="w-8 h-8 text-white" />
          </div>
          <span className="mt-2 text-sm text-center">e-store</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-emerald-500 rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <span className="mt-2 text-sm text-center">
            تحديث
            <br />
            البطاقة
            <br />
            المدنية
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-emerald-500 rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
          <span className="mt-2 text-sm text-center">
            نقل إلى
            <br />
            stc
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-emerald-500 rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <PlusCircle className="w-8 h-8 text-white" />
          </div>
          <span className="mt-2 text-sm text-center">
            احصل على
            <br />
            خط جديد
          </span>
        </div>
      </div>

      {/* Quick Payment */}
      <div className="mx-4 mt-12 p-6 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <CreditCard className="w-8 h-8 text-purple-800" />
          <h2 className="text-2xl font-bold text-right text-gray-800">الدفع السريع</h2>
        </div>

        <Input
          placeholder="رقم الجوال/البطاقة المدنية أو رقم العقد"
          className="text-right border-b border-gray-300 rounded-none focus:ring-0 mb-6"
        />

        <Button className="w-full bg-red-400 hover:bg-red-500 text-white rounded-full py-3">تابع الآن</Button>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 left-6">
        <div className="bg-green-500 rounded-full p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
