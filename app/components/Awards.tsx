"use client";
import { motion } from "framer-motion";

export default function Awards() {
  const awards = [
    {
      year: "2025",
      title: "Best Enterprise Software Provider",
      org: "Tech Excellence Awards",
    },
    {
      year: "2024",
      title: "Top 10 Software Development Companies",
      org: "Global Business Review",
    },
    {
      year: "2024",
      title: "Innovation in Digital Transformation",
      org: "Digital Leaders Summit",
    },
    {
      year: "2023",
      title: "Best eCommerce Solution Provider",
      org: "eCommerce Awards",
    },
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Awards & <span className="gradient-text">Recognition</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card-luxury text-center"
            >
              <div className="text-5xl mb-4">🏆</div>
              <div className="text-3xl font-display font-bold gradient-text mb-2">
                {award.year}
              </div>
              <h3 className="font-semibold mb-2">{award.title}</h3>
              <p className="text-sm text-muted-foreground">{award.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
