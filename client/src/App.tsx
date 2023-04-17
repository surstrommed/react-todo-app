import { AppContent } from "./components/AppContent";
import { AppHeader } from "./components/AppHeader";
import { PageTitle } from "./components/PageTitle";
import styles from "./styles/modules/app.module.scss";

export const App = () => {
  return (
    <div className="container">
      <PageTitle>Todo list</PageTitle>
      <div className={styles.app__wrapper}>
        <AppHeader />
        <AppContent />
      </div>
    </div>
  );
};
