import {
  useCallback,
  useEffect,
  useState
} from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  openModal,
  selectActiveModal,
  selectIsModalOpen
} from "@/store/feature/modalSlice";
import { getAllBoards, selectBoards } from "@/store/feature/boardsSlice";
import { findBoardBackground } from "@/utility";

import {
  Container,
  FullViewContainer,
  Wrapper
} from "@/styles/global.styles";
import {
  AvailableBoardButton,
  CreateBoardButton,
  AvailableBoardName,
  AvailableBoardsWrapper,
  BoardsTitle
} from "@/styles/boards.styles";
import LoadingSkeletons from "@/components/LoadingSkeletons";
import { BoardsSkeleton, BoardTitleSkeleton } from "@/components/LoadingSkeletons/Skeletons";
import Modal from "@/components/Modal";
import CreateBoardModal from "@/components/Modal/CreateBoardModal";

export default function Boards() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const activeModal = useAppSelector(selectActiveModal);
  const boards = useAppSelector(selectBoards);

  // show/hide states
  const [showLoading, setShowLoading] = useState<boolean>(true);

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

  // go to the individual board page
  // need to pass in the board id
  const handleGoToBoardPage = (boardId: string): void => {
    router.push(`/boards/${boardId}`);
  };

  // return the boards title
  // return the boards title skeleton as a fallback
  const _renderTitle = useCallback((): JSX.Element => {
    if (!showLoading) {
      return (
        <BoardsTitle>Boards</BoardsTitle>
      );
    }

    return (
      <LoadingSkeletons>
        <BoardTitleSkeleton />
      </LoadingSkeletons>
    );
  }, [showLoading]);

  // return all the boards
  // return the boards skeleton as a fallback
  const _renderBoards = useCallback((): JSX.Element[] | JSX.Element => {
    if (
      boards
      && boards.length >= 0
      && !showLoading
    ) {
      return boards.map((board => (
        <AvailableBoardButton
          $backgroundColor={findBoardBackground(board.background)}
          onClick={() => handleGoToBoardPage(board.id)}
          key={board.id}
        >
          <AvailableBoardName>
            {board.name}
          </AvailableBoardName>
        </AvailableBoardButton>
      )));
    }

    return (
      <LoadingSkeletons>
        <BoardsSkeleton count={4} />
      </LoadingSkeletons>
    );
  }, [boards, showLoading]);

  // return the create board button
  // return an empty fragment as a fallback
  const _renderCreateBoardButton = useCallback((): JSX.Element => {
    if (!showLoading) {
      return (
        <CreateBoardButton onClick={() => dispatch(openModal("create board"))}>
          Create new board
        </CreateBoardButton>
      );
    }

    return <></>;
  }, [showLoading]);

  // return the create board modal
  // return an empty fragment as a fallback
  const _renderModal = useCallback((): JSX.Element => {
    if (isModalOpen && activeModal === "create board") {
      return (
        <Modal>
          <CreateBoardModal />
        </Modal>
      );
    }

    return <></>;
  }, [isModalOpen, activeModal]);

  return (
    <>
      <FullViewContainer $flexDirection="row">
        <Container>
          <Wrapper $flexDirection="row">
            {_renderTitle()}
            <AvailableBoardsWrapper>
              {_renderBoards()}
              {_renderCreateBoardButton()}
            </AvailableBoardsWrapper>
          </Wrapper>
        </Container>
      </FullViewContainer>
      {_renderModal()}
    </>
  );
};