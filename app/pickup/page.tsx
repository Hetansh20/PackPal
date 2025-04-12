'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Train, Ship, Truck, ArrowLeft } from 'lucide-react'
import PickupForm from '../../components/PickupForm'
import Logo from '../../components/Logo'
import Link from 'next/link'

export default function PickupPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)

  const transportModes = [
    { icon: Plane, name: 'Air', color: 'from-blue-100 to-blue-200' },
    { icon: Train, name: 'Train', color: 'from-purple-100 to-purple-200' },
    { icon: Ship, name: 'Ship', color: 'from-indigo-100 to-indigo-200' },
    { icon: Truck, name: 'Road', color: 'from-pink-100 to-pink-200' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50 text-blue-900">
      <header className="bg-blue-100 text-blue-900 py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center">
        <Link href="/options" className="text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold">Schedule a Pickup</h1>
        <div className="scale-90 sm:scale-100">
          <Logo />
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <div className="bg-gray-100/90 backdrop-blur-sm rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800">Select Transport Mode</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {transportModes.map((mode) => (
              <motion.button
                key={mode.name}
                onClick={() => setSelectedMode(mode.name)}
                className={`p-3 sm:p-4 rounded-lg flex flex-col items-center ${
                  selectedMode === mode.name 
                    ? `bg-gradient-to-br ${mode.color} shadow-md` 
                    : 'bg-gray-200/70 hover:bg-gray-300/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <mode.icon 
                  className={`h-6 w-6 sm:h-8 sm:w-8 ${
                    selectedMode === mode.name ? 'text-blue-600' : 'text-blue-500'
                  } mb-1 sm:mb-2`} 
                />
                <span className={`text-sm sm:text-base ${
                  selectedMode === mode.name ? 'text-blue-800' : 'text-blue-700'
                }`}>
                  {mode.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <PickupForm selectedMode={selectedMode} />
        </div>
      </main>
    </div>
  )
}