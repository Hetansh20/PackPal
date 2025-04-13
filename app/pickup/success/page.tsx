'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Logo from '../../../components/Logo'

export default function PickupSuccessPage() {
  const searchParams = useSearchParams()
  const [pickupDetails, setPickupDetails] = useState<any>(null)

  useEffect(() => {
    const data = searchParams.get('data')
    if (data) {
      try {
        setPickupDetails(JSON.parse(decodeURIComponent(data)))
      } catch (err) {
        console.error('Invalid JSON in query param:', err)
      }
    }
  }, [searchParams])

  if (!pickupDetails) return <p className="p-8">Loading...</p>

  const {
    name,
    email,
    phone,
    address,
    selectedMode,
    items = [],
    itemCharge,
    deliveryCharge,
    totalAmount,
  } = pickupDetails

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50 text-blue-900">
      <header className="bg-blue-100 py-4 px-6 flex justify-between items-center">
        <Link href="/pickup" className="text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Pickup Scheduled</h1>
        <Logo />
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        </motion.div>

        <motion.h2
          className="text-3xl font-bold mb-4 text-blue-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Pickup Successfully Scheduled!
        </motion.h2>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 w-full max-w-xl space-y-4">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Pickup Details</h3>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Mode:</strong> {selectedMode}</p>

          <div>
            <strong>Items:</strong>
            <ul className="list-disc ml-6 mt-1">
              {items.map((item: any, index: number) => (
                <li key={index}>
                  {item.name} (Qty: {item.quantity})
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-4">
            <p><strong>Item Charges:</strong> ₹{itemCharge}</p>
            <p><strong>Delivery Charges:</strong> ₹{deliveryCharge}</p>
            <p className="text-xl font-bold text-blue-900 mt-2">Total Amount: ₹{totalAmount}</p>
          </div>
        </div>

        <Link
          href={{
            pathname: '/pickup/success/payment',
            query: { amount: totalAmount },
          }}
          className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-600 transition-colors"
        >
          Proceed to Payment
        </Link>
      </main>
    </div>
  )
}
