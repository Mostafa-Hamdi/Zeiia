"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.jpeg";

// Import GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesPage() {
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

    // Hero Section Animation - trigger after mount
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl
      .fromTo(
        ".services-hero-title",
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
      )
      .fromTo(
        ".services-hero-subtitle",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.7",
      )
      .fromTo(
        ".services-hero-description",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );

    // Service Cards Animation
    // Main Services Animation (AUTO on page load)
    gsap.fromTo(
      ".main-service-card",
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
        delay: 0.8, // waits until hero finishes
      },
    );

    // Service Cards Hover Effects
    const cards = document.querySelectorAll(".main-service-card");
    cards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          rotationY: 5,
          duration: 0.4,
          ease: "power2.out",
        });
        const icon = card.querySelector(".service-icon-large");
        if (icon) {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.4,
            ease: "back.out(1.7)",
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
        const icon = card.querySelector(".service-icon-large");
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      // Store handlers for cleanup
      (card as any)._mouseEnter = handleMouseEnter;
      (card as any)._mouseLeave = handleMouseLeave;
    });

    // Process Steps Animation
    ScrollTrigger.create({
      trigger: ".process-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".process-step",
          {
            opacity: 0,
            x: (index: number) => (index % 2 === 0 ? -100 : 100),
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
        );
      },
    });

    // Technologies Animation
    ScrollTrigger.create({
      trigger: ".technologies-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".tech-item",
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: {
              amount: 1.2,
              from: "random",
            },
            ease: "elastic.out(1, 0.6)",
          },
        );
      },
    });

    // Pricing Cards Animation
    ScrollTrigger.create({
      trigger: ".pricing-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".pricing-card",
          {
            opacity: 0,
            y: 120,
            rotationX: -60,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "back.out(1.5)",
          },
        );
      },
    });

    // FAQ Animation
    ScrollTrigger.create({
      trigger: ".faq-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".faq-item",
          {
            opacity: 0,
            x: -60,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
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

    // force ScrollTrigger to recalc sizes/triggers after initial setup
    if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
      ScrollTrigger.refresh();
    }

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);

      const cards = document.querySelectorAll(".main-service-card");
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

  const mainServices = [
    {
      icon: "💎",
      title: "Custom Software Development",
      description:
        "Transform your unique business requirements into powerful, scalable software solutions. We build from the ground up with cutting-edge technologies.",
      features: [
        "Enterprise Applications",
        "API Development & Integration",
        "Cloud-Native Solutions",
        "Microservices Architecture",
      ],
      gradient: "from-[#4a9d9c] to-[#5ebcbb]",
    },
    {
      icon: "🛒",
      title: "E-Commerce Solutions",
      description:
        "Launch your online store with platforms designed to convert. Seamless shopping experiences on Shopify, WordPress, and custom platforms.",
      features: [
        "Shopify Store Setup",
        "WooCommerce Development",
        "Payment Gateway Integration",
        "Inventory Management",
      ],
      gradient: "from-[#c4a962] to-[#d4b972]",
    },
    {
      icon: "⚡",
      title: "Aura CRM Platform",
      description:
        "Our flagship product - a comprehensive CRM system that revolutionizes how you manage customer relationships and drive growth.",
      features: [
        "Customer Management",
        "Sales Pipeline Tracking",
        "Analytics & Reporting",
        "Marketing Automation",
      ],
      gradient: "from-[#4a9d9c] to-[#c4a962]",
    },
    {
      icon: "🌍",
      title: "Web Application Development",
      description:
        "High-performance web applications built with modern frameworks. SEO-optimized, secure, and blazing fast on premium infrastructure.",
      features: [
        "Progressive Web Apps",
        "Single Page Applications",
        "SEO Optimization",
        "Performance Tuning",
      ],
      gradient: "from-[#5ebcbb] to-[#4a9d9c]",
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android devices.",
      features: [
        "iOS & Android Apps",
        "React Native Development",
        "App Store Deployment",
        "Push Notifications",
      ],
      gradient: "from-[#d4b972] to-[#c4a962]",
    },
    {
      icon: "🔒",
      title: "Maintenance & Support",
      description:
        "24/7 dedicated support ensuring your applications run flawlessly. Proactive monitoring, updates, and performance optimization.",
      features: [
        "24/7 Monitoring",
        "Security Updates",
        "Performance Optimization",
        "Bug Fixes & Updates",
      ],
      gradient: "from-[#4a9d9c]/80 to-[#c4a962]/80",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description:
        "We dive deep into your business needs, goals, and challenges to create a comprehensive project roadmap.",
      icon: "🔍",
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description:
        "Our designers craft intuitive interfaces and interactive prototypes to visualize the end product.",
      icon: "🎨",
    },
    {
      number: "03",
      title: "Development & Testing",
      description:
        "Agile development with continuous testing ensures quality, security, and performance at every stage.",
      icon: "⚙️",
    },
    {
      number: "04",
      title: "Deployment & Launch",
      description:
        "Seamless deployment to production with zero downtime, comprehensive documentation, and training.",
      icon: "🚀",
    },
    {
      number: "05",
      title: "Support & Optimization",
      description:
        "Ongoing support, monitoring, and optimization to ensure peak performance and user satisfaction.",
      icon: "📈",
    },
  ];

  const technologies = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "🟢" },
    { name: "Python", icon: "🐍" },
    { name: "TypeScript", icon: "📘" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MongoDB", icon: "🍃" },
    { name: "AWS", icon: "☁️" },
    { name: "Docker", icon: "🐳" },
    { name: "Kubernetes", icon: "☸️" },
    { name: "GraphQL", icon: "◈" },
    { name: "Redis", icon: "🔴" },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$2,500",
      duration: "per project",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 5 pages/screens",
        "Responsive design",
        "Basic SEO optimization",
        "1 month support",
        "Source code delivery",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$7,500",
      duration: "per project",
      description: "Ideal for growing businesses",
      features: [
        "Up to 15 pages/screens",
        "Advanced functionality",
        "E-commerce integration",
        "3 months support",
        "Analytics integration",
        "Premium hosting setup",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "contact us",
      description: "For large-scale projects",
      features: [
        "Unlimited pages/screens",
        "Custom integrations",
        "Advanced security",
        "12 months support",
        "Dedicated team",
        "SLA guarantee",
        "Priority support",
      ],
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our discovery phase.",
    },
    {
      question: "Do you provide ongoing maintenance?",
      answer:
        "Yes! We offer comprehensive maintenance packages including 24/7 monitoring, security updates, performance optimization, and feature enhancements.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "We specialize in modern web technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS. We choose the best tech stack for your specific needs.",
    },
    {
      question: "Can you work with our existing systems?",
      answer:
        "Absolutely! We excel at integrating with existing systems, APIs, and databases. We can modernize legacy systems or build complementary solutions.",
    },
    {
      question: "What is your payment structure?",
      answer:
        "We typically work with milestone-based payments: 30% upfront, 40% at mid-project, and 30% upon completion. Custom arrangements are available for enterprise clients.",
    },
  ];

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
                className="text-[#4a9d9c] font-bold relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962]" />
              </Link>
              <Link
                href="/#portfolio"
                className="text-slate-300 hover:text-[#4a9d9c] transition-colors"
              >
                Portfolio
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
          <div className="services-hero-title mb-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4">
              <span className="bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Our Services
              </span>
            </h1>
          </div>

          <p className="services-hero-subtitle text-2xl md:text-3xl font-bold text-slate-300 mb-6">
            Comprehensive Solutions for Modern Businesses
          </p>

          <p className="services-hero-description text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            From concept to deployment, we deliver exceptional software
            solutions that drive growth, efficiency, and innovation for your
            business.
          </p>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="relative py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="main-services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: "1000px" }}
          >
            {mainServices.map((service, idx) => (
              <div
                key={idx}
                className="main-service-card group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 cursor-pointer overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
                />

                <div className="relative z-10">
                  <div className="service-icon-large text-6xl mb-6 inline-block">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <span className="text-[#4a9d9c]">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 mt-6 text-[#c4a962] group-hover:text-[#4a9d9c] transition-colors font-semibold"
                  >
                    <span>Learn More</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section relative py-16  px-6 bg-gradient-to-b from-transparent via-[#0d1420]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Our Process
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A proven methodology that ensures quality and success
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="process-step group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#4a9d9c]/50 transition-all"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="text-6xl">{step.icon}</div>
                    <div className="text-6xl font-black bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] bg-clip-text text-transparent">
                      {step.number}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="technologies-section relative py-16  px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Technologies We Use
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Cutting-edge tools and frameworks to build exceptional software
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="tech-item group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#4a9d9c]/50 transition-all cursor-pointer text-center"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <div className="text-sm font-semibold text-slate-300 group-hover:text-[#4a9d9c] transition-colors">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section relative py-16  px-6 bg-gradient-to-b from-transparent via-[#0d1420]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Flexible packages tailored to your project size and needs
            </p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8"
            style={{ perspective: "1000px" }}
          >
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`pricing-card group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border ${
                  plan.highlighted
                    ? "border-[#4a9d9c] scale-105"
                    : "border-white/10"
                } rounded-3xl p-8 hover:border-[#4a9d9c]/50 transition-all cursor-pointer`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="text-5xl font-black bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] bg-clip-text text-transparent mb-2">
                    {plan.price}
                  </div>
                  <div className="text-slate-500 text-sm">{plan.duration}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <span className="text-[#4a9d9c] text-xl">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/#contact"
                  className={`block w-full py-4 text-center rounded-full font-bold transition-all ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] hover:shadow-2xl hover:shadow-[#4a9d9c]/50"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section relative py-16  px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to know about our services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="faq-item group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#4a9d9c]/50 transition-all"
              >
                <h3 className="text-xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                  {faq.question}
                </h3>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
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
      <footer className="relative border-t border-white/5 py-16   px-6">
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
                    href="/#portfolio"
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
                  <a
                    href="#"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    Custom Development
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    E-Commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    Web Applications
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#4a9d9c] transition-colors"
                  >
                    Mobile Apps
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
