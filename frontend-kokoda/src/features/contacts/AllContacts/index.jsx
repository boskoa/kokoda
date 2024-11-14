import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getAllContacts,
  selectAllContacts,
  selectContactsLoading,
} from "../contactsSlice";
import SingleContact from "./SingleContact";
import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";
import Spinner from "../../../components/Spinner";

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
      intersecting &&
      contacts.length % limit === 0 &&
      contacts.length >= offset
    ) {
      dispatch(getAllContacts({ offset, limit }));
      setOffset((p) => p + limit);
    }
  }, [intersecting]);

  return (
    <AllContactsContainer>
      {contacts
        .concat({
          name: "dsfdsf sdfdsf ghhrth sdsadasd frewtret sdfdsfgr ezhrthzzujuj",
          id: 234,
          company: {
            catchPhrase:
              "YABADABADU YABADABADU YABADABADU YABADABADU YABADABADU YABADABADUYABADABADUYABADABADU YABADABADU YABADABADU YABADABADU",
          },
        })
        .map((c) => (
          <SingleContact key={c.id} contact={c} />
        ))}
      <Spinner endRef={endRef} loading={loading} />
    </AllContactsContainer>
  );
}

export default AllContacts;
