import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

import PropTypes from "prop-types";

CityList.propTypes = {
  cities: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

function CityList() {
  const { cities, loading } = useCities();
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on map" />
    );
  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem city={city} key={city.id}></CityItem>
          ))}
        </ul>
      )}
    </>
  );
}

export default CityList;
