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
    opacity: translateY(0);
  }
  to {
    opacity: translateY(1);
  }
`;

const LogoPart = styled.div`
  position: absolute;
  height: 50px;
  width: 140px;
  color: teal;
  opacity: 0;
  font-family: "Permanent Marker", cursive;
  font-size: 50px;
  line-height: 50px;
  text-shadow: teal 0 0 5px;
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
    background: yellow;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: translateY(0%);
    animation: ${css`5s ${logoAnimation} infinite`};
  }
`;

function Intro() {
  const navigate = useNavigate();

  /*   useEffect(() => {
    setTimeout(() => navigate("/home"), 2000);
  }, []); */

  return (
    <IntroContainer>
      <LogoTitle>
        <LogoPart $left="0px" $top="15%" $rotate="-30deg" $delay="1s">
          KO
        </LogoPart>
        <LogoPart
          $left="calc(100% - 140px)"
          $top="15%"
          $rotate="30deg"
          $delay="2s"
        >
          KO
        </LogoPart>
        <LogoPart $left="calc(50% - 70px)" $top="60%" $delay="3s">
          KO
        </LogoPart>
        <LogoPart $left="calc(50% - 70px)" $top="75%" $delay="4s">
          DAAA!
        </LogoPart>
      </LogoTitle>
      <LogoImage />
    </IntroContainer>
  );
}

export default Intro;
