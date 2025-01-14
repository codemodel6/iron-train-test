import React from "react";
import InfinityTable from "../components/molcule/table/InfinityTable.tsx";
import styles from "./InfinityPage.module.scss";
import { fetchInfinityData } from "../module/api/fetchInfinityData.ts";

const InfinityPage = () => {
  const handleData = async () => {
    const { data } = await fetchInfinityData(1);
    console.log("hi", data);
  };

  const tableDataArr = [
    { id: 1, count: 1, data: 1 },
    { id: 2, count: 2, data: 2 },
  ];

  return (
    <div className={styles["infinity-wrapper"]}>
      <h2>Infinity Table</h2>
      <button onClick={handleData}>dd</button>
      <InfinityTable tableDataArr={tableDataArr} />
    </div>
  );
};

export default InfinityPage;
