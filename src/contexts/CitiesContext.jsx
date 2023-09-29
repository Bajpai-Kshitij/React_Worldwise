import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";

const CitiesContext = createContext();

const BaseUrl = "http://localhost:8000";

const reducerInitialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

function reducerFunction(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        loading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        loading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        loading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city != action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// eslint-disable-next-line react/prop-types
function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity, error }, dispatcher] = useReducer(
    reducerFunction,
    reducerInitialState
  );

  useEffect(function () {
    dispatcher({ type: "loading" });
    const fetchCities = async function () {
      try {
        (await fetch(`${BaseUrl}/cities`)).json().then((data) => {
          dispatcher({ type: "cities/loaded", payload: data });
        });
      } catch (error) {
        alert("There is an error in fetching cities", error);
        dispatcher({
          type: "rejected",
          payload: "There is an error in fetching cities..." + error,
        });
      }
    };
    fetchCities();
  }, []);

  function getCity(id) {
    dispatcher({ type: "loading" });
    const fetchCities = async function () {
      try {
        (await fetch(`${BaseUrl}/cities/${id}`)).json().then((data) => {
          dispatcher({ type: "city/loaded", payload: data });
        });
      } catch (error) {
        alert("There is an error in fetching cities", error);
        dispatcher({
          type: "rejected",
          payload: "There is an error in fetching city..." + error,
        });
      }
    };
    fetchCities();
  }

  async function createCity(city) {
    try {
      dispatcher({ type: "loading" });
      const res = await fetch(`${BaseUrl}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatcher({
        type: "cities/created",
        payload: data,
      });
    } catch (error) {
      alert("There was sone error loading the data...");
      dispatcher({
        type: "rejected",
        payload: "There is an error in creating new city..." + error,
      });
    }
  }

  async function deleteCity(id) {
    if (currentCity.id === id) return;
    try {
      dispatcher({ type: "loading" });
      const res = await fetch(`${BaseUrl}/cities/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200)
        dispatcher({
          type: "city/deleted",
          payload: id,
        });
    } catch (error) {
      alert("There was sone error deleting the city...");
      dispatcher({
        type: "rejected",
        payload: "There is an error in deleting city..." + error,
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        error,
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
