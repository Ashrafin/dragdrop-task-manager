import styled from "styled-components";

import {
  flexColumn,
  flexElement,
  radiusMedium,
  radiusSmall
} from "./global.styles";

const BoardSkeletonBox = styled.div`
  ${radiusSmall};
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 280px;
  padding: 0.85rem;
  background-color: #f2f2f2;
`;

const ListSkeletonBox = styled.div`
  ${flexElement};
  ${flexColumn};
  ${radiusMedium};
  height: fit-content;
  width: 300px;
  max-height: 100%;
  margin-right: 1rem;
  padding: 0.5rem;
  background-color: #f2f2f2;
  overflow-y: scroll;

  &:last-child {
    margin-right: 0;
  }
`;

const CardSkeletonBox = styled.div`
  ${radiusMedium};
  height: fit-content;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fff;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BoardHeaderSkeletonBox = styled.div<{ $backgroundName?: string; }>`
  ${flexElement};
  ${flexColumn};
  justify-content: center;
  height: 60px;
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

export {
  BoardSkeletonBox,
  ListSkeletonBox,
  CardSkeletonBox,
  BoardHeaderSkeletonBox
};