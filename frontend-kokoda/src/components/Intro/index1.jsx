import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import IntroLoader from "./IntroLoader";

const IntroContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const moveContainer = keyframes`
  from {
    transform: translate(0);
  }
`;

const TilesContainer = styled.div`
  position: relative;
  transform: translate(-7vw, -14vw);
  width: 14vw;
  height: 14vw;
  animation: 0.3s ${moveContainer} 1s ease-in both;
  perspective: 1000px;
  perspective-origin: 100% 100%;

  @media only screen and (max-width: 800px) {
    transform: translate(-50px, -100px);
    width: 100px;
    height: 100px;
  }
`;

const lightUp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const shake = keyframes`
  10% {
    transform: translate(0px, 0px);
  }
  20% {
    transform: translate(1px, 2px);
  }
  30% {
    transform: translate(0px, -1px);
  }
  40% {
    transform: translate(-2px, 0px);
  }
  50% {
    transform: translate(-1px, -2px);
  }
  60% {
    transform: translate(-2px, 1px);
  }
  70% {
    transform: translate(0px, 2px);
  }
  80% {
    transform: translate(1px, -3px);
  }
  90% {
    transform: translate(-3px, -3px);
  }
  100% {
    transform: translate(3px, 3px);
  }
`;

const LogoImage = styled.div`
  width: 100%;
  height: 100%;
  mask-image: url("/chicken.svg");
  mask-size: 100%;
  mask-repeat: no-repeat;
  mask-position: center;
  position: relative;
  z-index: 5;
  animation: 0.1s ${shake} 4.7s infinite;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0%;
    width: 100%;
    height: 100%;
    background: gold;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    animation: 0.3s ${lightUp} 0.5s cubic-bezier(1, 0.02, 1, 0.74) forwards;
    z-index: 0;
  }
`;

const rotateTile = (rotate) => keyframes`
  from {
    transform: rotate(0, 0);
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  to {
    transform: ${rotate};
  }
`;

const LogoTile = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vw;
  font-weight: 800;
  transform-origin: ${({ $origin }) => $origin};
  background-color: ${({ $bg }) => $bg};
  color: ${({ theme }) => theme.main.bg};
  animation: ${({ $rotate }) =>
    css`1s ${rotateTile($rotate)} ${({ $delay }) => $delay} cubic-bezier(0.69, 0.09, 0.77, 1.38) both`};
  z-index: ${({ $z }) => $z};

  & > span {
    transform: ${({ $rotate }) => $rotate};
  }

  @media only screen and (max-width: 800px) {
    font-size: 3rem;
  }
`;

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/chats"), 6000);
  }, []);

  return (
    <IntroContainer>
      <TilesContainer>
        <LogoTile
          $rotate="rotateY(180deg)"
          $top="104%"
          $left="104%"
          $origin="-2%"
          $delay="3.5s"
          $z={1}
          $bg="teal"
        >
          <span>DA</span>
        </LogoTile>
        <LogoTile
          $rotate="rotateX(180deg)"
          $top="0%"
          $left="104%"
          $origin="0 102%"
          $delay="2.5s"
          $z={1}
          $bg="gold"
        >
          <span>KO</span>
        </LogoTile>
        <LogoTile
          $rotate="rotateY(-180deg)"
          $top={0}
          $left={0}
          $origin="102%"
          $delay="1.5s"
          $z={1}
          $bg="teal"
        >
          <span>KO</span>
        </LogoTile>
        <LogoImage>
          <IntroLoader />
        </LogoImage>
      </TilesContainer>
    </IntroContainer>
  );
}

export default Intro;
