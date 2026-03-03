import Navbar from "./components/Navbar"
import HeroSection from "./components/Hero"
import Service  from "./components/Service"
import AboutSection  from "./components/About Section"
import ProjectsSection from "./components/ProjectsSection"
import TestimonialsSection  from "./components/TestimonialsSection"
import WhyChooseus from "./components/WhyChooseUs"
import Footer from "./components/Footer"
import  CTAbanner from "./components/CTAbanner"

export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    
    <AboutSection/>
    <Service/>
    <ProjectsSection/>
    <TestimonialsSection/>
    <WhyChooseus/>
    <CTAbanner/>
    <Footer/>
     
    </>
  )
}