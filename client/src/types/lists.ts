type TList = {
  name: string;
  id: string;
  cards: TCard[],
};

type TPostListArgs = {
  boardId: string | string[];
  list: TList;
};

type TPatchListDataArgs = {
  boardId: string | string[];
  listId: string | string[];
  listData: {
    name?: string;
    dropIndex?: number;
  };
};

type TDeleteListArgs = {
  boardId: string | string[];
  listId: string | string[];
};