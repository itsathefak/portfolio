"use client"

import { useEffect, useRef } from "react"

export default function MouseFollower({ mode }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Initialize particles array
      particlesRef.current = []

      // Create background particles
      const createBackgroundParticles = () => {
        // Tech mode: occasional stars and shooting stars
        if (mode === "tech") {
          // Regular stars
          if (Math.random() < 0.03) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const size = Math.random() * 1.5 + 0.5

            particlesRef.current.push({
              x,
              y,
              size,
              opacity: Math.random() * 0.3 + 0.1,
              twinkle: Math.random() * 0.01 + 0.005,
              twinkleDirection: 1,
              maxOpacity: Math.random() * 0.3 + 0.1,
              minOpacity: Math.random() * 0.05,
              type: "star",
            })
          }

          // Shooting stars
          if (Math.random() < 0.002) {
            const startX = Math.random() * canvas.width
            const startY = Math.random() * (canvas.height / 3)
            const angle = Math.PI / 4 + (Math.random() * Math.PI) / 2
            const speed = 3 + Math.random() * 5

            particlesRef.current.push({
              x: startX,
              y: startY,
              size: 1.5 + Math.random() * 1,
              speedX: Math.cos(angle) * speed,
              speedY: Math.sin(angle) * speed,
              life: 50 + Math.random() * 30,
              maxLife: 50 + Math.random() * 30,
              opacity: 0.7,
              trail: [],
              type: "shootingStar",
            })
          }
        }

        // Environmental mode: occasional leaves
        if (mode === "environmental" && Math.random() < 0.025) {
          const x = Math.random() * canvas.width
          const size = Math.random() * 2.5 + 1.5
          const speedX = Math.random() * 0.3 - 0.15
          const speedY = Math.random() * 0.3 + 0.1

          particlesRef.current.push({
            x,
            y: -10,
            size,
            speedX,
            speedY,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.2 + 0.1,
            type: "leaf",
          })
        }
      }

      const drawStar = (ctx, x, y, size, opacity) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      const drawLeaf = (ctx, x, y, size, rotation, opacity) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((rotation * Math.PI) / 180)

        ctx.beginPath()
        ctx.fillStyle = `rgba(100, 180, 100, ${opacity})`

        // Draw a simple leaf shape
        ctx.ellipse(0, 0, size, size * 2, 0, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      const drawShootingStar = (ctx, x, y, size, speedX, speedY, opacity, trail) => {
        // Draw trail
        if (trail && trail.length > 0) {
          ctx.beginPath()
          ctx.moveTo(trail[0].x, trail[0].y)

          for (let i = 1; i < trail.length; i++) {
            ctx.lineTo(trail[i].x, trail[i].y)
          }

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
          ctx.lineWidth = size
          ctx.stroke()
        }

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Draw glow
        ctx.beginPath()
        ctx.arc(x, y, size * 2, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(x, y, size, x, y, size * 2)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.3})`)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      }

      let animationId
      const animate = () => {
        if (!canvasRef.current || !ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Create new particles
        createBackgroundParticles()

        // Update and draw particles
        for (let i = 0; i < particlesRef.current.length; i++) {
          const p = particlesRef.current[i]

          if (p.type === "star") {
            // Twinkle effect
            p.opacity += p.twinkle * p.twinkleDirection
            if (p.opacity >= p.maxOpacity) {
              p.twinkleDirection = -1
            } else if (p.opacity <= p.minOpacity) {
              p.twinkleDirection = 1
            }

            drawStar(ctx, p.x, p.y, p.size, p.opacity)

            // Remove some stars randomly to keep the count reasonable
            if (Math.random() < 0.001) {
              particlesRef.current.splice(i, 1)
              i--
            }
          } else if (p.type === "leaf") {
            // Update position
            p.x += p.speedX
            p.y += p.speedY
            p.rotation += p.rotationSpeed

            // Add some waviness to leaf movement
            p.x += Math.sin(p.y * 0.01) * 0.1

            drawLeaf(ctx, p.x, p.y, p.size, p.rotation, p.opacity)

            // Remove leaves that are off-screen
            if (p.y > canvas.height + 10) {
              particlesRef.current.splice(i, 1)
              i--
            }
          } else if (p.type === "shootingStar") {
            // Update position
            p.x += p.speedX
            p.y += p.speedY

            // Update life
            p.life--

            // Update trail
            if (!p.trail) p.trail = []
            p.trail.push({ x: p.x, y: p.y })

            // Limit trail length
            if (p.trail.length > 10) {
              p.trail.shift()
            }

            // Calculate opacity based on life
            const opacity = (p.life / p.maxLife) * p.opacity

            drawShootingStar(ctx, p.x, p.y, p.size, p.speedX, p.speedY, opacity, p.trail)

            // Remove dead particles or those off-screen
            if (p.life <= 0 || p.x < -50 || p.x > canvas.width + 50 || p.y < -50 || p.y > canvas.height + 50) {
              particlesRef.current.splice(i, 1)
              i--
            }
          }
        }

        animationId = requestAnimationFrame(animate)
      }

      animate()

      const handleResize = () => {
        if (canvas) {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        if (animationId) {
          cancelAnimationFrame(animationId)
        }
      }
    } catch (error) {
      console.error("Error in mouse follower animation:", error)
      return () => {} // Return empty cleanup function in case of error
    }
  }, [mode])

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />
}

