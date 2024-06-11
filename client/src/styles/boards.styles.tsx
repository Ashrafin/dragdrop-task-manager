import styled from "styled-components";

import {
  flexElement,
  flexRow,
  fontLarge,
  fontXSmall,
  radiusSmall
} from "@/styles/global.styles";

const BoardsTitle = styled.h4`
  ${fontLarge};
  color: #000;
`;

const AvailableBoardsWrapper = styled.div`
  ${flexElement};
  flex-wrap: wrap;
  row-gap: 1.2rem;
  column-gap: 1.2rem;
`;

const CreateBoardButton = styled.button`
  ${flexRow};
  ${fontXSmall};
  ${radiusSmall};
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 280px;
  padding: 0;
  background-color: #f2f2f2;
  color: #000;
  border: none;
  cursor: pointer;
`;

const AvailableBoardButton = styled.div<{ $backgroundColor: string; }>`
  ${radiusSmall};
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 280px;
  padding: 0.85rem;
  background-color: ${props => props.$backgroundColor};
  border: none;
  cursor: pointer;
`;

const AvailableBoardName = styled.h6`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
`;

export {
  BoardsTitle,
  AvailableBoardsWrapper,
  CreateBoardButton,
  AvailableBoardButton,
  AvailableBoardName
};