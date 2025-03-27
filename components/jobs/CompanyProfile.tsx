import Link from "next/link"
import { MapPin, Globe, Calendar, Users, Building } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CompanyProfileProps {
  company: {
    name: string
    logo: string
    location: string
    website?: string
    founded?: string
    size?: string
    description: string
    industry?: string
  }
}

export function CompanyProfile({ company }: CompanyProfileProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {company.logo ? (
              <img src={company.logo || "/placeholder.svg"} alt={company.name} className="w-full h-full object-cover" />
            ) : (
              <Building className="w-8 h-8 text-gray-400" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-medium">{company.name}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                <span>{company.location}</span>
              </div>

              {company.industry && (
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1 text-gray-400" />
                  <span>{company.industry}</span>
                </div>
              )}

              {company.website && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1 text-gray-400" />
                  <a
                    href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rwandan-blue hover:underline"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {company.founded && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Founded</span>
                <p className="font-medium">{company.founded}</p>
              </div>
            </div>
          )}

          {company.size && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Company size</span>
                <p className="font-medium">{company.size}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h4 className="font-medium mb-2">About {company.name}</h4>
          <p className="text-gray-700">{company.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href={`/company/${company.name.toLowerCase().replace(/\s+/g, "-")}`}>
            <Button variant="outline" size="sm">
              View Company Profile
            </Button>
          </Link>
          <Link href={`/jobs?company=${company.name}`}>
            <Button variant="outline" size="sm">
              See All Jobs
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

