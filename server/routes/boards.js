const express = require("express");
const router = express.Router();

const boards = require("../data/boards");

// mocking a request with a delay/wait
// useful for showing a loading screen on the client side
const wait = (waitTime) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, waitTime);
  });
};

// BOARD ROUTES

// retrieve all boards
// with a fake/mock wait time
router.get("/", async (req, res, next) => {
  // await wait(1000);
  res.json({ boards });
});

// adds a board
// being passed the board object via the body
router.post("/", (req, res, next) => {
  const data = req.body;
  boards.push(data);
  res.json(req.body);
});

// deletes an existing board
// being passed the board id via params
router.delete("/:boardId", (req, res, next) => {
  const { boardId } = req.params;
  const boardIndex = boards.findIndex(board => board.id === boardId);

  if (boardIndex === -1) return res.status(404).json({ error: "Board not found" });

  boards.splice(boardIndex, 1);
  res.json({ deleted: boardId });
});

// LIST ROUTES

// updates an existing board and adds a list
// being passed the list object via the body and the board id via params
router.post("/:boardId/lists", (req, res, next) => {
  const data = req.body;
  const { boardId } = req.params;
  const board = boards.find(board => board.id === boardId);

  if (!board) return res.status(404).json({ error: "Board not found" });

  board.lists.push(data);
  res.json(req.body);
});

// updates an existing list with a new list name
// being passed the updated list name via body
// and the board id, list id via params

// updates an existing list, moves selected list
// from one spot to another
// being passed the list id for the list that was
// moved and the drop index for where the list
// will be placed via the body
router.patch("/:boardId/lists/:listId", (req, res, next) => {
  const data = req.body;
  const { boardId, listId } = req.params;
  const board = boards.find(board => board.id === boardId);
  const list = board.lists.find(list => list.id === listId);
  const listIndex = board.lists.findIndex(list => list.id === listId);

  if (data.name !== undefined && data.dropIndex === undefined) {
    list.name = data.name;
  }

  if (data.dropIndex !== undefined && data.name === undefined) {
    if (data.dropIndex > listIndex) {
      board.lists.splice(listIndex, 1);
      board.lists.splice(data.dropIndex - 1, 0, list);
    } else {
      board.lists.splice(listIndex, 1);
      if (data.dropIndex === 0 || data.dropIndex !== board.lists.length) {
        board.lists.splice(data.dropIndex, 0, list);
      } else {
        board.lists.splice(data.dropIndex - 1, 0, list);
      }
    }
  }

  if (!board) return res.status(404).json({ error: "Board not found" });
  if (!list) return res.status(404).json({ error: "List not found" });

  res.json(req.body);
});

// deletes an existing list
// being passed the board id and list id via params
router.delete("/:boardId/lists/:listId", (req, res, next) => {
  const { boardId, listId } = req.params;
  const board = boards.find(board => board.id === boardId);
  const listIndex = board.lists.findIndex(list => list.id === listId);

  if (!board) return res.status(404).json({ error: "Board not found" });
  if (listIndex === -1) return res.status(404).json({ error: "List not found" });

  board.lists.splice(listIndex, 1);
  res.json({ deleted: listId });
});

// CARD ROUTES

// updates an existing list and adds a card
// being passed the card object via the body and the
// board id, list id via params
router.post("/:boardId/lists/:listId/cards", (req, res, next) => {
  const data = req.body;
  const { boardId, listId } = req.params;
  const board = boards.find(board => board.id === boardId);
  const list = board.lists.find(list => list.id === listId);

  if (!board) return res.status(404).json({ error: "Board not found" });
  if (!list) return res.status(404).json({ error: "List not found" });

  list.cards.push(data);
  res.json(req.body);
});

// updates an existing card with a new card name
// being passed the updated card name via the body
// and the board id, list id, card id via params

// updates an existing card, moves selected card
// from one spot to another
// being passed the list id for the list that the card
// was dropped in and the drop index for where the card
// will be placed via the body
// -1 for the dropIndex is for same list only
router.patch("/:boardId/lists/:listId/cards/:cardId", (req, res, next) => {
  const data = req.body;
  const { boardId, listId, cardId } = req.params;
  const board = boards.find(board => board.id === boardId);
  const list = board.lists.find(list => list.id === listId);
  const card = list.cards.find(card => card.id === cardId);

  if (data.name !== undefined && (data.droppedListId === undefined && data.dropIndex === undefined)) {
    card.name = data.name;
  }

  if (data.droppedListId !== undefined && (data.dropIndex !== undefined && data.name === undefined)) {
    const cardIndex = list.cards.findIndex(card => card.id === cardId);
    const listToAdd = board.lists.find(list => list.id === data.droppedListId);
    const isSameList = listId === data.droppedListId;

    if (data.dropIndex > cardIndex) {
      list.cards.splice(cardIndex, 1);
      listToAdd.cards.splice(data.dropIndex - (isSameList ? 1 : 0), 0, card);
    } else {
      list.cards.splice(cardIndex, 1);
      if (data.dropIndex === 0 || data.dropIndex !== listToAdd.cards.length) {
        listToAdd.cards.splice(data.dropIndex, 0, card);
      } else {
        listToAdd.cards.splice(data.dropIndex - (isSameList ? 1 : 0), 0, card);
      }
    }
  }

  if (!board) return res.status(404).json({ error: "Board not found" });
  if (!list) return res.status(404).json({ error: "List not found" });
  if (!card) return res.status(404).json({ error: "Card not found" });

  res.json(req.body);
});

// delete an existing card
// being passed the board id, list id and card id via params
router.delete("/:boardId/lists/:listId/cards/:cardId", (req, res, next) => {
  const { boardId, listId, cardId } = req.params;
  const board = boards.find(board => board.id === boardId);
  const list = board.lists.find(list => list.id === listId);
  const cardIndex = list.cards.findIndex(card => card.id === cardId);

  if (!board) return res.status(404).json({ error: "Board not found" });
  if (!list) return res.status(404).json({ error: "List not found" });
  if (cardIndex === -1) return res.status(404).json({ error: "Card not found" });

  list.cards.splice(cardIndex, 1);
  res.json({ deleted: cardId });
});

module.exports = router;