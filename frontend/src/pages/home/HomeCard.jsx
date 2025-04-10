import { useEffect } from "react";
import styles from "./HomeCard.module.css";
import pointIcon from "/images/icon/ic_point.svg";
import { useState } from "react";
import bg5 from "/images/study-bg/bg5.svg";
import bg6 from "/images/study-bg/bg6.svg";
import bg7 from "/images/study-bg/bg7.svg";
import bg8 from "/images/study-bg/bg8.svg";
import { useNavigate } from "react-router-dom";
import { saveAndNavigateToStudy } from "./study";

const backgroundImages = {
  bg5,
  bg6,
  bg7,
  bg8,
};

const HomeCard = ({ data }) => {
  const navigate = useNavigate();

  const [background, setBackground] = useState("");

  // 날짜 차이 계산 함수
  const calculateDaysDifference = (createDate) => {
    const start = new Date(createDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 스터디 상세 페이지로 이동
  const clickDetailStudy = () => {
    saveAndNavigateToStudy(data, navigate);
  };

  // 기본 스터디 배경이 아니면 스터디 배경 이미지 설정
  useEffect(() => {
    if (
      data.background !== "bg1" &&
      data.background !== "bg2" &&
      data.background !== "bg3" &&
      data.background !== "bg4"
    ) {
      setBackground(backgroundImages[data.background]);
    }
  }, [data.background]);

  return (
    <li
      className={styles.card}
      data-bg={data.background}
      onClick={clickDetailStudy}
      style={{
        backgroundImage: background && `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {background && <div className={styles.backgroundOverlay}></div>}

      <div className={styles.cardHeaderContainer}>
        <div className={styles.headerTop}>
          <div className={styles.pointsContainer}>
            <img className={styles.pointIcon} src={pointIcon} alt="points" />
            <span className={styles.pointsTextContainer}>
              <span className={styles.pointsText}>{data.point}P 획득</span>
            </span>
          </div>

          <div className={styles.cardTitleContainer}>
            <span className={styles.cardTitle}>
              <span className={styles.authorName}>{data.nickName}</span>
              <span>의 {data.title}</span>
            </span>
          </div>
        </div>

        <div className={styles.cardDayContainer}>
          <span className={styles.cardDay}>
            {calculateDaysDifference(data.createAt)}일째 진행 중
          </span>
        </div>
      </div>

      <div className={styles.cardContentContainer}>
        <span className={styles.cardContent}>{data.description}</span>
      </div>

      {data.emojis && (
        <ul className={styles.emojiContainer}>
          {data.emojis.slice(0, 3).map((emoji) => (
            <li key={emoji.id} className={styles.emoji}>
              <span className={styles.emojiContent}>{emoji.emojiContent}</span>
              <span>{emoji.count}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default HomeCard;
