import React from 'react';
import { useSelector } from 'react-redux';
import { FiCheckCircle, FiClock, FiDollarSign, FiUser, FiCalendar, FiDownload, FiPrinter } from 'react-icons/fi';

const History = () => {
  const rooms = useSelector((state) => state.room?.room) || [];
  const filteredRooms = rooms.filter((room) => room.availability === "booked");


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-semibold text-gray-800">Booked History</h1>
              <p className="text-gray-600 mt-1">All the completed booking</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <FiDownload className="text-gray-600" />
                <span>Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <FiPrinter className="text-gray-600" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>

    
        {/* Booking List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Property</th>
                <th className="px-6 py-3 text-left">Tenant</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Timeline</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRooms.length > 0 ? (
                filteredRooms?.map((room) => (
                  <tr key={room._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={room.roomImages?.[0] || '/placeholder-property.jpg'}
                            alt={room.houseName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{room.houseName}</h3>
                          <p className="text-sm text-gray-600">{room.roomType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiUser className="text-gray-400" />
                        <span>{room.user?.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">₹{room.price}/mo</span>
                      </div>
                    </td>
                   
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all"
                            style={{ width: room.availability === 'booked' ? '100%' : '66%' }}
                          />
                        </div>
                        <div className="text-sm text-gray-500">
                          {room.allQuery?.length || 0} stages
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <FiCalendar className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <FiDownload className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <span>Showing {filteredRooms.length} of {filteredRooms.length} results</span>
            <div className="mt-2 md:mt-0 flex gap-4">
              <button className="hover:text-blue-600">Previous</button>
              <span>Page 1 of 1</span>
              <button className="hover:text-blue-600">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;