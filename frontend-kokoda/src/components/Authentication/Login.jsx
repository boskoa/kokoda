import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthInput, FormContainer, InputContainer, Error } from ".";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loginUser,
  selectLoggedError,
  selectLoggedUser,
} from "../../features/login/loginSlice";

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(0);
  const loggedUser = useSelector(selectLoggedUser);
  const loggedError = useSelector(selectLoggedError);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const index = setTimeout(() => setShow(1), 250);

    return () => clearTimeout(index);
  }, []);

  function handleNavigate() {
    setShow(0);
    const index = setTimeout(() => navigate("/authentication/register"), 250);

    return () => clearTimeout(index);
  }

  function handleLogin(data) {
    dispatch(loginUser(data));
  }

  function handleCancel() {
    dispatch(clearError());
  }

  useEffect(() => {
    if (loggedUser?.username) {
      navigate("/chats");
    }
  }, [loggedUser]);

  return (
    <FormContainer onSubmit={handleSubmit(handleLogin)} $opacity={show}>
      <h2>LOGIN</h2>
      <InputContainer>
        <AuthInput
          $color={errors.username ? "red" : "white"}
          autoFocus
          placeholder="username"
          name="username"
          type="text"
          {...register("username", {
            required: true,
            minLength: {
              value: 2,
              message: "More than 1 character.",
            },
            maxLength: {
              value: 20,
              message: "Less than 21 characters.",
            },
          })}
        />
        <Error>{errors.username?.message}</Error>
      </InputContainer>
      <InputContainer>
        <AuthInput
          $color={errors.username ? "red" : "white"}
          placeholder="password"
          name="password"
          type="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "More than 5 character.",
            },
          })}
        />
        <Error>{errors.password?.message}</Error>
      </InputContainer>
      <button type="button" onClick={handleNavigate}>
        Not registered?
      </button>
      <button type="submit">Log in</button>
    </FormContainer>
  );
}

export default Login;
