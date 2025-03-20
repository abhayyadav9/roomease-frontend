import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTenant } from "../../redux/slice/tenantSlice";
import BASEURL from "../../utils/BaseUrl";

const useGetTenantDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [tenantDetails, setTenantDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTenantDetails = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASEURL}/api/v3/tenant-details/${user.id}`, 
        { withCredentials: true }
      );
      
      setTenantDetails(response.data);
      dispatch(setTenant(response.data));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tenant details");
      console.error("Error fetching tenant details:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    let intervalId;
    const controller = new AbortController();

    const initialFetch = async () => {
      await fetchTenantDetails();
      // Start polling after initial fetch
      intervalId = setInterval(fetchTenantDetails, 5000);
    };

    if (user?.id) {
      initialFetch();
    }

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [fetchTenantDetails]);

  return { tenantDetails, isLoading, error, refresh: fetchTenantDetails };
};

export default useGetTenantDetails;