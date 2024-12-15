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

const AuthenticationTable = styled.div`
  width: 300px;
  min-height: 400px;
  background-color: teal;
  transform: ${({ $rotate }) => `rotateY(${$rotate})`};
  transition: all 0.5s cubic-bezier(0.69, 0.09, 0.77, 1.38);
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 20px 10px;
  opacity: ${({ $opacity }) => $opacity};
  transform: ${({ $rotate }) => `rotateY(${$rotate})`};
  transition: opacity 0.5s ease-out;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const AuthInput = styled.input`
  border: none;
  color: ${({ $color }) => $color};
  border: 3px solid ${({ $color }) => $color};
  width: 100%;
  background-color: transparent;
  outline: none;
  font-size: 16px;
  padding: 0 5px;
`;

export const Error = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 3px;
  top: 3px;
  height: calc(100% - 6px);
  color: red;
  background-color: black;
  font-size: 14px;
  z-index: 5;
`;

function Authentication() {
  const { pathname } = useLocation();

  return (
    <AuthenticationContainer>
      <AuthenticationTable
        $rotate={pathname === "/authentication/login" ? "0deg" : "180deg"}
      >
        <Outlet />
      </AuthenticationTable>
    </AuthenticationContainer>
  );
}

export default Authentication;
