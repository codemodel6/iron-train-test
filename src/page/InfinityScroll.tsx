import React from "react";
import InfinityTable from "../components/molcule/table/InfinityTable.tsx";
import styles from "./InfinityScroll.module.scss";

const InfinityScroll = () => {
  return (
    <div className={styles["infinity-scroll-wrapper"]}>
      <h2>Infinity Table</h2>
      <InfinityTable />
    </div>
  );
};

export default InfinityScroll;
