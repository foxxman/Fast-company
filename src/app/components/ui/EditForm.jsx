import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectFielf";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useProfessions } from "../../hooks/useProfession";
import { useQuality } from "../../hooks/useQuality";
import { useAuth } from "../../hooks/useAuth";
import { useParams, useHistory } from "react-router-dom";

const EditForm = () => {
  const { userId } = useParams();
  const { currentUser, updateUser, isLoading: userLoading } = useAuth();
  const { professions, isLoading: profLoading } = useProfessions();
  const { qualities, getQuality, isLoading: qualLoading } = useQuality();

  const [data, setData] = useState({
    ...currentUser,
    qualities: getQualities(currentUser.qualities)
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  if (userId !== currentUser._id)
    history.push(`/users/${currentUser._id}/edit`);

  useEffect(() => {
    validate();
  }, [data]);

  const handleSave = () => history.push(`/users/${userId}`);

  function correctItems(items) {
    return items.map((item) => ({
      label: item.name,
      value: item._id
    }));
  }

  function getQualities(idArray) {
    return correctItems(idArray.map((id) => getQuality(id)));
  }

  const validatorConfig = {
    name: {
      isRequired: { message: "Имя не может быть пустым" }
    },
    email: {
      isRequired: { message: "Электронная почта обязательна к заполнению" },
      isEmail: { message: "Email введен некорректно" }
    },
    profession: {
      isRequired: { message: "Это поле обязательно для заполнения" }
    }
  };

  const handleChange = (target) => {
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

    const updatedData = {
      ...data,
      qualities:
        // приводим качества в начальный формат
        data.qualities.map((quality) => quality.value)
    };
    if (isValidate) {
      updateUser(updatedData);
    }
    handleSave();
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return data && !qualLoading && !profLoading && !userLoading ? (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Ваше имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />

      <TextField
        label="Эл. почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
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
        options={correctItems(qualities)}
        onChange={handleChange}
        label="Выберите ваши качества"
        defaultValue={data.qualities}
      />

      <SelectField
        options={correctItems(professions)}
        defaultOption="Choose..."
        onChange={handleChange}
        name="profession"
        error={errors.profession}
        label="Выберете вашу профессию"
        value={data.profession}
      />

      <button
        type="submit"
        className="btn btn-primary w-100 mx-auto"
        disabled={!isValid}
      >
        Edit information
      </button>
    </form>
  ) : (
    <p>Loading...</p>
  );
};

EditForm.propTypes = {
  userId: PropTypes.string
};

export default EditForm;
