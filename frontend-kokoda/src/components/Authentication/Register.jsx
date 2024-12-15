import { useNavigate } from "react-router-dom";
import { FormContainer } from ".";
import { useEffect, useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [show, setShow] = useState(0);

  useEffect(() => {
    const index = setTimeout(() => setShow(1), 250);

    return () => clearTimeout(index);
  }, []);

  function handleNavigate(e) {
    e.preventDefault();
    setShow(0);
    const index = setTimeout(() => navigate("/authentication/login"), 250);

    return () => clearTimeout(index);
  }

  return (
    <FormContainer $opacity={show} $rotate="-180deg">
      <h2>REGISTER</h2>
      <button onClick={handleNavigate}>Already have an account?</button>
    </FormContainer>
  );
}

export default Register;
