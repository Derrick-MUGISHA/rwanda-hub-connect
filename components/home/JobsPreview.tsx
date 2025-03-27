import Link from "next/link"
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react"

// Placeholder jobs data
const JOBS = [
  {
    id: "1",
    title: "Hotel Manager",
    company: "Kigali Marriott Hotel",
    location: "Kigali",
    type: "Full-time",
    posted: "2 days ago",
    logo: "https://placehold.co/100x100/EAEAEA/7F7F7F?text=M",
  },
  {
    id: "2",
    title: "Front Desk Receptionist",
    company: "Radisson Blu Hotel",
    location: "Kigali",
    type: "Full-time",
    posted: "3 days ago",
    logo: "https://placehold.co/100x100/EAEAEA/7F7F7F?text=R",
  },
  {
    id: "3",
    title: "Tour Guide",
    company: "Rwanda Tourism Board",
    location: "Musanze",
    type: "Part-time",
    posted: "1 week ago",
    logo: "https://placehold.co/100x100/EAEAEA/7F7F7F?text=RTB",
  },
  {
    id: "4",
    title: "Marketing Specialist",
    company: "Let's Rwanda",
    location: "Kigali",
    type: "Full-time",
    posted: "5 days ago",
    logo: "https://placehold.co/100x100/EAEAEA/7F7F7F?text=LR",
  },
]

export const JobsPreview = () => {
  return (
    <section className="section-spacing bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="block text-sm font-medium text-rwandan-blue mb-2">Career Opportunities</span>
            <h2 className="heading-2 text-gray-900">Featured Jobs</h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Explore exciting career opportunities in Rwanda's growing hospitality and tourism sectors.
            </p>
          </div>
          <Link href="/jobs" className="inline-flex items-center text-rwandan-blue hover:underline mt-4 md:mt-0">
            Browse all jobs
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {JOBS.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow transition-all hover:-translate-y-1 flex animate-fade-up"
            >
              <div className="mr-4 flex-shrink-0">
                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={job.logo || "/placeholder.svg"} alt={job.company} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-display text-lg font-medium text-gray-900 mb-1">{job.title}</h3>
                <p className="text-gray-600 mb-3">{job.company}</p>

                <div className="flex flex-wrap gap-y-2 items-center text-sm text-gray-500">
                  <div className="flex items-center mr-4">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{job.posted}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="font-display text-2xl font-semibold mb-2 text-center md:text-left">
                Looking to Hire Top Talent?
              </h3>
              <p className="text-gray-600 text-center md:text-left">
                Post your job openings on Let's Rwanda and reach qualified candidates in Rwanda's hospitality and
                tourism industries.
              </p>
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <Link href="/post-job" className="btn-primary">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

