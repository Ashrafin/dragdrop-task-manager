import styled from "styled-components";

import {
  flexElement,
  radiusMedium,
  linearTransition,
  fontXSmall,
  radiusSmall
} from "./global.styles";


const CreateListButton = styled.button`
  ${flexElement};
  ${radiusMedium};
  ${linearTransition};
  ${fontXSmall};
  justify-content: flex-start;
  width: 300px;
  height: fit-content;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-weight: 500;
  outline: none;
  border: none;
  cursor: pointer;
  transition-property: background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.35);
  }

  & > svg {
    margin-right: 0.5rem;
  }
`;

const ListWrapper = styled.div`
  ${radiusMedium};
  width: 300px;
  height: fit-content;
  padding: 0.5rem;
  background-color: #f2f2f2;
`;

const ListTitleInput = styled.input`
  ${radiusSmall};
  ${linearTransition};
  width: 100%;
  padding: 0.5rem;
  background-color: #fff;
  border-style: solid;
  border-width: 2px;
  border-color: #e5e5e5;
  outline: none;
  transition-property: border-color;

  &:focus {
    border-color: blue;
  }
`;

const AddListButton = styled.button`
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

const CloseListButton = styled.button`
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

export {
  CreateListButton,
  ListWrapper,
  ListTitleInput,
  AddListButton,
  CloseListButton
};