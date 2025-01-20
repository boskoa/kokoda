import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  getAllContacts,
  selectAllContacts,
} from "../../../features/contacts/contactsSlice";
import SingleContact from "./SingleContact";
import { useEffect } from "react";
import { selectLoggedUser } from "../../../features/login/loginSlice";

const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  width: 100%;
  justify-content: start;
`;

function Contacts() {
  const loggedUser = useSelector(selectLoggedUser);
  const contacts = useSelector(selectAllContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("vp").scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(getAllContacts({ token: loggedUser.token, offset, limit }));
    setOffset((p) => p + limit);
  }, [loggedUser]);

  return (
    <ContactsContainer>
      {contacts.map((c) => (
        <SingleContact key={c.id} contact={c} />
      ))}
    </ContactsContainer>
  );
}

export default Contacts;
