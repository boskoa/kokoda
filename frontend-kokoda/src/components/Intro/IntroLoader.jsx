import { useState, useEffect } from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: 600;
  height: 100%;
  top: 0.5vw;
  left: 0.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.main.bg};
  //border: 2px solid ${({ theme }) => theme.main.bg};
  //border-radius: 100% / 125% 125% 80% 80%;

  @media only screen and (max-width: 800px) {
    font-size: 12px;
  }
`;

function IntroLoader() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalIndex;
    const timeoutIndex = setTimeout(() => {
      intervalIndex = setInterval(
        () => setCounter((p) => (p < 100 ? p + 5 : 100)),
        150,
      );
    }, 1500);

    return () => {
      clearTimeout(timeoutIndex);
      clearInterval(intervalIndex);
    };
  }, []);

  return <LoaderContainer>{counter}%</LoaderContainer>;
}

export default IntroLoader;
