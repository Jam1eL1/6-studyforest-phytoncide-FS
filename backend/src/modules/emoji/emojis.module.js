import express from "express";
import prisma from "../../db/prisma/client.prisma.js";
const emojiRouter = express.Router();

// TODO: 에러처리를 에러 미들웨어에 위임하도록 코드를 작성해 주세요~!

// 이모지 저장 API
emojiRouter.post("/:id/emojis", async (req, res) => {
  const { id } = req.params;
  const { emojis } = req.body;

  try {
    const studyExists = await prisma.study.findUnique({
      where: { id: parseInt(id) },
    });
    if (!studyExists) {
      return res
        .status(404)
        .json({ message: "해당 스터디를 찾을 수 없습니다." });
    }

    await prisma.emojis.deleteMany({ where: { studyId: parseInt(id) } });

    const createEmojiPromises = emojis.map(([emojiContent, count]) =>
      prisma.emojis.create({
        data: {
          studyId: parseInt(id),
          emojiContent,
          count,
        },
      })
    );

    await Promise.all(createEmojiPromises);

    res.status(200).json({ message: "이모지 데이터가 저장되었습니다." });
  } catch (error) {
    console.error("이모지 데이터 저장 오류:", error);
    res
      .status(500)
      .json({ message: "이모지 데이터 저장 중 오류가 발생했습니다." });
  }
});

// 이모지 불러오기 API
emojiRouter.get("/:id/emojis", async (req, res) => {
  const { id } = req.params;

  try {
    const studyExists = await prisma.study.findUnique({
      where: { id: parseInt(id) },
    });
    if (!studyExists) {
      return res
        .status(404)
        .json({ message: "해당 스터디를 찾을 수 없습니다." });
    }

    const emojis = await prisma.emojis.findMany({
      where: { studyId: parseInt(id) },
      select: { emojiContent: true, count: true },
    });

    res.status(200).json(emojis);
  } catch (error) {
    console.error("이모지 데이터 불러오기 오류:", error);
    res
      .status(500)
      .json({ message: "이모지 데이터 불러오기 중 오류가 발생했습니다." });
  }
});

export default emojiRouter;
