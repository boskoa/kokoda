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
`;

function ViewPort() {
  return (
    <ViewPortContainer>
      <Outlet />
    </ViewPortContainer>
  );
}

export default ViewPort;
