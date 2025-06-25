"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface Props {
  children: React.ReactNode
}

export default function FadeInWhenVisible({ children }: Props) {
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

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        hidden: { opacity: 0, y: 40 },
      }}
    >
      {children}
    </motion.div>
  )
}
