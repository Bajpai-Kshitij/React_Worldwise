import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

const CitiesContext = createContext();

const BaseUrl = "http://localhost:8000";

// eslint-disable-next-line react/prop-types
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    setLoading(true);
    const fetchCities = async function () {
      try {
        (await fetch(`${BaseUrl}/cities`)).json().then((data) => {
          setCities(data);
        });
      } catch (error) {
        alert("There is an error in fetching cities", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  function getCity(id) {
    setLoading(true);
    const fetchCities = async function () {
      try {
        (await fetch(`${BaseUrl}/cities/${id}`)).json().then((data) => {
          setCurrentCity(data);
        });
      } catch (error) {
        alert("There is an error in fetching cities", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }

  async function createCity(city) {
    try {
      setLoading(true);
      const res = await fetch(`${BaseUrl}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCurrentCity(data);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("There was sone error loading the data...");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BaseUrl}/cities/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200)
        setCities((cities) => cities.filter((city) => city != id));
    } catch (error) {
      alert("There was sone error deleting the city...");
    } finally {
      setLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error("Cities Context was used outside cities provider");
  }
  return context;
}
export { CitiesProvider, useCities };
