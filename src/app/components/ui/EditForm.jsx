import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/form/selectFielf";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const EditForm = ({ userId }) => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const history = useHistory();

  useEffect(() => {
    validate();
  }, [data]);

  useEffect(() => {
    API.professions.fetchAll().then((result) => setProfessions(result));
    API.qualities.fetchAll().then((result) => setQualities(result));
  }, []);

  const handleSave = () => history.push(`/users/${userId}`);

  useEffect(() => {
    API.users.getById(userId).then((result) => {
      setData((prevData) => ({
        ...prevData,
        ...result,
        profession: result.profession._id,
        qualities: correctQualities(result.qualities)
      }));
    });
  }, []);

  const correctQualities = (qualities) => {
    return qualities.map((quality) => ({
      label: quality.name,
      value: quality._id
    }));
  };

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
        data.qualities.map((quality) => {
          return {
            _id: quality.value,
            name: quality.label,
            color:
              // в объекте качеств находим нужный цвет
              qualities[
                Object.keys(qualities).find(
                  (qualityKey) => qualities[qualityKey]._id === quality.value
                )
              ].color
          };
        }),
      profession:
        // находим объект профессии
        professions[
          Object.keys(professions).find((professionKey) => {
            return professions[professionKey]._id === data.profession;
          })
        ]
    };
    if (isValidate) API.users.update(updatedData._id, updatedData);
    handleSave();
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return data ? (
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
