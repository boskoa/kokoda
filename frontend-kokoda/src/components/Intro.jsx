import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const IntroContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const LogoTitle = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const partAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LogoPart = styled.div`
  position: absolute;
  height: 50px;
  width: 100px;
  color: gold;
  opacity: 0;
  font-size: 70px;
  font-weight: 900;
  line-height: 50px;
  //text-shadow: white 0 0 5px;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  display: flex;
  justify-content: center;
  transform: ${({ $rotate }) => `rotate(${$rotate})`};
  transform-origin: 50%;
  animation: ${({ $delay }) => css`0s ${partAnimation} ${$delay} forwards`};
`;

const logoAnimation = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-100%);
  }
`;

const LogoImage = styled.div`
  width: 40%;
  height: 80%;
  mask-image: url("/chicken.svg");
  mask-size: 100%;
  mask-repeat: no-repeat;
  mask-position: center;
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 67%;
    width: 100%;
    height: 33%;
    background: gold;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: translateY(0%);
    animation: ${css`2.5s ${logoAnimation} forwards`};
  }
`;

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/home"), 3000);
  }, []);

  return (
    <IntroContainer>
      <LogoTitle>
        <LogoPart $left="20px" $top="15%" $rotate="-30deg" $delay="0s">
          KO
        </LogoPart>
        <LogoPart
          $left="calc(100% - 120px)"
          $top="15%"
          $rotate="30deg"
          $delay="0.5s"
        >
          KO
        </LogoPart>
        <LogoPart $left="calc(50% - 50px)" $top="60%" $delay="1s">
          KO
        </LogoPart>
        <LogoPart $left="calc(50% - 50px)" $top="75%" $delay="1.5s">
          DA
        </LogoPart>
      </LogoTitle>
      <LogoImage />
    </IntroContainer>
  );
}

export default Intro;
