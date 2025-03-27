"use client"

import { User, Shield, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Rating } from "@/components/ui/Rating"
import { ReviewSection } from "./ReviewSection"
import { Service } from "@/data/mockServices"
import { UserProfile } from "@/data/localStorage"

interface ServiceTabsProps {
  service: Service
  currentUser: UserProfile | null
}

export const ServiceTabs = ({ service, currentUser }: ServiceTabsProps) => {
  return (
    <Tabs defaultValue="details">
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="host">Host</TabsTrigger>
        <TabsTrigger value="policies">Policies</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="text-gray-700">
        <div className="prose max-w-none">
          <p className="text-lg mb-4">{service.description}</p>

          <h3 className="font-display text-xl font-semibold mt-6 mb-3">About this place</h3>
          <p>
            Experience the best of Rwandan hospitality in this{" "}
            {service.type === "hotel" ? "premium hotel" : "beautiful property"}. Located in {service.location}, you'll
            be close to major attractions and enjoy convenient access to local amenities.
          </p>

          <h3 className="font-display text-xl font-semibold mt-6 mb-3">House rules</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Check-in: After 2:00 PM</li>
            <li>Checkout: Before 11:00 AM</li>
            <li>No smoking</li>
            <li>No parties or events</li>
            {service.type === "airbnb" && <li>Pets allowed (with restrictions)</li>}
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="amenities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
          {service.amenities.map((amenity: string, index: number) => (
            <div key={index} className="flex items-center">
              <Check className="h-5 w-5 text-rwandan-green mr-2" />
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="location">
        <p className="mb-4">Located in {service.location}, Rwanda.</p>
        <div className="bg-gray-200 rounded-lg h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Map will be displayed here (Google Maps integration)</p>
        </div>
      </TabsContent>

      <TabsContent value="reviews">
        <ReviewSection serviceId={service.id} currentUser={currentUser} />
      </TabsContent>

      <TabsContent value="host">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
              <User className="h-16 w-16 text-gray-400" />
            </div>
          </div>

          <div className="md:w-2/3">
            <h3 className="font-display text-xl font-semibold mb-2">Hosted by Rwanda Hospitality Ltd</h3>
            <p className="text-gray-500 mb-4">Joined in January 2020 · 230+ reviews</p>

            <div className="flex items-center gap-2 mb-4">
              <Rating value={4.9} readOnly />
              <span className="text-gray-600">(230 reviews)</span>
            </div>

            <p className="text-gray-700 mb-4">
              We are a premier hospitality company in Rwanda, dedicated to providing exceptional accommodation
              experiences for travelers. Our team is passionate about sharing Rwanda's rich culture with visitors.
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="policies">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Cancellation Policy</h3>
            <p className="text-gray-700 mb-2">
              Free cancellation for 48 hours after booking, as long as the cancellation is made at least 14 days before
              check-in.
            </p>
            <p className="text-gray-700">
              Cancel before check-in and get a 50% refund, minus the first night and service fee.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Safety & Property</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-2" />
                <span>Security cameras on property</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-2" />
                <span>Carbon monoxide alarm</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-2" />
                <span>Smoke alarm</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-2" />
                <span>24/7 security staff</span>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

