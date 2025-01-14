import React from "react";
import styles from "./ToolTip.module.scss";

interface ToolTipProps {
  text: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ text }) => {
  return (
    <div className={styles["tooltip"]}>
      <div>{text}</div>
    </div>
  );
};

export default ToolTip;
