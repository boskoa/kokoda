import styled from "styled-components";
import { MdGroupAdd } from "react-icons/md";
import { IconContext } from "react-icons";

const JoinChatContainer = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  position: fixed;
  bottom: 46px;
  align-self: start;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: gold;
  box-shadow: 0 0 10px 0 gold;
  transition: all 0.1s;

  &:active {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 gold;
  }
`;

function JoinGroupChat({ setJoinChatModal }) {
  return (
    <JoinChatContainer
      onClick={() => setJoinChatModal(true)}
      title="Join public chat"
    >
      <IconContext.Provider value={{ size: "70%" }}>
        <MdGroupAdd />
      </IconContext.Provider>
    </JoinChatContainer>
  );
}

export default JoinGroupChat;
