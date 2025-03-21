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
    description: "Full Stack Developer with a passion for tech and sustainability.",
    url: "https://www.athefak.com",
    siteName: "Athef Ayub Khan Portfolio",
    images: [
      {
        url: "https://www.athefak.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Preview of Athef Ayub Khan's portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athef Ayub Khan | Full Stack Developer",
    description: "Full Stack Developer with a passion for tech and sustainability.",
    images: ["https://www.athefak.com/preview.jpg"],
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
