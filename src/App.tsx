import React from "react";
import "./App.css";
import InfinityTable from "./components/molcule/table/InfinityTable.tsx";
import styles from "./App.module.scss";

function App() {
  const tableDataArr = [
    { id: 1, count: 1, data: 1 },
    { id: 2, count: 2, data: 2 },
  ];
  return (
    <div className="App">
      <div className={styles["global-wrapper"]}>
        <h2>Infinity Table</h2>
        <InfinityTable tableDataArr={tableDataArr} />
      </div>
    </div>
  );
}

export default App;
