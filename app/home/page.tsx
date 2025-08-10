import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Menu, ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">القائمة</span>
            </Button>
            <Link href="/" className="flex items-center space-x-2 ml-2">
              <span className="text-xl font-bold">مدونة الاتصالات العربية</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#" className="font-medium transition-colors hover:text-primary">
              الرئيسية
            </Link>
            <Link href="#" className="font-medium transition-colors hover:text-primary">
              المقالات
            </Link>
            <Link href="#" className="font-medium transition-colors hover:text-primary">
              التقنيات
            </Link>
            <Link href="#" className="font-medium transition-colors hover:text-primary">
              الأخبار
            </Link>
            <Link href="#" className="font-medium transition-colors hover:text-primary">
              اتصل بنا
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <form className="hidden md:flex">
              <div className="relative">
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="بحث..." className="w-48 pr-8 md:w-64 lg:w-80" />
              </div>
            </form>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">بحث</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                أحدث التطورات في عالم الاتصالات
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                اكتشف أحدث التقنيات والابتكارات في مجال الاتصالات وتكنولوجيا المعلومات من خلال مدونتنا المتخصصة
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button>اقرأ المزيد</Button>
                <Button variant="outline">اشترك في النشرة الإخبارية</Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 relative h-[300px] w-full">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="صورة توضيحية لتكنولوجيا الاتصالات"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">أحدث المقالات</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                اطلع على أحدث المقالات والتحليلات في مجال الاتصالات وتكنولوجيا المعلومات
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "تقنية الجيل الخامس وتأثيرها على المستقبل",
                description: "استكشاف تقنية الجيل الخامس وكيف ستغير مستقبل الاتصالات والإنترنت",
                date: "١٠ مايو ٢٠٢٥",
                category: "تقنيات",
                image: "5g-technology",
              },
              {
                title: "الذكاء الاصطناعي في قطاع الاتصالات",
                description: "كيف يساهم الذكاء الاصطناعي في تطوير خدمات الاتصالات وتحسين تجربة المستخدم",
                date: "٥ مايو ٢٠٢٥",
                category: "الذكاء الاصطناعي",
                image: "ai-telecom",
              },
              {
                title: "مستقبل إنترنت الأشياء في المنطقة العربية",
                description: "نظرة على تطور إنترنت الأشياء وتطبيقاتها في المنطقة العربية",
                date: "١ مايو ٢٠٢٥",
                category: "إنترنت الأشياء",
                image: "iot-arabic",
              },
            ].map((post, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-60 w-full">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&query=${post.image}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="link" className="p-0">
                    اقرأ المزيد
                    <ChevronLeft className="mr-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="outline">عرض المزيد من المقالات</Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">تصفح حسب الفئة</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                استكشف مقالاتنا المصنفة حسب المواضيع المختلفة في مجال الاتصالات
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "الجيل الخامس", count: 24 },
              { name: "الذكاء الاصطناعي", count: 18 },
              { name: "إنترنت الأشياء", count: 16 },
              { name: "الأمن السيبراني", count: 12 },
              { name: "الحوسبة السحابية", count: 10 },
              { name: "البيانات الضخمة", count: 8 },
              { name: "الاتصالات الفضائية", count: 6 },
              { name: "الشبكات اللاسلكية", count: 14 },
            ].map((category, index) => (
              <Card key={index} className="flex flex-col items-center justify-center p-6 text-center">
                <CardContent className="p-0">
                  <p className="text-lg font-bold">{category.name}</p>
                  <p className="text-sm text-muted-foreground">{category.count} مقال</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">اشترك في نشرتنا الإخبارية</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                احصل على آخر الأخبار والمقالات في مجال الاتصالات وتكنولوجيا المعلومات
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2 min-[400px]:flex-row">
                <Input type="email" placeholder="بريدك الإلكتروني" required />
                <Button type="submit">اشترك</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                لن نشارك بريدك الإلكتروني مع أي جهة أخرى. اقرأ{" "}
                <Link href="#" className="underline underline-offset-2">
                  سياسة الخصوصية
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">عن المدونة</h3>
              <p className="text-sm text-muted-foreground">
                مدونة متخصصة في مجال الاتصالات وتكنولوجيا المعلومات تقدم أحدث الأخبار والتحليلات
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">روابط سريعة</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    المقالات
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    التقنيات
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    الأخبار
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">الفئات</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    الجيل الخامس
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    الذكاء الاصطناعي
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    إنترنت الأشياء
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    الأمن السيبراني
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">تواصل معنا</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    الشروط والأحكام
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">© 2025 مدونة الاتصالات العربية. جميع الحقوق محفوظة.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">تويتر</span>
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
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">فيسبوك</span>
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
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">انستغرام</span>
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
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">لينكد إن</span>
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
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
