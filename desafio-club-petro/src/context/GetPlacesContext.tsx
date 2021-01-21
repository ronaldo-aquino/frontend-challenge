import { createContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";

export const GetPlacesContext = createContext<any>([]);

const GetPlacesProvider: React.FC = ({ children }) => {
  const [places, setPlaces] = useState<any>([]);

 

  useEffect(() => {

    const getDataPlaces = async () => {
      const { docs } = await db
        .collection("Contries")
        .get();
      const countriesMap: any = docs.map((place) => ({
        id: place.id,
        ...place.data(),
      }));
  
      setPlaces(countriesMap);
    };

    getDataPlaces();
  }, [places]);

  return (
    <GetPlacesContext.Provider value={{ places, setPlaces }}>
      {children}
    </GetPlacesContext.Provider>
  );
};

export default GetPlacesProvider;