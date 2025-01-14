import React from "react";
import styles from "./InfinityTable.module.scss";

const InfinityTable = ({ tableDataArr }) => {
  return (
    <div className={styles["infinity-table-wrapper"]}>
      <div className={styles["grid-table"]}>
        <div className={styles["grid-header"]}>
          <div className={styles["grid-cell"]}>
            <input type="checkbox" />
          </div>
          <div className={styles["grid-cell"]}>조회</div>
          <div className={styles["grid-cell"]}>구분</div>
          <div className={styles["grid-cell"]}>이름</div>
          <div className={styles["grid-cell"]}>아이디</div>
        </div>
        {tableDataArr.map((it, idx) => (
          <div className={styles["grid-row"]}>
            <div className={styles["grid-cell"]}>
              <input type="checkbox" />
            </div>
            <div className={styles["grid-cell"]}>▶</div>
            <div className={styles["grid-cell"]}>선생님</div>
            <div className={styles["grid-cell"]}>박규범_선생님</div>
            <div className={styles["grid-cell"]}>test1</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfinityTable;
