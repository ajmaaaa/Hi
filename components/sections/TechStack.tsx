'use client'

import { motion } from 'framer-motion'
import SkillPill from '@/components/ui/SkillPill'
import { fadeInUp } from '@/lib/animationVariants'

interface TechCardProps {
  title: string
  isCenter?: boolean
  skillLabel: string
}

function TechCard({ title, isCenter = false, skillLabel }: TechCardProps) {
  const cardW = isCenter ? 'w-80' : 'w-64'
  const cardH = isCenter ? 'h-[489px]' : 'h-96'
  const imgW = isCenter ? 'w-64 h-48' : 'w-52 h-32'
  const pillSize = isCenter ? 'md' : ('sm' as 'sm' | 'md')

  return (
    <motion.div
      className={`${cardW} ${cardH} ${isCenter ? '-mt-12' : ''} rounded-[10px] border border-black/10 bg-white flex flex-col items-center gap-5 pt-6 px-5 pb-6`}
      style={{ boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <h3 className="font-[family-name:var(--font-fredericka)] text-lg tracking-[3.2px] text-shadow-heading uppercase text-center">
        {title}
      </h3>

      <div className={`${imgW} bg-zinc-300 rounded-[10px] flex-shrink-0`} />

      <div className="grid grid-cols-3 gap-x-4 gap-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkillPill key={i} label={skillLabel} size={pillSize} />
        ))}
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <section
      id="techstack"
      className="min-h-screen flex flex-col items-center justify-center bg-white py-24"
    >
      <div className="max-w-[1440px] mx-auto w-full px-8 lg:px-16">
        <motion.h2
          className="font-[family-name:var(--font-fredericka)] text-4xl tracking-[8px] text-shadow-heading uppercase text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          TECH STACK
        </motion.h2>

        <motion.div
          className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-[84px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div variants={fadeInUp}>
            <TechCard title="DESIGN" skillLabel="CANVA" />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <TechCard title="AUTOMATION" isCenter skillLabel="N8N" />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <TechCard title="DESIGN" skillLabel="CANVA" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
