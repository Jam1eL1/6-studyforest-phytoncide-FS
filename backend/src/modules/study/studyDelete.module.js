import bcrypt from "bcrypt";
import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const studyDeleteRouter = express.Router();

studyDeleteRouter.delete("/:studyId", async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { password } = req.body;
    const study = await prisma.study.findUnique({
      where: {
        id: parseInt(studyId),
      },
    });

    if (!study) {
      return res.status(404).json({ message: "스터디를 찾을 수 없습니다." });
    }

    // TODO: 불리언은 is땡땡으로 써주면 더욱 좋을 것 같아요
    const passwordMatch = await bcrypt.compare(
      password,
      study.encryptedPassword
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    await prisma.study.delete({
      where: {
        id: parseInt(studyId),
      },
    });

    res.status(200).json({
      success: true,
      message: "스터디가 성공적으로 삭제되었습니다",
    });
  } catch (err) {
    console.error("스터디 삭제 오류:", err);
    next(err);
  }
});

export default studyDeleteRouter;
