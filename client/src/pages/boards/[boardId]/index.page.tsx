import {
  DragEvent,
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useState
} from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  deleteBoard,
  deleteCard,
  deleteList,
  getAllBoards,
  patchCardData,
  patchListData,
  postNewCard,
  postNewList,
  selectCurrentBoard
} from "@/store/feature/boardsSlice";
import {
  closeModal,
  openModal,
  selectActiveModal,
  selectIsModalOpen
} from "@/store/feature/modalSlice";
import { v4 as uuid } from "uuid";
import { findBoardBackground } from "@/utility";

import {
  BackToAllBoardsButton,
  BoardHeader,
  BoardListScrollableWrapper,
  BoardListWrapper,
  BoardOptionsButton,
  BoardTitle,
  BoardWrapper
} from "@/styles/board.styles";
import { FullViewContainer } from "@/styles/global.styles";
import LoadingSkeletons from "@/components/LoadingSkeletons";
import { BoardHeaderSkeleton, ListsSkeleton } from "@/components/LoadingSkeletons/Skeletons";
import List from "@/components/List";
import Card from "@/components/Card";
import CreateListForm from "@/components/CreateListForm";
import AddCardForm from "@/components/AddCardForm";
import Modal from "@/components/Modal";
import HorizontalOptions from "@/components/Icons/horizontalOptions";
import BoardOptionsModal from "@/components/Modal/BoardOptionsModal";
import Grid from "@/components/Icons/grid";
import CardDropArea from "@/components/CardDropArea";
import CardDetailsModal from "@/components/Modal/CardDetailsModal";
import ListDetailsModal from "@/components/Modal/ListDetailsModal";
import ListDropArea from "@/components/ListDropArea";

export default function Board() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector((state) => selectCurrentBoard(state, params?.boardId));
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const activeModal = useAppSelector(selectActiveModal);

  // show/hide states
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [showCreateListForm, setShowCreateListForm] = useState<boolean>(false);

  // list states
  const [listFormData, setListFormData] = useState<TListFormData>({
    isEditingListName: false,
    isDraggingList: false,
    listName: "",
    modifiedListName: "",
    activeListId: "",
    draggingListId: "",
    draggingListIndex: 0
  });

  // card states
  const [cardFormData, setCardFormData] = useState<TCardFormData>({
    isEditingCardName: false,
    isDraggingCard: false,
    cardName: "",
    modifiedCardName: "",
    activeCardId: "",
    draggingCardListId: "",
    draggingCardIndex: 0
  });

  // fetch all boards when the component mounts
  // with a fake/mock wait time
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchAllBoardsResponse = dispatch(getAllBoards({ signal }));
    fetchAllBoardsResponse.then(res => {
      setTimeout(() => {
        setShowLoading(false);
      }, 1000);
    });

    return () => {
      fetchAllBoardsResponse.abort();
    };
  }, []);

  // deletes an existing board
  // closes the modal
  // reroutes the user to the /boards page
  const handleDeleteBoard = async (): Promise<void> => {
    await dispatch(
      deleteBoard({
        boardId: params.boardId
      })
    );
    dispatch(closeModal());
    router.push("/boards");
  };

  // return the board header with the background and the name
  // return the board header skeleton as a fallback
  const _renderBoardHeader = useCallback((): JSX.Element => {
    if (
      !showLoading
      && params?.boardId
    ) {
      return (
        <BoardHeader $backgroundName={currentBoard?.background}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <BackToAllBoardsButton onClick={() => router.push("/boards")}>
              <Grid size="20" color="#fff" />
            </BackToAllBoardsButton>
            <BoardTitle>{currentBoard?.name}</BoardTitle>
          </div>
          <BoardOptionsButton onClick={() => handleOpenModal("board options")}>
            <HorizontalOptions size="20" color="#fff" />
          </BoardOptionsButton>
        </BoardHeader>
      );
    }

    return (
      <LoadingSkeletons>
        <BoardHeaderSkeleton backgroundName={currentBoard?.background} />
      </LoadingSkeletons>
    );
  }, [
    showLoading,
    params,
    currentBoard,
    isModalOpen,
    activeModal
  ]);

  // set the listName when the user is
  // typing into the input
  const handleChangeListName = (event: FormEvent<HTMLInputElement>): void => {
    setListFormData({
      ...listFormData,
      listName: event.currentTarget.value
    });
  };

  // set the modifiedListName when the user
  // clicks on the list name to edit it
  const handleModifiedListName = (event: FormEvent<HTMLParagraphElement>): void => {
    setListFormData({
      ...listFormData,
      modifiedListName: event.currentTarget.innerText
    });
  };

  // creates a new list
  // set showCreateListForm to false
  // set listName to an empty string
  // get all boards from the backend
  const handleCreateNewList = async (): Promise<void> => {
    const newList: TList = {
      name: listFormData.listName,
      id: uuid(),
      cards: []
    };

    await dispatch(
      postNewList({
        list: newList,
        boardId: params.boardId
      })
    );
    setShowCreateListForm(false);
    setListFormData({
      ...listFormData,
      listName: ""
    });
    await dispatch(getAllBoards());
  };

  // updates an existing lists name
  // set isEditingListName to false
  // set activeListId to an empty string
  // get all boards from the backend
  const handleUpdateListName = useCallback(async (currentListName: string): Promise<void> => {
    if (
      currentListName !== listFormData.modifiedListName
      && listFormData.modifiedListName.length >= 3
    ) {
      await dispatch(
        patchListData({
          listData: {
            name: listFormData.modifiedListName
          },
          boardId: params.boardId,
          listId: listFormData.activeListId
        })
      );
      setListFormData({
        ...listFormData,
        isEditingListName: false,
        activeListId: ""
      });
      await dispatch(getAllBoards());
    } else {
      setListFormData({
        ...listFormData,
        isEditingListName: false,
        activeListId: ""
      });
    }
  }, [listFormData.modifiedListName]);

  // on drag start for list
  // set the list id of the dragging item
  // set isDraggingList to true
  const handleListOnDragStart = (
    event: DragEvent,
    list: TList,
    listIndex: number
  ): void => {
    event.dataTransfer.clearData("listId");
    event.dataTransfer.setData("listId", list.id);
    setListFormData({
      ...listFormData,
      isDraggingList: true,
      draggingListId: list.id,
      draggingListIndex: listIndex
    });
  };

  // on drag end for list
  // prevent the browser default
  // set isDraggingList to false
  const handleListOnDragEnd = (event: DragEvent): void => {
    event.preventDefault();
    setListFormData({
      ...listFormData,
      isDraggingList: false,
      draggingListId: "",
      draggingListIndex: 0
    });
  };

  // on drag over for list
  // prevent the browser default
  // set isDraggingList to false
  const handleListOnDragOver = (event: DragEvent, dropAreaIndex: number): void => {
    event.preventDefault();
  };

  // on drop for list
  // prevent the browser default
  // get the list id of the dragging item
  // set isDraggingList to false
  // call the drag and dropped list function passing in
  // the list id and the index where it was dropped so it is ordered correctly
  const handleListOnDrop = async (
    event: DragEvent,
    droppedIndex: number
  ): Promise<void> => {
    event.preventDefault();
    const listId = event.dataTransfer.getData("listId");

    setListFormData({
      ...listFormData,
      isDraggingList: false
    });
    handleUpdateDragAndDroppedList(listId, droppedIndex);
    event.dataTransfer.clearData("listId");
  };

  // updates an existing list and an existing card when dragging item is dropped
  // passing in the dropped items list id and card id as well as
  // the list id of the list the item was dropped in and the index where it was
  // dropped so it is ordered correctly
  // get all boards from the backend
  const handleUpdateDragAndDroppedList = async (
    listId: string,
    dropIndex: number
  ): Promise<void> => {
    await dispatch(
      patchListData({
        listData: {
          dropIndex
        },
        boardId: params.boardId,
        listId
      })
    );
    await dispatch(getAllBoards());
  };

  // deletes an existing list
  // set activeListId to an empty string
  // closes the modal
  // get all boards from the backend 
  const handleDeleteList = async (): Promise<void> => {
    await dispatch(
      deleteList({
        boardId: params.boardId,
        listId: listFormData.activeListId
      })
    );
    setListFormData({
      ...listFormData,
      activeListId: ""
    });
    await dispatch(getAllBoards());
    dispatch(closeModal());
  };

  // return all the lists
  // return the lists skeleton as a fallback
  const _renderLists = useCallback((): JSX.Element[] | JSX.Element => {
    const lists = currentBoard?.lists;

    if (
      !showLoading
      && lists
      && lists.length >= 0
      && params?.boardId
    ) {
      let count = 1;

      return lists.map((list: TList, index: number) => (
        <Fragment key={list.id}>
          <List
            key={list.id}
            listIndex={index + count}
            list={list}
            listFormData={listFormData}
            cardFormData={cardFormData}
            renderCards={_renderCards}
            renderAddCardForm={_renderAddCardForm}
            setListFormData={setListFormData}
            handleOpenModal={handleOpenModal}
            handleListOnDragStart={handleListOnDragStart}
            handleListOnDragEnd={handleListOnDragEnd}
            handleCardOnDragOver={handleCardOnDragOver}
            handleCardOnDrop={handleCardOnDrop}
          />
          <ListDropArea
            curIndex={index + 1 + count++}
            listFormData={listFormData}
            cardFormData={cardFormData}
            dropAreaIndex={index + 1}
            handleListOnDragOver={handleListOnDragOver}
            handleListOnDrop={handleListOnDrop}
          />
        </Fragment>
      ));
    }

    return (
      <>
        <LoadingSkeletons>
          <ListsSkeleton count={3} />
        </LoadingSkeletons>
      </>
    );
  }, [
    showLoading,
    currentBoard?.lists,
    params,
    isModalOpen,
    listFormData,
    listFormData.activeListId,
    listFormData.isDraggingList,
    listFormData.draggingListId,
    listFormData.draggingListIndex,
    cardFormData,
    cardFormData.activeCardId,
    cardFormData.cardName,
    cardFormData.isEditingCardName,
    cardFormData.modifiedCardName,
    cardFormData.isDraggingCard,
    cardFormData.draggingCardListId,
    cardFormData.draggingCardIndex
  ]);

  // set the cardName when the user is
  // typing into the textarea
  const handleChangeCardName = (event: FormEvent<HTMLTextAreaElement>): void => {
    setCardFormData({
      ...cardFormData,
      cardName: event.currentTarget.value
    });
  };

  // set the modifiedCardName when the user
  // clicks on the card name to edit it
  const handleModifiedCardName = (event: FormEvent<HTMLHeadingElement>): void => {
    setCardFormData({
      ...cardFormData,
      modifiedCardName: event.currentTarget.innerText
    });
  };

  // creates a new card
  // reset the card title and the active list id
  // get all boards from the backend
  const handleCreateNewCard = async (): Promise<void> => {
    const newCard: TCard = {
      name: cardFormData.cardName,
      id: uuid()
    };

    await dispatch(
      postNewCard({
        card: newCard,
        boardId: params.boardId,
        listId: listFormData.activeListId
      })
    );
    setCardFormData({
      ...cardFormData,
      cardName: ""
    });
    setListFormData({
      ...listFormData,
      activeListId: ""
    });
    await dispatch(getAllBoards());
  };

  // updates an existing cards name
  // set isEditingCardName to false
  // set activeListId to and empty string
  // set activeCardId to and empty string
  // get all boards from the backend
  const handleUpdateCardName = useCallback(async (currentCardName: string): Promise<void> => {
    if (
      currentCardName !== cardFormData.modifiedCardName
      && cardFormData.modifiedCardName.length >= 3
    ) {
      await dispatch(
        patchCardData({
          cardData: {
            name: cardFormData.modifiedCardName
          },
          boardId: params.boardId,
          listId: listFormData.activeListId,
          cardId: cardFormData.activeCardId
        })
      );
      setCardFormData({
        ...cardFormData,
        isEditingCardName: false,
        activeCardId: ""
      });
      setListFormData({
        ...listFormData,
        activeListId: ""
      });
      await dispatch(getAllBoards());
    } else {
      setCardFormData({
        ...cardFormData,
        isEditingCardName: false,
        activeCardId: ""
      });
      setListFormData({
        ...listFormData,
        activeListId: ""
      });
    }
  }, [
    params,
    listFormData,
    listFormData.activeListId,
    cardFormData,
    cardFormData.modifiedCardName,
    cardFormData.activeCardId
  ]);

  // on drag start for card
  // set the list id and card id of the dragging item
  // set isDraggingCard to true
  const handleCardOnDragStart = (
    event: DragEvent,
    list: TList,
    card: TCard,
    cardIndex: number
): void => {
    event.dataTransfer.clearData("listId");
    event.dataTransfer.clearData("cardId");
    event.dataTransfer.setData("listId", list.id);
    event.dataTransfer.setData("cardId", card.id);
    setCardFormData({
      ...cardFormData,
      isDraggingCard: true,
      draggingCardListId: list.id,
      draggingCardIndex: cardIndex
    });
  };

  // on drag end for card
  // prevent the browser default
  // set isDraggingCard to false
  const handleCardOnDragEnd = (event: DragEvent): void => {
    event.preventDefault();
    setCardFormData({
      ...cardFormData,
      isDraggingCard: false,
      draggingCardListId: "",
      draggingCardIndex: 0
    });
  };

  // on drag over for card
  // prevent the browser default
  // set isDraggingCard to false
  const handleCardOnDragOver = (event: DragEvent): void => {
    event.preventDefault();
  };

  // on drop for card
  // prevent the browser default
  // get the list id and the card id of the dragging item
  // set isDraggingCard to false
  // call the drag and dropped card function passing in
  // the list id and card id of the dropped item
  // as well as the the list id of the list where it has been dropped to
  // and the index where it was dropped so it is ordered correctly
  const handleCardOnDrop = async (
    event: DragEvent,
    droppedListId: TList["id"],
    droppedIndex: number
  ): Promise<void> => {
    event.preventDefault();
    const listId = event.dataTransfer.getData("listId");
    const cardId = event.dataTransfer.getData("cardId");

    setCardFormData({
      ...cardFormData,
      isDraggingCard: false
    });
    handleUpdateDragAndDroppedCard(listId, cardId, droppedListId, droppedIndex);
    event.dataTransfer.clearData("listId");
    event.dataTransfer.clearData("cardId");
  };

  // updates an existing list and an existing card when dragging item is dropped
  // passing in the dropped items list id and card id as well as
  // the list id of the list the item was dropped in and the index where it was
  // dropped so it is ordered correctly
  // get all boards from the backend
  const handleUpdateDragAndDroppedCard = async (
    listId: string,
    cardId: string,
    droppedListId: string,
    dropIndex: number
  ): Promise<void> => {
    await dispatch(
      patchCardData({
        cardData: {
          droppedListId,
          dropIndex
        },
        boardId: params.boardId,
        listId: listId,
        cardId: cardId
      })
    );
    await dispatch(getAllBoards());
  };

  // deletes an existing card
  // set both activeListId and activeCardId to an empty string
  // closes the modal
  // get all boards from the backend 
  const handleDeleteCard = async (): Promise<void> => {
    await dispatch(
      deleteCard({
        boardId: params.boardId,
        listId: listFormData.activeListId,
        cardId: cardFormData.activeCardId
      })
    );
    setListFormData({
      ...listFormData,
      activeListId: ""
    });
    setCardFormData({
      ...cardFormData,
      activeCardId: ""
    });
    await dispatch(getAllBoards());
    dispatch(closeModal());
  };

  // return all the cards
  // return an empty fragment as a fallback
  const _renderCards = useCallback((list: TList): JSX.Element[] | JSX.Element => {
    if (list.cards && list.cards.length >= 1) {
      let count = 1;

      return list.cards.map((card: TCard, index: number) => (
        <Fragment key={card.id}>
          <Card
            key={card.id}
            cardIndex={index + count}
            card={card}
            list={list}
            listFormData={listFormData}
            cardFormData={cardFormData}
            setListFormData={setListFormData}
            setCardFormData={setCardFormData}
            handleCardOnDragStart={handleCardOnDragStart}
            handleCardOnDragEnd={handleCardOnDragEnd}
            handleOpenModal={handleOpenModal}
          />
          <CardDropArea
            curIndex={index + 1 + count++}
            listId={list.id}
            cardFormData={cardFormData}
            dropAreaIndex={index + 1}
            handleCardOnDragOver={handleCardOnDragOver}
            handleCardOnDrop={handleCardOnDrop}
          />
        </Fragment>
      ));
    }

    return <></>;
  }, [
    showLoading,
    currentBoard?.lists,
    params,
    listFormData,
    listFormData.activeListId,
    listFormData.isDraggingList,
    cardFormData,
    cardFormData.cardName,
    cardFormData.activeCardId,
    cardFormData.isDraggingCard,
    cardFormData.draggingCardListId,
    cardFormData.draggingCardIndex
  ]);

  // return the create list form
  // return an empty fragment as a fallback
  const _renderCreateListForm = useCallback((): JSX.Element => {
    if (
      !showLoading
      && params?.boardId
    ) {
      return (
        <CreateListForm
          showCreateListForm={showCreateListForm}
          listFormData={listFormData}
          setShowCreateListForm={setShowCreateListForm}
          setListFormData={setListFormData}
          handleChangeListName={handleChangeListName}
          handleCreateNewList={handleCreateNewList}
        />
      )
    }

    return <></>;
  }, [
    showLoading,
    params,
    showCreateListForm,
    listFormData,
    listFormData.listName
  ]);

  // return the add card form
  // return the add card button as a fallback
  const _renderAddCardForm = useCallback((list: TList): JSX.Element => {
    return (
      <AddCardForm
        list={list}
        listFormData={listFormData}
        cardFormData={cardFormData}
        isModalOpen={isModalOpen}
        setListFormData={setListFormData}
        setCardFormData={setCardFormData}
        handleChangeCardName={handleChangeCardName}
        handleCreateNewCard={handleCreateNewCard}
      />
    )
  }, [
    isModalOpen,
    listFormData,
    listFormData.activeListId,
    listFormData.isEditingListName,
    cardFormData,
    cardFormData.cardName,
    cardFormData.isEditingCardName
  ]);

  // opens the modal
  // passing in a particular modal type that should be shown
  const handleOpenModal = (activeModalType: TModalSlice["activeModal"]): void => {
    dispatch(openModal(activeModalType));
  };

  // return one of three modals
  // board options modal, list details modal and card details modal
  // return an empty fragment as a fallback
  const _renderModal = useCallback((): JSX.Element => {
    const list = currentBoard?.lists.find(list => list.id === listFormData.activeListId);
    const card = list?.cards.find(card => card.id === cardFormData.activeCardId);

    if (
      isModalOpen
      && currentBoard
      && activeModal === "board options"
    ) {
      return (
        <Modal>
          <BoardOptionsModal
            board={currentBoard}
            handleDeleteBoard={handleDeleteBoard}
          />
        </Modal>
      );
    }

    if (
      isModalOpen
      && list
      && activeModal === "list details"
    ) {
      return (
        <Modal>
          <ListDetailsModal
            list={list}
            listFormData={listFormData}
            setListFormData={setListFormData}
            handleModifiedListName={handleModifiedListName}
            handleUpdateListName={handleUpdateListName}
            handleDeleteList={handleDeleteList}
          />
        </Modal>
      );
    }

    if (
      isModalOpen
      && card
      && activeModal === "card details"
    ) {
      return (
        <Modal>
          <CardDetailsModal
            card={card}
            cardFormData={cardFormData}
            setCardFormData={setCardFormData}
            handleModifiedCardName={handleModifiedCardName}
            handleUpdateCardName={handleUpdateCardName}
            handleDeleteCard={handleDeleteCard}
          />
        </Modal>
      );
    }

    return <></>;
  }, [
    isModalOpen,
    currentBoard,
    currentBoard?.lists,
    params,
    activeModal,
    listFormData,
    listFormData.activeListId,
    listFormData.modifiedListName,
    cardFormData,
    cardFormData.activeCardId,
    cardFormData.modifiedCardName
  ]);

  return (
    <>
      <BoardWrapper $backgroundColor={findBoardBackground(currentBoard?.background)}>
        <FullViewContainer $flexDirection="column">
          {_renderBoardHeader()}
          <BoardListWrapper>
            <BoardListScrollableWrapper>
              <ListDropArea
                curIndex={0}
                listFormData={listFormData}
                cardFormData={cardFormData}
                dropAreaIndex={0}
                handleListOnDragOver={(event) => handleListOnDragOver(event, 0)}
                handleListOnDrop={(event) => handleListOnDrop(event, 0)}
              />
              {_renderLists()}
              {_renderCreateListForm()}
            </BoardListScrollableWrapper>
          </BoardListWrapper>
        </FullViewContainer>
      </BoardWrapper>
      {_renderModal()}
    </>
  );
};