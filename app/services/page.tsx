"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getServicesByType,
  getProvinces,
  filterServicesByLocation,
  type Service,
} from "@/data/mockServices";
import { format } from "date-fns";
import {
  MapPin,
  Search,
  Filter,
  CalendarIcon,
  Wifi,
  Utensils,
  Tv,
  Car,
  Users,
  Bed,
  Bath,
  PawPrint,
} from "lucide-react";
import { toast } from "sonner";
import { ServiceCard } from "@/components/ui/ServiceCard";

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const locationParam = searchParams.get("location");
  const typeParam = searchParams.get("type");

  const [activeTab, setActiveTab] = useState<string>(typeParam || "all");
  const [searchQuery, setSearchQuery] = useState(searchTerm || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [services, setServices] = useState<Service[]>([]);
  const [googleServices, setGoogleServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<
    | {
        from: Date;
        to?: Date;
      }
    | undefined
  >(undefined);
  const [guests, setGuests] = useState(2);
  const [guestsMenuOpen, setGuestsMenuOpen] = useState(false);
  const [province, setProvince] = useState<string>(
    locationParam ? "all" : "all"
  );
  const [amenities, setAmenities] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const [rooms, setRooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [acceptsPets, setAcceptsPets] = useState(false);

  const provinces = getProvinces();

  useEffect(() => {
    if (typeParam) {
      setActiveTab(typeParam);
    }

    if (searchTerm) {
      setSearchQuery(searchTerm);
    }

    if (locationParam) {
      const matchingProvince = provinces.find((p) =>
        p.toLowerCase().includes(locationParam.toLowerCase())
      );

      if (matchingProvince) {
        setProvince(matchingProvince);
      }
    }
  }, [typeParam, searchTerm, locationParam, provinces]);

  useEffect(() => {
    const mockData = getServicesByType(
      activeTab === "all" ? undefined : activeTab
    );
    setServices(mockData);
    setIsLoading(false);
  }, [activeTab, province]);

  useEffect(() => {
    let filtered = services.length > 0 ? [...services] : [...services];

    if (activeTab === "airbnb") {
      filtered = filtered.filter(
        (service) =>
          service.type === "airbnb" ||
          (service.type === "hotel" &&
            service.name.toLowerCase().includes("lodge"))
      );
    } else if (activeTab === "hotel") {
      filtered = filtered.filter(
        (service) =>
          service.type === "hotel" &&
          !service.name.toLowerCase().includes("lodge")
      );
    } else if (activeTab === "air-ticket") {
      filtered = filtered.filter((service) => service.type === "air-ticket");
    } else if (activeTab === "taxi") {
      filtered = filtered.filter((service) => service.type === "taxi");
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (service) =>
        service.price >= priceRange[0] && service.price <= priceRange[1]
    );

    if (province !== "all") {
      filtered = filterServicesByLocation(filtered, province);
    }

    if (locationParam && province === "all") {
      filtered = filtered.filter(
        (service) =>
          service.location
            .toLowerCase()
            .includes(locationParam.toLowerCase()) ||
          service.province
            .toLowerCase()
            .includes(locationParam.toLowerCase()) ||
          service.district.toLowerCase().includes(locationParam.toLowerCase())
      );
    }

    if (amenities.length > 0) {
      filtered = filtered.filter((service) =>
        service.amenities
          ? amenities.every((amenity) =>
              service.amenities.some((a: string) =>
                a.toLowerCase().includes(amenity.toLowerCase())
              )
            )
          : false
      );
    }

    if (propertyType !== "all") {
      filtered = filtered.filter((service) => service.type === propertyType);
    }

    if (rooms > 1) {
      filtered = filtered.filter(
        (service) => service.rooms !== undefined && service.rooms >= rooms
      );
    }

    if (beds > 1) {
      filtered = filtered.filter(
        (service) => service.beds !== undefined && service.beds >= beds
      );
    }

    if (bathrooms > 1) {
      filtered = filtered.filter(
        (service) =>
          service.bathrooms !== undefined && service.bathrooms >= bathrooms
      );
    }

    if (acceptsPets) {
      filtered = filtered.filter((service) => service.acceptsPets === true);
    }

    filtered.sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

    const mappedServices = filtered.map((service) => ({
      id: service.id,
      type: service.type,
      title: service.name,
      location: service.location,
      province: service.province,
      district: service.district,
      image: service.images?.length > 0 ? service.images[0] : "",
      rating: service.rating,
      pricePerNight: service.price,
      rooms: service.rooms || 1,
      beds: service.beds || 1,
      bathrooms: service.bathrooms || 1,
      acceptsPets: service.acceptsPets || false,
    }));

    setFilteredServices(mappedServices);
  }, [
    searchQuery,
    priceRange,
    province,
    amenities,
    propertyType,
    sortBy,
    services,
    rooms,
    beds,
    bathrooms,
    acceptsPets,
    activeTab,
    locationParam,
  ]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchQuery("");
    setPriceRange([0, 500]);
    setDateRange(undefined);
    setGuests(2);
    setProvince("all");
    setAmenities([]);
    setPropertyType("all");
    setSortBy("recommended");
    setRooms(1);
    setBeds(1);
    setBathrooms(1);
    setAcceptsPets(false);
  };

  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 500]);
    setDateRange(undefined);
    setGuests(2);
    setProvince("all");
    setAmenities([]);
    setPropertyType("all");
    setSortBy("recommended");
    setRooms(1);
    setBeds(1);
    setBathrooms(1);
    setAcceptsPets(false);
  };

  const decreaseGuests = () => {
    setGuests(Math.max(1, guests - 1));
  };

  const increaseGuests = () => {
    setGuests(Math.min(10, guests + 1));
  };

  const decreaseRooms = () => {
    setRooms(Math.max(1, rooms - 1));
  };

  const increaseRooms = () => {
    setRooms(Math.min(5, rooms + 1));
  };

  const decreaseBeds = () => {
    setBeds(Math.max(1, beds - 1));
  };

  const increaseBeds = () => {
    setBeds(Math.min(4, beds + 1));
  };

  const decreaseBathrooms = () => {
    setBathrooms(Math.max(1, bathrooms - 1));
  };

  const increaseBathrooms = () => {
    setBathrooms(Math.min(3, bathrooms + 1));
  };

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="heading-2 text-center mb-2">
            Explore Accommodations in Rwanda
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Discover the perfect place to stay during your Rwandan adventure,
            from luxury hotels to cozy Airbnb homes, taxi services, Air tickets and more.
          </p>
        </div>

        <Tabs
          defaultValue={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all">All Accommodations</TabsTrigger>
              <TabsTrigger value="hotel">Hotels</TabsTrigger>
              <TabsTrigger value="airbnb">Airbnbs & Lodges</TabsTrigger>
              <TabsTrigger value="air-ticket">Air-ticket</TabsTrigger>
              <TabsTrigger value="taxi">Taxi</TabsTrigger>
            </TabsList>
          </div>

          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search by name, location, or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-6 text-lg"
                    />
                  </div>
                </div>

                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "MMM d")} -{" "}
                              {format(dateRange.to, "MMM d, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "MMM d, yyyy")
                          )
                        ) : (
                          "Check-in & Check-out"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => {
                          if (range?.from) {
                            setDateRange({ from: range.from, to: range.to });
                          } else {
                            setDateRange(undefined);
                          }
                        }}
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger>
                      <MapPin className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Provinces</SelectItem>
                      {provinces.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Popover
                    open={guestsMenuOpen}
                    onOpenChange={setGuestsMenuOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Guest Preferences
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[340px] p-5" align="start">
                      <div className="space-y-4">
                        <h3 className="font-medium">Guests & Room Options</h3>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm mb-2">Number of guests</p>
                            <div className="flex border rounded">
                              <button
                                className="px-3 py-1 border-r text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  decreaseGuests();
                                }}
                              >
                                -
                              </button>
                              <div className="flex-grow text-center py-1 text-sm flex items-center justify-center">
                                <Users className="h-3.5 w-3.5 mr-1.5" />
                                {guests}
                              </div>
                              <button
                                className="px-3 py-1 border-l text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  increaseGuests();
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm mb-2">Number of rooms</p>
                            <div className="flex border rounded">
                              <button
                                className="px-3 py-1 border-r text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  decreaseRooms();
                                }}
                              >
                                -
                              </button>
                              <div className="flex-grow text-center py-1 text-sm flex items-center justify-center">
                                <Bed className="h-3.5 w-3.5 mr-1.5" />
                                {rooms}
                              </div>
                              <button
                                className="px-3 py-1 border-l text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  increaseRooms();
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm mb-2">Beds per room</p>
                            <div className="flex border rounded">
                              <button
                                className="px-3 py-1 border-r text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  decreaseBeds();
                                }}
                              >
                                -
                              </button>
                              <div className="flex-grow text-center py-1 text-sm flex items-center justify-center">
                                <Bed className="h-3.5 w-3.5 mr-1.5" />
                                {beds}
                              </div>
                              <button
                                className="px-3 py-1 border-l text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  increaseBeds();
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm mb-2">Number of bathrooms</p>
                            <div className="flex border rounded">
                              <button
                                className="px-3 py-1 border-r text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  decreaseBathrooms();
                                }}
                              >
                                -
                              </button>
                              <div className="flex-grow text-center py-1 text-sm flex items-center justify-center">
                                <Bath className="h-3.5 w-3.5 mr-1.5" />
                                {bathrooms}
                              </div>
                              <button
                                className="px-3 py-1 border-l text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  increaseBathrooms();
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Checkbox
                              id="pet-friendly-popup"
                              checked={acceptsPets}
                              onCheckedChange={() =>
                                setAcceptsPets(!acceptsPets)
                              }
                              className="mr-2"
                            />
                            <label
                              htmlFor="pet-friendly-popup"
                              className="text-sm flex items-center cursor-pointer"
                            >
                              <PawPrint className="h-3.5 w-3.5 mr-1.5" />
                              Pet-friendly
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4 border-t">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setGuests(2);
                              setRooms(1);
                              setBeds(1);
                              setBathrooms(1);
                              setAcceptsPets(false);
                            }}
                          >
                            Reset
                          </Button>
                          <Button onClick={() => setGuestsMenuOpen(false)}>
                            Apply
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="md:col-span-3 flex justify-between">
                  <Popover
                    open={filterMenuOpen}
                    onOpenChange={setFilterMenuOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        More Filters
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[340px] p-5" align="start">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">
                            Price Range per night
                          </h3>
                          <div className="px-2">
                            <Slider
                              defaultValue={[0, 500]}
                              value={priceRange}
                              min={0}
                              max={500}
                              step={10}
                              onValueChange={(value: [number, number]) =>
                                setPriceRange(value)
                              }
                            />
                            <div className="flex justify-between mt-2 text-sm">
                              <span>${priceRange[0]}</span>
                              <span>${priceRange[1]}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">Property Type</h3>
                          <Select
                            value={propertyType}
                            onValueChange={setPropertyType}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="hotel">Hotel</SelectItem>
                              <SelectItem value="airbnb">Airbnb</SelectItem>
                              <SelectItem value="air-ticket">Air Ticket</SelectItem>
                              <SelectItem value="taxi">Taxi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="amenities">
                            <AccordionTrigger>Amenities</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="wifi"
                                    checked={amenities.includes("wifi")}
                                    onCheckedChange={() =>
                                      handleAmenityToggle("wifi")
                                    }
                                  />
                                  <label
                                    htmlFor="wifi"
                                    className="flex items-center"
                                  >
                                    <Wifi className="h-4 w-4 mr-2" /> WiFi
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="kitchen"
                                    checked={amenities.includes("kitchen")}
                                    onCheckedChange={() =>
                                      handleAmenityToggle("kitchen")
                                    }
                                  />
                                  <label
                                    htmlFor="kitchen"
                                    className="flex items-center"
                                  >
                                    <Utensils className="h-4 w-4 mr-2" />{" "}
                                    Kitchen
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="tv"
                                    checked={amenities.includes("tv")}
                                    onCheckedChange={() =>
                                      handleAmenityToggle("tv")
                                    }
                                  />
                                  <label
                                    htmlFor="tv"
                                    className="flex items-center"
                                  >
                                    <Tv className="h-4 w-4 mr-2" /> TV
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="parking"
                                    checked={amenities.includes("parking")}
                                    onCheckedChange={() =>
                                      handleAmenityToggle("parking")
                                    }
                                  />
                                  <label
                                    htmlFor="parking"
                                    className="flex items-center"
                                  >
                                    <Car className="h-4 w-4 mr-2" /> Parking
                                  </label>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <div className="flex justify-between pt-4 border-t">
                          <Button variant="outline" onClick={resetFilters}>
                            Reset
                          </Button>
                          <Button onClick={() => setFilterMenuOpen(false)}>
                            Apply Filters
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <div className="flex items-center">
                    <span className="text-sm mr-2">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort Results" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {searchQuery && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Search: {searchQuery}</span>
                <button className="ml-2" onClick={() => setSearchQuery("")}>
                  ×
                </button>
              </div>
            )}

            {priceRange[0] > 0 || priceRange[1] < 500 ? (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </span>
                <button
                  className="ml-2"
                  onClick={() => setPriceRange([0, 500])}
                >
                  ×
                </button>
              </div>
            ) : null}

            {province !== "all" && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Province: {province}</span>
                <button className="ml-2" onClick={() => setProvince("all")}>
                  ×
                </button>
              </div>
            )}

            {rooms > 1 && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Rooms: {rooms}</span>
                <button className="ml-2" onClick={() => setRooms(1)}>
                  ×
                </button>
              </div>
            )}

            {beds > 1 && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Beds: {beds}</span>
                <button className="ml-2" onClick={() => setBeds(1)}>
                  ×
                </button>
              </div>
            )}

            {bathrooms > 1 && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Bathrooms: {bathrooms}</span>
                <button className="ml-2" onClick={() => setBathrooms(1)}>
                  ×
                </button>
              </div>
            )}

            {acceptsPets && (
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span>Pet-friendly</span>
                <button className="ml-2" onClick={() => setAcceptsPets(false)}>
                  ×
                </button>
              </div>
            )}

            {amenities.map((amenity) => (
              <div
                key={amenity}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
              >
                <span>Amenity: {amenity}</span>
                <button
                  className="ml-2"
                  onClick={() => handleAmenityToggle(amenity)}
                >
                  ×
                </button>
              </div>
            ))}

            {(priceRange[0] > 0 ||
              priceRange[1] < 500 ||
              province !== "all" ||
              amenities.length > 0 ||
              propertyType !== "all" ||
              rooms > 1 ||
              beds > 1 ||
              bathrooms > 1 ||
              acceptsPets) && (
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Clear All Filters
              </Button>
            )}
          </div>

          <TabsContent value="all" className="mt-0">
            <ServiceGrid services={filteredServices} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="hotel" className="mt-0">
            <ServiceGrid services={filteredServices} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="airbnb" className="mt-0">
            <ServiceGrid services={filteredServices} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="air-ticket" className="mt-0">
            <ServiceGrid services={filteredServices} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="taxi" className="mt-0">
            <ServiceGrid services={filteredServices} isLoading={isLoading} />
          </TabsContent>

        </Tabs>
      </div>
    </PageLayout>
  );
}

const ServiceGrid = ({
  services,
  isLoading = false,
}: {
  services: any[];
  isLoading?: boolean;
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        if (userData.savedListings) {
          setFavorites(userData.savedListings);
        }
      }
    }
  }, []);

  const toggleFavorite = (serviceId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (typeof window === "undefined") return;

    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      toast("Please log in to save favorites", {
        description:
          "Create an account or sign in to save your favorite listings",
        duration: 3000,
      });
      return;
    }

    const userData = JSON.parse(currentUser);
    if (!userData.savedListings) {
      userData.savedListings = [];
    }

    if (favorites.includes(serviceId)) {
      userData.savedListings = userData.savedListings.filter(
        (id: string) => id !== serviceId
      );
      setFavorites((prev) => prev.filter((id) => id !== serviceId));
      toast("Removed from favorites", {
        description: "The listing has been removed from your saved properties",
      });
    } else {
      userData.savedListings.push(serviceId);
      setFavorites((prev) => [...prev, serviceId]);
      toast("Added to favorites", {
        description: "The listing has been saved to your profile",
      });
    }

    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card className="overflow-hidden h-full">
                <div className="h-48 bg-gray-300"></div>
                <CardContent className="p-5 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-300 rounded w-24"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No accommodations found</h3>
        <p className="text-gray-600">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          type={service.type}
          title={service.title}
          location={service.location}
          province={service.province}
          district={service.district}
          image={service.image}
          rating={service.rating}
          price={service.pricePerNight}
          currency={service.currency} // Add this line
        />
      ))}
    </div>
  );
};
