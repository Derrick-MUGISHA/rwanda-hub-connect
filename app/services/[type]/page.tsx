"use client"

import { services } from "@/data/mockServices"
import { PageLayout } from "@/components/layout/PageLayout"
import { ServiceCard } from "@/components/ui/ServiceCard"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { toast } from "sonner"
// import { services } from "@/data/mockServices"
import { getCurrentUser } from "@/data/localStorage"
// import { PageLayout } from "@/components/layout/PageLayout"
import { ImageGallery } from "@/components/service-detail/ImageGallery"
import { ServiceHeader } from "@/components/service-detail/ServiceHeader"
import { ServiceTabs } from "@/components/service-detail/ServiceTabs"
import { BookingSidebar } from "@/components/service-detail/BookingSidebar"
import { BookingDialog } from "@/components/service-detail/BookingDialog"
import { PaymentDialog } from "@/components/service-detail/PaymentDialog"
import { ContactHostDialog } from "@/components/service-detail/ContactHostDialog"
import { use } from "react";
// import { useParams } from "next/navigation";

export default function ServiceListPage({ params: paramsPromise }: { params: Promise<{ type: string }> }) {
  const params = use(paramsPromise); // Unwrap the params Promise
  const { type } = params;

  // Normalize service types
  const serviceType =
    type === "hotels" ? "hotel" :
    type === "airbnb" ? "airbnb" :
    type === "air-ticket" ? "air-ticket" :
    type === "taxi" ? "taxi" : null;

  // Filter services based on type
  const filteredServices = serviceType ? services.filter(service => service.type === serviceType) : services;

  const title =
    serviceType === "hotel" ? "Hotels in Rwanda" :
    serviceType === "airbnb" ? "Airbnbs & Lodges in Rwanda" :
    serviceType === "air-ticket" ? "Flight Tickets" :
    serviceType === "taxi" ? "Taxi & Transportation" :
    "All Services in Rwanda";

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-rwandan-blue hover:underline flex items-center mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="heading-2 mb-4">{title}</h1>
          <p className="text-gray-600 max-w-3xl">
            {serviceType === "hotel" && "Find top-rated hotels in Rwanda."}
            {serviceType === "airbnb" && "Discover the best lodges and Airbnbs."}
            {serviceType === "air-ticket" && "Compare and book flights easily."}
            {serviceType === "taxi" && "Find reliable taxi and transportation options."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              type={service.type}
              title={service.name}
              location={service.location}
              province={service.province}
              district={service.district || ""}
              image={service.images[0]}
              rating={service.rating}
              price={service.price}
              currency={service.currency}
              rooms={service.rooms}
              beds={service.beds}
              bathrooms={service.bathrooms}
              acceptsPets={service.acceptsPets}
              departureCity={service.departureCity}
              arrivalCity={service.arrivalCity}
              airline={service.airline}
              vehicleTypes={service.vehicleTypes}
              maxPassengers={service.maxPassengers}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No accommodations found.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export function ServiceDetailPage() {
  const params = useParams()
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isFavorited, setIsFavorited] = useState(false)

  // Dialog states
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [contactHostDialogOpen, setContactHostDialogOpen] = useState(false)

  // Booking states
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3)),
  })
  const [guests, setGuests] = useState(2)
  const [isInstantBook, setIsInstantBook] = useState(true)

  useEffect(() => {
    // Get service data based on type and id from URL
    const { type, id } = params
    const serviceData = services.find((s) => s.type === type && s.id === id)

    if (serviceData) {
      // Add review count for display
      setService({
        ...serviceData,
        reviewCount: 24, // Mock data
        currency: "$", // Mock data
      })
    }

    setLoading(false)

    // Get current user
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)

      // Check if service is in user's favorites
      const favorites = localStorage.getItem(`favorites_${user.id}`)
      if (favorites) {
        const favList = JSON.parse(favorites)
        setIsFavorited(favList.some((fav: string) => fav === `${type}_${id}`))
      }
    }
  }, [params])

  const toggleFavorite = () => {
    if (!currentUser) {
      toast.error("Please log in to save favorites")
      return
    }

    const favoriteId = `${params.type}_${params.id}`
    const favorites = localStorage.getItem(`favorites_${currentUser.id}`) || "[]"
    const favList = JSON.parse(favorites)

    if (isFavorited) {
      const newFavs = favList.filter((fav: string) => fav !== favoriteId)
      localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(newFavs))
      setIsFavorited(false)
      toast.success("Removed from favorites")
    } else {
      favList.push(favoriteId)
      localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(favList))
      setIsFavorited(true)
      toast.success("Added to favorites")
    }
  }

  const shareService = () => {
    if (navigator.share) {
      navigator
        .share({
          title: service?.name,
          text: `Check out ${service?.name} in ${service?.location}, Rwanda`,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback if sharing fails
          copyToClipboard()
        })
    } else {
      // Fallback for browsers that don't support sharing
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard")
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-[400px] bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-40 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="lg:w-1/3">
                <div className="h-80 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (!service) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <p>The service you're looking for doesn't exist or has been removed.</p>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Service Header */}
        <ServiceHeader
          service={service}
          currentUser={currentUser}
          isFavorited={isFavorited}
          toggleFavorite={toggleFavorite}
          shareService={shareService}
        />

        {/* Image Gallery */}
        <ImageGallery images={service.images} alt={service.name} />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Service Tabs */}
            <ServiceTabs service={service} currentUser={currentUser} />
          </div>

          <div className="lg:w-1/3">
            {/* Booking Sidebar */}
            <BookingSidebar
              service={service}
              dateRange={dateRange}
              setDateRange={setDateRange}
              guests={guests}
              setGuests={setGuests}
              isInstantBook={isInstantBook}
              setIsInstantBook={setIsInstantBook}
              onBookingClick={() => setBookingDialogOpen(true)}
              onContactHostClick={() => setContactHostDialogOpen(true)}
            />
          </div>
        </div>

        {/* Dialogs */}
        <BookingDialog
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          onPaymentClick={() => {
            setBookingDialogOpen(false)
            setPaymentDialogOpen(true)
          }}
          service={service}
          currentUser={currentUser}
          dateRange={dateRange}
          setDateRange={setDateRange}
          isInstantBook={isInstantBook}
        />

        <PaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          service={service}
          currentUser={currentUser}
          dateRange={dateRange}
          guests={guests}
        />

        <ContactHostDialog
          open={contactHostDialogOpen}
          onOpenChange={setContactHostDialogOpen}
          serviceId={service.id}
        />
      </div>
    </PageLayout>
  )
}
