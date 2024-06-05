import styled from "styled-components";

const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.main.bg};
  color: ${({ theme }) => theme.main.fg};
`;

function HomePage() {
  return <HomeContainer>HAI MARK</HomeContainer>;
}

export default HomePage;
