import Image from "next/image";

interface Sponsor {
  logoUrl: string;
  name: string;
}

interface Props {
  sponsors: Sponsor[];
}

export default function Sponsors({ sponsors }: Props) {
  if (!sponsors || !Array.isArray(sponsors) || sponsors.length === 0) {
    return null; // Render nothing if sponsors is null, not an array, or empty
  }

  return (
    <section className="bg-white py-8 min-h-[40vh]" id="sponsors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold">Sponsors</h2>
        <div className="border-b-4 border-blue-500 w-24 mb-4"></div>
        <div className="flex flex-wrap justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full md:w-auto mb-4 md:mb-0" // Added margin bottom for spacing
            >
              <div className="w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  width={128} // Adjust based on actual logo size
                  height={128} // Adjust based on actual logo size
                  layout="responsive"
                />
              </div>
              <p className="mt-2 font-medium text-center">{sponsor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
