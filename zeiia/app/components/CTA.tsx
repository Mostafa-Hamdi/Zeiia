"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="heading-xl mb-8 glow-text">
            Ready to Transform Your{" "}
            <span className="gradient-text">Business?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Let's discuss how we can help you achieve your digital
            transformation goals
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-12 py-5"
            >
              Schedule Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline text-lg px-12 py-5"
            >
              View Pricing
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
