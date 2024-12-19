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
  gap: 30px;
  color: gold;
  padding: 20px 10px;
  opacity: ${({ $opacity }) => $opacity};
  transform: ${({ $rotate }) => `rotateY(${$rotate})`};
  transition: opacity 0.5s ease-out;
`;

export const Title = styled.h2`
  margin-bottom: 10px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 90%;
`;

export const AuthInput = styled.input`
  position: relative;
  border: none;
  color: ${({ $color }) => $color};
  border: 3px solid ${({ $color }) => $color};
  width: 100%;
  background-color: teal;
  outline: none;
  font-size: 16px;
  padding: 0 5px;
  z-index: 3;
  transition: all 0.2s;

  &::placeholder {
    color: #d3d1c5;
  }
`;

export const Error = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  height: 100%;
  color: red;
  background-color: transparent;
  font-size: 12px;
  font-weight: 600;
  z-index: 2;
  transform: ${({ $show }) => ($show ? "translateY(105%)" : "translateY(0)")};
  transition: all 0.1s;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const Button = styled.button`
  color: teal;
  background-color: gold;
  border: none;
  padding: 5px 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  ${({ $disabled }) =>
    !$disabled
      ? `
    &:hover {
      box-shadow: 0 0 5px 0 gold;
    }

    &:active {
      transform: rotateX(180deg);
    }
  `
      : `
        filter: grayscale(80%);
      `}
`;

export const ReqError = styled.p`
  color: gold;
  border: 3px solid red;
  padding: 2px;
  width: 90%;
  text-align: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: all 0.3s;
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
