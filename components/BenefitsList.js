"use client";
import React from 'react';
import { motion } from 'framer-motion';

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

  // Icon map with lightweight SVG icons
  const iconMap = {
    'phone': (
      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
      </svg>
    ),
    'dollar': (
      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
      </svg>
    ),
    'briefcase': (
      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-1a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1zm1 5a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"/>
      </svg>
    ),
    'check': (
      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    ),
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