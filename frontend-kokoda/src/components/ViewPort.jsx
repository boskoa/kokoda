import { Outlet } from "react-router-dom";
import styled from "styled-components";

const ViewPortContainer = styled.div`
  width: 40%;
  height: 100vh;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.main.bg};
  position: relative;

  @media only screen and (max-width: 800px) {
    width: 320px;
  }

  @media (hover: none) {
    width: 100%;
  }

  &::-webkit-scrollbar {
    background-color: rgb(26, 105, 107);
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgb(26, 105, 107);
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(255, 215, 0);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-button:single-button:vertical:decrement {
    height: 0px;
    width: 0px;
  }

  &::-webkit-scrollbar-button:single-button:vertical:increment {
    height: 0px;
    width: 0px;
  }
`;

function ViewPort() {
  return (
    <ViewPortContainer>
      <Outlet />
    </ViewPortContainer>
  );
}

export default ViewPort;
