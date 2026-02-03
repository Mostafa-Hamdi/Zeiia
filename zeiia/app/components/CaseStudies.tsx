"use client";
import { motion } from "framer-motion";

export default function CaseStudies() {
  const cases = [
    {
      company: "Fortune 500 Retailer",
      industry: "Retail",
      challenge: "40% cart abandonment, slow checkout process",
      solution:
        "Rebuilt checkout flow with one-click payments and AI recommendations",
      results: [
        "60% reduction in cart abandonment",
        "45% increase in conversion",
        "$200M additional revenue",
      ],
    },
    {
      company: "Healthcare Provider Network",
      industry: "Healthcare",
      challenge: "Fragmented patient data across 200+ facilities",
      solution: "Unified patient management system with HIPAA compliance",
      results: [
        "Unified 2M patient records",
        "70% faster data access",
        "Zero compliance issues",
      ],
    },
  ];

  return (
    <section id="case-studies" className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-lg mb-6">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real partnerships
          </p>
        </motion.div>
        <div className="space-y-12">
          {cases.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-luxury"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="badge mb-4">{cs.industry}</div>
                  <h3 className="heading-sm mb-4">{cs.company}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">
                        Challenge
                      </h4>
                      <p className="text-muted-foreground">{cs.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">
                        Solution
                      </h4>
                      <p className="text-muted-foreground">{cs.solution}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-4">Results</h4>
                  <div className="space-y-3">
                    {cs.results.map((result, j) => (
                      <div key={j} className="flex items-center">
                        <svg
                          className="w-6 h-6 text-primary mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-semibold">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
