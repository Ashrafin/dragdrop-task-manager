import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
    line-height: 1.3;
    color: #292929;
  }
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.4rem;
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-size: 1.8rem;
  }
  h5 {
    font-size: 1.6rem;
  }
  h6 {
    font-size: 1.4rem;
  }
`;

const flexElement = css`
  display: flex;
`;

const flexRow = css`
  flex-direction: row;
`;

const flexColumn = css`
  flex-direction: column;
`;

const marginVerticalAuto = css`
  margin-top: auto;
  margin-bottom: auto;
`;

const marginHorizontalAuto = css`
  margin-left: auto;
  margin-right: auto;
`;

const fontXSmall = css`
  font-size: .9rem;
`;

const fontSmall = css`
  font-size: 1.4rem;
`;

const fontMedium = css`
  font-size: 1.8rem;
`;

const fontLarge = css`
  font-size: 2.2rem;
`;

const radiusSmall = css`
  border-radius: 4px;
`;

const radiusMedium = css`
  border-radius: 8px;
`;

const fixedCenterElement = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const linearTransition = css`
  transition-timing-function: linear;
  transition-duration: 0.2s;
`;

const FullViewContainer = styled.div<{ $flexDirection: string; }>`
  ${flexElement};
  ${props => props.$flexDirection === "row" ? flexRow : flexColumn};
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  ${flexRow};
  ${marginHorizontalAuto};
  max-width: 1380px;
  width: 100%;
`;

const Wrapper = styled.div<{ $flexDirection: "row" | "column" }>`
  ${props => props.$flexDirection === "row" ? flexRow : flexColumn};
  width: 100%;
`;

const MarginSpacer = styled.div<{ $amount: number }>`
  margin-top: ${props => props.$amount}rem;
`;

export {
  GlobalStyle,
  flexElement,
  flexRow,
  flexColumn,
  marginVerticalAuto,
  marginHorizontalAuto,
  fontXSmall,
  fontSmall,
  fontMedium,
  fontLarge,
  radiusSmall,
  radiusMedium,
  fixedCenterElement,
  linearTransition,
  FullViewContainer,
  Container,
  Wrapper,
  MarginSpacer
};
