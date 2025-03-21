"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const techLogos = [
  { name: "React", src: "/logos/react.svg" },
  { name: "Node.js", src: "/logos/nodejs.svg" },
  { name: "MongoDB", src: "/logos/mongodb.svg" },
  { name: "Express", src: "/logos/express.svg" },
  { name: "Vue.js", src: "/logos/vue.svg" },
  { name: "JavaScript", src: "/logos/javascript.svg" },
  { name: "HTML5", src: "/logos/html5.svg" },
  { name: "CSS3", src: "/logos/css3.svg" },
  { name: "Tailwind", src: "/logos/tailwind.svg" },
  { name: "Firebase", src: "/logos/firebase.svg" },
  { name: "AWS", src: "/logos/aws.svg" },
  { name: "Git", src: "/logos/git.svg" },
]

export default function FloatingLogos() {
  const [isEnvironmental, setIsEnvironmental] = useState(false)

  useEffect(() => {
    const checkMode = () => {
      setIsEnvironmental(document.documentElement.classList.contains("environmental-mode"))
    }

    // Initial check
    checkMode()

    // Create a MutationObserver to watch for class changes on the root element
    const observer = new MutationObserver(checkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  if (isEnvironmental) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {techLogos.map((logo, index) => (
        <FloatingLogo key={logo.name} logo={logo} index={index} />
      ))}
    </div>
  )
}

function FloatingLogo({ logo, index }) {
  const [position, setPosition] = useState({ top: "50%", left: "50%" }) // Initial State
  const [animation, setAnimation] = useState(null)

  useEffect(() => {
    // ✅ Set Random Initial Position Only on Client
    setPosition({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    })

    // ✅ Set Random Floating Animation
    setAnimation({
      x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
      y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
      rotate: [0, Math.random() * 360, Math.random() * -360, 0],
      duration: 15 + Math.random() * 30,
      delay: Math.random() * 2,
    })
  }, []) // ✅ Runs Once After Mount (Client-Side)

  if (!animation) return null // Prevents SSR Hydration Errors

  return (
    <motion.div
      className="absolute w-12 h-12 opacity-10"
      style={{ top: position.top, left: position.left }}
      animate={{
        x: animation.x,
        y: animation.y,
        rotate: animation.rotate,
      }}
      transition={{
        duration: animation.duration,
        delay: animation.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <img
        src={logo.src || `/placeholder.svg?height=48&width=48&text=${logo.name}`}
        alt={logo.name}
        className="w-full h-full object-contain"
      />
    </motion.div>
  )
}

