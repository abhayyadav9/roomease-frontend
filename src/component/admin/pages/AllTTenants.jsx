import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSort, FaRegUserCircle, FaEye } from "react-icons/fa";

const AllTTenants = () => {
  const [sortBy, setSortBy] = useState("name");
  const allTenants= useSelector(state=> state.allTenant?.allTenantData)
  const theme = useSelector((state) => state.theme.theme);

  const sortedOwners = [...(allTenants || [])].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  return (
    <div className={`min-h-screen mt-10 p-8 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-0">
            All Tenants
          </h2>
          
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-sm">
              <FaSort className="mr-2" /> Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                theme === "dark" 
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600" 
                  : "bg-white border-gray-200 hover:border-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="name">Name</option>
              <option value="date">Join Date</option>
            </select>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg overflow-hidden ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${
                theme === "dark" ? "bg-gray-700" : "bg-gray-50"
              }`}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Profile</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedOwners?.map((owner) => (
                  <tr 
                    key={owner._id}
                    className={`hover:${theme === "dark" ? "bg-gray-750" : "bg-gray-50"} transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={owner.tenantPic}
                          alt={owner.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          onError={(e) => {
                            e.target.src = <FaRegUserCircle className="w-12 h-12 text-gray-400" />;
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{owner.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm">{owner.phone || 'N/A'}</span>
                        <span className="text-xs text-gray-500">{owner.user?.email || ''}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(owner.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/owners/${owner._id}`}
                        className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
                          bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                      >
                        <FaEye className="mr-2" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedOwners?.length === 0 && (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              No owners found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTTenants;