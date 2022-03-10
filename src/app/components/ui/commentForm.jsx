import React, { useEffect, useState } from "react";
// import API from "../../api";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import TextAreaField from "../common/form/textAreaField";
import { useParams } from "react-router-dom";
import { useComments } from "../../hooks/useComments";

const CommentForm = ({ updateComments }) => {
  const pageId = useParams().userId;
  const { createComment } = useComments();

  const initialData = {
    pageId: pageId,
    content: ""
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    content: {
      isRequired: { message: "Enter your comment" }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // console.log("errors", Object.keys(errors).length === 0);
    return Object.keys(errors).length === 0;
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
    setData(initialData);
    if (isValidate) createComment(data);

    //   API.comments.add(data).then((newComment) => updateComments(newComment));
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <>
      <h2>New comments</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          label="Message"
          name="content"
          value={data.content || ""}
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
