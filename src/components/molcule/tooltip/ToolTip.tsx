import React from "react";
import styles from "./ToolTip.module.scss";

const ToolTip = ({ text }) => {
  return (
    <div className={styles["tooltip"]}>
      <div>{text}</div>
    </div>
  );
};

export default ToolTip;
