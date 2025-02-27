"use client";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./theme-context";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full py-4  bg-transparent shadow-sm transition-colors duration-300">
      <div className="max-w-screen-md mx-auto flex items-center justify-between px-4">
        
        {/* 📌 App Title */}
        <h1 className="text-2xl font-semibold text-neutral-700 dark:text-[#AAB3C1] transition-colors duration-300">
          Habit Tracker
        </h1>

        {/* 🌗 Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center p-2 rounded-full bg-[#E3E6EB] dark:bg-[#222A3A] shadow-md dark:shadow-lg transition-transform transform active:scale-90 duration-200"
        >
          {theme === "light" ? (
            <FiMoon className="text-[#374151] dark:text-[#FFD369] transition-all duration-300" size={24} />
          ) : (
            <FiSun className="text-[#FFD369] dark:text-[#AAB3C1] transition-all duration-300" size={24} />
          )}
        </button>

      </div>
    </header>
  );
};

export default Header;
