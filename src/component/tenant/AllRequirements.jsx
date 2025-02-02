import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewRequirementDetail from "../commonPage/ViewRequirementDetail";
import { setSelectedRequirement } from "../../redux/slice/requirementSlice";

const AllRequirements = () => {
  const requirements = useSelector((state) => state.requirement.requirements.requirement.requirements); // ✅ Corrected state access
  const loading = useSelector((state) => state.requirement.loading);
  const error = useSelector((state) => state.requirement.error);
  const selectedRequirement = useSelector((state) => state.requirement.selectedRequirement);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (requirement) => {
    dispatch(setSelectedRequirement(requirement)); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading requirements...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!requirements || requirements.length === 0) {
    return <p className="text-center text-gray-600">No requirements found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📌 All Tenant Requirements
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requirements.map((requirement) => (
          <div
            key={requirement._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={requirement.tenant?.tenantPic || "https://via.placeholder.com/100"}
                alt="Tenant"
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{requirement.tenant?.name}</h3>
                <p className="text-sm text-gray-600">{requirement.location}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-700">
                📌 <strong>Requirement:</strong> {requirement.requirement}
              </p>
              <p className="text-sm text-gray-700">
                💰 <strong>Price Range:</strong> ₹{requirement.priceRange}
              </p>
              <p className="text-sm text-gray-700">
                🏠 <strong>Category:</strong> {requirement.category}
              </p>
              <p className="text-sm text-gray-700">
                👥 <strong>Number of Persons:</strong> {requirement.numberOfPerson}
              </p>
            </div>

            <button
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
              onClick={() => handleOpenModal(requirement)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRequirement && (
        <ViewRequirementDetail requirement={selectedRequirement} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AllRequirements;
