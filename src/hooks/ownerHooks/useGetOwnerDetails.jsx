import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOwner, setLoading, setError } from "../../redux/slice/ownerSlice";
import axios from "axios";

const useGetOwnerDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.owner.loading);
  const error = useSelector((state) => state.owner.error);

  useEffect(() => {
    if (!user?.id) return;

    const fetchOwnerDetails = async () => {
      dispatch(setLoading(true)); // Set loading state before fetching

      try {
        const response = await axios.get(`http://localhost:3000/api/v2/owner-details/${user.id}`, {
          withCredentials: true
        });

        dispatch(setOwner(response.data)); // Store owner details in Redux state
      } catch (err) {
        console.error("Failed to fetch owner details:", err);
        dispatch(setError(err.message)); // Store error message in Redux
      } finally {
        dispatch(setLoading(false)); // Reset loading state after fetching
      }
    };

    fetchOwnerDetails();
  }, [user?.id, dispatch]);

  return { loading, error };
};

export default useGetOwnerDetails;