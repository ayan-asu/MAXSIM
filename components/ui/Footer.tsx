"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { groq } from "next-sanity";

export default function Footer() {
  const defaultdata = {
    logoUrl:
      "https://cdn.sanity.io/images/b8xc3xdp/production/4a3ed674a368b742dd890e6186d363cbf360dce6-85x83.svg",
    socialMediaHandles: [
      {
        platform: "facebook",
        url: "https://peacelab-ayan.com/",
      },
      {
        platform: "twitter",
        url: "https://peacelab-ayan.com/",
      },
      {
        platform: "youtube",
        url: "https://peacelab-ayan.com/",
      },
      {
        platform: "linkedin",
        url: "https://peacelab-ayan.com/",
      },
      {
        platform: "google",
        url: "https://peacelab-ayan.com/",
      },
    ],
    contactDetails: {
      addressLine1: "6075 Innovation Way W",
      addressLine2: "Mesa, AZ",
      pin: "85212",
    },
    copyright:
      "Copyright © 2024 MAXSIM Technologies Inc. Powered by MAXSIM Technologies Inc.",
  };
  const [footerData, setFooterData] = useState(defaultdata);

  useEffect(() => {
    const projectId = "b8xc3xdp";
    const datasetName = "production";
    const footerQuery = groq`
      {
        "footer": *[_type == "footer"][0] {
          "logoUrl": logo.asset->url,
          socialMediaHandles[] {
            platform,
            url
          },
          contactDetails {
            addressLine1,
            addressLine2,
            pin

          },
          copyright
        }
      }
    `;

    const fetchFooterData = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${encodeURIComponent(
            footerQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }

        const data = await response.json();
        setFooterData(data.result.footer);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  // if (!footerData) {
  //   return <div>Loading...</div>;
  // }

  const { logoUrl, socialMediaHandles, contactDetails, copyright } = footerData;

  return (
    <footer className="bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo and Social Icons */}
        <div className="flex flex-col items-center mr-12">
          {/* Logo */}
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Footer Logo"
              width={120}
              height={60}
              layout="fixed"
            />
          )}
          {/* Social Icons */}
          <div className="flex mt-4">
            {socialMediaHandles.map((handle, index) => (
              <a key={index} href={handle.url} className="text-blue-600 mx-2">
                {handle.platform === "facebook" && <FaFacebookF />}
                {handle.platform === "twitter" && <FaTwitter />}
                {handle.platform === "google" && <FaGooglePlusG />}
                {handle.platform === "linkedin" && <FaLinkedinIn />}
                {handle.platform === "youtube" && <FaYoutube />}
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col mr-12">
          <h3 className="font-bold mb-2">Our Company</h3>
          <a href="/#about" className="mb-1 hover:text-blue-600">
            About Us
          </a>
          <a href="/technology" className="mb-1 hover:text-blue-600">
            Technology
          </a>
          <a href="/#team" className="mb-1 hover:text-blue-600">
            Team
          </a>
          <a href="/career" className="mb-1 hover:text-blue-600">
            Careers
          </a>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col">
          <h3 className="font-bold mb-2">Contact Details</h3>
          <address className="not-italic mb-4">
            {contactDetails.addressLine1}
            <br />
            {contactDetails.addressLine2}
            <br />
            {contactDetails.pin}
          </address>
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            <a href="/contact"> Contact Us</a>
          </button>
        </div>
      </div>
      <div className="text-center text-sm mt-4">
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
