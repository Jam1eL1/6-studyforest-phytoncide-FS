import axios from "axios";
import SERVER_URL from "../server.js";

const instance = axios.create({
  baseURL: `${SERVER_URL}/api/habits`, //백엔드 배포 시 사용
  // baseURL: `http://localhost:5090/api/habits/`,
});

const handleError = (e) => {
  if (e.response) {
    console.error(`${e.response.status}: ${e.response.statusText}`);
  } else {
    console.error("Request failed");
  }
};

export const getHabits = async (studyId) => {
  try {
    const res = await instance.get(`/gethabit/${studyId}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const patchHabits = async (habitId, data) => {
  try {
    const res = await instance.patch(`/patchhabit/${habitId}`, data);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const postHabit = async (studyId, data) => {
  try {
    const res = await instance.post(`/posthabit/${studyId}`, data);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
export const deleteHabit = async (habitId) => {
  try {
    const res = await instance.delete(`/deletehabit/${habitId}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
