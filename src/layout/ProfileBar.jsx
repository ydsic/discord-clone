import styled from "styled-components";
const MainDiv = styled.div`
  position: relative;
  left: 5px;
  bottom: 7vh;
  width: 22.5vw;
  height: 10vh;
  background-color: var(--profilebar-bg-color);
`;

export default function ProfileBar() {
  return <MainDiv>테스트용 글자</MainDiv>;
}
