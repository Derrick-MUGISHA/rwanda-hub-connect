"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/PageLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowLeft, Briefcase, Building } from "lucide-react"
import { getJobById } from "@/data/mockJobs"
import { toast } from "sonner"

const applicationSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  coverLetter: z.string().min(50, { message: "Cover letter must be at least 50 characters" }),
  resume: z.string().min(1, { message: "Please enter your resume URL or upload a file" }),
})

type ApplicationFormValues = z.infer<typeof applicationSchema>

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === "string" ? params.id : ""
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const job = getJobById(id)

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser")
      if (user) {
        setIsAuthenticated(true)
        setCurrentUser(JSON.parse(user))
      } else {
        // Redirect to login
        toast.error("Please login to apply for this job")
        router.push("/login")
      }
    }
  }, [router])

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: "",
    },
  })

  // Update form when currentUser changes
  useEffect(() => {
    if (currentUser) {
      form.setValue("fullName", currentUser.fullName || "")
      form.setValue("email", currentUser.email || "")
    }
  }, [currentUser, form])

  const onSubmit = (data: ApplicationFormValues) => {
    if (!isAuthenticated) {
      toast.error("Please login to apply for this job")
      router.push("/login")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Create application object
        const application = {
          id: `application-${Date.now()}`,
          jobId: id,
          jobTitle: job?.title,
          company: job?.company,
          userId: currentUser.id,
          ...data,
          status: "pending",
          appliedAt: new Date().toISOString(),
        }

        // Save application to user's account
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userIndex = users.findIndex((u: any) => u.id === currentUser.id)

        if (userIndex !== -1) {
          users[userIndex].applications = users[userIndex].applications || []
          users[userIndex].applications.push(application)

          // Update in localStorage
          localStorage.setItem("users", JSON.stringify(users))
          localStorage.setItem("currentUser", JSON.stringify(users[userIndex]))

          toast.success("Application submitted successfully!")
          router.push("/account")
        } else {
          toast.error("Error submitting application")
        }
      }

      setIsLoading(false)
    }, 1500)
  }

  if (!job) {
    return (
      <PageLayout>
        <div className="container flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="heading-2 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">
            The job listing you're trying to apply for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/jobs")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="container py-12">
        <Button variant="outline" size="sm" className="mb-6" onClick={() => router.push(`/jobs/${id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Job
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Apply for {job.title}</CardTitle>
                <CardDescription>Complete the form below to apply for this position at {job.company}</CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Letter</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your cover letter here..."
                              className="min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume / CV</FormLabel>
                          <FormControl>
                            <Input placeholder="Link to your resume or upload a file" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Submitting Application..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={job.logo || "/placeholder.svg"}
                    alt={job.company}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{job.title}</h3>
                    <p className="text-gray-700">{job.company}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{job.company}</span>
                  </div>

                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="capitalize">{job.type}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-2">Key Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

