import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-8 px-4">
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-bold mb-4 text-lg">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            <li>الرئيسية</li>
            <li>الأجهزة</li>
            <li>الباقات</li>
            <li>العروض</li>
            <li>الدعم</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-lg">معلومات</h3>
          <ul className="space-y-2 text-sm">
            <li>من نحن</li>
            <li>الوظائف</li>
            <li>الشروط والأحكام</li>
            <li>سياسة الخصوصية</li>
            <li>اتصل بنا</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center space-x-reverse space-x-4 mb-8">
        <div className="bg-purple-800 p-2 rounded-full">
          <Facebook className="w-5 h-5" />
        </div>
        <div className="bg-purple-800 p-2 rounded-full">
          <Twitter className="w-5 h-5" />
        </div>
        <div className="bg-purple-800 p-2 rounded-full">
          <Instagram className="w-5 h-5" />
        </div>
        <div className="bg-purple-800 p-2 rounded-full">
          <Youtube className="w-5 h-5" />
        </div>
        <div className="bg-purple-800 p-2 rounded-full">
          <Linkedin className="w-5 h-5" />
        </div>
      </div>

      <div className="text-center text-sm mb-4">
        <p>© 2025 شركة الاتصالات الكويتية. جميع الحقوق محفوظة</p>
      </div>

      <div className="flex justify-center">
        <Image src="/vercel.svg" alt="STC Logo" width={60} height={30} className="h-8 w-auto" />
      </div>
    </footer>
  )
}
