"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

import { groq } from "next-sanity";

interface TechnologyData {
  youtubeVideoLink: string;
  technologies: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
}

const Technology = () => {
  const [technologyData, setTechnologyData] = useState<TechnologyData | null>(
    null
  );

  useEffect(() => {
    const projectId = "b8xc3xdp";
    const datasetName = "production";
    const technologyQuery = groq`
      {
        "technology": *[_type == "technology"][0] {
          youtubeVideoLink,
          technologies[] {
            title,
            description,
            "imageUrl": image.asset->url
          }
        }
      }
    `;

    const fetchTechnologyData = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${encodeURIComponent(
            technologyQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch technology data");
        }

        const data = await response.json();
        setTechnologyData(data.result.technology);
      } catch (error) {
        console.error("Error fetching technology data:", error);
      }
    };

    fetchTechnologyData();
  }, []);

  const extractYoutubeID = (url: string) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  // Use the youtubeVideoLink from fetched data, if available
  const youtubeVideoId = technologyData
    ? extractYoutubeID(technologyData?.youtubeVideoLink || "")
    : null;

  if (!technologyData) {
    // Return skeleton loader if technologyData is null
    return (
      <div className="animate-pulse" style={{ minHeight: "65vh" }}>
        {/* Skeleton loader content */}
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Content to render when technologyData is available */}
      </div>
    </>
  );
};

export default Technology;
