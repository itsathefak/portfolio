"use client"

import { motion } from "framer-motion"
import { useSound } from "@/components/sound-provider"

export default function About({ mode }) {
  const { playHoverSound } = useSound()

  return (
    <section id="about" className="py-20 relative">
      {mode === "environmental" && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/images/leaves-pattern.png')] bg-repeat opacity-5" />
        </div>
      )}

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <motion.div whileInView={{ scale: [0.9, 1.1, 1] }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-8 inline-block relative">
              About Me
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="prose prose-lg dark:prose-invert mx-auto"
            onMouseEnter={playHoverSound}
          >
            {mode === "tech" ? (
              <p className="text-gray-300">
                I'm a motivated and detail-oriented Full Stack Software Developer with expertise in MERN stack
                development. With experience at companies like Hafman Consulting Groups and Digillium Technologies, I've
                developed and maintained full-stack web applications using Vue.js, React.js, Node.js, and MongoDB. I'm
                passionate about creating impactful, user-focused applications that deliver seamless experiences and
                solve real-world problems through innovative technology solutions.
              </p>
            ) : (
              <p className="text-gray-200">
                Beyond my technical skills, I'm deeply passionate about environmental sustainability. As a START Member
                of the TRANSECTS Network at the University of Saskatchewan, I engage students in transdisciplinary
                learning focused on sustainability practices. I collaborate with professionals and academics to promote
                knowledge sharing and sustainability initiatives, while mentoring emerging sustainability leaders and
                contributing to projects that promote environmental responsibility and create a more sustainable future
                for our planet.
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

