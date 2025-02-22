import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewRequirementDetail from "../commonPage/ViewRequirementDetail";
import { setSelectedRequirement } from "../../redux/slice/requirementSlice";
import { FiSearch, FiCalendar, FiDollarSign, FiHome, FiUsers, FiMapPin } from "react-icons/fi";
import { Pagination } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AllRequirements = () => {
  const requirements = useSelector((state) => state.requirement.requirements?.requirement?.requirements || []);
  const loading = useSelector((state) => state.requirement.loading);
  const error = useSelector((state) => state.requirement.error);
  const selectedRequirement = useSelector((state) => state.requirement.selectedRequirement);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filtering logic
  const filteredRequirements = requirements.filter(requirement => {
    const matchesSearch = requirement.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      requirement.tenant?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const requirementDate = new Date(requirement.createdAt);
    const matchesDate = (!startDate || requirementDate >= startDate) && 
                        (!endDate || requirementDate <= endDate);

    return matchesSearch && matchesDate;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequirements = filteredRequirements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequirements.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenModal = (requirement) => {
    dispatch(setSelectedRequirement(requirement));
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (filteredRequirements.length <= itemsPerPage) {
      setCurrentPage(1);
    }
  }, [filteredRequirements, itemsPerPage]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 mt-16">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-pulse">
          📌 Loading Requirements...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-gray-200 rounded-lg mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-16 p-8 bg-red-50 rounded-lg mx-4">
        <p className="text-red-600 font-semibold text-xl">
          ⚠️ Error loading requirements: {error}
        </p>
      </div>
    );
  }

  if (!requirements || requirements.length === 0) {
    return (
      <div className="text-center mt-16 p-8 bg-blue-50 rounded-lg mx-4">
        <p className="text-gray-600 text-xl font-medium">
          📭 No requirements posted yet. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📌 Tenant Requirements
      </h2>

      {/* Search and Date Filters */}
      <div className="mb-8 max-w-6xl mx-auto space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by location or tenant name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1">
            <FiCalendar className="absolute left-4 top-4 text-gray-400 text-xl" />
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              placeholderText="Start Date"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="relative flex-1">
            <FiCalendar className="absolute left-4 top-4 text-gray-400 text-xl" />
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              placeholderText="End Date"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {filteredRequirements.length === 0 ? (
        <div className="text-center p-8 bg-yellow-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            🔍 No requirements found matching your criteria
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRequirements.map((requirement) => (
              <div
                key={requirement._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl p-5"
              >
                <div className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={requirement.tenant?.tenantPic || "https://via.placeholder.com/100"}
                    alt="Tenant"
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {requirement.tenant?.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <FiMapPin className="text-blue-600" />
                      {requirement.location}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <FiHome className="text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>Category:</strong> {requirement.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>Price Range:</strong> ₹{requirement.priceRange}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-purple-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>Persons:</strong> {requirement.numberOfPerson}
                    </span>
                  </div>
                  
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      "{requirement.requirement}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(requirement)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  View Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
              className="[&_.MuiPaginationItem-root]:h-10 [&_.MuiPaginationItem-root]:min-w-10"
            />
            <p className="text-sm text-gray-600">
              Showing {currentRequirements.length} of {filteredRequirements.length} requirements
            </p>
          </div>
        </>
      )}

      {isModalOpen && selectedRequirement && (
        <ViewRequirementDetail requirement={selectedRequirement} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default AllRequirements;