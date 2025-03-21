"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/components/sound-provider"
import {
  HomeIcon,
  UserIcon,
  CodeIcon,
  BriefcaseIcon,
  FolderIcon,
  AwardIcon,
  MailIcon,
  LeafIcon,
  TreesIcon as TreeIcon,
  GlobeIcon,
  FlowerIcon,
  CloudIcon,
  MapIcon,
  HeartIcon,
  MenuIcon,
  XIcon,
  MountainIcon,
} from "lucide-react"

export default function SideNav({ mode }) {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolling, setIsScrolling] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { playClickSound, playHoverSound } = useSound()
  const observerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  const navItemsRef = useRef({
    tech: [
      { id: "home", icon: <HomeIcon size={20} />, label: "Home" },
      { id: "about", icon: <UserIcon size={20} />, label: "About" },
      { id: "skills", icon: <CodeIcon size={20} />, label: "Skills" },
      { id: "experience", icon: <BriefcaseIcon size={20} />, label: "Experience" },
      { id: "projects", icon: <FolderIcon size={20} />, label: "Projects" },
      { id: "certificates", icon: <AwardIcon size={20} />, label: "Certificates" },
      { id: "personal-info", icon: <HeartIcon size={20} />, label: "Beyond The Code" },
      { id: "contact", icon: <MailIcon size={20} />, label: "Contact" },
    ],
    environmental: [
      { id: "home", icon: <TreeIcon size={20} />, label: "Home" },
      { id: "about", icon: <LeafIcon size={20} />, label: "About" },
      { id: "skills", icon: <FlowerIcon size={20} />, label: "Skills" },
      { id: "experience", icon: <GlobeIcon size={20} />, label: "Experience" },
      { id: "projects", icon: <MountainIcon size={20} />, label: "Projects" },
      { id: "certificates", icon: <AwardIcon size={20} />, label: "Certificates" },
      { id: "volunteering-experience", icon: <CloudIcon size={20} />, label: "Volunteering" },
      { id: "events-across-canada", icon: <MapIcon size={20} />, label: "Events" },
      { id: "personal-info", icon: <HeartIcon size={20} />, label: "Beyond The Code" },
      { id: "contact", icon: <MailIcon size={20} />, label: "Contact" },
    ],
  })

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Setup Intersection Observer for detecting active section
  useEffect(() => {
    // Don't update active section while programmatically scrolling
    if (isScrolling) return

    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Get all sections
    const sections = document.querySelectorAll("section[id]")

    // Create new observer with improved options
    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px 0px -50% 0px", // Consider element in view when it's in the top half of the viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for better detection
    }

    // Track intersection ratios for all sections
    const sectionIntersectionRatios = new Map()

    const handleIntersect = (entries) => {
      // Don't update while programmatically scrolling
      if (isScrolling) return

      // Update intersection ratios for each entry
      entries.forEach((entry) => {
        sectionIntersectionRatios.set(entry.target.id, entry.intersectionRatio)
      })

      // Find the section with the highest intersection ratio
      let maxRatio = 0
      let maxSection = activeSection

      sectionIntersectionRatios.forEach((ratio, sectionId) => {
        if (ratio > maxRatio) {
          maxRatio = ratio
          maxSection = sectionId
        }
      })

      // Only update if we have a valid section with some visibility
      if (maxRatio > 0) {
        setActiveSection(maxSection)
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersect, observerOptions)

    // Observe all sections
    sections.forEach((section) => {
      observerRef.current.observe(section)
      // Initialize with zero intersection
      sectionIntersectionRatios.set(section.id, 0)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [mode, isScrolling, activeSection])

  const scrollToSection = (sectionId) => {
    playClickSound()
    const section = document.getElementById(sectionId)

    if (!section) {
      console.error(`Section with ID "${sectionId}" not found`)
      return
    }

    // Set scrolling state to prevent observer from changing active section
    setIsScrolling(true)

    // Update active section immediately for UI feedback
    setActiveSection(sectionId)

    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }

    // Calculate offset based on viewport height
    const offset = 100 // Fixed pixel offset that works well with the observer settings

    // Get the section's position
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset

    // Scroll to the section with the calculated offset
    window.scrollTo({
      top: sectionTop - offset,
      behavior: "smooth",
    })

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Set a timeout to re-enable the observer after scrolling animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 1000) // Adjust time based on your scroll animation duration
  }

  const navItems = mode === "tech" ? navItemsRef.current.tech : navItemsRef.current.environmental

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    playClickSound()
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Render mobile navigation
  if (isMobile) {
    return (
      <>
        {/* Mobile menu toggle button - fixed at bottom right */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 right-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
          onClick={toggleMobileMenu}
          onMouseEnter={playHoverSound}
        >
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </motion.button>

        {/* Mobile navigation menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed bottom-20 right-4 z-40 bg-black/80 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-xl"
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={playHoverSound}
                    className={`flex items-center space-x-3 py-2 px-4 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-primary text-white"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop navigation
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed left-4 top-1/3 transform -translate-y-1/3 z-40 max-h-[70vh] overflow-y-auto"
    >
      <div className="bg-black/20 backdrop-blur-lg p-3 rounded-full border border-white/10">
        <div className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={playHoverSound}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                activeSection === item.id ? "bg-primary text-white" : "bg-gray-800/50 text-gray-400 hover:text-white"
              }`}
              aria-label={`Navigate to ${item.label} section`}
              title={item.label}
            >
              {item.icon}
              <span className="sr-only">{item.label}</span>
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute inset-0 rounded-full bg-primary -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

