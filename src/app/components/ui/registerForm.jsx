import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectFielf";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkboxField";
import { useQuality } from "../../hooks/useQuality";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegitsterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [{ label: "Нудила", value: "67rdca3eeb7f6fgeed471198" }],
    licence: false
  });
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});
  const { qualities } = useQuality();
  const { professions } = useProfessions();

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));
  const professionsList = professions.map((q) => ({
    label: q.name,
    value: q._id
  }));

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна к заполнению" },
      isEmail: { message: "Email введен некорректно" }
    },
    name: {
      isRequired: { message: "Имя обязательно к заполнению" },
      min: {
        value: 2,
        message: `Имя должно содержать минимум 2 символа`
      }
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidate = validate();
    // console.log("errors", errors);

    if (!isValidate) return;

    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    // console.log("data", newData);
    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
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
        label="Ваше имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
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
        options={qualitiesList}
        onChange={handleChange}
        label="Выберите ваши качества"
        defaultValue={data.qualities}
      />

      <SelectField
        options={professionsList}
        defaultOption="Choose..."
        onChange={handleChange}
        name="profession"
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
