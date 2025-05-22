import React, { Suspense } from "react";
import Main from "@/components/HomePage/Main";

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
        <Main />
      </Suspense>
    </div>
  );
}