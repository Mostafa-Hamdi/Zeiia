"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="navbar fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#0a0f1a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Zeiia Logo"
                width={300}
                height={100}
                className="h-[50px] sm:h-[60px] lg:h-[70px] w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10 text-lg font-medium">
              <Link
                href="/"
                className={`${isActive("/") ? "text-[#4a9d9c] font-bold relative group" : "text-slate-300 hover:text-[#4a9d9c] transition-colors"}`}
              >
                Home
                {isActive("/") && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962]" />
                )}
              </Link>
              <Link
                href="/services"
                className={`${isActive("/services") ? "text-[#4a9d9c] font-bold relative group" : "text-slate-300 hover:text-[#4a9d9c] transition-colors"}`}
              >
                Services
                {isActive("/services") && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962]" />
                )}
              </Link>
              <Link
                href="/portfolio"
                className={`${isActive("/portfolio") ? "text-[#4a9d9c] font-bold relative group" : "text-slate-300 hover:text-[#4a9d9c] transition-colors"}`}
              >
                Portfolio
                {isActive("/portfolio") && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962]" />
                )}
              </Link>
              <Link
                href="/about"
                className={`${isActive("/about") ? "text-[#4a9d9c] font-bold relative group" : "text-slate-300 hover:text-[#4a9d9c] transition-colors"}`}
              >
                About
                {isActive("/about") && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962]" />
                )}
              </Link>
              <Link
                href="/contact"
                className={`${isActive("/contact") ? "text-[#4a9d9c] font-bold relative group" : "text-slate-300 hover:text-[#4a9d9c] transition-colors"}`}
              >
                Contact
                {isActive("/contact") && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962]" />
                )}
              </Link>
            </div>

            {/* Desktop CTA Button */}
            <Link
              href="/contact"
              className="hidden lg:block px-8 py-3 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] rounded-full text-sm font-bold hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-[#4a9d9c] transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#0a0f1a] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-[#4a9d9c]">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-300 hover:text-[#4a9d9c] transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="flex flex-col gap-2 px-4">
              <Link
                href="/"
                className={`px-6 py-4 rounded-lg text-lg font-medium transition-all ${
                  isActive("/")
                    ? "bg-gradient-to-r from-[#4a9d9c]/20 to-[#c4a962]/20 text-[#4a9d9c] border-l-4 border-[#4a9d9c]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#4a9d9c]"
                }`}
              >
                Home
              </Link>
              <Link
                href="/services"
                className={`px-6 py-4 rounded-lg text-lg font-medium transition-all ${
                  isActive("/services")
                    ? "bg-gradient-to-r from-[#4a9d9c]/20 to-[#c4a962]/20 text-[#4a9d9c] border-l-4 border-[#4a9d9c]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#4a9d9c]"
                }`}
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className={`px-6 py-4 rounded-lg text-lg font-medium transition-all ${
                  isActive("/portfolio")
                    ? "bg-gradient-to-r from-[#4a9d9c]/20 to-[#c4a962]/20 text-[#4a9d9c] border-l-4 border-[#4a9d9c]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#4a9d9c]"
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className={`px-6 py-4 rounded-lg text-lg font-medium transition-all ${
                  isActive("/about")
                    ? "bg-gradient-to-r from-[#4a9d9c]/20 to-[#c4a962]/20 text-[#4a9d9c] border-l-4 border-[#4a9d9c]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#4a9d9c]"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-6 py-4 rounded-lg text-lg font-medium transition-all ${
                  isActive("/contact")
                    ? "bg-gradient-to-r from-[#4a9d9c]/20 to-[#c4a962]/20 text-[#4a9d9c] border-l-4 border-[#4a9d9c]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#4a9d9c]"
                }`}
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Mobile CTA Button */}
          <div className="p-6 border-t border-white/10">
            <Link
              href="/contact"
              className="block w-full px-8 py-4 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] rounded-full text-center text-base font-bold hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
