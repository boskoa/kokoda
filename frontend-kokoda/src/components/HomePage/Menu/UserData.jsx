import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectLoggedUser,
  updateLoggedUser,
} from "../../../features/login/loginSlice";
import {
  clearUsersError,
  selectUsersError,
  selectUsersLoading,
  updateUser,
} from "../../../features/users/usersSlice";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: gold;
`;

const InputContainer = styled.div`
  position: relative;
  width: 90%;
`;

const AuthInput = styled.input`
  position: relative;
  border: none;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color};
  width: 100%;
  background-color: teal;
  outline: none;
  font-size: 13px;
  padding: 0 5px;
  z-index: 2;
  transition: all 0.2s;

  &::placeholder {
    color: #d3d1c5;
  }
`;

const Error = styled.p`
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
  z-index: 1;
  transform: ${({ $show }) => ($show ? "translateY(105%)" : "translateY(0)")};
  transition: all 0.1s;
`;

const ReqError = styled.p`
  color: gold;
  border: 1px solid red;
  padding: 2px;
  width: 90%;
  font-size: 13px;
  text-align: center;
  margin-top: -12px;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: all 0.3s;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const Button = styled.button`
  border: none;
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 3px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

function UserData() {
  const [submitted, setSubmitted] = useState(false);
  const loggedUser = useSelector(selectLoggedUser);
  const updateError = useSelector(selectUsersError);
  const updateLoading = useSelector(selectUsersLoading);
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: loggedUser.name,
      username: loggedUser.username,
      email: loggedUser.email,
    },
  });

  useEffect(() => {
    if (submitted && !updateLoading && !updateError) {
      const password = getValues("password");
      if (password.length) {
        dispatch(logout());
      } else {
        setSubmitted(false);
      }
    }

    if (submitted && !updateLoading && updateError) {
      setSubmitted(false);
    }
  }, [submitted, updateError, updateLoading]);

  useEffect(() => {
    let index;
    if (updateError) {
      index = setTimeout(() => dispatch(clearUsersError()), 5000);
    }

    return () => clearTimeout(index);
  }, [updateError]);

  function handleUpdate(data) {
    const updateData = {
      name: data.name,
      username: data.username,
      email: data.email,
    };
    if (data.password.length) {
      updateData.password = data.password;
      dispatch(
        updateUser({
          token: loggedUser.token,
          updateData,
          id: loggedUser.id,
        }),
      );
    }

    dispatch(
      updateUser({
        token: loggedUser.token,
        updateData,
        id: loggedUser.id,
      }),
    );

    dispatch(updateLoggedUser(updateData));

    setSubmitted(true);
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleUpdate)}>
      <InputContainer>
        <AuthInput
          $color={errors.name ? "red" : "gold"}
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
              value: 30,
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
          placeholder="new password (needs new login)"
          name="password"
          type="password"
          {...register("password", {
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
        <Button type="button" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" $disabled={!isValid}>
          Update
        </Button>
      </ButtonContainer>
      <ReqError $show={updateError}>{updateError}</ReqError>
    </FormContainer>
  );
}

export default UserData;
