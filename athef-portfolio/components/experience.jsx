"use client"

import { motion } from "framer-motion"
import { BriefcaseIcon, LeafIcon, CalendarIcon, MapPinIcon } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react"; 


export default function Experience({ mode }) {
  const { playHoverSound } = useSound()

  const techExperiences = [
    {
      title: "Software Developer",
      company: "Hafman Consulting Groups",
      period: "Feb 2025 - Present",
      location: "Toronto, ON, Canada",
      description: [
        "Develop and maintain full-stack web applications using Vue.js, and MERN Stack (MongoDB, Express.js, React.js, Node.js), ensuring high performance, scalability, and seamless user experiences.",
        "Customize and extend WordPress themes and plugins to meet client requirements.",
        "Collaborate with designers, backend developers, and stakeholders to implement scalable and responsive solutions.",
        "Develop and implement automated chatbots and AI agents, enhancing client interactions and overall functionality across projects.",
      ],
      icon: <BriefcaseIcon className="h-5 w-5" />,
    },
    {
      title: "Junior Software Developer",
      company: "Digillium Technologies",
      period: "July 2022 - Aug 2023",
      location: "Singapore (Remote)",
      description: [
        "Gained hands-on experience with front-end technologies such as HTML, CSS, JavaScript, Bootstrap, and React.",
        "Worked with back-end technologies, including Node.js, Express.js, and MongoDB, for API development and database management.",
        "Worked on an Employee Management System using the MERN stack, contributing to a real-world project and improving functionality.",
        "Enhanced design skills using Adobe XD and Figma, focusing on creating user-friendly and visually appealing interfaces.",
        "Contributed to team discussions, improving communication and collaboration within the development team.",
      ],
      icon: <BriefcaseIcon className="h-5 w-5" />,
    },
    {
      title: "Programmer Analyst Trainee",
      company: "Grandbiz IT Solutions",
      period: "Apr 2022 - Jul 2022",
      location: "Chennai, India",
      description: [
        "Developed responsive web pages using HTML, CSS, and JavaScript to create mobile-friendly designs.",
        "Worked with Bootstrap for front-end development, focusing on ensuring cross-device compatibility.",
        "Gained knowledge in Database Management Systems (DBMS) for managing and querying data effectively.",
        "Worked with senior developers to learn best practices, troubleshoot issues, and enhance coding efficiency.",
      ],
      icon: <BriefcaseIcon className="h-5 w-5" />,
    },
  ]

  const environmentalExperiences = [
    {
      title: "START Member - TRANSECTS Network",
      company: "University of Saskatchewan",
      period: "Sept 2024 - Present",
      location: "Saskatoon, Canada",
      description: [
        "Engage students and trainees in transdisciplinary learning focused on sustainability and environmental practices.",
        "Collaborate with professionals and academics to promote knowledge sharing and sustainability initiatives.",
        "Mentor emerging sustainability leaders and contribute to projects that promote environmental sustainability and social responsibility.",
      ],
      icon: <LeafIcon className="h-5 w-5" />,
      button: {
        text: "Click Me",
        url: "https://sens.usask.ca/transects/the-transects-network/meet-the-start.php#AthefAyubKhanSustainabilityPractitionerSoftwareDeveloperCanada-subsection-7",
      },
    },
  ]
  

  const currentExperiences = mode === "tech" ? techExperiences : environmentalExperiences

  return (
    <section id="experience" className="py-20 relative">
      {mode === "environmental" && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/images/topography.svg')] bg-repeat opacity-5" />
        </div>
      )}

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            whileInView={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 inline-block relative">
              {mode === "tech" ? "Professional Experience" : "Environmental Experience"}
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div className="space-y-12">
            {currentExperiences.map((exp, index) => (
             <motion.div
             key={`${exp.company}-${exp.title}`}
             initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: index * 0.1 }}
             viewport={{ once: true }}
             whileHover={{ scale: 1.02 }}
             onMouseEnter={playHoverSound}
             className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-colors"
           >
<div className="flex items-center gap-4 flex-wrap">
<div className="bg-primary/20 p-3 rounded-full">{exp.icon}</div>
               <div>
                 <h3 className="text-xl font-bold">{exp.title}</h3>
                 <p className="text-gray-300">{exp.company}</p>
               </div>
               <div className="md:ml-auto flex flex-col md:flex-row gap-2 md:gap-4 text-sm text-gray-400">
                 <div className="flex items-center">
                   <CalendarIcon className="h-4 w-4 mr-1" />
                   {exp.period}
                 </div>
                 <div className="flex items-center">
                   <MapPinIcon className="h-4 w-4 mr-1" />
                   {exp.location}
                 </div>
               </div>
             </div>
             <ul className="list-disc pl-5 space-y-2 text-gray-300">
               {exp.description.map((item, i) => (
                 <motion.li
                   key={i}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                   viewport={{ once: true }}
                 >
                   {item}
                 </motion.li>
               ))}
             </ul>
           
             {/* ✅ Insert Button Here */}
           {/* ✅ Updated Button Position & Size */}
{/* ✅ Move Button to Right & Add More Rounded Corners */}
{exp.button && (
  <div className="mt-4 flex justify-center">
    <Button
      asChild
      variant="outline"
      className="group flex items-center px-4 py-2 text-sm rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all"
      onMouseEnter={playHoverSound}
      onClick={() => playClickSound()}
    >
      <a
        href={exp.button.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <ExternalLinkIcon className="h-4 w-4 group-hover:animate-pulse" />
        {exp.button.text}
      </a>
    </Button>
  </div>
)}



           
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

