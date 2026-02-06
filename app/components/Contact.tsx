import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* -------------------- Validation Schema -------------------- */
const schema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      "Please enter a valid phone number",
    ),
  service: yup.string().required("Please select a service"),
  projectDetails: yup
    .string()
    .required("Project details are required")
    .min(10, "Please provide at least 10 characters"),
});

/* -------------------- Types -------------------- */
type ContactProps = {
  isContactVisible: boolean;
};

type FormData = {
  fullName: string;
  phoneNumber: string;
  service: string;
  projectDetails: string;
};

/* -------------------- Component -------------------- */
const Contact = ({ isContactVisible }: ContactProps) => {
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  /* -------------------- Submit Handler -------------------- */
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://stunning-apparel-859da13f16.strapiapp.com/api/audiences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Name: data.fullName,
              Phone: data.phoneNumber,
              Service: getServiceText(data.service),
              Details: data.projectDetails,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      await response.json();
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -------------------- Helpers -------------------- */
  const getServiceText = (value: string) => {
    const serviceMap: Record<string, string> = {
      custom: "Custom Software Development",
      ecommerce: "E-Commerce Solutions",
      crm: "Aura CRM",
      web: "Web Applications",
      support: "Support & Maintenance",
      other: "Other",
    };
    return serviceMap[value] || value;
  };

  /* -------------------- JSX -------------------- */
  return (
    <section
      id="contact"
      className={`relative  ${isContactVisible ? "py-32 px-6 bg-linear-to-b from-[#0a0f1a] via-[#0d1420]/30 to-[#0a0f1a]" : ""} `}
    >
      <div className="max-w-5xl mx-auto">
        {isContactVisible && (
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-linear-to-r from-[#c4a962] via-white to-[#4a9d9c] bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Ready to transform your vision into reality? Let's start the
              conversation.
            </p>
          </div>
        )}

        <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
                Failed to send message. Please try again.
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  placeholder="John Doe"
                  className={`w-full px-6 py-4 bg-white/5 border ${
                    errors.fullName ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-[#4a9d9c]/50`}
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phoneNumber")}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-6 py-4 bg-white/5 border ${
                    errors.phoneNumber ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-[#4a9d9c]/50`}
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Service Interested In
              </label>
              <select
                {...register("service")}
                className={`w-full px-6 py-4 bg-white/5 border ${
                  errors.service ? "border-red-500" : "border-white/10"
                } rounded-xl text-white focus:ring-2 focus:ring-[#4a9d9c]/50`}
              >
                <option value="">Select a service</option>
                <option value="custom">Custom Software Development</option>
                <option value="ecommerce">E-Commerce Solutions</option>
                <option value="crm">Aura CRM</option>
                <option value="web">Web Applications</option>
                <option value="support">Support & Maintenance</option>
                <option value="other">Other</option>
              </select>
              {errors.service && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.service.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Project Details
              </label>
              <textarea
                {...register("projectDetails")}
                rows={6}
                placeholder="Tell us about your project..."
                className={`w-full px-6 py-4 bg-white/5 border ${
                  errors.projectDetails ? "border-red-500" : "border-white/10"
                } rounded-xl text-white placeholder-slate-500 resize-none focus:ring-2 focus:ring-[#4a9d9c]/50`}
              />
              {errors.projectDetails && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.projectDetails.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-10 py-4 bg-linear-to-r from-[#4a9d9c] to-[#c4a962] rounded-full font-bold text-lg transition-all hover:scale-[1.02] ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {isContactVisible && (
            <div className="mt-12 pt-12 border-t border-white/10 grid md:grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-3xl mb-3">📧</div>
                <a
                  href="mailto:sales@zeiia.com"
                  className="text-[#4a9d9c] hover:text-[#c4a962]"
                >
                  sales@zeiia.com
                </a>
              </div>
              <div>
                <div className="text-3xl mb-3">📱</div>
                <a
                  href="tel:+201207715484"
                  className="text-[#4a9d9c] hover:text-[#c4a962]"
                >
                  +201207715484
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
