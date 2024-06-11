import styled from "styled-components";

import {
  flexColumn,
  flexElement,
  flexRow,
  fontSmall,
  linearTransition,
  radiusSmall
} from "./global.styles";

const BoardWrapper = styled.div<{ $backgroundColor: string; }>`
  ${flexElement};
  ${flexColumn};
  width: 100%;
  height: 100%;
  background-color: ${props => props.$backgroundColor};
`;

const BoardHeader = styled.div<{ $backgroundName?: string; }>`
  ${flexElement};
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: ${
    props => props.$backgroundName === "Blue" ? "#2980b9"
    : props.$backgroundName === "Purple" ? "#8e44ad"
    : props.$backgroundName === "Green" ? "#27ae60"
    : props.$backgroundName === "Red" ? "#c0392b"
    : "#aab0b3"
  };
`;

const BoardTitle = styled.h4`
  ${fontSmall};
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 600;
  color: #fff;
`;

const BackToAllBoardsButton = styled.button`
  ${flexElement};
  ${radiusSmall};
  ${linearTransition};
  align-items: center;
  margin-right: 1rem;
  padding: 0.5rem;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  transition-property: background-color;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const BoardOptionsButton = styled(BackToAllBoardsButton)`
  margin-right: 0;
`;

const BoardListWrapper = styled.div`
  ${flexElement};
  ${flexRow};
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow-x: scroll;
`;

const BoardListScrollableWrapper = styled.div`
  ${flexElement};
  ${flexRow};
  flex-wrap: nowrap;
  column-gap: 0.3rem;
  position: relative;
  width: fit-content;
  height: 100%;
`;

export {
  BoardWrapper,
  BoardHeader,
  BoardTitle,
  BackToAllBoardsButton,
  BoardOptionsButton,
  BoardListWrapper,
  BoardListScrollableWrapper
};