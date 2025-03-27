"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Rating } from "@/components/ui/Rating"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { saveUserReview, type UserReview, type UserProfile } from "@/data/localStorage"

interface ReviewSectionProps {
  serviceId: string
  currentUser: UserProfile | null
}

export const ReviewSection = ({ serviceId, currentUser }: ReviewSectionProps) => {
  const router = useRouter()
  const [userRating, setUserRating] = useState<number>(0)
  const [reviewText, setReviewText] = useState("")
  const [showRatingSuccess, setShowRatingSuccess] = useState(false)

  const handleRateService = () => {
    if (!currentUser) {
      toast.error("Please log in to rate this service")
      router.push("/login")
      return
    }

    if (userRating === 0) {
      toast.error("Please select a rating")
      return
    }

    const newReview: UserReview = {
      id: uuidv4(),
      userId: currentUser.id,
      serviceId: serviceId,
      rating: userRating,
      comment: reviewText,
      date: new Date().toISOString(),
    }

    saveUserReview(currentUser.id, newReview)

    toast.success(`Thank you for rating this accommodation ${userRating} stars!`)
    setShowRatingSuccess(true)
    setReviewText("")

    // In a real app, this would refresh reviews
    setTimeout(() => setShowRatingSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4">Rate Your Experience</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Rating value={userRating} size="lg" onChange={setUserRating} />
            <span className="text-sm text-gray-500">{userRating > 0 ? `${userRating} stars` : "Click to rate"}</span>
          </div>

          <div>
            <Textarea
              placeholder="Share your experience with this accommodation..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button onClick={handleRateService}>Submit Review</Button>
        </div>
      </div>

      <h3 className="font-semibold text-lg mt-6">Guest Reviews</h3>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="font-medium">J</span>
              </div>
              <div>
                <h4 className="font-medium">John D.</h4>
                <span className="text-xs text-gray-500">May 2023</span>
              </div>
            </div>
            <Rating value={4.5} readOnly size="sm" />
          </div>
          <p className="text-gray-700">
            Exceptional location and service. The staff was very attentive and the amenities exceeded our expectations.
            Will definitely return!
          </p>
        </div>

        <div className="border-b pb-4">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="font-medium">S</span>
              </div>
              <div>
                <h4 className="font-medium">Sarah M.</h4>
                <span className="text-xs text-gray-500">April 2023</span>
              </div>
            </div>
            <Rating value={5} readOnly size="sm" />
          </div>
          <p className="text-gray-700">
            Perfect stay for our honeymoon! The views were breathtaking and the room was absolutely spotless. Highly
            recommend for special occasions.
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="font-medium">R</span>
              </div>
              <div>
                <h4 className="font-medium">Robert T.</h4>
                <span className="text-xs text-gray-500">March 2023</span>
              </div>
            </div>
            <Rating value={4} readOnly size="sm" />
          </div>
          <p className="text-gray-700">
            Great value for the price. The location was convenient and we enjoyed the breakfast options. Would stay here
            again on our next visit to Rwanda.
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Button variant="outline" size="sm">
          View All 24 Reviews
        </Button>
      </div>
    </div>
  )
}

