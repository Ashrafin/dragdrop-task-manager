type TBoardsSlice = {
  boards: TBoard[];
};

type TBoard = {
  name: string,
  id: string,
  lists: TList[],
  background: string,
};

type TFetchAllBoardsArgs = {
  signal: AbortSignal;
};

type TDeleteBoardArgs = {
  boardId: string | string[];
};