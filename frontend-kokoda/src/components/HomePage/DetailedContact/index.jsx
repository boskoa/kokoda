import { IconContext } from "react-icons";
import { IoArrowBackCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { selectContactById } from "../../../features/contacts/contactsSlice";
import ContactDisplay from "./ContactDisplay";

const DetailedContactContainer = styled.div``;

const Back = styled(NavLink)`
  position: absolute;
  height: 40px;
  margin-top: -40px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gold;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

function DetailedContact() {
  const { id } = useParams();
  const contact = useSelector((state) => selectContactById(state, id));

  return (
    <DetailedContactContainer>
      <IconContext.Provider value={{ color: "gold", size: "2em" }}>
        <Back to="/contacts" title="Go back">
          <IoArrowBackCircle />
        </Back>
      </IconContext.Provider>
      <ContactDisplay contact={contact} />
    </DetailedContactContainer>
  );
}

export default DetailedContact;
