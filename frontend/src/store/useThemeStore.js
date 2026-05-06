import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);

    // 🔥 THIS LINE IS THE KEY FIX
    document.documentElement.setAttribute("data-theme", theme);

    set({ theme });
  },
}));