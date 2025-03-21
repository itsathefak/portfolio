"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Certificates from "@/components/certificates";
import VolunteeringExperience from "@/components/volunteering-experience";
import EventsAcrossCanada from "@/components/events-across-canada";
import PersonalInfo from "@/components/personal-info";
import Contact from "@/components/contact";
import ModeToggle from "@/components/mode-toggle";
import SideNav from "@/components/side-nav";
import SoundProvider from "@/components/sound-provider";
import MouseFollower from "@/components/mouse-follower";
import CurrentTime from "@/components/current-time";
import WeatherDisplay from "@/components/weather-display";
import InitialLoader from "@/components/initial-loader";
import Footer from "@/components/footer";
import InteractivePuzzle from "@/components/interactive-puzzle";

export default function MainLayout() {
  const [mode, setMode] = useState("tech");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "environmental") {
      root.classList.add("environmental-mode");
    } else {
      root.classList.remove("environmental-mode");
    }
  }, [mode]);

  if (loading) {
    return <InitialLoader />;
  }

  return (
    <SoundProvider>
      <MouseFollower mode={mode} />
      <div className="min-h-screen">
        {/* Mode Toggle */}
        <div className="fixed top-4 right-4 z-40">
          <ModeToggle mode={mode} setMode={setMode} />
        </div>

        {/* Time & Weather (Weather moved below time & aligned left) */}
        <div className="fixed top-4 left-4 z-40 flex flex-col items-start space-y-2">
          <CurrentTime />
          <WeatherDisplay />
        </div>

        {/* Side Navigation */}
        <SideNav mode={mode} />

        <AnimatePresence mode="wait">
          <motion.main
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            {/* Hero Section */}
            <Hero mode={mode} />

            <div
              className={
                mode === "environmental" ? "environmental-background" : ""
              }
            >
              <div className="container mx-auto px-4 py-8 relative z-10">
                <About mode={mode} />
                <Skills mode={mode} />
                <Experience mode={mode} />
                {mode === "environmental" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 items-start">
                    <div className="w-full">
                      <Projects mode={mode} />
                    </div>
                    <div className="w-full">
                      <Certificates mode={mode} />
                    </div>
                  </div>
                ) : (
                  <>
                    <Projects mode={mode} />
                    <Certificates mode={mode} />
                  </>
                )}

                {mode === "environmental" && (
                  <>
                    <VolunteeringExperience />
                    <EventsAcrossCanada />
                  </>
                )}
                <PersonalInfo mode={mode} />
                <InteractivePuzzle mode={mode} />
                <Contact mode={mode} />
                <Footer mode={mode} />
              </div>
            </div>
          </motion.main>
        </AnimatePresence>
      </div>
    </SoundProvider>
  );
}
