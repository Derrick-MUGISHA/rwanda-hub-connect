import type React from "react"

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="pt-32 md:pt-36">{children}</div>
}

