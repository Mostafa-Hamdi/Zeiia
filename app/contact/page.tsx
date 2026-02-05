"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

// Import GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
        ".contact-hero-title",
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
      )
      .fromTo(
        ".contact-hero-subtitle",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.7",
      )
      .fromTo(
        ".contact-hero-description",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );

    // Contact Cards Animation
    gsap.fromTo(
      ".contact-card",
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
        delay: 1,
      },
    );

    // Contact Card Hover Effects
    const cards = document.querySelectorAll(".contact-card");
    cards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          rotationY: 5,
          duration: 0.4,
          ease: "power2.out",
        });
        const icon = card.querySelector(".contact-icon");
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
        const icon = card.querySelector(".contact-icon");
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

    // Form Animation
    gsap.fromTo(
      ".form-container",
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
        delay: 1.2,
      },
    );

    // Form Fields Animation
    gsap.fromTo(
      ".form-field",
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1.5,
      },
    );

    // Map Animation
    ScrollTrigger.create({
      trigger: ".map-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".map-container",
          {
            opacity: 0,
            scale: 0.8,
            rotationX: -45,
          },
          {
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
        );
      },
    });

    // Office Locations Animation
    ScrollTrigger.create({
      trigger: ".offices-section",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".office-card",
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
            stagger: 0.2,
            ease: "back.out(1.7)",
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

      const cards = document.querySelectorAll(".contact-card");
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitStatus("success");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    });

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us an email anytime",
      contact: "info@zeiia.com",
      link: "mailto:info@zeiia.com",
      gradient: "from-[#4a9d9c] to-[#5ebcbb]",
    },
    {
      icon: "📞",
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm",
      contact: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      gradient: "from-[#c4a962] to-[#d4b972]",
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Start chatting now",
      link: "#",
      gradient: "from-[#5ebcbb] to-[#4a9d9c]",
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Come say hello",
      contact: "123 Tech Street, SF",
      link: "#map",
      gradient: "from-[#d4b972] to-[#c4a962]",
    },
  ];

  const offices = [
    {
      city: "San Francisco",
      country: "USA",
      address: "123 Tech Street, Suite 500",
      zipcode: "CA 94102",
      phone: "+1 (555) 123-4567",
      email: "sf@zeiia.com",
      gradient: "from-[#4a9d9c]/20 to-[#5ebcbb]/20",
    },
    {
      city: "New York",
      country: "USA",
      address: "456 Innovation Ave, Floor 12",
      zipcode: "NY 10001",
      phone: "+1 (555) 987-6543",
      email: "ny@zeiia.com",
      gradient: "from-[#c4a962]/20 to-[#d4b972]/20",
    },
    {
      city: "London",
      country: "UK",
      address: "789 Digital Lane, Unit 3A",
      zipcode: "EC1A 1BB",
      phone: "+44 20 1234 5678",
      email: "london@zeiia.com",
      gradient: "from-[#5ebcbb]/20 to-[#4a9d9c]/20",
    },
  ];

  const faqs = [
    {
      question: "What is your response time?",
      answer:
        "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes! We offer a free 30-minute consultation to discuss your project requirements and how we can help achieve your goals.",
    },
    {
      question: "What information should I include in my inquiry?",
      answer:
        "Please include your project goals, timeline, budget range, and any specific requirements. The more details you provide, the better we can assist you.",
    },
    {
      question: "Can I schedule a meeting?",
      answer:
        "Absolutely! After submitting your inquiry, we'll reach out to schedule a convenient time for a call or in-person meeting.",
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

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-32">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="contact-hero-title mb-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4">
              <span className="bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
          </div>

          <p className="contact-hero-subtitle text-2xl md:text-3xl font-bold text-slate-300 mb-6">
            Let's Build Something Amazing Together
          </p>

          <p className="contact-hero-description text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear about it. Reach out and
            let's discuss how we can help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ perspective: "1000px" }}
          >
            {contactMethods.map((method, idx) => (
              <a
                key={idx}
                href={method.link}
                className="contact-card group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 cursor-pointer text-center hover:border-[#4a9d9c]/50 transition-all"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl`}
                />

                <div className="relative z-10">
                  <div className="contact-icon text-5xl mb-4 inline-block">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                    {method.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="text-[#4a9d9c] font-semibold text-sm">
                    {method.contact}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="contact-form" className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid lg:grid-cols-2 gap-12"
            style={{ perspective: "1000px" }}
          >
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  <span className="bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] bg-clip-text text-transparent">
                    Let's Talk About Your Project
                  </span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Fill out the form and our team will get back to you within 24
                  hours. We're excited to learn about your project and explore
                  how we can help you succeed.
                </p>
              </div>

              <div className="space-y-6">
                <div className="contact-card group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#4a9d9c]/50 transition-all">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    Quick Response
                  </h3>
                  <p className="text-slate-400">
                    We respond to all inquiries within 24 hours during business
                    days.
                  </p>
                </div>

                <div className="contact-card group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#4a9d9c]/50 transition-all">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    Tailored Solutions
                  </h3>
                  <p className="text-slate-400">
                    Every project is unique. We create custom solutions that fit
                    your specific needs.
                  </p>
                </div>

                <div className="contact-card group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#4a9d9c]/50 transition-all">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    Confidential
                  </h3>
                  <p className="text-slate-400">
                    Your information is safe with us. We respect your privacy
                    and protect your data.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="form-container bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2 text-slate-300"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#4a9d9c] transition-colors text-white placeholder-slate-500"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-2 text-slate-300"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#4a9d9c] transition-colors text-white placeholder-slate-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-field">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold mb-2 text-slate-300"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#4a9d9c] transition-colors text-white placeholder-slate-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold mb-2 text-slate-300"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#4a9d9c] transition-colors text-white placeholder-slate-500"
                    placeholder="Your Company"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label
                      htmlFor="service"
                      className="block text-sm font-semibold mb-2 text-slate-300"
                    >
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#4a9d9c] transition-colors text-white"
                    >
                      <option value="" className="bg-[#0d1420]">
                        Select a service
                      </option>
                      <option value="custom" className="bg-[#0d1420]">
                        Custom Software Development
                      </option>
                      <option value="ecommerce" className="bg-[#0d1420]">
                        E-Commerce Solutions
                      </option>
                      <option value="crm" className="bg-[#0d1420]">
                        Aura CRM Platform
                      </option>
                      <option value="web" className="bg-[#0d1420]">
                        Web Application
                      </option>
                      <option value="mobile" className="bg-[#0d1420]">
                        Mobile App Development
                      </option>
                      <option value="maintenance" className="bg-[#0d1420]">
                        Maintenance & Support
                      </option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label
                      htmlFor="budget"
                      className="block text-sm font-semibold mb-2 text-slate-300"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#4a9d9c] transition-colors text-white"
                    >
                      <option value="" className="bg-[#0d1420]">
                        Select budget range
                      </option>
                      <option value="<5k" className="bg-[#0d1420]">
                        Less than $5,000
                      </option>
                      <option value="5k-10k" className="bg-[#0d1420]">
                        $5,000 - $10,000
                      </option>
                      <option value="10k-25k" className="bg-[#0d1420]">
                        $10,000 - $25,000
                      </option>
                      <option value="25k-50k" className="bg-[#0d1420]">
                        $25,000 - $50,000
                      </option>
                      <option value="50k+" className="bg-[#0d1420]">
                        $50,000+
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2 text-slate-300"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#4a9d9c] transition-colors text-white placeholder-slate-500 resize-none"
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-field w-full py-4 bg-gradient-to-r from-[#4a9d9c] to-[#c4a962] rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#4a9d9c]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c4a962] to-[#4a9d9c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>

                {submitStatus === "success" && (
                  <div className="form-field bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
                    <p className="text-green-400 font-semibold">
                      ✓ Message sent successfully! We'll be in touch soon.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="offices-section relative py-16 px-6 bg-gradient-to-b from-transparent via-[#0d1420]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#4a9d9c] via-white to-[#c4a962] bg-clip-text text-transparent">
                Our Offices
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              Visit us at one of our locations worldwide
            </p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8"
            style={{ perspective: "1000px" }}
          >
            {offices.map((office, idx) => (
              <div
                key={idx}
                className="office-card group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-[#4a9d9c]/50 transition-all"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${office.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`}
                />

                <div className="relative z-10">
                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4a9d9c] group-hover:to-[#c4a962] group-hover:bg-clip-text transition-all">
                    {office.city}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    {office.country}
                  </p>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-[#4a9d9c]">📍</span>
                      <div>
                        <div className="text-slate-300">{office.address}</div>
                        <div className="text-slate-400">{office.zipcode}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#4a9d9c]">📞</span>
                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="text-slate-300 hover:text-[#4a9d9c] transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#4a9d9c]">📧</span>
                      <a
                        href={`mailto:${office.email}`}
                        className="text-slate-300 hover:text-[#4a9d9c] transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="map-section relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="map-container bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
            style={{ transformStyle: "preserve-3d", height: "500px" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-slate-400 text-lg">
                  Interactive map coming soon
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  San Francisco • New York • London
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              Quick answers to common questions
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
    </div>
  );
}
