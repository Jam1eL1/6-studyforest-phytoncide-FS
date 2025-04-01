import TodayHabitCreate from "@components/habit-modal/TodayHabitCreate";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "@today-habit/TodayHabit.module.css";
import Habits from "@components/habits/Habits";
import dayjs from "dayjs";
import arrowIcon from "/images/icon/ic_arrow_right.svg";

const TodayHabit = () => {
  const currentTime = dayjs()
    .format("YYYY-MM-DD A HH:mm")
    .replace("AM", "오전")
    .replace("PM", "오후");

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };
  const { id } = useParams();
  console.log(id);
  // title
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.topContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.title}>연우의 개발공장</p>
            <div className={styles.linkContainer}>
              <Link to={`/study/${id}/focus`} className={styles.link}>
                <p className={styles.linkText}>오늘의 집중</p>
                <img src={arrowIcon} />
              </Link>
              <Link to="/" className={styles.link}>
                <p className={styles.linkText}>홈</p>
                <img src={arrowIcon} />
              </Link>
            </div>
          </div>
          <div className={styles.timeContainer}>
            <p className={styles.timeTitle}>현재 시간</p>
            <div className={styles.timeNow}>{currentTime}</div>
          </div>
        </div>
        <div className={styles.habitContainer}>
          <div className={styles.habitTopContainer}>
            <p className={styles.habitTitle}>오늘의 습관</p>
            <button
              className={styles.listText}
              onClick={openModal} // 목록 수정 클릭 시 모달 열기
            >
              목록 수정
            </button>
          </div>
          <Habits studyId={id} />
        </div>
      </div>

      {/* 모달 열림 상태가 true일 때 TodayHabitCreate 모달 표시 */}
      {isModalOpen && (
        <div className={styles.modalBackground} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <TodayHabitCreate onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayHabit;
