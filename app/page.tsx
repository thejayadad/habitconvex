"use client";
import Header from "@/components/header/header";
import { useState } from "react";
import { FiList, FiGrid, FiPlus, FiCheckCircle, FiCircle } from "react-icons/fi";

// Define the Habit type
interface Habit {
  id: number;
  name: string;
  completed: Record<string, boolean>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);

  // ✅ Initialize completed days properly
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Exercise", completed: { Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false } },
    { id: 2, name: "Read", completed: { Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false } },
    { id: 3, name: "Drink Water", completed: { Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false } },
  ]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // ✅ Toggle habit completion
  const toggleCompletion = (habitId: number, day: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completed: {
                ...habit.completed,
                [day]: !habit.completed[day],
              },
            }
          : habit
      )
    );
  };

  return (
    <div className="flex dark:bg-[#18191a] flex-col h-full items-center pt-24">
      <div className="p-5 max-w-screen-md w-full shadow-sm border border-neutral-200 dark:border-neutral-700 rounded-md bg-white dark:bg-[#242526]">
        <Header />

        {/* Folder Tabs */}
        <div className="w-full flex items-center justify-between pt-6">
          <div className="flex w-full">
            {/* 📌 Table View Tab */}
            <button
              onClick={() => setActiveTab(1)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 font-medium border dark:border-neutral-700 rounded-t-md transition-all
                ${activeTab === 1 ? "bg-white dark:bg-[#333] text-black dark:text-white border-b-0" : "bg-gray-100 dark:bg-[#3A3B3C] text-gray-600 dark:text-gray-300 border-b"}
              `}
            >
              <FiList className="text-lg" />
              Table View
            </button>

            {/* 🔳 Grid View Tab */}
            <button
              onClick={() => setActiveTab(2)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 font-medium border dark:border-neutral-700 rounded-t-md transition-all
                ${activeTab === 2 ? "bg-white dark:bg-[#333] text-black dark:text-white border-b-0" : "bg-gray-100 dark:bg-[#3A3B3C] text-gray-600 dark:text-gray-300 border-b"}
              `}
            >
              <FiGrid className="text-lg" />
              Grid View
            </button>
          </div>

          {/* ➕ Add New Habit Button */}
          <div className="w-full flex justify-end">
            <button className="flex items-center gap-2 bg-neutral-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-neutral-600 transition">
              <FiPlus />
              New Habit
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="rounded-b-md bg-white dark:bg-[#242526]">
          {/* 📌 Table View */}
          {activeTab === 1 && (
            <div className="overflow-x-auto">
              <table className="border-collapse border border-neutral-200 dark:border-neutral-700 text-sm">
                <thead>
                  <tr className="dark:bg-[#3A3B3C]">
                    <th className="p-2 text-left border border-neutral-200 dark:border-neutral-700">Days</th>
                    {habits.map((habit) => (
                      <th key={habit.id} className="p-2 text-center border border-neutral-200 dark:border-neutral-700">
                        {habit.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day} className="border border-neutral-200 dark:border-neutral-700">
                      <td className="p-2 border border-neutral-200 dark:border-neutral-700">{day}</td>
                      {habits.map((habit) => (
                        <td key={habit.id} className="p-2 text-center border border-neutral-200 dark:border-neutral-700">
                          <button className="p-1" onClick={() => toggleCompletion(habit.id, day)}>
                            {habit.completed[day] ? <FiCheckCircle className="text-green-500" /> : <FiCircle className="text-gray-400" />}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 🔳 Grid View */}
          {activeTab === 2 && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
              {habits.map((habit) => (
                <div key={habit.id} className=" border border-neutral-200 dark:border-neutral-700  shadow-sm bg-gray-50 dark:bg-[#3A3B3C]">
                  <h2 className="text-md font-semibold text-neutral-800 dark:text-white grid place-content-center bg-neutral-300"> 
                    {habit.name}
                  </h2>
                  <div className="flex flex-wrap justify-center">
                    {days.map((day) => (
                      <button
                        key={day}
                        className="flex items-center justify-between w-full px-3 py-2  dark:bg-[#242526]  border border-neutral-200 dark:border-neutral-700"
                        onClick={() => toggleCompletion(habit.id, day)}
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">{day}</span>
                        {habit.completed[day] ? (
                          <FiCheckCircle className="text-green-500" />
                        ) : (
                          <FiCircle className="text-gray-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
