import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./ducks/transactionSlice";
import registrationSlice from "./ducks/registrationSlice";
// import loginSlice from "./ducks/loginSlice";

export const store = configureStore({
  reducer: {
    meet: transactionSlice,
    userData: registrationSlice,
    // loginData:loginSlice
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;