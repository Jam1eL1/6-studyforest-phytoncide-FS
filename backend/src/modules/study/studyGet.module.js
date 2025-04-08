import { Prisma } from "@prisma/client";
import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const studyGetRouter = express.Router();

// TODO: 각 API 엔드포인트 별로 주석을 달아 놓으면 좀 더 좋겠음. 어떤 목적의 엔드포인트인지 정도

/**
 * 전체 스터디 조회
 */
studyGetRouter.get("/", async (req, res, next) => {
  try {
    const {
      offset = 0,
      limit = 6,
      sort = "desc",
      search = "",
      orderBy = "createAt",
    } = req.query;

    const cleanedSearch = String(search).replace(/\s/g, "");

    const allowedOrderBy = ["createAt", "point"];
    // 혹시라도 잘못 들어오는 경우 기본값 createAt으로 변경
    const safeOrderBy = allowedOrderBy.includes(orderBy) ? orderBy : "createAt";
    const safeSort = sort === "asc" ? "ASC" : "DESC";

    const study = await prisma.$queryRaw`
      SELECT
        s.id,
        s."nickName",
        s.title,
        s.description,
        s.background,
        s.point,
        s."createAt",
        s."updatedAt",
      json_agg(e.*) FILTER (WHERE e.id IS NOT NULL) AS emojis
      FROM "Study" s
      LEFT JOIN "Emojis" e ON e."studyId" = s.id
      WHERE
        REPLACE(s.title, ' ', '') ILIKE ${`%${cleanedSearch}%`} OR
        REPLACE(s.description, ' ', '') ILIKE ${`%${cleanedSearch}%`} OR
        REPLACE(s."nickName", ' ', '') ILIKE ${`%${cleanedSearch}%`}
      GROUP BY s.id
      ORDER BY ${Prisma.raw(`"${safeOrderBy}"`)} ${Prisma.raw(safeSort)}
      OFFSET ${Number(offset)}
      LIMIT ${Number(limit)}
    `;

    // 이모지가 없는경우 빈 배열이 아닌 null을 반환해서 기본적인 포멧팅 진행
    const formatted = study.map((item) => ({
      ...item,
      emojis: item.emojis ?? [],
    }));

    res.status(200).json({ study: formatted });
  } catch (e) {
    next(e);
  }
});

/**
 * 최근 조회한 스터디
 */
studyGetRouter.get("/recently", async (req, res, next) => {
  try {
    const { studyIds } = req.query;

    if (!studyIds) {
      return res
        .status(400)
        .json({ message: "studyIds 파라미터가 필요합니다." });
    }

    // 문자열을 숫자 배열로 변환
    const studyIdsArray = studyIds
      .split(",")
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));

    if (studyIdsArray.length === 0) {
      return res.status(400).json({ message: "유효한 studyIds가 없습니다." });
    }

    const study = await prisma.study.findMany({
      where: { id: { in: studyIdsArray } },
      include: {
        emojis: true,
      },
      omit: { encryptedPassword: true },
    });

    // 이모지가 null인 경우 빈 배열로 변환
    const studyWithEmojis = study.map((item) => ({
      ...item,
      emojis: item.emojis ?? [],
    }));

    // 클라이언트가 요청한 ID 순서에 맞게 결과를 정렬
    const orderedResult = [];

    // studyIdsArray의 순서대로 결과를 재배열
    for (const id of studyIdsArray) {
      const found = studyWithEmojis.find((item) => item.id === id);
      if (found) {
        orderedResult.push(found);
      }
    }

    res.status(200).json(orderedResult);
  } catch (e) {
    next(e);
  }
});

/**
 * 스터디 상세 조회
 */
studyGetRouter.get("/:studyId", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);

    const studyDetail = await prisma.study.findUnique({
      where: { id: studyId },
    });
    if (!studyDetail) return res.status(404).send("Study가 존재하지 않습니다.");

    res.status(200).json(studyDetail);
  } catch (e) {
    next(e);
  }
});

export default studyGetRouter;
