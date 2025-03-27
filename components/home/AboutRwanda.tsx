import Link from "next/link"

export const AboutRwanda = () => {
  return (
    <section id="about" className="section-spacing">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <span className="block text-sm font-medium text-rwandan-blue mb-2">Discover</span>
          <h2 className="heading-2 text-gray-900">About Rwanda</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Known as the "Land of a Thousand Hills," Rwanda offers breathtaking landscapes, rich culture, and
            unforgettable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative rounded-xl overflow-hidden h-[400px] md:h-full">
            <img
              src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2070"
              alt="Rwanda landscape"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="font-display text-2xl font-semibold mb-2">Beautiful Landscapes</h3>
              <p className="text-white/90">
                From volcanic mountains to serene lakes, Rwanda's natural beauty captivates visitors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="relative rounded-xl overflow-hidden h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=2070"
                alt="Rwanda culture"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-display text-xl font-semibold mb-1">Rich Culture</h3>
                <p className="text-white/90 text-sm">Experience Rwanda's vibrant cultural heritage and traditions.</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072"
                alt="Rwanda wildlife"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-display text-xl font-semibold mb-1">Wildlife Encounters</h3>
                <p className="text-white/90 text-sm">
                  Meet mountain gorillas and diverse wildlife in their natural habitat.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-3/5 md:pr-12 mb-8 md:mb-0">
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
                Start Your Rwandan Adventure Today
              </h3>
              <p className="text-gray-600 mb-6">
                Rwanda offers a unique blend of adventure, culture, and relaxation. From the bustling streets of Kigali
                to the serene shores of Lake Kivu, there's something for every traveler.
              </p>
              <Link href="/about" className="btn-primary inline-block">
                Learn More About Rwanda
              </Link>
            </div>
            <div className="md:w-2/5">
              <div className="bg-white rounded-xl p-5 shadow-sm hover-lift">
                <div className="flex space-x-4">
                  <div className="min-w-[80px] h-[80px] bg-rwandan-blue/10 rounded-lg flex items-center justify-center">
                    <span className="text-3xl font-display font-bold text-rwandan-blue">1M+</span>
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-gray-900">Visitors Annually</h4>
                    <p className="text-gray-600 text-sm">
                      Rwanda welcomes over a million tourists each year, exploring its natural wonders.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm mt-4 hover-lift">
                <div className="flex space-x-4">
                  <div className="min-w-[80px] h-[80px] bg-rwandan-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-3xl font-display font-bold text-rwandan-green">#1</span>
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-gray-900">Cleanest Country</h4>
                    <p className="text-gray-600 text-sm">
                      Rwanda is recognized as one of the cleanest and safest countries in Africa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

