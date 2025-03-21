"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { AwardIcon, ExternalLinkIcon, MapPinIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import Image from "next/image"

export default function Volunteering({ mode }) {
  const { playHoverSound, playClickSound } = useSound()
  const mapRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (mode === "environmental" && mapRef.current && !mapLoaded) {
      // Load A-Frame script dynamically
      const script = document.createElement("script")
      script.src = "https://aframe.io/releases/1.3.0/aframe.min.js"
      script.async = true
      script.onload = () => {
        setMapLoaded(true)
      }
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [mode, mapLoaded])

  const volunteering = [
    {
      organization: "Canadian Council of Invasive Species",
      link: "https://www.linkedin.com/in/athefak/details/volunteering-experiences/1714767746415/single-media-viewer/?profileId=ACoAACysOYYBQJIJx9kgvIdZsy9xrCycvfcFsdo",
      image: "/images/ccis.jpg",
    },
    {
      organization: "Youth Nature Keepers",
      link: "https://www.linkedin.com/in/athefak/details/volunteering-experiences/1714768740086/single-media-viewer/?profileId=ACoAACysOYYBQJIJx9kgvIdZsy9xrCycvfcFsdo",
      image: "/images/ynk.jpg",
    },
    {
      organization: "Canadian Service Corps",
      link: "https://www.linkedin.com/in/athefak/details/volunteering-experiences/1714768453773/single-media-viewer/?profileId=ACoAACysOYYBQJIJx9kgvIdZsy9xrCycvfcFsdo",
      image: "/images/csc.jpg",
    },
    {
      organization: "Climate Reality Project Canada",
      link: "https://www.linkedin.com/in/athefak/details/volunteering-experiences/1714769184722/single-media-viewer/?profileId=ACoAACysOYYBQJIJx9kgvIdZsy9xrCycvfcFsdo",
      image: "/images/crpc.jpg",
    },
  ]
  

  const certificates = [
    {
      name: "Introduction to Software Engineering",
      issuer: "IBM",
      image: "/images/ibm-cert.jpg",
    },
    {
      name: "Vue.js - The Complete Guide",
      issuer: "Udemy",
      image: "/images/vue-cert.jpg",
    },
  ]

  const events = [
    {
      name: "Youth Nature Keepers Summit",
      location: "Ottawa",
      date: "Feb 2-4, 2024",
      coordinates: { lat: 45.4215, lng: -75.6972 },
    },
    {
      name: "Ontario Council of International Cooperation Innovation Lab 2024",
      location: "University of Waterloo",
      date: "Feb 10, 2024",
      coordinates: { lat: 43.4723, lng: -80.5449 },
    },
    {
      name: "Prairie Mini Summit",
      location: "Saskatchewan",
      date: "March 24, 2024",
      coordinates: { lat: 52.9399, lng: -106.4509 },
    },
    {
      name: "Ontario Regional Youth Conference",
      location: "Lazardis School of Business",
      date: "July 1, 2024",
      coordinates: { lat: 43.4738, lng: -80.5275 },
    },
    {
      name: "The Climate Reality Project Canada",
      location: "Manitoba",
      date: "2024",
      coordinates: { lat: 49.8951, lng: -97.1384 },
    },
    {
      name: "Connecting for Climate Action Course",
      location: "Western University",
      date: "2024",
      coordinates: { lat: 43.0096, lng: -81.2737 },
    },
  ]

  if (mode === "tech") {
    return null
  }

  return (
    <section id="volunteering" className="py-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/images/topography.svg')] bg-repeat opacity-5" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            whileInView={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 inline-block relative">
              Environmental Involvement
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Volunteering Experience</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {volunteering.map((vol, index) => (
                <motion.div
                  key={vol.organization}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={playHoverSound}
                  className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors h-full"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={vol.image || "/placeholder.svg?height=160&width=320"}
                      alt={vol.organization}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-2">{vol.organization}</h4>
                    <a
  href={vol.link}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center text-primary hover:text-primary/80 transition-colors text-sm"
  onClick={(e) => {
    e.stopPropagation(); // Prevents any unwanted reloading
    playClickSound();
  }}
>
  <ExternalLinkIcon className="h-4 w-4 mr-1" />
  Visit Organization
</a>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Certificates</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={playHoverSound}
                  className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors flex"
                >
                  <div className="relative h-auto w-24 md:w-32 flex-shrink-0">
                    <Image
                      src={cert.image || "/placeholder.svg?height=128&width=128"}
                      alt={cert.name}
                      width={128}
                      height={128}
                      className="object-cover h-full"
                    />
                  </div>
                  <div className="p-4 flex items-center">
                    <div>
                      <div className="flex items-center mb-2">
                        <AwardIcon className="h-5 w-5 text-primary mr-2" />
                        <h4 className="font-bold">{cert.name}</h4>
                      </div>
                      <p className="text-sm text-gray-300">Issued by {cert.issuer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Events Across Canada</h3>

            {/* A-Frame 3D Map */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 p-4 mb-6">
              <div className="relative h-96 w-full" ref={mapRef}>
                {mapLoaded ? (
                  <div style={{ height: "100%", width: "100%" }}>
                    <a-scene embedded>
                      <a-assets>
                        <img id="canada-map" src="/images/canada-map.jpg" />
                        <img id="marker" src="/images/map-marker.png" />
                      </a-assets>

                      <a-sky color="#002"></a-sky>

                      <a-entity position="0 1.6 0">
                        <a-camera look-controls wasd-controls></a-camera>
                      </a-entity>

                      <a-entity position="0 1.5 -3">
                        <a-plane src="#canada-map" width="5" height="3" position="0 0 0"></a-plane>

                        {/* Event markers */}
                        <a-entity position="-1.5 0.5 0.01">
                          <a-image
                            src="#marker"
                            width="0.2"
                            height="0.2"
                            position="0 0 0"
                            animation="property: position; to: 0 0.1 0; dir: alternate; dur: 1000; loop: true"
                          ></a-image>
                          <a-text value="Ottawa" width="1" position="0.3 0 0" color="white"></a-text>
                        </a-entity>

                        <a-entity position="-0.5 0 0.01">
                          <a-image
                            src="#marker"
                            width="0.2"
                            height="0.2"
                            position="0 0 0"
                            animation="property: position; to: 0 0.1 0; dir: alternate; dur: 1000; loop: true"
                          ></a-image>
                          <a-text value="Waterloo" width="1" position="0.3 0 0" color="white"></a-text>
                        </a-entity>

                        <a-entity position="1.5 0.5 0.01">
                          <a-image
                            src="#marker"
                            width="0.2"
                            height="0.2"
                            position="0 0 0"
                            animation="property: position; to: 0 0.1 0; dir: alternate; dur: 1000; loop: true"
                          ></a-image>
                          <a-text value="Saskatchewan" width="1" position="0.3 0 0" color="white"></a-text>
                        </a-entity>

                        <a-entity position="0.8 -0.5 0.01">
                          <a-image
                            src="#marker"
                            width="0.2"
                            height="0.2"
                            position="0 0 0"
                            animation="property: position; to: 0 0.1 0; dir: alternate; dur: 1000; loop: true"
                          ></a-image>
                          <a-text value="Manitoba" width="1" position="0.3 0 0" color="white"></a-text>
                        </a-entity>
                      </a-entity>
                    </a-scene>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-black/30 rounded-lg">
                    <p>Loading 3D Canada Map...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                >
                  <h4 className="font-bold mb-2">{event.name}</h4>
                  <div className="flex items-center text-sm text-gray-300 mb-1">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  <div className="text-sm text-gray-300">{event.date}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

