"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PageLayout } from "@/components/layout/PageLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: RegisterFormValues) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userExists = users.some((user: any) => user.email === data.email)

        if (userExists) {
          toast.error("User with this email already exists")
          setIsLoading(false)
          return
        }

        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          createdAt: new Date().toISOString(),
          applications: [],
          reviews: [],
          bookings: [],
          payments: [],
          marks: 0,
          referralToken: Math.random().toString(36).substring(2, 10).toUpperCase(),
          referralLink: `https://letsrwanda.com/ref/${Math.random().toString(36).substring(2, 10)}`,
          publishedJobs: [],
        }

        // Save to localStorage
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))

        // Set as current user
        localStorage.setItem("currentUser", JSON.stringify(newUser))

        toast.success("Registration successful!")
        router.push("/account")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <PageLayout>
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="container max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>Enter your details to create your account</CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter>
              <p className="text-center text-sm text-gray-600 mt-2 w-full">
                Already have an account?{" "}
                <Link href="/login" className="text-rwandan-blue hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}

