"use client"

import { useAuthStore } from "@/store/useAuthStore"
import VideoFeed from "@/components/VideoFeed"
import TopHeader from "@/components/TopHeader"

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="h-screen">
      <TopHeader />
      <div className="pt-16">
        <VideoFeed longVideoOnly={true} />
      </div>
    </div>
  )
}
