// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";

// export default function Footer() {
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubscribe = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email) {
//       setMessage("Please enter your email address");
//       return;
//     }

//     // Validate email format
//     if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//       setMessage("Please enter a valid email address");
//       return;
//     }

//     setIsLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch("/api/newsletter", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("✅ Thank you for subscribing to our newsletter!");
//         setEmail("");
//       } else {
//         setMessage(
//           `❌ ${data.error || "Something went wrong. Please try again."}`
//         );
//       }
//     } catch {
//       setMessage("❌ Network error. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <footer className="bg-[#43A047] text-white px-5 lg:px-[220px] py-[40px]">
//       <div className="max-w-[1440px] mx-auto">
//         <div className="flex flex-col justify-between gap-12 lg:flex-row">
//           <div className="flex-1 min-w-[250px]">
//             <div className="mb-8 w-85 h-18">
//               <Image
//                 src="/NHO-LOGO.png"
//                 alt="New Hope for Orphans"
//                 width={0}
//                 height={0}
//                 sizes="100vw"
//                 className="object-contain w-full h-full"
//               />
//             </div>
//             <div className="space-y-5 text-lg">
//               <div className="flex items-start gap-3">
//                 <svg
//                   width="24"
//                   height="24"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 9c4-4 8-7.582 8-12a8 8 0 1 0-16 0c0 4.418 4 8 8 12Z" />
//                 </svg>
//                 <p>
//                   No 97 St. 85BT, Sangkat Boeng Tampon,
//                   <br />
//                   Khan Meanchey, Phnom Penh-Cambodia
//                   <br />
//                   P.O.Box: 1680
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <svg
//                   width="24"
//                   height="24"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M22 16.92v3c0 .53-.21 1.04-.59 1.41-.38.38-.88.59-1.41.59-1.56.09-3.07-.23-4.45-.92a15.91 15.91 0 0 1-5.04-3.61 15.91 15.91 0 0 1-3.61-5.04c-.69-1.38-1.01-2.89-.92-4.45 0-.53.21-1.04.59-1.41.37-.38.88-.59 1.41-.59h3c.27 0 .52.11.71.29l2 2a1.01 1.01 0 0 1 .29.71c0 .27-.1.52-.29.71l-1.27 1.27a12.01 12.01 0 0 0 5.04 5.04L17 13.41a1.01 1.01 0 0 1 .71-.29c.27 0 .52.1.71.29l2 2c.19.19.29.44.29.71Z" />
//                 </svg>
//                 <p>(+855) 12 736 426 / 12 737 695</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <svg
//                   width="24"
//                   height="24"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M4 4h16a2 2 0 0 1 2 2v0 12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z" />
//                   <path d="m22 6-10 7L2 6" />
//                 </svg>
//                 <a href="mailto:info@nhocambodia.org" className="underline">
//                   info@nhocambodia.org
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col flex-1 gap-6">
//             <div className="flex flex-col justify-between gap-10 sm:flex-row">
//               {/* What We Do */}
//               <div>
//                 <h3 className="mb-4 text-lg font-bold">What We Do</h3>
//                 <ul className="space-y-3 text-lg">
//                   <li>
//                     <Link
//                       href="/spiritual-development"
//                       className="hover:underline"
//                     >
//                       Spiritual Development
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/university-sponsorship"
//                       className="hover:underline"
//                     >
//                       University sponsorship
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/vocational-training"
//                       className="hover:underline"
//                     >
//                       Skills/Vocational Training
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/kids-camp" className="hover:underline">
//                       Kids Camp
//                     </Link>
//                   </li>
//                 </ul>
//               </div>

//               {/* About Us */}
//               <div>
//                 <h3 className="mb-4 text-lg font-bold">
//                   <Link href="/about-us" className="hover:underline">
//                     About Us
//                   </Link>
//                 </h3>
//                 <ul className="space-y-3 text-lg">
//                   <li>
//                     <Link href="/vision-mission" className="hover:underline">
//                       Vision and Mission
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/founder-message" className="hover:underline">
//                       Founder Message
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/house-parent-profile"
//                       className="hover:underline"
//                     >
//                       House Parent Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/contact" className="hover:underline">
//                       Contact us
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/news" className="hover:underline">
//                       News
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Newsletter Subscription */}
//             <div className="mt-6">
//               <form
//                 onSubmit={handleSubscribe}
//                 className="flex flex-col items-center w-full max-w-2xl gap-3 mx-auto sm:flex-row"
//               >
//                 <input
//                   type="email"
//                   placeholder="Enter your email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   disabled={isLoading}
//                   className="w-full px-4 py-3 rounded text-black bg-white placeholder:text-gray-500 border-none shadow focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.5)] transition-shadow duration-300 disabled:opacity-50"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full px-6 py-3 font-semibold text-white transition-colors bg-black rounded cursor-pointer sm:w-auto hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   {isLoading ? "Subscribing..." : "Subscribe"}
//                 </button>
//               </form>

//               {message && (
//                 <p
//                   className={`mt-3 text-center text-sm font-medium ${
//                     message.includes("✅") ? "text-green-300" : "text-red-300"
//                   }`}
//                 >
//                   {message}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Thank you for subscribing to our newsletter!");
        setEmail("");
      } else {
        setMessage(
          `❌ ${data.error || "Something went wrong. Please try again."}`
        );
      }
    } catch {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#43A047] text-white px-5 lg:px-[220px] py-[40px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="flex-1 min-w-[250px]">
            <div>
              <div className="flex items-center gap-4 mb-6">
                {/* Logo Icon */}
                <div className="flex-shrink-0 w-24 h-24">
                  <Image
                    src="/logoNHCH.png"
                    alt="New Hope for Orphans"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Organization Name */}
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold tracking-wider">
                    NEW HOPE
                  </h1>
                  <h2 className="text-2xl font-bold tracking-wider">
                    <span className="text-[#C8A951]">CHILDREN&#39;S</span> HOMES
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-5 text-lg">
              <div className="flex items-start gap-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0 mt-1"
                >
                  <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 9c4-4 8-7.582 8-12a8 8 0 1 0-16 0c0 4.418 4 8 8 12Z" />
                </svg>
                <p>
                  No 97 St. 85BT, Sangkat Boeng Tampon,
                  <br />
                  Khan Meanchey, Phnom Penh-Cambodia
                  <br />
                  P.O.Box: 1680
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0"
                >
                  <path d="M22 16.92v3c0 .53-.21 1.04-.59 1.41-.38.38-.88.59-1.41.59-1.56.09-3.07-.23-4.45-.92a15.91 15.91 0 0 1-5.04-3.61 15.91 15.91 0 0 1-3.61-5.04c-.69-1.38-1.01-2.89-.92-4.45 0-.53.21-1.04.59-1.41.37-.38.88-.59 1.41-.59h3c.27 0 .52.11.71.29l2 2a1.01 1.01 0 0 1 .29.71c0 .27-.1.52-.29.71l-1.27 1.27a12.01 12.01 0 0 0 5.04 5.04L17 13.41a1.01 1.01 0 0 1 .71-.29c.27 0 .52.1.71.29l2 2c.19.19.29.44.29.71Z" />
                </svg>
                <p>(+855) 12 736 426 / 12 737 695</p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0"
                >
                  <path d="M4 4h16a2 2 0 0 1 2 2v0 12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
                <a href="mailto:info@nhocambodia.org" className="underline">
                  info@nhocambodia.org
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-6">
            <div className="flex flex-col justify-between gap-10 sm:flex-row">
              {/* What We Do */}
              <div>
                <h3 className="mb-4 text-lg font-bold">What We Do</h3>
                <ul className="space-y-3 text-lg">
                  <li>
                    <Link
                      href="/spiritual-development"
                      className="hover:underline"
                    >
                      Spiritual Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/university-sponsorship"
                      className="hover:underline"
                    >
                      University sponsorship
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/vocational-training"
                      className="hover:underline"
                    >
                      Skills/Vocational Training
                    </Link>
                  </li>
                  <li>
                    <Link href="/kids-camp" className="hover:underline">
                      Kids Camp
                    </Link>
                  </li>
                </ul>
              </div>

              {/* About Us */}
              <div>
                <h3 className="mb-4 text-lg font-bold">
                  <Link href="/about-us" className="hover:underline">
                    About Us
                  </Link>
                </h3>
                <ul className="space-y-3 text-lg">
                  <li>
                    <Link href="/vision-mission" className="hover:underline">
                      Vision and Mission
                    </Link>
                  </li>
                  <li>
                    <Link href="/founder-message" className="hover:underline">
                      Founder Message
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/house-parent-profile"
                      className="hover:underline"
                    >
                      House Parent Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:underline">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link href="/news" className="hover:underline">
                      News
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col items-center w-full max-w-2xl gap-3 mx-auto sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded text-black bg-white placeholder:text-gray-500 border-none shadow focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.5)] transition-shadow duration-300 disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 font-semibold text-white transition-colors bg-black rounded cursor-pointer sm:w-auto hover:bg-opacity-80 disabled:opacity-50"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {message && (
                <p
                  className={`mt-3 text-center text-sm font-medium ${
                    message.includes("✅") ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
