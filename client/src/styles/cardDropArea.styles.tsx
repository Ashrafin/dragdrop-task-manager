import styled from "styled-components";

import { linearTransition, radiusMedium } from "./global.styles";

const CardDroppableArea = styled.div`
  ${radiusMedium};
  ${linearTransition};
  cursor: default;

  &.show {
    width: 100%;
    height: 55px;
    margin: 0.5rem 0;
    background-color: #d9d9d9;
    opacity: 1;
    transition-property: opacity background-color;

    &:first-child {
      margin-top: 0;
    }
  
    &:last-child {
      margin-bottom: 0;
    }
  }

  &.hide {
    width: 100%;
    height: 0.75rem;
    background-color: transparent;
    opacity: 0;
  }
`;

export { CardDroppableArea };