import { ClipLoader } from "react-spinners";
import styles from "./AllStudiesSection.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import AllStudiesSectionCardList from "./AllStudiesSectionCardList";
import { getStudies, SORT_OPTIONS } from "@api/home/home.api";

const AllStudiesSection = () => {
  const [studies, setStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [offset, setOffset] = useState(0);

  // 서버 호출에 대한 유연성을 위해 파라미터를 받아옵니다.
  const fetchStudies = useCallback(
    async (params = {}) => {
      try {
        setIsLoading(true);
        const data = await getStudies({
          // 기본값 설정
          offset: params.offset || 0,
          search: params.search || searchInput,
          ...SORT_OPTIONS[params.sortType || sortType],
        });
        return data;
      } catch (error) {
        console.error("Failed to fetch studies:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    // searchInput, sortType 두 상태가 변경되면 다시 호출
    [searchInput, sortType]
  );

  // 디바운스된 fetch 함수 (메모이제이션!)
  const debouncedSearch = useMemo(() => {
    return debounce(async (value) => {
      const data = await fetchStudies({ search: value });
      setStudies(data); // 검색 결과로 완전히 대체
    }, 300);
  }, []);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value); // 입력값 상태는 즉시 반영
    debouncedSearch(value); // 디바운스된 API 호출
  };

  const clickSortOption = async (sortType) => {
    setSortType(sortType);
    setOffset(0);
    const data = await fetchStudies({
      offset: 0,
      sortType,
    });
    setStudies(data);
  };

  const clickGetMoreStudy = async () => {
    const nextOffset = offset + 6;
    const data = await fetchStudies({
      offset: nextOffset,
      search: searchInput,
      ...SORT_OPTIONS[sortType],
    });
    setStudies((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const newData = data.filter((item) => !existingIds.has(item.id));
      return [...prev, ...newData];
    });
    setOffset(nextOffset);
  };

  // 초기값 설정
  useEffect(() => {
    const initializeStudies = async () => {
      try {
        const data = await fetchStudies();
        setStudies(data || []);
      } catch (error) {
        console.error("Failed to initialize studies:", error);
      }
    };
    initializeStudies();
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // 컴포넌트 언마운트 시 cancel
    };
  }, [debouncedSearch]);

  return (
    <div className={styles.browseStudyContainer}>
      <div className={styles.title}>스터디 둘러보기</div>
      <div className={styles.topContainer}>
        <SearchBar
          searchInput={searchInput}
          handleSearch={handleSearchInputChange}
        />
        <SortDropdown sortType={sortType} clickSortOption={clickSortOption} />
      </div>
      <AllStudiesSectionCardList isLoading={isLoading} studies={studies} />
      {studies.length > 0 && (
        <div className={styles.moreButtonContainer}>
          <button
            onClick={clickGetMoreStudy}
            className={styles.moreButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader size={20} color="#578246" loading={true} />
            ) : (
              "더보기"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AllStudiesSection;
