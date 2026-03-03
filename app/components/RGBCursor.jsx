"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function RGBCursor() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { damping: 20, stiffness: 150 })
  const springY = useSpring(y, { damping: 20, stiffness: 150 })

  const [click, setClick] = useState(false)

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 20)
      y.set(e.clientY - 20)
    }

    const handleClick = () => {
      setClick(true)
      setTimeout(() => setClick(false), 200)
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", handleClick)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", handleClick)
    }
  }, [x, y])

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      animate={{
        scale: click ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="
        fixed w-10 h-10
        rounded-full
        pointer-events-none
        z-[9999]
        bg-gradient-to-r from-red-500 via-green-400 to-blue-500
        blur-md
        opacity-70
        mix-blend-screen
      "
    />
  )
}