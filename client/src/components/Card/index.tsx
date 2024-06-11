import { DragEvent, useRef } from "react";

import { CardWrapper, CardTitle } from "@/styles/card.styles";

interface ICardProps {
  cardIndex: number;
  card: TCard;
  list: TList;
  listFormData: TListFormData;
  cardFormData: TCardFormData;
  setListFormData: (listFormData: TListFormData) => void;
  setCardFormData: (cardFormData: TCardFormData) => void;
  handleCardOnDragStart: (event: DragEvent, list: TList, card: TCard, cardIndex: number) => void;
  handleCardOnDragEnd: (event: DragEvent) => void;
  handleOpenModal: (activeModalType: TModalSlice["activeModal"]) => void;
}

export default function Card({
  cardIndex,
  card,
  list,
  listFormData,
  cardFormData,
  setListFormData,
  setCardFormData,
  handleCardOnDragStart,
  handleCardOnDragEnd,
  handleOpenModal
}: ICardProps) {
  const cardWrapper = useRef<HTMLDivElement | null>(null)

  return (
    <CardWrapper
      ref={cardWrapper}
      draggable
      onDragStart={(event) => handleCardOnDragStart(event, list, card, cardIndex)}
      onDragEnd={(event) => handleCardOnDragEnd(event)}
      onClick={() => {
        setListFormData({
          ...listFormData,
          activeListId: list.id
        });
        setCardFormData({
          ...cardFormData,
          activeCardId: card.id
        });
        if (!cardFormData.isDraggingCard) handleOpenModal("card details");
      }}
    >
      <CardTitle>
        {card.name}
      </CardTitle>
    </CardWrapper>
  );
};