import React from "react";
import InfinityTable from "../components/molcule/table/InfinityTable.tsx";
import styles from "./InfinityPage.module.scss";

const InfinityPage = () => {
  return (
    <div className={styles["infinity-wrapper"]}>
      <h2>Infinity Table</h2>
      <InfinityTable />
    </div>
  );
};

export default InfinityPage;
