export interface Job {
  id: string
  title: string
  company: string
  logo: string
  location: string
  type: "full-time" | "part-time" | "contract" | "internship"
  salary: {
    min: number
    max: number
    currency: string
    period: "hour" | "month" | "year"
  }
  description: string
  requirements: string[]
  responsibilities: string[]
  postedDate: string
  deadline: string
  category: string
  contact: {
    email: string
    phone?: string
  }
}

export const jobs: Job[] = [
  {
    id: "job-1",
    title: "Hotel Manager",
    company: "Kigali Marriott Hotel",
    logo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=100&h=100",
    location: "Kigali, Rwanda",
    type: "full-time",
    salary: {
      min: 2000,
      max: 3500,
      currency: "USD",
      period: "month",
    },
    description:
      "We are seeking an experienced Hotel Manager to join our team at the Kigali Marriott Hotel. The ideal candidate will have a strong background in hospitality management and a passion for delivering exceptional guest experiences.",
    requirements: [
      "Bachelor's degree in Hotel Management, Business Administration, or related field",
      "Minimum 5 years of experience in hotel management",
      "Excellent leadership and communication skills",
      "Proficiency in hotel management software",
      "Experience in revenue management and budget planning",
      "Fluency in English and Kinyarwanda, French is a plus",
    ],
    responsibilities: [
      "Oversee all hotel operations and ensure high standards of service",
      "Develop and implement strategies to maximize revenue and guest satisfaction",
      "Manage and mentor a team of department heads and staff",
      "Handle guest complaints and special requests",
      "Monitor budget, payroll, and other financial aspects",
      "Ensure compliance with safety and security standards",
    ],
    postedDate: "2023-05-25",
    deadline: "2023-06-25",
    category: "Hospitality",
    contact: {
      email: "careers@kigalimarriott.com",
      phone: "+250 788 123 456",
    },
  },
  {
    id: "job-2",
    title: "Tour Guide",
    company: "Rwanda Eco Tours",
    logo: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=100&h=100",
    location: "Musanze, Rwanda",
    type: "full-time",
    salary: {
      min: 800,
      max: 1200,
      currency: "USD",
      period: "month",
    },
    description:
      "Rwanda Eco Tours is looking for knowledgeable and passionate Tour Guides to lead groups of tourists on gorilla trekking and cultural tours in the Northern Province of Rwanda.",
    requirements: [
      "Certificate or Diploma in Tourism, Wildlife Management, or related field",
      "At least 2 years of experience as a tour guide in Rwanda",
      "In-depth knowledge of Rwandan history, culture, and wildlife",
      "Excellent communication and storytelling skills",
      "First aid certification",
      "Fluency in English, Kinyarwanda, and preferably French or German",
    ],
    responsibilities: [
      "Lead tourist groups on gorilla trekking expeditions in Volcanoes National Park",
      "Provide informative commentary on Rwanda's wildlife, geography, and culture",
      "Ensure the safety and comfort of all tour participants",
      "Handle logistics and coordinate with drivers, lodges, and park authorities",
      "Promote conservation awareness and responsible tourism practices",
      "Assist with customer feedback collection and tour improvement",
    ],
    postedDate: "2023-06-02",
    deadline: "2023-07-02",
    category: "Tourism",
    contact: {
      email: "jobs@rwandaecotours.com",
      phone: "+250 788 234 567",
    },
  },
  {
    id: "job-3",
    title: "Digital Marketing Specialist",
    company: "Visit Rwanda",
    logo: "https://images.unsplash.com/photo-1580739824874-eae42501a501?auto=format&fit=crop&q=80&w=100&h=100",
    location: "Kigali, Rwanda",
    type: "full-time",
    salary: {
      min: 1500,
      max: 2500,
      currency: "USD",
      period: "month",
    },
    description:
      "Visit Rwanda is seeking a creative and data-driven Digital Marketing Specialist to promote Rwanda as a tourist destination through digital channels and help increase international visitor numbers.",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "3+ years of experience in digital marketing",
      "Strong knowledge of SEO, SEM, social media marketing, and content creation",
      "Experience with Google Analytics, Google Ads, and major social media platforms",
      "Portfolio of successful digital marketing campaigns",
      "Excellent writing and visual communication skills",
      "Understanding of tourism industry trends is a plus",
    ],
    responsibilities: [
      "Develop and implement digital marketing strategies to promote Rwanda tourism",
      "Create engaging content for social media, website, and email campaigns",
      "Manage the organization's social media presence across platforms",
      "Plan and execute digital advertising campaigns",
      "Analyze campaign performance and provide detailed reports",
      "Stay updated on digital marketing trends and technologies",
      "Collaborate with PR, design, and content teams",
    ],
    postedDate: "2023-05-15",
    deadline: "2023-06-15",
    category: "Marketing",
    contact: {
      email: "careers@visitrwanda.com",
    },
  },
]

export const getJobById = (id: string): Job | undefined => {
  return jobs.find((job) => job.id === id)
}

export const getJobs = (): Job[] => {
  return jobs
}

