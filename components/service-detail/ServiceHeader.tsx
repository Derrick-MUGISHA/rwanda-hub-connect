"use client"

import { MapPin, Heart, HeartOff, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Rating } from "@/components/ui/Rating"
import { Service } from "@/data/mockServices"
import { UserProfile } from "@/data/localStorage"

interface ServiceHeaderProps {
  service: Service
  currentUser: UserProfile | null
  isFavorited: boolean
  toggleFavorite: () => void
  shareService: () => void
}

export const ServiceHeader = ({ service, isFavorited, toggleFavorite, shareService }: ServiceHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h1 className="heading-2 mb-1">{service.name}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{service.location}</span>
          </div>

          <div className="flex items-center">
            <Rating value={service.rating} readOnly />
            <span className="ml-1 text-gray-500">({service.reviewCount} reviews)</span>
          </div>

          <span className="bg-rwandan-green text-white px-2 py-0.5 rounded-full text-sm capitalize">
            {service.type}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={toggleFavorite} className={isFavorited ? "text-red-500" : ""}>
          {isFavorited ? <HeartOff className="mr-1 h-4 w-4" /> : <Heart className="mr-1 h-4 w-4" />}
          {isFavorited ? "Saved" : "Save"}
        </Button>

        <Button variant="outline" size="sm" onClick={shareService}>
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}

