"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { groq } from "next-sanity";

function Services() {
  const [servicesData, setServicesData] = useState(null);

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
    return <div className="text-center py-10">Loading...</div>; // Render loading state or skeleton here
  }

  return (
    <div>
      {/* Cover section */}
      {servicesData.cover && (
        <section
          className="bg-cover bg-center text-center p-8"
          style={{ backgroundImage: `url('${servicesData.cover.imageUrl}')` }}
        >
          <h1 className="text-4xl text-white">{servicesData.cover.title}</h1>
          <p className="text-white">{servicesData.cover.tagline}</p>
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
                  <p className="text-gray-600">{service.description}</p>
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
