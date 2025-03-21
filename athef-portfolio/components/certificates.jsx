"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AwardIcon, XIcon, ExternalLinkIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import Image from "next/image"

export default function Certificates({ mode }) {
  const { playHoverSound, playClickSound } = useSound()
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const techCertificates = [
    {
      name: "Introduction to Software Engineering",
      issuer: "IBM",
      image: "/images/ibm-cert.jpg",
      date: "2023",
      description:
        "Comprehensive introduction to software engineering principles, methodologies, and best practices. Covers the software development lifecycle, agile methodologies, and modern development tools.",
      skills: ["Software Development Lifecycle", "Agile Methodologies", "Development Tools", "Project Management"],
      certificateLink: "https://www.coursera.org/account/accomplishments/verify/3DY59OFAGK9Q?utm_product=course",
    },
    {
      name: "Vue.js - The Complete Guide",
      issuer: "Udemy",
      image: "/images/vue-cert.jpg",
      date: "2023",
      description:
        "In-depth course on Vue.js framework covering components, routing, state management with Vuex, and building single-page applications. Includes hands-on projects and real-world applications.",
      skills: ["Vue.js", "Vuex", "Vue Router", "Single-Page Applications", "Component Architecture"],
      certificateLink: "https://www.udemy.com/certificate/UC-01caf54a-dcc6-45d3-89d0-11455c169e7f/",
    },
    {
      name: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services (AWS)",
      image: "/images/aws-cert.jpg",
      date: "2024",
      description:
        "Fundamental understanding of AWS Cloud concepts, services, security, architecture, pricing, and support. Provides an overview of cloud computing and key AWS services.",
      skills: ["Cloud Computing", "AWS Services", "Cloud Security", "Cloud Architecture", "Cost Management"],
      certificateLink: "https://www.linkedin.com/in/athefak/details/certifications/1738096783971/single-media-viewer/?profileId=ACoAACysOYYBQJIJx9kgvIdZsy9xrCycvfcFsdo",
    },
  ]

  const environmentalCertificates = [
    {
      name: "Connecting for Climate Change Action",
      issuer: "Western University",
      image: "/images/climate-cert.jpg",
      date: "2024",
      description:
        "I gained key insights into climate action, exploring concepts like positionality—understanding how our identities shape perspectives; Two-Eyed Seeing (Etuaptmumk)—blending Indigenous knowledge with Western science; and reciprocity—fostering mutual respect for the environment. These principles now guide my approach to sustainable, inclusive climate solutions.",
      skills: [
        "Climate Action",
        "Indigenous Knowledge",
        "Sustainability",
        "Environmental Justice",
        "Community Engagement",
      ],
      certificateLink: "https://www.coursera.org/account/accomplishments/verify/AZXYSP367PAW",
    },
  ]

  const currentCertificates = mode === "tech" ? techCertificates : environmentalCertificates

  const openCertificateDetails = (certificate) => {
    playClickSound()
    setSelectedCertificate(certificate)
  }

  const closeCertificateDetails = () => {
    playClickSound()
    setSelectedCertificate(null)
  }

  return (
<section id="certificates" className="py-20 relative">
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
              Certificates & Qualifications
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div
            className={`grid ${mode === "environmental" ? "justify-center" : "md:grid-cols-2 lg:grid-cols-3"} gap-6`}
          >
            {currentCertificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={playHoverSound}
                onClick={() => openCertificateDetails(cert)}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors cursor-pointer max-w-md"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={cert.image || "/placeholder.svg?height=160&width=320"}
                    alt={cert.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <AwardIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <h4 className="font-bold">{cert.name}</h4>
                  </div>
                  <p className="text-sm text-gray-300">Issued by {cert.issuer}</p>
                  <p className="text-xs text-gray-400 mt-1">{cert.date}</p>
                  <div className="mt-3 text-sm text-primary flex items-center">
                    <span>View details</span>
                    <ExternalLinkIcon className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeCertificateDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-slate-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={selectedCertificate.image || "/placeholder.svg?height=400&width=800"}
                  alt={selectedCertificate.name}
                  fill
                  className="object-cover rounded-t-xl"
                />
                <button
                  onClick={closeCertificateDetails}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <AwardIcon className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold">{selectedCertificate.name}</h3>
                    <p className="text-gray-300">
                      {selectedCertificate.issuer} • {selectedCertificate.date}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Description</h4>
                  <p className="text-gray-300">{selectedCertificate.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertificate.skills.map((skill) => (
                      <span key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {selectedCertificate.certificateLink && (
  <div className="mt-6">
    <a
      href={selectedCertificate.certificateLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors"
      onClick={playClickSound}
    >
      <ExternalLinkIcon className="h-5 w-5 mr-2" />
      View Certificate
    </a>
  </div>
)}

                  
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

