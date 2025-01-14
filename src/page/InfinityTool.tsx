import React from "react";
import styles from "./InfinityTool.module.scss";

const InfinityTool = () => {
  return (
    <div className={styles["infinity-item-block"]}>
      <h3>정렬</h3>
      <div className={styles["item-sort-block"]}>
        <button>오름차순</button>
        <button>내림차순</button>
      </div>
      <h3>검색</h3>
      <div className={styles["item-search-block"]}>
        <input placeholder="firstname으로 검색해주세요" />
        <button>검색</button>
      </div>
    </div>
  );
};

export default InfinityTool;
