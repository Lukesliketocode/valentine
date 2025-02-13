import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Playlist() {
  return (
    <section className="py-16 relative bg-gradient-to-b from-pink-50 via-pink-100 to-blue-50">
      <h2 className="text-4xl font-great-vibes text-deep-red text-center mt-16 mb-8">Our Love Playlist</h2>
      <Card className="bg-rose-gold max-w-md mx-auto transform -rotate-1 shadow-lg overflow-hidden bg-pink-400">
        <CardContent className="p-4">
        <iframe
            src="https://open.spotify.com/embed/playlist/6e0SIpJ1pXS5JnD1sKzstM?si=Prh2sYc_QV6V2E2HbmdGFQ"
            title="Our Love Playlist"
            width="100%"
            height="400"
            allow="encrypted-media"
            allowFullScreen
            className="rounded-md"
          ></iframe>
        </CardContent>
      </Card>
      <p className="text-center mt-4 font-dancing-script text-xl text-midnight-blue mb-20">
        The soundtrack of our love story
      </p>
      <div className="absolute bottom-0  md:-bottom-4 right-4 z-10">
        <Image src="/screen/music.webp" alt="Our love" width={200} height={200} quality={100}  loading="lazy" className="w-36 lg:w-52" />
      </div>
    </section>
  )
}

