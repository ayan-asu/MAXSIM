import React from 'react';
import Image from "next/image";

function Testimonials({ testimonials }) {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <div className="border-b-4 border-blue-500 w-24 mb-4"></div>

        {/* Container for testimonials */}
        <div className="flex overflow-x-auto no-scrollbar" style={{ gap: '1rem' }}>
          {testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg flex-none"
              style={{ width: "300px" }} // fixed width for each testimonial card
            >
              <div className="p-4 flex flex-col items-center text-center">
                <div className="w-24 h-24 relative mb-4">
                  <Image
                    src={testimonial.companyLogoUrl}
                    alt={testimonial.companyName}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <blockquote className="mb-4">{testimonial.description}</blockquote>
                <footer className="font-semibold">
                  {testimonial.givenBy}
                  <br />
                  {testimonial.companyName}
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
