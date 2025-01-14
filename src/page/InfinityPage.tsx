import React from "react";
import InfinityTable from "../components/molcule/table/InfinityTable.tsx";
import styles from "./InfinityPage.module.scss";

const InfinityPage = () => {
  const tableDataArr = [
    { id: 1, count: 1, data: 1 },
    { id: 2, count: 2, data: 2 },
  ];

  return (
    <div className={styles["infinity-wrapper"]}>
      <h2>Infinity Table</h2>
      <InfinityTable tableDataArr={tableDataArr} />
    </div>
  );
};

export default InfinityPage;
