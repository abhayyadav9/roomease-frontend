import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOwner, setLoading, setError } from "../../redux/slice/ownerSlice";

const useGetOwnerDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.owner.loading);
  const error = useSelector((state) => state.owner.error);

  useEffect(() => {
    if (!user?.id) return;

    const fetchOwnerDetails = async () => {
      dispatch(setLoading(true)); // ✅ Set loading state before fetching

      try {
        const response = await fetch(`http://localhost:3000/api/v2/owner-details/679120f41803540b21aefc9a`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        dispatch(setOwner(data)); // ✅ Store owner details in Redux state
      } catch (err) {
        console.error("Failed to fetch owner details:", err);
        dispatch(setError(err.message)); // ✅ Store error message in Redux
      }
    };

    fetchOwnerDetails();
  }, [user?.id, dispatch]);

  return { loading, error };
};

export default useGetOwnerDetails;
