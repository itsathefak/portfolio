"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function InitialLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 5
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-md px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">Athef Ayub Khan</h1>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
          />
        </div>
        <p className="text-white mt-4 text-center">{progress}%</p>
      </motion.div>
    </div>
  )
}

