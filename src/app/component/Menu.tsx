"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

export default function NavigationMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Function to convert text to title case
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mobile dropdown toggles
  const toggleMobileDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const menuItems: MenuItem[] = [
    {
      label: "ABOUT US",
      href: "/about",
      subItems: [
        { label: "VISION & MISSION", href: "/about/vision-mission" },
        { label: "FOUNDER MESSAGE", href: "/page/about/founderMessage" },
        { label: "HOUSE PARENT PROFILE", href: "/about/house-parent-profile" },
      ],
    },
    {
      label: "GET INVOLVED",
      href: "/get-involved",
      subItems: [
        { label: "SPONSOR", href: "/get-involved/sponsor" },
        { label: "VOLUNTEER", href: "/get-involved/volunteer" },
      ],
    },
    {
      label: "RESOURCE",
      href: "/resource",
      subItems: [
        { label: "News", href: "/page/new" },
        { label: "Reports", href: "/resource/reports" },
        { label: "Photos", href: "/resource/photos" },
      ],
    },
  ];

  const whatWeDo = [
    {
      label: "SPIRITUAL DEVELOPMENT",
      href: "/what-we-do/spiritual-development",
    },
    {
      label: "UNIVERSITY SPONSORSHIP",
      href: "/what-we-do/university-sponsorship",
    },
    {
      label: "SKILLS/VOCATIONAL TRAINING",
      href: "/page/WhatWeDo/skill",
    },
    { label: "KID'S CAMP", href: "/what-we-do/kids-camp" },
  ];

  return (
    <nav className="w-full bg-white shadow-md z-50" ref={navRef}>
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/favi.png"
            alt="Logo"
            width={60}
            height={60}
            className="h-14 w-auto"
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-1">
          {/* What We Do Dropdown */}
          <div className="relative group w-64">
            <button className="w-full flex items-center justify-between px-6 py-4 text-black font-bold group-hover:bg-[#43A047] group-hover:text-white transition-all duration-200 rounded-t-md">
              <span className="mx-auto">WHAT WE DO?</span>
              <ChevronDown
                size={16}
                className="transition-transform duration-200 group-hover:rotate-180"
              />
            </button>

            <div className="absolute left-0 mt-0 w-full bg-[#43A047] text-white rounded-b-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-20">
              {whatWeDo.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-6 py-3 font-bold transition-all duration-200 text-center hover:underline hover:underline-offset-15 hover:font-extrabold"
                >
                  {toTitleCase(item.label)}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Menu Items */}
          {menuItems.map((item, index) => (
           <div key={index} className="relative group w-64">
           <div className="w-full flex items-center justify-between px-6 py-4 text-black font-bold group-hover:bg-[#43A047] group-hover:text-white transition-all duration-200 rounded-t-md">
             <span className="mx-auto">{item.label}</span>
             <ChevronDown
               size={16}
               className="transition-transform duration-200 group-hover:rotate-180"
             />
           </div>
           {item.subItems && (
             <div className="absolute left-0 mt-0 w-full bg-[#43A047] text-white rounded-b-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-20">
               {item.subItems.map((subItem, subIndex) => (
                 <Link
                   key={subIndex}
                   href={subItem.href}
                   className="block px-6 py-3 font-bold transition-all duration-200 text-center hover:underline hover:underline-offset-15 hover:font-extrabold"
                 >
                   {toTitleCase(subItem.label)}
                 </Link>
               ))}
             </div>
           )}
         </div>
         
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex lg:items-center lg:space-x-2">
          <Link
            href="/support"
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors"
          >
            SUPPORT
          </Link>
          <Link
            href="/page/contact"
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors"
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            mobileMenuOpen ? "flex" : "hidden"
          } lg:hidden flex-col w-full mt-4 border-t border-gray-200 pt-4`}
        >
          {/* Mobile What We Do Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMobileDropdown("WHAT WE DO?")}
              className="flex items-center justify-between w-full px-4 py-2 text-left text-black font-bold hover:text-green-600"
            >
              <span>WHAT WE DO?</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${
                  activeDropdown === "WHAT WE DO?" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`${
                activeDropdown === "WHAT WE DO?"
                  ? "max-h-96 opacity-100 visible"
                  : "max-h-0 opacity-0 invisible"
              } overflow-hidden transition-all duration-300 ease-in-out bg-green-600 text-white rounded-md mt-1`}
            >
              {whatWeDo.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-6 py-3 font-bold hover:bg-green-700 border-b border-white/20 normal-case"
                >
                  {toTitleCase(item.label)}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Main Menu Items */}
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => toggleMobileDropdown(item.label)}
                className="flex items-center justify-between w-full px-4 py-2 text-left text-black font-bold hover:text-green-600"
              >
                <span>{item.label}</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    activeDropdown === item.label ? "rotate-180" : ""
                  }`}
                />
              </button>
              {item.subItems && (
                <div
                  className={`${
                    activeDropdown === item.label
                      ? "max-h-96 opacity-100 visible"
                      : "max-h-0 opacity-0 invisible"
                  } overflow-hidden transition-all duration-300 ease-in-out bg-green-600 text-white rounded-md mt-1`}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className="block px-6 py-3 font-bold hover:bg-green-700 border-b border-white/20 normal-case"
                    >
                      {toTitleCase(subItem.label)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile Action Buttons */}
          <div className="flex flex-col space-y-2 mt-4">
            <Link
              href="/support"
              className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors text-center"
            >
              SUPPORT
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors text-center"
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
