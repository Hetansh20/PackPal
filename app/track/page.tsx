'use client';

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Map } from 'lucide-react';
import TrackingTimeline from '../../components/TrackingTimeline';
import Logo from '../../components/Logo';

import SafeHTMLRenderer from "./safehtmlrender"
export default function WelcomePage() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [mapHtml, setMapHtml] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [liveStatus, setLiveStatus] = useState<string | null>('Fetching live updates...');
  const [statusUpdates, setStatusUpdates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Function to handle route tracking
  const handleTrackRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setMapHtml(null);
    setIsLoading(true);
  
    try {
      // First get the route data
      const response = await fetch('http://127.0.0.1:5000/calculate_route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: startLocation,
          end: endLocation
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch route');
      }
  
      // Then get the map HTML
      const mapResponse = await fetch('http://127.0.0.1:5000/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          start: startLocation,
          end: endLocation
        }),
      });
  
      const mapHtmlText = await mapResponse.text();
      setMapHtml(mapHtmlText); // Store the entire HTML response
    } catch (error: any) {
      setErrorMessage(error.message);
      console.error("Error fetching route:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle package tracking
  const handleTrackPackage = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingData({
      status: 'In Transit',
      location: 'Chicago, IL',
      estimatedDelivery: '2023-06-15',
      timeline: [
        { status: 'Order Placed', date: '2023-06-10', completed: true },
        { status: 'Picked Up', date: '2023-06-11', completed: true },
        { status: 'In Transit', date: '2023-06-12', completed: false },
        { status: 'Out for Delivery', date: '2023-06-15', completed: false },
        { status: 'Delivered', date: '', completed: false },
      ],
    });

    setStatusUpdates([]);
    setLiveStatus('Fetching live updates...');
  };

  // Effect to initialize map when mapHtml changes
  useEffect(() => {
    if (mapHtml && mapContainerRef.current) {
      mapContainerRef.current.innerHTML = mapHtml;

      // Extract and execute any scripts in the map HTML
      const scriptMatch = mapHtml.match(/<script>([\s\S]*?)<\/script>/);
      if (scriptMatch && scriptMatch[1]) {
        try {
          // Use Function constructor instead of eval for better scoping
          new Function(scriptMatch[1])();
        } catch (error) {
          console.error("Error executing map script:", error);
        }
      }
    }
  }, [mapHtml]);

  // Effect for status updates simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (trackingData) {
      interval = setInterval(() => {
        const updates = [
          'Package scanned in Chicago, IL',
          'Departed Chicago hub',
          'Arrived in Denver, CO',
          'Out for delivery',
          'Delivered successfully!',
        ];
        setStatusUpdates((prev) => {
          if (prev.length < updates.length) {
            return [...prev, updates[prev.length]];
          } else {
            if (interval) clearInterval(interval);
            setLiveStatus('All updates received');
            return prev;
          }
        });
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [trackingData]);

  // Toggle fullscreen map view
  const toggleFullscreenMap = () => {
    setShowFullscreenMap(!showFullscreenMap);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Responsive Header */}
      <header className="bg-blue-200/50 text-white py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Link href="/options" className="text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl sm:text-2xl text-blue-600 font-bold">Track Your Details</h1>
        <Logo />
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Route Tracking Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Track Your Route</h2>
          <form onSubmit={handleTrackRoute} className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                placeholder="Start Location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="End Location"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400"
              >
                {isLoading ? 'Loading...' : 'Track Route'}
              </button>
            </div>
          </form>
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          
          {/* Map Container */}
          {/* In your main component's return statement*/}
{mapHtml && (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    <div className="flex justify-between items-center p-4 bg-blue-50">
      <h3 className="text-lg font-semibold text-blue-700">Route Map</h3>
      <button 
        onClick={toggleFullscreenMap}
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        {showFullscreenMap ? 'Exit Fullscreen' : 'View Fullscreen'}
      </button>
    </div>
    
    <div className={`${showFullscreenMap 
      ? 'fixed inset-0 z-50 bg-white' 
      : 'relative h-96 w-full'}`}
    >
      <SafeHTMLRenderer 
        html={mapHtml} 
        className="h-full w-full" 
      />
    </div>
    
    {showFullscreenMap && (
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-md p-4">
        <button 
          onClick={toggleFullscreenMap}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Exit Fullscreen
        </button>
      </div>
    )}
  </motion.div>
)}
        </section>

        {/* Package Tracking Section */}
        <section className="space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">Track Your Package</h2>
          <motion.form 
            onSubmit={handleTrackPackage} 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full px-4 py-2 rounded-md sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md sm:rounded-l-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.form>

          <AnimatePresence>
            {trackingData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6"
              >
                <TrackingTimeline data={trackingData} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Status Updates Section */}
          <section className="mt-6 sm:mt-8">
            <h3 className="text-lg font-semibold mb-4">Live Status Updates</h3>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 space-y-2">
              {statusUpdates.map((update, index) => (
                <motion.p 
                  key={index} 
                  className="text-blue-700 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {update}
                </motion.p>
              ))}
              {liveStatus && (
                <p className="text-sm text-gray-500 mt-2">{liveStatus}</p>
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}