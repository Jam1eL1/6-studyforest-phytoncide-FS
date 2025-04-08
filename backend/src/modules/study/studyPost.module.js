import bcrypt from "bcrypt";
import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const studyPostRouter = express.Router();

/**
 * 스터디 만들기
 */
studyPostRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    // TODO: 프론트에서 데이터 보낼 때 그냥 password라는 이름으로 보내는 게 맞다.
    if (!data.title || !data.encryptedPassword) {
      res.status(400).json({ message: "제목 또는 비밀번호가 없습니다." });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPw = await bcrypt.hash(data.encryptedPassword, salt);

    const study = await prisma.study.create({
      data: {
        nickName: data.nickName,
        title: data.title,
        description: data.description,
        background: data.background,
        encryptedPassword: hashedPw,
        point: 0,
      },
      omit: {
        encryptedPassword: true,
      },
    });

    res.status(201).json(study);
  } catch (e) {
    next(e);
  }
});

export default studyPostRouter;
