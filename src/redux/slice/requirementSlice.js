import { createSlice } from "@reduxjs/toolkit";

const requirementSlice = createSlice({
  name: "requirement",
  initialState: {
    requirements: [], // Store an array of requirements directly
    selectedRequirement: null,
    loading: false,
    error: null,
  },
  reducers: {
    setRequirements(state, action) {
      state.requirements = action.payload || []; // Ensure we get an array
    },
    setSelectedRequirement(state, action) {
      state.selectedRequirement = action.payload; // Store selected requirement directly
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Action creators
export const { setRequirements, setSelectedRequirement, setLoading, setError } = requirementSlice.actions;
export default requirementSlice.reducer;
