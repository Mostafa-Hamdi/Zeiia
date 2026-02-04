"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.jpeg";

// Import GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);

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

    // Hero Section Animation
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl
      .fromTo(
        ".portfolio-hero-title",
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
      )
      .fromTo(
        ".portfolio-hero-subtitle",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.7",
      )
      .fromTo(
        ".portfolio-hero-description",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );

    // Filter Buttons Animation
    gsap.fromTo(
      ".filter-button",
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1,
      },
    );

    // Portfolio Cards Animation
    gsap.fromTo(
      ".portfolio-card",
      {
        opacity: 0,
        y: 100,
        rotationX: -45,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "start",
        },
        ease: "back.out(1.4)",
        delay: 1.2,
      },
    );

    // Portfolio Card Hover Effects
    const cards = document.querySelectorAll(".portfolio-card");
    cards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -15,
          rotationY: 5,
          duration: 0.4,
          ease: "power2.out",
        });
        const overlay = card.querySelector(".card-overlay");
        if (overlay) {
          gsap.to(overlay, {
            opacity: 1,
            duration: 0.4,
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        const overlay = card.querySelector(".card-overlay");
        if (overlay) {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.4,
          });
        }
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      (card as any)._mouseEnter = handleMouseEnter;
      (card as any)._mouseLeave = handleMouseLeave;
    });

    // Stats Animation
    ScrollTrigger.create({
      trigger: ".stats-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".stat-item",
          {
            opacity: 0,
            y: 60,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
        );
      },
    });

    // Testimonials Animation
    ScrollTrigger.create({
      trigger: ".testimonials-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".testimonial-card",
          {
            opacity: 0,
            x: (index: number) => (index % 2 === 0 ? -100 : 100),
            rotationY: -45,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
          },
        );
      },
    });

    // CTA Section
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
      y: 400,
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
      y: -300,
      rotation: -180,
      ease: "none",
    });

    // Navbar Hide/Show
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

    if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
      ScrollTrigger.refresh();
    }

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);

      const cards = document.querySelectorAll(".portfolio-card");
      cards.forEach((card) => {
        const enter = (card as any)._mouseEnter;
        const leave = (card as any)._mouseLeave;
        if (enter) card.removeEventListener("mouseenter", enter);
        if (leave) card.removeEventListener("mouseleave", leave);
      });

      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, [mounted]);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "ecommerce", name: "E-Commerce" },
    { id: "crm", name: "CRM Solutions" },
    { id: "custom", name: "Custom Software" },
  ];

  const projects = [
    {
      id: 1,
      title: "Aura CRM Platform",
      category: "crm",
      description:
        "Comprehensive customer relationship management system with advanced analytics and automation capabilities.",
      image: "/portfolio/aura-crm.jpg",
      tags: ["React", "Node.js", "PostgreSQL", "AWS"],
      gradient: "from-[#4a9d9c] to-[#5ebcbb]",
      stats: { users: "10K+", satisfaction: "98%", uptime: "99.9%" },
      year: "2025",
    },
    {
      id: 2,
      title: "LuxeStore E-Commerce",
      category: "ecommerce",
      description:
        "High-end fashion e-commerce platform with AI-powered recommendations and seamless checkout experience.",
      image: "/portfolio/luxestore.jpg",
      tags: ["Shopify", "React", "Stripe", "AI/ML"],
      gradient: "from-[#c4a962] to-[#d4b972]",
      stats: { revenue: "$2M+", conversion: "4.2%", customers: "25K+" },
      year: "2025",
    },
    {
      id: 3,
      title: "HealthTrack Mobile",
      category: "mobile",
      description:
        "Cross-platform health and fitness tracking app with real-time sync and personalized workout plans.",
      image: "/portfolio/healthtrack.jpg",
      tags: ["React Native", "Firebase", "HealthKit"],
      gradient: "from-[#4a9d9c] to-[#c4a962]",
      stats: { downloads: "50K+", rating: "4.8★", retention: "85%" },
      year: "2024",
    },
    {
      id: 4,
      title: "FinanceHub Dashboard",
      category: "web",
      description:
        "Real-time financial analytics dashboard for investment firms with advanced charting and reporting.",
      image: "/portfolio/financehub.jpg",
      tags: ["Next.js", "D3.js", "Python", "Redis"],
      gradient: "from-[#5ebcbb] to-[#4a9d9c]",
      stats: { dataPoints: "1M+/day", latency: "<100ms", clients: "50+" },
      year: "2024",
    },
    {
      id: 5,
      title: "EduConnect Platform",
      category: "web",
      description:
        "Online learning management system connecting students with educators through interactive virtual classrooms.",
      image: "/portfolio/educonnect.jpg",
      tags: ["React", "WebRTC", "MongoDB", "AWS"],
      gradient: "from-[#d4b972] to-[#c4a962]",
      stats: { students: "100K+", courses: "5K+", completion: "92%" },
      year: "2024",
    },
    {
      id: 6,
      title: "LogiTrack System",
      category: "custom",
      description:
        "Enterprise logistics and supply chain management system with real-time tracking and route optimization.",
      image: "/portfolio/logitrack.jpg",
      tags: ["Python", "Django", "PostgreSQL", "Docker"],
      gradient: "from-[#4a9d9c]/80 to-[#c4a962]/80",
      stats: { shipments: "500K+", efficiency: "+35%", warehouses: "200+" },
      year: "2024",
    },
    {
      id: 7,
      title: "SocialBuzz App",
      category: "mobile",
      description:
        "Social networking mobile app with video sharing, live streaming, and AI-powered content moderation.",
      image: "/portfolio/socialbuzz.jpg",
      tags: ["Flutter", "Firebase", "TensorFlow", "GCP"],
      gradient: "from-[#c4a962] to-[#4a9d9c]",
      stats: { users: "200K+", engagement: "45min/day", posts: "1M+" },
      year: "2023",
    },
    {
      id: 8,
      title: "RestaurantPro POS",
      category: "custom",
      description:
        "Point-of-sale system for restaurants with inventory management, table reservations, and kitchen display.",
      image: "/portfolio/restaurantpro.jpg",
      tags: ["React", "Node.js", "MySQL", "Electron"],
      gradient: "from-[#5ebcbb] to-[#d4b972]",
      stats: { restaurants: "500+", orders: "2M+", speed: "30% faster" },
      year: "2023",
    },
    {
      id: 9,
      title: "TravelMate Booking",
      category: "ecommerce",
      description:
        "Travel booking platform with flight, hotel, and car rental aggregation from multiple providers.",
      image: "/portfolio/travelmate.jpg",
      tags: ["Next.js", "GraphQL", "Stripe", "AWS"],
      gradient: "from-[#4a9d9c] to-[#d4b972]",
      stats: { bookings: "100K+", destinations: "500+", savings: "25% avg" },
      year: "2023",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechVision Inc.",
      company: "TechVision",
      text: "Zeiia transformed our vision into reality. Their Aura CRM platform has increased our productivity by 40% and our team absolutely loves it.",
      rating: 5,
      gradient: "from-[#4a9d9c]/20 to-[#5ebcbb]/20",
    },
    {
      name: "Michael Rodriguez",
      role: "Founder, LuxeStore",
      company: "LuxeStore",
      text: "The e-commerce platform they built exceeded all expectations. Our conversion rate doubled within the first month of launch.",
      rating: 5,
      gradient: "from-[#c4a962]/20 to-[#d4b972]/20",
    },
    {
      name: "Emily Watson",
      role: "CTO, FinanceHub",
      company: "FinanceHub",
      text: "Outstanding technical expertise and project management. They delivered a complex financial dashboard ahead of schedule and under budget.",
      rating: 5,
      gradient: "from-[#4a9d9c]/20 to-[#c4a962]/20",
    },
  ];

  const stats = [
    {
      number: "150+",
      label: "Projects Completed",
      icon: "🚀",
      gradient: "from-[#4a9d9c] to-[#5ebcbb]",
    },
    {
      number: "95%",
      label: "Client Satisfaction",
      icon: "⭐",
      gradient: "from-[#c4a962] to-[#d4b972]",
    },
    {
      number: "50+",
      label: "Active Clients",
      icon: "🤝",
      gradient: "from-[#5ebcbb] to-[#4a9d9c]",
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: "💬",
      gradient: "from-[#d4b972] to-[#c4a962]",
    },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory,
  );

  if (!mounted) return null;

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1420] to-[#0a0f1a] text-white overflow-x-hidden"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-[#4a9d9c] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={cursorFollowerRef}
        className="fixed w-12 h-12 border-2 border-[#c4a962]/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Parallax Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-orb-1 absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-[#4a9d9c]/20 to-[#c4a962]/20 rounded-full blur-3xl" />
        <div className="parallax-orb-2 absolute top-60 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#c4a962]/20 to-[#4a9d9c]/20 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="navbar fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#0a0f1a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Zeiia Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
              <Link
                href="/"
                className="text-slate-300 hover:text-[#4a9d9c] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-slate-300 hover:text-[#4a9d9c] transition-colors"
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className="text-[#4a9d9c] font-bold relative group"
              >
                Portfolio
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962]" />
              </Link>
              <Link
                href="/#contact"
                className="text-slate-300 hover:text-[#4a9d9c] transition-colors"
              >
                Contact
              </Link>
            </div>

            <Link
              href="/#contact"
              className="px-8 py-3 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] rounded-full text-sm font-bold hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="portfolio-hero-title mb-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4">
              <span className="bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </h1>
          </div>

          <p className="portfolio-hero-subtitle text-2xl md:text-3xl font-bold text-slate-300 mb-6">
            Showcasing Excellence in Every Project
          </p>

          <p className="portfolio-hero-description text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of successful projects that have
            transformed businesses and delighted users across industries.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ perspective: "1000px" }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="stat-item group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-[#4a9d9c]/50 transition-all cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div
                  className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                >
                  {stat.number}
                </div>
                <div className="text-slate-400 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`filter-button px-8 py-3 rounded-full font-bold transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] shadow-lg shadow-[#4a9d9c]/30"
                    : "bg-white/10 hover:bg-white/20 border border-white/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: "1000px" }}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="portfolio-card group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => setSelectedProject(project.id)}
              >
                {/* Project Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`}
                  />
                  <div className="text-6xl opacity-50">{project.tags[0]}</div>

                  {/* Overlay */}
                  <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity flex items-end p-6">
                    <div className="text-sm font-bold text-white">
                      View Project →
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#c4a962]">
                      {project.year}
                    </span>
                    <span className="text-xs px-3 py-1 bg-white/10 rounded-full">
                      {categories.find((c) => c.id === project.category)?.name}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-white/10">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm font-black text-[#4a9d9c]">
                          {value}
                        </div>
                        <div className="text-xs text-slate-500 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 bg-white/5 rounded-full text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section relative py-16 px-6 bg-gradient-to-b from-transparent via-[#0d1420]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Client Testimonials
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Hear what our clients say about working with us
            </p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8"
            style={{ perspective: "1000px" }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="testimonial-card group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-[#4a9d9c]/50 transition-all"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`}
                />

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-2xl text-[#c4a962]">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a9d9c] to-[#c4a962] flex items-center justify-center text-2xl font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="cta-box relative bg-gradient-to-br from-[#4a9d9c]/20 via-[#c4a962]/20 to-[#4a9d9c]/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a9d9c]/10 to-[#c4a962]/10" />

            <div className="relative z-10">
              <h2 className="cta-title text-4xl md:text-6xl font-black mb-6">
                Ready to Start Your
                <span className="block bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                  Next Project?
                </span>
              </h2>
              <p className="cta-text text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                Let's collaborate to bring your vision to life with our proven
                expertise and dedication to excellence.
              </p>
              <div className="flex flex-wrap gap-5 justify-center">
                <Link
                  href="/#contact"
                  className="cta-button group px-10 py-4 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all flex items-center gap-2 relative overflow-hidden"
                >
                  <span className="relative z-10">Start Your Project</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <Link
                  href="/services"
                  className="cta-button px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:border-[#4a9d9c]/50 transition-all"
                >
                  View Services
                </Link>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Image
                  src={logo}
                  alt="Zeiia Logo"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Premium software solutions crafted with precision, delivered
                with excellence.
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
                    href="/#contact"
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
    </div>
  );
}
