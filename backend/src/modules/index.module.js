import express from "express";
import focusRouter from "./route/focus.module.js";
import habitRouter from "./route/habits.module.js";
import studyRouter from "./route/studies.module.js";

// TODO: 백엔드 modules 정리 부탁드립니다.

const router = express.Router();

// TODO: 이렇게 해 놓으면 studyRouter 먼저 거치고, 그 다음  focus, 그 다음 habit 거치는 등의 순서에 의미가 있는 것처럼 보임.
router.use("/studies", studyRouter, focusRouter, habitRouter);

export default router;
