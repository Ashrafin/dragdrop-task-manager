import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: TModalSlice = {
  isModalOpen: false,
  activeModal: null
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<TModalSlice["activeModal"]>) => {
      state.isModalOpen = true;
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.activeModal = null;
    }
  },
});

export const { openModal, closeModal } = ModalSlice.actions;
export const selectIsModalOpen = (state: RootState) => state.modal.isModalOpen;
export const selectActiveModal = (state: RootState) => state.modal.activeModal;
export default ModalSlice.reducer;