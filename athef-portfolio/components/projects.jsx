"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLinkIcon, GithubIcon, XIcon, InfoIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import Image from "next/image"

export default function Projects({ mode }) {
  const { playHoverSound, playClickSound } = useSound()
  const [selectedProject, setSelectedProject] = useState(null)

  const techProjects = [
    {
      title: "StayLuxe",
      description: "A luxury hotel booking application allowing users to browse and book luxury hotel rooms online.",
      technologies: ["EJS", "Node.js", "MongoDB", "RESTful APIs", "Mapbox"],
      details: [
        "Built using EJS, Node.js, and MongoDB, with dynamic content rendering and efficient database management.",
        "Implemented RESTful APIs for handling booking data, user authentication, and hotel information.",
        "Integrated Mapbox for geocoding to provide location-based hotel searches and weather API for real-time weather updates at the destination.",
      ],
      video: "/videos/stayluxe.mp4", // Video in public folder
      poster: "/images/stayluxe-thumbnail.jpg", // Thumbnail image
      image: "/images/stayluxe-thumbnail.jpg",
      liveLink: "https://stayluxe.onrender.com/listings/",
      githubLink: "https://github.com/itsathefak/StayLuxe.git",
    },
    {
        title: "CIBC Website Clone",
        description:
          "A clone of the CIBC banking website with additional features like stock market simulation and loan calculator.",
        technologies: ["Vue.js", "Bootstrap", "Vue Router"],
        details: [
          "Developed a sleek and responsive UI using Vue.js and Bootstrap, ensuring a seamless experience across all devices.",
          "Integrated a real-time stock market investing simulation to allow users to practice trading and track investments.",
          "Built an interactive loan calculator to help users estimate monthly repayments based on customizable loan parameters.",
          "Implemented Vue Router for smooth navigation across pages, enhancing the user experience with dynamic content loading.",
        ],
        video: "/videos/CIBC.mp4",
        poster: "/images/cibc.jpg",
        image: "/images/cibc.jpg",
        liveLink: "https://cibccc.netlify.app/",
        githubLink: "https://github.com/itsathefak/CIBC-smart-cash-offer.git",
      },
      {
        title: "AppointMe",
        description: "An appointment booking system connecting users with service providers for streamlined scheduling.",
        technologies: ["MERN Stack", "JWT", "Axios", "Render", "Vercel"],
        details: [
          "Developed an appointment booking system connecting users with service providers for streamlined scheduling.",
          "Utilized the MERN stack (MongoDB, Express.js, React.js, Node.js) for backend and frontend management.",
          "Integrated JWT authentication for secure, role-based access control, and used Axios for smooth communication between frontend and backend.",
          "Deployed the backend on Render and frontend on Vercel, and followed the Agile Scrum methodology, managed with Jira, to ensure continuous iteration and timely delivery.",
        ],
        video: "/videos/appointme.mp4",
        poster: "/images/appointme-thumbnail.jpg",
        image: "/images/appointme-thumbnail.jpg",
        liveLink: "https://appointme-rust.vercel.app/",
        githubLink: "https://github.com/itsathefak/Capstone.git",
      },
    {
      title: "Coach Finder",
      description: "A platform where users can find coaches to help them pursue their courses and connect with them.",
      technologies: ["Vue.js", "Firebase", "Node.js", "Vuex", "Vue Router"],
      details: [
        "Developed a responsive web application using Vue.js for the frontend and Firebase for backend services.",
        "Implemented user authentication and authorization to allow users to register as coaches or students.",
        "Created a filtering system to help users find coaches based on their expertise and requirements.",
        "Used Vuex for state management and Vue Router for navigation between different sections of the application.",
      ],
      image: "/images/coach-finder.jpg",
      liveLink: "https://coach-finder-76372.web.app/coaches",
      githubLink: "https://github.com/itsathefak/Coach-Finder-VueJS.git",
    },
    {
      title: "Monster Slayer Game",
      description: "An interactive browser-based game built with Vue.js fundamentals where players battle monsters.",
      technologies: ["Vue.js", "JavaScript", "CSS", "HTML"],
      details: [
        "Created an engaging game interface with health bars, attack buttons, and battle log.",
        "Implemented game mechanics including special attacks, healing, and surrender options.",
        "Used Vue.js directives and methods to handle user interactions and game state.",
        "Applied CSS animations to enhance the visual experience during battles.",
      ],
      image: "/images/monster-slayer.jpg",
      liveLink: "#",
      githubLink: "https://github.com/itsathefak/Monster-Slayer-Game-VueJS.git",
    },
    {
      title: "Weather Widget",
      description:
        "A responsive weather widget that displays current weather conditions and forecasts for any location.",
      technologies: ["React", "Weather API", "CSS", "JavaScript"],
      details: [
        "Built a clean, intuitive weather widget using React components.",
        "Integrated with a weather API to fetch real-time weather data and forecasts.",
        "Implemented location search functionality to allow users to check weather in different cities.",
        "Created responsive design that works well on both desktop and mobile devices.",
      ],
      image: "/images/weather-widget.jpg",
      liveLink: "#",
      githubLink: "https://github.com/itsathefak/Weather-Widget-React.git",
    },
    {
      title: "Employee Management System",
      description:
        "A comprehensive MERN stack application for managing employee records with advanced search and filtering capabilities.",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "GraphQL", "Apollo"],
      details: [
        "Developed a full-featured Employee Management System with CRUD operations for employee records.",
        "Implemented GraphQL and Apollo Client for efficient data fetching and state management.",
        "Created advanced search functionality to filter employees by title, department, or type.",
        "Built employee creation form with validation for fields like age, title, and department.",
        "Added specialized views for employee details including retirement information.",
        "Implemented routing to navigate between Employee List, Create, and Details pages.",
        "Created filters for upcoming retirements (within six months) and by employee type.",
      ],
      image: "/images/ems.jpg",
      liveLink: "#",
      githubLink: "https://github.com/itsathefak/Employee-Management-System-EMS-.git",
    },
  ]

  const environmentalProjects = [
    {
      title: "EcoWander Canada",
      description: "A web application designed to promote sustainable travel options across Canada.",
      technologies: ["React", "Node.js", "MongoDB", "Mapbox", "Tailwind CSS"],
      details: [
        "Providing travelers with eco-friendly travel recommendations, including low-carbon transportation options.",
        "Featuring green accommodations and nature-based tourism opportunities throughout Canada.",
        "Offering ethical travel tips and sustainability guidelines for responsible tourism.",
        "Interactive maps showing sustainable destinations, carbon footprint calculations, and local conservation efforts.",
      ],
      image: "/images/ecowander.jpg",
      status: "Coming Soon",
      features: [
        "Interactive map of eco-friendly destinations",
        "Carbon footprint calculator for different travel methods",
        "Directory of green accommodations and sustainable tour operators",
        "Community forum for sharing sustainable travel experiences",
        "Seasonal guides for responsible outdoor activities",
      ],
    },
  ]

  const currentProjects = mode === "tech" ? techProjects : environmentalProjects

  const openProjectDetails = (project) => {
    playClickSound()
    setSelectedProject(project)
  }

  const closeProjectDetails = () => {
    playClickSound()
    setSelectedProject(null)
  }

  return (
<section id="projects" className="py-20 relative">
  <div className="container mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileInView={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 inline-block relative">
              {mode === "tech" ? "Technical Projects" : "Future Environmental Projects"}
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          {mode === "tech" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  onMouseEnter={playHoverSound}
                  onClick={() => openProjectDetails(project)}
                  className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all cursor-pointer h-full flex flex-col group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg?height=200&width=400"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    {project.status && (
                      <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        {project.status}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm text-gray-400 flex items-center">
                      <InfoIcon className="h-4 w-4 mr-1" />
                      View Details
                    </span>
                    {!project.status && (
                      <div className="flex space-x-2">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation()
                            playClickSound()
                          }}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation()
                            playClickSound()
                          }}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  onMouseEnter={playHoverSound}
                  onClick={() => openProjectDetails(project)}
                  className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all cursor-pointer h-full flex flex-col group max-w-lg"
                >
      <div className="relative h-48 w-full overflow-hidden">
  {project.video ? (
    <div className="relative w-full h-full">
      {/* Display the thumbnail image initially */}
      <Image
        src={project.poster}
        alt={`${project.title} thumbnail`}
        width={400}
        height={200}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 rounded-lg"
        style={{ opacity: 1 }} // Initially visible
      />

      {/* Video element */}
      <video
        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-500 rounded-lg"
        muted
        loop
        playsInline
        preload="metadata"
        onMouseEnter={(e) => {
          e.target.play()
          e.target.previousElementSibling.style.opacity = 0 // Hide thumbnail
        }}
        onMouseLeave={(e) => {
          e.target.pause()
          e.target.previousElementSibling.style.opacity = 1 // Restore thumbnail
        }}
      >
        <source src={project.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  ) : (
<div className="relative h-48 w-full overflow-hidden">
  <Image
    src={project.image || "/placeholder.svg?height=200&width=400"} // Match the Tech projects' placeholder
    alt={project.title}
    fill // Ensures image fills the container
    className="object-cover transition-transform group-hover:scale-105 duration-500 rounded-lg"
  />
</div>


  )}



                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm text-gray-400 flex items-center">
                      <InfoIcon className="h-4 w-4 mr-1" />
                      View Details
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProjectDetails}
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
  {selectedProject.video ? (
    <div className="relative w-full aspect-video">
      <video
        className="w-full h-full rounded-t-xl"
        controls
        poster={selectedProject.poster} // Show thumbnail before play
      >
        <source src={selectedProject.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  ) : (
    <div className="relative h-64 w-full overflow-hidden">
      <Image
        src={selectedProject.image || "/placeholder.svg?height=400&width=800"}
        alt={selectedProject.title}
        width={800}
        height={400}
        className="object-cover rounded-t-xl w-full h-full"
      />
    </div>
  )}



                <button
                  onClick={closeProjectDetails}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <XIcon className="h-5 w-5" />
                </button>
                {selectedProject.status && (
                  <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                    {selectedProject.status}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-gray-300 mb-6">{selectedProject.description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.details && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Project Details</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      {selectedProject.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.features && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Planned Features</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!selectedProject.status && (
                  <div className="flex justify-end space-x-4 mt-8">
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg"
                      onClick={playClickSound}
                    >
                      <GithubIcon className="h-5 w-5 mr-2" />
                      View Code
                    </a>
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-primary hover:bg-primary/80 transition-colors px-4 py-2 rounded-lg"
                      onClick={playClickSound}
                    >
                      <ExternalLinkIcon className="h-5 w-5 mr-2" />
                      Live Demo
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

