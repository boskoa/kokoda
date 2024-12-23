import styled, { keyframes } from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  border: 1px solid red;
`;

const spin = keyframes`
  0% {
      transform: rotate(0deg);
    }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 6px solid teal;
  border-top: 6px solid orange;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
  box-shadow:
    0px -3px 5px 0px rgba(0, 0, 0, 0.5),
    inset 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
`;

function Spinner({ endRef, loading }) {
  return (
    <SpinnerContainer ref={endRef}>{loading && <Loader />}</SpinnerContainer>
  );
}

export default Spinner;
