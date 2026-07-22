import Navbar from '@/components/layout/Navbar'
import HeroPortfolio from '@/components/sections/HeroPortfolio'
import AboutMe from '@/components/sections/AboutMe'
import Portfolio from '@/components/sections/Portfolio'
import TechStack from '@/components/sections/TechStack'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'

// Force dynamic rendering — prevents static generation crash from client-only hooks
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroPortfolio />
      <AboutMe />
      <Portfolio />
      <TechStack />
      <Certifications />
      <Contact />
    </main>
  )
}
