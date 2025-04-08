import express from "express";
import emojiRouter from "../emoji/emojis.module.js";
import editFormVerifyPassword from "../study/editFormVerifyPassword.module.js";
import studyDeleteRouter from "../study/studyDelete.module.js";
import studyGetRouter from "../study/studyGet.module.js";
import studyPatchRouter from "../study/studyPatch.module.js";
import studyPostRouter from "../study/studyPost.module.js";

const studyRouter = express.Router();

// TODO: 왜 모아놓았지?
studyRouter.use(
  "/",
  studyGetRouter,
  studyPostRouter,
  studyPatchRouter,
  studyDeleteRouter,
  editFormVerifyPassword,
  emojiRouter
); // http://localhost:5090/studies
// studyRouter.use("/", postStudyRouter); // http://localhost:5090/studies
// studyRouter.use("/", studyUpdate); // http://localhost:5090/studies/{studyId}
// studyRouter.use("/", studyDeleteRouter); // http://localhost:5090/studies/{studyId}
// studyRouter.use("/", studyVerifyPassword); // http://localhost:5090/studies/{studyId}/verify-password
// studyRouter.use("/", emojiRouter); // http://localhost:5090/studies/${studyId}/emojis

export default studyRouter;
