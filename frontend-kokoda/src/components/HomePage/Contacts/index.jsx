import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getAllContacts,
  selectAllContacts,
  selectContactsLoading,
} from "../../../features/contacts/contactsSlice";
import SingleContact from "./SingleContact";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../Spinner";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";
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
  const endRef = useRef(null);
  const intersecting = useIntersectionObserver(endRef);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(contacts.length);
  const loading = useSelector(selectContactsLoading);
  const limit = 20;

  useEffect(() => {
    document.getElementById("vp").scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (
      loggedUser &&
      intersecting &&
      contacts.length % limit === 0 &&
      // Fishy (remove?)
      contacts.length >= offset
    ) {
      dispatch(getAllContacts({ token: loggedUser.token, offset, limit }));
      setOffset((p) => p + limit);
    }
  }, [loggedUser, intersecting]);

  return (
    <ContactsContainer>
      {contacts.map((c) => (
        <SingleContact key={c.id} contact={c} />
      ))}
      <Spinner endRef={endRef} loading={loading} />
    </ContactsContainer>
  );
}

export default Contacts;
