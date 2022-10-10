import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  types: [],
  brands: [],
  devices: [],
  selectedType: {},
  selectedBrand: {},
  pagesCount: 1,
  totalCount: 0,
  limit: 3,
};

export const DeviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
      state.pagesCount = 1;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
      state.pagesCount = 1;
    },
    setPages: (state, action) => {
      state.pagesCount = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});
export const {
  setTypes,
  setBrands,
  setDevices,
  setSelectedType,
  setSelectedBrand,
  setTotalCount,
  setPages,
  setLimit,
} = DeviceSlice.actions;
export const selectUser = (state) => state.user.isAuth;
export default DeviceSlice.reducer;
