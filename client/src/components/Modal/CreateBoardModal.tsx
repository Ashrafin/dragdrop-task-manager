import { FormEvent, useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { closeModal } from "@/store/feature/modalSlice";
import { getAllBoards, postNewBoard } from "@/store/feature/boardsSlice";
import { v4 as uuid } from "uuid";
import { BoardBackgroundColors } from "./boardBackgroundColors";

import {
  ModalBackgroundSelector,
  ModalBackgroundWrapper,
  ModalCloseButton,
  ModalCreateBoardButton,
  ModalHeader,
  ModalInput,
  ModalSubheader,
  ModalTitle
} from "@/styles/modal.styles";
import Close from "../Icons/close";
import Checkmark from "../Icons/checkmark";
import { MarginSpacer } from "@/styles/global.styles";

interface ICreateBoardFormData {
  boardName: string;
  selectedBackground: string;
};

export default function CreateBoardModal() {
  const dispatch = useAppDispatch();

  // form data
  const [formData, setFormData] = useState<ICreateBoardFormData>({
    boardName: "",
    selectedBackground: ""
  });

  // update the input for the board name
  // setting the form data with the appropriate property
  const handleChangeBoardName = (event: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      boardName: event.currentTarget.value
    });
  };

  // update the selected board background
  // setting the form data with the appropriate property
  const handleSelectBackground = (colorName: string) => {
    setFormData({
      ...formData,
      selectedBackground: colorName
    });
  };

  // create a new board
  // reset the form data
  // close the modal
  // get all boards from backend
  const handleCreateNewBoard = async () => {
    const newBoard: TBoard = {
      name: formData.boardName,
      id: uuid(),
      lists: [],
      background: formData.selectedBackground
    };

    await dispatch(postNewBoard(newBoard));
    await dispatch(getAllBoards());
    setFormData({
      boardName: "",
      selectedBackground: ""
    });
    dispatch(closeModal());
  };
  
  return (
    <>
      <ModalHeader>
        <ModalTitle>Create board</ModalTitle>
        <ModalCloseButton onClick={() => dispatch(closeModal())}>
          <Close size="18" />
        </ModalCloseButton>
      </ModalHeader>
      <MarginSpacer $amount={2.5} />
      <ModalSubheader>Board background <span style={{ color: "red" }}>*</span></ModalSubheader>
      <MarginSpacer $amount={0.35} />
      <ModalBackgroundWrapper>
        {BoardBackgroundColors.map((backgroundColor) => (
          <ModalBackgroundSelector
            key={backgroundColor.colorName}
            onClick={() => handleSelectBackground(backgroundColor.colorName)}
            $backgroundColor={backgroundColor.hex}
            $backgroundName={backgroundColor.colorName}
          >
            {formData.selectedBackground === backgroundColor.colorName ? <Checkmark size="15" color="#fff" /> : <></>}
          </ModalBackgroundSelector>
        ))}
      </ModalBackgroundWrapper>
      <MarginSpacer $amount={1} />
      <ModalSubheader>Board title <span style={{ color: "red" }}>*</span></ModalSubheader>
      <MarginSpacer $amount={0.35} />
      <ModalInput
        name="boardName"
        onChange={handleChangeBoardName}
        value={formData.boardName}
        placeholder=""
        autoFocus
        required
      />
      <MarginSpacer $amount={1} />
      <ModalCreateBoardButton
        onClick={handleCreateNewBoard}
        disabled={formData.boardName.length <= 3 || formData.selectedBackground.length < 1}
      >
        Create
      </ModalCreateBoardButton>
    </>
  );
};