"use client";

import { motion } from "framer-motion";

export default function Technologies() {
  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "AWS", category: "Cloud" },
    { name: "Azure", category: "Cloud" },
    { name: "WordPress", category: "CMS" },
    { name: "Shopify", category: "eCommerce" },
    { name: "Salesforce", category: "CRM" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Docker", category: "DevOps" },
  ];

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Powered by <span className="gradient-text">Cutting-Edge</span>{" "}
            Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We leverage the latest technologies and frameworks to build robust,
            scalable solutions
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex space-x-8"
            >
              {[...techStack, ...techStack].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 card-luxury min-w-[200px] text-center"
                >
                  <div className="text-4xl mb-3">💻</div>
                  <h3 className="font-semibold text-lg mb-1">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tech.category}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
