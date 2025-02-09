import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTenant } from "../../redux/slice/tenantSlice";
import BASEURL from "../../utils/BaseUrl";

const useGetTenantDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [tenantDetails, setTenantDetails] = useState(null); // Store fetched data

  useEffect(() => {
    if (!user?.id) return; // Avoid making a request if user.id is not available

    const fetchTenantDetails = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/v3/tenant-details/${user.id}`, {
            withCredentials: true
          }
        );

        setTenantDetails(response.data); // Store in state
        dispatch(setTenant(response.data)); // Dispatch to Redux
      } catch (error) {
        console.error("Error fetching tenant details:", error);
      }
    };

    fetchTenantDetails();
  }, [user?.id, dispatch]); // Added dispatch to dependencies

  return tenantDetails;
};

export default useGetTenantDetails;
