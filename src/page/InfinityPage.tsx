import React from "react";

import styles from "./InfinityPage.module.scss";
import InfinityScroll from "./InfinityScroll.tsx";
import InfinityTool from "./InfinityTool.tsx";

const InfinityPage = () => {
  return (
    <div className={styles["infinity-wrapper"]}>
      <InfinityScroll />
      <InfinityTool />
    </div>
  );
};

export default InfinityPage;
