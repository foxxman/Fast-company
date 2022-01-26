import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/form/selectFielf";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkboxField";

const RegitsterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [{ label: "Нудила", value: "67rdca3eeb7f6fgeed471198" }],
    licence: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  useEffect(() => {
    API.professions.fetchAll().then((result) => setProfessions(result));
    API.qualities.fetchAll().then((result) => setQualities(result));
  }, []);

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
    },
    profession: {
      isRequired: { message: "Это поле обязательно для заполнения" }
    },
    licence: {
      isRequired: { message: "Пожалуйста, подтвердите лицензионное соглашение" }
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidate = validate();
    console.log(errors);
    if (isValidate) return;
    console.log(data);
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
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
      <RadioField
        label="Выберите Ваш пол"
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        onChange={handleChange}
        value={data.sex}
        name="sex"
      />

      <MultiSelectField
        name="qualities"
        options={qualities}
        onChange={handleChange}
        label="Выберите ваши качества"
        defaultValue={data.qualities}
      />

      <SelectField
        options={professions}
        defaultOption="Choose..."
        onChange={handleChange}
        name="professions"
        error={errors.profession}
        label="Выберете вашу профессию"
        value={data.profession}
      />

      <CheckboxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
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

export default RegitsterForm;
