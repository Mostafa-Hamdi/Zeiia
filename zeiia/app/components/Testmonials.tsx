"use client";
import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, Global Retail Corp",
      quote:
        "Zeiia transformed our eCommerce platform, resulting in a 45% increase in conversions. Their enterprise-grade solution handles our scale flawlessly.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "VP Engineering, HealthTech Inc",
      quote:
        "The team delivered a HIPAA-compliant solution ahead of schedule. Their expertise in healthcare technology is unmatched.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "CEO, FinanceFirst",
      quote:
        "Outstanding work on our banking platform. Zeiia understands enterprise security and compliance like no other.",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-lg mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card-luxury"
            >
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg mb-6 italic">"{t.quote}"</p>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
