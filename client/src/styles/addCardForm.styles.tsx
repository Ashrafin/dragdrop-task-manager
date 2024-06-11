import styled from "styled-components";

import {
  flexElement,
  flexColumn,
  radiusMedium,
  fontXSmall,
  radiusSmall,
  linearTransition
} from "./global.styles";
import { CloseListButton } from "./createListForm.styles";

const AddCardTitleFormWrapper = styled.div`
  ${flexElement};
  ${flexColumn};
`;

const AddCardTitleTextarea = styled.textarea`
  ${radiusMedium};
  ${fontXSmall};
  ${linearTransition};
  width: 100%;
  padding: 0.5rem;
  background-color: #fff;
  color: #000;
  font-weight: 400;
  outline: none;
  border-style: solid;
  border-width: 2px;
  border-color: transparent;
  resize: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition-property: border-color;

  &:focus {
    border-color: blue;
  }
`;

const AddCardTitleButton = styled.button`
  ${radiusSmall};
  ${fontXSmall};
  ${linearTransition};
  margin-right: 0.5rem;
  padding: 0 1rem;
  background-color: #03A9F4;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition-property: background-color opacity;

  &:disabled {
    opacity: 0.5;
    background-color: #2196F3;
    cursor: not-allowed;
  }
`;

const CloseAddCardButton = CloseListButton;

const AddCardButton = styled.button`
  ${flexElement};
  ${radiusMedium};
  ${linearTransition};
  ${fontXSmall};
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  padding: 0.75rem 0.5rem;
  background-color: transparent;
  color: #000;
  font-weight: 500;
  outline: none;
  border: none;
  cursor: pointer;
  transition-property: background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  & > svg {
    margin-right: 0.5rem;
  }
`;

export {
  AddCardTitleFormWrapper,
  AddCardTitleTextarea,
  AddCardTitleButton,
  CloseAddCardButton,
  AddCardButton
};