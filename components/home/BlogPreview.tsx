import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

// Placeholder blog data
const BLOG_POSTS = [
  {
    id: "1",
    title: "Top 10 Hotels in Kigali for Business Travelers",
    excerpt: "Discover the best accommodation options for your next business trip to Rwanda's capital city.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070",
    author: "Jane Doe",
    date: "2023-04-15",
    category: "Travel",
  },
  {
    id: "2",
    title: "Exploring Rwanda's National Parks: A Complete Guide",
    excerpt:
      "From Volcanoes National Park to Akagera, here's everything you need to know about Rwanda's natural treasures.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068",
    author: "John Smith",
    date: "2023-04-08",
    category: "Outdoors",
  },
  {
    id: "3",
    title: "Rwandan Coffee: The Rising Star in the Global Market",
    excerpt:
      "How Rwanda's coffee industry is gaining international recognition for its quality and sustainability practices.",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2070",
    author: "Alice Johnson",
    date: "2023-03-27",
    category: "Business",
  },
]

export const BlogPreview = () => {
  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="block text-sm font-medium text-rwandan-blue mb-2">Our Blog</span>
            <h2 className="heading-2 text-gray-900">Latest From Rwanda</h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Stay updated with the latest travel tips, cultural insights, and business opportunities in Rwanda.
            </p>
          </div>
          <Link href="/blog" className="inline-flex items-center text-rwandan-blue hover:underline mt-4 md:mt-0">
            View all articles
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="glass-card rounded-xl overflow-hidden hover-lift animate-fade-up">
              <Link href={`/blog/${post.id}`} className="block">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-rwandan-blue/10 text-rwandan-blue text-xs font-medium py-1 px-2 rounded">
                    {post.category}
                  </span>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <h3 className="font-display text-xl font-semibold mb-3 hover:text-rwandan-blue transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 ml-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

