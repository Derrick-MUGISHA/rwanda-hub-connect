"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Use the newer addEventListener API with a fallback for older browsers
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
    } else {
      // @ts-ignore - For older browsers
      mql.addListener(onChange)
    }

    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Cleanup
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else {
        // @ts-ignore - For older browsers
        mql.removeListener(onChange)
      }
    }
  }, [])

  // Return false during SSR to avoid hydration mismatch
  if (typeof window === "undefined") return false

  return !!isMobile
}

