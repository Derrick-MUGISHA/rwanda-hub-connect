"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value: number
  max?: number
  readOnly?: boolean
  onChange?: (value: number) => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export const Rating = ({ value, max = 5, readOnly = false, onChange, className, size = "md" }: RatingProps) => {
  // Convert value to nearest 0.5 increment
  const roundedValue = Math.round(value * 2) / 2

  const handleClick = (newValue: number) => {
    if (readOnly) return
    onChange?.(newValue)
  }

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4"
      case "lg":
        return "w-6 h-6"
      default:
        return "w-5 h-5"
    }
  }

  const starSize = getSizeClass()

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1
        const isHalfStar = roundedValue === i + 0.5

        return (
          <button
            key={i}
            type="button"
            className={cn(
              "relative text-gray-300 hover:text-yellow-400 transition-colors",
              readOnly ? "cursor-default" : "cursor-pointer",
            )}
            onClick={() => handleClick(starValue)}
            disabled={readOnly}
          >
            <Star
              className={cn(starSize, starValue <= roundedValue ? "text-yellow-400" : "text-gray-300")}
              fill={starValue <= roundedValue ? "currentColor" : "none"}
            />

            {isHalfStar && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className={cn(starSize, "text-yellow-400")} fill="currentColor" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

