import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FormContainer } from ".";

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(0);

  useEffect(() => {
    const index = setTimeout(() => setShow(1), 250);

    return () => clearTimeout(index);
  }, []);

  function handleNavigate(e) {
    e.preventDefault();
    setShow(0);
    const index = setTimeout(() => navigate("/authentication/register"), 250);

    return () => clearTimeout(index);
  }

  return (
    <FormContainer $opacity={show}>
      <h2>LOGIN</h2>
      <button onClick={handleNavigate}>Not registered?</button>
    </FormContainer>
  );
}

export default Login;
