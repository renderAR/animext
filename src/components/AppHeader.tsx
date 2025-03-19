"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import ThemeToggle from "./ThemeToggle";

export default function AppHeader() {
  const [isVisible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const isScrollingDown = window.scrollY > lastScrollY;
    setVisible(!isScrollingDown);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener("scroll", handleScroll, controller);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full p-2 shadow-md transition-transform transform z-1 bg-card not-dark:bg-[#2b2d42] dark:bg-card border-b sidebar-border
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ className: "px-4 not-dark:text-[#bcbedc]" })
                  }>
                  Search
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/favourites" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ className: "px-4 not-dark:text-[#bcbedc]" })}
                >
                  Favourites
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ThemeToggle />
      </div>
    </header>
  );
};
