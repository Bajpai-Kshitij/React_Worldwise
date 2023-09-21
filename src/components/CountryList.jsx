import PropTypes from "prop-types";

import CountryItem from "./CountryItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

CountryList.propTypes = {
	cities: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

function CountryList() {
	const { cities, loading } = useCities();
	const countries = cities.reduce((acc, cur) => {
		if (!acc.map((city) => city.country).includes(cur.country))
			return [...acc, { country: cur.country, emoji: cur.emoji }];
		return acc;
	}, []);

	if (!countries.length) return <Message message="Add your first country by clicking on a city on map" />;

	return (
		<>
			{loading && <Spinner />}
			{!loading && (
				<ul className={styles.countryList}>
					{countries.map((country) => (
						<CountryItem country={country} key={country.id}></CountryItem>
					))}
				</ul>
			)}
		</>
	);
}

export default CountryList;
