"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CoreCompetencies from "../components/ui/CoreCompetencies";
import Team from "@/components/ui/Team";
import Testimonials from "@/components/ui/Testimonials";
import NewsSection from "@/components/ui/NewsSection";
import Sponsors from "@/components/ui/Sponsors";
import { groq } from "next-sanity";
import { client } from "../lib/sanity";

// Define types for homepageInfo
interface HomepageInfo {
  cover?: {
    asset?: {
      url?: string;
    };
  };
  title?: string;
  caption?: string;
  aboutUs?: string;
  aboutUsImage?: {
    asset?: {
      url?: string;
    };
  };
  coreCompetencies?: {
    imageUrl?: string;
    // Add other properties if needed
  }[];
  // Add other properties if needed
  sponsors?: {
    name?: string;
    logoUrl?: string;
  }[];
  careers?: {
    jobTitle?: string;
    jobType?: string;
    responsibilities?: string;
    requirements?: string;
  }[];
  team?: {
    name?: string;
    role?: string;
    introduction?: string;
    linkedUrl?: string;
    photoUrl?: string;
    email?: string;
  }[];
  products?: {
    productName?: string;
    productDescription?: string;
    productImageUrl?: string;
    demoLink?: string;
    softwareUrl?: string;
  }[];
  news?: {
    title?: string;
    description?: string;
  }[];
  footer?: {
    logoUrl?: string;
    socialMediaHandles?: {
      platform?: string;
      url?: string;
    }[];
    contactDetails?: {
      addressLine1?: string;
      addressLine2?: string;
      pin?: string;
    };
    copyright?: string;
  };
  technology?: {
    youtubeVideoLink?: string;
    technologies?: {
      title?: string;
      description?: string;
      imageUrl?: string;
    }[];
  };
  services?: {
    cover?: {
      imageUrl?: string;
      title?: string;
      tagline?: string;
    };
    services?: {
      title?: string;
      imageUrl?: string;
      description?: string;
    }[];
    contactTagline?: string;
  };
  // testimonials?: {
  //   showPage?: boolean;
  //   testimonials?: {
  //     givenBy?: string;
  //     companyName?: string;
  //     companyLogoUrl?: string;
  //     description?: string;
  //   }[];
  // };
}

interface Testimonial {
  showPage: boolean;
  testimonials: {
    givenBy?: string;
    companyName?: string;
    companyLogoUrl?: string;
    description?: string;
  }[];
}

interface UseTypewriterProps {
  captions: string[];
  typingSpeed: number;
  clearingSpeed: number;
  delayBetweenCaptions: number;
}

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

const useTypewriter = ({
  captions,
  typingSpeed,
  clearingSpeed,
  delayBetweenCaptions,
}: UseTypewriterProps) => {
  const [captionIndex, setCaptionIndex] = useState(0);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    // Only start the animation if captions are available
    if (captions.length > 0) {
      if (isTyping) {
        if (text.length < captions[captionIndex].length) {
          timeout = setTimeout(() => {
            setText(captions[captionIndex].substring(0, text.length + 1));
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => setIsTyping(false), delayBetweenCaptions);
        }
      } else {
        if (text.length > 0) {
          timeout = setTimeout(() => {
            setText(captions[captionIndex].substring(0, text.length - 1));
          }, clearingSpeed);
        } else {
          setIsTyping(true);
          setCaptionIndex((index) => (index + 1) % captions.length);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    isTyping,
    captions,
    captionIndex,
    typingSpeed,
    clearingSpeed,
    delayBetweenCaptions,
  ]);

  return text;
};

const Home = () => {
  const [homepageInfo, setHomepageInfo] = useState<HomepageInfo | null>(null); // Add type annotation
  const [sponsors, setSponsors] = useState<any[] | null>(null);
  const [team, setTeam] = useState<any[] | null>(null);
  const [competencies, setCompetencies] = useState<any[] | null>(null);
  const [products, setProducts] = useState<any[] | null>(null);
  const [news, setNews] = useState<any[] | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial>({
    showPage: false,
    testimonials: [],
  });
  const [loading, setLoading] = useState(true);
  const [captions, setCaptions] = useState<string[]>([]);

  useEffect(() => {
    const projectId = "b8xc3xdp";
    const datasetName = "production";

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
            combinedQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch homepage data");
        }

        const data = await response.json();
        setHomepageInfo(data.result.homepageInfo);
        setSponsors(data.result.sponsors);
        setTeam(data.result.team);
        setProducts(data.result.products);
        setNews(data.result.news);
        setCaptions(data.result.homepageInfo.caption);
        setTestimonials(data.result.testimonials);
        setCompetencies(data.result.homepageInfo.coreCompetencies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        setHomepageInfo(null);
        setLoading(true);
      }
    };

    fetchHomeInfo();
  }, []);

  const typewriterText = useTypewriter({
    captions, // Pass the fetched captions
    typingSpeed: 150,
    clearingSpeed: 100,
    delayBetweenCaptions: 2000,
  });

  return (
    <div>
      {loading ? (
        <div className="w-full h-96 bg-gray-200"></div>
      ) : (
        <section
          className="text-center p-8 relative"
          style={{
            backgroundImage: `url('${homepageInfo?.cover?.asset?.url}')`,
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
                {homepageInfo?.title}
              </h1>
              <p className="typewriter">
                {typewriterText}
                <span className="typewriter-cursor"></span>
              </p>
            </div>
          </div>
        </section>
      )}

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
              <p className="text-lg mb-4">{homepageInfo?.aboutUs}</p>
            </div>
            <div className="md:w-1/2">
              <Image
                src={homepageInfo?.aboutUsImage?.asset?.url ?? "/images/4.jpg"}
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
        <CoreCompetencies data={competencies ?? []} />
      )}

      {/* Team Section */}
      <Team teamMembers={team ?? []} />

      {/* Press */}
      <NewsSection news={news ?? []} />

      {/* Sponsors */}
      <Sponsors sponsors={sponsors ?? []} />

      {/* Testimonials */}
      {testimonials.showPage && (
        <Testimonials testimonials={testimonials.testimonials} />
      )}
    </div>
  );
};

export default Home;
