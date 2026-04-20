"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const services = [
  { label: "Windows", href: "/?step=2&service=windows" },
  { label: "Roofing", href: "/?step=2&service=roofing" },
  { label: "HVAC", href: "/?step=2&service=hvac" },
  { label: "Bathroom", href: "/?step=2&service=bathroom" },
  { label: "Kitchen", href: "/?step=2&service=kitchen" },
  { label: "Siding", href: "/?step=2&service=siding" },
  { label: "Flooring", href: "/?step=2&service=flooring" },
  { label: "Painting", href: "/?step=2&service=painting" },
  { label: "Pest Control", href: "/call/pest-control" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const solid = !isHome || scrolled;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* ============ TOP UTILITY BAR ============ */}
      <div
        className="navbar-topbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 51,
          background: "#0f172a",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          fontSize: "0.8rem",
          transition: "transform 0.3s ease",
          transform: scrolled ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "36px",
          }}
        >
          {/* Left: location + hours */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8" }}>
              <svg style={{ width: "13px", height: "13px", color: "#f59e0b" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Serving All 50 States
            </span>
            <span className="navbar-topbar-hours" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8" }}>
              <svg style={{ width: "13px", height: "13px", color: "#f59e0b" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon-Fri 8AM-8PM EST
            </span>
          </div>

          {/* Right: phone + rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#94a3b8" }}>
              {/* 5 stars */}
              {[...Array(5)].map((_, i) => (
                <svg key={i} style={{ width: "12px", height: "12px", color: "#f59e0b" }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span style={{ marginLeft: "4px" }}>4.8/5</span>
            </span>
            <a
              href="tel:+18662043787"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#fbbf24",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <svg style={{ width: "13px", height: "13px" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              (866) 204-3787
            </a>
          </div>
        </div>
      </div>

      {/* ============ MAIN NAV BAR ============ */}
      <header
        style={{
          position: "fixed",
          top: scrolled ? 0 : "36px",
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: solid ? "rgba(30, 41, 59, 0.98)" : "rgba(15, 23, 42, 0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: solid ? "0 4px 30px rgba(0,0,0,0.4)" : "0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "70px",
            }}
          >
            {/* ---- Logo ---- */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 12px rgba(245,158,11,0.35)",
                }}
              >
                <svg style={{ width: "24px", height: "24px", color: "#fff" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
                  Remodel<span style={{ color: "#fbbf24" }}>Monster</span>
                </div>
                <div style={{ fontSize: "0.65rem", color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
                  Home Improvement Experts
                </div>
              </div>
            </Link>

            {/* ---- Desktop Nav ---- */}
            <nav className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      padding: "10px 18px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      color: active ? "#fbbf24" : "#e2e8f0",
                      borderBottom: active ? "2px solid #fbbf24" : "2px solid transparent",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.borderBottomColor = "rgba(251,191,36,0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = "#e2e8f0";
                        e.currentTarget.style.borderBottomColor = "transparent";
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Services Dropdown */}
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  style={{
                    padding: "10px 18px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: servicesOpen ? "#fbbf24" : "#e2e8f0",
                    background: "none",
                    border: "none",
                    borderBottom: servicesOpen ? "2px solid #fbbf24" : "2px solid transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!servicesOpen) {
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!servicesOpen) {
                      e.currentTarget.style.color = "#e2e8f0";
                    }
                  }}
                >
                  Services
                  <svg
                    style={{
                      width: "14px",
                      height: "14px",
                      transition: "transform 0.2s",
                      transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown panel */}
                {servicesOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "480px",
                      background: "#1e293b",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                      padding: "8px",
                      animation: "fadeIn 0.15s ease",
                    }}
                  >
                    {/* Arrow */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        left: "50%",
                        transform: "translateX(-50%) rotate(45deg)",
                        width: "12px",
                        height: "12px",
                        background: "#1e293b",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderBottom: "none",
                        borderRight: "none",
                      }}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                      {services.map((s) => (
                        <Link
                          key={s.label}
                          href={s.href}
                          onClick={() => setServicesOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            color: "#cbd5e1",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#cbd5e1";
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "8px",
                              background: "rgba(245,158,11,0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <svg style={{ width: "16px", height: "16px", color: "#f59e0b" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18 1.414-5.99L2.3 7.756l6.09-.521L11.42 2l3.03 5.235 6.09.52-5.148 4.605 1.414 5.99z" />
                            </svg>
                          </div>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "4px", paddingTop: "8px", padding: "8px 14px 4px" }}>
                      <Link
                        href="/?step=1"
                        onClick={() => setServicesOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: "rgba(245,158,11,0.15)",
                          color: "#fbbf24",
                          textDecoration: "none",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.25)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.15)"; }}
                      >
                        View All Services
                        <svg style={{ width: "14px", height: "14px" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* ---- Desktop Right: CTA ---- */}
            <div className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <a
                href="tel:+18662043787"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(245,158,11,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "pulse-ring 2s ease infinite",
                  }}
                >
                  <svg style={{ width: "18px", height: "18px", color: "#fbbf24" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Call Now</div>
                  <div>(866) 204-3787</div>
                </div>
              </a>

              <Link
                href="/?step=1"
                style={{
                  padding: "12px 28px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 15px rgba(245,158,11,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 25px rgba(245,158,11,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(245,158,11,0.35)";
                }}
              >
                Free Estimate
              </Link>
            </div>

            {/* ---- Mobile: phone + hamburger ---- */}
            <div className="navbar-mobile" style={{ display: "none", alignItems: "center", gap: "6px" }}>
              <a
                href="tel:+18662043787"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "rgba(245,158,11,0.15)",
                  color: "#fbbf24",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                <svg style={{ width: "16px", height: "16px" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <svg style={{ width: "22px", height: "22px" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg style={{ width: "22px", height: "22px" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ---- Mobile Dropdown ---- */}
        <div
          className="navbar-mobile-dropdown"
          style={{
            display: "none",
            overflow: "hidden",
            maxHeight: mobileOpen ? "600px" : "0",
            transition: "max-height 0.3s ease",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "12px 16px 20px",
            }}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    color: active ? "#fbbf24" : "#e2e8f0",
                    background: active ? "rgba(255,255,255,0.06)" : "transparent",
                    marginBottom: "2px",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile services accordion */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "14px 16px",
                borderRadius: "10px",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#e2e8f0",
                background: mobileServicesOpen ? "rgba(255,255,255,0.06)" : "transparent",
                border: "none",
                cursor: "pointer",
                marginBottom: "2px",
              }}
            >
              Services
              <svg
                style={{
                  width: "16px",
                  height: "16px",
                  transition: "transform 0.2s",
                  transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div style={{ paddingLeft: "12px", marginBottom: "8px" }}>
                {services.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    style={{
                      display: "block",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      color: "#94a3b8",
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile CTA */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "8px", paddingTop: "16px" }}>
              <Link
                href="/?step=1"
                style={{
                  display: "block",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  textAlign: "center",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  boxShadow: "0 4px 15px rgba(245,158,11,0.3)",
                }}
              >
                Get Your Free Estimate
              </Link>
              <a
                href="tel:+18662043787"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  marginTop: "8px",
                  color: "#cbd5e1",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                <svg style={{ width: "16px", height: "16px", color: "#fbbf24" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                (866) 204-3787
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ============ RESPONSIVE CSS ============ */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.3); }
          70% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        .navbar-desktop {
          display: flex !important;
        }
        .navbar-mobile {
          display: none !important;
        }
        .navbar-mobile-dropdown {
          display: none !important;
        }
        .navbar-topbar-hours {
          display: flex !important;
        }
        @media (max-width: 900px) {
          .navbar-desktop {
            display: none !important;
          }
          .navbar-mobile {
            display: flex !important;
          }
          .navbar-mobile-dropdown {
            display: block !important;
          }
          .navbar-topbar-hours {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
