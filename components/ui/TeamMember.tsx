import React from "react";
import Link from "next/link";

interface TeamMemberProps {
  name: string;
  role: string;
  photoUrl: string;
  introduction: string;
  linkedUrl: string;
  email: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  photoUrl,
  introduction,
  linkedUrl,
  email,
}) => (
  <div className="flex flex-col items-start mx-4 my-6">
    <Link href={`/person-${encodeURIComponent(name)}`} passHref>
      <div>
        <div className="relative w-40 h-60 md:w-48 md:h-72 lg:w-56 lg:h-84 rounded-lg overflow-hidden">
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600">{role}</p>
          <p className="text-gray-700 mt-2">{introduction}</p>
          <a
            href={linkedUrl}
            className="text-blue-500 hover:underline mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
          <p className="mt-1">{email}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default TeamMember;
