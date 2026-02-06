"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

// Import GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Contact from "../components/Contact";

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
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
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
      contact: "+20 155 558 9959",
      link: "tel:+201555589959",
      gradient: "from-[#c4a962] to-[#d4b972]",
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
    {
      question: "What types of projects do you work on?",
      answer:
        "We work on custom software development, e-commerce platforms, CRM solutions, web applications, mobile apps, and provide long-term support and maintenance services.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Yes! We work with clients worldwide and have experience collaborating across different time zones to ensure smooth communication and project delivery.",
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
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
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
            <Contact isContactVisible={false} />
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
