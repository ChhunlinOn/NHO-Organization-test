"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface Props {
  children: React.ReactNode
  duration?: number
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function FadeInWhenVisible({
  children,
  duration = 0.7,
  delay = 0,
  direction = "up",
}: Props) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const getInitialPosition = () => {
    switch (direction) {
      case "down":
        return { y: -30, opacity: 0, scale: 0.95 }
      case "left":
        return { x: 30, opacity: 0, scale: 0.95 }
      case "right":
        return { x: -30, opacity: 0, scale: 0.95 }
      default: // "up"
        return { y: 30, opacity: 0, scale: 0.95 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration, delay, ease: "easeOut" },
        },
        hidden: getInitialPosition(),
      }}
    >
      {children}
    </motion.div>
  )
}
