"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/PageLayout"

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e"
          alt="Rwandan landscape"
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white container">
          <h1 className="heading-1 mb-4 text-center max-w-3xl">Discover the Heart of Africa</h1>
          <p className="text-xl max-w-2xl text-center">
            Rwanda, the land of a thousand hills, offers breathtaking landscapes, rich culture, and unforgettable
            experiences.
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Welcome to Rwanda</h2>
              <p className="text-gray-700 mb-4">
                Rwanda is a small, landlocked country in East Africa, known for its breathtaking landscapes, diverse
                wildlife, and vibrant culture. Despite its troubled past, Rwanda has emerged as one of Africa's most
                stable and progressive nations.
              </p>
              <p className="text-gray-700 mb-6">
                Today, Rwanda is celebrated for its remarkable development, cleanliness, safety, and commitment to
                conservation. The country offers visitors a unique blend of natural beauty, wildlife experiences,
                cultural immersion, and modern amenities.
              </p>
              <Link href="/services">
                <Button>Explore Services</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1580321187070-da8bdee36013"
                alt="Rwandan culture"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1575999502951-4ab25b5ca889"
                alt="Rwandan landscape"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1504432842672-1a79f78e4084"
                alt="Rwandan wildlife"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1519010470652-6b5b76f7c19d"
                alt="Kigali city"
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="heading-3 text-center mb-12">Key Facts About Rwanda</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="font-display text-4xl font-bold text-rwandan-blue mb-2">12M+</div>
              <p className="text-gray-700">Population</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="font-display text-4xl font-bold text-rwandan-blue mb-2">26,338 km²</div>
              <p className="text-gray-700">Land Area</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="font-display text-4xl font-bold text-rwandan-blue mb-2">Kigali</div>
              <p className="text-gray-700">Capital City</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="font-display text-4xl font-bold text-rwandan-blue mb-2">3</div>
              <p className="text-gray-700">National Parks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tourism Highlights */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="heading-2 text-center mb-12">Tourism Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1503431054860-dc3cf121df89"
                alt="Mountain Gorillas"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2">Mountain Gorilla Trekking</h3>
                <p className="text-gray-700 mb-4">
                  Rwanda is one of only three countries where you can trek to see endangered mountain gorillas in their
                  natural habitat.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1588260475840-ea6f4b66ba08"
                alt="Lake Kivu"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2">Lake Kivu</h3>
                <p className="text-gray-700 mb-4">
                  One of Africa's Great Lakes, offering beautiful beaches, water sports, and stunning sunset views over
                  the water.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1633847036663-7e262e89ada1"
                alt="Kigali City"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2">Kigali City Tour</h3>
                <p className="text-gray-700 mb-4">
                  Explore Rwanda's clean, safe capital city with its memorials, museums, markets, and vibrant cultural
                  scene.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1581426993283-9129b2d4e31d"
                alt="Traditional Rwandan Dance"
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div>
              <h2 className="heading-2 mb-6">Rich Cultural Heritage</h2>
              <p className="text-gray-700 mb-4">
                Rwanda's cultural heritage is preserved in its traditional dance, music, and crafts. The Intore dance
                performers, with their animated expressions and movements, tell the story of Rwanda's past warriors and
                kings.
              </p>
              <p className="text-gray-700 mb-4">
                Rwandan basket weaving, known as "agaseke," is recognized worldwide for its intricate designs and
                vibrant colors. These baskets symbolize peace, unity, and reconciliation.
              </p>
              <p className="text-gray-700">
                Visitors can experience Rwandan culture through community-based tourism initiatives, traditional
                performances, and cultural centers throughout the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-rwandan-blue text-white">
        <div className="container text-center">
          <h2 className="heading-2 mb-6">Ready to Experience Rwanda?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Discover the beauty, culture, and hospitality of the Land of a Thousand Hills. Let us help you plan an
            unforgettable Rwandan journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services">
              <Button variant="secondary" className="bg-white text-rwandan-blue hover:bg-gray-100">
                Browse Accommodations
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Read Travel Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

