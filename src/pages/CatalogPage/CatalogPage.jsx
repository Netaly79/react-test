import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campersOps";
import {
  selectFilteredCampers,
  selectUniqueLocations,
  selectLoading,
  selectError,
} from "../../redux/campersSlice";
import {
  setSelectedFilters,
  setSelectedType,
  setSelectedLocation,
  selectSelectedFilters,
  selectSelectedType,
  selectSelectedLocation,
} from "../../redux/filtersSlice";
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

  // Получение фильтров и списка кемперов из состояния Redux
  const selectedFilters = useSelector(selectSelectedFilters);
  const selectedType = useSelector(selectSelectedType);
  const selectedLocation = useSelector(selectSelectedLocation);

  const campers = useSelector(selectFilteredCampers);
  const locations = useSelector(selectUniqueLocations);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  console.log("Filtered campers:", campers);
console.log("Unique locations:", locations);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  // Обработчики для фильтров
  const handleFilterClick = (filterName) => {
    dispatch(setSelectedFilters(filterName));
  };

  const handleTypeClick = (type) => {
    dispatch(setSelectedType(type));
  };

  const handleLocationChange = (e) => {
    dispatch(setSelectedLocation(e.target.value));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className={css.container}>
      <form className={css.form}>
        <label htmlFor="location-select" className={css.label}>
          Location
        </label>
        <select
          id="location-select"
          name="location"
          className={css.select}
          value={selectedLocation}
          onChange={handleLocationChange}>
          <option value="">City</option>
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
              selectedFilters.includes("AC") ? css.active : ""
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
              selectedFilters.includes("automatic") ? css.active : ""
            }`}
            onClick={() => handleFilterClick("automatic")}>
            <img
              className={css.filterImage}
              src={diagramIcon}
              alt="Diagram Icon"></img>
            <p className={css.filterName}>Automatic</p>
          </div>
          <div
            className={`${css.filterItem} ${
              selectedFilters.includes("kitchen") ? css.active : ""
            }`}
            onClick={() => handleFilterClick("kitchen")}>
            <img
              className={css.filterImage}
              src={groupIcon}
              alt="Kitchen Icon"></img>
            <p className={css.filterName}>Kitchen</p>
          </div>
          <div
            className={`${css.filterItem} ${
              selectedFilters.includes("TV") ? css.active : ""
            }`}
            onClick={() => handleFilterClick("TV")}>
            <img className={css.filterImage} src={tvIcon} alt="Tv Icon"></img>
            <p className={css.filterName}>TV</p>
          </div>
          <div
            className={`${css.filterItem} ${
              selectedFilters.includes("bathroom") ? css.active : ""
            }`}
            onClick={() => handleFilterClick("bathroom")}>
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
              selectedType === "panelTruck" ? css.active : ""
            }`}
            onClick={() => handleTypeClick("panelTruck")}>
            <img className={css.filterImage} src={vanIcon} alt="Van Icon"></img>
            <p className={css.filterName}>Van</p>
          </div>
          <div
            className={`${css.filterItem_type} ${
              selectedType === "fullyIntegrated" ? css.active : ""
            }`}
            onClick={() => handleTypeClick("fullyIntegrated")}>
            <img
              className={css.filterImage}
              src={fullyIcon}
              alt="Fully Integrated Icon"></img>
            <p className={css.filterName}>Fully Integrated</p>
          </div>
          <div
            className={`${css.filterItem_type} ${
              selectedType === "alcove" ? css.active : ""
            }`}
            onClick={() => handleTypeClick("alcove")}>
            <img
              className={css.filterImage}
              src={alcoveIcon}
              alt="Alcove Icon"></img>
            <p className={css.filterName}>Alcove</p>
          </div>
        </div>

        <button type="button" className={css.button}>
          Search
        </button>
      </form>

      <CatalogList campers={campers} />
    </div>
  );
};

export default CatalogPage;
