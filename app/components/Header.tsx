"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <header className="navbar fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#0a0f1a]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Zeiia Logo"
              width={300}
              height={100}
              className="h-[70px] w-auto"
            />
          </Link>

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

          <Link
            href="/contact"
            className="px-8 py-3 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] rounded-full text-sm font-bold hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
