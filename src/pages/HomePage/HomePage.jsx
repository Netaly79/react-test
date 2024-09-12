import { useNavigate } from "react-router-dom";
import css from "./HomePage.module.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/campers");
  };
  return (
    <div>
      <div className={css.hero}>
        <div className={css.content}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <h2 className={css.description}>
            You can find everything you want in our catalog
          </h2>
          <button className={css.button} onClick={handleRedirect}>
            View Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
