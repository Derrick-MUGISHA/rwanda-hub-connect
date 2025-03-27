"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const HOTEL_PARTNERS = [
  {
    id: "marriott",
    name: "Kigali Marriott Hotel",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=Marriott",
  },
  {
    id: "radisson",
    name: "Radisson Blu Hotel",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=Radisson",
  },
  {
    id: "serena",
    name: "Serena Hotel Rwanda",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=Serena",
  },
  {
    id: "retreat",
    name: "The Retreat by Heaven",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=Retreat",
  },
  {
    id: "kigali-convention",
    name: "Kigali Convention Centre",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=KCC",
  },
]

const AIRBNB_PARTNERS = [
  {
    id: "superhost1",
    name: "Kigali City Superhost",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=Superhost+1",
  },
  {
    id: "superhost2",
    name: "Lake Kivu Properties",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=Superhost+2",
  },
  {
    id: "superhost3",
    name: "Musanze Mountain Stays",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=Superhost+3",
  },
  {
    id: "superhost4",
    name: "Luxury Rwanda Villas",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=Superhost+4",
  },
]

const HIRING_PARTNERS = [
  {
    id: "rwandair",
    name: "RwandAir",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=RwandAir",
  },
  {
    id: "rwandaTourism",
    name: "Rwanda Tourism Board",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=RTB",
  },
  {
    id: "rdb",
    name: "Rwanda Development Board",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=RDB",
  },
  {
    id: "virunga",
    name: "Virunga Lodge",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=Virunga",
  },
  {
    id: "volcanos",
    name: "Volcanos National Park",
    logo: "https://placehold.co/200x80/EAEAEA/7F7F7F?text=VNP",
  },
]

export const Partners = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="block text-sm font-medium text-rwandan-blue mb-2">Our Partners</span>
          <h2 className="heading-2 text-gray-900 mb-3">We Work With The Best</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Let's Rwanda has partnered with leading hotels, local Airbnb hosts, and hiring companies to provide you with
            the best experiences and opportunities.
          </p>
        </div>

        <Tabs defaultValue="hotels" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="hotels">Hotel Partners</TabsTrigger>
              <TabsTrigger value="airbnbs">Airbnb Partners</TabsTrigger>
              <TabsTrigger value="hiring">Hiring Partners</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hotels">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
              {HOTEL_PARTNERS.map((partner) => (
                <Link
                  key={partner.id}
                  href={`/services/hotel?partner=${partner.id}`}
                  className="bg-white p-4 h-24 rounded-lg border border-gray-100 hover:border-gray-300 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="max-w-full max-h-full" />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="airbnbs">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {AIRBNB_PARTNERS.map((partner) => (
                <Link
                  key={partner.id}
                  href={`/services/airbnb?partner=${partner.id}`}
                  className="bg-white p-4 h-24 rounded-lg border border-gray-100 hover:border-gray-300 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="max-w-full max-h-full" />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hiring">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
              {HIRING_PARTNERS.map((partner) => (
                <Link
                  key={partner.id}
                  href={`/jobs?company=${partner.id}`}
                  className="bg-white p-4 h-24 rounded-lg border border-gray-100 hover:border-gray-300 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="max-w-full max-h-full" />
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Link href="/partners">
            <Button variant="outline">View All Partners</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

