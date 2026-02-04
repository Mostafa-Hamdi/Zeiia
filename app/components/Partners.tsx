import { motion } from "framer-motion";

export default function Partners() {
  const partners = [
    "WordPress",
    "Shopify Plus",
    "Salesforce",
    "AWS",
    "Microsoft Azure",
    "Google Cloud",
    "SAP",
    "Oracle",
  ];

  return (
    <section id="partners" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Technology <span className="gradient-text">Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Certified partners with industry leaders
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="text-center text-xl font-semibold text-muted-foreground transition-all"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
