"use client"

import { useAuthStore } from "@/store/useAuthStore"
import VideoFeed from "@/components/VideoFeed"

const mockPosts = [
  {
    id: 1,
    user: {
      name: "Gabar Singh",
      username: "@gabar_singh",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: false,
    },
    content: "Chilling at the rooftop! 🌅 #StartupIndia #Entrepreneur",
    image: "/placeholder.svg?height=400&width=400",
    likes: 1250,
    comments: 89,
    shares: 45,
    timestamp: "2h",
  },
  {
    id: 2,
    user: {
      name: "Tech Guru",
      username: "@techguru",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: true,
    },
    content: "Just launched our new app! Excited to share this journey with you all 🚀",
    likes: 2100,
    comments: 156,
    shares: 78,
    timestamp: "4h",
  },
]

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="h-screen">
      <VideoFeed showMixedContent={true} />
    </div>
  )
}
