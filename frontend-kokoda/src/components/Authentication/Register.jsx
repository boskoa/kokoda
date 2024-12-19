import { useNavigate } from "react-router-dom";
import {
  AuthInput,
  Button,
  ButtonContainer,
  Error,
  FormContainer,
  InputContainer,
  Title,
} from ".";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Register() {
  const navigate = useNavigate();
  const [show, setShow] = useState(0);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const index = setTimeout(() => setShow(1), 250);

    return () => {
      //dispatch(clearError());
      clearTimeout(index);
    };
  }, []);

  function handleNavigate() {
    setShow(0);
    const index = setTimeout(() => navigate("/authentication/login"), 250);

    return () => clearTimeout(index);
  }

  function handleRegister(data) {
    dispatch(addUser(data));
  }

  return (
    <FormContainer
      onSubmit={handleSubmit(handleRegister)}
      $opacity={show}
      $rotate="-180deg"
    >
      <Title>REGISTER</Title>
      <InputContainer>
        <AuthInput
          $color={errors.name ? "red" : "gold"}
          autoFocus
          placeholder="name"
          name="name"
          type="text"
          {...register("name", {
            required: true,
            minLength: {
              value: 2,
              message: "More than 1 character.",
            },
            maxLength: {
              value: 20,
              message: "Less than 31 characters.",
            },
          })}
        />
        <Error $show={errors.name?.message}>{errors.name?.message}</Error>
      </InputContainer>
      <InputContainer>
        <AuthInput
          $color={errors.username ? "red" : "gold"}
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
          $color={errors.email ? "red" : "gold"}
          placeholder="email"
          name="email"
          type="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Wrong email format",
            },
          })}
        />
        <Error $show={errors.email?.message}>{errors.email?.message}</Error>
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
        <Error $show={errors.password?.message}>
          {errors.password?.message}
        </Error>
      </InputContainer>
      <ButtonContainer>
        <Button onClick={handleNavigate} type="button">
          Already registered?
        </Button>
        <Button $disabled={!isValid} type="submit">
          Register
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default Register;
