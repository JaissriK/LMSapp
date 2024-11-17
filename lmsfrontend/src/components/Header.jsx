import { LogoutOutlined } from "@ant-design/icons";
import styles from "./header.module.css";
import Search from "./Search";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={styles.header}>
      <Link to="/home" className={styles.logo}>
        <span>JK Library</span>
      </Link>
      <Search />
      <div className={styles.navItems}>
        <Link to="/books">
          <button className={styles.navButton} type="button">
            Books
          </button>
        </Link>
        <Link to="/members">
          <button className={styles.navButton} type="button">
            Members
          </button>
        </Link>
        <Link to="/rentals">
          <button className={styles.navButton} type="button">
            Rentals
          </button>
        </Link>
      </div>
      <Link to="/">
        <LogoutOutlined className={styles.logout} />
      </Link>
    </div>
  );
}
