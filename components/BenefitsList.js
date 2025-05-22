"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaHospital, FaBriefcase, FaPhoneAlt, FaDollarSign, FaCheckCircle } from 'react-icons/fa';

/**
 * Benefits list section showing what users get with a free case review
 * Generated from offer configuration
 */
function BenefitsList() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Icon map for easy reference
  const iconMap = {
    'hospital': <FaHospital className="text-3xl text-primary" />,
    'briefcase': <FaBriefcase className="text-3xl text-primary" />,
    'phone': <FaPhoneAlt className="text-3xl text-primary" />,
    'dollar': <FaDollarSign className="text-3xl text-primary" />,
    'check': <FaCheckCircle className="text-3xl text-primary" />,
  };

  // Benefits data from configuration
  const benefits = 
    [
      
        {
          icon: iconMap['phone'],
          title: "Convenience",
          description: "Access our services from anywhere, anytime."
        },
      
        {
          icon: iconMap['dollar'],
          title: "Affordability",
          description: "Quality services at unbeatable prices."
        },
      
        {
          icon: iconMap['briefcase'],
          title: "Expertise",
          description: "Our team consists of industry-leading professionals."
        },
      
        {
          icon: iconMap['check'],
          title: "Trustworthy",
          description: "We ensure 100% satisfaction on all our services."
        }
      
    ]
  ;

  // Fix icon references in the benefits array (convert string to actual JSX)
  const processedBenefits = benefits.map(benefit => {
    // If the icon is a string reference to iconMap, evaluate it
    if (typeof benefit.icon === 'string' && benefit.icon.startsWith('iconMap[')) {
      const iconKey = benefit.icon.match(/iconMap\['(.+?)'\]/)[1];
      return { ...benefit, icon: iconMap[iconKey] };
    }
    return benefit;
  });

  return (
    <section className="py-12 md:py-16 bg-muted">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 20 
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0 
          }}
          viewport={{ 
            once: true, 
            margin: "-100px" 
          }}
          transition={{ 
            duration: 0.5 
          }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Why Choose Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our online home improvement services are designed to add value to your home and simplify your life. Here&#39;s why you should choose us:
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: true, 
            margin: "-100px" 
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {processedBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-lg p-6 shadow-md flex items-start border border-border"
            >
              <div className="mr-4 mt-1">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BenefitsList;