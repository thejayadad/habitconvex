"use client";

import React, { useState, useEffect } from "react";
import { FiPlus, FiX } from "react-icons/fi";

interface HabitModalProps {
  onAddHabit: (name: string, selectedDays: string[]) => void;
}

const HabitModal: React.FC<HabitModalProps> = ({ onAddHabit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false); // ✅ Fix Hydration Issue

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // ✅ Fix: Ensure modal only renders after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Toggle selected days
  const toggleDaySelection = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Handle adding habit
  const handleAddHabit = () => {
    if (!newHabit.trim()) return;
    onAddHabit(newHabit, selectedDays);
    setNewHabit("");
    setSelectedDays([]);
    setIsModalOpen(false);
  };

  if (!isClient) return null; // Prevents mismatch during SSR

  return (
    <>
      {/* Button to Open Modal */}
      <div className="w-full flex justify-end">
        <button
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus />
          New Habit
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#242526] p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
                Create New Habit
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <FiX className="text-gray-600 dark:text-gray-300 text-lg" />
              </button>
            </div>

            {/* Habit Name Input */}
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Enter habit name..."
              className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded-md dark:bg-[#3A3B3C] dark:text-white"
            />

            {/* Day Selection */}
            <div className="mt-4">
              <h3 className="text-sm text-gray-700 dark:text-gray-300 mb-2">Select Days:</h3>
              <div className="grid grid-cols-4 gap-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDaySelection(day)}
                    className={`px-2 py-1 rounded-md text-sm ${
                      selectedDays.includes(day)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {day.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={handleAddHabit}
              >
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HabitModal;
