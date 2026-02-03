"use client";

import { motion } from "framer-motion";

export default function Portfolio() {
  const projects = [
    {
      title: "Global Retail Platform",
      category: "eCommerce",
      description:
        "Multi-region eCommerce platform serving 50M+ users with 99.99% uptime",
      image: "🌐",
      metrics: ["$500M+ Revenue", "50M Users", "15 Countries"],
      tech: ["Next.js", "Shopify Plus", "AWS"],
    },
    {
      title: "Healthcare Management System",
      category: "Enterprise Software",
      description:
        "HIPAA-compliant platform managing 2M patient records across 200+ facilities",
      image: "🏥",
      metrics: ["2M Records", "200+ Facilities", "99.9% Uptime"],
      tech: ["React", "Node.js", "PostgreSQL"],
    },
    {
      title: "Financial Services Portal",
      category: "Custom Development",
      description:
        "Secure banking platform processing $10B+ in transactions annually",
      image: "💰",
      metrics: ["$10B+ Processed", "PCI Compliant", "Real-time"],
      tech: ["Angular", "Java", "Oracle"],
    },
    {
      title: "Enterprise CRM Solution",
      category: "CRM Systems",
      description:
        "Custom Salesforce implementation for Fortune 100 manufacturing company",
      image: "📈",
      metrics: ["10K+ Users", "500K Leads", "AI-Powered"],
      tech: ["Salesforce", "Python", "Einstein AI"],
    },
    {
      title: "Media Streaming Platform",
      category: "WordPress",
      description:
        "High-traffic WordPress platform serving 100M monthly video views",
      image: "🎬",
      metrics: ["100M Views/mo", "5M Subscribers", "CDN Optimized"],
      tech: ["WordPress", "React", "Cloudflare"],
    },
    {
      title: "Supply Chain Automation",
      category: "Digital Transformation",
      description: "IoT-enabled supply chain system reducing costs by 40%",
      image: "📦",
      metrics: ["40% Cost Reduction", "1000+ Locations", "Real-time Tracking"],
      tech: ["IoT", "Azure", "Power BI"],
    },
  ];

  return (
    <section id="portfolio" className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-lg mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proven track record delivering enterprise solutions for industry
            leaders worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-luxury hover-lift group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="badge text-xs">{project.category}</span>
              </div>

              <div className="text-7xl mb-6">{project.image}</div>

              <h3 className="heading-sm mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="text-xs px-3 py-1 bg-primary/10 rounded-full text-primary font-semibold"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-primary">View All Projects</button>
        </motion.div>
      </div>
    </section>
  );
}
