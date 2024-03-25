"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

import { groq } from "next-sanity";

const Technology = () => {
  const [technologyData, setTechnologyData] = useState(null);

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

  const extractYoutubeID = (url) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  // Use the youtubeVideoLink from fetched data, if available
  const youtubeVideoId = technologyData
    ? extractYoutubeID(technologyData?.youtubeVideoLink)
    : null;

  if (!technologyData) {
    // Return skeleton loader if technologyData is null
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
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold px-4">Technology</h2>
        <div className="mx-4 border-b-4 border-blue-500 w-24 mb-4"></div>

        {/* Embed YouTube video first */}
        {youtubeVideoId && (
          <div className="flex justify-center mb-8">
            <div className="w-full p-4">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Dynamic sections */}
        {technologyData.technologies.map((section, index) => (
          <div
            key={section.title}
            className={`flex flex-wrap mb-8 ${
              index % 2 !== 0 ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-full md:w-1/4 p-4 flex justify-center items-center">
              <Image
                src={section.imageUrl}
                alt={section.title}
                width={500}
                height={300}
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full md:w-3/4 p-4">
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Technology;
