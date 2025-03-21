"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLinkIcon, XIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import Image from "next/image"

export default function VolunteeringExperience() {
  const { playHoverSound, playClickSound } = useSound()
  const [selectedOrg, setSelectedOrg] = useState(null)

  const volunteering = [
    {
      organization: "Canadian Council of Invasive Species",
      link: "#",
      image: "/images/ccis.jpg",
      description:
        "Volunteered with the Canadian Council of Invasive Species to help raise awareness about invasive species and their impact on local ecosystems. Participated in community education programs and assisted with invasive species removal projects.",
      role: "Environmental Education Volunteer",
      period: "2023 - Present",
      achievements: [
        "Educated over 200 community members about invasive species identification and prevention",
        "Participated in 5 invasive species removal events across Ontario",
        "Contributed to the development of educational materials for schools",
      ],
    },
    {
      organization: "Youth Nature Keepers",
      link: "#",
      image: "/images/ynk.jpg",
      description:
        "Worked with Youth Nature Keepers to engage young people in environmental conservation activities. Helped organize nature walks, clean-up events, and educational workshops focused on biodiversity and ecosystem health.",
      role: "Youth Program Coordinator",
      period: "2022 - 2023",
      achievements: [
        "Coordinated monthly nature exploration activities for youth aged 10-16",
        "Developed a 'Junior Naturalist' program that was adopted by three local schools",
        "Mentored 15 youth leaders in environmental advocacy and project management",
      ],
    },
    {
      organization: "Canadian Service Corps",
      link: "#",
      image: "/images/csc.jpg",
      description:
        "Served with the Canadian Service Corps on environmental sustainability projects. Focused on community-based initiatives to reduce waste, promote renewable energy, and enhance green spaces in urban areas.",
      role: "Environmental Project Volunteer",
      period: "2023",
      achievements: [
        "Contributed to the development of a community garden that now serves 50+ families",
        "Helped implement a waste reduction program that decreased landfill waste by 30%",
        "Organized three community workshops on sustainable living practices",
      ],
    },
    {
      organization: "Climate Reality Project Canada",
      link: "#",
      image: "/images/crpc.jpg",
      description:
        "Volunteered with Climate Reality Project Canada to promote climate change awareness and advocate for policy changes. Participated in climate education campaigns and community outreach programs.",
      role: "Climate Advocate",
      period: "2022 - Present",
      achievements: [
        "Delivered climate science presentations to over 300 people across 5 communities",
        "Participated in policy development workshops with local government officials",
        "Contributed to social media campaigns reaching thousands of Canadians",
      ],
    },
  ]

  const openOrgDetails = (org) => {
    playClickSound()
    setSelectedOrg(org)
  }

  const closeOrgDetails = () => {
    playClickSound()
    setSelectedOrg(null)
  }

  return (
    <section id="volunteering-experience" className="py-20 relative">
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
              Volunteering Experience
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

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
                onClick={() => openOrgDetails(vol)}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors h-full cursor-pointer"
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
                  <div className="flex items-center text-primary hover:text-primary/80 transition-colors text-sm">
                    <ExternalLinkIcon className="h-4 w-4 mr-1" />
                    <span>View Details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedOrg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeOrgDetails}
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
                  src={selectedOrg.image || "/placeholder.svg?height=400&width=800"}
                  alt={selectedOrg.organization}
                  fill
                  className="object-cover rounded-t-xl"
                />
                <button
                  onClick={closeOrgDetails}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedOrg.organization}</h3>
                <p className="text-gray-400 mb-4">
                  {selectedOrg.role} | {selectedOrg.period}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">About</h4>
                  <p className="text-gray-300">{selectedOrg.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Key Achievements</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {selectedOrg.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <a
                    href={selectedOrg.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-primary hover:bg-primary/80 transition-colors px-4 py-2 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      playClickSound()
                    }}
                  >
                    <ExternalLinkIcon className="h-5 w-5 mr-2" />
                    Visit Organization
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

