"use client"

import { useState, useRef } from "react"
import { Heart, MessageCircle, Share, Bookmark, Play, Pause, Maximize, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const mockVideos = [
  {
    id: 1,
    type: "short",
    user: {
      name: "Gabar Singh",
      username: "@gabar_singh",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    description: "Chilling at the rooftop! 🌅",
    hashtags: ["#StartupIndia", "#Entrepreneur"],
    audio: "Original Audio: In the Sky",
    likes: 201000,
    comments: 1300,
    shares: 458,
    saves: 2100,
    videoUrl: "/placeholder.svg?height=800&width=450",
  },
  {
    id: 2,
    type: "long",
    user: {
      name: "Tech Creator",
      username: "@techcreator",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Building a Startup from Scratch - Complete Guide",
    description: "Learn how to build a successful startup from the ground up",
    community: "Startup Community",
    series: "Entrepreneur Series",
    episode: "Episode 1",
    price: "$9.99",
    duration: "15:42",
    likes: 89500,
    comments: 892,
    shares: 234,
    saves: 1200,
    videoUrl: "/placeholder.svg?height=800&width=450",
  },
  {
    id: 3,
    type: "short",
    user: {
      name: "Dance Queen",
      username: "@danceQueen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    description: "New dance trend! Try this at home 💃",
    hashtags: ["#Dance", "#Trending"],
    audio: "Original Audio: Dance Beats",
    likes: 156000,
    comments: 2100,
    shares: 890,
    saves: 3400,
    videoUrl: "/placeholder.svg?height=800&width=450",
  },
  {
    id: 4,
    type: "long",
    user: {
      name: "Code Master",
      username: "@codemaster",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "React vs Next.js - Which Should You Choose?",
    description: "Complete comparison of React and Next.js frameworks",
    community: "Developer Community",
    series: "Web Dev Masterclass",
    episode: "Episode 5",
    price: "$12.99",
    duration: "22:15",
    likes: 67000,
    comments: 445,
    shares: 123,
    saves: 890,
    videoUrl: "/placeholder.svg?height=800&width=450",
  },
]

interface VideoFeedProps {
  showMixedContent?: boolean
  longVideoOnly?: boolean
}

export default function VideoFeed({ showMixedContent = false, longVideoOnly = false }: VideoFeedProps) {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const filteredVideos = longVideoOnly
    ? mockVideos.filter((video) => video.type === "long")
    : showMixedContent
      ? mockVideos
      : mockVideos.filter((video) => video.type === "short")

  const handleVideoAction = (action: string, videoId: number) => {
    console.log(`${action} video ${videoId}`)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`h-screen overflow-y-scroll snap-y snap-mandatory ${isFullscreen ? "fullscreen-video" : ""}`}>
      {filteredVideos.map((video, index) => (
        <div key={video.id} className="h-screen snap-start relative bg-black">
          {/* Video Background */}
          <div className="absolute inset-0">
            <img
              src={video.videoUrl || "/placeholder.svg"}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            {/* Play/Pause overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white/80 hover:text-white hover:bg-black/20"
              >
                {isPlaying ? <Pause size={48} /> : <Play size={48} />}
              </Button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => handleVideoAction("like", video.id)}
                className="text-white hover:text-red-500 hover:bg-black/20 rounded-full p-3"
              >
                <Heart size={28} />
              </Button>
              <span className="text-white text-sm font-medium mt-1">
                {video.likes > 1000 ? `${(video.likes / 1000).toFixed(0)}K` : video.likes}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => handleVideoAction("comment", video.id)}
                className="text-white hover:text-primary hover:bg-black/20 rounded-full p-3"
              >
                <MessageCircle size={28} />
              </Button>
              <span className="text-white text-sm font-medium mt-1">
                {video.comments > 1000 ? `${(video.comments / 1000).toFixed(1)}K` : video.comments}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => handleVideoAction("share", video.id)}
                className="text-white hover:text-primary hover:bg-black/20 rounded-full p-3"
              >
                <Share size={28} />
              </Button>
              <span className="text-white text-sm font-medium mt-1">{video.shares}</span>
            </div>

            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => handleVideoAction("save", video.id)}
                className="text-white hover:text-primary hover:bg-black/20 rounded-full p-3"
              >
                <Bookmark size={28} />
              </Button>
              <span className="text-white text-sm font-medium mt-1">
                {video.saves > 1000 ? `${(video.saves / 1000).toFixed(1)}K` : video.saves}
              </span>
            </div>

            {/* Fullscreen button for long videos */}
            {video.type === "long" && (
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={toggleFullscreen}
                  className="text-white hover:text-primary hover:bg-black/20 rounded-full p-3"
                >
                  <Maximize size={28} />
                </Button>
              </div>
            )}

            {/* Profile Avatar */}
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src={video.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{video.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">+</span>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div
            className={`absolute bottom-4 left-4 right-20 text-white ${video.type === "long" ? "long-video-overlay" : ""}`}
          >
            {video.type === "long" && (
              <>
                {/* Community and Series Info */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary">
                      <Users size={12} className="mr-1" />
                      {video.community}
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white">
                      {video.series} - {video.episode}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500">
                      <DollarSign size={12} className="mr-1" />
                      {video.price}
                    </Badge>
                    <span className="text-sm opacity-80">{video.duration}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2">{video.title}</h3>
              </>
            )}

            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold">{video.user.name}</span>
              <Button
                size="sm"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-black"
              >
                Follow
              </Button>
            </div>

            <p className="mb-2">{video.description}</p>

            {video.type === "short" && (
              <>
                <div className="flex flex-wrap gap-1 mb-2">
                  {video.hashtags?.map((tag) => (
                    <span key={tag} className="text-primary font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm opacity-80">
                  <span>🎵 {video.audio}</span>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
