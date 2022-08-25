import { foundations, globalStyle } from "@meshkorea/vroong-design-system-web";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${globalStyle()}

  html,
  body {
    font-family: ${foundations.typography.fontFamily};
    background-color: rgb(247, 249, 252);
    height: 100%;
  }

  button,
  input,
  select,
  textarea {
    font-family: ${foundations.typography.fontFamily};
  }

  @media (max-width: 500px) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;
