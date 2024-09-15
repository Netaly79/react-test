import { useSelector } from "react-redux";
import { selectCampersById } from "../../redux/campersSlice";
import { lazy, Suspense, useEffect } from "react";
import {
  NavLink,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useLocation } from "react-router-dom";

const Feature = lazy(() => import("../../components/Feature/Feature"));
const Reviews = lazy(() => import("../../components/Reviews/Reviews"));

import css from "./CatalogDetailsPage.module.css";

import starImage from "../../assets/star.svg";
import mapImage from "../../assets/mapka.svg";

const CatalogDetailsPage = () => {
  const camper = useSelector(selectCampersById);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (camper && location.pathname === `/campers/${id}`) {
      navigate(`/campers/${camper.id}/feature`);
    }
  }, [camper, navigate, id, location.pathname]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css.container}>
        {!!camper && (
          <div className={css.info}>
            <p className={css.title}>{camper.name}</p>
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
            <div className={css.priceBlock}>€{camper.price}.00</div>
            <div className={css.imageBlock}>
              {camper.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image.original}
                  alt={`Camper image ${index + 1}`}
                  className={css.galleryImage}
                />
              ))}
            </div>
            <p className={css.description}>{camper.description}</p>
          </div>
        )}

        {!!camper && (
          <div className={css.extra}>
            <nav className={css.subNav}>
              <NavLink
                to={`/campers/${camper.id}/feature`}
                className={({ isActive }) =>
                  isActive ? `${css.subLink} ${css.subLinkActive}` : css.subLink
                }>
                Feature
              </NavLink>
              <NavLink
                to={`/campers/${camper.id}/review`}
                className={({ isActive }) =>
                  isActive ? `${css.subLink} ${css.subLinkActive}` : css.subLink
                }>
                Reviews
              </NavLink>
            </nav>
          </div>
        )}
      </div>
      <Routes>
        <Route path="feature" element={<Feature camper={camper} />} />
        <Route path="review" element={<Reviews camper={camper} />} />
      </Routes>
    </Suspense>
  );
};

export default CatalogDetailsPage;
