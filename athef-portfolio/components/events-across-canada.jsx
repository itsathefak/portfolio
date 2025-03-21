"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPinIcon, XIcon, CalendarIcon, InfoIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import Image from "next/image"

export default function EventsAcrossCanada() {
  const { playHoverSound, playClickSound } = useSound()
  const mapContainerRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const mapRef = useRef(null)

  const events = [
    {
      name: "Youth Nature Keepers Summit",
      location: "Ottawa",
      date: "Feb 2-4, 2024",
      coordinates: [-75.6972, 45.4215],
      description:
        "A three-day summit bringing together young environmental leaders from across Canada to share ideas, learn from experts, and develop action plans for local environmental initiatives.",
      video: "https://www.youtube.com/embed/3ehiaNg1ZN4",
      link: "https://example.com/youth-nature-keepers",
      highlights: [
        "Keynote speeches from leading environmental scientists and activists",
        "Workshops on community organizing and environmental advocacy",
        "Field trips to local conservation areas and sustainable infrastructure projects",
        "Networking opportunities with environmental organizations and potential mentors",
      ],
    },
    
    {
      name: "Ontario Council of International Cooperation Innovation Lab 2024",
      location: "University of Waterloo",
      date: "Feb 10, 2024",
      coordinates: [-80.5449, 43.4723],
      description:
        "A collaborative innovation lab hosted at the University of Waterloo, bringing together international development professionals, academics, and students to develop innovative solutions to global sustainability challenges. The event emphasized cross-sector collaboration and practical implementation strategies.",
      images: ["/images/waterloo-event.jpg"],
      highlights: [
        "Design thinking workshops focused on SDG implementation",
        "Case studies of successful international sustainability partnerships",
        "Technology demonstrations for environmental monitoring and conservation",
        "Collaborative project development with international partners",
      ],
    },
    
    {
      name: "Prairie Mini Summit",
      location: "Saskatchewan",
      date: "March 24, 2024",
      coordinates: [-106.4509, 52.9399],
      description:
        "A regional gathering in Saskatchewan focused on prairie ecosystem conservation, sustainable agriculture, and rural community resilience in the face of climate change. The summit brought together farmers, Indigenous knowledge keepers, scientists, and community leaders.",
      images: ["/images/saskatchewan-event.png"],
      highlights: [
        "Indigenous-led sessions on traditional land management practices",
        "Farmer panels on regenerative agriculture techniques",
        "Workshops on prairie ecosystem restoration and conservation",
        "Community-based climate adaptation planning",
      ],
    },
    
    {
      name: "Ontario Regional Youth Conference",
      location: "Lazardis School of Business",
      date: "July 1, 2024",
      coordinates: [-80.5275, 43.4738],
      description:
        "A conference for young environmental leaders across Ontario, hosted at the Lazardis School of Business. The event focused on developing entrepreneurial approaches to environmental challenges and creating sustainable business models that support ecological restoration.",
      images: ["/images/lazardis-event1.jpg"],
      highlights: [
        "Social entrepreneurship workshops with environmental focus",
        "Pitch competitions for youth-led environmental initiatives",
        "Mentorship sessions with successful eco-entrepreneurs",
        "Networking with potential investors and partners",
      ],
    },
    
    {
      name: "The Climate Reality Project Canada",
      location: "Manitoba",
      date: "2024",
      coordinates: [-97.1384, 49.8951],
      description:
        "A training and capacity building event organized by The Climate Reality Project Canada in Manitoba. The program equipped participants with the knowledge and tools to effectively communicate climate science and advocate for climate solutions in their communities.",
      images: ["/images/manitoba-event1.jpg"],
      highlights: [
        "In-depth climate science presentations from leading researchers",
        "Communication training for effective climate messaging",
        "Community organizing strategies for climate action",
        "Development of personalized climate action plans",
      ],
    },
    
    {
      name: "Connecting for Climate Action Course",
      location: "Western University",
      date: "2024",
      coordinates: [-81.2737, 43.0096],
      description:
        "An intensive course at Western University focused on building networks and coalitions for effective climate action. The program emphasized inclusive approaches to climate advocacy that center Indigenous perspectives and environmental justice principles.",
      images: ["/images/western-event1.jpg"],
      highlights: [
        "Training on inclusive coalition building for climate action",
        "Indigenous-led sessions on Two-Eyed Seeing approaches to environmental challenges",
        "Case studies of successful climate advocacy campaigns",
        "Practical workshops on policy development and engagement",
      ],
    },
    
  ]

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    }
  
    if (!mapContainerRef.current || mapRef.current) return
  
    try {
      // Initialize Mapbox map
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-94.6882, 46.2276], // Center of Canada
        zoom: 3,
      })
  
      mapRef.current = map
  
      map.on("load", () => {
        setMapLoaded(true)
  
        // Add event markers
        events.forEach((event, index) => {
          const markerEl = document.createElement("div")
          markerEl.className = "custom-marker"
          markerEl.style.width = "20px"
          markerEl.style.height = "20px"
          markerEl.style.borderRadius = "50%"
          markerEl.style.backgroundColor = "#10b981"
          markerEl.style.border = "2px solid white"
          markerEl.style.boxShadow = "0 0 10px rgba(16, 185, 129, 0.5)"
          markerEl.style.cursor = "pointer"
  
          // Add popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="font-family: system-ui, sans-serif; padding: 8px;">
              <h3 style="font-weight: bold;">${event.name}</h3>
              <p>${event.location}</p>
              <p style="opacity: 0.7;">${event.date}</p>
              <button id="view-details-${index}" class="custom-btn">View Details</button>
            </div>
          `)
  
          // Add marker to map
          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat(event.coordinates)
            .setPopup(popup)
            .addTo(map)
  
          // Click event to open modal from marker
          markerEl.addEventListener("click", () => {
            setSelectedEvent(event)
            playClickSound()
          })
  
          // Add click event to View Details button inside popup
          popup.on("open", () => {
            setTimeout(() => {
              const detailBtn = document.getElementById(`view-details-${index}`)
              if (detailBtn) {
                detailBtn.addEventListener("click", (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedEvent(event)
                  popup.remove()
                })
              }
            }, 0)
          })
        })
      })
  
      return () => {
        if (mapRef.current) {
          mapRef.current.remove()
          mapRef.current = null
        }
      }
    } catch (error) {
      console.error("Error initializing map:", error)
    }
  }, [])
  

  const openEventDetails = (event) => {
    playClickSound()
    setSelectedEvent(event)
  }

  const closeEventDetails = () => {
    playClickSound()
    setSelectedEvent(null)
  }

  return (
    <section id="events-across-canada" className="py-20 relative">
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
              Events Across Canada
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          {/* Mapbox Map */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 p-4 mb-6">
            <div ref={mapContainerRef} className="relative h-96 w-full rounded-lg" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {events.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={playHoverSound}
                onClick={() => openEventDetails(event)}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <h4 className="font-bold mb-2">{event.name}</h4>
                <div className="flex items-center text-sm text-gray-300 mb-1">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
                <div className="text-sm text-gray-300 mb-2">{event.date}</div>
                <div className="flex items-center text-primary text-sm">
                  <InfoIcon className="h-4 w-4 mr-1" />
                  <span>View Details</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeEventDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-slate-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
<div className="relative w-full">
  {selectedEvent.video ? (
    <div className="relative w-full aspect-video">
      <iframe
        className="w-full h-full rounded-t-xl"
        src={selectedEvent.video}
        title="Event Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  ) : (
    <div className="relative h-64 w-full overflow-hidden">
      {selectedEvent.images && selectedEvent.images.length > 0 ? (
        <Image
          src={selectedEvent.images[0]}
          alt={selectedEvent.name}
          width={800}
          height={400}
          className="object-cover rounded-t-xl w-full h-full"
        />
      ) : (
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="Placeholder Image"
          width={800}
          height={400}
          className="object-cover rounded-t-xl w-full h-full"
        />
      )}
    </div>
  )}

  {selectedEvent.images && selectedEvent.images.length > 1 && (
    <div className="flex space-x-2 p-4 overflow-x-auto">
      {selectedEvent.images.map((img, i) => (
        <Image
          key={i}
          src={img}
          width={100}
          height={70}
          alt={`${selectedEvent.name} - ${i + 1}`}
          className="rounded-lg cursor-pointer hover:opacity-75 transition-opacity border border-gray-300"
          onClick={() => setSelectedEvent({ ...selectedEvent, images: [img] })}
        />
      ))}
    </div>
  )}


                <button
                  onClick={closeEventDetails}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
  {selectedEvent.name}
  {selectedEvent.link && (
    <a
      href={selectedEvent.link}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-2 text-primary underline text-sm"
    >
      Visit Website
    </a>
  )}
</h3>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-300">
                    <MapPinIcon className="h-5 w-5 mr-2 text-primary" />
                    {selectedEvent.location}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                    {selectedEvent.date}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">About the Event</h4>
                  <p className="text-gray-300">{selectedEvent.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Event Highlights</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {selectedEvent.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

