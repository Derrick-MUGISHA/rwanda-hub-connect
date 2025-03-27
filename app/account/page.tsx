"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PageLayout } from "@/components/layout/PageLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Rating } from "@/components/ui/Rating"
import { toast } from "sonner"
import {
  User,
  Briefcase,
  CreditCard,
  Award,
  Link2,
  LogOut,
  Hotel,
  MessageSquare,
  Heart,
  Calendar,
  Star,
} from "lucide-react"
import { getBookings, saveUser } from "@/data/localStorage"
import type { UserProfile, Booking } from "@/data/localStorage"

export default function UserAccountPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userBookings, setUserBookings] = useState<Booking[]>([])
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    bio: "",
    phoneNumber: "",
  })

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser")
      if (user) {
        const userData = JSON.parse(user)
        setCurrentUser(userData)
        setProfileData({
          fullName: userData.fullName || "",
          email: userData.email || "",
          bio: userData.bio || "",
          phoneNumber: userData.phoneNumber || "",
        })

        // Load user bookings
        const allBookings = getBookings()
        const userBookings = allBookings.filter((booking) => booking.userId === userData.id)
        setUserBookings(userBookings)
      } else {
        // Redirect to login
        toast.error("Please login to access your account")
        router.push("/login")
      }
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
      toast.success("Logged out successfully")
      router.push("/")
    }
  }

  const handleProfileUpdate = () => {
    if (!currentUser) return

    const updatedUser = {
      ...currentUser,
      fullName: profileData.fullName,
      email: profileData.email,
      bio: profileData.bio,
      phoneNumber: profileData.phoneNumber,
    }

    saveUser(updatedUser)
    setCurrentUser(updatedUser)
    toast.success("Profile updated successfully")
    setEditMode(false)
  }

  const copyReferralLink = () => {
    if (!currentUser || !currentUser.referralLink || typeof navigator === "undefined") return

    navigator.clipboard
      .writeText(currentUser.referralLink)
      .then(() => {
        toast.success("Referral link copied to clipboard")
      })
      .catch(() => {
        toast.error("Failed to copy referral link")
      })
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!currentUser) {
    return (
      <PageLayout>
        <div className="container flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="heading-2 mb-4">Not Logged In</h1>
          <p className="text-gray-600 mb-6">Please login to access your account</p>
          <Button onClick={() => router.push("/login")}>Sign In</Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* User profile sidebar */}
          <div className="md:w-64">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {currentUser.profilePicture ? (
                      <img
                        src={currentUser.profilePicture || "/placeholder.svg"}
                        alt={currentUser.fullName}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-gray-500" />
                    )}
                  </div>
                  <h2 className="font-display text-xl font-semibold">{currentUser.fullName}</h2>
                  <p className="text-gray-600 text-sm">{currentUser.email}</p>

                  {currentUser.verified && (
                    <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">Verified User</Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Marks Earned</span>
                    <span className="font-semibold flex items-center">
                      <Award className="h-4 w-4 mr-1 text-amber-500" />
                      {currentUser.marks || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Account Type</span>
                    <Badge variant="outline" className="capitalize">
                      {currentUser.type || "Guest"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Referral Token</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {currentUser.referralToken || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Button variant="outline" size="sm" className="w-full mb-2" onClick={copyReferralLink}>
                    <Link2 className="mr-2 h-4 w-4" />
                    Copy Referral Link
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-3 lg:flex">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="applications">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Applications
                </TabsTrigger>
                <TabsTrigger value="bookings">
                  <Hotel className="h-4 w-4 mr-2" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="messages">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  <Star className="h-4 w-4 mr-2" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="payments">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payments
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="heading-3">Your Profile</h3>
                      <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
                        {editMode ? "Cancel" : "Edit Profile"}
                      </Button>
                    </div>

                    {editMode ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Full Name</label>
                          <Input
                            value={profileData.fullName}
                            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <Input
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Bio</label>
                          <Textarea
                            value={profileData.bio || ""}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            placeholder="Tell us about yourself"
                            className="resize-none"
                            rows={4}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Phone Number</label>
                          <Input
                            value={profileData.phoneNumber || ""}
                            onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                          />
                        </div>

                        <div className="flex justify-end">
                          <Button onClick={handleProfileUpdate}>Save Changes</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                            <p className="font-medium">{currentUser.fullName}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Email</h4>
                            <p className="font-medium">{currentUser.email}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                            <p className="font-medium">{currentUser.phoneNumber || "Not provided"}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Account Type</h4>
                            <p className="font-medium capitalize">{currentUser.type || "Guest"}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Member Since</h4>
                            <p className="font-medium">
                              {currentUser.dateJoined
                                ? new Date(currentUser.dateJoined).toLocaleDateString()
                                : "Unknown"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Bio</h4>
                          <p className="text-gray-700">{currentUser.bio || "No bio provided"}</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="font-medium mb-3">Account Settings</h4>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive email about bookings and messages</p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">SMS Notifications</p>
                                <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications">
                <h3 className="heading-3 mb-4">Your Job Applications</h3>

                {currentUser.applications && currentUser.applications.length > 0 ? (
                  <div className="space-y-4">
                    {currentUser.applications.map((application: any) => (
                      <Card key={application.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{application.jobTitle}</h4>
                              <p className="text-gray-600 text-sm">{application.company}</p>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>Applied on {new Date(application.appliedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                application.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : application.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No applications yet</h4>
                    <p className="text-gray-600 mb-4">You haven't applied for any jobs yet</p>
                    <Button asChild>
                      <Link href="/jobs">Browse Jobs</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <h3 className="heading-3 mb-4">Your Bookings</h3>

                {userBookings.length > 0 ? (
                  <div className="space-y-4">
                    {userBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Booking #{booking.id.slice(0, 8)}</h4>
                              <p className="text-gray-600 text-sm">
                                Check-in: {new Date(booking.checkIn).toLocaleDateString()} | Check-out:{" "}
                                {new Date(booking.checkOut).toLocaleDateString()}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Guests: {booking.guests} | Total: ${booking.totalPrice}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                booking.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : booking.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "completed"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {booking.status === "completed" && (
                              <Button variant="outline" size="sm">
                                <Star className="mr-1 h-4 w-4" />
                                Leave Review
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Hotel className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No bookings yet</h4>
                    <p className="text-gray-600 mb-4">You haven't made any accommodation bookings yet</p>
                    <Button asChild>
                      <Link href="/services">Browse Hotels & Airbnbs</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages">
                <h3 className="heading-3 mb-4">Your Messages</h3>

                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium mb-2">No messages yet</h4>
                  <p className="text-gray-600 mb-4">Your message inbox is empty</p>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <h3 className="heading-3 mb-4">Your Reviews</h3>

                {currentUser.reviews && currentUser.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {currentUser.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Service ID: {review.serviceId}</h4>
                            <Rating value={review.rating} readOnly />
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <p className="text-gray-500 text-sm mt-2">
                            Posted on {new Date(review.date).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No reviews yet</h4>
                    <p className="text-gray-600 mb-4">You haven't left any reviews yet</p>
                  </div>
                )}
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <h3 className="heading-3 mb-4">Your Favorites</h3>

                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium mb-2">No favorites yet</h4>
                  <p className="text-gray-600 mb-4">You haven't saved any favorites yet</p>
                </div>
              </TabsContent>

              {/* Payments Tab */}
              <TabsContent value="payments">
                <h3 className="heading-3 mb-4">Your Payments</h3>

                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium mb-2">No payments yet</h4>
                  <p className="text-gray-600 mb-4">You haven't made any payments yet</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

