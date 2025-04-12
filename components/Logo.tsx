'use client'

import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-full p-2 shadow-lg shadow-blue-500/30"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src="/logo.png"
          alt="PackPal Logo"
          className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
      <div className="text-xl sm:text-2xl md:text-3xl font-bold">
        <motion.span
          className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-400"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Pack
        </motion.span>
        <motion.span
          className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Pal
        </motion.span>
      </div>
    </motion.div>
  )
}