import { Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 not-dark:bg-[#2b2d42] dark:bg-card sidebar-border">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm not-dark:text-[#bcbedc]">Animext</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/renderAR"
              target="_blank"
              rel="noopener noreferrer"
              className="not-dark:text-[#bcbedc] hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>

            <p className="text-xs not-dark:text-[#bcbedc]">
              Made by renderAR
            </p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs not-dark:text-[#bcbedc]">
              Powered by AniList GraphQL API • Built with Next.js, React, TypeScript & Tailwind
            </p>
            <p className="text-xs not-dark:text-[#bcbedc]">
              © {currentYear} • All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
