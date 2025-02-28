import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllContacts } from "../../../features/contacts/contactsSlice";
import SingleContact from "./SingleContact";
import { useEffect, useState } from "react";
import AddContact from "./AddContact";
import ContactModal from "./ContactModal";
import Search from "../Search";

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
  const [addContactModal, setAddContactModal] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    document.getElementById("vp").scrollTo({ top: 0 });
  }, []);

  return (
    <ContactsContainer>
      <Search filter={filter} setFilter={setFilter} />
      {contacts
        .filter((c) => c.name.toLowerCase().includes(filter))
        .map((c) => (
          <SingleContact key={c.id} contact={c} />
        ))}
      <AddContact setAddContactModal={setAddContactModal} />
      {addContactModal && (
        <ContactModal setAddContactModal={setAddContactModal} />
      )}
    </ContactsContainer>
  );
}

export default Contacts;
