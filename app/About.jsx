"use client"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="section-padding max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <motion.img
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        src="/img2.jpg"
        className="rounded-xl"
      />

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-[var(--primary)]">
          About Us
        </h2>
        <p className="text-gray-400">
          We deliver world-class construction services with unmatched precision and architectural brilliance.
        </p>
      </motion.div>
    </section>
  )
}