
# create the app
- package .json
- home page & css update


# UI SETUP
- layout
- setup page
- bring in header
- do the dark light toggle
-- theme context 
--- createContext: Creates a global context to store the theme value.
useState: Manages the theme state (light or dark).
useEffect: Ensures the theme is applied when the component mounts.
useContext: Allows consuming the ThemeContext in any component.

```
interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

```

    Defines an interface for our context.
theme: Can be "light" or "dark".
toggleTheme: A function to switch between light and dark mode.

```
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
```

Creates a new React Context that holds the theme.
The default value is undefined, meaning it must be used inside a provider.

5️⃣ Create the Provider Component
tsx
Copy
Edit
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
ThemeProvider is a wrapper component.
{ children }: { children: React.ReactNode }
This ensures it wraps other components, passing them dark/light mode settings.
6️⃣ Set the Initial Theme from Local Storage
tsx
Copy
Edit
const [theme, setTheme] = useState<string>(
  typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
    ? "dark"
    : "light"
);
useState<string>() stores the current theme.
typeof window !== "undefined"
Ensures this only runs on the client side, since localStorage doesn’t exist on the server.
localStorage.getItem("theme") === "dark"
If the user previously selected dark mode, set the theme to "dark".
Otherwise, default to light mode.
7️⃣ Apply Theme to the Document
tsx
Copy
Edit
useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
}, [theme]);
useEffect(() => {}, [theme]) runs every time the theme changes.
localStorage.setItem("theme", theme)
Saves the theme so it's remembered on page reload.
document.documentElement.classList.toggle("dark", theme === "dark")
Adds or removes the "dark" class on <html> to trigger Tailwind’s dark mode.
8️⃣ Function to Toggle Theme
tsx
Copy
Edit
const toggleTheme = () => {
  setTheme((prev) => (prev === "light" ? "dark" : "light"));
};
This function switches between "light" and "dark".
It updates the state, triggering useEffect to apply the change.
9️⃣ Provide the Context
tsx
Copy
Edit
return (
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>
);
The ThemeContext.Provider wraps child components, giving them:
theme (current mode)
toggleTheme (function to switch)
🔟 Custom Hook for Easier Usage
tsx
Copy
Edit
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
useContext(ThemeContext):
Retrieves theme state (light or dark)
Retrieves toggleTheme function
Throws an error if useTheme is used outside of ThemeProvider.
🎯 Summary
ThemeProvider manages theme state.
Stores user preference in localStorage.
Applies dark class to <html> when needed.
Provides theme and toggleTheme globally.
Custom useTheme() hook makes theme usage easy.
✅ How to Use It
After defining the ThemeProvider, wrap your app with it in _app.tsx or layout.tsx:

📌 _app.tsx
tsx
Copy
Edit
import { ThemeProvider } from "../context/ThemeContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}



-- context in the layout
-- update the tailwind and enable the class

# 🏷️ Header Component (Dark/Light Mode Toggle)

## 📌 Summary:
- Displays the **"Habit Tracker"** title.
- Uses the `useTheme` hook from `theme-context` to:
  - Get the **current theme** (light or dark).
  - Provide a **function to toggle the theme**.
- **Button changes the theme** when clicked.
- **Icons switch dynamically**:
  - 🌙 `FiMoon` appears in **light mode** (switch to dark).
  - ☀️ `FiSun` appears in **dark mode** (switch to light).

## 🖥️ Code:
```tsx
"use client";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./theme-context";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full py-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-medium text-neutral-600 dark:text-neutral-300">
          Habit Tracker
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
        >
          {theme === "light" ? (
            <FiMoon className="text-gray-800 dark:text-yellow-400" size={24} />
          ) : (
            <FiSun className="text-yellow-400 dark:text-gray-200" size={24} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;


# 🌗 Creating a Dark/Light Mode Toggle in Next.js (Without Framer Motion)

## 🎯 Overview
This guide explains how to **create a dark/light mode toggle** using:
✅ **React Context API**  
✅ **Tailwind CSS animations (no Framer Motion)**  
✅ **React Icons (`FiSun`, `FiMoon`)**  
✅ **LocalStorage for theme persistence**  

---

## 1️⃣ Create the Theme Context (`theme-context.tsx`)

```tsx
"use client";
import { createContext, useState, useEffect, useContext } from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
      ? "dark"
      : "light"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
```



- update the layouts with it
- update github
- build the action bar
- build the tabs
- add the plus button


# database setup
- using convex
- Convex is the open source, reactive database where queries are TypeScript code running right in the database. Just like React components react to state changes, Convex queries react to database changes.
- follow quick start
