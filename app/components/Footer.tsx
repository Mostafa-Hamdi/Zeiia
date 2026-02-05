import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src={logo}
                alt="Zeiia Logo"
                width={300}
                height={100}
                className="h-[70px] w-auto"
              />
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Premium software solutions crafted with precision, delivered with
              excellence.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  Custom Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  E-Commerce
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  Web Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  Mobile Apps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a
                  href="mailto:info@zeiia.com"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  info@zeiia.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="hover:text-[#4a9d9c] transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2026 Zeiia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
