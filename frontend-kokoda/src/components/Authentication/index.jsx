import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  perspective: 800px;
  perspective-origin: 50%;
`;

const AuthenticationFormContainer = styled.div`
  width: 300px;
  min-height: 400px;
  background-color: teal;
  transform: ${({ $rotate }) => `rotateY(${$rotate})`};
  transition: all 0.5s cubic-bezier(0.69, 0.09, 0.77, 1.38);
`;

export const FormContainer = styled.form`
  opacity: ${({ $opacity }) => $opacity};
  transform: ${({ $rotate }) => `rotateY(${$rotate})`};
  transition: opacity 0.5s ease-out;
`;

function Authentication() {
  const { pathname } = useLocation();

  return (
    <AuthenticationContainer>
      <AuthenticationFormContainer
        $rotate={pathname === "/authentication/login" ? "0deg" : "180deg"}
      >
        <Outlet />
      </AuthenticationFormContainer>
    </AuthenticationContainer>
  );
}

export default Authentication;
