import { DragEvent, useState } from "react";

import { CardDroppableArea } from "@/styles/cardDropArea.styles";

interface ICardDropAreaProps {
  curIndex: number;
  listId: string;
  cardFormData: TCardFormData;
  dropAreaIndex: number;
  handleCardOnDragOver: (event: DragEvent, dropAreaIndex: number) => void;
  handleCardOnDrop: (event: DragEvent, droppedListId: TList["id"], droppedIndex: number) => void;
};

export default function CardDropArea({
  curIndex,
  listId,
  cardFormData,
  dropAreaIndex,
  handleCardOnDragOver,
  handleCardOnDrop
}: ICardDropAreaProps) {
  const [showDroppableArea, setShowDroppableArea] = useState<boolean>(false);

  const _renderCardDroppableArea = (): JSX.Element => {
    if (
      cardFormData.draggingCardListId !== listId
      && cardFormData.isDraggingCard
    ) {
      return (
        <CardDroppableArea
          className={showDroppableArea ? "show" : "hide"}
          onDragEnter={() => setShowDroppableArea(true)}
          onDragLeave={() => setShowDroppableArea(false)}
          onDragOver={(event) => handleCardOnDragOver(event, dropAreaIndex)}
          onDrop={(event) => {
            handleCardOnDrop(event, listId, dropAreaIndex);
            setShowDroppableArea(false);
          }}
        />
      );
    }

    if (
      curIndex !== cardFormData.draggingCardIndex - 1
      && curIndex !== cardFormData.draggingCardIndex + 1
      && cardFormData.isDraggingCard
    ) {
      return (
        <CardDroppableArea
          className={showDroppableArea ? "show" : "hide"}
          onDragEnter={() => {
            setShowDroppableArea(true);
          }}
          onDragLeave={() => setShowDroppableArea(false)}
          onDragOver={(event) => handleCardOnDragOver(event, dropAreaIndex)}
          onDrop={(event) => {
            handleCardOnDrop(event, listId, dropAreaIndex);
            setShowDroppableArea(false);
          }}
        />
      );
    }

    return <CardDroppableArea className="hide" />;
  }

  return (
    <>
      {_renderCardDroppableArea()}
    </>
  );
};