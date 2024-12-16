import styled, { keyframes } from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

const FourSquare = styled.div`
  display: grid;
  grid-template-areas:
    "one two"
    "three four";
  gap: 5px;
`;

const pulse = keyframes`
  0% {
    transform: scale(0);
  }
  30% {
    transform: scale(1);
  }
  70% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const Square = styled.div`
  width: 6vw;
  height: 6vw;
  max-width: 100px;
  max-height: 100px;
  background-color: ${({ $bg }) => $bg};
  grid-area: ${({ $area }) => $area};
  animation: 1s ${pulse} ${({ $delay }) => $delay} both infinite;
`;

function ComponentLoader() {
  return (
    <LoadingContainer>
      <FourSquare>
        <Square $bg="gold" $area="one" $delay="0.0s" />
        <Square $bg="teal" $area="two" $delay="0.1s" />
        <Square $bg="teal" $area="three" $delay="0.2s" />
        <Square $bg="gold" $area="four" $delay="0.3s" />
      </FourSquare>
    </LoadingContainer>
  );
}

export default ComponentLoader;
