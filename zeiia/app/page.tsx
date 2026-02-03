"use client";
import "@/app/globals.css";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Technologies from "./components/Technologies";
import Portfolio from "./components/Portfolio";
import CaseStudies from "./components/CaseStudies";
import Process from "./components/Proccess";
import Testimonials from "./components/Testmonials";
import Awards from "./components/Awards";
import Partners from "./components/Partners";
import Team from "./components/Team";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  console.log("Current theme:", theme);
  return (
    <div className={theme} data-theme={theme}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-[100]"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        {/* Grain Overlay */}
        <div className="grain-overlay" />

        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <Technologies />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Awards />
        <Partners />
        <Team />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
