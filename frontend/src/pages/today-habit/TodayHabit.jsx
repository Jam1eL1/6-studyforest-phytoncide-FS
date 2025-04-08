import HabitModal from "@today-habit/HabitModal";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "@today-habit/TodayHabit.module.css";
import Habits from "@today-habit/Habits";
import StudyNavbar from "@components/study-navbar/StudyNavbar";
import CurrentTime from "@today-habit/CurrentTime";

// TODO: `Page.jsx` 컴포넌트 같은 걸 만들어 쓰면 어땠을까

const TodayHabit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };
  const { studyId } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.topContainer}>
          <StudyNavbar
            studyId={studyId}
            link={`/studies/${studyId}/focus`}
            pageName={"오늘의 집중"}
          />
          <CurrentTime />
        </div>
        <Habits
          studyId={studyId}
          isModalLoading={isModalLoading}
          openModal={openModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>

      {/* 모달 열림 상태가 true일 때 TodayHabitCreate 모달 표시 */}
      {isModalOpen && (
        <div className={styles.modalBackground} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <HabitModal
              onClose={closeModal}
              studyId={studyId}
              setIsModalLoading={setIsModalLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayHabit;
