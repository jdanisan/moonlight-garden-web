import favoriteFilled from "/src/assets/favorite_filled.svg";
import favoriteOutline from "/src/assets/favorite_outline.svg";
import { useState, useEffect } from "react";

export function Favorite({ idCharacter }) {
  //Se hace esto porque en localstorge estamos guardando un string y no un array actualmente
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Estado src icono
  // Estado favorite

  // Cuando cambie favorite, cambiar estado src icono y cambiar valor en localStorage
  /* useState, definimos una variable que puede cambiar segun el estado y la funcción, 
  const[estadoInicial,funccionCambio]=useState(valorInicial) */
  /*\//TODO: Comprobar sí cuando este dentro de valores reales sigue pasando que cuando 
    guardamos este archivo y el icon esta marcado como favorito, si deseleccionamos y 
    volvemos a seleccionar, no es el valor anterior, es uno nuevo  */
  const [icon, setIcon] = useState(favoriteOutline);
  const [isFavorite, setIsFavorite] = useState(undefined);

  // TODO: Investigar cómo hacer que pasen cosas cuando cambia un valor para que, cuando cambie el estado de favorite, cambie el icono
  // Investigar cómo conseguir que, al montarse el componente, se seteen ciertos valores

  /*
  - isFavorite(boolean) e iconSrc se inicializan como undefined
  - useEffect --> Al montarse el componente, se setea isFavorite dependiendo de si su valor está o no en localStorage
  - useEffect --> Cuando cambia isFavorite, tiene que ocurrir algo que cambie el src del icono 
  */

  /* useEffect (()=>) */
  
  useEffect(() => {
    const isStored = favorites.includes(idCharacter);
    setIsFavorite(isStored);
    setIcon(isStored ? favoriteFilled : favoriteOutline);
  }, [idCharacter]);

  useEffect(() => {
    if (isFavorite === undefined) return;

    if (isFavorite) {
      const updated = [...new Set([...favorites, idCharacter])];
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIcon(favoriteFilled);
    } else {
      const updated = favorites.filter((id) => id !== idCharacter);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIcon(favoriteOutline);
    }
  }, [isFavorite]);

  function handleToggle() {
    setIsFavorite((prev) => !prev);
  }

  return (
    <button className="card-favorite" onClick={handleToggle}>
      <img src={icon} className="favorite-icon" alt="Favorite Heart" />
    </button>
  );
}
