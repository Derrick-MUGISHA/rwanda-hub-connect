"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { PageLayout } from "@/components/layout/PageLayout"
import { getJobById } from "@/data/mockJobs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  Banknote,
  GraduationCap,
  CheckCircle,
  Users,
} from "lucide-react"
import { CompanyProfile } from "@/components/jobs/CompanyProfile"

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === "string" ? params.id : ""
  const job = getJobById(id)

  // Example company data (in a real app, this would come from an API)
  const companyData = {
    name: job?.company || "Company Name",
    logo: job?.logo || "",
    location: job?.location || "Rwanda",
    website: "www.company-website.com",
    founded: "2010",
    size: "51-200 employees",
    industry: "Hospitality & Tourism",
    description:
      "This company is a leading provider of hospitality services in Rwanda, committed to delivering exceptional experiences for both travelers and employees. With a focus on sustainability and community development, they aim to showcase the best of Rwandan hospitality.",
  }

  if (!job) {
    return (
      <PageLayout>
        <div className="container flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="heading-2 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/jobs")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
      </PageLayout>
    )
  }

  // Helper function to format the posted date as "X days ago"
  const formatPostedDate = () => {
    const postDate = new Date(job.postedDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - postDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays === 1 ? "Today" : `${diffDays} days ago`
  }

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mb-8">
          <Button variant="outline" size="sm" onClick={() => router.push("/jobs")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="heading-2 mb-2">{job.title}</h1>
              <p className="text-gray-600">
                <Link href={`/company/${job.company.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
                  {job.company}
                </Link>
              </p>
            </div>
            <img src={job.logo || "/placeholder.svg"} alt={job.company} className="w-20 h-20 rounded-lg object-cover" />
          </div>

          <div className="flex flex-wrap gap-4 text-gray-500">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Posted {formatPostedDate()}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Closing Date: {new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="description">
              <TabsList className="mb-6">
                <TabsTrigger value="description">Job Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <div className="prose max-w-none">
                  <h2 className="heading-3 mb-4">About the Job</h2>
                  <p>{job.description}</p>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Key Responsibilities:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="requirements">
                <div className="prose max-w-none">
                  <h2 className="heading-3 mb-4">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>

                  <h3 className="font-semibold text-lg mt-6 mb-3">Education & Experience</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <GraduationCap className="h-5 w-5 text-gray-500 mb-2" />
                      <h4 className="font-medium">Education</h4>
                      <p className="text-gray-600">{job.requirements[0]}</p>
                    </div>
                    <div>
                      <Banknote className="h-5 w-5 text-gray-500 mb-2" />
                      <h4 className="font-medium">Experience</h4>
                      <p className="text-gray-600">{job.requirements[1]}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="benefits">
                <div className="prose max-w-none">
                  <h2 className="heading-3 mb-4">Employee Benefits</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {/* Using responsibilities as a fallback since benefits don't exist in the Job type */}
                    {job.responsibilities.slice(0, 3).map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Benefit: {item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4">Apply for this Job</h3>
                <p className="text-gray-600 mb-4">
                  Interested in this exciting opportunity? Click the button below to submit your application.
                </p>
                <div className="flex items-center text-gray-500 mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  <span>10+ applicants</span>
                </div>
                <Button asChild>
                  <Link href={`/jobs/${job.id}/apply`} className="w-full">
                    Apply Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <CompanyProfile company={companyData} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="heading-3 mb-6">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example similar jobs (replace with actual data) */}
            <Card className="bg-gray-50 border border-gray-100">
              <CardContent className="p-5">
                <h3 className="font-medium text-lg mb-2">Similar Job Title 1</h3>
                <p className="text-gray-600 text-sm">Similar Company Name</p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Kigali</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border border-gray-100">
              <CardContent className="p-5">
                <h3 className="font-medium text-lg mb-2">Similar Job Title 2</h3>
                <p className="text-gray-600 text-sm">Another Company Ltd</p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Musanze</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border border-gray-100">
              <CardContent className="p-5">
                <h3 className="font-medium text-lg mb-2">Similar Job Title 3</h3>
                <p className="text-gray-600 text-sm">Yet Another Company</p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Kigali</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

