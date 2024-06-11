type TActiveModal = {
  modalTypes: "board options" | "list options" | "create board" | "list details" | "card details" | null; 
};

type TModalSlice = {
  isModalOpen: boolean;
  activeModal: TActiveModal["modalTypes"];
};