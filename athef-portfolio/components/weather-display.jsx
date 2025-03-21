"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CloudIcon, SunIcon, CloudRainIcon, CloudSnowIcon, CloudLightningIcon, CloudFogIcon } from "lucide-react"

export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const latitude = 43.4643
        const longitude = -80.5204
        
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        )
        
        if (!response.ok) {
          throw new Error("Weather data not available")
        }
        
        const data = await response.json()
        setWeather(data)
        setLoading(false)
        
      } catch (err) {
        console.error("Weather fetch error:", err)
        setError("Couldn't fetch weather")
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (weatherCode) => {
    const code = weatherCode?.toString().charAt(0)

    switch (code) {
      case "2":
        return <CloudLightningIcon size={16} />
      case "3":
      case "5":
        return <CloudRainIcon size={16} />
      case "6":
        return <CloudSnowIcon size={16} />
      case "7":
        return <CloudFogIcon size={16} />
      case "8":
        if (weatherCode === 800) return <SunIcon size={16} />
        return <CloudIcon size={16} />
      default:
        return <CloudIcon size={16} />
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black/20 backdrop-blur-lg px-4 py-2 rounded-full flex items-center space-x-2 border border-white/10"
      >
        <CloudIcon size={16} className="animate-pulse" />
        <span className="text-sm font-medium">Loading...</span>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black/20 backdrop-blur-lg px-4 py-2 rounded-full flex items-center space-x-2 border border-white/10"
      >
        <CloudIcon size={16} />
        <span className="text-sm font-medium">Weather unavailable</span>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-black/20 backdrop-blur-lg px-4 py-2 rounded-full flex items-center space-x-2 border border-white/10"
    >
      {weather && (
        <>
          {getWeatherIcon(weather.weather[0].id)}
          <span className="text-sm font-medium">{Math.round(weather.main.temp)}°C</span>
        </>
      )}
    </motion.div>
  )
}
