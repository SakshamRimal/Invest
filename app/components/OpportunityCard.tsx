// app/components/OpportunityCard.tsx
"use client";

import React from 'react';
import { FaDollarSign, FaChartLine, FaSeedling, FaTag, FaBuilding } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

interface OpportunityCardProps {
  companyName: string;
  industry: string;
  stage: string;
  minInvestment: string;
  valuationCap: string;
  location: string;
  description: string;
  traction: string;
  status: 'Open' | 'Closing Soon' | 'Closed';
}

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'Open': return 'bg-green-100 text-green-700';
    case 'Closing Soon': return 'bg-yellow-100 text-yellow-700';
    case 'Closed': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  companyName,
  industry,
  stage,
  minInvestment,
  valuationCap,
  location,
  description,
  traction,
  status,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 transition-transform transform hover:scale-105 duration-300 flex flex-col"> {/* Added flex flex-col for consistent height */}
      {/* Top Section: Company Info and Min Investment */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{companyName}</h2>
          <p className="text-gray-600 flex items-center mb-2">
            <FaBuilding className="mr-2 text-md text-gray-500" /> {industry}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center">
              <FaSeedling className="mr-1" /> {stage}
            </span>
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusClasses(status)} flex items-center`}>
              <FaTag className="mr-1" /> {status}
            </span>
          </div>
        </div>
        <div className="text-right flex-shrink-0"> {/* flex-shrink-0 to prevent text wrapping on min investment */}
          <p className="text-sm text-gray-500">Min. Investment</p>
          <p className="text-xl font-bold text-blue-600">{minInvestment}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 leading-relaxed flex-grow">{description}</p> {/* flex-grow to push button to bottom */}

      {/* Details Section: Valuation, Location, Traction */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-y-3 text-gray-700 mb-4"> {/* Changed to 1 column for better vertical alignment */}
        <div className="flex items-start"> {/* Use items-start for multi-line alignment */}
          <FaDollarSign className="mr-2 text-lg text-gray-500 flex-shrink-0 mt-1" /> {/* mt-1 to align with text */}
          <div>
            <span className="font-semibold">Valuation Cap:</span> <span className="block sm:inline">{valuationCap}</span> {/* Block on small screens, inline on larger */}
          </div>
        </div>
        <div className="flex items-start">
          <MdLocationOn className="mr-2 text-lg text-gray-500 flex-shrink-0 mt-1" />
          <div>
            <span className="font-semibold">Location:</span> <span className="block sm:inline">{location}</span>
          </div>
        </div>
        <div className="flex items-start">
          <FaChartLine className="mr-2 text-lg text-gray-500 flex-shrink-0 mt-1" />
          <div>
            <span className="font-semibold">Traction:</span> <span className="block sm:inline">{traction}</span>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="text-right mt-auto"> {/* mt-auto to push button to bottom */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-full text-sm shadow-md transition-all">
          View Details
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;

