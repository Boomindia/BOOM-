"use client"

import { useState } from "react"
import { X, Settings, Gauge, Share, LinkIcon, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface VideoMoreMenuProps {
  isOpen: boolean
  onClose: () => void
  videoId: number | null
}

const socialPlatforms = [
  { name: "WhatsApp", icon: "📱", color: "bg-green-500" },
  { name: "Instagram", icon: "📷", color: "bg-pink-500" },
  { name: "Telegram", icon: "✈️", color: "bg-blue-500" },
  { name: "Snapchat", icon: "👻", color: "bg-yellow-500" },
  { name: "Twitter", icon: "🐦", color: "bg-blue-400" },
  { name: "Facebook", icon: "📘", color: "bg-blue-600" },
]

export default function VideoMoreMenu({ isOpen, onClose, videoId }: VideoMoreMenuProps) {
  const [quality, setQuality] = useState("720p")
  const [speed, setSpeed] = useState("1x")
  const [showShareOptions, setShowShareOptions] = useState(false)

  const handleShare = (platform: string) => {
    const videoUrl = `https://boom.app/video/${videoId}`
    console.log(`Sharing to ${platform}:`, videoUrl)

    // In a real app, you would integrate with each platform's sharing API
    if (platform === "WhatsApp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(videoUrl)}`)
    } else if (platform === "Telegram") {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(videoUrl)}`)
    } else if (platform === "Twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`)
    }
    // Add more platform integrations as needed
  }

  const copyLink = () => {
    const videoUrl = `https://boom.app/video/${videoId}`
    navigator.clipboard.writeText(videoUrl)
    console.log("Link copied to clipboard")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={onClose}>
      <div className="bg-background rounded-t-2xl w-full max-w-md p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Video Options</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Quality Settings */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Settings size={16} />
            <span className="font-medium">Quality</span>
          </div>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="360p">360p</SelectItem>
              <SelectItem value="480p">480p</SelectItem>
              <SelectItem value="720p">720p HD</SelectItem>
              <SelectItem value="1080p">1080p Full HD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Speed Settings */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Gauge size={16} />
            <span className="font-medium">Playback Speed</span>
          </div>
          <Select value={speed} onValueChange={setSpeed}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.25x">0.25x</SelectItem>
              <SelectItem value="0.5x">0.5x</SelectItem>
              <SelectItem value="0.75x">0.75x</SelectItem>
              <SelectItem value="1x">Normal</SelectItem>
              <SelectItem value="1.25x">1.25x</SelectItem>
              <SelectItem value="1.5x">1.5x</SelectItem>
              <SelectItem value="2x">2x</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Share Options */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            <Share size={16} className="mr-2" />
            Share Video
          </Button>

          {showShareOptions && (
            <div className="space-y-3 pl-4">
              <Button variant="ghost" className="w-full justify-start" onClick={copyLink}>
                <LinkIcon size={16} className="mr-2" />
                Copy Link
              </Button>

              <div className="grid grid-cols-3 gap-2">
                {socialPlatforms.map((platform) => (
                  <Button
                    key={platform.name}
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center p-3 h-auto"
                    onClick={() => handleShare(platform.name)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${platform.color} flex items-center justify-center text-white mb-1`}
                    >
                      <span className="text-sm">{platform.icon}</span>
                    </div>
                    <span className="text-xs">{platform.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Download Option */}
        <Button variant="outline" className="w-full justify-start">
          <Download size={16} className="mr-2" />
          Download Video
        </Button>
      </div>
    </div>
  )
}
