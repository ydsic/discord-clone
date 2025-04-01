import React from "react";
import ResetStyle from './styles/ResetStyle';
import GlobalStyle from "./styles/GlobalStyles";
import styled from "styled-components";

import SideChannelList from "./layout/SideChannelList";
import Message from "./layout/Message";
import SideMemberList from "./layout/SideMemberList";
import ProfileBar from "./layout/ProfileBar";

// styled-components 사용법
// const 변수이름 = styled.태그종류 `안에 작성` < 백틱
const MainDiv = styled.div`
  background-color: var(--main-bg-color);
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  display: grid;
  position: relative;
  left: 4vw;
  top: 4vh;
  width: 96vw;
  height: 96vh;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-top-left-radius: 20px;
  box-sizing: border-box;
  grid-template-columns: 1fr 3fr 1fr;
`;

function App() {
  return (
    <>
     <ResetStyle />  
     <GlobalStyle />
      <MainDiv>
        <MainContent className="MaiNContent">
          <SideChannelList />
          <Message />
          <SideMemberList />
        </MainContent>
        <ProfileBar />
      </MainDiv>
    </>
  );
}

export default App;
