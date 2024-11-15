import { useState } from "react";
import styles from "./home.module.css";

const today = new Date();

export default function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.home}>
      <div className={styles.welcome}>
        Welcome, Admin!
        <br />
        Good day!
        <br />
        {date.toDateString()}
      </div>
    </div>
  );
}
