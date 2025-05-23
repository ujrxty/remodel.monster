import React, { Suspense } from "react";
import HomePage from "@/components/HomePage";

/**
 * Main page component for the offer
 * Generated from configuration: home improvement online
 * @returns {JSX.Element} The rendered page
 */
export default function Page() {
  return (
    <div>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-xl font-semibold">Loading...</div>
        </div>
      }>
        <HomePage />
      </Suspense>
    </div>
  );
}