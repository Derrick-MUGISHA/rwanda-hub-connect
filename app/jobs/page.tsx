"use client"

import { useState } from "react"
import Link from "next/link"
import { PageLayout } from "@/components/layout/PageLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getJobs, type Job } from "@/data/mockJobs"
import { Search, MapPin, Calendar, Briefcase, DollarSign } from "lucide-react"

export default function JobsPage() {
  const allJobs = getJobs()
  const [searchQuery, setSearchQuery] = useState("")
  const [jobType, setJobType] = useState<string>("all")
  const [category, setCategory] = useState<string>("all")

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = jobType === "all" ? true : job.type === jobType
    const matchesCategory = category === "all" ? true : job.category === category

    return matchesSearch && matchesType && matchesCategory
  })

  const categories = Array.from(new Set(allJobs.map((job) => job.category)))
  const jobTypes = Array.from(new Set(allJobs.map((job) => job.type)))

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-rwandan-dark text-black py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-4">Find Your Dream Job in Rwanda</h1>
            <p className="text-xl mb-8">
              Discover exciting career opportunities in Rwanda's growing economy and vibrant private sector.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search jobs by title, company, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container py-8 border-b">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-4">
            <div className="w-48">
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <Briefcase className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-48">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Button className="w-full md:w-auto">Post a Job</Button>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="container py-12">
        <h2 className="heading-3 mb-8">
          {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Available
        </h2>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}

const JobCard = ({ job }: { job: Job }) => {
  const formatSalary = (job: Job) => {
    const { min, max, currency, period } = job.salary
    let periodText = ""

    switch (period) {
      case "hour":
        periodText = "/hr"
        break
      case "month":
        periodText = "/month"
        break
      case "year":
        periodText = "/year"
        break
    }

    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}${periodText}`
  }

  const daysAgo = () => {
    const postDate = new Date(job.postedDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - postDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays === 1 ? "Today" : `${diffDays} days ago`
  }

  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="hover-lift transition-all hover:border-rwandan-blue">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row p-6">
            <div className="md:mr-6 mb-4 md:mb-0">
              <img src={job.logo || "/placeholder.svg"} alt={job.company} className="w-16 h-16 object-cover rounded" />
            </div>

            <div className="flex-grow">
              <h3 className="font-display text-xl font-semibold mb-1">{job.title}</h3>

              <p className="text-gray-700 mb-3">{job.company}</p>

              <div className="flex flex-wrap gap-y-2 gap-x-4 text-gray-600 text-sm mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span className="capitalize">{job.type}</span>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{formatSalary(job)}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {daysAgo()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{job.category}</Badge>
                {job.requirements.slice(0, 2).map((req, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {req.length > 30 ? req.substring(0, 30) + "..." : req}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
              <Button variant="outline">View Job</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

