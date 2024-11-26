import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import IntroLoader from "./IntroLoader";

const IntroContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const LogoTitle = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;
/* 
const partAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
 */
const stamp = ($rotate) => keyframes`
  0% {
    transform: perspective(300px) translateZ(300px) rotateZ(${$rotate + 10}deg);
  }
  70% {
    transform: perspective(300px) translateZ(0px) rotateZ(${$rotate}deg);
  }
  80% {
    transform: perspective(300px) translateZ(80px) rotateZ(${$rotate}deg);
  }
  90% {
    transform: perspective(300px) translateZ(0px) rotateZ(${$rotate}deg);
  }
  95% {
    transform: perspective(300px) translateZ(40px) rotateZ(${$rotate}deg);
  }
  100% {
    transform: perspective(300px) translateZ(0px) rotateZ(${$rotate}deg);
  }
`;

const dust = (color) => keyframes`
  from {
    text-shadow: 0 0 0px ${color};
  }
  25% {
    text-shadow: 0 0 20px ${color};
  }
  75% {
    text-shadow: 0 0 20px ${color};
  }
  to {
    text-shadow: 0 0 0px ${color};
  }
`;

const LogoPart = styled.div`
  position: absolute;
  height: 50px;
  width: 100px;
  color: gold;
  //opacity: 0;
  font-family: "Sour Gummy", sans-serif;
  font-size: 90px;
  font-weight: 800;
  line-height: 50px;
  //text-shadow: white 0 0 5px;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  display: flex;
  justify-content: center;
  z-index: 2;
  transform: ${({ $rotate }) =>
    `perspective(300px) translateZ(300px) rotateZ(${$rotate}deg)`};
  transform-origin: 50%;
  animation: ${({ $delay }) =>
    css`0.5s ${({ $rotate }) => stamp($rotate)} ${$delay} forwards,
    3s ${dust("#ffd9008d")} 1.5s ease-out infinite`};

  &::before {
    content: attr(data-text);
    position: absolute;
    text-shadow:
      -2px 2px 0 #111,
      2px 2px 0 #111,
      2px -2px 0 #111,
      -2px -2px 0 #111;
    z-index: -1;
  }
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
  background-color: #353535;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 73%;
    width: 100%;
    height: 45%;
    background: gold;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: translateY(0%);
    animation: ${css`4.5s ${logoAnimation} 1s forwards`};
  }
`;

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    //setTimeout(() => navigate("/chats"), 6000);
  }, []);

  return (
    <IntroContainer>
      <LogoTitle>
        <LogoPart
          data-text="KO"
          $left="10%"
          $top="15%"
          $rotate={-30}
          $delay="1s"
        >
          KO
        </LogoPart>
        <LogoPart
          data-text="KO"
          $left="calc(90% - 100px)"
          $top="15%"
          $rotate={30}
          $delay="1.5s"
        >
          KO
        </LogoPart>
        <LogoPart
          data-text="DA"
          $left="calc(50% - 50px)"
          $top="60%"
          $rotate={0}
          $delay="2s"
        >
          DA
        </LogoPart>
      </LogoTitle>
      <LogoImage>
        <IntroLoader />
      </LogoImage>
    </IntroContainer>
  );
}

export default Intro;
