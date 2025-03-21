"use client"

import { motion } from "framer-motion"
import { GithubIcon, LinkedinIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"

export default function Footer({ mode }) {
  const { playHoverSound } = useSound()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 mt-12 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-400">Athef@{currentYear}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <motion.a
              href="https://github.com/athefayub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={playHoverSound}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/athefayub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={playHoverSound}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

