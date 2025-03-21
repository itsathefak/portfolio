"use client"

import { createContext, useContext, useRef, useEffect } from "react"

const SoundContext = createContext()

export function useSound() {
  return useContext(SoundContext)
}

export default function SoundProvider({ children }) {
  const hoverSound = useRef(null)
  const clickSound = useRef(null)
  const switchSound = useRef(null)

  useEffect(() => {
    // Only create audio objects if they don't exist yet
    if (!hoverSound.current) {
      hoverSound.current = new Audio("/sounds/hover.mp3")
      hoverSound.current.volume = 0.2 // Reduce volume
    }

    if (!clickSound.current) {
      clickSound.current = new Audio("/sounds/click.mp3")
      clickSound.current.volume = 0.3 // Reduce volume
    }

    if (!switchSound.current) {
      switchSound.current = new Audio("/sounds/switch.mp3")
      switchSound.current.volume = 0.4 // Reduce volume
    }

    // Preload sounds
    hoverSound.current.load()
    clickSound.current.load()
    switchSound.current.load()

    return () => {
      hoverSound.current = null
      clickSound.current = null
      switchSound.current = null
    }
  }, [])

  // Throttle hover sound to prevent too many sounds playing at once
  let lastHoverTime = 0
  const playHoverSound = () => {
    const now = Date.now()
    if (now - lastHoverTime > 300) {
      // Only play every 300ms
      lastHoverTime = now
      if (hoverSound.current) {
        hoverSound.current.currentTime = 0
        hoverSound.current.play().catch((e) => console.log("Audio play failed:", e))
      }
    }
  }

  const playClickSound = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0
      clickSound.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const playSwitchSound = () => {
    if (switchSound.current) {
      switchSound.current.currentTime = 0
      switchSound.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  return (
    <SoundContext.Provider value={{ playHoverSound, playClickSound, playSwitchSound }}>
      {children}
    </SoundContext.Provider>
  )
}

