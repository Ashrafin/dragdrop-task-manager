import { DragEvent, useEffect, useRef } from "react";

import {
  HorizontalOptionsButton,
  ListCardsWrapper,
  ListItem,
  ListItemBottom,
  ListItemHeader,
  ListItemName
} from "@/styles/list.styles";
import { MarginSpacer } from "@/styles/global.styles";
import HorizontalOptions from "../Icons/horizontalOptions";
import CardDropArea from "../CardDropArea";

interface IListProps {
  listIndex: number;
  list: TList;
  listFormData: TListFormData;
  cardFormData: TCardFormData;
  renderCards: (list: TList) => JSX.Element[] | JSX.Element;
  renderAddCardForm: (list: TList) => JSX.Element | undefined;
  setListFormData: (listFormData: TListFormData) => void;
  handleOpenModal: (activeModalType: TModalSlice["activeModal"]) => void;
  handleListOnDragStart: (event: DragEvent, list: TList, listIndex: number) => void;
  handleListOnDragEnd: (event: DragEvent) => void;
  handleCardOnDragOver: (event: DragEvent, dropAreaIndex: number) => void;
  handleCardOnDrop: (event: DragEvent, droppedListId: TList["id"], droppedIndex: number) => void;
};

export default function List({
  listIndex,
  list,
  listFormData,
  cardFormData,
  renderCards,
  renderAddCardForm,
  setListFormData,
  handleOpenModal,
  handleListOnDragStart,
  handleListOnDragEnd,
  handleCardOnDragOver,
  handleCardOnDrop
}: IListProps) {
  const listItemHeaderRef = useRef<HTMLDivElement | null>(null);
  const listItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listItemRef.current && listItemHeaderRef.current) {
      listItemHeaderRef.current.addEventListener("mousedown", () => {
        listItemRef?.current?.setAttribute("draggable", "true");
      });

      listItemHeaderRef.current.addEventListener("mouseout", () => {
        listItemRef?.current?.removeAttribute("draggable");
      });
    }

    return () => {
      if (listItemRef.current && listItemHeaderRef.current) {
        listItemHeaderRef.current.removeEventListener("mousedown", () => {
          listItemRef?.current?.removeAttribute("draggable");
        });
      }
    };
  }, [
    listItemRef.current,
    listItemHeaderRef.current
  ]);

  return (
    <ListItem
      ref={listItemRef}
      onDragStart={(event) => handleListOnDragStart(event, list, listIndex)}
      onDragEnd={(event) => handleListOnDragEnd(event)}
    >
      <ListItemHeader ref={listItemHeaderRef}>
        <ListItemName>
          {list.name}
        </ListItemName>
        <HorizontalOptionsButton
          onClick={() => {
            setListFormData({
              ...listFormData,
              activeListId: list.id
            })
            handleOpenModal("list details");
          }}
        >
          <HorizontalOptions size="16" color="#000" />
        </HorizontalOptionsButton>
      </ListItemHeader>
      <MarginSpacer $amount={0.5} />
      <ListCardsWrapper>
        <CardDropArea
          curIndex={0}
          listId={list.id}
          cardFormData={cardFormData}
          dropAreaIndex={0}
          handleCardOnDragOver={(event) => handleCardOnDragOver(event, 0)}
          handleCardOnDrop={(event) => handleCardOnDrop(event, list.id, 0)}
        />
        {renderCards(list)}
      </ListCardsWrapper>
      <ListItemBottom>
        {renderAddCardForm(list)}
      </ListItemBottom>
    </ListItem>
  );
};