"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

// Import GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";

export default function AboutPage() {
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
        ".about-hero-title",
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
      )
      .fromTo(
        ".about-hero-subtitle",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.7",
      )
      .fromTo(
        ".about-hero-description",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );

    // Stats Animation
    gsap.fromTo(
      ".stat-card",
      {
        opacity: 0,
        y: 80,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 1,
      },
    );

    // Story Section Animation
    ScrollTrigger.create({
      trigger: ".story-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".story-content",
          {
            opacity: 0,
            x: -100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
          },
        );
        gsap.fromTo(
          ".story-image",
          {
            opacity: 0,
            x: 100,
            rotationY: -30,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
          },
        );
      },
    });

    // Values Animation
    ScrollTrigger.create({
      trigger: ".values-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".value-card",
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
            stagger: 0.2,
            ease: "back.out(1.4)",
          },
        );
      },
    });

    // Value Card Hover Effects
    const valueCards = document.querySelectorAll(".value-card");
    valueCards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          rotationY: 5,
          duration: 0.4,
          ease: "power2.out",
        });
        const icon = card.querySelector(".value-icon");
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
        const icon = card.querySelector(".value-icon");
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

      (card as any)._mouseEnter = handleMouseEnter;
      (card as any)._mouseLeave = handleMouseLeave;
    });

    // Team Animation
    ScrollTrigger.create({
      trigger: ".team-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".team-member",
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
        );
      },
    });

    // Team Card Hover Effects
    const teamCards = document.querySelectorAll(".team-member");
    teamCards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -15,
          duration: 0.4,
          ease: "power2.out",
        });
        const overlay = card.querySelector(".team-overlay");
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
          duration: 0.4,
          ease: "power2.out",
        });
        const overlay = card.querySelector(".team-overlay");
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

    // Timeline Animation
    ScrollTrigger.create({
      trigger: ".timeline-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".timeline-item",
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

    // Awards Animation
    ScrollTrigger.create({
      trigger: ".awards-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".award-item",
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
            stagger: 0.15,
            ease: "elastic.out(1, 0.6)",
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

      const allCards = document.querySelectorAll(".value-card, .team-member");
      allCards.forEach((card) => {
        const enter = (card as any)._mouseEnter;
        const leave = (card as any)._mouseLeave;
        if (enter) card.removeEventListener("mouseenter", enter);
        if (leave) card.removeEventListener("mouseleave", leave);
      });

      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, [mounted]);

  const stats = [
    {
      number: "10+",
      label: "Years Experience",
      icon: "🏆",
      gradient: "from-[#4a9d9c] to-[#5ebcbb]",
    },
    {
      number: "150+",
      label: "Projects Delivered",
      icon: "🚀",
      gradient: "from-[#c4a962] to-[#d4b972]",
    },
    {
      number: "50+",
      label: "Happy Clients",
      icon: "😊",
      gradient: "from-[#5ebcbb] to-[#4a9d9c]",
    },
    {
      number: "25+",
      label: "Team Members",
      icon: "👥",
      gradient: "from-[#d4b972] to-[#c4a962]",
    },
  ];

  const values = [
    {
      icon: "💡",
      title: "Innovation First",
      description:
        "We embrace cutting-edge technologies and innovative approaches to solve complex problems and deliver exceptional results.",
      gradient: "from-[#4a9d9c] to-[#5ebcbb]",
    },
    {
      icon: "🎯",
      title: "Quality Excellence",
      description:
        "Every line of code, every design element, and every interaction is crafted with meticulous attention to detail and quality.",
      gradient: "from-[#c4a962] to-[#d4b972]",
    },
    {
      icon: "🤝",
      title: "Client Partnership",
      description:
        "We build lasting relationships with our clients, working as true partners to achieve their business goals and vision.",
      gradient: "from-[#5ebcbb] to-[#4a9d9c]",
    },
    {
      icon: "⚡",
      title: "Agile Delivery",
      description:
        "Fast, iterative development with continuous feedback ensures we deliver value quickly and adapt to changing needs.",
      gradient: "from-[#d4b972] to-[#c4a962]",
    },
    {
      icon: "🔒",
      title: "Security & Privacy",
      description:
        "We prioritize data security and user privacy in every project, implementing industry best practices and compliance standards.",
      gradient: "from-[#4a9d9c]/80 to-[#c4a962]/80",
    },
    {
      icon: "🌱",
      title: "Continuous Growth",
      description:
        "We invest in our team's growth and learning, staying ahead of technology trends to deliver future-proof solutions.",
      gradient: "from-[#c4a962]/80 to-[#5ebcbb]/80",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years in tech",
      gradient: "from-[#4a9d9c] to-[#5ebcbb]",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech innovator and architecture expert",
      gradient: "from-[#c4a962] to-[#d4b972]",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "Award-winning UX/UI designer",
      gradient: "from-[#5ebcbb] to-[#4a9d9c]",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "David Park",
      role: "Lead Developer",
      bio: "Full-stack expert and mentor",
      gradient: "from-[#d4b972] to-[#c4a962]",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Lisa Anderson",
      role: "Project Manager",
      bio: "Agile champion and team coordinator",
      gradient: "from-[#4a9d9c]/80 to-[#5ebcbb]/80",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "James Wilson",
      role: "DevOps Engineer",
      bio: "Cloud infrastructure specialist",
      gradient: "from-[#c4a962]/80 to-[#d4b972]/80",
      social: { linkedin: "#", twitter: "#" },
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "Founded",
      description:
        "Zeiia was born with a vision to transform digital experiences",
      icon: "🌟",
    },
    {
      year: "2023",
      title: "First Major Client",
      description:
        "Launched our first enterprise-level platform, serving 100K+ users",
      icon: "🎯",
    },
    // {
    //   year: "2019",
    //   title: "Team Expansion",
    //   description: "Grew to 15 team members and opened our New York office",
    //   icon: "📈",
    // },
    // {
    //   year: "2021",
    //   title: "Award Recognition",
    //   description: "Received Best Software Development Agency award",
    //   icon: "🏆",
    // },
    {
      year: "2025",
      title: "Global Reach",
      description: "Expanded to London and served clients across 3 continents",
      icon: "🌍",
    },
    {
      year: "2026",
      title: "Innovation Leader",
      description: "Launched Aura CRM and achieved 150+ successful projects",
      icon: "🚀",
    },
  ];

  const awards = [
    { icon: "🏆", title: "Best Development Agency 2024" },
    { icon: "⭐", title: "Top Rated on Clutch" },
    { icon: "🎖️", title: "Innovation Excellence Award" },
    { icon: "💎", title: "Client Satisfaction Leader" },
    { icon: "🌟", title: "Outstanding Design Award" },
    { icon: "🔥", title: "Fastest Growing Company" },
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

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="about-hero-title mb-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4">
              <span className="bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                About Zeiia
              </span>
            </h1>
          </div>

          <p className="about-hero-subtitle text-2xl md:text-3xl font-bold text-slate-300 mb-6">
            Crafting Digital Excellence Since 2015
          </p>

          <p className="about-hero-description text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We're a team of passionate innovators, designers, and developers
            dedicated to transforming ideas into exceptional digital experiences
            that drive business growth.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ perspective: "1000px" }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="stat-card group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-[#4a9d9c]/50 transition-all cursor-pointer"
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

      {/* Story Section */}
      <section className="story-section relative py-16 px-6 bg-gradient-to-b from-transparent via-[#0d1420]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid lg:grid-cols-2 gap-12 items-center"
            style={{ perspective: "1000px" }}
          >
            {/* Content */}
            <div className="story-content space-y-6">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                  Our Story
                </span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Founded in 2015 by a group of tech enthusiasts who believed that
                software should be more than functional—it should be
                exceptional. We started in a small San Francisco office with a
                simple mission: to create digital solutions that make a real
                difference.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Over the years, we've grown from a scrappy startup to a trusted
                partner for businesses worldwide. Our journey has been marked by
                innovation, dedication, and an unwavering commitment to our
                clients' success.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Today, with offices across three continents and a team of 25+
                experts, we continue to push the boundaries of what's possible
                in software development. Every project we undertake is an
                opportunity to exceed expectations and deliver excellence.
              </p>
            </div>

            {/* Image Placeholder */}
            <div
              className="story-image bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden"
              style={{ transformStyle: "preserve-3d", height: "500px" }}
            >
              <div className="w-full h-full relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4a9d9c]/20 to-[#c4a962]/20" />
                <div className="relative z-10 text-center">
                  <div className="text-8xl mb-4">🚀</div>
                  <p className="text-slate-400 text-lg">Our Journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              The principles that guide everything we do
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: "1000px" }}
          >
            {values.map((value, idx) => (
              <div
                key={idx}
                className="value-card group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl`}
                />

                <div className="relative z-10">
                  <div className="value-icon text-5xl mb-6 inline-block">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="team-section relative py-16 px-6 bg-gradient-to-b from-transparent via-[#0d1420]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              The talented people behind our success
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: "1000px" }}
          >
            {team.map((member, idx) => (
              <div
                key={idx}
                className="team-member group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-30`}
                  />
                  <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#4a9d9c] to-[#c4a962] flex items-center justify-center text-5xl font-black text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="team-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity flex items-end p-6">
                    <div className="flex gap-3">
                      <a
                        href={member.social.linkedin}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#4a9d9c] transition-colors"
                      >
                        in
                      </a>
                      <a
                        href={member.social.twitter}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#4a9d9c] transition-colors"
                      >
                        𝕏
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                    {member.name}
                  </h3>
                  <p className="text-[#c4a962] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Timeline Section */}
      <section className="timeline-section relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              Milestones that shaped our story
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="timeline-item group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#4a9d9c]/50 transition-all"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="text-5xl">{item.icon}</div>
                    <div className="text-5xl font-black bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] bg-clip-text text-transparent">
                      {item.year}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      {/* <section className="awards-section relative py-16 px-6 bg-gradient-to-b from-transparent via-[#0d1420]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Awards & Recognition
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              Honored for our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="award-item group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#4a9d9c]/50 transition-all cursor-pointer text-center"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {award.icon}
                </div>
                <div className="text-sm font-semibold text-slate-300 group-hover:text-[#4a9d9c] transition-colors">
                  {award.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="cta-section relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="cta-box relative bg-gradient-to-br from-[#4a9d9c]/20 via-[#c4a962]/20 to-[#4a9d9c]/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a9d9c]/10 to-[#c4a962]/10" />

            <div className="relative z-10">
              <h2 className="cta-title text-4xl md:text-6xl font-black mb-6">
                Join Our Journey
                <span className="block bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                  Let's Create Together
                </span>
              </h2>
              <p className="cta-text text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                Whether you're looking for a development partner or want to join
                our team, we'd love to hear from you.
              </p>
              <div className="flex flex-wrap gap-5 justify-center">
                <Link
                  href="/contact"
                  className="cta-button group px-10 py-4 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all flex items-center gap-2 relative overflow-hidden"
                >
                  <span className="relative z-10">Start a Project</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <a
                  href="#careers"
                  className="cta-button px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:border-[#4a9d9c]/50 transition-all"
                >
                  View Careers
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
