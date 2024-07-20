"use client";
import Link from "next/link";
import styles from "@/components/styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.logo}>Harij</div>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
