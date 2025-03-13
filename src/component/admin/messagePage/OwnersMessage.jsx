import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Fade } from "@mui/material";
import { setSelectedUser } from "../../../redux/slice/authSlice";

const OwnersMessage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allOwners = useSelector((state) => state.allOwner?.allOwnerData);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  // Sort owners by name by default.
  const sortedOwners = [...(allOwners || [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Filter owners based on the search query (case-insensitive).
  const filteredOwners = sortedOwners.filter((owner) =>
    owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto ">
      <div className="bg-white shadow rounded-lg p-2">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Owners List */}
        <div>
          {filteredOwners.length > 0 ? (
            filteredOwners.map((owner) => (
              <Fade in timeout={100} key={owner._id}>
                <div
                  className="flex items-center p-2 mb-2 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => dispatch(setSelectedUser(owner))}
                >
                  <div className="mr-2">
                    <Avatar src={owner.ownerPic} alt={owner.name}>
                      {!owner.ownerPic && owner.name.charAt(0)}
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-base font-semibold">{owner.name}</p>
                    <p className="text-xs text-gray-500">{owner.email}</p>
                  </div>
                </div>
              </Fade>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No owners found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnersMessage;
