"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from 'framer-motion';
import toast from "react-hot-toast";

// Components
import Hero from './Hero';
import BenefitsList from './BenefitsList';

const PainSection = () => (
  <section className="py-16 md:py-24 bg-secondary">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <p className="text-primary font-medium tracking-wide uppercase text-sm mb-2">Why homeowners choose us</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          We Solve the Hard Parts
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Transparent Pricing",
            description: "Get competitive quotes from multiple pros — no hidden fees, no surprise charges."
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Save Hours of Research",
            description: "Skip the endless searching. We match you with qualified professionals in minutes."
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            ),
            title: "Vetted & Insured",
            description: "Every professional is licensed and insured. Quality work you can trust."
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const UrgencySection = ({ onGetStarted }) => (
  <section className="relative py-16 md:py-24 overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

    <div className="relative max-w-3xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-amber-400 font-medium tracking-wide uppercase text-sm mb-3">
          Don't wait — projects only get more expensive
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-serif leading-tight">
          Your Dream Home
          <span className="block text-amber-400">Starts Here</span>
        </h2>
        <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
          Join thousands of homeowners who found the right contractor through our free matching service. No commitment required.
        </p>
        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/20 active:translate-y-0"
        >
          Get Your Free Quote
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </motion.div>
    </div>
  </section>
);


// Form Step Components
import Intro from './form/intro';
import JobDetails from './form/jobDetails';
import SpecificDetails from './form/specificDetails';
import PersonalInfo from './form/personalInfo';
import Location from './form/location';
import Confirmation from './form/confirmation';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");

  // Single form state object
  const [formData, setFormData] = useState({
    // Core fields
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    jobType: "",
    purchaseTimeFrame: "",
    ownHome: "",
    creditRating: "",
    bestCallTime: "",
    tcpa: "",
    tcpaLanguage: "",
    xxTrustedFormCertUrl: "",

    // Tracking parameters
    transaction_id: "",
    source: "",

    // Conditional fields for all job types
    addition_type: "",
    bathroomProjectType: "",
    cabinetsProjectType: "",
    carryWeight: "",
    deckMaterial: "",
    doorProjectType: "",
    doorsMaterial: "",
    electricalProjectType: "",
    electricalServiceType: "",
    fenceType: "",
    flooringInquiyType: "",
    flooringType: "",
    garageDoorsProjectType: "",
    homeSecurityBuildingType: "",
    hvacAirType: "",
    hvacProjectType: "",
    hvacSystemType: "",
    insulationServiceType: "",
    kitchenProjectType: "",
    landscapingProjectType: "",
    landscapingServiceType: "",
    numStairs: "",
    numberOfDoors: "",
    numberOfWindows: "",
    openers: "",
    paintingProjectType: "",
    pestControlProjectType: "",
    plumbingProjectType: "",
    plumbingServiceType: "",
    poolType: "",
    preHung: "",
    protection: "",
    remodelingLocationInHome: "",
    remodelingProjectType: "",
    roofProjectType: "",
    roofingType: "",
    sidingProjectType: "",
    sidingType: "",
    stairLiftProjectType: "",
    stairLiftStairType: "",
    sunroomLength: "",
    sunroomNumRooms: "",
    sunroomWidth: "",
    swimmingPoolProjectType: "",
    swimmingPoolServiceType: "",
    treesProjectType: "",
    windowsProjectType: ""
  });

  // Single onChange handler for all form fields
  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const [isAccident, setIsAccident] = useState("Yes");

  // Tracking data
  const [affiliateID, setAffiliateID] = useState(searchParams.get("AID"));
  const [clickID, setClickID] = useState(searchParams.get("clickid"));
  const [affiliateSubID, setAffiliateSubID] = useState(searchParams.get("SID"));
  const [affiliateRefID, setAffiliateRefID] = useState(searchParams.get("ARID"));

  const calculateProgress = () => {
    const totalSteps = 5;
    return Math.min(100, Math.max(10, (step / totalSteps) * 100));
  };

  // Load stored values on component mount
  useEffect(() => {
    const fieldsToLoad = [
      'firstName', 'lastName', 'email', 'phoneNumber', 'address', 'city', 'state', 'zip',
      'jobType', 'purchaseTimeFrame', 'ownHome', 'creditRating', 'bestCallTime', 'tcpa', 'tcpaLanguage', 'xxTrustedFormCertUrl',
      'transaction_id', 'source',
      'addition_type', 'bathroomProjectType', 'cabinetsProjectType', 'carryWeight',
      'deckMaterial', 'doorProjectType', 'doorsMaterial', 'electricalProjectType',
      'electricalServiceType', 'fenceType', 'flooringInquiyType', 'flooringType',
      'garageDoorsProjectType', 'homeSecurityBuildingType', 'hvacAirType', 'hvacProjectType',
      'hvacSystemType', 'insulationServiceType', 'kitchenProjectType', 'landscapingProjectType',
      'landscapingServiceType', 'numStairs', 'numberOfDoors', 'numberOfWindows', 'openers',
      'paintingProjectType', 'pestControlProjectType', 'plumbingProjectType', 'plumbingServiceType',
      'poolType', 'preHung', 'protection', 'remodelingLocationInHome', 'remodelingProjectType',
      'roofProjectType', 'roofingType', 'sidingProjectType', 'sidingType', 'stairLiftProjectType',
      'stairLiftStairType', 'sunroomLength', 'sunroomNumRooms', 'sunroomWidth',
      'swimmingPoolProjectType', 'swimmingPoolServiceType', 'treesProjectType', 'windowsProjectType'
    ];
    const loadedData = {};

    fieldsToLoad.forEach(field => {
      const storedValue = sessionStorage.getItem(field) || localStorage.getItem(field);
      if (storedValue) {
        loadedData[field] = storedValue;
      }
    });

    if (Object.keys(loadedData).length > 0) {
      setFormData(prev => ({ ...prev, ...loadedData }));
    }
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    Object.entries(formData).forEach(([field, value]) => {
      if (value) {
        localStorage.setItem(field, value);
      }
    });
  }, [formData]);

  // Capture TrustedForm certificate URL when it's auto-populated
  useEffect(() => {
    const captureFormUrl = () => {
      const trustedFormField = document.querySelector('input[name="xxTrustedFormCertUrl"]');
      if (trustedFormField && trustedFormField.value && !formData.xxTrustedFormCertUrl) {
        handleFieldChange('xxTrustedFormCertUrl', trustedFormField.value);
      }
    };

    captureFormUrl();
    const interval = setInterval(captureFormUrl, 1000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [formData.xxTrustedFormCertUrl, handleFieldChange]);

  // Track affiliate information
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transaction_id = params.get("transaction_id");
    const source = params.get("source");
    const clickid = params.get("clickid");
    const offerid = params.get("offerid");
    const phone = params.get("phone");
    const firstname = params.get("firstname");
    const lastname = params.get("lastname");
    const email = params.get("email");

    sessionStorage.setItem("affiliate_id", affiliateID || "");
    sessionStorage.setItem("affiliate_sub_id", affiliateSubID || "");
    sessionStorage.setItem("affiliate_ref_id", affiliateRefID || "");
    sessionStorage.setItem("transaction_id", transaction_id || "");

    if (transaction_id) {
      sessionStorage.setItem("transaction_id", transaction_id);
      handleFieldChange('transaction_id', transaction_id);
    }
    if (source) {
      sessionStorage.setItem("source", source);
      handleFieldChange('source', source);
    }
    if (clickid) sessionStorage.setItem("clickid", clickid);
    if (offerid) sessionStorage.setItem("offer_id", offerid);

    const storedClickID = sessionStorage.getItem("clickid") || localStorage.getItem("clickid");
    const storedAffiliateID = sessionStorage.getItem("affiliate_id") || localStorage.getItem("affiliate_id");
    const storedAffiliateSubID = sessionStorage.getItem("affiliate_sub_id") || localStorage.getItem("affiliate_sub_id");
    const storedAffiliateRefID = sessionStorage.getItem("affiliate_ref_id") || localStorage.getItem("affiliate_ref_id");

    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      const formattedPhone = cleanPhone.slice(-10);
      sessionStorage.setItem("phone", formattedPhone);
    }

    if (storedClickID) setClickID(storedClickID);
    if (storedAffiliateID) setAffiliateID(storedAffiliateID);
    if (storedAffiliateSubID) setAffiliateSubID(storedAffiliateSubID);
    if (storedAffiliateRefID) setAffiliateRefID(storedAffiliateRefID);
    if (firstname) sessionStorage.setItem("firstname", firstname);
    if (lastname) sessionStorage.setItem("lastname", lastname);
    if (email) sessionStorage.setItem("email", email);
  }, [affiliateID, affiliateSubID, affiliateRefID, handleFieldChange]);

  const handleSubmit = async () => {
    switch (step) {
      case 1:
        break;

      case 2:
        if (!formData.jobType) {
          toast.error("What service do you need? is required");
          return;
        }
        if (!formData.purchaseTimeFrame) {
          toast.error("When do you need service? is required");
          return;
        }
        if (!formData.ownHome) {
          toast.error("Do you own your home? is required");
          return;
        }
        break;

      case 3:
        if (formData.jobType) {
          const { validateConditionalFieldsForJobType } = require('@/utils/conditionalLogic');
          const conditionalErrors = validateConditionalFieldsForJobType(formData.jobType, formData);
          if (conditionalErrors.length > 0) {
            toast.error(conditionalErrors[0]);
            return;
          }
        }
        break;

      case 4:
        if (!formData.firstName) {
          toast.error("First Name is required");
          return;
        }
        if (formData.firstName.length < 1 || formData.firstName.length > 254) {
          toast.error("First Name must be 1-254 characters");
          return;
        }
        if (!formData.lastName) {
          toast.error("Last Name is required");
          return;
        }
        if (formData.lastName.length < 1 || formData.lastName.length > 254) {
          toast.error("Last Name must be 1-254 characters");
          return;
        }
        if (!formData.email) {
          toast.error("Email Address is required");
          return;
        }
        if (!new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$').test(formData.email)) {
          toast.error("Please enter a valid email address");
          return;
        }
        if (!formData.phoneNumber) {
          toast.error("Phone Number is required");
          return;
        }
        if (!new RegExp('^\\d{10}$').test(formData.phoneNumber)) {
          toast.error("Please enter a valid 10-digit phone number");
          return;
        }
        if (!formData.address) {
          toast.error("Address is required");
          return;
        }
        if (!formData.zip) {
          toast.error("Zip Code is required");
          return;
        }
        if (!new RegExp('^\\d{5,8}$').test(formData.zip)) {
          toast.error("Please enter a valid zip code (5-8 digits)");
          return;
        }
        if (!formData.bestCallTime) {
          toast.error("Best time to call is required");
          return;
        }
        break;

      case 5:
        if (!formData.tcpa) {
          toast.error("I agree to be contacted is required");
          return;
        }
        break;
    }

    if (step === 5) {
      await submitToAPI();
    } else {
      router.push(`/?step=${step + 1}`);
    }
  };

  const submitToAPI = async () => {
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          transaction_id: sessionStorage.getItem("transaction_id"),
          source: sessionStorage.getItem("source"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          toast.success("Thanks! We will be in touch. In the meantime, check out some additional offers from our partners.");

          let countdown = 5;
          const countdownToast = toast.loading(`Redirecting to additional offers in ${countdown}s (click to go now)`, {
            duration: 5000,
            action: {
              label: 'Go Now',
              onClick: () => {
                window.location.href = 'https://resourcelink.online/sorry/all';
              }
            }
          });

          const countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
              toast.loading(`Redirecting to additional offers in ${countdown}s (click to go now)`, {
                id: countdownToast,
                action: {
                  label: 'Go Now',
                  onClick: () => {
                    window.location.href = 'https://resourcelink.online/sorry/all';
                  }
                }
              });
            } else {
              clearInterval(countdownInterval);
              window.location.href = 'https://resourcelink.online/sorry/all';
            }
          }, 1000);
        }
      } else {
        toast.error("Someone will call you back shortly. In the meantime, check out some additional offers from our partners.");

        let countdown = 5;
        const countdownToast = toast.loading(`Redirecting to additional offers in ${countdown}s (click to go now)`, {
          duration: 5000,
          action: {
            label: 'Go Now',
            onClick: () => {
              window.location.href = 'https://resourcelink.online/sorry/all';
            }
          }
        });

        const countdownInterval = setInterval(() => {
          countdown--;
          if (countdown > 0) {
            toast.loading(`Redirecting to additional offers in ${countdown}s (click to go now)`, {
              id: countdownToast,
              action: {
                label: 'Go Now',
                onClick: () => {
                  window.location.href = 'https://resourcelink.online/sorry/all';
                }
              }
            });
          } else {
            clearInterval(countdownInterval);
            window.location.href = 'https://resourcelink.online/sorry/all';
          }
        }, 1000);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to submit form");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      router.push(`/?step=${step - 1}`);
    }
  };

  const handleGetStarted = () => {
    router.push('/?step=2');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const backButtonClasses = "px-5 py-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-all text-sm font-medium hover:-translate-y-0.5 active:translate-y-0";
  const continueButtonClasses = "px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all text-sm hover:-translate-y-0.5 active:translate-y-0 shadow-md";

  return (
    <div className="min-h-screen">
      <Hero
        isInjured={isAccident}
        setIsInjured={setIsAccident}
        handleSubmit={handleSubmit}
        progress={calculateProgress()}
        hideButtons={step > 1}
      >
        {step >= 1 && (
          <form onSubmit={handleFormSubmit} className="mb-4">
            {step === 1 && (
              <div className="space-y-4">
                <Intro formData={formData} onChange={handleFieldChange} errors={{}} />
                <div className="flex justify-between mt-4">
                  <button type="button" onClick={handleBack} className={backButtonClasses}>Back</button>
                  <button type="submit" className={continueButtonClasses}>Continue</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <JobDetails formData={formData} onChange={handleFieldChange} errors={{}} />
                <div className="flex justify-between mt-4">
                  <button type="button" onClick={handleBack} className={backButtonClasses}>Back</button>
                  <button type="submit" className={continueButtonClasses}>Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <SpecificDetails formData={formData} onChange={handleFieldChange} errors={{}} />
                <div className="flex justify-between mt-4">
                  <button type="button" onClick={handleBack} className={backButtonClasses}>Back</button>
                  <button type="submit" className={continueButtonClasses}>Continue</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  <PersonalInfo formData={formData} onChange={handleFieldChange} errors={{}} />
                  <Location formData={formData} onChange={handleFieldChange} errors={{}} />
                </div>
                <div className="flex justify-between mt-4">
                  <button type="button" onClick={handleBack} className={backButtonClasses}>Back</button>
                  <button type="submit" className={continueButtonClasses}>Continue</button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <Confirmation formData={formData} onChange={handleFieldChange} errors={{}} />
                <div className="flex justify-between mt-4">
                  <button type="button" onClick={handleBack} className={backButtonClasses}>Back</button>
                  <button type="submit" className={continueButtonClasses}>Submit</button>
                </div>
              </div>
            )}
          </form>
        )}
      </Hero>

      <PainSection />
      <BenefitsList />
      <UrgencySection onGetStarted={handleGetStarted} />
    </div>
  );
}
