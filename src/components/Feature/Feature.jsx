import css from "./Feature.module.css";

import automaticImage from "../../assets/automatic.png";
import petrolImage from "../../assets/petrol.png";
import kitchenImage from "../../assets/kitchen.png";
import radioImage from "../../assets/radio.png";
import bathImage from "../../assets/bathroom.png";
import acImage from "../../assets/ac.png";

const Feature = ({ camper }) => {

  return (
    <div className={css.container}>
      <div className={css.specification}>
        {camper.engine === "petrol" && <img src={petrolImage} alt="Petrol" />}
        {camper.transmission === "automatic" && (
          <img src={automaticImage} alt="Automatic Transmission" />
        )}
        {camper.kitchen && <img src={kitchenImage} alt="Kitchen" />}
        {camper.radio && <img src={radioImage} alt="Radio" />}
        {camper.bathroom && <img src={bathImage} alt="Bathroom" />}
        {camper.AC && <img src={acImage} alt="AC" className={css.engine} />}
      </div>
    </div>
  );
};

export default Feature;
