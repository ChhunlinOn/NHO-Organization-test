"use client";
import React, { useState } from "react";

// ContactPage.jsx
export default function ContactPage() {
  // State for success and error messages
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  // Handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target as HTMLFormElement); // Extract form data

    // Add access key to the form data
    formData.append("access_key", "cc7b7303-711c-4db0-ae53-db458849051d");

    // Convert form data to an object
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Make a fetch request to Web3Forms API
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json, // Send the form data as JSON
      });

      const result = await response.json(); // Parse the response
      if (result.success) {
        setIsSuccess(true); // Success: Set the success state
        setMessage("Form submitted successfully!");
      } else {
        setIsSuccess(false); // Error: Set the error state
        setMessage("Form submission failed. Please try again.");
      }
    } catch {
      setIsSuccess(false); // Error: Set the error state
      setMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <section className="bg-amber-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-green-600 mb-8">CONTACT US</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Reach out to us for more information on how you can contribute,
            volunteer, or partner with us in our mission to create lasting
            impact and positive change.
          </p>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="bg-gray-200 p-4 rounded w-full text-base"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="bg-gray-200 p-4 rounded w-full text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-200 p-4 rounded w-full text-base"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="bg-gray-200 p-4 rounded w-full text-base"
                />
              </div>

              <textarea
                name="message"
                placeholder="Message"
                className="bg-gray-200 p-4 rounded w-full h-48 border border-blue-400 text-base"
              ></textarea>

              <button
                type="submit"
                className="bg-green-600 text-white py-4 px-6 rounded w-full hover:bg-green-700 transition duration-300 font-medium"
              >
                Submit
              </button>
            </form>

            {/* Display success or error message */}
            {message && (
              <div
                className={`mt-4 p-4 rounded ${
                  isSuccess
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 h-96 md:h-auto min-h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.4750464093706!2d104.90155577645553!3d11.534571644855302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095197b21fa34b%3A0x77a33e5e11d85958!2sNew%20Hope%20for%20Orphans!5e0!3m2!1sen!2sus!4v1713456789012!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="border-0 min-h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing New Hope for Orphans location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
