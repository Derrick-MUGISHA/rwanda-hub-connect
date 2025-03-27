"use client"

import { useState } from "react"
import Link from "next/link"
import { PageLayout } from "@/components/layout/PageLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getBlogs, type BlogPost } from "@/data/mockBlogs"
import { Search, Calendar, Clock } from "lucide-react"

export default function BlogPage() {
  const blogs = getBlogs()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory ? blog.category === activeCategory : true

    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(blogs.map((blog) => blog.category)))

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-rwandan-blue text-white py-16">
        <div className="container">
          <h1 className="heading-1 text-center mb-4">Travel Blog & Guides</h1>
          <p className="text-center text-xl max-w-2xl mx-auto mb-8">
            Discover stories, tips, and insights about Rwanda's culture, wildlife, and travel experiences.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container py-8 border-b">
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge
            className={`cursor-pointer text-sm px-4 py-2 ${
              activeCategory === null ? "bg-rwandan-blue" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </Badge>

          {categories.map((category) => (
            <Badge
              key={category}
              className={`cursor-pointer text-sm px-4 py-2 ${
                activeCategory === category ? "bg-rwandan-blue" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Blog List */}
      <div className="container py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}

const BlogCard = ({ blog }: { blog: BlogPost }) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <Card className="overflow-hidden hover-lift h-full transition-all hover:border-rwandan-blue">
        <div className="h-48 overflow-hidden">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs bg-gray-100">
              {blog.category}
            </Badge>
            <div className="flex items-center text-gray-500 text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          <h3 className="font-display text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>

          <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

          <div className="flex items-center mt-auto pt-4 border-t">
            <img
              src={blog.author.avatar || "/placeholder.svg"}
              alt={blog.author.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="text-sm font-medium">{blog.author.name}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

