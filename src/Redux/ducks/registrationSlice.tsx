import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../utils/constant";
const initialState = userData;

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
