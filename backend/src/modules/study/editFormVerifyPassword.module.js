import bcrypt from "bcrypt";
import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

// TODO: 이름 짓는 게 부실해요.. ㅜㅠ
const editFormVerifyPassword = express.Router();

editFormVerifyPassword.post(
  "/:studyId/verify-password",
  async (req, res, next) => {
    const { studyId } = req.params;
    const { encryptedPassword } = req.body;

    try {
      const study = await prisma.study.findUnique({
        where: {
          id: parseInt(studyId),
        },
      });

      if (!study) {
        return res.status(404).json({
          success: false,
          message: "스터디를 찾을 수 없습니다.",
        });
      }

      const isPasswordMatch = await bcrypt.compare(
        encryptedPassword,
        study.encryptedPassword
      );

      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: "비밀번호가 일치하지 않습니다.",
        });
      }

      res
        .status(200)
        .json({ success: true, message: "비밀번호가 일치합니다." });
    } catch (err) {
      next(err);
    }
  }
);

export default editFormVerifyPassword;
