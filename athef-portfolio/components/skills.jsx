"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useSound } from "@/components/sound-provider"

export default function Skills({ mode }) {
  const { playHoverSound } = useSound()
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio("/sounds/pop.mp3")
    audioRef.current.load()

    return () => {
      audioRef.current = null
    }
  }, [])

  const playPopSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const techSkills = [
    {
      name: "React",
      icon: "/logos/react.svg",
      level: 90,
    },
    {
      name: "Vue.js",
      icon: "/logos/vue.svg",
      level: 85,
    },
    {
      name: "Node.js",
      icon: "/logos/nodejs.svg",
      level: 85,
    },
    {
      name: "MongoDB",
      icon: "/logos/mongodb.svg",
      level: 80,
    },
    {
      name: "Express",
      icon: "/logos/express.svg",
      level: 85,
    },
    {
      name: "JavaScript",
      icon: "/logos/javascript.svg",
      level: 95,
    },
    {
      name: "HTML5",
      icon: "/logos/html5.svg",
      level: 95,
    },
    {
      name: "CSS3",
      icon: "/logos/css3.svg",
      level: 90,
    },
    {
      name: "Tailwind",
      icon: "/logos/tailwind.svg",
      level: 90,
    },
    {
      name: "Firebase",
      icon: "/logos/firebase.svg",
      level: 75,
    },
    {
      name: "AWS",
      icon: "/logos/aws.svg",
      level: 70,
    },
    {
      name: "Git",
      icon: "/logos/git.svg",
      level: 85,
    },
  ]

  const environmentalSkills = [
    {
      name: "Sustainability Practices",
      icon: "/icons/sustainability.svg",
      level: 85,
    },
    {
      name: "Environmental Impact Assessment",
      icon: "/icons/assessment.svg",
      level: 75,
    },
    {
      name: "Climate Change Mitigation",
      icon: "/icons/climate.svg",
      level: 80,
    },
    {
      name: "Sustainable Development",
      icon: "/icons/development.svg",
      level: 85,
    },
    {
      name: "Environmental Education",
      icon: "/icons/education.svg",
      level: 90,
    },
    {
      name: "Conservation Strategies",
      icon: "/icons/conservation.svg",
      level: 75,
    },
    {
      name: "Ecological Monitoring",
      icon: "/icons/monitoring.svg",
      level: 70,
    },
    {
      name: "Biodiversity Management",
      icon: "/icons/biodiversity.svg",
      level: 75,
    },
  ]

  const currentSkills = mode === "tech" ? techSkills : environmentalSkills

  return (
<section id="skills" className="py-20 relative">
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
              {mode === "tech" ? "Technical Skills" : "Environmental Skills"}
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => {
                  playHoverSound()
                  playPopSound()
                }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-primary/50 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 mr-3">
                    <img
                      src={skill.icon || `/placeholder.svg?height=40&width=40&text=${skill.name}`}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <motion.div
                    className={`h-2.5 rounded-full ${
                      mode === "tech"
                        ? "bg-gradient-to-r from-blue-400 to-blue-600"
                        : "bg-gradient-to-r from-green-400 to-green-600"
                    }`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className="mt-2 text-right text-xs text-gray-400">{skill.level}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

