"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import logo from "@/public/logo.jpeg";
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

    // Marquee continuous animation
    const marqueeContent = document.querySelector(".marquee-content");
    if (marqueeContent) {
      const marqueeWidth = marqueeContent.scrollWidth / 2;
      gsap.to(".marquee-content", {
        x: -marqueeWidth,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }

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
      name: "Enterprise Commerce Platform",
      tech: "Shopify & Custom Backend",
      description:
        "Multi-million dollar e-commerce platform with advanced inventory management",
      image: "/projects/project1.jpg",
      link: "#",
      gradient: "from-[#4a9d9c] to-[#5ebcbb]",
    },
    {
      name: "Financial Analytics Dashboard",
      tech: "React & Node.js",
      description:
        "Real-time financial data visualization with predictive analytics",
      image: "/projects/project2.jpg",
      link: "#",
      gradient: "from-[#c4a962] to-[#d4b972]",
    },
    {
      name: "Healthcare Management System",
      tech: "Custom Solution",
      description:
        "HIPAA-compliant patient management and telemedicine platform",
      image: "/projects/project3.jpg",
      link: "#",
      gradient: "from-[#4a9d9c] to-[#c4a962]",
    },
    {
      name: "Luxury Retail Store",
      tech: "WordPress & WooCommerce",
      description: "High-conversion luxury retail experience with AR features",
      image: "/projects/project4.jpg",
      link: "#",
      gradient: "from-[#5ebcbb] to-[#4a9d9c]",
    },
    {
      name: "SaaS Project Management",
      tech: "Next.js & PostgreSQL",
      description:
        "Enterprise-grade project management with AI-powered insights",
      image: "/projects/project5.jpg",
      link: "#",
      gradient: "from-[#d4b972] to-[#c4a962]",
    },
    {
      name: "Supply Chain Platform",
      tech: "Custom Build",
      description:
        "End-to-end supply chain optimization with blockchain tracking",
      image: "/projects/project6.jpg",
      link: "#",
      gradient: "from-[#4a9d9c]/80 to-[#c4a962]/80",
    },
  ];

  const brands = [
    "TechCorp Global",
    "Innovation Labs",
    "Digital Dynamics",
    "NextGen Solutions",
    "CloudFirst Inc",
    "DataStream Pro",
    "SmartRetail Co",
    "FinanceHub",
    "HealthTech Plus",
    "EduSystems",
    "LogiChain Partners",
    "Alpha Ventures",
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

      {/* Navigation */}
      <nav className="navbar fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#0a0f1a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center hero-logo">
              <Image
                src={logo}
                alt="Zeiia Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </div>

            <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
              <a
                href="#services"
                className="text-slate-300 hover:text-[#4a9d9c] transition-colors relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#4a9d9c] to-[#c4a962] group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href="#portfolio"
                className="text-slate-300 hover:text-[#4a9d9c] transition-colors relative group"
              >
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#4a9d9c] to-[#c4a962] group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href="#why-us"
                className="text-slate-300 hover:text-[#4a9d9c] transition-colors relative group"
              >
                Why Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#4a9d9c] to-[#c4a962] group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href="#contact"
                className="text-slate-300 hover:text-[#4a9d9c] transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#4a9d9c] to-[#c4a962] group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            <a
              href="#contact"
              className="px-8 py-3 bg-linear-to-r from-[#4a9d9c] to-[#c4a962] rounded-full text-sm font-bold hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-linear-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>
        </div>
      </nav>

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
          <div className="marquee-content flex gap-16 whitespace-nowrap">
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={idx}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#4a9d9c]/50 transition-all"
              >
                <span className="text-slate-300 font-bold text-lg whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </div>
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
              <a
                key={idx}
                href={project.link}
                className="portfolio-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className={`portfolio-image absolute inset-0 bg-linear-to-br ${project.gradient}`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-8xl text-white/30 font-black">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="portfolio-overlay absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-500" />
                </div>

                {/* Project Info */}
                <div className="relative p-8">
                  <div className="text-xs text-[#4a9d9c] uppercase tracking-widest font-bold mb-3">
                    {project.tech}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                    {project.name}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#c4a962] group-hover:text-[#4a9d9c] transition-all">
                    <span className="text-sm font-bold">View Case Study</span>
                    <span className="group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </a>
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
      <section
        id="contact"
        className="contact-section relative py-32 px-6 bg-linear-to-b from-[#0a0f1a] via-[#0d1420]/30 to-[#0a0f1a]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="contact-header text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-linear-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Ready to transform your vision into reality? Let's start the
              conversation.
            </p>
          </div>

          <div className="contact-form bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-field">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-[#4a9d9c] focus:outline-none focus:ring-2 focus:ring-[#4a9d9c]/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-field">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-[#4a9d9c] focus:outline-none focus:ring-2 focus:ring-[#4a9d9c]/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-field">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-[#4a9d9c] focus:outline-none focus:ring-2 focus:ring-[#4a9d9c]/50 transition-all"
                    placeholder="Your Company"
                  />
                </div>
                <div className="form-field">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-[#4a9d9c] focus:outline-none focus:ring-2 focus:ring-[#4a9d9c]/50 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Service Interested In
                </label>
                <select className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#4a9d9c] focus:outline-none focus:ring-2 focus:ring-[#4a9d9c]/50 transition-all">
                  <option value="">Select a service</option>
                  <option value="custom">Custom Software Development</option>
                  <option value="ecommerce">E-Commerce Solutions</option>
                  <option value="crm">Aura CRM</option>
                  <option value="web">Web Applications</option>
                  <option value="support">Support & Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Project Details
                </label>
                <textarea
                  rows={6}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-[#4a9d9c] focus:outline-none focus:ring-2 focus:ring-[#4a9d9c]/50 transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="form-field">
                <button
                  type="submit"
                  className="w-full px-10 py-4 bg-linear-to-r from-[#4a9d9c] to-[#c4a9d9c] rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all hover:scale-[1.02] relative overflow-hidden group"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </div>
            </form>

            <div className="mt-12 pt-12 border-t border-white/10">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl mb-3">📧</div>
                  <div className="text-sm text-slate-500 mb-1">Email Us</div>
                  <a
                    href="mailto:info@zeiia.com"
                    className="text-[#4a9d9c] hover:text-[#c4a962] transition-colors"
                  >
                    info@zeiia.com
                  </a>
                </div>
                <div>
                  <div className="text-3xl mb-3">📱</div>
                  <div className="text-sm text-slate-500 mb-1">Call Us</div>
                  <a
                    href="tel:+15551234567"
                    className="text-[#4a9d9c] hover:text-[#c4a962] transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
                <div>
                  <div className="text-3xl mb-3">💬</div>
                  <div className="text-sm text-slate-500 mb-1">Live Chat</div>
                  <button className="text-[#4a9d9c] hover:text-[#c4a962] transition-colors">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Image
                  src={logo}
                  alt="Zeiia Logo"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                Premium software solutions crafted with precision, delivered
                with excellence.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-[#4a9d9c]/50 transition-all hover:scale-110"
                >
                  <span className="text-sm font-bold">Li</span>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-[#4a9d9c]/50 transition-all hover:scale-110"
                >
                  <span className="text-sm font-bold">Tw</span>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-[#4a9d9c]/50 transition-all hover:scale-110"
                >
                  <span className="text-sm font-bold">Gh</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Services</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    Custom Development
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    E-Commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    Aura CRM
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a
                    href="#portfolio"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    Careers
                  </a>
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
                <li className="pt-2">
                  <a
                    href="#contact"
                    className="text-[#4a9d9c] hover:text-[#c4a962] transition-colors font-semibold"
                  >
                    Get in Touch →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© 2026 Zeiia. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
