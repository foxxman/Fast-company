import React, { useEffect, useState } from "react";
import API from "../../api";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectFielf";
import TextAreaField from "../common/form/textAreaField";
import { useParams } from "react-router-dom";

const CommentForm = ({ updateComments }) => {
  const pageId = useParams().userId;

  const initialData = {
    pageId: pageId,
    userId: "",
    content: ""
  };

  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState();
  const [errors, setErrors] = useState({});

  useEffect(
    () => API.users.fetchAll().then((result) => setUsers(correctUsers(result))),
    []
  );

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    content: {
      isRequired: { message: "Enter your comment" }
    },
    userId: {
      isRequired: { message: "Who are you?" }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // console.log("errors", Object.keys(errors).length === 0);
    return Object.keys(errors).length === 0;
  };

  const correctUsers = (users) => {
    return users.map((user) => ({ name: user.name, value: user._id }));
  };

  const handleChange = (target) => {
    // console.log(target);
    if (target) {
      setData((prevData) => ({
        ...prevData,
        [target.name]: target.value
      }));
      //   console.log("new Data: ", data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidate = validate();
    // console.log(isValidate);
    // console.log("add data ", data);
    setData(initialData);
    if (isValidate)
      API.comments.add(data).then((newComment) => updateComments(newComment));
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <>
      <h2>New comments</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          options={users}
          defaultOption="Choose user"
          onChange={handleChange}
          name="userId"
          error={errors.userId}
          value={data.userId}
        />

        <TextAreaField
          label="Message"
          name="content"
          value={data.content}
          onChange={handleChange}
          error={errors.content}
        />

        <button
          type="submit"
          className="btn btn-primary w-100 mx-auto"
          disabled={!isValid}
        >
          Publish
        </button>
      </form>
    </>
  );
};

CommentForm.propTypes = {
  updateComments: PropTypes.func.isRequired
};

export default CommentForm;
