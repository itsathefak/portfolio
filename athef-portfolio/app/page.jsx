import { Suspense } from "react"
import InitialLoader from "@/components/initial-loader"
import MainLayout from "@/components/main-layout"
import FloatingLogos from "@/components/floating-logos"

export const metadata = {
  title: "Athef Ayub Khan | Full Stack Developer",
  description: "Portfolio of Athef Ayub Khan, Full Stack Developer with expertise in MERN stack and environmental sustainability",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Athef Ayub Khan | Full Stack Developer",
    description: "Portfolio of Athef Ayub Khan – building AI Agents, MERN apps, and sustainable tech.",
    url: "https://www.athefak.com",
    siteName: "Athef Ayub Khan Portfolio",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Preview of Athef Ayub Khan Portfolio Website",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athef Ayub Khan | Full Stack Developer",
    description: "Building powerful full-stack apps with MERN and a passion for sustainability.",
    images: ["/preview.jpg"],
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
