import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

import AllRooms from "../AllRooms";

import OwnerProfile from "./OwnerProfile";
import UpdateOwnerDetail from "./UpdateOwnerDetail";
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";
import History from "./History";
import ViewRoomDetail from "../commonPage/ViewRoomDetail";
import OwnerNavbar from "./OwnerNavbar";
import Home from "../Home"
import Contact from "../Contact";
import AllRequirements  from "../tenant/AllRequirements"
import OwnerHome from "./OwnerHome";
import OwnerCreatedRoom from "./OwnerCreatedRoom";
import ChatWindow from "../message/ChatWindow";
import useGetOwnerDetails from "../../hooks/ownerHooks/useGetOwnerDetails";
import { useSelector } from "react-redux";
import Settlement from "./Settlement";

const OwnerHomeWrapper = () => {
  return (
    <div className="tenant-layout">
      <OwnerNavbar />
      <main className="tenant-main">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const OwnerLayout = () => {
  const owner = useSelector((state) => state.owner?.data?.data);

  return (
    <Routes>
      <Route path="/" element={<OwnerHomeWrapper />}>
        <Route path="/home" element={<OwnerHome />} />

        {/* Owner Routes */}
        <Route path="owner-profile" element={<OwnerProfile />} />
        <Route path="update-detail" element={<UpdateOwnerDetail />} />
        <Route path="all-rooms" element={<AllRooms />} />
        <Route path="add-room" element={<AddRoom />} />
        <Route path="edit-room" element={<EditRoom />} />
        <Route path="history" element={<History />} />
        <Route path="my-rooms" element={<OwnerCreatedRoom owner={owner} role={"owner"} />} />
        <Route path="message" element={<ChatWindow />} />
        <Route path="settlement" element={<Settlement />} />




        <Route path="view-room-detail/:roomId" element={<ViewRoomDetail />} />
        <Route path="all-requirement" element={<AllRequirements />} />
        <Route path="contact" element={<Contact />} />

      </Route>
    </Routes>
  );
};

export default OwnerLayout;
