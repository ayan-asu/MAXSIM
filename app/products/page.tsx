"use client";
import React, { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { FaDownload } from "react-icons/fa";

interface Product {
  productName: string;
  productDescription: string;
  productImageUrl: string;
  demoLink: string;
  softwareUrl: string;
  manualUrl?: string;
}

function Page() {
  const [productName, setProductName] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Function to format product description with line breaks and highlighted links
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

  useEffect(() => {
    const projectId = "b8xc3xdp";
    const datasetName = "production";

    const productsQuery = groq`{
      "products": *[_type == "product"] {
        productName,
        productDescription,
        "productImageUrl": productImage.asset->url,
        demoLink,
        "softwareUrl": software.asset->url,
        "manualUrl" : instructions.asset->url
      }
    }`;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${encodeURIComponent(
            productsQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products data");
        }

        const data = await response.json();
        setProducts(data.result.products);
      } catch (error) {
        console.error("Error fetching products data:", error);
      } finally {
        // Set loading to false when data fetching is completed
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch initial query parameter on mount
    const urlParams = new URLSearchParams(window.location.search);
    const productNameParam = urlParams.get("productName");

    // Check if productNameParam is valid before setting the state
    if (typeof productNameParam === "string") {
      setProductName(productNameParam);
    }
  }, [products]);

  useEffect(() => {
    // Find the selected product based on the product name
    if (productName) {
      const selectedProduct = products.find(
        (product) => product.productName === productName
      );
      setSelectedProduct(selectedProduct);
    }
  }, [productName, products]);

  if (loading) {
    // Render skeleton loader while data is being fetched
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
    ); // Replace with your skeleton loader component
  }

  if (!selectedProduct) {
    return <div>Product not found </div>;
  }

  // Extract YouTube video ID from demoLink
  const youtubeVideoId = selectedProduct.demoLink.substring(
    selectedProduct.demoLink.lastIndexOf("/") + 1,
    selectedProduct.demoLink.length
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{selectedProduct.productName}</h2>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition mr-2"
            onClick={() => (window.location.href = selectedProduct.softwareUrl)}
          >
            Try {selectedProduct.productName} Software for free
          </button>
          {/* Updated Contact Us Button */}
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            onClick={() => (window.location.href = "/contact")}
          >
            Purchase
          </button>
        </div>
      </div>
      <div className="border-b-4 border-blue-500 w-24 mb-4"></div>

      <img
        className="md:w-1/4 w-full h-auto rounded-lg mb-4"
        src={selectedProduct.productImageUrl}
        alt={selectedProduct.productName}
      />
      {selectedProduct.manualUrl && (
        <button
          className="bg-white-500 text-blue py-2 px-4 rounded border border-blue-300 flex items-center space-x-2 mb-2"
          onClick={() =>
            selectedProduct?.manualUrl &&
            (window.location.href = selectedProduct.manualUrl)
          }
        >
          <FaDownload />
          <span>User Manual</span>
        </button>
      )}
      {/* Render product description with preserved line breaks and spaces */}
      <div className="mb-4">
        {formatProductDescription(selectedProduct.productDescription)}
      </div>
      {/* Embed YouTube video with added height */}
      <div className="aspect-w-16 aspect-h-9 w-full mb-4 min-h-[360px]">
        <iframe
          className="w-full"
          height="400"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Page;
