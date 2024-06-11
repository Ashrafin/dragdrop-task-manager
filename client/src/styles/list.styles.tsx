import styled from "styled-components";

import {
  flexColumn,
  flexElement,
  flexRow,
  fontXSmall,
  linearTransition,
  radiusMedium,
  radiusSmall
} from "./global.styles";

const HorizontalOptionsButton = styled.button`
  ${flexElement};
  ${radiusSmall};
  ${linearTransition};
  align-items: center;
  padding: 0.5rem;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  transition-property: background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ListItem = styled.div`
  ${flexElement};
  ${flexColumn};
  ${radiusMedium};
  position: relative;
  height: fit-content;
  width: 300px;
  max-height: 100%;
  background-color: #f2f2f2;
  overflow-y: scroll;
  opacity: 1;
  transition-property: opacity;

  &[draggable]:active {
    opacity: 0.5;
    cursor: grabbing;
  }
`;

const ListItemHeader = styled.div`
  ${flexElement};
  ${flexRow};
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0.5rem;
  background-color: #f2f2f2;

  &:hover {
    cursor: grab;
  }
`;

const ListItemName = styled.p`
  ${fontXSmall};
  width: 85%;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0.5rem;
  font-weight: 500;
  color: #000;
  border-width: 2px;
  border-style: solid;
  border-color: #f2f2f2;
`;

const ListCardsWrapper = styled.div`
  min-height: auto;
  padding: 0 0.5rem;
`;

const ListItemBottom = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 0.5rem;
  background-color: #f2f2f2;
`;

export {
  HorizontalOptionsButton,
  ListItem,
  ListItemHeader,
  ListItemName,
  ListCardsWrapper,
  ListItemBottom
};