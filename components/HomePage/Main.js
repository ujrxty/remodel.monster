"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from 'framer-motion';
import toast from "react-hot-toast";

// Components
import Hero from '../Hero';
import BenefitsList from '../BenefitsList';

// Create stub components for missing ones
const TrustStrip = () => (
  <section className="py-8 bg-background">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Trusted By Thousands</h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        <div className="w-24 h-12 bg-muted rounded"></div>
        <div className="w-24 h-12 bg-muted rounded"></div>
        <div className="w-24 h-12 bg-muted rounded"></div>
      </div>
    </div>
  </section>
);

const PainSection = () => (
  <section className="py-12 bg-card">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-card-foreground">
        Common Home Improvement Challenges
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {
          /* Dynamic points from config */
          [
            
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
            
          ]
        .map((item, index) => (
          <motion.div 
            key={index} 
            className="p-6 border border-border rounded-lg shadow-sm hover:shadow-md transition-all bg-background"
            initial={{ 
              opacity: 0, 
              y: 20 
            }}
            animate={{ 
              opacity: 1, 
              y: 0 
            }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1 
            }}
          >
            <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const UrgencySection = () => (
  <section className="py-12 bg-primary text-primary-foreground">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Don&#39;t Miss Out!
      </h2>
      <p className="text-xl mb-8">
        Take advantage of our limited-time offer for new customers. Transform your home with our quality services at discounted rates.
      </p>
      <button className="px-8 py-3 bg-background text-foreground hover:bg-muted rounded-lg font-bold text-lg transition-colors">
        Get Started Now!
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10 bg-secondary text-secondary-foreground">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="font-bold text-xl mb-2">home improvement online</h3>
          <p className="text-muted-foreground">© 2025 All Rights Reserved</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-secondary-foreground">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary-foreground">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-secondary-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);


// Form Step Components


import Intro from '../form/intro';

import PersonalInfo from '../form/personalInfo';

import Location from '../form/location';

import JobDetails from '../form/jobDetails';

import SpecificDetails from '../form/specificDetails';

import Confirmation from '../form/confirmation';




/**
 * Main component with form flow
 * Generated from configuration: home improvement online
 * @returns {JSX.Element} The rendered component
 */
export default function Main() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");
  
  // Form state
  
  
  const [firstName, setFirstName] = useState("");
  
  const [lastName, setLastName] = useState("");
  
  const [email, setEmail] = useState("");
  
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [address, setAddress] = useState("");
  
  const [city, setCity] = useState("");
  
  const [state, setState] = useState("");
  
  const [zip, setZip] = useState("");
  
  const [jobType, setJobType] = useState("");
  
  const [purchaseTimeFrame, setPurchaseTimeFrame] = useState("");
  
  const [ownHome, setOwnHome] = useState("");
  
  const [creditRating, setCreditRating] = useState("");
  
  const [tcpa, setTcpa] = useState("");
  
  const [tcpaLanguage, setTcpaLanguage] = useState("");
  
  const [conditionalFields, setConditionalFields] = useState("");
  
  const [numberOfWindows, setNumberOfWindows] = useState("");
  
  const [windowsProjectType, setWindowsProjectType] = useState("");
  
  const [doorProjectType, setDoorProjectType] = useState("");
  
  const [doorsMaterial, setDoorsMaterial] = useState("");
  
  const [preHung, setPreHung] = useState("");
  
  const [hvacSystemType, setHvacSystemType] = useState("");
  
  const [hvacProjectType, setHvacProjectType] = useState("");
  
  const [kitchenProjectType, setKitchenProjectType] = useState("");
  
  const [bathroomProjectType, setBathroomProjectType] = useState("");
  
  
  
  // Add this for compatibility in all cases
  const [isAccident, setIsAccident] = useState("Yes");
  
  // Tracking data
  const [affiliateID, setAffiliateID] = useState(searchParams.get("AID"));
  const [clickID, setClickID] = useState(searchParams.get("clickid"));
  const [affiliateSubID, setAffiliateSubID] = useState(searchParams.get("SID"));
  const [affiliateRefID, setAffiliateRefID] = useState(searchParams.get("ARID"));
  
  // Calculate progress percentage
  const calculateProgress = () => {
    const totalSteps = 6;
    return Math.min(100, Math.max(10, (step / totalSteps) * 100));
  };

  // Load stored values on component mount
  useEffect(() => {
    
    
    const storedFirstName = sessionStorage.getItem("firstName") || localStorage.getItem("firstName");
    if (storedFirstName) setFirstName(storedFirstName);
    
    const storedLastName = sessionStorage.getItem("lastName") || localStorage.getItem("lastName");
    if (storedLastName) setLastName(storedLastName);
    
    const storedEmail = sessionStorage.getItem("email") || localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
    
    const storedPhoneNumber = sessionStorage.getItem("phoneNumber") || localStorage.getItem("phoneNumber");
    if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
    
    const storedAddress = sessionStorage.getItem("address") || localStorage.getItem("address");
    if (storedAddress) setAddress(storedAddress);
    
    const storedCity = sessionStorage.getItem("city") || localStorage.getItem("city");
    if (storedCity) setCity(storedCity);
    
    const storedState = sessionStorage.getItem("state") || localStorage.getItem("state");
    if (storedState) setState(storedState);
    
    const storedZip = sessionStorage.getItem("zip") || localStorage.getItem("zip");
    if (storedZip) setZip(storedZip);
    
    const storedJobType = sessionStorage.getItem("jobType") || localStorage.getItem("jobType");
    if (storedJobType) setJobType(storedJobType);
    
    const storedPurchaseTimeFrame = sessionStorage.getItem("purchaseTimeFrame") || localStorage.getItem("purchaseTimeFrame");
    if (storedPurchaseTimeFrame) setPurchaseTimeFrame(storedPurchaseTimeFrame);
    
    const storedOwnHome = sessionStorage.getItem("ownHome") || localStorage.getItem("ownHome");
    if (storedOwnHome) setOwnHome(storedOwnHome);
    
    const storedCreditRating = sessionStorage.getItem("creditRating") || localStorage.getItem("creditRating");
    if (storedCreditRating) setCreditRating(storedCreditRating);
    
    const storedTcpa = sessionStorage.getItem("tcpa") || localStorage.getItem("tcpa");
    if (storedTcpa) setTcpa(storedTcpa);
    
    const storedTcpaLanguage = sessionStorage.getItem("tcpaLanguage") || localStorage.getItem("tcpaLanguage");
    if (storedTcpaLanguage) setTcpaLanguage(storedTcpaLanguage);
    
    const storedConditionalFields = sessionStorage.getItem("conditionalFields") || localStorage.getItem("conditionalFields");
    if (storedConditionalFields) setConditionalFields(storedConditionalFields);
    
    const storedNumberOfWindows = sessionStorage.getItem("numberOfWindows") || localStorage.getItem("numberOfWindows");
    if (storedNumberOfWindows) setNumberOfWindows(storedNumberOfWindows);
    
    const storedWindowsProjectType = sessionStorage.getItem("windowsProjectType") || localStorage.getItem("windowsProjectType");
    if (storedWindowsProjectType) setWindowsProjectType(storedWindowsProjectType);
    
    const storedDoorProjectType = sessionStorage.getItem("doorProjectType") || localStorage.getItem("doorProjectType");
    if (storedDoorProjectType) setDoorProjectType(storedDoorProjectType);
    
    const storedDoorsMaterial = sessionStorage.getItem("doorsMaterial") || localStorage.getItem("doorsMaterial");
    if (storedDoorsMaterial) setDoorsMaterial(storedDoorsMaterial);
    
    const storedPreHung = sessionStorage.getItem("preHung") || localStorage.getItem("preHung");
    if (storedPreHung) setPreHung(storedPreHung);
    
    const storedHvacSystemType = sessionStorage.getItem("hvacSystemType") || localStorage.getItem("hvacSystemType");
    if (storedHvacSystemType) setHvacSystemType(storedHvacSystemType);
    
    const storedHvacProjectType = sessionStorage.getItem("hvacProjectType") || localStorage.getItem("hvacProjectType");
    if (storedHvacProjectType) setHvacProjectType(storedHvacProjectType);
    
    const storedKitchenProjectType = sessionStorage.getItem("kitchenProjectType") || localStorage.getItem("kitchenProjectType");
    if (storedKitchenProjectType) setKitchenProjectType(storedKitchenProjectType);
    
    const storedBathroomProjectType = sessionStorage.getItem("bathroomProjectType") || localStorage.getItem("bathroomProjectType");
    if (storedBathroomProjectType) setBathroomProjectType(storedBathroomProjectType);
    
    
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    
    
    if (firstName) localStorage.setItem("firstName", firstName);
    
    if (lastName) localStorage.setItem("lastName", lastName);
    
    if (email) localStorage.setItem("email", email);
    
    if (phoneNumber) localStorage.setItem("phoneNumber", phoneNumber);
    
    if (address) localStorage.setItem("address", address);
    
    if (city) localStorage.setItem("city", city);
    
    if (state) localStorage.setItem("state", state);
    
    if (zip) localStorage.setItem("zip", zip);
    
    if (jobType) localStorage.setItem("jobType", jobType);
    
    if (purchaseTimeFrame) localStorage.setItem("purchaseTimeFrame", purchaseTimeFrame);
    
    if (ownHome) localStorage.setItem("ownHome", ownHome);
    
    if (creditRating) localStorage.setItem("creditRating", creditRating);
    
    if (tcpa) localStorage.setItem("tcpa", tcpa);
    
    if (tcpaLanguage) localStorage.setItem("tcpaLanguage", tcpaLanguage);
    
    if (conditionalFields) localStorage.setItem("conditionalFields", conditionalFields);
    
    if (numberOfWindows) localStorage.setItem("numberOfWindows", numberOfWindows);
    
    if (windowsProjectType) localStorage.setItem("windowsProjectType", windowsProjectType);
    
    if (doorProjectType) localStorage.setItem("doorProjectType", doorProjectType);
    
    if (doorsMaterial) localStorage.setItem("doorsMaterial", doorsMaterial);
    
    if (preHung) localStorage.setItem("preHung", preHung);
    
    if (hvacSystemType) localStorage.setItem("hvacSystemType", hvacSystemType);
    
    if (hvacProjectType) localStorage.setItem("hvacProjectType", hvacProjectType);
    
    if (kitchenProjectType) localStorage.setItem("kitchenProjectType", kitchenProjectType);
    
    if (bathroomProjectType) localStorage.setItem("bathroomProjectType", bathroomProjectType);
    
    
  }, [
    
    firstName, lastName, email, phoneNumber, address, city, state, zip, jobType, purchaseTimeFrame, ownHome, creditRating, tcpa, tcpaLanguage, conditionalFields, numberOfWindows, windowsProjectType, doorProjectType, doorsMaterial, preHung, hvacSystemType, hvacProjectType, kitchenProjectType, bathroomProjectType
    
  ]);
  
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

    // Use sessionStorage for tracking data (more secure, cleared when browser is closed)
    sessionStorage.setItem("affiliate_id", affiliateID || "");
    sessionStorage.setItem("affiliate_sub_id", affiliateSubID || "");
    sessionStorage.setItem("affiliate_ref_id", affiliateRefID || "");
    sessionStorage.setItem("transaction_id", transaction_id || "");

    if (transaction_id) sessionStorage.setItem("transaction_id", transaction_id);
    if (source) sessionStorage.setItem("source", source);
    if (clickid) sessionStorage.setItem("clickid", clickid);
    if (offerid) sessionStorage.setItem("offer_id", offerid);
    
    // Try to get values from sessionStorage first, then fallback to localStorage for backward compatibility
    const storedClickID = sessionStorage.getItem("clickid") || localStorage.getItem("clickid");
    const storedAffiliateID = sessionStorage.getItem("affiliate_id") || localStorage.getItem("affiliate_id");
    const storedAffiliateSubID = sessionStorage.getItem("affiliate_sub_id") || localStorage.getItem("affiliate_sub_id");
    const storedAffiliateRefID = sessionStorage.getItem("affiliate_ref_id") || localStorage.getItem("affiliate_ref_id");
    
    if (phone) {
      // Format phone number properly
      const cleanPhone = phone.replace(/\D/g, '');
      const formattedPhone = cleanPhone.slice(-10); // Take last 10 digits
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

  /**
   * Handle form submission and validation
   */
  const handleSubmit = () => {
    // Validation logic based on current step
    
    switch (step) {
      
      case 1:
        
        // Default validation for intro
        
        
        break;
      
      case 2:
        
        // Default validation for personalInfo
        
        if (!firstName) {
          toast.error("First Name is required");
          return;
        }
          
        if (firstName.length < 1) {
          toast.error("First Name must be at least 1 characters");
          return;
        }
            
        if (firstName.length > 254) {
          toast.error("First Name must be at most 254 characters");
          return;
        }
            
        if (!lastName) {
          toast.error("Last Name is required");
          return;
        }
          
        if (lastName.length < 1) {
          toast.error("Last Name must be at least 1 characters");
          return;
        }
            
        if (lastName.length > 254) {
          toast.error("Last Name must be at most 254 characters");
          return;
        }
            
        if (!email) {
          toast.error("Email Address is required");
          return;
        }
          
        if (!new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$').test(email)) {
          toast.error("Please enter a valid email address");
          return;
        }
            
        if (email.length < 5) {
          toast.error("Email Address must be at least 5 characters");
          return;
        }
            
        if (email.length > 128) {
          toast.error("Email Address must be at most 128 characters");
          return;
        }
            
        if (!phoneNumber) {
          toast.error("Phone Number is required");
          return;
        }
          
        if (!new RegExp('^\\d{10}$').test(phoneNumber)) {
          toast.error("Please enter a valid 10-digit phone number");
          return;
        }
            
        
        break;
      
      case 3:
        
        // Default validation for location
        
        if (!address) {
          toast.error("Address is required");
          return;
        }
          
        if (address.length < 1) {
          toast.error("Address must be at least 1 characters");
          return;
        }
            
        if (address.length > 254) {
          toast.error("Address must be at most 254 characters");
          return;
        }
            
        if (city.length < 1) {
          toast.error("City must be at least 1 characters");
          return;
        }
            
        if (city.length > 254) {
          toast.error("City must be at most 254 characters");
          return;
        }
            
        if (!new RegExp('^[A-Z]{2}$').test(state)) {
          toast.error("Invalid State");
          return;
        }
            
        if (!zip) {
          toast.error("Zip Code is required");
          return;
        }
          
        if (!new RegExp('^\\d{5,8}$').test(zip)) {
          toast.error("Please enter a valid zip code (5-8 digits)");
          return;
        }
            
        if (zip.length < 5) {
          toast.error("Zip Code must be at least 5 characters");
          return;
        }
            
        if (zip.length > 8) {
          toast.error("Zip Code must be at most 8 characters");
          return;
        }
            
        
        break;
      
      case 4:
        
        // Default validation for jobDetails
        
        if (!jobType) {
          toast.error("What service do you need? is required");
          return;
        }
          
        if (!purchaseTimeFrame) {
          toast.error("When do you need service? is required");
          return;
        }
          
        if (!ownHome) {
          toast.error("Do you own your home? is required");
          return;
        }
          
        
        break;
      
      case 5:
        
        // Default validation for specificDetails
        
        
        break;
      
      case 6:
        
        // Default validation for confirmation
        
        if (!tcpa) {
          toast.error("I agree to be contacted is required");
          return;
        }
          
        
        break;
      
      default:
        break;
    }
    

    // After all validations pass, navigate to loader page or next step
    
    if (step === 6) {
      router.push("/thanks");
    } else {
      router.push(`/?step=${step + 1}`);
    }
    
  };

  // Handle back button click
  const handleBack = () => {
    if (step > 1) {
      router.push(`/?step=${step - 1}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero section is always visible, with form steps as children when needed */}
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
                  formData={{
                    
                  }}
                  onChange={(field, value) => {
                    
                  }}
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
                <PersonalInfo
                  formData={{
                    
                    firstName: firstName,
                    
                    lastName: lastName,
                    
                    email: email,
                    
                    phoneNumber: phoneNumber
                    
                  }}
                  onChange={(field, value) => {
                    
                    if (field === 'firstName') setFirstName(value);
                    
                    if (field === 'lastName') setLastName(value);
                    
                    if (field === 'email') setEmail(value);
                    
                    if (field === 'phoneNumber') setPhoneNumber(value);
                    
                  }}
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
                <Location
                  formData={{
                    
                    address: address,
                    
                    city: city,
                    
                    state: state,
                    
                    zip: zip
                    
                  }}
                  onChange={(field, value) => {
                    
                    if (field === 'address') setAddress(value);
                    
                    if (field === 'city') setCity(value);
                    
                    if (field === 'state') setState(value);
                    
                    if (field === 'zip') setZip(value);
                    
                  }}
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
                <JobDetails
                  formData={{
                    
                    jobType: jobType,
                    
                    purchaseTimeFrame: purchaseTimeFrame,
                    
                    ownHome: ownHome,
                    
                    creditRating: creditRating
                    
                  }}
                  onChange={(field, value) => {
                    
                    if (field === 'jobType') setJobType(value);
                    
                    if (field === 'purchaseTimeFrame') setPurchaseTimeFrame(value);
                    
                    if (field === 'ownHome') setOwnHome(value);
                    
                    if (field === 'creditRating') setCreditRating(value);
                    
                  }}
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
              
            {step === 5 && (
              <div className="space-y-4">
                <SpecificDetails
                  formData={{
                    
                    conditionalFields: conditionalFields
                    
                  }}
                  onChange={(field, value) => {
                    
                    if (field === 'conditionalFields') setConditionalFields(value);
                    
                  }}
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
              
            {step === 6 && (
              <div className="space-y-4">
                <Confirmation
                  formData={{
                    
                    tcpa: tcpa,
                    
                    tcpaLanguage: tcpaLanguage
                    
                  }}
                  onChange={(field, value) => {
                    
                    if (field === 'tcpa') setTcpa(value);
                    
                    if (field === 'tcpaLanguage') setTcpaLanguage(value);
                    
                  }}
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
      
      {/* Marketing content sections */}
      <TrustStrip />
      <PainSection />
      <BenefitsList />
      <UrgencySection />
      <Footer />
    </div>
  );
}