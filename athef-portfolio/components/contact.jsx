"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

export default function Contact({ mode }) {
  const { playHoverSound, playClickSound } = useSound()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)


const mapRef = useRef(null);
const mapContainerRef = useRef(null);

useEffect(() => {
  if (!mapboxgl.accessToken) {
    console.error("🚨 Mapbox access token is missing!");
    return;
  }

  if (!mapContainerRef.current) {
    console.warn("⏳ Waiting for map container to be available...");
    return;
  }

  // If map is already initialized, update center & zoom instead of reloading
  if (mapRef.current) {
    mapRef.current.flyTo({
      center: [-80.5231, 43.4643], // Waterloo, ON
      zoom: 10,
    });
    return;
  }

  // ✅ Ensure the map container is available before initializing
  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: "mapbox://styles/mapbox/light-v11",
    center: [-80.5231, 43.4643], // Waterloo, ON Coordinates
    zoom: 10,
  });

  mapRef.current = map; // Store map instance

  map.on("load", () => {
    console.log("✅ Map loaded successfully on first render!");

    // Add marker for Waterloo, ON
    new mapboxgl.Marker({ color: "#ff5733" })
      .setLngLat([-80.5231, 43.4643])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("Waterloo, ON"))
      .addTo(map);
  });

  return () => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  };
}, [mode]); // ✅ Runs on initial render and when mode changes


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setFormStatus({ type: "success", message: "Email sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus({ type: "error", message: data.error || "Failed to send email!" });
      }
    } catch (error) {
      console.error("Error:", error);
      setFormStatus({ type: "error", message: "An unexpected error occurred!" });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(null), 5000);
    }
  };
  

  return (
    <section id="contact" className="py-20 relative">
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
              Get In Touch
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6 mb-8">
                  <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }} onMouseEnter={playHoverSound}>
                    <div className="bg-primary/20 p-3 rounded-full">
                      <MailIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a
                        href="mailto:athefayubkhan@gmail.com"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        athefayubkhan@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }} onMouseEnter={playHoverSound}>
                    <div className="bg-primary/20 p-3 rounded-full">
                      <PhoneIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <a href="tel:+15485771523" className="text-gray-300 hover:text-white transition-colors">
                        +1 548 577 1523
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }} onMouseEnter={playHoverSound}>
                    <div className="bg-primary/20 p-3 rounded-full">
                      <MapPinIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-gray-300">Waterloo, Ontario, Canada</p>
                    </div>
                  </motion.div>
                </div>

                {/* Mapbox Map */}
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <div ref={mapContainerRef} className="h-full w-full rounded-lg" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 z-0">
                  <img src="/images/toronto-skyline.jpg" alt="Toronto Skyline" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 focus:border-primary rounded-lg"
                        onMouseEnter={playHoverSound}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 focus:border-primary rounded-lg"
                        onMouseEnter={playHoverSound}
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 focus:border-primary rounded-lg"
                        onMouseEnter={playHoverSound}
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="bg-white/5 border-white/10 focus:border-primary resize-none rounded-lg"
                        onMouseEnter={playHoverSound}
                      />
                    </div>

                    {formStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-lg ${
                          formStatus.type === "success"
                            ? "bg-green-500/20 text-green-200"
                            : "bg-red-500/20 text-red-200"
                        }`}
                      >
                        {formStatus.message}
                      </motion.div>
                    )}

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full rounded-full"
                        disabled={isSubmitting}
                        onMouseEnter={playHoverSound}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <SendIcon className="mr-2 h-4 w-4" />
                            Say Hello
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

