import { DragEvent, useState } from "react";

import { ListDroppableArea } from "@/styles/listDropArea.styles";

interface IListDropAreaProps {
  curIndex: number;
  listFormData: TListFormData;
  cardFormData: TCardFormData;
  dropAreaIndex: number;
  handleListOnDragOver: (event: DragEvent, dropAreaIndex: number) => void;
  handleListOnDrop: (event: DragEvent, droppedIndex: number) => void;
};

export default function ListDropArea({
  curIndex,
  listFormData,
  cardFormData,
  dropAreaIndex,
  handleListOnDragOver,
  handleListOnDrop
}: IListDropAreaProps) {
  const [showDroppableArea, setShowDroppableArea] = useState<boolean>(false);

  const _renderListDroppableArea = (): JSX.Element => {
    if (
      curIndex !== listFormData.draggingListIndex - 1
      && curIndex !== listFormData.draggingListIndex + 1
      && listFormData.isDraggingList
      && !cardFormData.isDraggingCard
    ) {
      return (
        <ListDroppableArea
          className={showDroppableArea ? "show" : "hide"}
          onDragEnter={() => setShowDroppableArea(true)}
          onDragLeave={() => setShowDroppableArea(false)}
          onDragOver={(event) => handleListOnDragOver(event, dropAreaIndex)}
          onDrop={(event) => {
            handleListOnDrop(event, dropAreaIndex);
            setShowDroppableArea(false);
          }}
        />
      );
    }

    return <ListDroppableArea className="hide" />
  };
  
  return (
    <>
      {_renderListDroppableArea()}
    </>
  );
};