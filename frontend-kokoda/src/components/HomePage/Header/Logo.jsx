import styled from "styled-components";

const LogoImage = styled.div`
  width: 30px;
  height: 30px;
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
    z-index: 0;
  }
`;

function Logo() {
  return <LogoImage />;
}

export default Logo;
