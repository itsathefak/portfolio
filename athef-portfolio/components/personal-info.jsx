"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  YoutubeIcon,
  ClubIcon as FootballIcon,
  PlaneIcon,
  CodeIcon,
  MapPinIcon,
  MusicIcon,
  CameraIcon,
  GamepadIcon,
  CoffeeIcon,
  StarIcon,
  PizzaIcon,
} from "lucide-react";
import { useSound } from "@/components/sound-provider";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

export default function PersonalInfo({ mode }) {
  const { playHoverSound, playClickSound } = useSound();
  const kuwaitMapRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!kuwaitMapRef.current || mapLoaded) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error("🚨 Mapbox token is missing!");
      return;
    }

    mapboxgl.accessToken = token;

    const mapInstance = new mapboxgl.Map({
        container: kuwaitMapRef.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [47.9774, 29.3759], // Kuwait coordinates
        zoom: 7,
        interactive: true, // ✅ Enable interactions
      });
      
      // ✅ Add Navigation Controls (Zoom & Rotate)
      mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");
      

      mapInstance.on("load", () => {
        setMapLoaded(true);
      
        // ✅ Add a marker for Kuwait City
        new mapboxgl.Marker({ color: "#10b981" })
          .setLngLat([47.9774, 29.3759])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setText("Kuwait City - Born here")
          )
          .addTo(mapInstance);
      });
      

      return () => {
        if (mapInstance) {
          mapInstance.remove();
        }
      };
      
  }, []);

  const handleCardHover = (index) => {
    playHoverSound();
    setActiveCard(index);
  };

  return (
    <section
      id="personal-info"
      className="py-10 relative min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            whileInView={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 inline-block relative">
              Beyond The Code
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(100px,auto)]">
            {/* Vlogging - Large Featured Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(0)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-12 md:col-span-8 row-span-4 bg-gradient-to-br ${
                activeCard === 0
                  ? "from-red-500/30 to-red-600/30"
                  : "from-red-500/20 to-red-600/20"
              } backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all overflow-hidden`}
            >
              <div className="flex items-center mb-2">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <YoutubeIcon className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Vlogging</h3>
              </div>
              <p className="text-sm mb-2">
                I create travel and lifestyle vlogs to share my experiences
              </p>
              <div className="relative w-full h-[calc(100%-4rem)] rounded-md overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/tRM8PkUzypU?si=rS9xBTzj9d-wXWXN"
                  title="Vlog video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>

            {/* Born in Kuwait - Medium Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(1)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-12 md:col-span-4 row-span-3 bg-gradient-to-br ${
                activeCard === 1
                  ? "from-amber-500/30 to-amber-600/30"
                  : "from-amber-500/20 to-amber-600/20"
              } backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all overflow-hidden`}
            >
              <div className="flex items-center mb-2">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Born in Kuwait</h3>
              </div>
              <p className="text-sm mb-2">
                Proud of my roots in Kuwait before moving to Canada
              </p>
              <div
                ref={kuwaitMapRef}
                className="w-full h-[calc(100%-4rem)] rounded-md bg-gray-800"
              ></div>
            </motion.div>

            {/* Gaming - Medium Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(2)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-12 md:col-span-4 row-span-2 bg-gradient-to-br ${
                activeCard === 2
                  ? "from-indigo-500/30 to-indigo-600/30"
                  : "from-indigo-500/20 to-indigo-600/20"
              } backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all overflow-hidden`}
            >
              <div className="flex items-center mb-2">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <GamepadIcon className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Gaming Passion</h3>
              </div>
              <p className="text-sm mb-2">
                I love immersing myself in gaming worlds during my free time
              </p>
              <div className="relative w-full h-[calc(100%-4rem)] rounded-md overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/pFzyeQMroCY?si=QoZ5v5ltFEfLG6BJ"
                  title="Gaming video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>

            {/* Star Gazing - Medium Card with Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(3)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-12 md:col-span-4 row-span-2 bg-gradient-to-br ${
                activeCard === 3
                  ? "from-purple-500/30 to-purple-600/30"
                  : "from-purple-500/20 to-purple-600/20"
              } backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all overflow-hidden`}
            >
              <div className="flex items-center mb-2">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <StarIcon className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Star Gazing & Aurora Hunting</h3>
              </div>
              <p className="text-sm mb-2">
                I'm fascinated by the night sky and love chasing the northern
                lights
              </p>
              <div className="relative w-full h-44 p-2">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/aurora.jpeg"
                    alt="Aurora Borealis"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Football - Small Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(4)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-6 md:col-span-2 row-span-1 bg-gradient-to-br ${
                activeCard === 4
                  ? "from-green-500/30 to-green-600/30"
                  : "from-green-500/20 to-green-600/20"
              } backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all`}
            >
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <FootballIcon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm">Football Fan</h3>
              </div>
              <p className="text-xs mt-2">
                Football is more than a sport - it's a passion!
              </p>
            </motion.div>

            {/* Aviation - Small Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(5)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-6 md:col-span-2 row-span-1 bg-gradient-to-br ${
                activeCard === 5
                  ? "from-blue-500/30 to-blue-600/30"
                  : "from-blue-500/20 to-blue-600/20"
              } backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all`}
            >
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <PlaneIcon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm">Aviation Lover</h3>
              </div>
              <p className="text-xs mt-2">
                Fascinated by planes and often spend time plane spotting
              </p>
            </motion.div>

            {/* Music - Circular Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(6)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-3 md:col-span-1 row-span-1 bg-gradient-to-br ${
                activeCard === 6
                  ? "from-pink-500/30 to-pink-600/30"
                  : "from-pink-500/20 to-pink-600/20"
              } backdrop-blur-sm rounded-full p-0 border border-white/10 hover:border-primary/50 transition-all flex items-center justify-center aspect-square`}
            >
              <div className="text-center">
                <MusicIcon className="h-6 w-6 mx-auto mb-1" />
                <span className="text-xs">Music</span>
              </div>
            </motion.div>

            {/* Coffee - Circular Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(7)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-3 md:col-span-1 row-span-1 bg-gradient-to-br ${
                activeCard === 7
                  ? "from-yellow-500/30 to-yellow-600/30"
                  : "from-yellow-500/20 to-yellow-600/20"
              } backdrop-blur-sm rounded-full p-0 border border-white/10 hover:border-primary/50 transition-all flex items-center justify-center aspect-square`}
            >
              <div className="text-center">
                <CoffeeIcon className="h-6 w-6 mx-auto mb-1" />
                <span className="text-xs">Coffee</span>
              </div>
            </motion.div>

            {/* Coding - Small Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(8)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-6 md:col-span-2 row-span-1 bg-gradient-to-br ${
                activeCard === 8
                  ? "from-violet-500/30 to-violet-600/30"
                  : "from-violet-500/20 to-violet-600/20"
              } backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all`}
            >
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <CodeIcon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm">Coding Passion</h3>
              </div>
              <p className="text-xs mt-2">
                Coding isn't just my profession - it's my creative outlet
              </p>
            </motion.div>

            {/* Photography - Regular Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(9)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-6 md:col-span-2 row-span-1 bg-gradient-to-br ${
                activeCard === 9
                  ? "from-teal-500/30 to-teal-600/30"
                  : "from-teal-500/20 to-teal-600/20"
              } backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all`}
            >
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <CameraIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Photography</h3>
                  <p className="text-xs mt-2">
                I love Travelling to different Places and Capturing Amazing Shots
              </p>                </div>
              </div>
            </motion.div>

            {/* Food - Small Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleCardHover(10)}
              onMouseLeave={() => setActiveCard(null)}
              className={`col-span-6 md:col-span-2 row-span-1 bg-gradient-to-br ${
                activeCard === 10
                  ? "from-rose-500/30 to-rose-600/30"
                  : "from-rose-500/20 to-rose-600/20"
              } backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all`}
            >
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-full mr-3">
                  <PizzaIcon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm">Foodie</h3>
              </div>
              <p className="text-xs mt-2">
                I love exploring different cuisines and cooking new recipes
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
