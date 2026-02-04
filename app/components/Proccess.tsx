"use client";
import { motion } from "framer-motion";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "Deep dive into your business goals and technical requirements",
    },
    {
      num: "02",
      title: "Design & Architecture",
      desc: "Create scalable solutions with elegant user experiences",
    },
    {
      num: "03",
      title: "Development & Testing",
      desc: "Agile development with continuous integration and testing",
    },
    {
      num: "04",
      title: "Deployment & Support",
      desc: "Seamless launch with ongoing optimization and support",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-lg mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl font-display font-bold gradient-text border-4 border-primary/30">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
