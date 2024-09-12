import CatalogListItem from "../CatalogListItem/CatalogListItem";
import css from "./CatalogList.module.css";

export const CatalogList = ({campers}) => {

  console.log("listing catalog", campers)
  const items = campers?.items;
  return (
    <ul className={css.camperBox}>
      {items?.length > 0 ? (
        items.map((camper) => (
          <CatalogListItem key={camper.id} camper={camper} />
        ))
      ) : (
        <p>No campers found</p>
      )}
    </ul>
  );
};

export default CatalogList;
