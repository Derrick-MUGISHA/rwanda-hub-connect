"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Star, MessageSquare, Users, Bed, Bath, PawPrint, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"

interface BookingSidebarProps {
  service: any
  dateRange: {
    from: Date
    to?: Date
  }
  setDateRange: (range: { from: Date; to?: Date }) => void
  guests: number
  setGuests: (guests: number) => void
  isInstantBook: boolean
  setIsInstantBook: (isInstantBook: boolean) => void
  onBookingClick: () => void
  onContactHostClick: () => void
}

export const BookingSidebar = ({
  service,
  dateRange,
  setDateRange,
  guests,
  setGuests,
  isInstantBook,
  setIsInstantBook,
  onBookingClick,
  onContactHostClick,
}: BookingSidebarProps) => {
  const [rooms, setRooms] = useState(1)
  const [beds, setBeds] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)
  const [acceptsPets, setAcceptsPets] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)

  const calculateTotal = () => {
    if (!dateRange.to) return service.price

    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    return service.price * days
  }

  // Helper functions to handle guest count changes
  const decreaseGuests = () => {
    setGuests(Math.max(1, guests - 1))
  }

  const increaseGuests = () => {
    setGuests(Math.min(10, guests + 1))
  }

  // Helper functions for room options
  const decreaseRooms = () => {
    setRooms(Math.max(1, rooms - 1))
  }

  const increaseRooms = () => {
    setRooms(Math.min(5, rooms + 1))
  }

  // Helper functions for bed options
  const decreaseBeds = () => {
    setBeds(Math.max(1, beds - 1))
  }

  const increaseBeds = () => {
    setBeds(Math.min(4, beds + 1))
  }

  // Helper functions for bathroom options
  const decreaseBathrooms = () => {
    setBathrooms(Math.max(1, bathrooms - 1))
  }

  const increaseBathrooms = () => {
    setBathrooms(Math.min(3, bathrooms + 1))
  }

  return (
    <Card className="sticky top-8">
      <CardContent className="p-6">
        <h3 className="font-display text-xl font-semibold mb-4">Book your stay</h3>

        <div className="mb-4">
          <p className="font-bold text-2xl text-rwandan-blue">
            {service.currency} {service.price}
            <span className="text-gray-500 font-normal text-sm">/night</span>
          </p>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1">
              {service.rating} · {service.reviewCount} reviews
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-medium mb-2">When do you plan to stay?</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range || { from: new Date() })}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guest selection */}
        <div className="mb-4">
          <p className="font-medium mb-2">Number of guests</p>
          <div className="flex border rounded">
            <button className="px-4 py-2 border-r" onClick={decreaseGuests}>
              -
            </button>
            <div className="flex-grow text-center py-2 flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              {guests}
            </div>
            <button className="px-4 py-2 border-l" onClick={increaseGuests}>
              +
            </button>
          </div>
        </div>

        {/* Room options - Using Popover instead of static content */}
        <div className="mb-4">
          <Popover open={optionsOpen} onOpenChange={setOptionsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <Bed className="h-4 w-4 mr-2" /> Room Options
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4" align="start">
              <div className="space-y-4">
                <h4 className="font-medium">Room Options</h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm flex items-center">
                        <Bed className="h-4 w-4 mr-2" /> Rooms
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                          onClick={decreaseRooms}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{rooms}</span>
                        <button
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                          onClick={increaseRooms}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm flex items-center">
                        <Bed className="h-4 w-4 mr-2" /> Beds
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                          onClick={decreaseBeds}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{beds}</span>
                        <button
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                          onClick={increaseBeds}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm flex items-center">
                        <Bath className="h-4 w-4 mr-2" /> Bathrooms
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                          onClick={decreaseBathrooms}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{bathrooms}</span>
                        <button
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                          onClick={increaseBathrooms}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <Checkbox
                        id="pets-allowed"
                        checked={acceptsPets}
                        onCheckedChange={() => setAcceptsPets(!acceptsPets)}
                        className="mr-2"
                      />
                      <label htmlFor="pets-allowed" className="text-sm flex items-center cursor-pointer">
                        <PawPrint className="h-4 w-4 mr-2" /> Pet-friendly
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-3 border-t mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setRooms(1)
                      setBeds(1)
                      setBathrooms(1)
                      setAcceptsPets(false)
                    }}
                  >
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setOptionsOpen(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <Checkbox
              checked={isInstantBook}
              onCheckedChange={() => setIsInstantBook(!isInstantBook)}
              className="mr-2"
            />
            <span className="text-sm">Instant Book (no approval needed)</span>
          </label>
        </div>

        <Button className="w-full mb-4" size="lg" onClick={onBookingClick}>
          {isInstantBook ? "Book Now" : "Request to Book"}
        </Button>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>
              {service.currency} {service.price} x 3 nights
            </span>
            <span>
              {service.currency} {service.price * 3}
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
              {service.currency} {service.price * 3 + 30 + 50}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full" onClick={onContactHostClick}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Host
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

