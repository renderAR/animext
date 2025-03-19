"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="bg-transparent hover:bg-transparent text-white hover:text-white border border-gray-600"
      size="icon"
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun
        className="bg-transparent h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        className="bg-transparent absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
