import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    initialize();
    console.log("clicked");
  };
  return (
    <div className="container mt-5">
      <h1>Main</h1>
      <h3>Инициализация данных в Firebase</h3>
      <ul>
        <li>Progress: {progress}%</li>
        <li>Status: {status}</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        Инициализировать
      </button>
    </div>
  );
};

export default Main;
