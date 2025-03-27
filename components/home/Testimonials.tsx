"use client"

import { useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Rating } from "@/components/ui/Rating"

const TESTIMONIALS = [
  {
    id: 1,
    content:
      "Let's Rwanda made our honeymoon unforgettable. From the gorilla trekking to the lakeside resorts, everything was perfectly arranged. We couldn't have asked for a better experience!",
    author: "James & Emma Wilson",
    role: "Honeymooners from Australia",
    rating: 5,
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    content:
      "As a solo traveler, I was a bit nervous about exploring Rwanda, but Let's Rwanda made me feel safe and welcomed. The accommodations were exceptional and the local guides were knowledgeable and friendly.",
    author: "Sarah Johnson",
    role: "Solo Traveler from Canada",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    content:
      "Our family trip to Rwanda was simply amazing! The kids loved the safari experiences and learning about conservation. The hotels were family-friendly and the staff went above and beyond to make us comfortable.",
    author: "David Thompson",
    role: "Family Traveler from UK",
    rating: 5,
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    content:
      "The service was outstanding from start to finish. Let's Rwanda helped me find the perfect job opportunity in Kigali's hospitality sector. Their job placement service is top-notch!",
    author: "Michael Ndayisaba",
    role: "Hospitality Professional",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
]

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplay])

  const nextTestimonial = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="block text-sm font-medium text-rwandan-blue mb-2">Testimonials</span>
          <h2 className="heading-2 text-gray-900">What Our Customers Say</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Hear from travelers and professionals who have experienced Rwanda through our services.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="overflow-hidden rounded-2xl bg-white shadow-lg"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 p-8 md:p-12">
                  <div className="flex flex-col h-full">
                    <Quote className="h-10 w-10 text-rwandan-blue/20 mb-6" />

                    <p className="text-gray-700 text-lg leading-relaxed mb-6 flex-grow">"{testimonial.content}"</p>

                    <div className="mt-auto">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                        <div className="ml-auto">
                          <Rating value={testimonial.rating} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                title={`Go to testimonial ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? "bg-rwandan-blue" : "bg-gray-300"
                }`}
                onClick={() => {
                  setAutoplay(false)
                  setActiveIndex(index)
                }}
              />
            ))}
          </div>
          <button
            type="button"
            title="Previous testimonial"
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            type="button"
            title="Next testimonial"
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  )
}

