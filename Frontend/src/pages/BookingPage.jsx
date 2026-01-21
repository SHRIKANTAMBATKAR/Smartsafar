import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Bus, MapPin, Clock, CreditCard, Wallet, Smartphone, CheckCircle, ArrowLeft, Minus, Plus, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [stops, setStops] = useState([]);
  const [isLoadingStops, setIsLoadingStops] = useState(false);

  // Get booking data from URL params
  const busId = searchParams.get("busId");
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const routeNameParam = searchParams.get("routeName");

  const [bus] = useState({
    id: busId,
    number: routeNameParam || "Bus",
    name: routeNameParam || "Route",
  });

  const [fromStop, setFromStop] = useState(fromParam || "");
  const [toStop, setToStop] = useState(toParam || "");

  // Load route stops if routeId is available (for now using mock calculation)
  // In a full implementation, you'd fetch routeId from bus data or pass it as param
  const calculateFare = () => {
    // Simple fare calculation - can be replaced with backend API call
    const baseFare = 10.0;
    const farePerKm = 2.0;
    // Mock distance calculation - in real app, calculate from stop coordinates
    const estimatedDistance = 5; // km
    return baseFare + (estimatedDistance * farePerKm);
  };

  const singleFare = calculateFare();
  const totalFare = singleFare * passengers;

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to book tickets",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!busId) {
      toast({
        title: "Invalid booking",
        description: "Bus information is missing",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Step 1: Book the ticket
      const bookingRequest = {
        userId: parseInt(user.userId),
        busId: parseInt(busId),
        routeId: null, // Route ID - may need to be fetched or passed separately
        fromStop: fromStop,
        toStop: toStop,
        passengerCount: passengers,
        totalFare: totalFare,
      };

      const ticketResponse = await api.post("/tickets/book", bookingRequest);
      const ticket = ticketResponse.data;

      // Step 2: Process payment
      const paymentRequest = {
        ticketId: ticket.ticketId,
        amount: totalFare,
        paymentMode: paymentMethod === "card" ? "CARD" : paymentMethod === "upi" ? "UPI" : "WALLET",
      };

      await api.post("/payments", paymentRequest);

      setIsProcessing(false);
      setStep(3);
      toast({
        title: "Booking Confirmed!",
        description: `Your ticket #${ticket.ticketId} has been booked successfully.`,
      });
    } catch (error) {
      console.error("Booking error:", error);
      setIsProcessing(false);
      toast({
        title: "Booking failed",
        description: error.response?.data?.message || "Unable to complete booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button variant="ghost" className="mb-4 gap-2" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {step === 3 ? "Booking Confirmed!" : "Book Your Ticket"}
            </h1>
            <p className="text-muted-foreground">
              {step === 1 && "Select passengers and confirm your trip details"}
              {step === 2 && "Complete payment to confirm your booking"}
              {step === 3 && "Your digital ticket is ready"}
            </p>
          </motion.div>

          {/* Progress Steps */}
          {step < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${s <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && <div className={`w-12 h-1 rounded ${s < step ? "bg-primary" : "bg-secondary"}`} />}
                </div>
              ))}
            </motion.div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Step 1: Trip Details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Bus Card */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Bus className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{bus.number} - {bus.name}</h3>
                        <p className="text-muted-foreground text-sm">{bus.duration} • {stops.length} stops</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div className="text-center w-1/3">
                        <p className="text-xl font-bold">{bus.departureTime}</p>
                        <Select value={fromStop} onValueChange={setFromStop}>
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="From" />
                          </SelectTrigger>
                          <SelectContent>
                            {stops.map((stop) => (
                              <SelectItem key={stop} value={stop} disabled={stop === toStop}>
                                {stop}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 flex items-center justify-center px-4">
                        <div className="w-3 h-3 rounded-full bg-success" />
                        <div className="flex-1 h-px bg-border mx-2" />
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1 h-px bg-border mx-2" />
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                      </div>
                      <div className="text-center w-1/3">
                        <p className="text-xl font-bold">{bus.arrivalTime}</p>
                        <Select value={toStop} onValueChange={setToStop}>
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="To" />
                          </SelectTrigger>
                          <SelectContent>
                            {stops.map((stop) => (
                              <SelectItem key={stop} value={stop} disabled={stop === fromStop}>
                                {stop}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-4">Number of Passengers</h3>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        disabled={passengers <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-2xl font-bold w-12 text-center">{passengers}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPassengers(Math.min(10, passengers + 1))}
                        disabled={passengers >= 10}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={singleFare === 0}
                  >
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Payment Methods */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-4">Payment Method</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                        </div>
                      </label>
                      <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                        <RadioGroupItem value="upi" id="upi" />
                        <Smartphone className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">UPI</p>
                          <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </label>
                      <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Wallet className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">CityBus Wallet</p>
                          <p className="text-sm text-muted-foreground">Balance: ₹50.00</p>
                        </div>
                      </label>
                    </RadioGroup>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === "card" && (
                    <div className="bg-card rounded-xl border border-border p-6">
                      <h3 className="font-semibold mb-4">Card Details</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" type="password" className="mt-1" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="name">Name on Card</Label>
                          <Input id="name" placeholder="John Doe" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  <Button size="lg" className="w-full" onClick={handleBooking} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${totalFare.toFixed(2)}`
                    )}
                  </Button>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl border border-border p-8 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                  <p className="text-muted-foreground mb-8">
                    Your ticket has been booked and sent to your email.
                  </p>

                  {/* Digital Ticket Preview */}
                  <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-primary-foreground text-left max-w-sm mx-auto">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-primary-foreground/70 text-sm">Bus</p>
                        <p className="text-2xl font-bold">{bus.number}</p>
                      </div>
                      <Bus className="w-8 h-8 opacity-50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-primary-foreground/70 text-xs">From</p>
                        <p className="font-medium">{fromStop}</p>
                      </div>
                      <div>
                        <p className="text-primary-foreground/70 text-xs">To</p>
                        <p className="font-medium">{toStop}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary-foreground/20">
                      <div>
                        <p className="text-primary-foreground/70 text-xs">Passengers</p>
                        <p className="font-medium">{passengers}</p>
                      </div>
                      <div>
                        <p className="text-primary-foreground/70 text-xs">Status</p>
                        <p className="font-medium">Confirmed</p>
                      </div>
                      <div>
                        <p className="text-primary-foreground/70 text-xs">Total</p>
                        <p className="font-bold">₹{totalFare.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center mt-8">
                    <Button variant="outline" onClick={() => navigate("/dashboard")}>
                      View My Tickets
                    </Button>
                    <Button onClick={() => navigate("/search")}>
                      Book Another Trip
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar Summary */}
            {step < 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-6 h-fit sticky top-24"
              >
                <h3 className="font-semibold mb-4">Trip Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bus</span>
                    <span className="font-medium">{bus.number} - {bus.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route</span>
                    <span className="font-medium text-right">{fromStop} <br />↓<br /> {toStop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="font-medium">{passengers}</span>
                  </div>
                  <div className="border-t border-border my-4" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fare per person</span>
                    <span>₹{singleFare.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{totalFare.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
