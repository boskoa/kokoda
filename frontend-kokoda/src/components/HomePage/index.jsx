import styled from "styled-components";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import FooterMenu from "./FooterMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/login/loginSlice";
import Header from "./Header";

const HomeContainer = styled.div`
  background-color: transparent;
  color: ${({ theme }) => theme.main.fg};
  min-height: calc(100% - 45px);
  width: inherit;
  position: relative;
  //overflow-x: hidden;
  padding-bottom: 40px;
  z-index: 1;
`;

function HomePage() {
  const [menu, setMenu] = useState(false);
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/authentication/login");
    }
  }, [loggedUser]);

  useEffect(() => {}, []);

  if (!loggedUser) return null;

  return (
    <>
      <Header menu={menu} setMenu={setMenu} />
      <HomeContainer>
        <Outlet />
      </HomeContainer>
      <Menu menu={menu} />
      <FooterMenu />
    </>
  );
}

export default HomePage;
