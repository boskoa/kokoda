import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllContacts } from "../../../features/contacts/contactsSlice";
import SingleContact from "./SingleContact";
import { useEffect } from "react";

const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  width: 100%;
  justify-content: start;
`;

function Contacts() {
  const contacts = useSelector(selectAllContacts);

  useEffect(() => {
    document.getElementById("vp").scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ContactsContainer>
      {contacts.map((c) => (
        <SingleContact key={c.id} contact={c} />
      ))}
    </ContactsContainer>
  );
}

export default Contacts;
