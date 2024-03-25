import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function CoreCompetencies({ data }) {
  // Function to replace line breaks with <br> tags and preserve spaces
  // function formatProductDescription(description: string) {
  //   return description
  //     .split("\n") // Split the description by line breaks
  //     .map((paragraph, index) => (
  //       <React.Fragment key={index}>
  //         {paragraph}
  //         <br /> {/* Add <br> tag for line breaks */}
  //       </React.Fragment>
  //     ));
  // }
  return (
    <section className="bg-gray-100 py-8" id="corecompetencies">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold">Core Competencies</h2>
        <div className="border-b-4 border-blue-500 w-24 mb-4"></div>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          {data?.map((competency) => (
            <div key={competency._key} className="image-container">
              <Image
                src={competency.imageUrl} // Assuming your images are named as 89af4b0267cb.jpg, a4d477ef6338.jpg, etc.
                alt={competency.title}
                width={500}
                height={300}
                layout="responsive"
              />
              <h3 className="text-2xl font-bold mt-4">{competency.title}</h3>
              <p className="mt-2 text-gray-600">{competency.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
