// import { GetStaticProps } from "next";
"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Sponsors from "@/components/ui/Sponsors";
import CoreCompetencies from "../components/ui/CoreCompetencies";
import TeamMember from "@/components/ui/TeamMember";

import TeamPage from "@/pages/TeamPage";

import { Social } from "../typings";
// import { fetchSocial } from "../utils/fetchSocials";
import { groq } from "next-sanity";
// pages/api/authors.js
import { client } from "../lib/sanity";
import Team from "@/components/ui/Team";
import Testimonials from "@/components/ui/Testimonials";
import NewsSection from "@/components/ui/NewsSection";

// type Props = {
//   // pageInfo: PageInfo;
//   // experiences: Experience[];
//   // skills: Skill[];
//   // projects: Project[];
//   socials: Social[];
// };

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
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
};

const Home = () => {
  const teamMembers = [
    {
      name: "John Doe",
      position: "CEO",
      imageUrl: "/images/Team1.jpg",
    },
  ];

  // Function to replace line breaks with <br> tags and preserve spaces
  function formatProductDescription(description: string) {
    return description
      .split("\n") // Split the description by line breaks
      .map((paragraph, index) => (
        <React.Fragment key={index}>
          {paragraph}
          <br /> {/* Add <br> tag for line breaks */}
        </React.Fragment>
      ));
  }

  const [homepageInfo, setHomepageInfo] = useState(null);
  const [sponsors, setSponsors] = useState(null);
  const [team, setTeam] = useState(null);
  const [products, setProducts] = useState(null);
  const [news, setNews] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = "b8xc3xdp";
    const datasetName = "production";

    const queryHomeInfo = groq`*[_type == "homepage"][0] {
      cover{asset -> {url}},
      title,
      caption,
      aboutUs,
      aboutUsImage {
        asset->{url}
      },
      coreCompetencies[]{

        ...,
        "imageUrl": image.asset->url 
      }
    }`;

    const querySponsors = groq`*[_type == "sponsor"] {
      name,
      "logoUrl": logo.asset->url
    }`;

    const combinedQuery = groq`{
      "homepageInfo": *[_type == "homepage"][0] {
        cover{
          asset-> {url}
        },
        title, 
        caption,
        aboutUs,
        aboutUsImage {
          asset->{url}
        },
        coreCompetencies[]{
          ...,
          "imageUrl": image.asset->url 
        }
      },
      "sponsors": *[_type == "sponsor"] {
        name,
        "logoUrl": logo.asset->url
      },

      "careers": *[_type == "career"] {
        jobTitle,
        jobType,
        responsibilities,
        requirements
      },

   "team" : *[_type == "team"] {
        name,
        role,
        introduction,
        linkedUrl,
        "photoUrl": photo.asset->url,
        email
      },

     "products" : *[_type == "product"] {
      productName,
      productDescription,
      "productImageUrl": productImage.asset->url,
      demoLink,
      "softwareUrl": software.asset->url,
    },
    "news" : *[_type == "news"] {
      title,
      description
    },
    "footer" : *[_type == "footer"][0] {
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
    },
    "technology" : *[_type == "technology"][0] {
      youtubeVideoLink,
      technologies[] {
        title,
        description,
        "imageUrl": image.asset->url
      }
    },
    "services" : *[_type == "services"][0] {
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
    },
    "testimonials" : *[_type == "testimonial"][0] {
      showPage,
      "testimonials": testimonials[] {
        givenBy,
        companyName,
        "companyLogoUrl": companyLogo.asset->url,
        description
      }
    }
    
    }`;

    const fetchHomeInfo = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${encodeURIComponent(
            // queryHomeInfo
            combinedQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch homepage data");
        }

        const data = await response.json();
        console.log("DATA ==> ", data.result);
        setHomepageInfo(data.result.homepageInfo);
        setSponsors(data.result.sponsors);
        setTeam(data.result.team);
        setProducts(data.result.products);
        setNews(data.result.news);
        setTestimonials(data.result.testimonials["testimonials"]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        setHomepageInfo(null);
        setLoading(false);
      }
    };

    fetchHomeInfo();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      {loading ? (
        <div className="w-full h-96 bg-gray-200"></div>
      ) : (
        <section
          className="text-center p-8 relative"
          style={{
            backgroundImage: `url(' ${homepageInfo?.cover?.asset.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "500px",
          }}
          id="homecover"
        >
          <div className="h-full flex flex-col justify-center items-center absolute inset-0"></div>
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="text-white text-lg font-bold">
              <h1 className="text-6xl font-bold my-4 text-white">
                {" "}
                {homepageInfo?.title}
              </h1>
              <p>{homepageInfo?.caption}</p>
            </div>
          </div>
        </section>
      )}

      {/* About Us */}
      <section
        className="flex items-center justify-center p-8 bg-white min-h-[75vh]"
        id="about"
      >
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
            <div className="md:w-1/2 pr-8">
              <h2 className="text-3xl font-bold mb-4">About Us</h2>
              <div className="w-24 h-1 bg-blue-600 mb-6"></div>
              <p className="text-lg mb-4">
                {formatProductDescription(homepageInfo?.aboutUs)}
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src={homepageInfo?.aboutUsImage?.asset.url}
                alt="About Us"
                width={400}
                height={600}
                layout="responsive"
              />
            </div>
          </div>
        )}
      </section>

      {/* Technology */}
      {loading ? (
        <SkeletonLoader />
      ) : (
        <CoreCompetencies data={homepageInfo?.coreCompetencies} />
      )}

      {/* Team Section */}
      {/* <section className="bg-white py-8 min-h-[60vh]" id="team">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold">Team</h2>
          <div className="border-b-4 border-blue-500 w-24 mb-4"></div>
          <div className="flex justify-around flex-wrap">
            <div className="flex justify-around flex-wrap">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  position={member.position}
                  imageUrl={member.imageUrl}
                />
              ))}
            </div>{" "}
          </div>
        </div>
      </section> */}

      <Team teamMembers={team} />

      {/* Press */}
      {/* <section className="bg-gray-100 py-8 min-h-[50vh]" id="news">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold">News/ Press</h2>
          <div className="border-b-4 border-blue-500 w-24 mb-4"></div>
          <div className="flex justify-around flex-wrap">
            <Image
              src="/images/4.jpg"
              alt="Press Logo"
              width={200}
              height={100}
            />
          </div>
        </div>
      </section> */}
      <NewsSection news={news} />

      {/* Sponsors */}
      <Sponsors sponsors={sponsors} />

      {/* Testimonials */}
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      {/* <section className="bg-white py-8 min-h-[60vh]" id="testimonials">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold">Testimonials</h2>
          <div className="border-b-4 border-blue-500 w-24 mb-4"></div>
          <div
            className="flex overflow-x-scroll no-scrollbar"
            style={{ height: "250px" }}
          >
            <div
              className="shadow-lg rounded-lg mx-4 flex-shrink-0"
              style={{
                minWidth: "33.33vw",
                maxWidth: "50vw",
                height: "250px",
              }}
            >
              <div className="flex items-center p-4 h-full">
                <Image
                  src="/images/logo1.png"
                  alt="Logo 1"
                  width={96}
                  height={96}
                />
                <div className="ml-4">
                  <blockquote>
                    " Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis, quis cupiditate adipisci consequatur, sequi dolor
                    error ex magnam optio hic placeat quam explicabo dignissimos
                    est nihil! Doloremque obcaecati ipsum esse in nobis nostrum
                    sunt aspernatur laboriosam accusamus recusandae, quos
                    delectus assumenda, laudantium itaque fugit molestias
                    similique et, beatae ratione atque quis. Consectetur
                    voluptatem sapiente, qui consequatur iusto ipsum "
                  </blockquote>
                  <footer className="font-semibold mt-2">
                    Andrew Saul, CEO
                    <br />
                    Genovation Cars, Inc.
                  </footer>
                </div>
              </div>
            </div>
            <div
              className="shadow-lg rounded-lg mx-4 flex-shrink-0"
              style={{
                minWidth: "33.33vw",
                maxWidth: "50vw",
                height: "250px",
              }}
            >
              <div className="flex items-center p-4 h-full">
                <Image
                  src="/images/logo1.png"
                  alt="Logo 2"
                  width={96}
                  height={96}
                />
                <div className="ml-4">
                  <blockquote>
                    " Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis, quis cupiditate adipisci consequatur, sequi dolor
                    error ex magnam optio hic placeat quam explicabo dignissimos
                    est nihil! Doloremque obcaecati ipsum esse in nobis nostrum
                    sunt aspernatur laboriosam accusamus recusandae, quos
                    delectus assumenda, laudantium itaque fugit molestias
                    similique et, beatae ratione atque quis. Consectetur
                    voluptatem sapiente, qui consequatur iusto ipsum "
                  </blockquote>
                  <footer className="font-semibold mt-2">
                    Brock Fraser, General Manager
                    <br />
                    Cascadia Motion LLC
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
