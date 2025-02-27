"use client";
import Header from "@/components/header/header";
import { useState } from "react";
import { FiList, FiGrid, FiPlus } from "react-icons/fi";

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex dark:bg-[#18191a] flex-col h-full items-center pt-24">
      <div className="p-5 max-w-screen-md w-full shadow-sm border border-neutral-100 dark:border-neutral-700 rounded-md bg-white dark:bg-[#242526]">
        <Header />

        {/* Folder Tabs */}
        <div className="w-full flex items-center justify-between pt-6">
          <div className="flex w-full">
            {/* 📌 Table View Tab */}
            <button
              onClick={() => setActiveTab(1)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 font-medium border dark:border-neutral-700 rounded-t-md transition-all
                ${
                  activeTab === 1
                    ? "bg-white dark:bg-[#333] text-black dark:text-white border-b-0"
                    : "bg-gray-100 dark:bg-[#3A3B3C] text-gray-600 dark:text-gray-300 border-b"
                }
              `}
            >
              <FiList className="text-lg" />
              Table View
            </button>

            {/* 🔳 Grid View Tab */}
            <button
              onClick={() => setActiveTab(2)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 font-medium border dark:border-neutral-700 rounded-t-md transition-all
                ${
                  activeTab === 2
                    ? "bg-white dark:bg-[#333] text-black dark:text-white border-b-0"
                    : "bg-gray-100 dark:bg-[#3A3B3C] text-gray-600 dark:text-gray-300 border-b"
                }
              `}
            >
              <FiGrid className="text-lg" />
              Grid View
            </button>
          </div>

          {/* ➕ Add New Habit Button */}
          <div className="w-full flex justify-end">
            <button className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition">
              <FiPlus />
              New Habit
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="rounded-b-md p-4 bg-white dark:bg-[#242526]">
          {activeTab === 1 && (
            <div className="text-center">
              📌 **Table View Content**
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                Displaying habits in a structured table format.
              </p>
            </div>
          )}
          {activeTab === 2 && (
            <div className="text-center">
              🔳 **Grid View Content**
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                Displaying habits in a modern grid layout.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
