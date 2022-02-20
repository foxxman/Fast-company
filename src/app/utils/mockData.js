import { useState, useEffect } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/http.service";

const useMockData = () => {
  const statusConsts = {
    idle: "Not started",
    pending: "In Process",
    successed: "Ready",
    error: "Error occured"
  };

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = professions.length + qualities.length + users.length;

  const incrementCount = () => setCount((prev) => prev + 1);

  const updateProgress = () => {
    if (status !== statusConsts.pending && count !== 0)
      setStatus(statusConsts.pending);

    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) setProgress(() => newProgress);

    if (newProgress === 100) setStatus(statusConsts.successed);
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put("profession/" + prof._id, prof);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put("user/" + user._id, user);
        incrementCount();
      }
      for (const quality of qualities) {
        await httpService.put("quality/" + quality._id, quality);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
