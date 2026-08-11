import Navbar from '@/components/layout/Navbar'
import HeroPortfolio from '@/components/sections/HeroPortfolio'
import AboutMe from '@/components/sections/AboutMe'
import Portfolio from '@/components/sections/Portfolio'
import TechStack from '@/components/sections/TechStack'
// import Certifications from '@/components/sections/Certifications' // TODO: aktifkan kembali saat section ini siap digunakan
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroPortfolio />
      <AboutMe />
      <Portfolio />
      <TechStack />
      {/* <Certifications /> */}
      <Contact />
    </main>
  )
}
