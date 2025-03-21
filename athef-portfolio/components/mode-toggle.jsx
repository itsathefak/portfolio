"use client"

import { motion } from "framer-motion"
import { LaptopIcon, LeafIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"

export default function ModeToggle({ mode, setMode }) {
  const { playSwitchSound } = useSound()

  const handleToggle = () => {
    playSwitchSound()
    setMode(mode === "tech" ? "environmental" : "tech")
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-black/20 backdrop-blur-lg p-3 rounded-full flex items-center space-x-3 border border-white/10"
    >
      <button onClick={handleToggle} className="relative flex items-center justify-center">
        <div className="w-16 h-8 bg-gray-800 rounded-full p-1 flex items-center">
          <motion.div
            className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
            animate={{ x: mode === "environmental" ? 32 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {mode === "tech" ? (
              <LaptopIcon className="h-4 w-4 text-slate-900" />
            ) : (
              <LeafIcon className="h-4 w-4 text-emerald-900" />
            )}
          </motion.div>
        </div>
      </button>
    </motion.div>
  )
}

