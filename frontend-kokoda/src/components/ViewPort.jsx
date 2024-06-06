import styled from "styled-components";

const ViewPortContainer = styled.div`
  width: 40%;
  height: 100vh;
  margin: 0 auto;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.main.fg};

  @media only screen and (max-width: 800px) {
    width: 320px;
    overflow-x: hidden;
  }

  @media (hover: none) {
    width: 100%;
    overflow-x: hidden;
  }
`;

function ViewPort({ children }) {
  return <ViewPortContainer>{children}</ViewPortContainer>;
}

export default ViewPort;
