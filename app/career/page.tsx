"use client";

import React, { useEffect, useState } from "react";
import groq from "groq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define the structure of your career data for TypeScript (if you're using it)
type CareerData = {
  jobTitle: string;
  jobType: string;
  responsibilities: string[];
  requirements: string[];
};

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse" style={{ minHeight: "65vh" }}>
      <div className="w-full h-20 bg-gray-0 mb-8"></div>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        <div className="md:w-1/2 pr-8">
          <div className="w-32 h-4 bg-gray-200 mb-4"></div>
          <div className="w-full h-4 bg-gray-200 mb-4"></div>
          <div className="w-3/4 h-4 bg-gray-200 mb-4"></div>
          <div className="w-2/4 h-4 bg-gray-200 mb-4"></div>
          <div className="w-1/2 h-4 bg-gray-200 mb-4"></div>
        </div>
        <div className="md:w-1/2">
          <div className="w-full h-64 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

const Careers = () => {
  const [careers, setCareers] = useState<CareerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [defaultOpen, setDefaultOpen] = useState<number | null>(null);

  useEffect(() => {
    const projectId = "b8xc3xdp";
    const datasetName = "production";

    const query = groq`*[_type == "career"] {
      jobTitle,
      jobType,
      responsibilities,
      requirements
    }`;

    const fetchCareers = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${encodeURIComponent(
            query
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch career data");
        }

        const data = await response.json();
        setCareers(data.result); // assuming that the data returned has a 'result' key that contains the career data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching career data:", error);
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  useEffect(() => {
    // Find the index of the "use client" accordion item
    const useClientIndex = careers.findIndex(
      (career) => career.jobTitle === "use client"
    );
    setDefaultOpen(useClientIndex >= 0 ? useClientIndex : null);
  }, [careers]);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <section
      className="bg-white-100 py-8"
      id="careers"
      style={{ minHeight: "65vh" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold">Careers</h2>
        <div className="border-b-4 border-blue-500 w-24 mb-4"></div>

        <Accordion type="single" collapsible defaultOpen={defaultOpen}>
          {careers.map((career, index) => (
            <AccordionItem
              key={index}
              value={career.jobTitle}
              className="mb-4" // Add margin bottom for spacing between accordion items
            >
              <AccordionTrigger className="flex justify-between items-center px-6 py-4 bg-blue-100 text-gray-800 font-medium text-lg rounded-lg cursor-pointer hover:bg-blue-200">
                {career.jobTitle}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg my-2">
                <p>
                  <strong>Job Type:</strong> {career.jobType}
                </p>
                <div>
                  <strong>Responsibilities:</strong>
                  <ul className="list-disc pl-6">
                    {career.responsibilities.map(
                      (responsibility, respIndex) => (
                        <li key={respIndex}>{responsibility}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <strong>Requirements:</strong>
                  <ul className="list-disc pl-6">
                    {career.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Careers;
