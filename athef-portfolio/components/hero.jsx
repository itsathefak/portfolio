"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon, GithubIcon, LinkedinIcon, MailIcon, FileTextIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import Image from "next/image"

export default function Hero({ mode }) {
  const { playClickSound, playHoverSound } = useSound()
  const heroRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    if (mode === "tech" && particlesRef.current) {
      try {
        // Initialize particles for tech mode (similar to benscott.dev)
        const canvas = particlesRef.current
        const ctx = canvas.getContext("2d")

        if (!ctx) return // Exit if context can't be obtained

        // Set canvas size
        const setCanvasSize = () => {
          if (canvas) {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
          }
        }

        setCanvasSize()
        window.addEventListener("resize", setCanvasSize)

        // Particle class
        class Particle {
          constructor() {
            this.reset()
          }

          reset() {
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height
            this.size = Math.random() * 2 + 0.5
            this.speed = Math.random() * 0.5 + 0.1
            this.opacity = Math.random() * 0.5 + 0.1
            this.direction = Math.random() * 360
            this.vx = Math.cos(this.direction) * this.speed
            this.vy = Math.sin(this.direction) * this.speed
          }

          update() {
            this.x += this.vx
            this.y += this.vy

            // Reset if off screen
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
              this.reset()
            }
          }

          draw() {
            if (ctx) {
              ctx.beginPath()
              ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
              ctx.fill()
            }
          }
        }

        // Create particles
        const particles = []
        const particleCount = 100

        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle())
        }

        // Animation loop
        let animationId
        const animate = () => {
          if (!canvas || !ctx) return

          ctx.clearRect(0, 0, canvas.width, canvas.height)

          particles.forEach((particle) => {
            particle.update()
            particle.draw()
          })

          animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
          window.removeEventListener("resize", setCanvasSize)
          if (animationId) {
            cancelAnimationFrame(animationId)
          }
        }
      } catch (error) {
        console.error("Error in hero animation:", error)
      }
    }
  }, [mode])

  const openResume = () => {
    playClickSound()
    // Use the correct path to the resume file in the public folder
    window.open("/resume.pdf", "_blank")
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className={`relative py-20 flex flex-col items-center justify-center min-h-screen text-center overflow-hidden ${
        mode === "environmental" ? "environmental-hero" : ""
      }`}
    >
      {/* Background logic for Tech and Environmental Modes */}
      {mode === "tech" ? (
        <>
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-cover bg-center opacity-20" />
          </div>
          <canvas ref={particlesRef} className="absolute inset-0 -z-5 pointer-events-none" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/images/forest-bg.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/20" /> {/* Light overlay for readability */}
        </div>
      )}
  
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-4 z-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-xl"
          >
            <Image src="/images/profile.jpg" alt="Athef Ayub Khan" fill className="object-cover" />
          </motion.div>
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Hi, I'm <span className="text-primary">Athef</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-300 mb-2"
            >
              {mode === "tech" ? "Full Stack Developer" : "Environmental Advocate"}
            </motion.h2>
          </div>
        </div>
  
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg mb-10 max-w-2xl mx-auto"
        >
          {mode === "tech"
            ? "Building impactful, user-focused applications with modern web technologies."
            : "Combining technology and environmental science to create sustainable solutions."}
        </motion.p>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            className="group rounded-full"
            onMouseEnter={playHoverSound}
            onClick={() => {
              playClickSound()
              document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
            }}
          >
            <MailIcon className="mr-2 h-4 w-4 group-hover:animate-bounce" />
            Contact Me
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group rounded-full"
            onMouseEnter={playHoverSound}
            onClick={openResume}
          >
            <FileTextIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            View Resume
          </Button>
        </motion.div>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center space-x-6 mb-16"
        >
          <motion.a
            href="https://github.com/itsathefak"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <GithubIcon className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/athefak/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <LinkedinIcon className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </motion.a>
          <motion.a
            href="mailto:athefayubkhan@gmail.com"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <MailIcon className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </motion.a>
        </motion.div>
  
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="cursor-pointer"
          onClick={() => {
            playClickSound()
            document.getElementById("about").scrollIntoView({ behavior: "smooth" })
          }}
        >
          <ArrowDownIcon className="h-8 w-8 mx-auto text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}  