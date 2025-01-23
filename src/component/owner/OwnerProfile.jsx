// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
import useGetOwnerDetails from '../../hooks/ownerHooks/useGetOwnerDetails';
// import { useSelector } from 'react-redux';

// const OwnerProfile = () => {
//   const { id } = useParams();
//   const [owner, setOwner] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchOwner = async () => {
// //       try {
// //         const { data } = await axios.get(`http://localhost:3000/api/v2/owner-details/679120f41803540b21aefc9b`);
// //         setOwner(data);
// //         setLoading(false);
// //       } catch (error) {
// //         setError(error.response && error.response.data.message ? error.response.data.message : error.message);
// //         setLoading(false);
// //       }
// //     };

// //     fetchOwner();
// //   }, [id]);

// //   if (loading) {
// //     return <div className="flex justify-center items-center h-screen">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
// //   }


//   if (error) return <p>Error: {error}</p>;
//   if (!owner) return <p>Loading...</p>;
//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="flex items-center space-x-4">
//           <div className="flex-shrink-0">
//             <img className="h-16 w-16 rounded-full" src="https://via.placeholder.com/150" alt="Profile" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold">{owner.name}</h1>
//             <p className="text-gray-600">{owner.email}</p>
//             <p className="text-gray-600">{owner.phone}</p>
//           </div>
//         </div>
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold">Created Rooms</h2>
//           {owner.createdRooms.length > 0 ? (
//             <ul className="mt-4 space-y-2">
//               {owner.createdRooms.map((room) => (
//                 <li key={room._id} className="bg-gray-100 p-4 rounded-lg shadow">
//                   <h3 className="text-lg font-bold">{room.name}</h3>
//                   <p className="text-gray-700">{room.description}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-700 mt-4">No rooms created yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerProfile;



import { useSelector } from "react-redux";

const OwnerProfile = () => {
  const { loading, error } = useGetOwnerDetails();
  const owner = useSelector((state) => state.owner.data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!owner) return <p>No owner data found</p>;

  return (
    <div>
      <h2>Owner Details</h2>
      <p>Name: {owner.name}</p>
      <p>Email: {owner.email}</p>
    </div>
  );
};

export default OwnerProfile;
