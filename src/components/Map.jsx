import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import styles from "./Map.module.css";
import Button from "./Button";

import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
	const [mapLat, mapLng] = useUrlPosition();
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const { cities } = useCities();

	const { isLoading, position: geoLocationPosition, getPosition } = useGeolocation();

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	useEffect(
		function () {
			if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
		},
		[geoLocationPosition]
	);

	return (
		<div className={styles.mapContainer}>
			{!geoLocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoading ? "Loading..." : "Use your position"}
				</Button>
			)}
			<MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => {
					return (
						<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
							<Popup>
								<span>{city.emoji}</span>
								<span>{city.cityName}</span>
							</Popup>
						</Marker>
					);
				})}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}
