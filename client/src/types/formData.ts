type TListFormData = {
  isEditingListName: boolean;
  isDraggingList: boolean;
  listName: string;
  modifiedListName: string;
  activeListId: string;
  draggingListId: string;
  draggingListIndex: number;
};

type TCardFormData = {
  isEditingCardName: boolean;
  isDraggingCard: boolean;
  cardName: string;
  modifiedCardName: string;
  activeCardId: string;
  draggingCardListId: string;
  draggingCardIndex: number;
};