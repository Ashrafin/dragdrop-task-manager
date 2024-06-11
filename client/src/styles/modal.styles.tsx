import styled from "styled-components";

import {
  fixedCenterElement,
  flexElement,
  flexRow,
  fontSmall,
  fontXSmall,
  linearTransition,
  radiusMedium,
  radiusSmall
} from "./global.styles";

const ModalContainer = styled.div`
  ${flexElement};
  ${flexRow};
  ${fixedCenterElement};
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.65);
`;

const ModalWrapper = styled.div`
  ${radiusSmall};
  width: 400px;
  padding: 15px;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const ModalHeader = styled.div`
  ${flexElement};
  ${flexRow};
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h6`
  ${fontSmall};
  font-weight: 700;
  max-width: 90%;
  margin-top: 0;
  margin-bottom: 0;
  color: #000;

  &.editable-title {
    ${radiusMedium};
    ${linearTransition};
    width: 90%;
    padding: 0.25rem 0.4rem;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    cursor: pointer;
    outline: none;
    transition-property: border-color;
  }

  &.editing-title {
    border-color: blue;
  }
`;

const ModalCloseButton = styled.button`
  ${flexElement};
  ${radiusSmall};
  ${linearTransition};
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 26px;
  padding: 5px;
  outline: none;
  border: none;
  background-color: transparent;
  transition-property: background-color;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const ModalSubheader = styled.p`
  ${fontXSmall};
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 400;
  color: #000;
`;

const ModalInput = styled.input`
  ${radiusSmall};
  ${linearTransition};
  width: 100%;
  padding: 0.75rem;
  border-style: solid;
  border-width: 2px;
  border-color: #e5e5e5;
  outline: none;
  transition-property: border-color;

  &:focus {
    border-color: blue;
  }
`;

const ModalCreateBoardButton = styled.button`
  ${flexElement};
  ${radiusSmall};
  ${linearTransition};
  align-items: end;
  justify-content: center;
  width: 100%;
  padding: 0.9rem 1rem;
  outline: none;
  border: none;
  background-color: #3498db;
  color: #fff;
  transition-property: background-color color;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    color: #bdc3c7;
    background-color: #e5e5e5;
    cursor: not-allowed;
  }
`;

const ModalBackgroundWrapper = styled.div`
  ${flexElement};
  ${flexRow};
  align-items: center;
  width: 100%;
  column-gap: 0.75rem;
`;

const ModalBackgroundSelector = styled.div<{ $backgroundColor: string; $backgroundName: string; }>`
  ${flexElement};
  ${radiusSmall};
  ${linearTransition};
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  background-color: ${props => props.$backgroundColor};
  transition-property: background-color;
  cursor: pointer;

  &:hover {
    background-color: ${
      props => props.$backgroundName === "Blue" ? "#2980b9"
      : props.$backgroundName === "Purple" ? "#8e44ad"
      : props.$backgroundName === "Green" ? "#27ae60"
      : "#c0392b"
    };
  }
`;

const ModalListItem = styled.li`
  ${fontXSmall};
  ${linearTransition};
  ${radiusSmall};
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  padding: 1rem;
  color: #000;
  list-style: none;
  background-color: #f2f2f2;
  transition-property: background-color;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`;

export {
  ModalContainer,
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalSubheader,
  ModalInput,
  ModalCreateBoardButton,
  ModalBackgroundWrapper,
  ModalBackgroundSelector,
  ModalListItem
};