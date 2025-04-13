'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface PickupFormProps {
  selectedMode: string | null;
}

export default function PickupForm({ selectedMode }: PickupFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupAddress: '',
    deliveryAddress: '',
    idProof: '',
    priority: '',
    items: [{ itemname: '', itemDescription: '' }],
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    fieldName?: string
  ) => {
    const { name, value } = e.target;
    if (typeof index === 'number' && fieldName) {
      const updatedItems = [...formData.items];
      updatedItems[index][fieldName] = value;
      setFormData((prev) => ({ ...prev, items: updatedItems }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { itemname: '', itemDescription: '' }],
    }));
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deliveryCharge = 50; // Example fixed charge
    const itemCharge = formData.items.length * 100; // Example: ₹100 per item
    const totalAmount = itemCharge + deliveryCharge;

    const dataToSend = {
      ...formData,
      selectedMode,
      deliveryCharge,
      itemCharge,
      totalAmount,
    };

    const query = encodeURIComponent(JSON.stringify(dataToSend));
    router.push(`/pickup/success?data=${query}`);
  };

  const formSteps = [
    [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
    ],
    [
      {
        name: 'deliveryAddress',
        label: 'Delivery Address',
        type: 'text',
        required: true,
      },
      {
        name: 'priority',
        label: 'Priority',
        type: 'text',
        required: true,
      },
    ],
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {formSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-full mx-1 rounded ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: index <= currentStep ? 1 : 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          ))}
        </div>
        <p className="text-center text-sm text-blue-700">
          Step {currentStep + 1} of {formSteps.length}
        </p>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 1 &&
          formData.items.map((item, index) => (
            <div key={index} className="mb-4 border border-blue-200 p-4 rounded-md relative">
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={item.itemname}
                onChange={(e) => handleChange(e, index, 'itemname')}
                required
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded-md mb-3"
              />
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Item Description
              </label>
              <input
                type="text"
                value={item.itemDescription}
                onChange={(e) => handleChange(e, index, 'itemDescription')}
                required
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded-md"
              />
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          ))}

        {currentStep === 1 && (
          <button
            type="button"
            onClick={handleAddItem}
            className="text-blue-600 font-semibold mb-4 hover:underline"
          >
            + Add Another Item
          </button>
        )}

        {formSteps[currentStep].map((field) => (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-blue-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name as keyof typeof formData] as string}
              onChange={handleChange}
              required={field.required}
              className="w-full px-3 py-2 bg-white border border-blue-300 rounded-md text-blue-900"
            />
          </div>
        ))}
      </motion.div>

      <div className="mt-6 flex justify-between">
        {currentStep > 0 && (
          <motion.button
            type="button"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="bg-gray-200 text-blue-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
        )}
        {currentStep < formSteps.length - 1 ? (
          <motion.button
            type="button"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            disabled={!selectedMode}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-20 rounded-md font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Pickup
          </motion.button>
        )}
      </div>
    </motion.form>
  );
}
