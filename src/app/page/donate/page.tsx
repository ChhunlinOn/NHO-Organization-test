// "use client";

// import { Copy, Check } from "lucide-react";
// import { useState } from "react";

// export default function DonatePage() {
//   const [copiedField, setCopiedField] = useState<string | null>(null);

//   const copyToClipboard = (text: string, field: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedField(field);
//     setTimeout(() => setCopiedField(null), 2000);
//   };

//   const bankingInfo = {
//     bankName: "ACLEDA Bank Plc.",
//     bankAddress:
//       "# 61, Preah Monivong Blvd., Sangkat Srah Chork, Khan Daun Penh, Phnom Penh, Cambodia",
//     telephone: "(855)23- 994 444 / 15- 999 233",
//     swift: "ACLBKHPP",
//     beneficiaryName: "New Hope Children's Homes",
//     accountNumber: "00010399848413",
//   };

//   const intermediaryBanks = [
//     {
//       name: "Wells Fargo Bank, National Association",
//       address:
//         "30 HUDSON YARDS 63RD FLOOR NEW YORK, NY 10001 UNITED STATE OF AMERICA",
//       swift: "PNBPUS3NNYC",
//       chips: "0509",
//       fed: "026005092",
//     },
//     {
//       name: "Standard Chartered Bank, New York, U.S.A.",
//       swift: "SCBLUS33",
//       chips: "0256",
//       fed: "026002561",
//     },
//     {
//       name: "Bank of America",
//       address: "222 BROADWAY NEW YORK, NY UNITED STATE of AMERICA 10038",
//       swift: "BOFAUS3N",
//       fed: "026009593",
//       chips: "0959",
//     },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen mt-20">
//       {/* Hero Section */}
//       <section className="bg-[#3D8B40] text-white py-16 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="mb-4 text-4xl font-bold md:text-5xl text-balance">
//             Make a Difference Today
//           </h1>
//           <p className="text-lg leading-relaxed md:text-xl text-white/90">
//             Your donation provides shelter, education, and hope to orphaned
//             children in Cambodia
//           </p>
//         </div>
//       </section>

//       <section className="px-4 py-12 bg-white">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">
//             How to Donate
//           </h2>
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
//                 1
//               </div>
//               <h3 className="mb-2 font-semibold">Copy Account Details</h3>
//               <p className="text-sm text-muted-foreground">
//                 Click the copy buttons below to copy the beneficiary name and
//                 account number
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
//                 2
//               </div>
//               <h3 className="mb-2 font-semibold">Visit Your Bank</h3>
//               <p className="text-sm text-muted-foreground">
//                 Log into your online banking or visit your local branch to
//                 initiate a wire transfer
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
//                 3
//               </div>
//               <h3 className="mb-2 font-semibold">Complete Transfer</h3>
//               <p className="text-sm text-muted-foreground">
//                 Enter the account details and complete your donation. 100% goes
//                 to the children
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 px-4 bg-[#3D8B40]/5">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-8 text-center">
//             <h2 className="mb-2 text-2xl font-bold md:text-3xl">
//               Essential Account Information
//             </h2>
//             <p className="text-muted-foreground">
//               Copy these details to complete your wire transfer
//             </p>
//           </div>

//           {/* Beneficiary Information - Most Important */}
//           <div className="mb-6 rounded-xl border-2 border-[#3D8B40] bg-white shadow-lg p-6 md:p-8">
//             <div className="mb-6 text-center">
//               <div className="inline-block bg-[#3D8B40]/10 text-[#3D8B40] px-4 py-2 rounded-full text-sm font-semibold mb-3">
//                 REQUIRED INFORMATION
//               </div>
//               <h3 className="text-xl md:text-2xl font-bold text-[#3D8B40]">
//                 Beneficiary Details
//               </h3>
//             </div>

//             <div className="space-y-6">
//               <div className="p-4 rounded-lg bg-gray-50 md:p-6">
//                 <div className="flex items-start justify-between gap-4 mb-2">
//                   <div className="text-sm font-medium text-muted-foreground">
//                     Beneficiary Name
//                   </div>
//                   <button
//                     onClick={() =>
//                       copyToClipboard(
//                         bankingInfo.beneficiaryName,
//                         "beneficiaryName"
//                       )
//                     }
//                     className="flex items-center gap-2 text-[#3D8B40] hover:text-[#2d6b30] transition-colors text-sm font-medium"
//                   >
//                     {copiedField === "beneficiaryName" ? (
//                       <>
//                         <Check className="w-4 h-4" />
//                         Copied!
//                       </>
//                     ) : (
//                       <>
//                         <Copy className="w-4 h-4" />
//                         Copy
//                       </>
//                     )}
//                   </button>
//                 </div>
//                 <div className="text-xl font-bold md:text-2xl">
//                   {bankingInfo.beneficiaryName}
//                 </div>
//               </div>

//               <div className="p-4 rounded-lg bg-gray-50 md:p-6">
//                 <div className="flex items-start justify-between gap-4 mb-2">
//                   <div className="text-sm font-medium text-muted-foreground">
//                     Account Number
//                   </div>
//                   <button
//                     onClick={() =>
//                       copyToClipboard(
//                         bankingInfo.accountNumber,
//                         "accountNumber"
//                       )
//                     }
//                     className="flex items-center gap-2 text-[#3D8B40] hover:text-[#2d6b30] transition-colors text-sm font-medium"
//                   >
//                     {copiedField === "accountNumber" ? (
//                       <>
//                         <Check className="w-4 h-4" />
//                         Copied!
//                       </>
//                     ) : (
//                       <>
//                         <Copy className="w-4 h-4" />
//                         Copy
//                       </>
//                     )}
//                   </button>
//                 </div>
//                 <div className="font-mono text-2xl font-bold tracking-wider md:text-3xl">
//                   {bankingInfo.accountNumber}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 bg-white border shadow-md rounded-xl md:p-8">
//             <h3 className="mb-6 text-xl font-bold">Bank Information</h3>

//             <div className="space-y-4">
//               <div className="flex items-start justify-between gap-4 pb-4 border-b">
//                 <div className="flex-1">
//                   <div className="mb-1 text-sm text-muted-foreground">
//                     Bank Name
//                   </div>
//                   <div className="font-semibold">{bankingInfo.bankName}</div>
//                 </div>
//                 <button
//                   onClick={() =>
//                     copyToClipboard(bankingInfo.bankName, "bankName")
//                   }
//                   className="text-[#3D8B40] hover:text-[#2d6b30] transition-colors p-2"
//                   title="Copy bank name"
//                 >
//                   {copiedField === "bankName" ? (
//                     <Check className="w-5 h-5" />
//                   ) : (
//                     <Copy className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>

//               <div className="flex items-start justify-between gap-4 pb-4 border-b">
//                 <div className="flex-1">
//                   <div className="mb-1 text-sm text-muted-foreground">
//                     SWIFT Code
//                   </div>
//                   <div className="font-mono text-lg font-bold">
//                     {bankingInfo.swift}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => copyToClipboard(bankingInfo.swift, "swift")}
//                   className="text-[#3D8B40] hover:text-[#2d6b30] transition-colors p-2"
//                   title="Copy SWIFT code"
//                 >
//                   {copiedField === "swift" ? (
//                     <Check className="w-5 h-5" />
//                   ) : (
//                     <Copy className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>

//               <div className="flex items-start justify-between gap-4 pb-4 border-b">
//                 <div className="flex-1">
//                   <div className="mb-1 text-sm text-muted-foreground">
//                     Bank Address
//                   </div>
//                   <div className="text-sm">{bankingInfo.bankAddress}</div>
//                 </div>
//                 <button
//                   onClick={() =>
//                     copyToClipboard(bankingInfo.bankAddress, "bankAddress")
//                   }
//                   className="text-[#3D8B40] hover:text-[#2d6b30] transition-colors p-2"
//                   title="Copy address"
//                 >
//                   {copiedField === "bankAddress" ? (
//                     <Check className="w-5 h-5" />
//                   ) : (
//                     <Copy className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>

//               <div className="flex items-start justify-between gap-4">
//                 <div className="flex-1">
//                   <div className="mb-1 text-sm text-muted-foreground">
//                     Bank Telephone
//                   </div>
//                   <div className="font-medium">{bankingInfo.telephone}</div>
//                 </div>
//                 <button
//                   onClick={() =>
//                     copyToClipboard(bankingInfo.telephone, "telephone")
//                   }
//                   className="text-[#3D8B40] hover:text-[#2d6b30] transition-colors p-2"
//                   title="Copy phone number"
//                 >
//                   {copiedField === "telephone" ? (
//                     <Check className="w-5 h-5" />
//                   ) : (
//                     <Copy className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="px-4 py-12 bg-white">
//         <div className="max-w-4xl mx-auto">
//           <div className="p-6 border rounded-xl bg-gray-50 md:p-8">
//             <div className="mb-6">
//               <h3 className="mb-2 text-xl font-bold">Intermediary Banks</h3>
//               <p className="text-sm text-muted-foreground">
//                 Some international banks may require an intermediary bank. If
//                 your bank asks for this information, use one of the options
//                 below:
//               </p>
//             </div>

//             <div className="space-y-4">
//               {intermediaryBanks.map((bank, index) => (
//                 <div key={index} className="p-4 bg-white border rounded-lg">
//                   <h4 className="font-semibold mb-3 text-[#3D8B40]">
//                     {bank.name}
//                   </h4>
//                   <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
//                     <div>
//                       <span className="font-medium text-muted-foreground">
//                         SWIFT:
//                       </span>{" "}
//                       <span className="font-mono font-semibold">
//                         {bank.swift}
//                       </span>
//                     </div>
//                     {bank.chips && (
//                       <div>
//                         <span className="font-medium text-muted-foreground">
//                           CHIPS ABA:
//                         </span>{" "}
//                         <span className="font-mono">{bank.chips}</span>
//                       </div>
//                     )}
//                     {bank.fed && (
//                       <div>
//                         <span className="font-medium text-muted-foreground">
//                           FED ABA:
//                         </span>{" "}
//                         <span className="font-mono">{bank.fed}</span>
//                       </div>
//                     )}
//                     {bank.address && (
//                       <div className="sm:col-span-2">
//                         <span className="font-medium text-muted-foreground">
//                           Address:
//                         </span>{" "}
//                         <span className="text-xs">{bank.address}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 px-4 bg-[#3D8B40]/5">
//         <div className="max-w-4xl mx-auto">
//           <div className="p-6 text-center bg-white shadow-md rounded-xl md:p-8">
//             <h3 className="mb-3 text-xl font-bold md:text-2xl">Need Help?</h3>
//             <p className="max-w-2xl mx-auto mb-6 text-muted-foreground">
//               Our team is ready to assist you with any questions about wire
//               transfers or alternative donation methods.
//             </p>
//             <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
//               <a
//                 href="mailto:info@nhocambodia.org"
//                 className="inline-flex items-center gap-2 bg-[#3D8B40] text-white px-6 py-3 rounded-lg hover:bg-[#2d6b30] transition-colors font-medium"
//               >
//                 Email Us
//               </a>
//               <a
//                 href="tel:+85512736426"
//                 className="inline-flex items-center gap-2 border-2 border-[#3D8B40] text-[#3D8B40] px-6 py-3 rounded-lg hover:bg-[#3D8B40] hover:text-white transition-colors font-medium"
//               >
//                 Call Us
//               </a>
//             </div>
//             <div className="mt-6 text-sm text-muted-foreground">
//               <div>Email: info@nhocambodia.org</div>
//               <div>Phone: (+855) 12 736 426</div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function DonatePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const bankingInfo = {
    bankName: "ACLEDA Bank Plc.",
    bankAddress:
      "# 61, Preah Monivong Blvd., Sangkat Srah Chork, Khan Daun Penh, Phnom Penh, Cambodia",
    telephone: "(855)23- 994 444 / 15- 999 233",
    swift: "ACLBKHPP",
    beneficiaryName: "New Hope Children's Homes",
    accountNumber: "00010399848413",
  };

  const intermediaryBanks = [
    {
      name: "Wells Fargo Bank, National Association",
      address:
        "30 HUDSON YARDS 63RD FLOOR NEW YORK, NY 10001 UNITED STATE OF AMERICA",
      swift: "PNBPUS3NNYC",
      chips: "0509",
      fed: "026005092",
    },
    {
      name: "Standard Chartered Bank, New York, U.S.A.",
      swift: "SCBLUS33",
      chips: "0256",
      fed: "026002561",
    },
    {
      name: "Bank of America",
      address: "222 BROADWAY NEW YORK, NY UNITED STATE of AMERICA 10038",
      swift: "BOFAUS3N",
      fed: "026009593",
      chips: "0959",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-20">
      {/* Hero Section */}
      <section className="bg-[#3D8B40] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl text-balance">
            Make a Difference Today
          </h1>
          <p className="text-lg leading-relaxed md:text-xl text-white/90">
            Your donation provides shelter, education, and hope to orphaned
            children in Cambodia
          </p>
        </div>
      </section>

      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
            {/* QR Code Column */}
            <div className="flex flex-col items-center justify-center p-8 bg-[#3D8B40]/5 rounded-xl border-2 border-[#3D8B40]/20">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#3D8B40]">
                Scan to Donate
              </h3>
              <p className="mb-6 text-sm text-center text-muted-foreground">
                Use your mobile banking app to scan and donate instantly
              </p>
              {/* QR Code Placeholder - Replace with actual QR code image */}
              <div className="w-64 h-64 bg-white rounded-lg border-2 border-dashed border-[#3D8B40]/30 flex items-center justify-center">
                <div className="p-4 text-center">
                  <div className="mb-2 text-4xl">📱</div>
                  <p className="text-sm text-muted-foreground">QR Code</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add your QR code image here
                  </p>
                </div>
              </div>
              <p className="max-w-xs mt-4 text-xs text-center text-muted-foreground">
                Scan with your banking app or mobile payment service
              </p>
            </div>

            {/* Wire Transfer Column */}
            <div className="flex flex-col justify-center">
              <h3 className="mb-4 text-xl font-bold md:text-2xl">
                Or Donate via Wire Transfer
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                For larger donations or if you prefer traditional banking, use
                the wire transfer details below. All information can be easily
                copied with one click.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-sm">
                    100% of your donation goes directly to the children
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-sm">Secure international wire transfer</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-sm">
                    Tax-deductible donation receipt available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#3D8B40]/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">
            How to Donate via Wire Transfer
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="mb-2 font-semibold">Copy Account Details</h3>
              <p className="text-sm text-muted-foreground">
                Click the copy buttons below to copy the beneficiary name and
                account number
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="mb-2 font-semibold">Visit Your Bank</h3>
              <p className="text-sm text-muted-foreground">
                Log into your online banking or visit your local branch to
                initiate a wire transfer
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="mb-2 font-semibold">Complete Transfer</h3>
              <p className="text-sm text-muted-foreground">
                Enter the account details and complete your donation. 100% goes
                to the children
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">
              Essential Account Information
            </h2>
            <p className="text-muted-foreground">
              Copy these details to complete your wire transfer
            </p>
          </div>

          {/* Beneficiary Information - Most Important */}
          <div className="mb-6 rounded-xl border-2 border-[#3D8B40] bg-white shadow-lg p-6 md:p-8">
            <div className="mb-6 text-center">
              <div className="inline-block bg-[#3D8B40]/10 text-[#3D8B40] px-4 py-2 rounded-full text-sm font-semibold mb-3">
                REQUIRED INFORMATION
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#3D8B40]">
                Beneficiary Details
              </h3>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gray-50 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Beneficiary Name
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        bankingInfo.beneficiaryName,
                        "beneficiaryName"
                      )
                    }
                    className="flex items-center gap-2 text-[#3D8B40] hover:text-[#2d6b30] transition-colors text-sm font-medium"
                  >
                    {copiedField === "beneficiaryName" ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xl font-bold md:text-2xl">
                  {bankingInfo.beneficiaryName}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Account Number
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        bankingInfo.accountNumber,
                        "accountNumber"
                      )
                    }
                    className="flex items-center gap-2 text-[#3D8B40] hover:text-[#2d6b30] transition-colors text-sm font-medium"
                  >
                    {copiedField === "accountNumber" ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-2xl font-bold tracking-wider md:text-3xl">
                  {bankingInfo.accountNumber}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border shadow-md rounded-xl md:p-8">
            <h3 className="mb-6 text-xl font-bold">Bank Information</h3>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 pb-4 border-b">
                <div className="flex-1">
                  <div className="mb-1 text-sm text-muted-foreground">
                    Bank Name
                  </div>
                  <div className="font-semibold">{bankingInfo.bankName}</div>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(bankingInfo.bankName, "bankName")
                  }
                  className="text-[#3D8B40] hover:text-[#2d6b30] transition-colors p-2"
                  title="Copy bank name"
                >
                  {copiedField === "bankName" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex items-start justify-between gap-4 pb-4 border-b">
                <div className="flex-1">
                  <div className="mb-1 text-sm text-muted-foreground">
                    SWIFT Code
                  </div>
                  <div className="font-mono text-lg font-bold">
                    {bankingInfo.swift}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(bankingInfo.swift, "swift")}
                  className="text-[#3D8B40] hover:text-[#2d6b30] transition-colors p-2"
                  title="Copy SWIFT code"
                >
                  {copiedField === "swift" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex items-start justify-between gap-4 pb-4 border-b">
                <div className="flex-1">
                  <div className="mb-1 text-sm text-muted-foreground">
                    Bank Address
                  </div>
                  <div className="text-sm">{bankingInfo.bankAddress}</div>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(bankingInfo.bankAddress, "bankAddress")
                  }
                  className="text-[#3D8B40] hover:text-[#2d6b30] transition-colors p-2"
                  title="Copy address"
                >
                  {copiedField === "bankAddress" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-1 text-sm text-muted-foreground">
                    Bank Telephone
                  </div>
                  <div className="font-medium">{bankingInfo.telephone}</div>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(bankingInfo.telephone, "telephone")
                  }
                  className="text-[#3D8B40] hover:text-[#2d6b30] transition-colors p-2"
                  title="Copy phone number"
                >
                  {copiedField === "telephone" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 border rounded-xl bg-gray-50 md:p-8">
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-bold">Intermediary Banks</h3>
              <p className="text-sm text-muted-foreground">
                Some international banks may require an intermediary bank. If
                your bank asks for this information, use one of the options
                below:
              </p>
            </div>

            <div className="space-y-4">
              {intermediaryBanks.map((bank, index) => (
                <div key={index} className="p-4 bg-white border rounded-lg">
                  <h4 className="font-semibold mb-3 text-[#3D8B40]">
                    {bank.name}
                  </h4>
                  <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <span className="font-medium text-muted-foreground">
                        SWIFT:
                      </span>{" "}
                      <span className="font-mono font-semibold">
                        {bank.swift}
                      </span>
                    </div>
                    {bank.chips && (
                      <div>
                        <span className="font-medium text-muted-foreground">
                          CHIPS ABA:
                        </span>{" "}
                        <span className="font-mono">{bank.chips}</span>
                      </div>
                    )}
                    {bank.fed && (
                      <div>
                        <span className="font-medium text-muted-foreground">
                          FED ABA:
                        </span>{" "}
                        <span className="font-mono">{bank.fed}</span>
                      </div>
                    )}
                    {bank.address && (
                      <div className="sm:col-span-2">
                        <span className="font-medium text-muted-foreground">
                          Address:
                        </span>{" "}
                        <span className="text-xs">{bank.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#3D8B40]/5">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 text-center bg-white shadow-md rounded-xl md:p-8">
            <h3 className="mb-3 text-xl font-bold md:text-2xl">Need Help?</h3>
            <p className="max-w-2xl mx-auto mb-6 text-muted-foreground">
              Our team is ready to assist you with any questions about wire
              transfers or alternative donation methods.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:info@nhocambodia.org"
                className="inline-flex items-center gap-2 bg-[#3D8B40] text-white px-6 py-3 rounded-lg hover:bg-[#2d6b30] transition-colors font-medium"
              >
                Email Us
              </a>
              <a
                href="tel:+85512736426"
                className="inline-flex items-center gap-2 border-2 border-[#3D8B40] text-[#3D8B40] px-6 py-3 rounded-lg hover:bg-[#3D8B40] hover:text-white transition-colors font-medium"
              >
                Call Us
              </a>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <div>Email: info@nhocambodia.org</div>
              <div>Phone: (+855) 12 736 426</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
