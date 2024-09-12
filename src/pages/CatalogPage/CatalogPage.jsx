import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campersOps";
import {
  selectCampers,
  selectLoading,
  selectError,
  selectUniqueLocations,
} from "../../redux/campersSlice";
import { CatalogList } from "../../components/CatalogList/CatalogList";

import css from "./CatalogPage.module.css";
import windIcon from "../../assets/wind.svg";
import diagramIcon from "../../assets/diagram.svg";
import groupIcon from "../../assets/group.svg";
import tvIcon from "../../assets/tv.svg";
import bathIcon from "../../assets/bath.svg";
import vanIcon from "../../assets/bi_grid-1x2.svg";
import fullyIcon from "../../assets/bi_grid-3x3-gap.svg";
import alcoveIcon from "../../assets/bi_grid.svg";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const campers = useSelector(selectCampers);
  console.log(campers);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const locations = useSelector(selectUniqueLocations);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleFilterClick = (filterName) => {
    if (selectedFilter != filterName) {
      setSelectedFilter(filterName);
    } else {
      setSelectedFilter(null);
    }
  };

  const handleTypeClick = (typeName) => {
    if (selectedTypes.includes(typeName)) {
      setSelectedTypes(selectedTypes.filter((type) => type !== typeName));
    } else {
      setSelectedTypes([...selectedTypes, typeName]);
    }
  };
  
  return (
    <div className={css.container}>
      <form className={css.form}>
        <label htmlFor="location-select" className={css.label}>
          Location
        </label>
        <select id="location-select" name="location" className={css.select}>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        <h3 className={css.filter}>Filters</h3>
        <h2 className={css.filterTitle}>Vehicle equipment</h2>
        <div className={css.filterContainer}>
          <div
            className={`${css.filterItem} ${
              selectedFilter === "AC" ? css.active : ""
            }`}
            onClick={() => handleFilterClick("AC")}>
            <img
              className={css.filterImage}
              src={windIcon}
              alt="Wind Icon"></img>
            <p className={css.filterName}>AC</p>
          </div>
          <div
            className={`${css.filterItem} ${
              selectedFilter === "Automatic" ? css.active : ""
            }`}
            onClick={() => handleFilterClick("Automatic")}>
            <img
              className={css.filterImage}
              src={diagramIcon}
              alt="Diagram Icon"></img>
            <p className={css.filterName}>Automatic</p>
          </div>
          <div
            className={`${css.filterItem} ${
              selectedFilter === "Kitchen" ? css.active : ""
            }`}
            onClick={() => handleFilterClick("Kitchen")}>
            <img
              className={css.filterImage}
              src={groupIcon}
              alt="Kitchen Icon"></img>
            <p className={css.filterName}>Kitchen</p>
          </div>
          <div
            className={`${css.filterItem} ${
              selectedFilter === "TV" ? css.active : ""
            }`}
            onClick={() => handleFilterClick("TV")}>
            <img className={css.filterImage} src={tvIcon} alt="Tv Icon"></img>
            <p className={css.filterName}>TV</p>
          </div>
          <div
            className={`${css.filterItem} ${
              selectedFilter === "Bathroom" ? css.active : ""
            }`}
            onClick={() => handleFilterClick("Bathroom")}>
            <img
              className={css.filterImage}
              src={bathIcon}
              alt="Bathroom Icon"></img>
            <p className={css.filterName}>Bathroom</p>
          </div>
        </div>
        <h2 className={css.filterTitle}>Vehicle type</h2>
        <div className={css.filterContainer}>
          <div
            className={`${css.filterItem_type} ${
              selectedTypes.includes("Van") ? css.active : ""
            }`}
            onClick={() => handleTypeClick("Van")}>
            <img className={css.filterImage} src={vanIcon} alt="Van Icon"></img>
            <p className={css.filterName}>Van</p>
          </div>
          <div
            className={`${css.filterItem_type} ${
              selectedTypes.includes("Fully Integrated") ? css.active : ""
            }`}
            onClick={() => handleTypeClick("Fully Integrated")}>
            <img
              className={css.filterImage}
              src={fullyIcon}
              alt="Fully Integrated Icon"></img>
            <p className={css.filterName}>Fully Integrated</p>
          </div>
          <div
            className={`${css.filterItem_type} ${
              selectedTypes.includes("Alcove") ? css.active : ""
            }`}
            onClick={() => handleTypeClick("Alcove")}>
            <img
              className={css.filterImage}
              src={alcoveIcon}
              alt="Alcove Icon"></img>
            <p className={css.filterName}>Alcove</p>
          </div>
        </div>
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {error && <p>{error}</p>}
      <CatalogList campers={campers} />
    </div>
  );
};

export default CatalogPage;
