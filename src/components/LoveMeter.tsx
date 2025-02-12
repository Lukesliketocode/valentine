import { motion } from "framer-motion"
export default function LoveMeter({ progress }: { progress: number }) {
  return (
    <div className="fixed bottom-4 left-4 w-64 bg-white rounded-full shadow-lg overflow-hidden z-50">
      <motion.div
        className="h-4 bg-gradient-to-r from-pink-500 to-red-500"
        style={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.3 }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span className="text-xs font-bold text-gray-800">Love Meter: {Math.round(progress * 100)}%</span>
      </div>
    </div>
  )
}

