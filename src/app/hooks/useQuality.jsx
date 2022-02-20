import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/qualities.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(async () => {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function getQuality(id) {
    return qualities.find((p) => p._id === id);
  }

  return (
    <QualityContext.Provider value={{ qualities, getQuality }}>
      {!isLoading ? children : <h1>Loading...</h1>}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default QualityProvider;
