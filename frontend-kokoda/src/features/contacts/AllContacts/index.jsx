import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllContacts } from "../contactsSlice";
import SingleContact from "./SingleContact";

const AllContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  width: 100%;
  justify-content: start;
`;

function AllContacts() {
  const contacts = useSelector(selectAllContacts);

  return (
    <AllContactsContainer>
      {contacts.map((c) => (
        <SingleContact key={c.id} contact={c} />
      ))}
    </AllContactsContainer>
  );
}

export default AllContacts;
