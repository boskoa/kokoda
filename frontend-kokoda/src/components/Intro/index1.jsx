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
  perspective: 800px;
  //transform-style: preserve-3d;

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

const LogoImage = styled.div`
  width: 100%;
  height: 100%;
  mask-image: url("/chicken.svg");
  mask-size: 100%;
  mask-repeat: no-repeat;
  mask-position: center;
  position: relative;
  z-index: 5;

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

const ImageBG = styled.div`
  display: block;
  position: absolute;
  top: 0%;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.main.bg};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 4;
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
  //transform: rotateY(180deg);
  transform-origin: ${({ $origin }) => $origin};
  perspective: 400px;
  background-color: ${({ $bg }) => $bg};
  //color: red;
  animation: ${({ $rotate }) =>
    css`1s ${rotateTile($rotate)} ${({ $delay }) => $delay} both`};
  z-index: ${({ $z }) => $z};
  //backface-visibility: hidden;
  //perspective: 400px;
  //transform-style: preserve-3d;

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
    //setTimeout(() => navigate("/chats"), 6000);
  }, []);

  return (
    <IntroContainer>
      <TilesContainer>
        <LogoTile
          $rotate="rotateY(180deg)"
          $top="102%"
          $left="100%"
          $origin="0%"
          $delay="3.5s"
          $z={1}
          $bg="teal"
        >
          <span>DA</span>
        </LogoTile>
        <LogoTile
          $rotate="rotateX(180deg)"
          $top="2%"
          $left="102%"
          $origin="0 100%"
          $delay="2.5s"
          $z={2}
          $bg="gold"
        >
          <span>KO</span>
        </LogoTile>
        <LogoTile
          $rotate="rotateY(-180deg)"
          $top={0}
          $left="2%"
          $origin="100%"
          $delay="1.5s"
          $z={3}
          $bg="teal"
        >
          <span>KO</span>
        </LogoTile>
        <ImageBG />
        <LogoImage>
          <IntroLoader />
        </LogoImage>
      </TilesContainer>
    </IntroContainer>
  );
}

export default Intro;
