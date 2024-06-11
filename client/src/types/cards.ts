type TCard = {
  name: string;
  id: string;
};

type TPostCardArgs = {
  boardId: string | string[];
  listId: string | string[];
  card: TCard;
};

type TPatchCardDataArgs = {
  boardId: string | string[];
  listId: string | string[];
  cardId: string | string[];
  cardData: {
    name?: string;
    droppedListId?: string;
    dropIndex?: number;
  };
};

type TDeleteCardArgs = {
  boardId: string | string[];
  listId: string | string[];
  cardId: string | string[];
};