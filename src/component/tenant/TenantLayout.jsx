
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import TenantNavbar from "./TenantNavbar";
import TenantProfile from "./TenantProfile";
import UpdateTenantDetail from "./UpdateTenantDetail";
import AddRequirement from "./AddRequirement";
import UpdateRequirement from "./UpdateRequirement";
import AllRequirements from "./AllRequirements";
import AllRooms from "../AllRooms";
import ChatWindow from "../message/ChatWindow";
import SavedRooms from "./SavedRooms";
import { Contact } from "lucide-react";
import TenantHome from "./HomeTenant";

const TenantHomeWrapper  = () => {

  return (
    <div className="tenant-layout">
    <TenantNavbar />
    <main className="tenant-main">
      <div className="content-container">
        <Outlet />
      </div>
    </main>
  </div>
  );
};

const TenantLayout= () => {

  return (
    <Routes>
      <Route path="/" element={<TenantHomeWrapper  />}>
        <Route path="/home" element={<TenantHome />} />
        <Route
          path="profile"
          element={
            <div className="animate-slide-in-right">
              <TenantProfile />
            </div>
          }
        />
        <Route
          path="all-rooms"
          element={
            <div className="animate-slide-in-right">
              <AllRooms />
            </div>
          }
        />

        <Route
          path="saved-rooms"
          element={
            <div className="animate-slide-in-right">
              <SavedRooms />
            </div>
          }
        />

        <Route
          path="update-detail"
          element={
            <div className="animate-slide-in-left">
              <UpdateTenantDetail />
            </div>
          }
        />
        <Route
          path="add-requirement"
          element={
            <div className="animate-fade-in-up">
              <AddRequirement />
            </div>
          }
        />
        <Route path="update-requirement" element={<UpdateRequirement />} />
        <Route path="messages" element={<ChatWindow />} />
        <Route path="requirements" element={<AllRequirements />} />

        <Route
          path="update-requirement/:id"
          element={
            <div className="animate-fade-in-up">
              <UpdateRequirement />
            </div>
          }
        />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default TenantLayout;
