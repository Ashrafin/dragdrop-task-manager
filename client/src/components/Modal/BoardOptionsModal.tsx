import { useAppDispatch } from "@/hooks/hooks";
import { closeModal } from "@/store/feature/modalSlice";

import {
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalListItem
} from "@/styles/modal.styles";
import { MarginSpacer } from "@/styles/global.styles";
import Close from "../Icons/close";

interface IBoardOptionsModal {
  board: TBoard;
  handleDeleteBoard: () => void;
};

export default function BoardOptionsModal({ board, handleDeleteBoard }: IBoardOptionsModal) {
  const dispatch = useAppDispatch();

  return (
    <>
      <ModalHeader>
        <ModalTitle>{board.name} board actions</ModalTitle>
        <ModalCloseButton onClick={() => dispatch(closeModal())}>
          <Close size="18" />
        </ModalCloseButton>
      </ModalHeader>
      <MarginSpacer $amount={2} />
      <ModalListItem onClick={handleDeleteBoard}>
        Delete this board
      </ModalListItem>
    </>
  );
};