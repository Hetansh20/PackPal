"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plane,
  Train,
  Ship,
  Truck,
  ArrowRight,
  ArrowLeft,
  Info,
  Clock,
  Leaf,
  DollarSign,
  ChevronRight,
  Calendar,
  MapPin,
  BarChart,
  Search,
} from "lucide-react";
import TransportModeCard from "../../components/TransportModeCard";
import Logo from "../../components/Logo";
import { useState } from "react";

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
    name: "Air Transport",
    description: "Lightning-fast international shipping",
    details:
      "Our air freight services offer the quickest transit times for urgent shipments. We partner with major airlines to ensure global coverage and reliable schedules.",
    model: "/assets/3d/duck.glb",
    color: "from-sky-100 to-sky-200",
    estimatedTime: "Fast (1-3 days for international)",
    costEfficiency: "High cost, premium service",
    sustainability: "Higher carbon footprint",
  },
  {
    icon: Train,
    name: "Rail Transport",
    description: "Eco-friendly continental shipping",
    details:
      "Rail transport is perfect for heavy or bulky items. It's a cost-effective and environmentally friendly option for continental shipments with reduced carbon emissions compared to road transport.",
    model: "/assets/3d/duck.glb",
    color: "from-cyan-100 to-cyan-200",
    estimatedTime: "Medium (3-7 days depending on distance)",
    costEfficiency: "Cost-effective for bulk shipments",
    sustainability: "Low carbon footprint, energy efficient",
  },
  {
    icon: Truck,
    name: "Road Transport",
    description: "Flexible door-to-door delivery",
    details:
      "Our road freight services offer door-to-door delivery with flexible scheduling. It's ideal for local and regional shipments with multiple stops and last-mile delivery requirements.",
    model: "/assets/3d/duck.glb",
    color: "from-indigo-100 to-indigo-200",
    estimatedTime: "Variable (hours to days based on distance)",
    costEfficiency: "Affordable for short to medium distances",
    sustainability: "Moderate emissions, increasingly electric options",
  },
];

// Added statistics for the stats section
const transportStats = [
  { value: "15,000+", label: "Shipments Monthly" },
  { value: "98%", label: "On-time Delivery" },
  { value: "120+", label: "Countries Served" },
  { value: "4.8/5", label: "Customer Rating" },
];

// Added testimonials
const testimonials = [
  {
    text: "The flexibility of your logistics solutions has transformed our supply chain efficiency.",
    author: "Maria Garcia, Supply Chain Director",
    company: "TechGlobal Industries",
  },
  {
    text: "Eco-friendly shipping options helped us reduce our carbon footprint by 35% this year.",
    author: "James Wilson, Sustainability Manager",
    company: "GreenLife Products",
  },
];

// Added upcoming service features
const upcomingFeatures = [
  {
    title: "Real-time Tracking",
    description: "Enhanced GPS tracking with minute-by-minute updates and predictive delivery estimates.",
    icon: MapPin,
  },
  {
    title: "Carbon Calculator",
    description: "Measure the environmental impact of your shipments and explore greener alternatives.",
    icon: Leaf,
  },
  {
    title: "Scheduled Deliveries",
    description: "Set up recurring shipments with our automated scheduling system.",
    icon: Calendar,
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

      <header className="relative bg-gradient-to-r from-white-500 to-white-500 text-white py-4 sm:py-6 px-4 sm:px-6 flex justify-between items-center z-10 shadow-md">
        <motion.div
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href="/"
            className="text-white hover:text-sky-200 transition-colors flex items-center"
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Back
            </span>
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
            transition: { duration: 0.5 },
          }}
        >
          <Logo />
        </motion.div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg border border-white/20"
          whileHover={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            y: -5,
            transition: { duration: 0.3 },
          }}
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Choose Your Perfect Transport Solution
          </h2>
          <p className="text-blue-900 mb-6">
            We offer a comprehensive range of transport options to meet your
            shipping needs. Each mode of transport has its unique advantages in
            terms of speed, cost, and environmental impact. Compare the options
            below to find the perfect solution for your cargo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-2">
            {[
              {
                icon: Clock,
                title: "Transit Time",
                desc: "Compare estimated delivery times",
                color: "bg-sky-100/60",
              },
              {
                icon: Leaf,
                title: "Sustainability",
                desc: "Choose eco-friendly options",
                color: "bg-cyan-100/60",
              },
              {
                icon: DollarSign,
                title: "Cost Efficiency",
                desc: "Find budget-friendly solutions",
                color: "bg-blue-100/60",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`flex flex-col items-center p-3 rounded-lg ${item.color} backdrop-blur-sm border border-white/20 relative overflow-hidden`}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 },
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
                    transition: { duration: 1.5, repeat: Infinity },
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

        {/* Filter tabs - preserved from original but added as non-functional display */}
        <div className="max-w-4xl mx-auto mb-6 flex flex-wrap">
          <div className="bg-blue-600 text-white rounded-full py-2 px-6 mr-3 mb-3">
            All Options
          </div>
          <div className="bg-blue-100 text-blue-800 rounded-full py-2 px-6 mr-3 mb-3 hover:bg-blue-200 transition-colors">
            Fast Delivery
          </div>
          <div className="bg-blue-100 text-blue-800 rounded-full py-2 px-6 mr-3 mb-3 hover:bg-blue-200 transition-colors">
            Eco-Friendly
          </div>
          <div className="bg-blue-100 text-blue-800 rounded-full py-2 px-6 mb-3 hover:bg-blue-200 transition-colors">
            Cost-Effective
          </div>
        </div>

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
                transition: { duration: 0.3 },
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="w-full"
            >
              <div
                className={`bg-gradient-to-br ${mode.color} rounded-xl shadow-lg overflow-hidden transition-all duration-300 backdrop-blur-sm border border-white/20 relative`}
              >
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
                        rotate:
                          mode.name === "Air Transport"
                            ? [-10, 10, -10]
                            : mode.name === "Sea Transport"
                            ? [-5, 5, -5]
                            : mode.name === "Road Transport"
                            ? [-2, 2, -2]
                            : 0,
                        scale: 1.1,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <mode.icon className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <div className="ml-3">
                      <motion.h3
                        className="font-bold text-xl text-blue-900"
                        animate={{
                          scale: hoveredCard === index ? 1.05 : 1,
                          transition: { duration: 0.3 },
                        }}
                      >
                        {mode.name}
                      </motion.h3>
                      <p className="text-blue-800 font-medium">
                        {mode.description}
                      </p>
                    </div>
                  </div>

                  <p className="text-blue-800 mb-4">{mode.details}</p>

                  <div className="space-y-2 text-sm">
                    {[
                      { icon: Clock, label: "Time", value: mode.estimatedTime },
                      {
                        icon: DollarSign,
                        label: "Cost",
                        value: mode.costEfficiency,
                      },
                      {
                        icon: Leaf,
                        label: "Sustainability",
                        value: mode.sustainability,
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center group"
                        whileHover={{
                          x: 5,
                          transition: { duration: 0.2 },
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
                    <Link
                      href={`/transport/${mode.name
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <motion.button
                        className="text-blue-700 hover:text-indigo-900 font-medium flex items-center text-sm relative overflow-hidden group"
                        whileHover={{
                          x: 5,
                          transition: { duration: 0.2 },
                        }}
                        onHoverStart={() => setHoveredInfo(index)}
                        onHoverEnd={() => setHoveredInfo(null)}
                      >
                        <motion.div
                          className="ml-1 relative"
                          animate={{
                            x: hoveredInfo === index ? [0, 5, 0] : 0,
                            transition: {
                              duration: 1,
                              repeat: hoveredInfo === index ? Infinity : 0,
                            },
                          }}
                        ></motion.div>
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-500"
                          animate={{
                            width: hoveredInfo === index ? "100%" : "0%",
                            transition: { duration: 0.3 },
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

        {/* NEW SECTION: Statistics */}
        <motion.div
          className="max-w-4xl mx-auto mt-12 bg-white/30 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-blue-800 mb-6 text-center">Our Transport Network at a Glance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {transportStats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-sky-100 to-blue-100 shadow-md"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                  }}
                >
                  <h4 className="text-2xl md:text-3xl font-bold text-blue-600">{stat.value}</h4>
                </motion.div>
                <p className="text-blue-800 text-sm mt-2 text-center">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NEW SECTION: Testimonials */}
        <motion.div
          className="max-w-4xl mx-auto mt-10 bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-blue-800 mb-4">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50/80 to-sky-50/80 p-5 rounded-lg shadow relative"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
              >
                <div className="absolute top-3 left-3 text-4xl text-blue-300 opacity-30">"</div>
                <p className="text-blue-800 mb-4 relative z-10">{testimonial.text}</p>
                <div className="mt-2">
                  <p className="font-medium text-blue-900">{testimonial.author}</p>
                  <p className="text-sm text-blue-700">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NEW SECTION: Upcoming Features */}
        <motion.div
          className="max-w-4xl mx-auto mt-10 bg-gradient-to-r from-sky-100 to-blue-100 rounded-lg p-6 shadow-lg border border-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-blue-800 mb-4">Coming Soon to Our Platform</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/50 p-4 rounded-lg border border-white/50"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="ml-3 font-semibold text-blue-800">{feature.title}</h4>
                </div>
                <p className="text-sm text-blue-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
            <motion.div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>

        <motion.div
          className="mt-8 bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto shadow-lg border border-white/20"
          whileHover={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            y: -5,
            transition: { duration: 0.3 },
          }}
        >
          <h3 className="text-xl font-bold text-blue-800 mb-3">
            Custom Transport Solutions
          </h3>
          <p className="text-blue-900 mb-4">
            Can't decide which option is best for your shipment? Our logistics
            experts can design a custom multimodal transport solution that
            combines different transport methods for optimal efficiency,
            cost-effectiveness, and environmental impact.
          </p>
          <motion.div
            className="bg-sky-100/60 p-4 rounded-lg border border-white/20 relative overflow-hidden"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-sky-200/40 to-indigo-200/40"
              initial={{ x: "-100%" }}
              whileHover={{
                x: "100%",
                transition: { duration: 1.5, repeat: Infinity },
              }}
            />
            <p className="text-blue-800 font-medium relative z-10">
              Contact our team at{" "}
              <motion.span
                className="text-indigo-700 inline-block"
                whileHover={{
                  scale: 1.05,
                  color: "#4338ca", // indigo-800
                  transition: { duration: 0.3 },
                }}
              >
                packpal@company.com
              </motion.span>{" "}
              for a personalized consultation.
            </p>
          </motion.div>
        </motion.div>

        {/* NEW SECTION: Map visualization placeholder */}
        <motion.div
          className="max-w-4xl mx-auto mt-8 mb-10 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="p-6 bg-gradient-to-r from-blue-600 to-sky-500 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Global Transport Network</h3>
              <BarChart className="h-6 w-6" />
            </div>
            <p className="mt-1 text-sky-100 text-sm">
              Our extensive network spans across continents, ensuring reliable delivery anywhere in the world
            </p>
          </div>
          <Link href="/track" className="block">
            <motion.div
              className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-md p-6 sm:p-8 flex flex-col items-center text-center hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-12 w-12 sm:h-16 sm:w-16 text-purple-600 mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-purple-800">Track Package</h2>
              <p className="text-purple-700 text-sm sm:text-base">Check the status of your shipment</p>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default InformationPage;