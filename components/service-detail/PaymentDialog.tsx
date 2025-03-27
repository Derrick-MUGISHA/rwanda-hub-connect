"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard } from "lucide-react"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { saveBooking, type Booking } from "@/data/localStorage"

// Payment method type
type PaymentMethod = "credit_card" | "paypal" | "bitcoin" | "bank_transfer" | "cash"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: any
  currentUser: any
  dateRange: {
    from: Date
    to?: Date
  }
  guests: number
}

export const PaymentDialog = ({ open, onOpenChange, service, currentUser, dateRange, guests }: PaymentDialogProps) => {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card")

  const calculateTotal = () => {
    if (!dateRange.to) return service.price

    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    return service.price * days
  }

  const handlePayment = () => {
    if (!currentUser) {
      toast.error("Please log in to complete this booking")
      router.push("/login")
      return
    }

    // Create a completed booking
    const newBooking: Booking = {
      id: uuidv4(),
      serviceId: service.id,
      userId: currentUser.id,
      checkIn: dateRange.from.toISOString(),
      checkOut: dateRange.to ? dateRange.to.toISOString() : new Date().toISOString(),
      guests: guests,
      totalPrice: calculateTotal() + 30 + 50, // Including fees
      status: "approved",
      createdAt: new Date().toISOString(),
    }

    saveBooking(newBooking)

    onOpenChange(false)
    toast.success("Booking confirmed! Check your bookings in your account page.")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Payment Method</label>
            <Select value={paymentMethod} onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">Credit/Debit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === "credit_card" && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <Input placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <Input placeholder="123" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                <Input placeholder="John Doe" />
              </div>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="text-center py-6">
              <CreditCard className="h-16 w-16 mx-auto text-blue-500 mb-4" />
              <p className="font-medium">Connect to PayPal</p>
              <p className="text-sm text-gray-500 mt-1 mb-4">You'll be redirected to PayPal to complete your payment</p>
              <Button className="w-full">Connect to PayPal</Button>
            </div>
          )}

          {paymentMethod === "bitcoin" && (
            <div className="text-center py-6">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="font-mono text-sm break-all">bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq</p>
              </div>
              <p className="text-sm text-gray-500 mb-2">Send exactly 0.0042 BTC to the address above</p>
              <p className="text-sm text-gray-500">Transaction will be confirmed automatically</p>
            </div>
          )}

          {paymentMethod === "bank_transfer" && (
            <div className="space-y-3">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium mb-2">Bank Transfer Details</p>
                <p className="text-sm">Account Name: Rwanda Tourism Services</p>
                <p className="text-sm">Account Number: 1234567890</p>
                <p className="text-sm">SWIFT/BIC: RWANDABANK</p>
                <p className="text-sm">Reference: BOOKING-{service.id?.slice(0, 8)}</p>
              </div>
              <p className="text-sm text-gray-500">Please include the reference number in your transfer</p>
            </div>
          )}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total to Pay</span>
              <span>
                {service.currency} {calculateTotal() + 30 + 50}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handlePayment}>Complete Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

