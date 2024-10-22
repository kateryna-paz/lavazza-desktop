import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navList}>
      <NavLink
        to="/home"
        end
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.baseLink
        }
      >
        Menu
      </NavLink>

      <NavLink
        to="/home/orders"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.baseLink
        }
      >
        Order History
      </NavLink>
    </nav>
  );
}

export default Navbar;
