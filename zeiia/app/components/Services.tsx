"use client";

import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "Enterprise eCommerce",
      description:
        "Scalable, high-performance eCommerce platforms built on Shopify, WooCommerce, and custom solutions. Handle millions of transactions with enterprise-grade security.",
      icon: "🛒",
      features: [
        "Multi-vendor Support",
        "Payment Gateway Integration",
        "Inventory Management",
        "Analytics Dashboard",
      ],
    },
    {
      title: "Custom Software Development",
      description:
        "Bespoke enterprise applications engineered from scratch to solve your unique business challenges with precision and scalability.",
      icon: "⚡",
      features: [
        "Microservices Architecture",
        "Cloud-Native Solutions",
        "API Development",
        "Legacy Modernization",
      ],
    },
    {
      title: "WordPress Solutions",
      description:
        "Enterprise WordPress development with custom themes, plugins, and optimizations for Fortune 500 companies and high-traffic sites.",
      icon: "📝",
      features: [
        "Custom Theme Development",
        "Plugin Architecture",
        "Performance Optimization",
        "Headless CMS",
      ],
    },
    {
      title: "CRM & ERP Systems",
      description:
        "Intelligent CRM and ERP platforms that streamline operations, enhance productivity, and provide actionable business intelligence.",
      icon: "📊",
      features: [
        "Salesforce Integration",
        "Custom Workflows",
        "Automation",
        "Real-time Analytics",
      ],
    },
    {
      title: "Digital Transformation",
      description:
        "End-to-end digital transformation services that modernize your technology stack and revolutionize your business operations.",
      icon: "🔄",
      features: [
        "Cloud Migration",
        "Process Automation",
        "AI/ML Integration",
        "Change Management",
      ],
    },
    {
      title: "Enterprise Integration",
      description:
        "Seamless integration of disparate systems, APIs, and third-party services to create a unified, efficient technology ecosystem.",
      icon: "🔗",
      features: [
        "API Gateway",
        "ETL Pipelines",
        "Third-party Integration",
        "Data Synchronization",
      ],
    },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-lg mb-6">
            Enterprise-Grade <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive software services designed to scale with your business
            and drive transformative results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-luxury hover-lift group"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="heading-sm mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <svg
                      className="w-5 h-5 text-primary mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="text-primary font-semibold hover:underline inline-flex items-center group"
              >
                Learn More
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
