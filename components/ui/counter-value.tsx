"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface CounterValueProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CounterValue({ value, duration = 2, prefix = "", suffix = "", className = "" }: CounterValueProps) {
  const [isClient, setIsClient] = useState(false)

  // Use this to ensure we only animate on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Create a spring animation for the number
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  })

  // Transform the spring value to the target value
  const displayValue = useTransform(springValue, (latest) => {
    return Math.floor(latest)
  })

  // Update the spring value when the target value changes
  useEffect(() => {
    springValue.set(value)
  }, [springValue, value])

  if (!isClient) {
    // Server-side or initial render
    return (
      <span className={className}>
        {prefix}
        {value}
        {suffix}
      </span>
    )
  }

  return (
    <span className={className}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  )
}
