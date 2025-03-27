// components/ui/ServiceCard.tsx
import Link from "next/link"
import { Star, MapPin, Bed, Bath, PawPrint, Plane, Car } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  id: string
  type: "hotel" | "airbnb" | "air-ticket" | "taxi"
  title: string
  location: string
  province: string
  district?: string
  image: string
  rating: number
  price: number
  currency: string
  // Accommodation specific
  rooms?: number
  beds?: number
  bathrooms?: number
  acceptsPets?: boolean
  // Flight specific
  departureCity?: string
  arrivalCity?: string
  airline?: string
  flightClass?: string
  // Taxi specific
  vehicleTypes?: string[]
  driverIncluded?: boolean
  maxPassengers?: number
  className?: string
}

export const ServiceCard = ({
  id,
  type,
  title,
  location,
  province,
  district,
  image,
  rating,
  price,
  currency,
  rooms,
  beds,
  bathrooms,
  acceptsPets,
  departureCity,
  arrivalCity,
  airline,
  flightClass,
  vehicleTypes,
  driverIncluded,
  maxPassengers,
  className,
}: ServiceCardProps) => {
  const isAccommodation = type === "hotel" || type === "airbnb"
  const isFlight = type === "air-ticket"
  const isTaxi = type === "taxi"

  return (
    <Link
      href={`/services/${type}/${id}`}
      className={cn(
        "block rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow transition-all hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image || "/placeholder.svg?height=300&width=400"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full py-1 px-3 text-xs font-medium">
          {type === "hotel" && "Hotel"}
          {type === "airbnb" && "Airbnb"}
          {type === "air-ticket" && "Flight"}
          {type === "taxi" && "Taxi"}
        </div>
        {acceptsPets && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full py-1 px-2 text-xs font-medium flex items-center">
            <PawPrint className="h-3 w-3 mr-1" />
            Pet-friendly
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center mb-1">
          <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>

        <h3 className="font-display text-lg font-semibold mb-1 line-clamp-1">{title}</h3>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">
            {isFlight ? `${departureCity} → ${arrivalCity}` : `${location}, ${province}`}
          </span>
        </div>

        {isAccommodation && (
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-gray-100 rounded-full py-1 px-2 text-xs flex items-center">
              <Bed className="h-3 w-3 mr-1" />
              {rooms} {rooms === 1 ? "Room" : "Rooms"}
            </div>
            <div className="bg-gray-100 rounded-full py-1 px-2 text-xs flex items-center">
              <Bed className="h-3 w-3 mr-1" />
              {beds} {beds === 1 ? "Bed" : "Beds"}
            </div>
            <div className="bg-gray-100 rounded-full py-1 px-2 text-xs flex items-center">
              <Bath className="h-3 w-3 mr-1" />
              {bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}
            </div>
          </div>
        )}

        {isFlight && (
          <div className="flex flex-wrap gap-2 mb-4">
            {airline && (
              <div className="bg-gray-100 rounded-full py-1 px-2 text-xs flex items-center">
                <Plane className="h-3 w-3 mr-1" />
                {airline}
              </div>
            )}
            {flightClass && (
              <div className="bg-gray-100 rounded-full py-1 px-2 text-xs flex items-center">
                {flightClass}
              </div>
            )}
          </div>
        )}

        {isTaxi && (
          <div className="flex flex-wrap gap-2 mb-4">
            {vehicleTypes && (
              <div className="bg-gray-100 rounded-full py-1 px-2 text-xs flex items-center">
                <Car className="h-3 w-3 mr-1" />
                {vehicleTypes.join(", ")}
              </div>
            )}
            {maxPassengers && (
              <div className="bg-gray-100 rounded-full py-1 px-2 text-xs flex items-center">
                Max {maxPassengers} passengers
              </div>
            )}
            {driverIncluded && (
              <div className="bg-gray-100 rounded-full py-1 px-2 text-xs flex items-center">
                Driver included
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="font-display font-semibold text-lg">
              {currency} {price}
            </span>
            <span className="text-gray-500 text-sm">
              {isFlight && " (Round Trip)"}
              {isTaxi && "/ day"}
              {isAccommodation && "/ night"}
            </span>
          </div>
          <div className="text-rwandan-blue text-sm font-medium">View details</div>
        </div>
      </div>
    </Link>
  )
}