"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { services } from "@/data/mockServices"
import { toast } from "sonner"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// Placeholder hero backgrounds
const heroBackgrounds = [
  "https://images.unsplash.com/photo-1619549358771-8b61926b15f0?q=80&w=2070",
  "https://images.unsplash.com/photo-1612738072307-3432d829b6e1?q=80&w=2070",
  "https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?q=80&w=2071",
]

export const Hero = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      toast.info("Please enter a search term")
      return
    }

    // Open the search dialog instead of direct navigation
    setIsSearchOpen(true)
  }

  const handleSearchSelect = (value: string) => {
    setIsSearchOpen(false)

    // Navigate based on the search result category
    if (value.startsWith("hotel:") || value.startsWith("airbnb:")) {
      const [type, id] = value.split(":")
      router.push(`/services/${type}/${id}`)
    } else if (value.startsWith("blog:")) {
      const id = value.replace("blog:", "")
      router.push(`/blog/${id}`)
    } else if (value.startsWith("job:")) {
      const id = value.replace("job:", "")
      router.push(`/jobs/${id}`)
    } else {
      // Default search results page
      router.push(`/search?q=${encodeURIComponent(value)}`)
    }
  }

  // Filter services based on search query for the CommandDialog
  const filteredHotels = services
    .filter((service) => service.type === "hotel" && service.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5)

  const filteredAirbnbs = services
    .filter((service) => service.type === "airbnb" && service.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5)

  // Traditional search handling (for form submission)
  const handleTraditionalSearch = () => {
    if (!searchQuery.trim()) {
      toast.info("Please enter a search term")
      return
    }

    // Check if query exactly matches a service name (case insensitive)
    const exactMatch = services.find((service) => service.name.toLowerCase() === searchQuery.toLowerCase())

    if (exactMatch) {
      // Navigate directly to the specific service
      router.push(`/services/${exactMatch.type}/${exactMatch.id}`)
      return
    }

    // Check for location search: "hotels in [location]" or "airbnb in [location]"
    const hotelLocationMatch = searchQuery.toLowerCase().match(/hotels?\s+in\s+(.+)/i)
    const airbnbLocationMatch = searchQuery.toLowerCase().match(/airbnbs?\s+in\s+(.+)/i)
    const lodgeLocationMatch = searchQuery.toLowerCase().match(/lodges?\s+in\s+(.+)/i)

    if (hotelLocationMatch) {
      const location = hotelLocationMatch[1].trim()
      router.push(`/services/hotel?location=${encodeURIComponent(location)}`)
      return
    }

    if (airbnbLocationMatch || lodgeLocationMatch) {
      const location = (airbnbLocationMatch ? airbnbLocationMatch[1] : lodgeLocationMatch![1]).trim()
      router.push(`/services/airbnb?location=${encodeURIComponent(location)}`)
      return
    }

    // General search - navigate to services page with search query
    router.push(`/services?search=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background images with crossfade */}
      {heroBackgrounds.map((bg, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            index === currentBgIndex ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

      {/* Content */}
      <div className="container relative z-20 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block animate-fade-up bg-white/10 backdrop-blur-sm text-white text-sm font-medium py-1 px-3 rounded-full mb-4">
            Discover Rwanda
          </span>

          <h1 className="animate-fade-up font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Explore <span className="text-rwandan-accent">Rwanda's</span> Finest Services
            <br />
            in One Place
          </h1>

          <p className="animate-fade-up text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your gateway to hotels, accommodations, and experiences in the heart of East Africa
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="animate-fade-up max-w-2xl mx-auto mb-10">
            <div className="relative flex items-center glass p-2 rounded-full">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search for hotels, Airbnbs, or experiences..."
                  className="w-full bg-transparent border-none outline-none py-3 px-6 text-white placeholder-white/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => setIsSearchOpen(true)}
                />
              </div>
              <button
                type="button"
                onClick={handleTraditionalSearch}
                className="absolute right-2 rounded-full bg-rwandan-blue text-white p-3 hover:bg-rwandan-blue/90 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* CTA buttons */}
          <div className="animate-fade-up flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a href="#services" className="btn-primary text-base py-3 px-8 font-semibold">
              Book Now
            </a>
            <a
              href="#about"
              className="btn-secondary bg-white/10 border-white text-white hover:bg-white/20 text-base py-3 px-8 font-semibold"
            >
              Explore Rwanda
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/80 rounded-full animate-[fade-in_1.5s_infinite_alternate]"></div>
        </div>
      </div>

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput
          placeholder="Search for accommodations, blogs, jobs..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {filteredHotels.length > 0 && (
            <CommandGroup heading="Hotels">
              {filteredHotels.map((hotel) => (
                <CommandItem key={hotel.id} onSelect={() => handleSearchSelect(`hotel:${hotel.id}`)}>
                  <div className="flex flex-col">
                    <span>{hotel.name}</span>
                    <span className="text-xs text-gray-500">
                      {hotel.location}, {hotel.province}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredAirbnbs.length > 0 && (
            <CommandGroup heading="Airbnbs">
              {filteredAirbnbs.map((airbnb) => (
                <CommandItem key={airbnb.id} onSelect={() => handleSearchSelect(`airbnb:${airbnb.id}`)}>
                  <div className="flex flex-col">
                    <span>{airbnb.name}</span>
                    <span className="text-xs text-gray-500">
                      {airbnb.location}, {airbnb.province}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandGroup heading="Search by type">
            <CommandItem onSelect={() => handleSearchSelect(`search:Hotels in Rwanda`)}>
              <div className="flex flex-col">
                <span>All Hotels in Rwanda</span>
                <span className="text-xs text-gray-500">Browse all accommodations</span>
              </div>
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect(`search:Airbnbs in Rwanda`)}>
              <div className="flex flex-col">
                <span>All Airbnbs in Rwanda</span>
                <span className="text-xs text-gray-500">Browse all private stays</span>
              </div>
            </CommandItem>
          </CommandGroup>

          {searchQuery.toLowerCase().includes("kigali") && (
            <CommandGroup heading="Location search">
              <CommandItem onSelect={() => router.push(`/services/hotel?location=Kigali`)}>
                <div className="flex flex-col">
                  <span>Hotels in Kigali</span>
                  <span className="text-xs text-gray-500">View all Kigali hotels</span>
                </div>
              </CommandItem>
              <CommandItem onSelect={() => router.push(`/services/airbnb?location=Kigali`)}>
                <div className="flex flex-col">
                  <span>Airbnbs in Kigali</span>
                  <span className="text-xs text-gray-500">View all Kigali private stays</span>
                </div>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  )
}

