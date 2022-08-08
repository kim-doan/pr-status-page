import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html,
  body {
    background-color: #F5F5F5;
    height: 100%;
    margin: 0px;
  }

  button,
  input,
  select,
  textarea {
  }

  @media (max-width: 500px) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;
