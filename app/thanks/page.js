import React from "react";
import Link from "next/link";

/**
 * Thank you page component displayed after form submission
 * Generated from configuration: home improvement online
 * @returns {JSX.Element} The rendered thank you page
 */
export default function ThanksPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Thank You!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your submission has been received successfully.
        </p>
        <p className="mt-6 text-base text-gray-500">
          We&apos;ll be in touch shortly with next steps.
        </p>
        <div className="mt-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-500">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}