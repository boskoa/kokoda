import { IconContext } from "react-icons";
import { IoArrowBackCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import ContactDisplay from "./ContactDisplay";
import { useEffect } from "react";
import { getUser, selectUserById } from "../../../features/users/usersSlice";
import { selectLoggedUser } from "../../../features/login/loginSlice";

const DetailedContactContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Back = styled(NavLink)`
  position: absolute;
  top: 0;
  left: 0;
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
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const contact = useSelector((state) => selectUserById(state, id));
  const user = useSelector((state) => selectUserById(state, loggedUser.id));

  useEffect(() => {
    if (loggedUser) {
      dispatch(getUser({ token: loggedUser.token, id }));
    }
  }, [loggedUser]);

  if (!contact || !user) {
    return null;
  }

  return (
    <DetailedContactContainer>
      <IconContext.Provider value={{ color: "gold", size: "2em" }}>
        <Back to="/contacts" title="Go back">
          <IoArrowBackCircle />
        </Back>
      </IconContext.Provider>
      <ContactDisplay contact={contact} user={user} loggedUser={loggedUser} />
    </DetailedContactContainer>
  );
}

export default DetailedContact;
