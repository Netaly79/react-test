import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCamperById } from "../../redux/campersOps";
import { toggleLike, selectLiked } from "../../redux/likedSlice";

import css from "./CatalogListItem.module.css";
import heartImage from "../../assets/heart.svg";
import redHeartImage from "../../assets/red-heart.svg";
import starImage from "../../assets/star.svg";
import mapImage from "../../assets/map.svg";
import automaticImage from "../../assets/automatic.png";
import petrolImage from "../../assets/petrol.png";
import kitchenImage from "../../assets/kitchen.png";
import radioImage from "../../assets/radio.png";
import bathImage from "../../assets/bathroom.png";
import acImage from "../../assets/ac.png";

export const CatalogListItem = ({ camper }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likedCampers = useSelector(selectLiked);
  const isLiked = likedCampers.includes(camper.id);

  const handleGetItemDetail = () => {
    dispatch(fetchCamperById(camper.id));
    navigate(`/campers/${camper.id}`);
  };

  const handleLikeClick = () => {
    dispatch(toggleLike(camper.id));
  };

  return (
    <li className={css.container}>
      <div className={css.imageWrapper}>
        <img
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          className={css.image}
        />
      </div>
      <div className={css.info}>
        <div className={css.header}>
          <p className={css.title}>{camper.name}</p>
          <div className={css.priceBlock}>
            €{camper.price}.00
            <img
              src={isLiked ? redHeartImage : heartImage}
              alt={isLiked ? "Liked" : "Not liked"}
              className={css.heart}
              onClick={handleLikeClick}
            />
          </div>
        </div>
        <div className={css.rateBlock}>
          <img src={starImage} alt="star" />
          <span className={css.rate}>
            {camper.rating}({camper.reviews.length} Reviews)
          </span>
          <span className={css.location}>
            <img src={mapImage} alt="map" />
            {camper.location}
          </span>
        </div>
        <p className={css.description}>{camper.description}</p>
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
        <button className={css.button} onClick={handleGetItemDetail}>
          Show More
        </button>
      </div>
    </li>
  );
};

export default CatalogListItem;
