import styled from "styled-components";

import {
  flexElement,
  radiusMedium,
  fontXSmall,
  linearTransition
} from "./global.styles";

const CardWrapper = styled.div`
  ${flexElement}
  ${radiusMedium};
  ${linearTransition};
  padding: 0.75rem;
  background-color: #fff;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  opacity: 1;
  cursor: pointer;
  transition-property: border-color opacity;

  &:hover {
    border-color: blue;
  }

  &[draggable]:active {
    opacity: 0.5;
    border-color: transparent;
    cursor: grabbing;
  }
`;

const CardTitle = styled.p`
  ${fontXSmall};
  color: #000;
  margin-top: 0;
  margin-bottom: 0;
`;

export { CardWrapper, CardTitle };