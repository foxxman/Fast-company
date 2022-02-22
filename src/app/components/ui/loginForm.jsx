import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckboxField from "../common/form/checkboxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
// import * as yup from "yup";

const LoginForm = () => {
  const history = useHistory();

  const { signIn } = useAuth();
  // console.log(process.env);
  const [data, setData] = useState({ email: "", password: "", stayOn: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  // const validateScheme = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required("Пароль обязателен к заполнению")
  //     .matches(
  //       /(?=.*[A-Z])/,
  //       "Пароль должен содержать хотябы одну заглавную букву"
  //     )
  //     .matches(/(?=.*[0-9])/, "Пароль должен содержать хотябы одну цифру")
  //     .matches(
  //       /(?=.*[!#*@$%&])/,
  //       "Пароль должен содержать хотябы один спецсимвол !#*@$%&"
  //     )
  //     .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8ми символов"),
  //   email: yup
  //     .string()
  //     .required("Электронная почта обязательна к заполнению")
  //     .email("Email введен некорректно")
  // });

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна к заполнению" },
      isEmail: { message: "Email введен некорректно" }
    },
    password: {
      isRequired: { message: "Пароль обязателен к заполнению" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотябы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотябы одну цифру"
      },
      min: {
        value: 8,
        message: `Пароль должен содержать минимум 8 символов`
      }
    }
  };

  const handleChange = (target) => {
    // console.log(target);
    if (target) {
      setData((prevData) => ({
        ...prevData,
        [target.name]: target.value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidate = validate();
    // console.log(errors);
    if (isValidate) return;
    try {
      await signIn(data);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
    // console.log(data);
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    // validateScheme
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }));
    setErrors(errors);
    return Object.keys(errors) === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Эл. почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />

      <CheckboxField name="stayOn" value={data.license} onChange={handleChange}>
        Запомнить меня
      </CheckboxField>

      <button
        type="submit"
        className="btn btn-primary w-100 mx-auto"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
