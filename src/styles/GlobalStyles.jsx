import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "gg sans";
    src: url('../../public/fonts/gg sans Bold') format('woff');
    src: url('../../public/fonts/gg sans Medium') format('woff');
    src: url('../../public/fonts/gg sans Regular') format('woff');
    src: url('../../public/fonts/gg sans Semibold') format('woff');
    font-weight: normal;
    font-style: normal;
  }
:root {
    --font-primary: "gg sans", "Apple SD Gothic Neo", NanumBarunGothic, "맑은 고딕", "Malgun Gothic", Gulim, 굴림, Dotum, 돋움, "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    --main-bg-color: #2f3136;
    --channelList-bg-color: #2f3136;
    --memberList-bg-color: #2f3136;
    --message-bg-color: #36393f;
    --message-inputbox-bg-color: #32353b;
    --profilebar-bg-color: #36393f;
    --hover-bg-color: #424549;
    --active-bg-color: #7289da;
    --primary-txt-color: #D9D7DB;
    --secondary-txt-color: #95929C;
    --hover-txt-color: #ffffff;
    --active-txt-color: #ffffff;
  }

  html {
    font-size: 62.5%;  /* 1rem = 10px */
  }

  body {
    font-size: 1.6rem;
    background-color: var(--main-bg-color);
    color: var(--primary-txt-color);
    font-size: 1.6rem;
  }

  a {
    text-decoration: none;
    color: var(--hover-txt-color);
  }
`;

export default GlobalStyle;