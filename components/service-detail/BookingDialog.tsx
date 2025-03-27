"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { saveBooking, type Booking } from "@/data/localStorage"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPaymentClick: () => void
  service: any
  currentUser: any
  dateRange: {
    from: Date
    to?: Date
  }
  setDateRange: (range: { from: Date; to?: Date }) => void
  isInstantBook: boolean
}

export const BookingDialog = ({
  open,
  onOpenChange,
  onPaymentClick,
  service,
  currentUser,
  dateRange,
  setDateRange,
  isInstantBook,
}: BookingDialogProps) => {
  const router = useRouter()

  const calculateTotal = () => {
    if (!dateRange.to) return service.price

    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    return service.price * days
  }

  const handleBooking = () => {
    if (!currentUser) {
      toast.error("Please log in to book this accommodation")
      router.push("/login")
      return
    }

    if (isInstantBook) {
      // Move to payment directly
      onOpenChange(false)
      onPaymentClick()
    } else {
      // Create a pending booking
      const newBooking: Booking = {
        id: uuidv4(),
        serviceId: service.id,
        userId: currentUser.id,
        checkIn: dateRange.from.toISOString(),
        checkOut: dateRange.to ? dateRange.to.toISOString() : new Date().toISOString(),
        guests: 2, // Default value
        totalPrice: calculateTotal() + 30 + 50, // Including fees
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      saveBooking(newBooking)

      onOpenChange(false)
      toast.success("Booking request sent to host! You will be notified once it's approved.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete your booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="border rounded p-4 mb-4">
            <p className="font-medium mb-2">Select dates</p>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => setDateRange(range || { from: new Date() })}
              numberOfMonths={1}
              disabled={(date) => date < new Date()}
              className="rounded border"
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>
                {service.currency} {service.price} x{" "}
                {dateRange.to
                  ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
                  : 1}{" "}
                nights
              </span>
              <span>
                {service.currency} {calculateTotal()}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Cleaning fee</span>
              <span>{service.currency} 30</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Service fee</span>
              <span>{service.currency} 50</span>
            </div>
            <div className="flex justify-between font-bold pt-4 border-t">
              <span>Total</span>
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
          <Button onClick={handleBooking}>{isInstantBook ? "Proceed to Payment" : "Request to Book"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

