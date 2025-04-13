"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    const amt = searchParams.get("amount");
    if (amt) {
      setAmount(Number(amt));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-blue-100 text-blue-900 px-4">
      <h1 className="text-3xl font-bold mb-4">Select Payment Method</h1>
      {amount !== null ? (
        <>
          <p className="text-lg mb-6">Total amount to be paid: ₹{amount}</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600">
            Pay Now
          </button>
        </>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}
