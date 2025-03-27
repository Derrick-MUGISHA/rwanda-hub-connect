import { AboutRwanda } from "@/components/home/AboutRwanda"
import { BlogPreview } from "@/components/home/BlogPreview"
import { FeaturedServices } from "@/components/home/FeaturedServices"
import { Hero } from "@/components/home/Hero"
import { JobsPreview } from "@/components/home/JobsPreview"
import { Partners } from "@/components/home/Partners"
import { Testimonials } from "@/components/home/Testimonials"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <AboutRwanda />
      <Partners />
      <Testimonials />
      <BlogPreview />
      <JobsPreview />
    </>
  )
}

