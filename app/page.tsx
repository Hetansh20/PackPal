"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package, Truck, Plane, Ship } from "lucide-react";
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
  { icon: Ship, label: "Sea Shipping", color: "from-blue-100 to-blue-200" },
  {
    icon: Package,
    label: "Express Delivery",
    color: "from-indigo-100 to-indigo-200",
  },
];

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

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-1/2 lg:w-2/5 p-4 md:p-6 rounded-lg flex flex-col items-start text-left backdrop-blur-sm bg-white/10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
            Next Generation Shipping
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 text-blue-800 font-mono w-full">
            Experience seamless tracking and efficient delivery across all
            transportation modes
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
      </div>
    </div>
  );
}