import React, { useState } from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  photoUrl: string;
  introduction: string;
  linkedUrl: string;
  email: string;
}

function formatProductDescription(description: string): JSX.Element[] {
  return description
    .split("\n") // Split the description by line breaks
    .map((paragraph, index) => (
      <React.Fragment key={index}>
        {paragraph}
        <br /> {/* Add <br> tag for line breaks */}
      </React.Fragment>
    ));
}

// TeamMember component
const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  photoUrl,
  introduction,
  linkedUrl,
  email,
}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center mx-4 my-6">
      <div
        className="relative w-40 h-60 md:w-48 md:h-72 lg:w-56 lg:h-84 rounded-lg overflow-hidden cursor-pointer"
        onClick={openModal}
      >
        <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-bold mt-2">{name}</h3>
      <p className="text-blue-600 font-semibold">{role}</p>

      {/* Modal for displaying more details */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
          <dialog
            open
            className="relative bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4"
            style={{ minWidth: "80vh" }}
          >
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <img
              src={photoUrl}
              alt={name}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-center">{name}</h3>
            <p className="text-blue-600 font-semibold text-center">{role}</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a
                href={linkedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn Profile
              </a>
              <a
                href={`mailto:${email}`}
                className="text-blue-500 hover:underline"
              >
                {email}
              </a>
            </div>
            <p className="text-gray-700 mt-4">
              {formatProductDescription(introduction)}
            </p>
          </dialog>
        </div>
      )}
    </div>
  );
};

// Team component
interface TeamProps {
  teamMembers: TeamMemberProps[];
}

const Team: React.FC<TeamProps> = ({ teamMembers }) => {
  return (
    <section className="bg-white py-8 min-h-[60vh]" id="team">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold">Team</h2>
        <div className="border-b-4 border-blue-500 w-24 mb-4"></div>
        <div className="flex flex-wrap justify-start">
          {teamMembers?.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              photoUrl={member.photoUrl}
              introduction={member.introduction}
              linkedUrl={member.linkedUrl}
              email={member.email}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
