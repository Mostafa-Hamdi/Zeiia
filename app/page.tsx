"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import asia from "@/public/asia.webp";
import ecomarketing from "@/public/ecomarketing.webp";
import newtoptrade from "@/public/newtoptrade.webp";
import tavan from "@/public/tavan.avif";
import saqr from "@/public/saqr.webp";
import kreaz from "@/public/kreaz.webp";
import aura from "@/public/aura.png";
import auraScreen from "@/public/auraScreen.png";
import kreazScreen from "@/public/kreaz-screen.jpg";
import asiaScreen from "@/public/asiaScreen.png";
import tavanScreen from "@/public/tavanScreen.png";
import ecoMarketingScreen from "@/public/ecoMarketingScreen.png";
import saqrScreen from "@/public/saqrScreen.jpg";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Contact from "./components/Contact";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);
    // debug: confirm initialization of GSAP and ScrollTrigger in the browser console
    console.log("GSAP Init:", { gsap: !!gsap, ScrollTrigger: !!ScrollTrigger });

    // Custom Cursor Animation
    const moveCursor = (e: MouseEvent) => {
      const cursorEl = cursorRef.current;
      const followerEl = cursorFollowerRef.current;
      if (!cursorEl || !followerEl) return;
      gsap.to(cursorEl, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(followerEl, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Hero Section - Advanced Timeline
    const heroTl = gsap.timeline({ delay: 0.6 });
    heroTl
      .fromTo(
        ".hero-logo",
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
        },
      )
      .fromTo(
        ".hero-line-1",
        { opacity: 0, y: 150, rotationX: -90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.4, ease: "power4.out" },
        "-=0.6",
      )
      .fromTo(
        ".hero-line-2",
        { opacity: 0, y: 150, rotationX: -90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.4, ease: "power4.out" },
        "-=1.2",
      )
      .fromTo(
        ".hero-description",
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.9",
      )
      .fromTo(
        ".hero-btn-1",
        { opacity: 0, x: -60, rotationY: -45 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
        },
        "-=0.7",
      )
      .fromTo(
        ".hero-btn-2",
        { opacity: 0, x: 60, rotationY: 45 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
        },
        "-=0.9",
      )
      .fromTo(
        ".scroll-indicator",
        { opacity: 0, y: -30 },
        { opacity: 0.6, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4",
      );

    // Floating animation
    gsap.to(".hero-logo", {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Stats Section with Counter Animation
    ScrollTrigger.create({
      trigger: ".stats-section",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          ".stat-item",
          {
            opacity: 0,
            y: 80,
            scale: 0.7,
            rotation: -15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            stagger: {
              amount: 0.8,
              from: "start",
              ease: "power2.out",
            },
            ease: "elastic.out(1, 0.6)",
          },
        );

        // Counter Animation
        document.querySelectorAll(".stat-number").forEach((elem) => {
          const target = elem.getAttribute("data-target") || "0";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: parseFloat(target),
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
              if (target.includes(".")) {
                elem.textContent = obj.val.toFixed(1);
              } else {
                elem.textContent = Math.ceil(obj.val).toString();
              }
            },
          });
        });
      },
    });

    // Services Cards - Random Stagger
    ScrollTrigger.create({
      trigger: ".services-grid",
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo(
          ".service-box",
          {
            opacity: 0,
            y: 120,
            rotationX: -50,
            scale: 0.7,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1.4,
            stagger: {
              amount: 1,
              from: "random",
              grid: [2, 3],
              ease: "power2.out",
            },
            ease: "back.out(1.5)",
          },
        );
      },
    });

    // Service cards 3D hover
    document.querySelectorAll(".service-box").forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.08,
          rotationY: 8,
          z: 60,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".service-icon"), {
          scale: 1.3,
          rotation: 15,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".service-icon"), {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      // Store handlers for cleanup
      (card as any)._mouseEnter = handleMouseEnter;
      (card as any)._mouseLeave = handleMouseLeave;
    });

    // Portfolio Section - 3D Flip Cards
    ScrollTrigger.create({
      trigger: ".portfolio-grid",
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(
          ".portfolio-card",
          {
            opacity: 0,
            rotationY: 90,
            z: -300,
            scale: 0.6,
          },
          {
            opacity: 1,
            rotationY: 0,
            z: 0,
            scale: 1,
            duration: 1.2,
            stagger: {
              amount: 1.2,
              from: "start",
              ease: "power2.out",
            },
            ease: "back.out(1.4)",
          },
        );
      },
    });

    // Portfolio cards hover
    document.querySelectorAll(".portfolio-card").forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -15,
          rotationX: 5,
          scale: 1.03,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".portfolio-image"), {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".portfolio-overlay"), {
          opacity: 1,
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".portfolio-image"), {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".portfolio-overlay"), {
          opacity: 0,
          duration: 0.4,
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      (card as any)._mouseEnter = handleMouseEnter;
      (card as any)._mouseLeave = handleMouseLeave;
    });

    // Benefits Section - Wave Animation
    ScrollTrigger.create({
      trigger: ".benefits-section",
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo(
          ".benefit-card",
          {
            opacity: 0,
            x: (index: number) => (index % 2 === 0 ? -120 : 120),
            rotation: (index: number) => (index % 2 === 0 ? -20 : 20),
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1.2,
            stagger: {
              amount: 0.9,
              ease: "power2.out",
            },
            ease: "power3.out",
          },
        );
      },
    });

    // Contact Form Animation
    ScrollTrigger.create({
      trigger: ".contact-section",
      start: "top 75%",
      onEnter: () => {
        const contactTl = gsap.timeline();
        contactTl
          .fromTo(
            ".contact-header",
            { opacity: 0, y: 60, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.4)" },
          )
          .fromTo(
            ".contact-form",
            { opacity: 0, y: 80, rotationX: -30 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.6",
          )
          .fromTo(
            ".form-field",
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.8",
          );
      },
    });

    // CTA Section - Morphing
    ScrollTrigger.create({
      trigger: ".cta-section",
      start: "top 75%",
      onEnter: () => {
        const ctaTl = gsap.timeline();
        ctaTl
          .fromTo(
            ".cta-box",
            {
              opacity: 0,
              scale: 0.3,
              borderRadius: "50%",
              rotation: 180,
            },
            {
              opacity: 1,
              scale: 1,
              borderRadius: "24px",
              rotation: 0,
              duration: 1.8,
              ease: "elastic.out(1, 0.5)",
            },
          )
          .fromTo(
            ".cta-title",
            { opacity: 0, y: 60, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" },
            "-=1",
          )
          .fromTo(
            ".cta-text",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.6",
          )
          .fromTo(
            ".cta-button",
            { opacity: 0, scale: 0, rotation: -180 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1,
              stagger: 0.2,
              ease: "elastic.out(1, 0.6)",
            },
            "-=0.5",
          );
      },
    });

    // Parallax Effects
    gsap.to(".parallax-orb-1", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
      y: 500,
      rotation: 180,
      ease: "none",
    });

    gsap.to(".parallax-orb-2", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
      y: -400,
      rotation: -180,
      ease: "none",
    });

    gsap.to(".parallax-orb-3", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5,
      },
      y: 600,
      x: -250,
      rotation: 360,
      ease: "none",
    });

    // Navbar Hide/Show on Scroll
    ScrollTrigger.create({
      start: "top -80",
      end: "max",
      onUpdate: (self: any) => {
        if (self.direction === -1) {
          gsap.to(".navbar", {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        } else if (self.progress > 0.05) {
          gsap.to(".navbar", {
            y: -120,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const onClick = (e: Event) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute("href") || "";
        const target = document.querySelector(href);
        if (target instanceof HTMLElement) {
          const top = target.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: "smooth" });
        }
      };
      anchor.addEventListener("click", onClick);
      (anchor as any).__onClick = onClick;
    });

    // force ScrollTrigger to recalc sizes/triggers after initial setup
    if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
      ScrollTrigger.refresh();
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      // Clean up service card listeners
      document.querySelectorAll(".service-box").forEach((card) => {
        const enter = (card as any)._mouseEnter;
        const leave = (card as any)._mouseLeave;
        if (enter) card.removeEventListener("mouseenter", enter);
        if (leave) card.removeEventListener("mouseleave", leave);
      });

      // Clean up portfolio card listeners
      document.querySelectorAll(".portfolio-card").forEach((card) => {
        const enter = (card as any)._mouseEnter;
        const leave = (card as any)._mouseLeave;
        if (enter) card.removeEventListener("mouseenter", enter);
        if (leave) card.removeEventListener("mouseleave", leave);
      });

      // Clean up anchor listeners
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        const fn = (anchor as any).__onClick;
        if (fn) anchor.removeEventListener("click", fn);
      });

      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, [mounted]);

  const services = [
    {
      icon: "💎",
      title: "Custom Software Development",
      description:
        "Bespoke solutions engineered to perfection, designed specifically for your business needs.",
    },
    {
      icon: "🛒",
      title: "E-Commerce Excellence",
      description:
        "Premium online stores on Shopify & WordPress. 4+ successful launches and counting.",
    },
    {
      icon: "⚡",
      title: "Aura CRM Platform",
      description:
        "Our flagship product - a powerful CRM system that transforms customer relationships.",
    },
    {
      icon: "🌍",
      title: "Web Applications",
      description:
        "High-performance web apps with exceptional SEO, security, and lightning-fast hosting.",
    },
    {
      icon: "🔒",
      title: "Long-Term Support",
      description:
        "Dedicated 24/7 maintenance ensuring your applications perform flawlessly.",
    },
    {
      icon: "🚀",
      title: "Optimization & Debugging",
      description:
        "Expert analysis and refinement to maximize performance and eliminate issues.",
    },
  ];

  const portfolio = [
    {
      name: "Kreaz E-Commerce Platform",
      tech: "Woocommerce & Custom Dev",
      description:
        "Kreaz Store specializes in premium cakes, gateaux, baked goods, oriental sweets, fine chocolates, and handcrafted beverages.",
      image: kreazScreen,
      link: "https://kreazdesserts.com/",
      gradient: "from-[#4a9d9c] to-[#5ebcbb]",
    },
    {
      name: "Aura CRM System",
      tech: "Next.js & .NET Core",
      description:
        "Our proprietary CRM platform designed for seamless customer management and growth.",
      image: auraScreen,
      link: "https://auracrm-pi.vercel.app",
      gradient: "from-[#c4a962] to-[#d4b972]",
    },
    {
      name: "Asia Healthcare Store",
      tech: "WooCommerce & Custom Dev",
      description:
        "Asia Healthcare is a leading online retailer of health and wellness products, committed to providing quality solutions for a healthier lifestyle.",
      image: asiaScreen,
      link: "https://asiaegy.com/",
      gradient: "from-[#4a9d9c] to-[#c4a962]",
    },
    {
      name: "Tavan Gallery",
      tech: "Shopify & Custom Dev",
      description:
        "Tavan Gallery is a premier online destination for exquisite art pieces, offering a curated selection of contemporary and classic artworks to elevate any space.",
      image: tavanScreen,
      link: "https://tavangallery.com/en",
      gradient: "from-[#5ebcbb] to-[#4a9d9c]",
    },
    {
      name: "EcoMarketing",
      tech: "WordPress & Custom Dev",
      description:
        "A high-conversion marketing platform blending custom development with WordPress for peak performance and scalability.",
      image: ecoMarketingScreen,
      link: "https://ecoperformancemarketing.com/",
      gradient: "from-[#d4b972] to-[#c4a962]",
    },
    {
      name: "Saqr Sahraan E-Commerce",
      tech: "Custom Build",
      description:
        "Wordpress-based e-commerce platform for Saqr Sahraan, a leading retailer of premium outdoor and camping gear in the Middle East, offering a wide range of high-quality products for outdoor enthusiasts.",
      image: saqrScreen,
      link: "https://www.d-falcon.com/",
      gradient: "from-[#4a9d9c]/80 to-[#c4a962]/80",
    },
  ];

  const benefits = [
    {
      title: "Blazing Performance",
      description:
        "Optimized architecture delivering sub-second load times and seamless interactions.",
      metric: "99.9",
      label: "Uptime",
    },
    {
      title: "SEO Excellence",
      description:
        "Advanced optimization strategies ensuring top rankings and maximum visibility.",
      metric: "50",
      label: "Projects",
    },
    {
      title: "Fort Knox Security",
      description:
        "Military-grade encryption and security protocols protecting your valuable data.",
      metric: "100",
      label: "Secure",
    },
    {
      title: "Lightning Hosting",
      description:
        "Premium infrastructure with global CDN for instant delivery worldwide.",
      metric: "24",
      label: "Support",
    },
    {
      title: "Proven Track Record",
      description:
        "Trusted by industry leaders across multiple sectors with consistent results.",
      metric: "4",
      label: "Stores",
    },
    {
      title: "Dedicated Partnership",
      description:
        "Round-the-clock expert assistance ensuring your success every step of the way.",
      metric: "10",
      label: "Years",
    },
  ];

  if (!mounted) return null;

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-linear-to-br from-[#0a0f1a] via-[#0d1420] to-[#0a0f1a] text-white overflow-hidden"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-[#4a9d9c] rounded-full pointer-events-none z-9999 mix-blend-difference hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={cursorFollowerRef}
        className="fixed w-12 h-12 border-2 border-[#c4a962]/50 rounded-full pointer-events-none z-9999 mix-blend-difference hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Parallax Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-orb-1 absolute top-0 -left-40 w-96 h-96 bg-linear-to-br from-[#4a9d9c]/20 to-[#c4a962]/20 rounded-full blur-3xl" />
        <div className="parallax-orb-2 absolute top-60 right-0 w-125 h-125 bg-linear-to-br from-[#c4a962]/20 to-[#4a9d9c]/20 rounded-full blur-3xl" />
        <div className="parallax-orb-3 absolute bottom-0 left-1/3 w-96 h-96 bg-linear-to-br from-[#4a9d9c]/20 to-[#c4a962]/20 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div
            className="mb-8 overflow-hidden"
            style={{ perspective: "1000px" }}
          >
            <h1 className="hero-line-1 text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[1]">
              <span className="bg-linear-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Craft Digital
              </span>
            </h1>
          </div>
          <div
            className="mb-12 overflow-hidden"
            style={{ perspective: "1000px" }}
          >
            <h1 className="hero-line-2 text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="bg-linear-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>
          </div>

          <p className="hero-description text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed">
            Transforming ambitious visions into exceptional software. We
            engineer premium solutions with unparalleled performance, security,
            and elegance.
          </p>

          <div className="hero-buttons flex flex-wrap gap-6 justify-center">
            <a
              href="#portfolio"
              className="hero-btn-1 group px-10 py-4 bg-linear-to-r from-[#4a9d9c] to-[#c4a962] rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all flex items-center gap-3 relative overflow-hidden"
            >
              <span className="relative z-10">Explore Our Work</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">
                →
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
            <a
              href="#contact"
              className="hero-btn-2 px-10 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-full font-bold text-lg hover:bg-white/10 hover:border-[#4a9d9c]/50 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-linear-to-r from-[#4a9d9c]/20 to-[#c4a962]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-sm text-slate-400 uppercase tracking-widest font-semibold">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1.5">
            <div className="w-1.5 h-3 bg-linear-to-b from-[#4a9d9c] to-[#c4a962] rounded-full animate-bounce" />
          </div>
        </div> */}
      </section>

      {/* Stats Section */}
      <section className="stats-section relative py-24 px-6 border-y border-white/5 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="stat-item text-center group cursor-pointer">
              <div
                className="stat-number text-5xl md:text-6xl font-black bg-linear-to-r from-[#4a9d9c] to-[#c4a962] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform"
                data-target="50"
              >
                0
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold">
                Projects Delivered
              </div>
            </div>
            <div className="stat-item text-center group cursor-pointer">
              <div
                className="stat-number text-5xl md:text-6xl font-black bg-linear-to-r from-[#c4a962] to-[#4a9d9c] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform"
                data-target="99.9"
              >
                0
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold">
                Uptime Guarantee
              </div>
            </div>
            <div className="stat-item text-center group cursor-pointer">
              <div
                className="stat-number text-5xl md:text-6xl font-black bg-linear-to-r from-[#4a9d9c] to-[#c4a962] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform"
                data-target="24"
              >
                0
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold">
                Support Available
              </div>
            </div>
            <div className="stat-item text-center group cursor-pointer">
              <div
                className="stat-number text-5xl md:text-6xl font-black bg-linear-to-r from-[#c4a962] to-[#4a9d9c] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform"
                data-target="100"
              >
                0
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="mb-12">
          <p className="text-center text-slate-500 text-sm uppercase tracking-widest font-bold">
            Trusted by Industry Leaders
          </p>
        </div>
        <div className="relative">
          <Marquee speed={50} gradient={false} pauseOnHover>
            {[asia, aura, tavan, ecomarketing, newtoptrade, saqr, kreaz].map(
              (logo, i) => (
                <div key={i} className="mx-10">
                  <div className="inline-flex items-center self-stretch h-[170px] justify-center px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#4a9d9c]/50 transition-all">
                    <Image
                      src={logo}
                      alt="Brand Logo"
                      width={150}
                      height={50}
                    />
                  </div>
                </div>
              ),
            )}
          </Marquee>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-linear-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Comprehensive solutions engineered for the modern enterprise
            </p>
          </div>

          <div
            className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: "1000px" }}
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                className="service-box group relative bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 cursor-pointer overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#4a9d9c]/0 via-[#c4a962]/0 to-[#4a9d9c]/0 group-hover:from-[#4a9d9c]/20 group-hover:via-[#c4a962]/20 group-hover:to-[#4a9d9c]/20 transition-all duration-700" />

                <div className="relative z-10">
                  <div className="service-icon text-6xl mb-6 inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="relative py-32 px-6 bg-linear-to-b from-[#0a0f1a] via-[#0d1420]/50 to-[#0a0f1a]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-linear-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Showcasing excellence across diverse industries
            </p>
          </div>

          <div
            className="portfolio-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            style={{ perspective: "1000px" }}
          >
            {portfolio.map((project, idx) => (
              <Link
                key={idx}
                href={project.link}
                target="_blank"
                className="portfolio-card flex flex-column group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl "
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <div className="portfolio-image h-full w-full">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="relative p-8 flex flex-col flex-1">
                  <div className="text-xs text-[#4a9d9c] uppercase tracking-widest font-bold mb-3">
                    {project.tech}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                    {project.name}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#c4a962] group-hover:text-[#4a9d9c] transition-all">
                    <span className="text-sm font-bold">View Case Study</span>
                    <span className="group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/portfolio"
              className="inline-block px-10 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-full font-bold hover:bg-white/10 hover:border-[#4a9d9c]/50 transition-all hover:scale-105"
            >
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="benefits-section relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-linear-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Why Zeiia
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Excellence in every dimension of software development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="benefit-card group bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#4a9d9c]/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                      {benefit.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black bg-linear-to-r from-[#4a9d9c] to-[#c4a962] bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                      {benefit.metric}
                      {benefit.label === "Uptime" && "%"}
                      {benefit.label === "Support" && "/7"}
                      {benefit.label === "Secure" && "%"}
                      {benefit.label === "Projects" && "+"}
                      {benefit.label === "Years" && "+"}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      {benefit.label}
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact isContactVisible={true} />

      {/* CTA Section */}
      <section className="cta-section relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="cta-box relative bg-linear-to-br from-[#4a9d9c]/20 via-[#c4a962]/20 to-[#4a9d9c]/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-[#4a9d9c]/10 to-[#c4a9d9c]/10" />

            <div className="relative z-10">
              <h2 className="cta-title text-4xl md:text-6xl font-black mb-6">
                Ready to Build Something
                <span className="block bg-linear-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                  Extraordinary?
                </span>
              </h2>
              <p className="cta-text text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                Let's collaborate to create software that doesn't just meet
                expectations—it exceeds them.
              </p>
              <div className="flex flex-wrap gap-5 justify-center">
                <a
                  href="#contact"
                  className="cta-button group px-10 py-4 bg-linear-to-r from-[#4a9d9c] to-[#c4a962] rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all flex items-center gap-2 relative overflow-hidden"
                >
                  <span className="relative z-10">Schedule Consultation</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
                <a
                  href="#services"
                  className="cta-button px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:border-[#4a9d9c]/50 transition-all"
                >
                  Explore Services
                </a>
              </div>
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
