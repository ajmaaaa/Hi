import Navbar from '@/components/layout/Navbar'
import HeroPortfolio from '@/components/sections/HeroPortfolio'
import AboutMe from '@/components/sections/AboutMe'
import TechStack from '@/components/sections/TechStack'
import Certifications from '@/components/sections/Certifications'

// Force dynamic rendering — prevents static generation crash from client-only hooks
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroPortfolio />
      <AboutMe />
      <TechStack />
      <Certifications />
    </main>
  )
}
