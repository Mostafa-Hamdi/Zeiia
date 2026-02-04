"use client";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            World-Class <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our team of 200+ expert engineers, designers, and consultants across
            15 countries delivers excellence for Fortune 500 companies
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {["150+ Engineers", "30+ Designers", "20+ Consultants"].map(
            (stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-luxury text-center"
              >
                <div className="text-5xl font-display font-bold gradient-text mb-4">
                  {stat.split(" ")[0]}
                </div>
                <p className="text-xl">{stat.split(" ").slice(1).join(" ")}</p>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
