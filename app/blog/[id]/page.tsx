"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { PageLayout } from "@/components/layout/PageLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Heart, MessageSquare, Send, ThumbsUp, User } from "lucide-react"
import { getBlogById, getBlogs } from "@/data/mockBlogs"
import { toast } from "sonner"

interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: string
  likes: number
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === "string" ? params.id : ""
  const blog = getBlogById(id)
  const relatedBlogs = getBlogs()
    .filter((b) => b.id !== id && b.category === blog?.category)
    .slice(0, 3)

  const authorBlogs = getBlogs()
    .filter((b) => b.id !== id && blog && b.author.name === blog.author.name)
    .slice(0, 3)

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 5)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser")
      if (user) {
        setCurrentUser(JSON.parse(user))
      }

      const randomComments: Comment[] = [
        {
          id: "comment-1",
          userId: "user-1",
          userName: "Sarah Johnson",
          content:
            "This article was incredibly insightful! I'm planning my trip to Rwanda now and this information will be very helpful.",
          createdAt: "2023-05-15T10:23:00Z",
          likes: 4,
        },
        {
          id: "comment-2",
          userId: "user-2",
          userName: "Michael Chen",
          content:
            "The photos are stunning! Rwanda is definitely moving up on my travel bucket list after reading this.",
          createdAt: "2023-05-16T08:45:00Z",
          likes: 2,
        },
      ]

      setComments(randomComments)

      if (currentUser) {
        const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]")
        if (likedBlogs.includes(id)) {
          setIsLiked(true)
        }
      }
    }
  }, [id, currentUser])

  if (!blog) {
    return (
      <PageLayout>
        <div className="container flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="heading-2 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/blog")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </PageLayout>
    )
  }

  const handleLike = () => {
    if (!currentUser) {
      toast.error("Please login to like this article")
      return
    }

    setIsLiked(!isLiked)

    if (isLiked) {
      setLikeCount((prev) => prev - 1)
      if (typeof window !== "undefined") {
        const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]")
        const updatedLikedBlogs = likedBlogs.filter((blogId: string) => blogId !== id)
        localStorage.setItem("likedBlogs", JSON.stringify(updatedLikedBlogs))
      }
    } else {
      setLikeCount((prev) => prev + 1)
      if (typeof window !== "undefined") {
        const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]")
        likedBlogs.push(id)
        localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs))
      }
    }
  }

  const handleCommentSubmit = () => {
    if (!currentUser) {
      toast.error("Please login to leave a comment")
      return
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.fullName,
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
      }

      setComments((prev) => [newCommentObj, ...prev])
      setNewComment("")
      setIsLoading(false)
      toast.success("Comment added successfully")
    }, 500)
  }

  const handleCommentLike = (commentId: string) => {
    if (!currentUser) {
      toast.error("Please login to like comments")
      return
    }

    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  const viewAuthorArticles = () => {
    router.push(`/blog?author=${blog?.author.name}`)
  }

  return (
    <PageLayout>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10" />
        <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-[50vh] object-cover" />
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 container">
          <div className="max-w-4xl">
            <Badge className="mb-4">{blog.category}</Badge>
            <h1 className="heading-1 text-white mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center">
                <img
                  src={blog.author.avatar || "/placeholder.svg"}
                  alt={blog.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{blog.author.name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{blog.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="mb-6">
              <Button variant="outline" size="sm" onClick={() => router.push("/blog")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Button>
            </div>

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="font-medium mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className={isLiked ? "bg-rwandan-blue text-white" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {likeCount} Likes
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>

            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="heading-3">Comments ({comments.length})</h3>
              </div>

              <Card className="mb-8">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      {currentUser ? (
                        <span className="font-medium text-sm">{currentUser.fullName.charAt(0).toUpperCase()}</span>
                      ) : (
                        <User className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <Textarea
                        placeholder={currentUser ? "Write a comment..." : "Please login to comment"}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={!currentUser || isLoading}
                        className="mb-2"
                      />
                      <div className="flex justify-between items-center">
                        {!currentUser && (
                          <span className="text-sm text-gray-500">
                            <Link href="/login" className="text-rwandan-blue hover:underline">
                              Sign in
                            </Link>{" "}
                            to join the conversation
                          </span>
                        )}
                        <Button
                          size="sm"
                          onClick={handleCommentSubmit}
                          disabled={!currentUser || !newComment.trim() || isLoading}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {isLoading ? "Posting..." : "Post Comment"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                        <span className="font-medium text-sm">{comment.userName.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{comment.userName}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.content}</p>
                        <div className="flex items-center gap-4">
                          <button
                            className="text-gray-500 hover:text-rwandan-blue flex items-center text-sm"
                            onClick={() => handleCommentLike(comment.id)}
                          >
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                            {comment.likes} {comment.likes === 1 ? "Like" : "Likes"}
                          </button>
                          <button className="text-gray-500 hover:text-rwandan-blue flex items-center text-sm">
                            <MessageSquare className="h-3.5 w-3.5 mr-1" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium mb-2">No comments yet</h4>
                  <p className="text-gray-600">Be the first to share your thoughts on this article</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={blog.author.avatar || "/placeholder.svg"}
                    alt={blog.author.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{blog.author.name}</h3>
                    <p className="text-sm text-gray-500">Travel Writer</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Passionate about exploring Rwanda's diverse landscapes and sharing authentic travel experiences with
                  global audiences.
                </p>
                <Button variant="outline" className="w-full" onClick={viewAuthorArticles}>
                  View All Articles by {blog?.author.name.split(" ")[0]}
                </Button>
              </CardContent>
            </Card>

            {authorBlogs.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold mb-4">More from {blog?.author.name}</h3>
                <div className="space-y-6">
                  {authorBlogs.map((authorBlog) => (
                    <Link href={`/blog/${authorBlog.id}`} key={`author-${authorBlog.id}`}>
                      <div className="flex gap-4 group">
                        <img
                          src={authorBlog.image || "/placeholder.svg"}
                          alt={authorBlog.title}
                          className="w-24 h-20 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium group-hover:text-rwandan-blue transition-colors line-clamp-2">
                            {authorBlog.title}
                          </h4>
                          <div className="flex items-center text-gray-500 text-xs mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{authorBlog.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-display text-xl font-semibold mb-4">Related Articles</h3>
              <div className="space-y-6">
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map((relatedBlog) => (
                    <Link href={`/blog/${relatedBlog.id}`} key={relatedBlog.id}>
                      <div className="flex gap-4 group">
                        <img
                          src={relatedBlog.image || "/placeholder.svg"}
                          alt={relatedBlog.title}
                          className="w-24 h-20 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium group-hover:text-rwandan-blue transition-colors line-clamp-2">
                            {relatedBlog.title}
                          </h4>
                          <div className="flex items-center text-gray-500 text-xs mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{relatedBlog.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">No related articles found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

