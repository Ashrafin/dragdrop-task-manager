import { FormEvent, useRef } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { closeModal } from "@/store/feature/modalSlice";

import {
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalListItem
} from "@/styles/modal.styles";
import Close from "../Icons/close";
import { MarginSpacer } from "@/styles/global.styles";

interface ICardDetailsModalProps {
  card: TCard;
  cardFormData: TCardFormData;
  setCardFormData: (cardFormData: TCardFormData) => void;
  handleModifiedCardName: (event: FormEvent<HTMLHeadingElement>) => void;
  handleUpdateCardName: (updatedCardName: string) => void;
  handleDeleteCard: () => void;
};

export default function CardDetailsModal({
  card,
  cardFormData,
  setCardFormData,
  handleModifiedCardName,
  handleUpdateCardName,
  handleDeleteCard
}: ICardDetailsModalProps) {
  const dispatch = useAppDispatch();
  const editableCardNameRef = useRef<HTMLHeadingElement | null>(null);

  return (
    <>
      <ModalHeader>
        <ModalTitle
          contentEditable
          suppressContentEditableWarning
          ref={editableCardNameRef}
          onClick={() => {
            editableCardNameRef?.current?.classList.add("editing-title");
            editableCardNameRef.current?.focus();
            setCardFormData({
              ...cardFormData,
              isEditingCardName: true,
              modifiedCardName: card.name
            });
          }}
          onInput={handleModifiedCardName}
          onBlur={() => {
            editableCardNameRef?.current?.blur();
            editableCardNameRef?.current?.classList.remove("editing-title");
            setCardFormData({
              ...cardFormData,
              modifiedCardName: cardFormData.modifiedCardName
            });
          }}
          className="editable-title"
        >
          {card.name}
        </ModalTitle>
        <ModalCloseButton onClick={() => {
            dispatch(closeModal());
            handleUpdateCardName(card.name);
            setCardFormData({
              ...cardFormData,
              isEditingCardName: false,
              activeCardId: "",
              modifiedCardName: ""
            });
          }}
        >
          <Close size="18" />
        </ModalCloseButton>
      </ModalHeader>
      <MarginSpacer $amount={1} />
      <ModalListItem onClick={handleDeleteCard}>
        Delete this card
      </ModalListItem>
    </>
  );
};