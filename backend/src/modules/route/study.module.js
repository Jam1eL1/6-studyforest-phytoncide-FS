import express from "express";
import studyVerifyPassword from "../editStudyModules/studyVerifyPassword.module.js";
import studyUpdate from "../editStudyModules/studyUpdate.module.js";
import studyGetRouter from "../study/studyGet.module.js";
import postStudyRouter from "../study/postStudy.module.js";
import healthCheckRouter from "../healthCheck.module.js";

const studyRouter = express.Router();

studyRouter.use("/study/health-check", healthCheckRouter);
studyRouter.use("/study/verify-password", studyVerifyPassword); // http://localhost:5090/api/study/verify-password
studyRouter.use("/study", studyUpdate); // http://localhost:5090/api/study/{studyId}/update
studyRouter.use("/study", studyGetRouter); // http://localhost:5090/api/study
studyRouter.use("/study-create", postStudyRouter); // http://localhost:5090/api/study-create

export default studyRouter;
