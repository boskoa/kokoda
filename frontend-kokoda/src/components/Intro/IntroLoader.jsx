import { useState, useEffect } from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  position: absolute;
  color: red;
  font-size: 16px;
  font-weight: 600;
  height: 54px;
  width: 44px;
  top: calc(50% - 20px);
  left: calc(50% - 10px);
  display: flex;
  justify-content: center;
  align-items: end;
  padding-bottom: 10px;
  color: ${({ theme }) => theme.main.bg};
  //border: 2px solid ${({ theme }) => theme.main.bg};
  //border-radius: 100% / 125% 125% 80% 80%;
`;

function IntroLoader() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let index;
    setTimeout(() => {
      index = setInterval(
        () => setCounter((p) => (p < 100 ? p + 5 : 100)),
        200,
      );
    }, 1500);

    return () => clearInterval(index);
  }, []);

  return <LoaderContainer>{counter}%</LoaderContainer>;
}

export default IntroLoader;
