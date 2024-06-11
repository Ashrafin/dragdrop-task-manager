import styled from "styled-components";

import { linearTransition, radiusMedium } from "./global.styles";

const ListDroppableArea = styled.div`
  ${radiusMedium};
  ${linearTransition};
  cursor: default;

  &.show {
    width: 300px;
    height: 100%;
    margin: 0 1rem;
    background-color: #c1c1c1;
    opacity: 1;
    transition-property: opacity background-color;

    &:first-child {
      margin-left: 0;
    }
  
    &:last-child {
      margin-right: 0;
    }
  }

  &.hide {
    width: 0.5rem;
    height: 100%;
    background-color: transparent;
    opacity: 0;
  }
`;

export { ListDroppableArea };