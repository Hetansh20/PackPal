"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Package, 
  Truck, 
  Plane, 
  Ship, 
  Clock, 
  FileText, 
  User,
  ShoppingBag,
  ClipboardList,
  Settings
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import Logo from "../components/Logo";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} />
      <Float
        speed={1.5}
        rotationIntensity={1}
        floatIntensity={1}
        floatingRange={[-0.5, 0.5]}
      />
    </>
  );
}

const features = [
  { icon: Truck, label: "Road Transport", color: "from-sky-100 to-sky-200" },
  { icon: Plane, label: "Air Freight", color: "from-cyan-100 to-cyan-200" },
  {
    icon: Package,
    label: "Express Delivery",
    color: "from-indigo-100 to-indigo-200",
  },
];

// Mock data for orders history
const recentOrders = [
  { id: "ORD-2025-04001", status: "Delivered", date: "Apr 10, 2025", items: 3 },
  { id: "ORD-2025-03098", status: "In Transit", date: "Apr 8, 2025", items: 1 },
  { id: "ORD-2025-03045", status: "Pending", date: "Apr 5, 2025", items: 5 },
];

// Mock data for activity logs
const activityLogs = [
  { action: "Package Scanned", timestamp: "Today, 10:30 AM", user: "John D." },
  { action: "Order Created", timestamp: "Yesterday, 4:45 PM", user: "Sarah M." },
  { action: "Delivery Confirmed", timestamp: "Apr 11, 2:20 PM", user: "Team Lead" },
];

// Profile data mock
const profileData = {
  name: "Alex Johnson",
  role: "Logistics Manager",
  team: "North East Division",
  completedTasks: 42,
  pendingTasks: 7
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const iconVariants = {
  hover: (custom: string) => ({
    y: [-3, 3, -3],
    rotate:
      custom === "Plane"
        ? [-10, 10, -10]
        : custom === "Ship"
        ? [-5, 5, -5]
        : custom === "Truck"
        ? [-2, 2, -2]
        : 0,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export default function WelcomePage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'orders' | 'logs' | 'profile'>('main');

  // Fix hydration issues by only rendering client-specific elements after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-300 to-blue-200 text-blue-900 overflow-hidden">
      {/* Background Video - Only render on client side */}
      {isMounted && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/pakpal_home_bg.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Fallback background for server-side rendering */}
      {!isMounted && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-sky-200 to-blue-300"></div>
      )}

      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-100/30 via-blue-100/20 to-transparent animate-pulse" />
      </div>

      {/* Navigation Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute top-8 right-8 z-20 flex space-x-2 bg-white/20 backdrop-blur-md p-1 rounded-full"
      >
        {[
          { key: 'main', icon: Package, label: 'Home' },
          { key: 'orders', icon: ShoppingBag, label: 'Orders' },
          { key: 'logs', icon: ClipboardList, label: 'Logs' },
          { key: 'profile', icon: User, label: 'Profile' }
        ].map(tab => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === tab.key ? 'bg-blue-600 text-white shadow-md' : 'text-blue-800 hover:bg-white/30'}`}
          >
            <tab.icon className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col items-start justify-center px-4 md:pl-16 lg:pl-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full h-[12vh] absolute top-4 left-4"
        >
          {isMounted && (
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-start">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
                </div>
              }
            >
              <Canvas
                camera={{ position: [0, 0, 6] }}
                gl={{ powerPreference: "high-performance", antialias: false }}
                onCreated={({ gl }) => {
                  const canvas = gl.domElement;
                  canvas.addEventListener("webglcontextlost", (e) => {
                    e.preventDefault();
                    console.warn("WebGL Context Lost. Attempting recovery...");
                  });
                  canvas.addEventListener("webglcontextrestored", () => {
                    console.log("WebGL Context Restored");
                  });
                }}
              >
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={1}
                />
                <Scene />
              </Canvas>
            </Suspense>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-8 left-8 z-20"
        >
          <Logo />
        </motion.div>

        {/* Main Content Area */}
        {activeTab === 'main' && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full md:w-1/2 lg:w-2/5 p-4 md:p-6 rounded-lg flex flex-col items-start text-left backdrop-blur-sm bg-white/10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              PackPal – Smarter Group Packing
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 text-blue-800 font-mono w-full">
              Simplify collaborative packing and event logistics with real-time tracking, role-based coordination, and streamlined checklist management.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10 w-full"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={featureVariants}
                  whileHover="hover"
                  className={`relative p-4 rounded-xl bg-gradient-to-br ${feature.color} 
                    hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-300 backdrop-blur-sm
                    transform-gpu flex flex-row items-center gap-3 border border-white/20`}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                >
                  <motion.div
                    custom={feature.label}
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-2 bg-white rounded-full"
                  >
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </motion.div>
                  <motion.p
                    className="text-xs sm:text-sm font-medium text-blue-800"
                    animate={{
                      scale: hoveredFeature === index ? 1.1 : 1,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {feature.label}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-start"
            >
              <Link
                href="/information"
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                  rounded-full font-semibold text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 
                  shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-sm md:text-base"
              >
                Start Tracking
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* Orders History Section */}
        {activeTab === 'orders' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 30 }}
            className="w-full md:w-1/2 lg:w-2/5 p-4 md:p-6 rounded-lg flex flex-col items-start text-left backdrop-blur-sm bg-white/20"
          >
            <div className="flex items-center mb-6 w-full">
              <ShoppingBag className="w-6 h-6 text-blue-700 mr-3" />
              <h2 className="text-2xl font-bold text-blue-800">Orders History</h2>
            </div>

            <div className="w-full space-y-4">
              {recentOrders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/30 backdrop-blur-sm rounded-lg p-4 border border-white/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-blue-700">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-blue-600">
                    <span>Date: {order.date}</span>
                    <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-start mt-6"
            >
              <button className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 
                rounded-full font-medium text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 
                shadow-md shadow-blue-500/30 hover:shadow-blue-500/50 text-sm">
                View All Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Logs Section */}
        {activeTab === 'logs' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 30 }}
            className="w-full md:w-1/2 lg:w-2/5 p-4 md:p-6 rounded-lg flex flex-col items-start text-left backdrop-blur-sm bg-white/20"
          >
            <div className="flex items-center mb-6 w-full">
              <FileText className="w-6 h-6 text-blue-700 mr-3" />
              <h2 className="text-2xl font-bold text-blue-800">Activity Logs</h2>
            </div>

            <div className="w-full space-y-4">
              {activityLogs.map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/30 backdrop-blur-sm rounded-lg p-4 border border-white/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-blue-700 mr-2" />
                      <span className="text-sm text-blue-700">{log.timestamp}</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {log.user}
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-blue-800">{log.action}</p>
                </motion.div>
              ))}
            </div>

            <div className="w-full flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700
                  rounded-full font-medium hover:bg-blue-200 transition-all duration-300 text-sm"
              >
                Filter Logs
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 
                  rounded-full font-medium text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 
                  shadow-md shadow-blue-500/30 hover:shadow-blue-500/50 text-sm"
              >
                View All Logs
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Profile Section */}
        {activeTab === 'profile' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 30 }}
            className="w-full md:w-1/2 lg:w-2/5 p-4 md:p-6 rounded-lg flex flex-col items-start text-left backdrop-blur-sm bg-white/20"
          >
            <div className="flex items-center mb-6 w-full">
              <User className="w-6 h-6 text-blue-700 mr-3" />
              <h2 className="text-2xl font-bold text-blue-800">Profile</h2>
            </div>

            <div className="w-full bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-white/40 mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                    {profileData.name.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-800">{profileData.name}</h3>
                  <p className="text-sm text-blue-600">{profileData.role}</p>
                  <p className="text-xs text-blue-500">{profileData.team}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/30 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">Completed Tasks</p>
                  <p className="text-2xl font-bold text-blue-800">{profileData.completedTasks}</p>
                </div>
                <div className="bg-white/30 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">Pending Tasks</p>
                  <p className="text-2xl font-bold text-blue-800">{profileData.pendingTasks}</p>
                </div>
              </div>
            </div>

            <div className="w-full space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-3 bg-white/30 backdrop-blur-sm rounded-lg hover:bg-white/40 transition-all duration-200"
              >
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-700 mr-3" />
                  <span className="font-medium text-blue-800">Activity History</span>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-3 bg-white/30 backdrop-blur-sm rounded-lg hover:bg-white/40 transition-all duration-200"
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-blue-700 mr-3" />
                  <span className="font-medium text-blue-800">Account Settings</span>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </motion.button>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-start mt-6"
            >
              <button className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 
                rounded-full font-medium text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 
                shadow-md shadow-blue-500/30 hover:shadow-blue-500/50 text-sm">
                Edit Profile
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}