import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthInput,
  FormContainer,
  InputContainer,
  Error,
  Title,
  ButtonContainer,
  Button,
  ReqError,
} from ".";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoginError,
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
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const index = setTimeout(() => setShow(1), 250);

    return () => {
      dispatch(clearLoginError());
      clearTimeout(index);
    };
  }, []);

  useEffect(() => {
    if (loggedUser?.username) {
      navigate("/chats");
    }
  }, [loggedUser]);

  function handleNavigate() {
    setShow(0);
    const index = setTimeout(() => navigate("/authentication/register"), 250);

    return () => clearTimeout(index);
  }

  function handleLogin(data) {
    dispatch(loginUser(data));
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleLogin)} $opacity={show}>
      <Title>LOGIN</Title>
      <InputContainer>
        <AuthInput
          $color={errors.username ? "red" : "gold"}
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
        <Error $show={errors.username?.message}>
          {errors.username?.message}
        </Error>
      </InputContainer>
      <InputContainer>
        <AuthInput
          $color={errors.password ? "red" : "gold"}
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
        <Error $show={errors.password?.message} data-testid="password-error">
          {errors.password?.message}
        </Error>
      </InputContainer>
      <ButtonContainer>
        <Button type="button" onClick={handleNavigate}>
          Not registered?
        </Button>
        <Button $disabled={!isValid} type="submit">
          Log in
        </Button>
      </ButtonContainer>
      <ReqError $show={loggedError}>{loggedError}</ReqError>
    </FormContainer>
  );
}

export default Login;
