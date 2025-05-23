"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from 'framer-motion';
import toast from "react-hot-toast";

// Components
import Hero from './Hero';
import BenefitsList from './BenefitsList';

const PainSection = () => (
  <section className="py-12 bg-card">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-card-foreground">
        Common Home Improvement Challenges
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "High Cost",
            description: "Home improvements can be expensive. We provide cost-effective solutions."
          },
          {
            title: "Time Consuming", 
            description: "Finding the right professionals can be time-consuming. We make it easy."
          },
          {
            title: "Quality Concerns",
            description: "Quality is often a concern. With us, you get only the best."
          }
        ].map((item, index) => (
          <motion.div 
            key={index} 
            className="p-6 border-2 border-border shadow-md hover:shadow-lg transition-all bg-background hover:-translate-y-0.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const UrgencySection = ({ onGetStarted }) => (
  <section className="py-12 bg-primary text-primary-foreground">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-black mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        Is Your House Giving You Nightmares?
      </h2>
      <p className="text-xl font-semibold mb-8 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
        Remodel MONSTER devours home repairs for breakfast. We'll hunt down every leak, crack, and squeak – no project too scary!
      </p>
      <button 
        onClick={onGetStarted}
        className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 border-2 border-border"
      >
        Get Started Now!
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="light py-10 bg-secondary text-secondary-foreground">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="font-bold text-xl mb-2">Remodel MONSTER</h3>
          <p className="text-muted-foreground">© 2025 All Rights Reserved</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-secondary-foreground">Home</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-secondary-foreground">About</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-secondary-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-secondary-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-secondary-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
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
    tcpa: "",
    tcpaLanguage: "",
    
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
  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
      'jobType', 'purchaseTimeFrame', 'ownHome', 'creditRating', 'tcpa', 'tcpaLanguage',
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

    if (transaction_id) sessionStorage.setItem("transaction_id", transaction_id);
    if (source) sessionStorage.setItem("source", source);
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
  }, [affiliateID, affiliateSubID, affiliateRefID]);

  const handleSubmit = async () => {
    switch (step) {
      case 1:
        // Step 1: Get started intro - no validation needed
        break;
      
      case 2:
        // Step 2: Job selection
        if (!formData.jobType) {
          toast.error("What service do you need? is required");
          return;
        }
        break;
      
      case 3:
        // Step 3: Job-specific details (conditional validation)
        break;
      
      case 4:
        // Step 4: Contact info
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
        break;
      
      case 5:
        // Step 5: Confirmation
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
        toast.success("Form submitted successfully!");
        router.push("/thanks");
      } else {
        toast.error(data.message || "Failed to submit form");
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
          <div className="mb-6">
            {step === 1 && (
              <div className="space-y-4">
                <Intro
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={{}}
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
              
            {step === 2 && (
              <div className="space-y-4">
                <JobDetails
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={{}}
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
              
            {step === 3 && (
              <div className="space-y-4">
                <SpecificDetails
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={{}}
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
              
            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  <PersonalInfo
                    formData={formData}
                    onChange={handleFieldChange}
                    errors={{}}
                  />
                  <Location
                    formData={formData}
                    onChange={handleFieldChange}
                    errors={{}}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
              
            {step === 5 && (
              <div className="space-y-4">
                <Confirmation
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={{}}
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Hero>
      
      <PainSection />
      <BenefitsList />
      <UrgencySection onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
}
