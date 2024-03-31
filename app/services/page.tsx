"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { groq } from "next-sanity";

interface ServicesData {
  cover: {
    imageUrl: string;
    title: string;
    tagline: string;
  };
  services: {
    title: string;
    imageUrl: string;
    description: string;
  }[];
  contactTagline: string;
}

function formatProductDescription(description: string) {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the description by line breaks and apply formatting
  return description.split("\n").map((paragraph, index) => (
    <React.Fragment key={index}>
      {paragraph.split(urlRegex).map((text, i) => {
        if (text.match(urlRegex)) {
          // Highlight URLs by replacing with anchor tags
          return (
            <a
              key={i}
              href={text}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              {text}
            </a>
          );
        } else {
          return text;
        }
      })}
      <br /> {/* Add <br> tag for line breaks */}
    </React.Fragment>
  ));
}

function Services() {
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);

  useEffect(() => {
    const projectId = "b8xc3xdp";
    const datasetName = "production";
    const servicesQuery = groq`
      {
        "services": *[_type == "services"][0] {
          cover {
            "imageUrl": image.asset->url,
            title,
            tagline
          },
          services[] {
            title,
            "imageUrl": image.asset->url,
            description
          },
          contactTagline
        }
      }
    `;

    const fetchServicesData = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${encodeURIComponent(
            servicesQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch services data");
        }

        const data = await response.json();
        setServicesData(data.result.services);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };

    fetchServicesData();
  }, []);

  if (!servicesData) {
    return (
      <div className="animate-pulse" style={{ minHeight: "65vh" }}>
        <div className="w-full h-20 bg-gray-200 mb-4"></div>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          <div className="md:w-1/2 pr-8">
            <div className="w-24 h-4 bg-gray-200 mb-2"></div>
            <div className="w-full h-4 bg-gray-200 mb-2"></div>
            <div className="w-4/5 h-4 bg-gray-200 mb-2"></div>
            <div className="w-3/4 h-4 bg-gray-200 mb-2"></div>
            <div className="w-2/4 h-4 bg-gray-200 mb-2"></div>
          </div>
          <div className="md:w-1/2">
            <div className="w-full h-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    ); // Render loading state or skeleton here
  }

  return (
    <div>
      {/* Cover section */}
      {servicesData.cover && (
        <section
          className="bg-cover bg-center text-center p-8 relative"
          style={{
            backgroundImage: `url('${servicesData.cover.imageUrl}')`,
            position: "relative",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative">
            <h1 className="text-4xl text-white font-semibold relative z-10">
              {servicesData.cover.title}
            </h1>
            <p className="text-white relative z-10">
              {servicesData.cover.tagline}
            </p>
          </div>
        </section>
      )}

      {/* Services Offering */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Services</h2>
          <div className="border-b-4 border-blue-500 w-24 mx-auto my-4"></div>

          <div className="mt-6">
            {servicesData.services.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-wrap ${
                  index % 2 !== 0 ? "flex-row-reverse" : ""
                } items-center mb-8`}
              >
                <div className="w-full lg:w-1/2 p-4">
                  <div className="h-64 relative">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 p-4">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="text-gray-600">
                    {formatProductDescription(service.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {servicesData.contactTagline && (
        <section className="bg-blue-600 text-white text-center p-8">
          <h2 className="text-3xl">{servicesData.contactTagline}</h2>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-4 py-2 rounded-md mt-4"
          >
            Contact Us
          </Link>
        </section>
      )}
    </div>
  );
}

export default Services;
