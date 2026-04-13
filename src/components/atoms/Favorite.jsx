import favoriteFilled from "/src/assets/favorite_filled.svg";
import favoriteOutline from "/src/assets/favorite_outline.svg";
import { Button } from "./Button";
import { FavoriteIconOutLine } from "./icons/FavoriteIconOutLine";
import { FavoriteIconFilled } from "./icons/FavoriteIconFilled";
import { useState, useEffect } from "react";

export function Favorite({ idCharacter }) {
  //Se hace esto porque en localstorge estamos guardando un string y no un array actualmente
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Estado src icono
  // Estado favorite

  // Cuando cambie favorite, cambiar estado src icono y cambiar valor en localStorage
  /* useState, definimos una variable que puede cambiar segun el estado y la funcción, 
  const[estadoInicial,funccionCambio]=useState(valorInicial) */
  /*\//TDO: Comprobar sí cuando este dentro de valores reales sigue pasando que cuando 
    guardamos este archivo y el icon esta marcado como favorito, si deseleccionamos y 
    volvemos a seleccionar, no es el valor anterior, es uno nuevo  */
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(idCharacter);
  });

  // TDO: Investigar cómo hacer que pasen cosas cuando cambia un valor para que, cuando cambie el estado de favorite, cambie el icono
  // Investigar cómo conseguir que, al montarse el componente, se seteen ciertos valores

  /*
  - isFavorite(boolean) e iconSrc se inicializan como undefined
  - useEffect --> Al montarse el componente, se setea isFavorite dependiendo de si su valor está o no en localStorage
  - useEffect --> Cuando cambia isFavorite, tiene que ocurrir algo que cambie el src del icono 
  */

  /* useEffect (()=>) */

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isStored = favorites.includes(idCharacter);

    setIsFavorite(isStored);
  }, [idCharacter]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let updated;

    if (isFavorite) {
      updated = [...new Set([...favorites, idCharacter])];
    } else {
      updated = favorites.filter((id) => id !== idCharacter);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  }, [isFavorite]);

  function handleToggle() {
    setIsFavorite((prev) => !prev);
  }

  // Aquí elegimos el icono en base al estado (esto evita errores con React y hooks)
  const Icon = isFavorite ? FavoriteIconFilled : FavoriteIconOutLine;

  return (
    <Button icon={Icon} className="card-favorite" onClick={handleToggle} />
  );
}
