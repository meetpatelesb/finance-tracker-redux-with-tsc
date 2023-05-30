import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../utils/constant";
import { regDataType } from "../../interface/app_interface";
interface regUserState{
  regUser:regDataType[];
}
const initialState:regUserState = userData;

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { regData } = action.payload;
     
        state.push(regData);
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = registrationSlice.actions;

export default registrationSlice.reducer;
