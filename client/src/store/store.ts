import { configureStore } from "@reduxjs/toolkit";
import { ModalSlice } from "./feature/modalSlice";
import { BoardsSlice } from "./feature/boardsSlice";

export const store = configureStore({
  reducer: {
    modal: ModalSlice.reducer,
    boards: BoardsSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;