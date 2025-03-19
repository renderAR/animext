import { Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Animext</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/renderAR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>

            <p className="text-xs text-muted-foreground">
              Made by renderAR
            </p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Powered by AniList GraphQL API • Built with Next.js, React, TypeScript & Tailwind
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} • All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;