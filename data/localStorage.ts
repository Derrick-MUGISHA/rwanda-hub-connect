// Types for local storage data
export interface UserProfile {
  id: string
  fullName: string
  email: string
  profilePicture?: string
  bio?: string
  phoneNumber?: string
  type: "host" | "guest"
  verified: boolean
  dateJoined: string
  marks?: number
  referralToken?: string
  referralLink?: string
  savedListings?: string[]
  applications?: any[]
  listings?: string[] // For hosts
  reviews?: UserReview[]
  messages?: { [conversationId: string]: Message[] }
}

export interface UserReview {
  id: string
  userId: string
  serviceId: string
  rating: number
  comment: string
  date: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
}

export interface Booking {
  id: string
  serviceId: string
  userId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "pending" | "approved" | "declined" | "completed"
  createdAt: string
}

// Helper functions for local storage operations
export const getUsers = (): UserProfile[] => {
  if (typeof window === "undefined") return []

  const users = localStorage.getItem("users")
  return users ? JSON.parse(users) : []
}

export const getCurrentUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null

  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

export const saveUser = (user: UserProfile): void => {
  if (typeof window === "undefined") return

  const users = getUsers()
  const existingUserIndex = users.findIndex((u) => u.id === user.id)

  if (existingUserIndex >= 0) {
    users[existingUserIndex] = user
  } else {
    users.push(user)
  }

  localStorage.setItem("users", JSON.stringify(users))

  // Update current user if this is the current user
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.id === user.id) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }
}

export const getBookings = (): Booking[] => {
  if (typeof window === "undefined") return []

  const bookings = localStorage.getItem("bookings")
  return bookings ? JSON.parse(bookings) : []
}

export const saveBooking = (booking: Booking): void => {
  if (typeof window === "undefined") return

  const bookings = getBookings()
  const existingBookingIndex = bookings.findIndex((b) => b.id === booking.id)

  if (existingBookingIndex >= 0) {
    bookings[existingBookingIndex] = booking
  } else {
    bookings.push(booking)
  }

  localStorage.setItem("bookings", JSON.stringify(bookings))
}

export const getUserReviews = (serviceId: string): UserReview[] => {
  if (typeof window === "undefined") return []

  const users = getUsers()
  const allReviews: UserReview[] = []

  users.forEach((user) => {
    if (user.reviews) {
      const serviceReviews = user.reviews.filter((review) => review.serviceId === serviceId)
      allReviews.push(...serviceReviews)
    }
  })

  return allReviews
}

export const saveUserReview = (userId: string, review: UserReview): void => {
  if (typeof window === "undefined") return

  const users = getUsers()
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex >= 0) {
    if (!users[userIndex].reviews) {
      users[userIndex].reviews = []
    }

    const reviewIndex = users[userIndex].reviews.findIndex((r) => r.id === review.id)
    if (reviewIndex >= 0) {
      users[userIndex].reviews[reviewIndex] = review
    } else {
      users[userIndex].reviews.push(review)
    }

    localStorage.setItem("users", JSON.stringify(users))

    // Update current user if needed
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      if (!currentUser.reviews) currentUser.reviews = []

      const currentReviewIndex = currentUser.reviews.findIndex((r) => r.id === review.id)
      if (currentReviewIndex >= 0) {
        currentUser.reviews[currentReviewIndex] = review
      } else {
        currentUser.reviews.push(review)
      }

      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }
  }
}

export const getMessages = (userId: string): { [conversationId: string]: Message[] } => {
  if (typeof window === "undefined") return {}

  const users = getUsers()
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex >= 0 && users[userIndex].messages) {
    return users[userIndex].messages
  }

  return {}
}

export const saveMessage = (message: Message): void => {
  if (typeof window === "undefined") return

  // Update sender's messages
  const users = getUsers()
  const senderIndex = users.findIndex((u) => u.id === message.senderId)
  const receiverIndex = users.findIndex((u) => u.id === message.receiverId)

  if (senderIndex >= 0) {
    if (!users[senderIndex].messages) {
      users[senderIndex].messages = {}
    }

    const conversationId = message.receiverId
    if (!users[senderIndex].messages[conversationId]) {
      users[senderIndex].messages[conversationId] = []
    }

    users[senderIndex].messages[conversationId].push(message)
  }

  // Update receiver's messages
  if (receiverIndex >= 0) {
    if (!users[receiverIndex].messages) {
      users[receiverIndex].messages = {}
    }

    const conversationId = message.senderId
    if (!users[receiverIndex].messages[conversationId]) {
      users[receiverIndex].messages[conversationId] = []
    }

    users[receiverIndex].messages[conversationId].push(message)
  }

  localStorage.setItem("users", JSON.stringify(users))

  // Update current user if needed
  const currentUser = getCurrentUser()
  if (currentUser) {
    if (currentUser.id === message.senderId || currentUser.id === message.receiverId) {
      if (!currentUser.messages) {
        currentUser.messages = {}
      }

      const conversationId = currentUser.id === message.senderId ? message.receiverId : message.senderId

      if (!currentUser.messages[conversationId]) {
        currentUser.messages[conversationId] = []
      }

      currentUser.messages[conversationId].push(message)
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }
  }
}

