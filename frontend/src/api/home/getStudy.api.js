import axiosInstance from "@api/axiosInstance";

export const getStudies = async ({
  offset = 0,
  limit = 6,
  sort = "desc",
  search = "",
  orderBy = "createAt",
} = {}) => {
  try {
    const response = await axiosInstance.get("/studies", {
      params: {
        offset,
        limit,
        sort,
        search,
        orderBy,
      },
    });
    return response.data.study;
  } catch (error) {
    console.error("Failed to fetch studies:", error);
    throw error;
  }
};

export const getRecentlyViewedStudies = async (studyIds) => {
  const formattedStudyIds = studyIds.slice(1, -1);

  try {
    const response = await axiosInstance.get("/studies/recently", {
      params: {
        studyIds: formattedStudyIds,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch studies:", error);
    throw error;
  }
};

// TODO: 객체의 키를 한글로 쓰는 건 언제 어디서 문제가 발생할지 모르니까 지양하자~!
// 정렬 옵션 매핑
export const SORT_OPTIONS = {
  "최근 순": { orderBy: "createAt", sort: "desc" },
  "오래된 순": { orderBy: "createAt", sort: "asc" },
  "많은 포인트 순": { orderBy: "point", sort: "desc" },
  "적은 포인트 순": { orderBy: "point", sort: "asc" },
};
