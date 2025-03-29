// components/home/FeaturedServices.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Bed, Bath, PawPrint, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceCard } from "@/components/ui/ServiceCard";
import {
  services,
  getProvinces,
  filterServicesByLocation,
} from "@/data/mockServices";
  
export const     FeaturedServices = () => {
  const [activeTab, setActiveTab] = useState<
    "hotels" | "airbnb" | "air-ticket" | "taxi"
  >("hotels");
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);

  // Accommodation filters
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [acceptsPets, setAcceptsPets] = useState(false);
  const [guestsMenuOpen, setGuestsMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      let filtered = services;

      // Province filtering
      if (selectedProvince) {
        filtered = filterServicesByLocation(filtered, selectedProvince);
      }

      // Type filtering
      filtered = filtered.filter((service) => {
        if (activeTab === "hotels")
          return (
            service.type === "hotel" &&
            !service.name.toLowerCase().includes("lodge")
          );
        if (activeTab === "airbnb")
          return (
            service.type === "airbnb" ||
            service.name.toLowerCase().includes("lodge")
          );
        return service.type === activeTab;
      });

      // Accommodation-specific filtering
      if (activeTab === "hotels" || activeTab === "airbnb") {
        filtered = filtered.filter(
          (service) =>
            (service.rooms ?? 0) >= rooms &&
            (service.beds ?? 0) >= beds &&
            (service.bathrooms ?? 0) >= bathrooms &&
            (!acceptsPets || service.acceptsPets)
        );
      }

      // Map to ServiceCard props
      const mapped = filtered.slice(0, 3).map((service) => ({
        id: service.id,
        type: service.type,
        title: service.name,
        location: service.location,
        province: service.province,
        district: service.district,
        image: service.images?.[0] || "",
        rating: service.rating,
        price: service.price,
        currency: service.currency,
        rooms: service.rooms,
        beds: service.beds,
        bathrooms: service.bathrooms,
        acceptsPets: service.acceptsPets,
        departureCity: service.departureCity,
        arrivalCity: service.arrivalCity,
        airline: service.airline,
        flightClass: service.flightClass,
        vehicleTypes: service.vehicleTypes,
        driverIncluded: service.driverIncluded,
        maxPassengers: service.maxPassengers,
      }));

      setFilteredServices(mapped);
      setIsLoading(false);
    }, 500);
  }, [activeTab, selectedProvince, rooms, beds, bathrooms, acceptsPets]);

  const provinces = getProvinces();

  return (
    <section id="services" className="section-spacing bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <span className="block text-sm font-medium text-rwandan-blue mb-2">
              Trending Services
            </span>

            <h2 className="heading-2 text-gray-900">
              {activeTab === "hotels" && "Featured Hotels"}
              {activeTab === "airbnb" && "Featured Lodges & Airbnbs"}
              {activeTab === "air-ticket" && "Flight Tickets"}
              {activeTab === "taxi" && "Taxi & Transportation"}
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              {activeTab === "hotels" &&
                "Discover our handpicked selection of the best hotels across Rwanda."}
              {activeTab === "airbnb" &&
                "Explore unique stays and luxury lodges for authentic experiences."}
              {activeTab === "air-ticket" &&
                "Find the best flight deals to and from Rwanda."}
              {activeTab === "taxi" &&
                "Reliable transportation options for all your travel needs."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="inline-flex p-1 bg-gray-100 rounded-full">
              {(["hotels", "airbnb", "air-ticket", "taxi"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelectedProvince(null);
                    }}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab === "air-ticket"
                      ? "Air Tickets"
                      : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {/* <button
                onClick={() => setSelectedProvince(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  !selectedProvince
                    ? "bg-rwandan-blue text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                All Provinces
              </button> */}
              {/* {provinces.map((province) => (
                <button
                  key={province}
                  onClick={() => setSelectedProvince(province)}
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                    selectedProvince === province
                      ? "bg-rwandan-blue text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {province}
                </button>
              ))} */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="rounded-xl overflow-hidden">
                    <div className="h-48 bg-gray-300" />
                    <div className="p-4 space-y-2">
                      <div className="h-5 bg-gray-300 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="flex gap-2">
                        {[1, 2, 3].map((n) => (
                          <div
                            key={n}
                            className="h-6 bg-gray-200 rounded w-16"
                          />
                        ))}
                      </div>
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              ))
          ) : filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={`${service.type}-${service.id}`} {...service} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">
                No services found matching your criteria
              </p>
              <button
                onClick={() => setSelectedProvince(null)}
                className="mt-4 text-rwandan-blue hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/services/${activeTab}`}
            className="btn-secondary inline-flex items-center"
          >
            View all{" "}
            {activeTab === "air-ticket"
              ? "Flights"
              : activeTab === "taxi"
              ? "Transportation"
              : activeTab}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
