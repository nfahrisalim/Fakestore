import { motion } from "framer-motion";
import { Truck, Shield, Headphones } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Quick and reliable delivery to your doorstep with real-time tracking."
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your transactions are protected with industry-leading security measures."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our customer service team is always here to help you with any questions."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Why Choose ModernStore?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We're committed to providing the best shopping experience with premium products and exceptional service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="text-blue-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
