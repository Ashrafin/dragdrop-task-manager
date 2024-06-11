import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// gets all boards from express backend
// can pass an abortcontroller as an argument (optional)
// returns an array of board objects
export const getAllBoards = createAsyncThunk<
  TBoard[], // return type of action creator
  void | TFetchAllBoardsArgs // single argument that gets passed in
>(
  "boards/getAllBoards",
  async (_, { rejectWithValue, signal }) => {
    try {
      const controller = new AbortController();
      const { signal: abortSignal } = controller;

      signal.addEventListener('abort', () => {
        controller.abort();
      });

      const response = await fetch("http://localhost:8080/api/boards", {
        method: "GET",
        signal: abortSignal
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      return data.boards;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// posts a new board to the express backend
// need to pass in the newly created board object
export const postNewBoard = createAsyncThunk<
  void, // return type of action creator
  TBoard // single argument that gets passed in
>(
  "boards/postNewBoard",
  async (post, { rejectWithValue }) => {
    try {
      await fetch("http://localhost:8080/api/boards", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(post)
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// deletes an existing board and sends the board id
// of the selected board to the express backend
// need to pass in the board id
export const deleteBoard = createAsyncThunk<
  void, // return type of action creator
  TDeleteBoardArgs // single argument that gets passed in
>(
  "board/deleteBoard",
  async ({ boardId }, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:8080/api/boards/${boardId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// posts a new list to the express backend
// need to pass in the newly created list object
// and the board id
export const postNewList = createAsyncThunk<
  void, // return type of action creator
  TPostListArgs // single argument that gets passed in
>(
  "board/postNewList",
  async ({ list, boardId }, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:8080/api/boards/${boardId}/lists`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(list)
    });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// patches an existing lists name and sends the
// updated name to the express backend
// need to pass in the new list object, board id and list id
export const patchListData = createAsyncThunk<
  void, // return type of action creator
  TPatchListDataArgs // single argument that gets passed in
>(
  "board/patchListData",
  async ({ listData, boardId, listId }, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:8080/api/boards/${boardId}/lists/${listId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(listData)
      })
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// deletes an existing list and sends the board id, list id
// of the selected list to the express backend
// need to pass in the board id and the list id
export const deleteList = createAsyncThunk<
  void, // return type of action creator
  TDeleteListArgs // single argument that gets passed in
>(
  "board/deleteList",
  async ({ boardId, listId }, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:8080/api/boards/${boardId}/lists/${listId}`, {
        method: "DELETE",
        headers: {
          "Conent-type": "application/json"
        }
      })
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// posts a new card to the express backend
// need to pass in the newly created card object, board id and list id
export const postNewCard = createAsyncThunk<
  void, // return type of action creator
  TPostCardArgs // single argument that gets passed in
>(
  "board/postNewCard",
  async ({ card, boardId, listId }, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:8080/api/boards/${boardId}/lists/${listId}/cards`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(card)
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// patches an existing cards name and sends the
// updated name to the express backend

// patches an existing list and an existing card, moves a card
// to another list and sends the list id of the list where
// the card was dropped as well as the index where the card will appear
// to the express backend
// need to pass in the card data which includes
// name, dropped list id and drop index (optional)
// board id, list id and card id
export const patchCardData = createAsyncThunk<
  void, // return type of action creator
  TPatchCardDataArgs // single argument that gets passed in
>(
  "board/patchCardData",
  async ({ cardData, boardId, listId, cardId }, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:8080/api/boards/${boardId}/lists/${listId}/cards/${cardId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(cardData)
      })
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// deletes an existing card and sends the board id, list id and card id
// of the selected card to the express backend
// need to pass in the board id, list id and card id
export const deleteCard = createAsyncThunk<
  void, // return type of action creator
  TDeleteCardArgs // single arugment that gets passed in
>(
  "board/deleteCard",
  async ({ boardId, listId, cardId }, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:8080/api/boards/${boardId}/lists/${listId}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: TBoardsSlice = {
  boards: []
};

export const BoardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllBoards.pending, (state) => {}),
    builder.addCase(getAllBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    }),
    builder.addCase(getAllBoards.rejected, (state) => {})
  },
});

export const selectBoards = (state: RootState) => state.boards.boards;
export const selectCurrentBoard = (state: RootState, boardId: string | string[]) => state.boards.boards.find(board => board.id === boardId);
export default BoardsSlice.reducer;