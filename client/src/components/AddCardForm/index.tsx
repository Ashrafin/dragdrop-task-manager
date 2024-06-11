import { FormEvent } from "react";

import {
  AddCardTitleFormWrapper,
  AddCardTitleTextarea,
  AddCardTitleButton,
  CloseAddCardButton,
  AddCardButton
} from "@/styles/addCardForm.styles";
import { MarginSpacer } from "@/styles/global.styles";
import Close from "../Icons/close";
import Plus from "../Icons/plus";

interface IAddCardFormProps {
  list: TList;
  listFormData: TListFormData;
  cardFormData: TCardFormData;
  isModalOpen: boolean;
  setListFormData: (listFormData: TListFormData) => void;
  setCardFormData: (cardFormData: TCardFormData) => void;
  handleChangeCardName: (event: FormEvent<HTMLTextAreaElement>) => void;
  handleCreateNewCard: () => void;
};

export default function AddCardForm({
  list,
  listFormData,
  cardFormData,
  isModalOpen,
  setListFormData,
  setCardFormData,
  handleChangeCardName,
  handleCreateNewCard
}: IAddCardFormProps) {
  return (
    <>
      {
        listFormData.activeListId === list.id
        && !listFormData.isEditingListName
        && !cardFormData.isEditingCardName
        && !isModalOpen
        ? (
          <AddCardTitleFormWrapper>
            <AddCardTitleTextarea
              id="cardNameTextarea"
              name="cardNameTextarea"
              value={cardFormData.cardName}
              onChange={handleChangeCardName}
              rows={3}
              placeholder="Enter a name for this card..."
              autoFocus
              required
            />
            <MarginSpacer $amount={0.5} />
            <div style={{ display: "flex" }}>
              <AddCardTitleButton onClick={handleCreateNewCard} disabled={cardFormData.cardName.length <= 3}>
                Add card
              </AddCardTitleButton>
              <CloseAddCardButton onClick={() => {
                  setListFormData({
                    ...listFormData,
                    activeListId: ""
                  });
                  setCardFormData({
                    ...cardFormData,
                    cardName: ""
                  });
                }}
              >
                <Close size="20" color="#000" />
              </CloseAddCardButton>
            </div>
          </AddCardTitleFormWrapper>
        ) : (
          <AddCardButton onClick={() => {
              setListFormData({
                ...listFormData,
                activeListId: list.id
              });
            }}
          >
            <Plus size="16" />
            Add a card
          </AddCardButton>
        )}
    </>
  );
};