import styled, { css, keyframes } from "styled-components";
import { FaArrowDown } from "react-icons/fa";

const pulsate = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(50, 205, 50, 0);
  }
  50% {
    box-shadow: 0 0 10px 0 rgba(50, 205, 50, 1);
  }
  to {
    box-shadow: 0 0 20px 0 rgba(50, 205, 50, 0);
  }
`;

const ScrollerContainer = styled.div`
  position: sticky;
  bottom: 50px;
  margin-left: auto;
  margin-right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  background-color: rgb(50, 205, 50);
  color: pink;
  cursor: pointer;
  transition: all 0.2s;
  transform: ${({ $show }) => ($show ? "" : "translateX(150%)")};
  animation: ${({ $new }) =>
    $new ? css`2s ${pulsate} ease-in-out infinite` : ""};

  &:active {
    transform: scale(0.95);
  }
`;

function Scroller({ unseen = 0, scrollDown }) {
  function scroll() {
    const vp = document.getElementById("vp");
    vp.scrollTo({ top: vp.scrollHeight, behavior: "smooth" });
  }
  console.log("SINGLE", unseen);
  return (
    <ScrollerContainer
      onClick={scroll}
      $new={unseen > 0}
      $show={unseen || scrollDown}
    >
      {unseen > 0 ? unseen : <FaArrowDown />}
    </ScrollerContainer>
  );
}

export default Scroller;
