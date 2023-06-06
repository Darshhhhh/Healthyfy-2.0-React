import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalConstants } from "../utils/GlobalConstants";

const DevicePerUserSlice = createSlice({
  name: "Device By User",
  initialState: [],
  reducers: {
    setDevicePerUser(state, action) {
      return (state = action.payload);
    },
    setResetDevicePerUser(state, action) {
      return (state = action.payload);
    },
  },
});

const { setDevicePerUser, setResetDevicePerUser } = DevicePerUserSlice.actions;
export default DevicePerUserSlice.reducer;

export function getDevicePerUser() {
  return async function getDeviceByUserThunk(dispatch, getState) {
    try {
      var USER_ID = sessionStorage.getItem("user-id");
      var TOKEN = sessionStorage.getItem("token");
      var API_URL = GlobalConstants.domain + "api/device/" + USER_ID;
      let headerConfig = {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + TOKEN,
        },
      };
      axios
        .get(API_URL, headerConfig)
        .then((response) => {
          dispatch(setDevicePerUser(response.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
}

export function resteDevicePerUser() {
  return async function resteDeviceByUserThunk(dispatch, getState) {
    try {
      var clearGlobalState = [];
      dispatch(setResetDevicePerUser(clearGlobalState));
    } catch (err) {
      console.log(err);
    }
  };
}
