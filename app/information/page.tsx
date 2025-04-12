'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plane, Train, Ship, Truck, ArrowRight, ArrowLeft, Info, Clock, Leaf, DollarSign, ChevronRight } from 'lucide-react'
import TransportModeCard from '../../components/TransportModeCard'
import Logo from '../../components/Logo'
import { useState } from 'react'

interface TransportMode {
  icon: any;
  name: string;
  description: string;
  details: string;
  model: string;
  color: string;
  estimatedTime: string;
  costEfficiency: string;
  sustainability: string;
}

const transportModes: TransportMode[] = [
  { 
    icon: Plane, 
    name: 'Air Transport', 
    description: 'Lightning-fast international shipping',
    details: 'Our air freight services offer the quickest transit times for urgent shipments. We partner with major airlines to ensure global coverage and reliable schedules.',
    model: '/assets/3d/duck.glb',
    color: 'from-sky-100 to-sky-200',
    estimatedTime: 'Fast (1-3 days for international)',
    costEfficiency: 'High cost, premium service',
    sustainability: 'Higher carbon footprint'
  },
  { 
    icon: Train, 
    name: 'Rail Transport', 
    description: 'Eco-friendly continental shipping',
    details: 'Rail transport is perfect for heavy or bulky items. It\'s a cost-effective and environmentally friendly option for continental shipments with reduced carbon emissions compared to road transport.',
    model: '/assets/3d/duck.glb',
    color: 'from-cyan-100 to-cyan-200',
    estimatedTime: 'Medium (3-7 days depending on distance)',
    costEfficiency: 'Cost-effective for bulk shipments',
    sustainability: 'Low carbon footprint, energy efficient'
  },
  { 
    icon: Ship, 
    name: 'Sea Transport', 
    description: 'Cost-effective bulk shipping',
    details: 'Sea freight is the most economical option for large volume international shipments. We offer both FCL (Full Container Load) and LCL (Less than Container Load) services with global port connections.',
    model: '/assets/3d/duck.glb',
    color: 'from-blue-100 to-blue-200',
    estimatedTime: 'Slow (10-45 days for international)',
    costEfficiency: 'Most economical for large shipments',
    sustainability: 'Low emissions per ton-mile'
  },
  { 
    icon: Truck, 
    name: 'Road Transport', 
    description: 'Flexible door-to-door delivery',
    details: 'Our road freight services offer door-to-door delivery with flexible scheduling. It\'s ideal for local and regional shipments with multiple stops and last-mile delivery requirements.',
    model: '/assets/3d/duck.glb',
    color: 'from-indigo-100 to-indigo-200',
    estimatedTime: 'Variable (hours to days based on distance)',
    costEfficiency: 'Affordable for short to medium distances',
    sustainability: 'Moderate emissions, increasingly electric options'
  },
];

const InformationPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<number | null>(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-200 text-blue-900 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-100/30 via-blue-100/20 to-transparent animate-pulse"
      />

      <header className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 sm:py-6 px-4 sm:px-6 flex justify-between items-center z-10 shadow-md">
        <motion.div
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/" className="text-white hover:text-sky-200 transition-colors flex items-center">
            <ArrowLeft className="h-6 w-6" />
            <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">Back</span>
          </Link>
        </motion.div>
        <motion.h1 
          className="text-xl sm:text-2xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Transport Solutions
        </motion.h1>
        <motion.div 
          className="scale-75 sm:scale-100"
          whileHover={{ 
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
        >
          <Logo />
        </motion.div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg border border-white/20"
          whileHover={{ 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Choose Your Perfect Transport Solution</h2>
          <p className="text-blue-900 mb-6">
            We offer a comprehensive range of transport options to meet your shipping needs. Each mode of transport has its unique advantages in terms of speed, cost, and environmental impact. Compare the options below to find the perfect solution for your cargo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-2">
            {[
              { icon: Clock, title: "Transit Time", desc: "Compare estimated delivery times", color: "bg-sky-100/60" },
              { icon: Leaf, title: "Sustainability", desc: "Choose eco-friendly options", color: "bg-cyan-100/60" },
              { icon: DollarSign, title: "Cost Efficiency", desc: "Find budget-friendly solutions", color: "bg-blue-100/60" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className={`flex flex-col items-center p-3 rounded-lg ${item.color} backdrop-blur-sm border border-white/20 relative overflow-hidden`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-blue-500/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  whileHover={{ 
                    y: [-3, 3, -3],
                    transition: { duration: 1.5, repeat: Infinity }
                  }}
                >
                  <item.icon className="h-8 w-8 text-blue-600 mb-2" />
                </motion.div>
                <h3 className="font-medium text-blue-800">{item.title}</h3>
                <p className="text-sm text-blue-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {transportModes.map((mode, index) => (
            <motion.div
              key={mode.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="w-full"
            >
              <div className={`bg-gradient-to-br ${mode.color} rounded-xl shadow-lg overflow-hidden transition-all duration-300 backdrop-blur-sm border border-white/20 relative`}>
                {/* Hover overlay effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-700/20 opacity-0 transition-opacity duration-300"
                  animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                />
                
                <div className="p-5 relative">
                  <div className="flex items-start mb-4">
                    <motion.div 
                      className="p-2 rounded-full bg-white/50"
                      whileHover={{
                        y: [-3, 3, -3],
                        rotate: mode.name === 'Air Transport' ? [-10, 10, -10] : 
                                mode.name === 'Sea Transport' ? [-5, 5, -5] : 
                                mode.name === 'Road Transport' ? [-2, 2, -2] : 0,
                        scale: 1.1,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      }}
                    >
                      <mode.icon className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <div className="ml-3">
                      <motion.h3 
                        className="font-bold text-xl text-blue-900"
                        animate={{ 
                          scale: hoveredCard === index ? 1.05 : 1,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {mode.name}
                      </motion.h3>
                      <p className="text-blue-800 font-medium">{mode.description}</p>
                    </div>
                  </div>
                  
                  <p className="text-blue-800 mb-4">{mode.details}</p>
                  
                  <div className="space-y-2 text-sm">
                    {[
                      { icon: Clock, label: "Time", value: mode.estimatedTime },
                      { icon: DollarSign, label: "Cost", value: mode.costEfficiency },
                      { icon: Leaf, label: "Sustainability", value: mode.sustainability }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        className="flex items-center group"
                        whileHover={{ 
                          x: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <item.icon className="h-4 w-4 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
                        <span className="text-blue-800 group-hover:font-semibold transition-all">
                          <strong>{item.label}:</strong> {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Link href={`/transport/${mode.name.toLowerCase().replace(' ', '-')}`}>
                      <motion.button 
                        className="text-blue-700 hover:text-indigo-900 font-medium flex items-center text-sm relative overflow-hidden group"
                        whileHover={{ 
                          x: 5,
                          transition: { duration: 0.2 }
                        }}
                        onHoverStart={() => setHoveredInfo(index)}
                        onHoverEnd={() => setHoveredInfo(null)}
                      >
                        <span>Learn more</span>
                        <motion.div
                          className="ml-1 relative"
                          animate={{ 
                            x: hoveredInfo === index ? [0, 5, 0] : 0,
                            transition: { duration: 1, repeat: hoveredInfo === index ? Infinity : 0 }
                          }}
                        >
                          <ChevronRight className="h-4 w-4 group-hover:text-indigo-600" />
                        </motion.div>
                        <motion.div 
                          className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-500"
                          animate={{ 
                            width: hoveredInfo === index ? "100%" : "0%",
                            transition: { duration: 0.3 }
                          }}
                        />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-10 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/options" 
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
              rounded-full font-semibold text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 
              shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-sm sm:text-base group relative overflow-hidden"
          >
            <span className="relative z-10">Continue to Selection</span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
        </motion.div>
        
        <motion.div 
          className="mt-8 bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto shadow-lg border border-white/20"
          whileHover={{ 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          <h3 className="text-xl font-bold text-blue-800 mb-3">Custom Transport Solutions</h3>
          <p className="text-blue-900 mb-4">
            Can't decide which option is best for your shipment? Our logistics experts can design a custom multimodal transport solution 
            that combines different transport methods for optimal efficiency, cost-effectiveness, and environmental impact.
          </p>
          <motion.div 
            className="bg-sky-100/60 p-4 rounded-lg border border-white/20 relative overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-sky-200/40 to-indigo-200/40"
              initial={{ x: "-100%" }}
              whileHover={{ 
                x: "100%",
                transition: { duration: 1.5, repeat: Infinity }
              }}
            />
            <p className="text-blue-800 font-medium relative z-10">
              Contact our team at <motion.span 
                className="text-indigo-700 inline-block"
                whileHover={{ 
                  scale: 1.05,
                  color: "#4338ca", // indigo-800
                  transition: { duration: 0.3 }
                }}
              >transport@company.com</motion.span> for a personalized consultation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default InformationPage