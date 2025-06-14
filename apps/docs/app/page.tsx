import styles from "./page.module.css";
import { Header } from "@repo/ui/header";
import { fetchClient } from "@repo/api/fetchClient";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
    </div>
  );
}
