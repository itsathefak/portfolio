import { Suspense } from "react"
import InitialLoader from "@/components/initial-loader"
import MainLayout from "@/components/main-layout"
import FloatingLogos from "@/components/floating-logos"

export const metadata = {
  title: "Athef Ayub Khan | Full Stack Developer",
  description: "Portfolio of Athef Ayub Khan, Full Stack Developer with expertise in MERN stack and environmental sustainability",
  icons: {
    icon: "/favicon.png", // ✅ Make sure this matches the filename in /public
  },
}



export default function Home() {
  return (
    <Suspense fallback={<InitialLoader />}>
      <FloatingLogos />
      <MainLayout />
    </Suspense>
  )
}

